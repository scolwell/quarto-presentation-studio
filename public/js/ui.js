/**
 * ui.js
 * UI rendering and event handling
 */

import * as state from './state.js';

export function renderTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  const filtered = state.getFilteredTemplates();
  
  grid.innerHTML = '';
  
  filtered.forEach((template) => {
    const card = createTemplateCard(template);
    grid.appendChild(card);
  });
}

function createTemplateCard(template) {
  const template_el = document.getElementById('templateCardTemplate');
  const clone = template_el.content.cloneNode(true);
  
  clone.querySelector('.card-name').textContent = template.name;
  clone.querySelector('.card-layout').textContent = template.layout;
  clone.querySelector('.meta-layout').textContent = template.layout;
  clone.querySelector('.meta-ppt').textContent = template.powerpointEquivalent;
  
  clone.querySelector('.btn-preview').addEventListener('click', () => {
    window.app.previewTemplate(template.id);
  });
  
  clone.querySelector('.btn-add').addEventListener('click', () => {
    window.app.addToSelectedSlides(template.id);
  });
  
  const card = document.createElement('div');
  card.appendChild(clone);
  return card.firstElementChild;
}

export function renderLayoutFilter() {
  const select = document.getElementById('layoutFilter');
  const layouts = state.getUniqueLayers();
  
  // Keep "All Layouts" option
  const allOption = select.querySelector('option[value=""]');
  
  layouts.forEach((layout) => {
    const option = document.createElement('option');
    option.value = layout;
    option.textContent = layout;
    select.appendChild(option);
  });
}

export function renderSelectedSlidesList() {
  const list = document.getElementById('selectedSlides');
  const { selectedSlides, templates } = state.getState();
  
  list.innerHTML = '';
  
  selectedSlides.forEach((templateId, index) => {
    const template = state.getTemplateById(templateId);
    if (!template) return;
    
    const template_el = document.getElementById('selectedSlideTemplate');
    const clone = template_el.content.cloneNode(true);
    
    clone.querySelector('.slide-index').textContent = `${index + 1}.`;
    clone.querySelector('.slide-name').textContent = template.name;
    
    clone.querySelector('.btn-up').addEventListener('click', () => {
      state.moveSelectedSlideUp(index);
      renderSelectedSlidesList();
    });
    
    clone.querySelector('.btn-down').addEventListener('click', () => {
      state.moveSelectedSlideDown(index);
      renderSelectedSlidesList();
    });
    
    clone.querySelector('.btn-remove').addEventListener('click', () => {
      state.removeSelectedSlide(index);
      renderSelectedSlidesList();
    });
    
    const li = document.createElement('li');
    li.appendChild(clone);
    list.appendChild(li.firstElementChild);
  });
  
  // Show/hide empty state
  if (selectedSlides.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No slides selected';
    empty.style.color = '#9ca3af';
    empty.style.padding = '10px 0';
    empty.style.fontStyle = 'italic';
    list.appendChild(empty);
  }
}

export function showStatus(message, type = 'info') {
  const statusEl = document.getElementById('deckStatus');
  statusEl.textContent = message;
  statusEl.className = `status-message show ${type}`;
  
  // Auto-hide after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      statusEl.classList.remove('show');
    }, 5000);
  }
}

export function clearStatus() {
  const statusEl = document.getElementById('deckStatus');
  statusEl.classList.remove('show');
  statusEl.textContent = '';
}
