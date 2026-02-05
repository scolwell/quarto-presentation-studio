/**
 * api.js
 * API client for server endpoints
 */

const API_BASE = '/api';

export async function fetchTemplates() {
  const res = await fetch(`${API_BASE}/templates`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Failed to fetch templates');
  return data.templates;
}

export async function fetchTemplate(id) {
  const res = await fetch(`${API_BASE}/templates/${id}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Failed to fetch template');
  return data;
}

export async function createDeck(filename, slides) {
  const res = await fetch(`${API_BASE}/decks/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, slides }),
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error(data.error || 'Failed to create deck');
  }
  return data;
}
