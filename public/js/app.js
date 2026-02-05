/**
 * app.js
 * Main application entry point
 */

import * as api from './api.js';
import * as state from './state.js';
import * as ui from './ui.js';
import * as preview from './preview.js';
import * as deck from './deck.js';

// Expose app object globally for event handlers
window.app = {
  previewTemplate,
  addToSelectedSlides,
};

async function init() {
  try {
    // Load templates
    const templates = await api.fetchTemplates();
    state.setTemplates(templates);
    
    // Render UI
    ui.renderTemplateGrid();
    ui.renderLayoutFilter();
    ui.renderSelectedSlidesList();
    
    // Wire events
    wireEvents();
    
    console.log('✓ Template Browser initialized');
  } catch (err) {
    console.error('Failed to initialize:', err);
    ui.showStatus(`Error: ${err.message}`, 'error');
  }
}

function wireEvents() {
  // Layout filter
  document.getElementById('layoutFilter').addEventListener('change', (e) => {
    state.setFilterLayout(e.target.value);
    ui.renderTemplateGrid();
  });
  
  // Search
  document.getElementById('searchInput').addEventListener('input', (e) => {
    state.setSearchQuery(e.target.value);
    ui.renderTemplateGrid();
  });
  
  // Reset
  document.getElementById('resetBtn').addEventListener('click', () => {
    state.setFilterLayout('');
    state.setSearchQuery('');
    document.getElementById('layoutFilter').value = '';
    document.getElementById('searchInput').value = '';
    ui.renderTemplateGrid();
  });
  
  // Create Deck
  document.getElementById('createDeckBtn').addEventListener('click', createDeck);
  
  // Allow Enter key in filename
  document.getElementById('deckFilename').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') createDeck();
  });
}

async function previewTemplate(templateId) {
  try {
    state.setCurrentPreviewId(templateId);
    
    const { template, fragmentText } = await api.fetchTemplate(templateId);
    
    // Set title
    document.getElementById('previewTitle').textContent = template.name;
    
    // Render preview HTML
    const previewHtml = preview.renderPreview(template, fragmentText);
    
    // Set iframe content
    const frame = document.getElementById('previewFrame');
    frame.srcdoc = previewHtml;
  } catch (err) {
    console.error('Preview failed:', err);
    ui.showStatus(`Preview error: ${err.message}`, 'error');
  }
}

function addToSelectedSlides(templateId) {
  state.addSelectedSlide(templateId);
  ui.renderSelectedSlidesList();
  ui.showStatus(`Added: ${state.getTemplateById(templateId).name}`, 'info');
}

async function createDeck() {
  const filenameInput = document.getElementById('deckFilename');
  const filename = filenameInput.value;
  const { selectedSlides } = state.getState();
  
  // Validate filename
  const validation = deck.validateFilename(filename);
  if (!validation.valid) {
    ui.showStatus(validation.error, 'error');
    return;
  }
  
  // Validate slides selected
  if (selectedSlides.length === 0) {
    ui.showStatus('Please add at least one slide', 'error');
    return;
  }
  
  try {
    ui.showStatus('Creating deck...', 'info');
    
    const result = await api.createDeck(filename, selectedSlides);
    
    ui.showStatus(
      `✓ Deck created: ${result.path}\n\nRun: quarto render ${result.path}`,
      'success'
    );
  } catch (err) {
    console.error('Deck creation failed:', err);
    ui.showStatus(err.message, 'error');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
