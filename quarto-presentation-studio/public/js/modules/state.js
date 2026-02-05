/**
 * Global State Manager
 * Centralized state management with reactivity and persistence
 */

// Initial state structure
const initialState = {
    ui: {
        currentModule: 'home',
        sidebarCollapsed: false,
        loading: false
    },
    theme: {
        colors: {
            bg: '#FFFFFF',
            text: '#1F2933',
            primary: '#0067FF',
            secondary: '#5F6B7A',
            accent: '#0067FF',
            border: '#DADDE2',
            bgSecondary: '#F6F7F9',
            success: '#2E7D32',
            warning: '#C62828',
            muted: '#9AA4B2'
        },
        fonts: {
            heading: 'system-ui, -apple-system, sans-serif',
            body: 'system-ui, -apple-system, sans-serif',
            code: 'Monaco, Consolas, monospace'
        },
        settings: {
            titleSize: 44,
            bodySize: 24,
            lineHeight: 1.5,
            slideWidth: 1280,
            slideHeight: 720
        }
    },
    templates: {
        all: [],
        selected: [],
        filtered: []
    },
    deck: {
        filename: '',
        metadata: {
            title: '',
            author: '',
            date: ''
        },
        slides: []
    }
};

// Subscribers registry
const subscribers = new Map();

// Current state (deep clone of initial state)
let state = JSON.parse(JSON.stringify(initialState));

/**
 * Get value at deep path
 * @param {Object} obj - Object to traverse
 * @param {string} path - Dot-separated path
 * @returns {*} Value at path
 */
function getDeepValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Set value at deep path
 * @param {Object} obj - Object to modify
 * @param {string} path - Dot-separated path
 * @param {*} value - Value to set
 */
function setDeepValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        return current[key];
    }, obj);
    target[lastKey] = value;
}

/**
 * Get entire state or value at path
 * @param {string} [path] - Optional dot-separated path
 * @returns {*} State or value at path
 */
export function getState(path) {
    if (!path) {
        return JSON.parse(JSON.stringify(state));
    }
    return JSON.parse(JSON.stringify(getDeepValue(state, path)));
}

/**
 * Set state at path
 * @param {string} path - Dot-separated path
 * @param {*} value - New value
 * @returns {boolean} Success status
 */
export function setState(path, value) {
    try {
        const oldValue = getDeepValue(state, path);
        setDeepValue(state, path, value);

        // Notify subscribers
        notifySubscribers(path, value, oldValue);

        // Auto-save to storage for certain paths
        const persistPaths = ['ui', 'theme', 'deck.filename', 'deck.metadata'];
        if (persistPaths.some(p => path.startsWith(p))) {
            saveToStorage();
        }

        return true;
    } catch (error) {
        console.error('State: Error setting value', error);
        return false;
    }
}

/**
 * Update state by merging with existing value
 * @param {string} path - Dot-separated path
 * @param {Object} updates - Object to merge
 */
export function updateState(path, updates) {
    const current = getDeepValue(state, path);
    if (typeof current === 'object' && !Array.isArray(current)) {
        setState(path, { ...current, ...updates });
    } else {
        setState(path, updates);
    }
}

/**
 * Subscribe to state changes at path
 * @param {string} path - Dot-separated path to watch
 * @param {Function} callback - Called with (newValue, oldValue)
 * @returns {Function} Unsubscribe function
 */
export function subscribe(path, callback) {
    if (!subscribers.has(path)) {
        subscribers.set(path, new Set());
    }
    subscribers.get(path).add(callback);

    // Return unsubscribe function
    return () => {
        const pathSubscribers = subscribers.get(path);
        if (pathSubscribers) {
            pathSubscribers.delete(callback);
        }
    };
}

/**
 * Notify subscribers of state changes
 * @param {string} path - Changed path
 * @param {*} newValue - New value
 * @param {*} oldValue - Old value
 * @private
 */
function notifySubscribers(path, newValue, oldValue) {
    // Notify exact path subscribers
    if (subscribers.has(path)) {
        subscribers.get(path).forEach(callback => {
            try {
                callback(newValue, oldValue);
            } catch (error) {
                console.error(`State: Error in subscriber for '${path}'`, error);
            }
        });
    }

    // Notify parent path subscribers (e.g., 'theme.colors' when 'theme.colors.bg' changes)
    const parts = path.split('.');
    for (let i = parts.length - 1; i > 0; i--) {
        const parentPath = parts.slice(0, i).join('.');
        if (subscribers.has(parentPath)) {
            const parentValue = getDeepValue(state, parentPath);
            subscribers.get(parentPath).forEach(callback => {
                try {
                    callback(parentValue, parentValue);
                } catch (error) {
                    console.error(`State: Error in parent subscriber for '${parentPath}'`, error);
                }
            });
        }
    }

    // Notify wildcard subscribers
    if (subscribers.has('*')) {
        subscribers.get('*').forEach(callback => {
            try {
                callback(path, newValue, oldValue);
            } catch (error) {
                console.error('State: Error in wildcard subscriber', error);
            }
        });
    }
}

/**
 * Save state to localStorage
 */
export function saveToStorage() {
    try {
        const toSave = {
            ui: state.ui,
            theme: state.theme,
            deck: {
                filename: state.deck.filename,
                metadata: state.deck.metadata
            }
        };
        localStorage.setItem('quartoStudioState', JSON.stringify(toSave));
    } catch (error) {
        console.warn('State: Could not save to localStorage', error);
    }
}

/**
 * Load state from localStorage
 */
export function loadFromStorage() {
    try {
        const saved = localStorage.getItem('quartoStudioState');
        if (saved) {
            const parsed = JSON.parse(saved);
            
            // Merge saved state with current state
            if (parsed.ui) {
                state.ui = { ...state.ui, ...parsed.ui };
            }
            if (parsed.theme) {
                state.theme = deepMerge(state.theme, parsed.theme);
            }
            if (parsed.deck) {
                state.deck = { ...state.deck, ...parsed.deck };
            }

            // Notify all subscribers of loaded state
            notifySubscribers('ui', state.ui, {});
            notifySubscribers('theme', state.theme, {});
            notifySubscribers('deck', state.deck, {});
        }
    } catch (error) {
        console.warn('State: Could not load from localStorage', error);
    }
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}

/**
 * Reset state to initial values
 * @param {string} [path] - Optional path to reset (resets all if omitted)
 */
export function resetState(path) {
    if (path) {
        const initialValue = getDeepValue(initialState, path);
        setState(path, JSON.parse(JSON.stringify(initialValue)));
    } else {
        state = JSON.parse(JSON.stringify(initialState));
        saveToStorage();
        
        // Notify all subscribers
        subscribers.forEach((_, subscribedPath) => {
            const value = getDeepValue(state, subscribedPath);
            notifySubscribers(subscribedPath, value, value);
        });
    }
}

/**
 * Clear all subscribers
 */
export function clearSubscribers() {
    subscribers.clear();
}

/**
 * Initialize state manager
 */
export function initState() {
    loadFromStorage();
}

// Export for debugging
export const _internal = {
    state,
    subscribers,
    initialState
};
