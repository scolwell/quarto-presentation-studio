/**
 * Browse Module
 * Template browser with search, filter, preview, and selection
 */

import * as state from './state.js';
import * as api from '../api.js';

let allTemplates = [];
let filteredTemplates = [];
let currentPreviewTemplate = null;

/**
 * Initialize browse module
 */
export function init() {
    console.log('Initializing Browse module...');
    
    // Load templates from state
    allTemplates = state.getState('templates.all') || [];
    filteredTemplates = [...allTemplates];
    
    // Populate layout filter
    populateLayoutFilter();
    
    // Wire up controls
    wireControls();
    
    // Wire up modal
    wireModal();
    
    // Render initial grid
    renderTemplateGrid();
    
    // Update stats
    updateStats();
}

/**
 * Cleanup when leaving module
 */
export function cleanup() {
    console.log('Cleaning up Browse module...');
}

/**
 * Populate layout filter dropdown
 */
function populateLayoutFilter() {
    const select = document.getElementById('browse-layoutFilter');
    if (!select) return;
    
    // Get unique layouts
    const layouts = [...new Set(allTemplates.map(t => t.layout))].sort();
    
    // Clear existing options except "All Layouts"
    select.innerHTML = '<option value="">All Layouts</option>';
    
    // Add layout options
    layouts.forEach(layout => {
        const option = document.createElement('option');
        option.value = layout;
        option.textContent = layout.charAt(0).toUpperCase() + layout.slice(1);
        select.appendChild(option);
    });
}

/**
 * Wire up control inputs
 */
function wireControls() {
    // Layout filter
    const layoutFilter = document.getElementById('browse-layoutFilter');
    if (layoutFilter) {
        layoutFilter.addEventListener('change', applyFilters);
    }
    
    // Search input
    const searchInput = document.getElementById('browse-searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    // Reset button
    const resetBtn = document.getElementById('browse-resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

/**
 * Wire up modal controls
 */
function wireModal() {
    const modal = document.getElementById('browse-previewModal');
    const closeBtn = document.getElementById('browse-closeModal');
    const cancelBtn = document.getElementById('browse-modalCancel');
    const addBtn = document.getElementById('browse-modalAdd');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePreviewModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hidePreviewModal);
    }
    
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (currentPreviewTemplate) {
                addTemplateToSelection(currentPreviewTemplate.id);
                hidePreviewModal();
            }
        });
    }
    
    // Click outside to close
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hidePreviewModal();
            }
        });
    }
    
    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            hidePreviewModal();
        }
    });
}

/**
 * Apply search and filter
 */
function applyFilters() {
    const layoutFilter = document.getElementById('browse-layoutFilter')?.value || '';
    const searchInput = document.getElementById('browse-searchInput')?.value.toLowerCase() || '';
    
    filteredTemplates = allTemplates.filter(template => {
        // Layout filter
        if (layoutFilter && template.layout !== layoutFilter) {
            return false;
        }
        
        // Search filter
        if (searchInput) {
            const searchable = [
                template.name,
                template.id,
                template.layout,
                template.powerpointEquivalent,
                ...(template.tags || [])
            ].join(' ').toLowerCase();
            
            if (!searchable.includes(searchInput)) {
                return false;
            }
        }
        
        return true;
    });
    
    renderTemplateGrid();
    updateStats();
}

/**
 * Reset all filters
 */
function resetFilters() {
    const layoutFilter = document.getElementById('browse-layoutFilter');
    const searchInput = document.getElementById('browse-searchInput');
    
    if (layoutFilter) layoutFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    applyFilters();
}

/**
 * Render template grid
 */
export function renderTemplateGrid() {
    const grid = document.getElementById('browse-templateGrid');
    const emptyState = document.getElementById('browse-emptyState');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (filteredTemplates.length === 0) {
        grid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';
    
    filteredTemplates.forEach(template => {
        const card = createTemplateCard(template);
        grid.appendChild(card);
    });
}

/**
 * Create template card element
 */
function createTemplateCard(template) {
    const templateEl = document.getElementById('browse-templateCard');
    if (!templateEl) return document.createElement('div');
    
    const clone = templateEl.content.cloneNode(true);
    
    // Set template data
    const cardName = clone.querySelector('.card-name');
    const cardLayout = clone.querySelector('.card-layout');
    const cardMetaLayout = clone.querySelector('.card-meta-layout');
    const cardMetaPpt = clone.querySelector('.card-meta-ppt');
    const cardTags = clone.querySelector('.card-tags');
    
    if (cardName) cardName.textContent = template.name;
    if (cardLayout) cardLayout.textContent = template.layout;
    if (cardMetaLayout) cardMetaLayout.textContent = template.layout;
    if (cardMetaPpt) cardMetaPpt.textContent = template.powerpointEquivalent || 'N/A';
    
    // Add tags
    if (cardTags && template.tags) {
        template.tags.slice(0, 3).forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.style.cssText = 'background: #EFF6FB; color: #5B7C99; padding: 2px 8px; border-radius: 2px; font-size: 11px;';
            tagEl.textContent = tag;
            cardTags.appendChild(tagEl);
        });
    }
    
    // Wire up buttons
    const previewBtn = clone.querySelector('.btn-preview');
    const addBtn = clone.querySelector('.btn-add');
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => showTemplatePreview(template.id));
        previewBtn.addEventListener('mouseenter', (e) => {
            e.target.style.background = '#EFF6FB';
        });
        previewBtn.addEventListener('mouseleave', (e) => {
            e.target.style.background = '#FFFFFF';
        });
    }
    
    if (addBtn) {
        addBtn.addEventListener('click', () => addTemplateToSelection(template.id));
        addBtn.addEventListener('mouseenter', (e) => {
            e.target.style.background = '#0052CC';
        });
        addBtn.addEventListener('mouseleave', (e) => {
            e.target.style.background = '#0067FF';
        });
    }
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.appendChild(clone);
    
    // Add hover effect to card
    const card = wrapper.firstElementChild;
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#9AA4B2';
            card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#DADDE2';
            card.style.boxShadow = 'none';
        });
    }
    
    return wrapper.firstElementChild;
}

/**
 * Show template preview modal
 */
export function showTemplatePreview(templateId) {
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    currentPreviewTemplate = template;
    
    const modal = document.getElementById('browse-previewModal');
    const previewTitle = document.getElementById('browse-previewTitle');
    const previewMeta = document.getElementById('browse-previewMeta');
    const previewFrame = document.getElementById('browse-previewFrame');
    
    if (previewTitle) {
        previewTitle.textContent = template.name;
    }
    
    if (previewMeta) {
        previewMeta.textContent = `${template.layout} • ${template.powerpointEquivalent}`;
    }
    
    if (previewFrame) {
        // Load preview HTML
        loadPreviewContent(template, previewFrame);
    }
    
    if (modal) {
        modal.style.display = 'flex';
    }
}

/**
 * Hide preview modal
 */
function hidePreviewModal() {
    const modal = document.getElementById('browse-previewModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentPreviewTemplate = null;
}

/**
 * Load preview content into iframe
 */
async function loadPreviewContent(template, iframe) {
    try {
        // Fetch the fragment file
        const response = await fetch(`/${template.fragment}`);
        const fragmentContent = await response.text();
        
        // Create preview HTML
        const previewHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 40px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            color: #1F2933;
        }
        h1, h2, h3 { color: #1F2933; margin-top: 0; }
        h1 { font-size: 36px; }
        h2 { font-size: 28px; }
        h3 { font-size: 22px; }
        p { font-size: 16px; line-height: 1.6; color: #5F6B7A; }
        code { background: #F6F7F9; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
        pre { background: #F6F7F9; padding: 16px; border-radius: 3px; overflow-x: auto; }
        ul, ol { margin-left: 1.5em; }
        li { margin-bottom: 0.5em; color: #5F6B7A; }
    </style>
</head>
<body>
    <div class="slide-preview">
        <h3 style="color: #9AA4B2; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">Preview: ${template.slideClass || template.layout}</h3>
        ${convertQuartoToHTML(fragmentContent)}
    </div>
</body>
</html>
        `;
        
        // Write to iframe
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(previewHTML);
        doc.close();
    } catch (error) {
        console.error('Error loading preview:', error);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <html>
            <body style="padding: 40px; font-family: sans-serif;">
                <p style="color: #C62828;">Failed to load preview</p>
            </body>
            </html>
        `);
        doc.close();
    }
}

/**
 * Convert Quarto markdown to simple HTML
 */
function convertQuartoToHTML(quarto) {
    // Remove Quarto frontmatter
    let content = quarto.replace(/^---[\s\S]*?---\n/, '');
    
    // Remove slide headers (## {.class})
    content = content.replace(/^##\s*\{[^}]*\}\s*$/gm, '');
    
    // Convert headers
    content = content.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    content = content.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    content = content.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Convert bold and italic
    content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert inline code
    content = content.replace(/`(.+?)`/g, '<code>$1</code>');
    
    // Convert lists (simple)
    content = content.replace(/^- (.+)$/gm, '<li>$1</li>');
    content = content.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Convert paragraphs
    content = content.split('\n\n').map(para => {
        para = para.trim();
        if (para && !para.startsWith('<')) {
            return `<p>${para}</p>`;
        }
        return para;
    }).join('\n');
    
    return content;
}

/**
 * Add template to selection
 */
export function addTemplateToSelection(templateId) {
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    // Get current selection from state
    const currentSelection = state.getState('templates.selected') || [];
    
    // Check if already added
    if (currentSelection.find(t => t.id === templateId)) {
        alert('Template already added to deck');
        return;
    }
    
    // Add to selection
    const updatedSelection = [...currentSelection, {
        id: template.id,
        name: template.name,
        layout: template.layout,
        fragment: template.fragment
    }];
    
    state.setState('templates.selected', updatedSelection);
    
    // Show feedback
    showToast(`Added "${template.name}" to deck (${updatedSelection.length} slides)`);
}

/**
 * Show toast notification
 */
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1F2933;
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 3px;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Update stats display
 */
function updateStats() {
    const statsEl = document.getElementById('browse-stats');
    if (!statsEl) return;
    
    const total = allTemplates.length;
    const filtered = filteredTemplates.length;
    const selected = (state.getState('templates.selected') || []).length;
    
    if (filtered === total) {
        statsEl.textContent = `Showing ${total} templates • ${selected} in deck`;
    } else {
        statsEl.textContent = `Showing ${filtered} of ${total} templates • ${selected} in deck`;
    }
}
