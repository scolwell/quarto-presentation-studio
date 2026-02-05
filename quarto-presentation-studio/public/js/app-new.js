/**
 * Main Application Entry Point
 * Quarto Presentation Studio Dashboard
 */

import * as router from './modules/router.js';
import * as state from './modules/state.js';
import { Sidebar } from './components/sidebar.js';
import * as api from './api.js';
import * as storage from './utils/storage.js';
import * as design from './modules/design.js';
import * as browse from './modules/browse.js';
import * as build from './modules/build.js';
import * as settings from './modules/settings.js';
import { applyAppTheme, loadSavedAppTheme } from './utils/app-themes.js';

// Global app object
let sidebar = null;

/**
 * Initialize dashboard application
 */
async function initDashboard() {
    try {
        console.log('🚀 Initializing Quarto Presentation Studio...');

        // Show loading state
        state.setState('ui.loading', true);

        // Initialize state manager
        state.initState();
        console.log('✓ State manager initialized');

        // Apply saved app theme
        const savedTheme = loadSavedAppTheme();
        applyAppTheme(savedTheme);
        console.log(`✓ App theme applied: ${savedTheme}`);

        // Initialize sidebar
        sidebar = new Sidebar('#sidebar');
        sidebar.on('navigate', (moduleName) => {
            router.switchModule(moduleName);
        });
        console.log('✓ Sidebar initialized');

        // Load templates from API
        try {
            const templatesData = await api.fetchTemplates();
            // fetchTemplates() already returns the templates array
            state.setState('templates.all', templatesData || []);
            console.log(`✓ Loaded ${templatesData?.length || 0} templates`);
        } catch (error) {
            console.warn('⚠ Could not load templates:', error.message);
            state.setState('templates.all', []);
        }

        // Register all modules with lifecycle callbacks
        registerModules();
        console.log('✓ Modules registered');

        // Initialize router
        router.initRouter();
        console.log('✓ Router initialized');

        // Set up global keyboard shortcuts
        setupGlobalShortcuts();
        console.log('✓ Global shortcuts registered');

        // Hide loading state
        state.setState('ui.loading', false);

        console.log('✅ Dashboard ready!');
    } catch (error) {
        console.error('❌ Failed to initialize dashboard:', error);
        alert('Failed to initialize application. Please check console for details.');
    }
}

/**
 * Register all module lifecycle callbacks
 */
function registerModules() {
    // Home module
    router.registerModule('home', {
        onEnter: () => {
            console.log('Entering Home module');
            // Home is static, no initialization needed
        },
        onExit: () => {
            console.log('Exiting Home module');
        }
    });

    // Design module (Phase 2)
    router.registerModule('design', {
        onEnter: () => {
            console.log('Entering Design module');
            initDesignModule();
        },
        onExit: () => {
            console.log('Exiting Design module');
            cleanupDesignModule();
        }
    });

    // Browse module (Phase 3)
    router.registerModule('browse', {
        onEnter: () => {
            console.log('Entering Browse module');
            initBrowseModule();
        },
        onExit: () => {
            console.log('Exiting Browse module');
            cleanupBrowseModule();
        }
    });

    // Build module (Phase 4)
    router.registerModule('build', {
        onEnter: () => {
            console.log('Entering Build module');
            initBuildModule();
        },
        onExit: () => {
            console.log('Exiting Build module');
            cleanupBuildModule();
        }
    });

    // Library module
    router.registerModule('library', {
        onEnter: () => {
            console.log('Entering Library module');
            initLibraryModule();
        },
        onExit: () => {
            console.log('Exiting Library module');
            cleanupLibraryModule();
        }
    });

    // Settings module
    router.registerModule('settings', {
        onEnter: () => {
            console.log('Entering Settings module');
            initSettingsModule();
        },
        onExit: () => {
            console.log('Exiting Settings module');
            cleanupSettingsModule();
        }
    });
}

/**
 * Set up global keyboard shortcuts
 */
function setupGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Help shortcut (?)
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            showKeyboardShortcuts();
        }

        // Escape key - clear selections, close modals, etc.
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => modal.classList.remove('active'));
        }
    });
}

/**
 * Show keyboard shortcuts help
 */
function showKeyboardShortcuts() {
    const shortcuts = `
Keyboard Shortcuts:

Navigation:
  Ctrl+1  →  Home
  Ctrl+2  →  Design Theme
  Ctrl+3  →  Browse Templates
  Ctrl+4  →  Build Deck
  Ctrl+5  →  Library
  Ctrl+6  →  Settings
  Ctrl+B  →  Toggle Sidebar

General:
  ?       →  Show this help
  Esc     →  Close modals
    `.trim();

    alert(shortcuts);
}

// Module initialization stubs (to be implemented in later phases)

function initDesignModule() {
    // Phase 2: Designer Pro
    design.init();
}

function cleanupDesignModule() {
    // Cleanup when leaving design module
    design.cleanup();
}

function initBrowseModule() {
    // Phase 3: Template Browser
    browse.init();
}

function cleanupBrowseModule() {
    // Cleanup when leaving browse module
    browse.cleanup();
}

function initBuildModule() {
    // Phase 4: Deck Builder
    build.init();
}

function cleanupBuildModule() {
    // Save selected slides before leaving
    build.cleanup();
}

function initLibraryModule() {
    console.log('Library module placeholder');
    // Load deck library
    const library = storage.loadDeckLibrary();
    state.setState('library', library);
}

funcsettings.init();
}

function cleanupSettingsModule() {
    settings.cleanup();ion cleanupSettingsModule() {
    // Save settings
    const settings = state.getState('settings');
    if (settings) {
        storage.saveSettings(settings);
    }
}

// Expose app object globally
window.app = {
    router,
    state,
    sidebar: () => sidebar,
    storage,
    api,
    showKeyboardShortcuts
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

// Export for module usage
export {
    initDashboard,
    showKeyboardShortcuts
};
