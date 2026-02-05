/**
 * Sidebar Component
 * Handles sidebar collapse/expand, navigation, and keyboard shortcuts
 */

export class Sidebar {
    /**
     * Create a sidebar instance
     * @param {string} selector - CSS selector for sidebar element
     */
    constructor(selector) {
        this.element = document.querySelector(selector);
        if (!this.element) {
            throw new Error(`Sidebar: Element not found for selector '${selector}'`);
        }

        this.toggleButton = this.element.querySelector('.sidebar-toggle');
        this.navItems = this.element.querySelectorAll('.nav-item');
        this.collapsed = false;
        this.listeners = new Map();

        this._init();
    }

    /**
     * Initialize sidebar functionality
     * @private
     */
    _init() {
        // Restore collapsed state from localStorage
        this._restoreState();

        // Set up toggle button
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggle());
        }

        // Set up navigation item clicks
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const moduleName = item.dataset.module;
                if (moduleName) {
                    this._emit('navigate', moduleName);
                }
            });
        });

        // Set up keyboard shortcuts
        this._setupKeyboardShortcuts();

        // Set up responsive behavior
        this._setupResponsive();
    }

    /**
     * Toggle sidebar collapse state
     */
    toggle() {
        this.collapsed = !this.collapsed;

        if (this.collapsed) {
            this.element.classList.add('collapsed');
            if (this.toggleButton) {
                this.toggleButton.textContent = '›';
            }
        } else {
            this.element.classList.remove('collapsed');
            if (this.toggleButton) {
                this.toggleButton.textContent = '‹';
            }
        }

        this._saveState();
        this._emit('toggle', this.collapsed);
    }

    /**
     * Collapse sidebar
     */
    collapse() {
        if (!this.collapsed) {
            this.toggle();
        }
    }

    /**
     * Expand sidebar
     */
    expand() {
        if (this.collapsed) {
            this.toggle();
        }
    }

    /**
     * Check if sidebar is collapsed
     * @returns {boolean} Collapsed state
     */
    isCollapsed() {
        return this.collapsed;
    }

    /**
     * Set active navigation item
     * @param {string} moduleName - Module to highlight
     */
    setActive(moduleName) {
        this.navItems.forEach(item => {
            if (item.dataset.module === moduleName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Save collapsed state to localStorage
     * @private
     */
    _saveState() {
        try {
            localStorage.setItem('sidebarCollapsed', this.collapsed.toString());
        } catch (error) {
            console.warn('Sidebar: Could not save state to localStorage', error);
        }
    }

    /**
     * Restore collapsed state from localStorage
     * @private
     */
    _restoreState() {
        try {
            const saved = localStorage.getItem('sidebarCollapsed');
            if (saved === 'true') {
                this.collapsed = false; // Set to false first so toggle() works correctly
                this.toggle();
            }
        } catch (error) {
            console.warn('Sidebar: Could not restore state from localStorage', error);
        }
    }

    /**
     * Set up keyboard shortcuts
     * @private
     */
    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                // Ctrl+B: Toggle sidebar
                if (e.key === 'b' || e.key === 'B') {
                    e.preventDefault();
                    this.toggle();
                }

                // Ctrl+1-6: Navigate to modules
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
                    this._emit('navigate', shortcuts[e.key]);
                }
            }
        });
    }

    /**
     * Set up responsive behavior
     * @private
     */
    _setupResponsive() {
        // Auto-collapse on mobile
        const checkResponsive = () => {
            const isMobile = window.innerWidth < 768;
            if (isMobile && !this.collapsed) {
                this.collapse();
            }
        };

        // Check on load
        checkResponsive();

        // Check on resize (debounced)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkResponsive, 250);
        });
    }

    /**
     * Register event listener
     * @param {string} event - Event name ('navigate', 'toggle')
     * @param {Function} callback - Event handler
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    /**
     * Remove event listener
     * @param {string} event - Event name
     * @param {Function} callback - Event handler to remove
     */
    off(event, callback) {
        if (!this.listeners.has(event)) {
            return;
        }
        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    /**
     * Emit event to registered listeners
     * @param {string} event - Event name
     * @param {*} data - Event data
     * @private
     */
    _emit(event, data) {
        if (!this.listeners.has(event)) {
            return;
        }
        this.listeners.get(event).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Sidebar: Error in ${event} listener`, error);
            }
        });
    }

    /**
     * Clean up event listeners and references
     */
    destroy() {
        this.listeners.clear();
        // Note: We don't remove DOM event listeners as they'll be garbage collected
        // when the element is removed from the DOM
    }
}

// Export singleton instance creator
export function createSidebar(selector) {
    return new Sidebar(selector);
}
