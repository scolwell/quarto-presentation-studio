/**
 * Build Module
 * Deck assembly, preview, and export
 */

import * as state from './state.js';
import * as storage from '../utils/storage.js';
import { buildQMD, buildSCSS, buildREADME, downloadDeckFiles } from '../utils/deck-generator.js';

let selectedSlides = [];
let currentTheme = null;
let currentTab = 'preview';

/**
 * Initialize build module
 */
export function init() {
    console.log('Initializing Build module...');
    
    // Load selected slides from state
    selectedSlides = state.getState('templates.selected') || [];
    
    // Load current theme
    currentTheme = state.getState('theme');
    
    // Load saved metadata
    const savedMetadata = storage.loadDeckMetadata();
    if (savedMetadata) {
        loadMetadata(savedMetadata);
    } else {
        // Set default date
        document.getElementById('build-date').value = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    // Wire up controls
    wireControls();
    
    // Wire up tabs
    wireTabs();
    
    // Update UI
    updateUI();
    
    // Subscribe to state changes
    state.subscribe('templates.selected', (slides) => {
        selectedSlides = slides || [];
        updateUI();
    });
    
    state.subscribe('theme', (theme) => {
        currentTheme = theme;
        updateThemeDisplay();
        updateCodeViews();
    });
}

/**
 * Cleanup when leaving module
 */
export function cleanup() {
    console.log('Cleaning up Build module...');
    
    // Save metadata
    saveMetadata();
}

/**
 * Wire up control inputs and buttons
 */
function wireControls() {
    // Browse button (empty state)
    const browseBtn = document.getElementById('build-browseBtn');
    if (browseBtn) {
        browseBtn.addEventListener('click', () => {
            if (window.app && window.app.router) {
                window.app.router.switchModule('browse');
            }
        });
    }
    
    // Clear all button
    const clearAllBtn = document.getElementById('build-clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllSlides);
    }
    
    // Change theme button
    const changeThemeBtn = document.getElementById('build-changeThemeBtn');
    if (changeThemeBtn) {
        changeThemeBtn.addEventListener('click', () => {
            if (window.app && window.app.router) {
                window.app.router.switchModule('design');
            }
        });
    }
    
    // Download button
    const downloadBtn = document.getElementById('build-downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadDeck);
    }
    
    // Metadata inputs - auto-save on change
    ['build-title', 'build-subtitle', 'build-author', 'build-date', 'build-filename'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('change', () => {
                saveMetadata();
                updateCodeViews();
            });
        }
    });
}

/**
 * Wire up preview tabs
 */
function wireTabs() {
    const tabs = document.querySelectorAll('.build-preview-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        });
    });
}

/**
 * Switch preview tab
 */
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    const tabs = document.querySelectorAll('.build-preview-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.style.borderBottomColor = '#0067FF';
            tab.style.background = '#FFFFFF';
            tab.style.color = '#1F2933';
            tab.style.fontWeight = '500';
        } else {
            tab.style.borderBottomColor = 'transparent';
            tab.style.background = 'transparent';
            tab.style.color = '#5F6B7A';
            tab.style.fontWeight = 'normal';
        }
    });
    
    // Update content panes
    const panes = {
        preview: document.getElementById('build-preview'),
        qmd: document.getElementById('build-qmd'),
        scss: document.getElementById('build-scss'),
        readme: document.getElementById('build-readme')
    };
    
    Object.keys(panes).forEach(key => {
        if (panes[key]) {
            panes[key].style.display = key === tabName ? 'block' : 'none';
        }
    });
    
    // Generate code views if switching to them
    if (tabName !== 'preview') {
        updateCodeViews();
    }
}

/**
 * Update entire UI based on selected slides
 */
function updateUI() {
    const emptyState = document.getElementById('build-emptyState');
    const content = document.getElementById('build-content');
    
    if (selectedSlides.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (content) content.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        if (content) content.style.display = 'grid';
        
        renderSlidesList();
        updateSlideCount();
        updateThemeDisplay();
        updatePreview();
    }
}

/**
 * Render slides list
 */
function renderSlidesList() {
    const list = document.getElementById('build-slidesList');
    if (!list) return;
    
    list.innerHTML = '';
    
    selectedSlides.forEach((slide, index) => {
        const item = createSlideItem(slide, index);
        list.appendChild(item);
    });
}

/**
 * Create slide list item
 */
function createSlideItem(slide, index) {
    const template = document.getElementById('build-slideTemplate');
    if (!template) return document.createElement('li');
    
    const clone = template.content.cloneNode(true);
    
    const numberEl = clone.querySelector('.slide-number');
    const nameEl = clone.querySelector('.slide-name');
    const layoutEl = clone.querySelector('.slide-layout');
    
    if (numberEl) numberEl.textContent = `${index + 1}.`;
    if (nameEl) nameEl.textContent = slide.name;
    if (layoutEl) layoutEl.textContent = slide.layout;
    
    // Wire up buttons
    const upBtn = clone.querySelector('.slide-up');
    const downBtn = clone.querySelector('.slide-down');
    const removeBtn = clone.querySelector('.slide-remove');
    
    if (upBtn) {
        upBtn.addEventListener('click', () => moveSlideUp(index));
        if (index === 0) upBtn.style.opacity = '0.3';
    }
    
    if (downBtn) {
        downBtn.addEventListener('click', () => moveSlideDown(index));
        if (index === selectedSlides.length - 1) downBtn.style.opacity = '0.3';
    }
    
    if (removeBtn) {
        removeBtn.addEventListener('click', () => removeSlide(index));
    }
    
    const wrapper = document.createElement('div');
    wrapper.appendChild(clone);
    return wrapper.firstElementChild;
}

/**
 * Move slide up
 */
export function moveSlideUp(index) {
    if (index === 0) return;
    
    const newSlides = [...selectedSlides];
    [newSlides[index - 1], newSlides[index]] = [newSlides[index], newSlides[index - 1]];
    
    selectedSlides = newSlides;
    state.setState('templates.selected', newSlides);
    updateUI();
}

/**
 * Move slide down
 */
export function moveSlideDown(index) {
    if (index === selectedSlides.length - 1) return;
    
    const newSlides = [...selectedSlides];
    [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
    
    selectedSlides = newSlides;
    state.setState('templates.selected', newSlides);
    updateUI();
}

/**
 * Remove slide
 */
export function removeSlide(index) {
    const newSlides = selectedSlides.filter((_, i) => i !== index);
    selectedSlides = newSlides;
    state.setState('templates.selected', newSlides);
    updateUI();
}

/**
 * Clear all slides
 */
function clearAllSlides() {
    if (confirm('Remove all slides from deck?')) {
        selectedSlides = [];
        state.setState('templates.selected', []);
        updateUI();
    }
}

/**
 * Update slide count display
 */
function updateSlideCount() {
    const countEl = document.getElementById('build-slideCount');
    if (countEl) {
        const count = selectedSlides.length;
        countEl.textContent = `${count} slide${count !== 1 ? 's' : ''}`;
    }
}

/**
 * Update theme display
 */
function updateThemeDisplay() {
    const themeNameEl = document.getElementById('build-themeName');
    if (themeNameEl && currentTheme) {
        themeNameEl.textContent = currentTheme.name || 'Custom Theme';
    }
}

/**
 * Update preview
 */
function updatePreview() {
    const previewEl = document.getElementById('build-preview');
    if (!previewEl) return;
    
    if (selectedSlides.length === 0) {
        previewEl.innerHTML = '<div style="text-align: center; color: #5F6B7A; padding: 40px 20px;"><p>No slides to preview</p></div>';
        return;
    }
    
    // Create simple preview list
    let previewHTML = '<div style="font-size: 13px; color: #1F2933;">';
    previewHTML += `<div style="background: #F6F7F9; padding: 12px; border-radius: 3px; margin-bottom: 16px;">`;
    previewHTML += `<strong>Deck Preview</strong><br>`;
    previewHTML += `${selectedSlides.length} slides will be combined in your presentation`;
    previewHTML += `</div>`;
    
    previewHTML += '<ol style="padding-left: 20px;">';
    selectedSlides.forEach((slide, index) => {
        previewHTML += `<li style="margin-bottom: 12px;">`;
        previewHTML += `<div style="font-weight: 500;">${slide.name}</div>`;
        previewHTML += `<div style="font-size: 11px; color: #5F6B7A;">${slide.layout}</div>`;
        previewHTML += `</li>`;
    });
    previewHTML += '</ol></div>';
    
    previewEl.innerHTML = previewHTML;
}

/**
 * Update code views (QMD, SCSS, README)
 */
async function updateCodeViews() {
    if (selectedSlides.length === 0) return;
    
    const metadata = getMetadata();
    
    try {
        // Generate QMD
        const qmdCode = await buildQMD(selectedSlides, currentTheme, metadata);
        const qmdEl = document.getElementById('build-qmdCode');
        if (qmdEl) qmdEl.textContent = qmdCode;
        
        // Generate SCSS
        const scssCode = buildSCSS(currentTheme);
        const scssEl = document.getElementById('build-scssCode');
        if (scssEl) scssEl.textContent = scssCode;
        
        // Generate README
        const readmeCode = buildREADME(metadata, currentTheme, selectedSlides.length);
        const readmeEl = document.getElementById('build-readmeCode');
        if (readmeEl) readmeEl.textContent = readmeCode;
    } catch (error) {
        console.error('Error updating code views:', error);
    }
}

/**
 * Get metadata from inputs
 */
function getMetadata() {
    return {
        title: document.getElementById('build-title')?.value || 'My Presentation',
        subtitle: document.getElementById('build-subtitle')?.value || '',
        author: document.getElementById('build-author')?.value || 'Author Name',
        date: document.getElementById('build-date')?.value || new Date().toLocaleDateString(),
        filename: document.getElementById('build-filename')?.value || 'my-deck'
    };
}

/**
 * Load metadata into inputs
 */
function loadMetadata(metadata) {
    if (metadata.title) document.getElementById('build-title').value = metadata.title;
    if (metadata.subtitle) document.getElementById('build-subtitle').value = metadata.subtitle;
    if (metadata.author) document.getElementById('build-author').value = metadata.author;
    if (metadata.date) document.getElementById('build-date').value = metadata.date;
    if (metadata.filename) document.getElementById('build-filename').value = metadata.filename;
}

/**
 * Save metadata to storage
 */
function saveMetadata() {
    const metadata = getMetadata();
    storage.saveDeckMetadata(metadata);
}

/**
 * Download deck files
 */
async function downloadDeck() {
    if (selectedSlides.length === 0) {
        showStatus('No slides to export', 'error');
        return;
    }
    
    const metadata = getMetadata();
    
    // Validate filename
    if (!metadata.filename || metadata.filename.trim() === '') {
        showStatus('Please enter a filename', 'error');
        return;
    }
    
    showStatus('Generating deck files...', 'info');
    
    try {
        // Generate files
        const qmd = await buildQMD(selectedSlides, currentTheme, metadata);
        const scss = buildSCSS(currentTheme);
        const readme = buildREADME(metadata, currentTheme, selectedSlides.length);
        
        // Get export options
        const includeReadme = document.getElementById('build-includeReadme')?.checked !== false;
        const includeTheme = document.getElementById('build-includeTheme')?.checked !== false;
        
        // Download files
        await downloadDeckFiles(qmd, scss, readme, metadata.filename, {
            includeReadme,
            includeTheme
        });
        
        showStatus('Deck downloaded successfully!', 'success');
        
        // Save to library
        saveDeckToLibrary(metadata, selectedSlides);
    } catch (error) {
        console.error('Error downloading deck:', error);
        showStatus('Error generating deck files', 'error');
    }
}

/**
 * Save deck to library
 */
function saveDeckToLibrary(metadata, slides) {
    const deck = {
        id: `deck-${Date.now()}`,
        filename: metadata.filename,
        title: metadata.title,
        author: metadata.author,
        date: metadata.date,
        slideCount: slides.length,
        theme: currentTheme,
        slides: slides.map(s => s.id)
    };
    
    storage.saveDeckToLibrary(deck);
}

/**
 * Show status message
 */
function showStatus(message, type = 'info') {
    const statusEl = document.getElementById('build-status');
    if (!statusEl) return;
    
    statusEl.textContent = message;
    statusEl.style.display = 'block';
    
    // Style based on type
    if (type === 'success') {
        statusEl.style.background = '#E8F5E9';
        statusEl.style.color = '#2E7D32';
        statusEl.style.borderLeft = '3px solid #2E7D32';
    } else if (type === 'error') {
        statusEl.style.background = '#FFEBEE';
        statusEl.style.color = '#C62828';
        statusEl.style.borderLeft = '3px solid #C62828';
    } else {
        statusEl.style.background = '#EFF6FB';
        statusEl.style.color = '#5B7C99';
        statusEl.style.borderLeft = '3px solid #5B7C99';
    }
    
    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => {
            statusEl.style.display = 'none';
        }, 5000);
    }
}
