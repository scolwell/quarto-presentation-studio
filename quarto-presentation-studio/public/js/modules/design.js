/**
 * Design Module
 * Theme designer functionality with preset system
 */

import * as state from './state.js';
import * as storage from '../utils/storage.js';
import { generateSCSS, generateYAML } from '../utils/theme-generator.js';

// Built-in theme presets
const BUILT_IN_THEMES = {
    academic: {
        id: 'academic',
        name: 'Academic',
        description: 'Professional academic style',
        isBuiltIn: true,
        colors: {
            bg: '#FFFFFF',
            text: '#1F2933',
            heading: '#0F1419',
            accent: '#0067FF'
        },
        fonts: {
            heading: 'Georgia',
            body: 'Calibri'
        },
        sizes: {
            title: 44,
            body: 24
        },
        options: {
            slideNumber: false,
            progress: false,
            controls: true
        }
    },
    business: {
        id: 'business',
        name: 'Business',
        description: 'Clean corporate style',
        isBuiltIn: true,
        colors: {
            bg: '#FFFFFF',
            text: '#2D3748',
            heading: '#1A202C',
            accent: '#2563EB'
        },
        fonts: {
            heading: 'Arial',
            body: 'Arial'
        },
        sizes: {
            title: 48,
            body: 26
        },
        options: {
            slideNumber: true,
            progress: true,
            controls: true
        }
    },
    creative: {
        id: 'creative',
        name: 'Creative',
        description: 'Bold and modern',
        isBuiltIn: true,
        colors: {
            bg: '#1F2933',
            text: '#E8EEF3',
            heading: '#FFFFFF',
            accent: '#FF6B6B'
        },
        fonts: {
            heading: 'Helvetica',
            body: 'Helvetica'
        },
        sizes: {
            title: 52,
            body: 28
        },
        options: {
            slideNumber: false,
            progress: true,
            controls: true
        }
    }
};

let currentTheme = null;
let customThemes = {};
let isEditingCustom = false;
let updateTimeout = null;

/**
 * Initialize design module
 */
export function init() {
    console.log('Initializing Design module...');
    
    // Load custom themes from storage
    customThemes = storage.loadThemePresets() || {};
    
    // Load current theme from state or default to academic
    const savedTheme = state.getState('theme');
    currentTheme = savedTheme || BUILT_IN_THEMES.academic;
    
    // Populate preset selector
    populatePresetSelector();
    
    // Wire up controls
    wireControls();
    
    // Wire up buttons
    wireButtons();
    
    // Wire up tabs
    wireTabs();
    
    // Load initial theme
    loadTheme(currentTheme);
    
    // Initial preview update
    updatePreview();
    updateCodeViews();
}

/**
 * Cleanup when leaving module
 */
export function cleanup() {
    console.log('Cleaning up Design module...');
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
}

/**
 * Populate preset selector dropdown
 */
function populatePresetSelector() {
    const select = document.getElementById('themePresetSelect');
    const customGroup = document.getElementById('customThemesGroup');
    
    if (!select || !customGroup) return;
    
    // Clear custom group
    customGroup.innerHTML = '';
    
    // Add custom themes
    Object.values(customThemes).forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.id;
        option.textContent = `✏️ ${theme.name} (custom)`;
        customGroup.appendChild(option);
    });
    
    // Set current theme
    if (currentTheme) {
        select.value = currentTheme.id;
    }
}

/**
 * Wire up all control inputs
 */
function wireControls() {
    // Color inputs
    ['bgColor', 'textColor', 'headingColor', 'accentColor'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                debouncedUpdate();
            });
        }
    });
    
    // Font selects
    ['headingFont', 'bodyFont'].forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.addEventListener('change', () => {
                updatePreview();
                updateCodeViews();
            });
        }
    });
    
    // Size sliders
    const titleSize = document.getElementById('titleSize');
    const bodySize = document.getElementById('bodySize');
    
    if (titleSize) {
        titleSize.addEventListener('input', (e) => {
            document.getElementById('titleSizeValue').textContent = e.target.value;
            debouncedUpdate();
        });
    }
    
    if (bodySize) {
        bodySize.addEventListener('input', (e) => {
            document.getElementById('bodySizeValue').textContent = e.target.value;
            debouncedUpdate();
        });
    }
    
    // Checkboxes
    ['showSlideNumber', 'showProgress', 'showControls'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                updateCodeViews();
            });
        }
    });
    
    // Preset selector
    const presetSelect = document.getElementById('themePresetSelect');
    if (presetSelect) {
        presetSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            if (value === '__new__') {
                createNewTheme();
            } else {
                applyPreset(value);
            }
        });
    }
}

/**
 * Wire up action buttons
 */
function wireButtons() {
    // Save As button
    const saveAsBtn = document.getElementById('saveAsBtn');
    if (saveAsBtn) {
        saveAsBtn.addEventListener('click', showSaveModal);
    }
    
    // Reset button
    const resetBtn = document.getElementById('resetThemeBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetToDefault);
    }
    
    // Update button (shown only when editing custom theme)
    const updateBtn = document.getElementById('updateThemeBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', updateCurrentTheme);
    }
    
    // Delete button (shown only for custom themes)
    const deleteBtn = document.getElementById('deleteThemeBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteCurrentTheme);
    }
    
    // Apply to Deck button
    const applyBtn = document.getElementById('applyToDeckBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyToDeck);
    }
    
    // Modal buttons
    const saveConfirmBtn = document.getElementById('saveThemeConfirmBtn');
    const saveCancelBtn = document.getElementById('saveThemeCancelBtn');
    
    if (saveConfirmBtn) {
        saveConfirmBtn.addEventListener('click', confirmSaveTheme);
    }
    
    if (saveCancelBtn) {
        saveCancelBtn.addEventListener('click', hideSaveModal);
    }
}

/**
 * Wire up preview tabs
 */
function wireTabs() {
    const tabs = document.querySelectorAll('.preview-tab');
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
    // Update tab buttons
    const tabs = document.querySelectorAll('.preview-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
            tab.style.borderBottomColor = '#0067FF';
            tab.style.background = '#FFFFFF';
            tab.style.color = '#1F2933';
        } else {
            tab.classList.remove('active');
            tab.style.borderBottomColor = 'transparent';
            tab.style.background = 'transparent';
            tab.style.color = '#5F6B7A';
        }
    });
    
    // Update content panes
    const panes = {
        preview: document.getElementById('previewPane'),
        yaml: document.getElementById('yamlPane'),
        scss: document.getElementById('scssPane')
    };
    
    Object.keys(panes).forEach(key => {
        if (panes[key]) {
            panes[key].style.display = key === tabName ? 'block' : 'none';
        }
    });
}

/**
 * Debounced update for real-time changes
 */
function debouncedUpdate() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    updateTimeout = setTimeout(() => {
        updatePreview();
        updateCodeViews();
    }, 150);
}

/**
 * Update live preview
 */
export function updatePreview() {
    const theme = getCurrentThemeFromControls();
    
    const previewPane = document.getElementById('previewPane');
    const previewTitle = document.getElementById('previewTitle');
    const previewBody = document.getElementById('previewBody');
    
    if (previewPane) {
        previewPane.style.background = theme.colors.bg;
        previewPane.style.color = theme.colors.text;
    }
    
    if (previewTitle) {
        previewTitle.style.fontFamily = theme.fonts.heading;
        previewTitle.style.fontSize = `${theme.sizes.title}px`;
        previewTitle.style.color = theme.colors.heading;
    }
    
    if (previewBody) {
        previewBody.style.fontFamily = theme.fonts.body;
        previewBody.style.fontSize = `${theme.sizes.body}px`;
        previewBody.style.color = theme.colors.text;
    }
}

/**
 * Update YAML and SCSS code views
 */
export function updateCodeViews() {
    const theme = getCurrentThemeFromControls();
    
    const yamlCode = document.getElementById('yamlCode');
    const scssCode = document.getElementById('scssCode');
    
    if (yamlCode) {
        yamlCode.textContent = generateYAML(theme);
    }
    
    if (scssCode) {
        scssCode.textContent = generateSCSS(theme);
    }
}

/**
 * Get current theme from control values
 */
function getCurrentThemeFromControls() {
    return {
        id: currentTheme?.id || 'custom',
        name: currentTheme?.name || 'Custom Theme',
        isBuiltIn: currentTheme?.isBuiltIn || false,
        colors: {
            bg: document.getElementById('bgColor')?.value || '#FFFFFF',
            text: document.getElementById('textColor')?.value || '#000000',
            heading: document.getElementById('headingColor')?.value || '#000000',
            accent: document.getElementById('accentColor')?.value || '#0067FF'
        },
        fonts: {
            heading: document.getElementById('headingFont')?.value || 'Georgia',
            body: document.getElementById('bodyFont')?.value || 'Calibri'
        },
        sizes: {
            title: parseInt(document.getElementById('titleSize')?.value || 44),
            body: parseInt(document.getElementById('bodySize')?.value || 24)
        },
        options: {
            slideNumber: document.getElementById('showSlideNumber')?.checked || false,
            progress: document.getElementById('showProgress')?.checked || false,
            controls: document.getElementById('showControls')?.checked || true
        }
    };
}

/**
 * Load theme into controls
 */
export function loadTheme(theme) {
    currentTheme = theme;
    
    // Load colors
    if (theme.colors) {
        setInputValue('bgColor', theme.colors.bg);
        setInputValue('textColor', theme.colors.text);
        setInputValue('headingColor', theme.colors.heading);
        setInputValue('accentColor', theme.colors.accent);
    }
    
    // Load fonts
    if (theme.fonts) {
        setInputValue('headingFont', theme.fonts.heading);
        setInputValue('bodyFont', theme.fonts.body);
    }
    
    // Load sizes
    if (theme.sizes) {
        setInputValue('titleSize', theme.sizes.title);
        setInputValue('bodySize', theme.sizes.body);
        if (document.getElementById('titleSizeValue')) {
            document.getElementById('titleSizeValue').textContent = theme.sizes.title;
        }
        if (document.getElementById('bodySizeValue')) {
            document.getElementById('bodySizeValue').textContent = theme.sizes.body;
        }
    }
    
    // Load options
    if (theme.options) {
        setCheckboxValue('showSlideNumber', theme.options.slideNumber);
        setCheckboxValue('showProgress', theme.options.progress);
        setCheckboxValue('showControls', theme.options.controls);
    }
    
    // Update button visibility
    updateButtonVisibility();
    
    // Update preview
    updatePreview();
    updateCodeViews();
}

/**
 * Helper to set input value safely
 */
function setInputValue(id, value) {
    const input = document.getElementById(id);
    if (input) {
        input.value = value;
    }
}

/**
 * Helper to set checkbox value safely
 */
function setCheckboxValue(id, value) {
    const checkbox = document.getElementById(id);
    if (checkbox) {
        checkbox.checked = value;
    }
}

/**
 * Update button visibility based on current theme
 */
function updateButtonVisibility() {
    const updateBtn = document.getElementById('updateThemeBtn');
    const deleteBtn = document.getElementById('deleteThemeBtn');
    
    isEditingCustom = currentTheme && !currentTheme.isBuiltIn;
    
    if (updateBtn) {
        updateBtn.style.display = isEditingCustom ? 'block' : 'none';
    }
    
    if (deleteBtn) {
        deleteBtn.style.display = isEditingCustom ? 'block' : 'none';
    }
}

/**
 * Apply preset theme
 */
export function applyPreset(presetId) {
    let theme = BUILT_IN_THEMES[presetId] || customThemes[presetId];
    
    if (theme) {
        loadTheme(theme);
        state.setState('theme', theme);
    }
}

/**
 * Create new blank theme
 */
function createNewTheme() {
    const newTheme = {
        id: `custom-${Date.now()}`,
        name: 'New Custom Theme',
        description: '',
        isBuiltIn: false,
        colors: {
            bg: '#FFFFFF',
            text: '#000000',
            heading: '#000000',
            accent: '#0067FF'
        },
        fonts: {
            heading: 'Georgia',
            body: 'Calibri'
        },
        sizes: {
            title: 44,
            body: 24
        },
        options: {
            slideNumber: false,
            progress: false,
            controls: true
        }
    };
    
    loadTheme(newTheme);
}

/**
 * Show save theme modal
 */
function showSaveModal() {
    const modal = document.getElementById('saveThemeModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('themeNameInput').value = '';
        document.getElementById('themeDescInput').value = '';
        document.getElementById('themeNameInput').focus();
    }
}

/**
 * Hide save theme modal
 */
function hideSaveModal() {
    const modal = document.getElementById('saveThemeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Confirm and save theme
 */
function confirmSaveTheme() {
    const nameInput = document.getElementById('themeNameInput');
    const descInput = document.getElementById('themeDescInput');
    
    const name = nameInput?.value.trim();
    
    if (!name) {
        alert('Please enter a theme name');
        return;
    }
    
    const theme = getCurrentThemeFromControls();
    theme.id = `custom-${Date.now()}`;
    theme.name = name;
    theme.description = descInput?.value.trim() || '';
    theme.isBuiltIn = false;
    
    // Save to storage
    storage.saveThemePreset(theme.id, theme);
    
    // Add to custom themes
    customThemes[theme.id] = theme;
    
    // Update current theme
    currentTheme = theme;
    
    // Refresh preset selector
    populatePresetSelector();
    
    // Update state
    state.setState('theme', theme);
    
    // Hide modal
    hideSaveModal();
    
    // Update button visibility
    updateButtonVisibility();
    
    alert(`Theme "${name}" saved successfully!`);
}

/**
 * Update current custom theme
 */
function updateCurrentTheme() {
    if (!isEditingCustom) return;
    
    const theme = getCurrentThemeFromControls();
    theme.id = currentTheme.id;
    theme.name = currentTheme.name;
    theme.description = currentTheme.description;
    theme.isBuiltIn = false;
    
    // Save to storage
    storage.saveThemePreset(theme.id, theme);
    
    // Update custom themes
    customThemes[theme.id] = theme;
    
    // Update current theme
    currentTheme = theme;
    
    // Update state
    state.setState('theme', theme);
    
    alert(`Theme "${theme.name}" updated successfully!`);
}

/**
 * Delete current custom theme
 */
function deleteCurrentTheme() {
    if (!isEditingCustom) return;
    
    if (!confirm(`Delete theme "${currentTheme.name}"?`)) {
        return;
    }
    
    // Delete from storage
    storage.deleteThemePreset(currentTheme.id);
    
    // Remove from custom themes
    delete customThemes[currentTheme.id];
    
    // Load default theme
    applyPreset('academic');
    
    // Refresh preset selector
    populatePresetSelector();
    
    alert('Theme deleted');
}

/**
 * Reset to default theme
 */
function resetToDefault() {
    if (confirm('Reset to Academic theme?')) {
        applyPreset('academic');
    }
}

/**
 * Apply theme to deck and navigate to build module
 */
function applyToDeck() {
    const theme = getCurrentThemeFromControls();
    state.setState('theme', theme);
    
    // Navigate to build module
    if (window.app && window.app.router) {
        window.app.router.switchModule('build');
    }
}
