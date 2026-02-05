/**
 * Router Module
 * Handles navigation between dashboard modules with lifecycle management
 */

import { applyAppTheme, getCurrentAppTheme } from '../utils/app-themes.js';

// Module registry to store lifecycle callbacks
const moduleRegistry = new Map();

// Current active module
let currentModule = null;

/**
 * Module names mapping for breadcrumb display
 */
const MODULE_NAMES = {
    home: 'Home',
    design: 'Design Theme',
    browse: 'Browse Templates',
    build: 'Build Deck',
    library: 'Library',
    settings: 'Settings'
};

/**
 * Register a module with lifecycle callbacks
 * @param {string} name - Module identifier
 * @param {Object} callbacks - Lifecycle callbacks
 * @param {Function} callbacks.onEnter - Called when module becomes active
 * @param {Function} callbacks.onExit - Called when leaving module
 */
export function registerModule(name, callbacks = {}) {
    moduleRegistry.set(name, {
        onEnter: callbacks.onEnter || (() => {}),
        onExit: callbacks.onExit || (() => {})
    });
}

/**
 * Switch to a different module
 * @param {string} moduleName - Target module identifier
 * @returns {boolean} Success status
 */
export function switchModule(moduleName) {
    if (!moduleName) {
        console.warn('Router: No module name provided');
        return false;
    }

    // Exit current module
    if (currentModule && moduleRegistry.has(currentModule)) {
        const currentCallbacks = moduleRegistry.get(currentModule);
        try {
            currentCallbacks.onExit();
        } catch (error) {
            console.error(`Router: Error exiting module '${currentModule}'`, error);
        }
    }

    // Update DOM elements
    updateNavigation(moduleName);
    updateModuleVisibility(moduleName);
    updateBreadcrumb(moduleName);

    // Update URL hash
    window.location.hash = `#/${moduleName}`;

    // Save to localStorage
    try {
        localStorage.setItem('currentModule', moduleName);
    } catch (error) {
        console.warn('Router: Could not save to localStorage', error);
    }

    // Enter new module
    if (moduleRegistry.has(moduleName)) {
        const newCallbacks = moduleRegistry.get(moduleName);
        try {
            newCallbacks.onEnter();
        } catch (error) {
            console.error(`Router: Error entering module '${moduleName}'`, error);
        }
    }

    // Update current module
    currentModule = moduleName;

    // Emit custom event
    window.dispatchEvent(new CustomEvent('modulechange', { 
        detail: { from: currentModule, to: moduleName } 
    }));

    return true;
}

/**
 * Update navigation items active state
 * @param {string} moduleName - Active module name
 */
function updateNavigation(moduleName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.dataset.module === moduleName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Re-apply current app theme to update active states
    const currentTheme = getCurrentAppTheme();
    if (currentTheme) {
        // Small delay to ensure DOM is updated
        setTimeout(() => applyAppTheme(currentTheme), 10);
    }
}

/**
 * Show/hide module sections
 * @param {string} moduleName - Module to show
 */
function updateModuleVisibility(moduleName) {
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        if (module.dataset.module === moduleName) {
            module.classList.add('active');
        } else {
            module.classList.remove('active');
        }
    });
}

/**
 * Update breadcrumb display
 * @param {string} moduleName - Current module name
 */
function updateBreadcrumb(moduleName) {
    const breadcrumbElement = document.getElementById('breadcrumbCurrent');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = MODULE_NAMES[moduleName] || moduleName;
    }
}

/**
 * Get current active module
 * @returns {string|null} Current module name
 */
export function getCurrentModule() {
    return currentModule;
}

/**
 * Initialize router with hash change and keyboard listeners
 */
export function initRouter() {
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#/', '');
        if (hash && hash !== currentModule) {
            switchModule(hash);
        }
    });

    // Handle keyboard shortcuts (Ctrl+1-6)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            const shortcuts = {
                '1': 'home',
                '2': 'design',
                '3': 'browse',
                '4': 'build',
                '5': 'library',
                '6': 'settings'
            };

            if (shortcuts[e.key]) {
                e.preventDefault();
                switchModule(shortcuts[e.key]);
            }
        }
    });

    // Handle navigation clicks
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleName = item.dataset.module;
            if (moduleName) {
                switchModule(moduleName);
            }
        });
    });

    // Load initial module
    const hash = window.location.hash.replace('#/', '');
    const savedModule = localStorage.getItem('currentModule');
    const initialModule = hash || savedModule || 'home';
    
    switchModule(initialModule);
}

/**
 * Navigate to a specific module (alias for switchModule)
 * @param {string} moduleName - Target module
 */
export function navigateTo(moduleName) {
    return switchModule(moduleName);
}

/**
 * Get list of all registered modules
 * @returns {string[]} Array of module names
 */
export function getRegisteredModules() {
    return Array.from(moduleRegistry.keys());
}

// Export for debugging
export const _internal = {
    moduleRegistry,
    MODULE_NAMES
};
