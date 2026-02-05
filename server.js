#!/usr/bin/env node
/**
 * server.js
 * Express server for Template Browser app
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(ROOT, 'public')));
app.use(express.json({ limit: '1mb' }));

// Utility: Ensure decks directory exists
function ensureDecksDir() {
  const decksDir = path.join(ROOT, 'decks');
  if (!fs.existsSync(decksDir)) {
    fs.mkdirSync(decksDir, { recursive: true });
  }
}

// Utility: Sanitize and validate filename
function sanitizeFilename(filename) {
  // Trim, convert to lowercase, replace spaces with hyphens
  let sanitized = filename.trim().toLowerCase().replace(/\s+/g, '-');
  
  // Remove any character that is not [a-z0-9-_]
  sanitized = sanitized.replace(/[^a-z0-9-_]/g, '');
  
  // Collapse multiple hyphens
  sanitized = sanitized.replace(/-+/g, '-');
  
  // Check against regex pattern: must start with a-z0-9, length 2-64 chars
  const isValid = /^[a-z0-9][a-z0-9-_]{1,63}$/.test(sanitized);
  
  return { sanitized, isValid };
}

// Load registry
function loadRegistry() {
  const registryPath = path.join(ROOT, 'templates', 'registry.json');
  try {
    const data = fs.readFileSync(registryPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load registry:', err.message);
    return [];
  }
}

// GET /api/templates - Return all templates
app.get('/api/templates', (req, res) => {
  const templates = loadRegistry();
  res.json({ ok: true, templates });
});

// GET /api/templates/:id - Return specific template with fragment text
app.get('/api/templates/:id', (req, res) => {
  const templates = loadRegistry();
  const template = templates.find((t) => t.id === req.params.id);

  if (!template) {
    return res.status(404).json({ ok: false, error: 'Template not found' });
  }

  const fragmentPath = path.join(ROOT, template.fragment);
  try {
    const fragmentText = fs.readFileSync(fragmentPath, 'utf8');
    res.json({
      ok: true,
      template,
      fragmentText,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to read fragment' });
  }
});

// POST /api/decks/create - Create and save a new deck
app.post('/api/decks/create', (req, res) => {
  const { filename, slides } = req.body;

  // Validate inputs
  if (typeof filename !== 'string' || !Array.isArray(slides)) {
    return res.status(400).json({ ok: false, error: 'Invalid input: filename and slides required' });
  }

  if (filename.length === 0) {
    return res.status(400).json({ ok: false, error: 'Filename cannot be empty' });
  }

  // Sanitize filename
  const { sanitized, isValid } = sanitizeFilename(filename);
  if (!isValid) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid filename format. Use alphanumeric, hyphens, underscores only.',
    });
  }

  // Check for path traversal attempts
  if (sanitized.includes('..') || sanitized.includes('/') || sanitized.includes('\\')) {
    return res.status(400).json({ ok: false, error: 'Path traversal not allowed' });
  }

  // Check if file already exists
  const deckPath = path.join(ROOT, 'decks', `${sanitized}.qmd`);
  if (fs.existsSync(deckPath)) {
    return res.status(409).json({ ok: false, error: `File "${sanitized}.qmd" already exists` });
  }

  // Load registry and validate all slide IDs exist
  const registry = loadRegistry();
  const templateMap = new Map(registry.map((t) => [t.id, t]));

  for (const slideId of slides) {
    if (!templateMap.has(slideId)) {
      return res.status(400).json({ ok: false, error: `Template "${slideId}" not found` });
    }
  }

  // Read deck wrapper
  const wrapperPath = path.join(ROOT, 'templates', 'deck-wrapper.qmd');
  let wrapperContent;
  try {
    wrapperContent = fs.readFileSync(wrapperPath, 'utf8');
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Failed to read deck wrapper' });
  }

  // Read and concatenate fragments
  const fragmentLines = [];
  try {
    for (const slideId of slides) {
      const template = templateMap.get(slideId);
      const fragmentPath = path.join(ROOT, template.fragment);
      const fragmentText = fs.readFileSync(fragmentPath, 'utf8');
      fragmentLines.push(fragmentText);
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Failed to read fragment files' });
  }

  const slidesContent = fragmentLines.join('\n\n');

  // Replace {{SLIDES}} placeholder
  const deckContent = wrapperContent.replace('{{SLIDES}}', slidesContent);

  // Ensure decks directory exists
  ensureDecksDir();

  // Write deck file
  try {
    fs.writeFileSync(deckPath, deckContent, 'utf8');
    res.json({ ok: true, path: `decks/${sanitized}.qmd` });
  } catch (err) {
    console.error('Failed to write deck:', err);
    res.status(500).json({ ok: false, error: 'Failed to save deck' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✓ Template Browser Server`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`  Press Ctrl+C to stop\n`);
});
