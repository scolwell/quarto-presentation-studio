/**
 * Settings Module
 * User preferences and app configuration
 */

import * as storage from '../utils/storage.js';
import { APP_THEMES, applyAppTheme, getCurrentAppTheme } from '../utils/app-themes.js';

let currentAppTheme = 'default';

/**
 * Initialize settings module
 */
export function init() {
    console.log('Initializing Settings module...');
    
    // Load current app theme
    currentAppTheme = getCurrentAppTheme();
    
    // Populate theme selector
    populateAppThemeSelector();
    
    // Wire up controls
    wireControls();
    
    // Load settings
    loadSettings();
}

/**
 * Cleanup when leaving module
 */
export function cleanup() {
    console.log('Cleaning up Settings module...');
    saveSettings();
}

/**
 * Populate app theme selector
 */
function populateAppThemeSelector() {
    const select = document.getElementById('appThemeSelect');
    if (!select) return;
    
    // Clear existing options
    select.innerHTML = '';
    
    // Add theme options
    Object.values(APP_THEMES).forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.id;
        option.textContent = theme.name;
        select.appendChild(option);
    });
    
    // Set current theme
    select.value = currentAppTheme;
}

/**
 * Wire up control inputs
 */
function wireControls() {
    // App theme selector - apply immediately on change
    const themeSelect = document.getElementById('appThemeSelect');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const themeId = e.target.value;
            
            // Apply theme immediately with visual feedback
            applyAppTheme(themeId);
            currentAppTheme = themeId;
            updateThemePreview(themeId);
            
            // Show brief confirmation
            showThemeAppliedFeedback();
        });
    }
    
    // Reset to defaults button
    const resetBtn = document.getElementById('resetSettingsBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetToDefaults);
    }
}

/**
 * Show visual feedback when theme is applied
 */
function showThemeAppliedFeedback() {
    const previewEl = document.getElementById('themePreview');
    if (!previewEl) return;
    
    // Add a brief highlight animation
    previewEl.style.transition = 'transform 0.2s ease-out';
    previewEl.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        previewEl.style.transform = 'scale(1)';
    }, 200);
}

/**
 * Update theme preview
 */
function updateThemePreview(themeId) {
    const theme = APP_THEMES[themeId];
    if (!theme) return;
    
    const previewEl = document.getElementById('themePreview');
    if (!previewEl) return;
    
    previewEl.innerHTML = `
        <div style="padding: 16px; background: ${theme.content.cardBg}; border: 1px solid ${theme.content.cardBorder}; border-radius: 8px;">
            <h4 style="margin: 0 0 8px 0; color: ${theme.content.headingText}; font-size: 16px; font-weight: 600;">${theme.name}</h4>
            <p style="margin: 0 0 12px 0; color: ${theme.content.mutedText}; font-size: 13px;">${theme.description}</p>
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                <div style="flex: 1; height: 40px; background: ${theme.sidebar.bg}; border-radius: 4px;"></div>
                <div style="flex: 2; height: 40px; background: ${theme.content.bg}; border: 1px solid ${theme.content.cardBorder}; border-radius: 4px;"></div>
            </div>
            <div style="display: flex; gap: 8px;">
                <div style="width: 32px; height: 32px; background: ${theme.icons.design}; border-radius: 4px;"></div>
                <div style="width: 32px; height: 32px; background: ${theme.icons.browse}; border-radius: 4px;"></div>
                <div style="width: 32px; height: 32px; background: ${theme.icons.build}; border-radius: 4px;"></div>
            </div>
        </div>
    `;
}

/**
 * Load settings from storage
 */
function loadSettings() {
    const settings = storage.loadSettings();
    if (settings) {
        currentAppTheme = settings.appTheme || 'default';
        
        // Update UI
        const themeSelect = document.getElementById('appThemeSelect');
        if (themeSelect) {
            themeSelect.value = currentAppTheme;
        }
        
        updateThemePreview(currentAppTheme);
    } else {
        // First time - show default theme preview
        updateThemePreview(currentAppTheme);
    }
}

/**
 * Save settings to storage
 */
function saveSettings() {
    const settings = {
        appTheme: currentAppTheme,
        version: '2.0.0',
        lastSaved: new Date().toISOString()
    };
    
    storage.saveSettings(settings);
}

/**
 * Reset to default settings
 */
function resetToDefaults() {
    if (!confirm('Reset all settings to defaults?')) {
        return;
    }
    
    currentAppTheme = 'default';
    applyAppTheme('default');
    
    const themeSelect = document.getElementById('appThemeSelect');
    if (themeSelect) {
        themeSelect.value = 'default';
    }
    
    updateThemePreview('default');
    saveSettings();
    
    alert('Settings reset to defaults');
}
