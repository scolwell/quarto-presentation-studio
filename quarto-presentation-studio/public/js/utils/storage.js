/**
 * Storage Utility
 * localStorage wrapper with validation, namespacing, and error handling
 */

const NAMESPACE = 'quarto-studio';
const VERSION = '1.0.0';

/**
 * Create namespaced key
 * @param {string} key - Key name
 * @returns {string} Namespaced key
 */
function getKey(key) {
    return `${NAMESPACE}:${key}`;
}

/**
 * Save value to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON serialized)
 * @returns {boolean} Success status
 */
export function save(key, value) {
    try {
        const serialized = JSON.stringify({
            version: VERSION,
            timestamp: Date.now(),
            data: value
        });
        localStorage.setItem(getKey(key), serialized);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('Storage: Quota exceeded', error);
        } else {
            console.error('Storage: Error saving', error);
        }
        return false;
    }
}

/**
 * Load value from localStorage
 * @param {string} key - Storage key
 * @param {*} [defaultValue=null] - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export function load(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(getKey(key));
        if (!item) {
            return defaultValue;
        }

        const parsed = JSON.parse(item);
        
        // Check version for migrations
        if (parsed.version !== VERSION) {
            console.warn(`Storage: Version mismatch for '${key}' (${parsed.version} vs ${VERSION})`);
            // Could implement migration logic here
        }

        return parsed.data;
    } catch (error) {
        console.error('Storage: Error loading', error);
        return defaultValue;
    }
}

/**
 * Remove value from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function remove(key) {
    try {
        localStorage.removeItem(getKey(key));
        return true;
    } catch (error) {
        console.error('Storage: Error removing', error);
        return false;
    }
}

/**
 * Clear all namespaced storage
 * @returns {boolean} Success status
 */
export function clear() {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(`${NAMESPACE}:`)) {
                localStorage.removeItem(key);
            }
        });
        return true;
    } catch (error) {
        console.error('Storage: Error clearing', error);
        return false;
    }
}

/**
 * Check if key exists in storage
 * @param {string} key - Storage key
 * @returns {boolean} Exists status
 */
export function exists(key) {
    return localStorage.getItem(getKey(key)) !== null;
}

/**
 * Get all keys in namespaced storage
 * @returns {string[]} Array of key names (without namespace prefix)
 */
export function getAllKeys() {
    const keys = Object.keys(localStorage);
    return keys
        .filter(key => key.startsWith(`${NAMESPACE}:`))
        .map(key => key.replace(`${NAMESPACE}:`, ''));
}

/**
 * Get storage size estimate
 * @returns {number} Approximate bytes used
 */
export function getSize() {
    try {
        let total = 0;
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(`${NAMESPACE}:`)) {
                total += localStorage.getItem(key).length;
            }
        });
        return total;
    } catch (error) {
        console.error('Storage: Error calculating size', error);
        return 0;
    }
}

// Theme-specific methods

/**
 * Save theme data
 * @param {Object} themeData - Theme configuration
 * @param {Object} themeData.colors - Color palette
 * @param {Object} themeData.fonts - Font settings
 * @param {Object} themeData.settings - Layout settings
 * @returns {boolean} Success status
 */
export function saveTheme(themeData) {
    return save('theme', themeData);
}

/**
 * Load theme data
 * @returns {Object|null} Theme configuration or null
 */
export function loadTheme() {
    return load('theme', null);
}

/**
 * Save custom theme preset
 * @param {string} name - Preset name
 * @param {Object} themeData - Theme configuration
 * @returns {boolean} Success status
 */
export function saveThemePreset(name, themeData) {
    const presets = load('theme-presets', {});
    presets[name] = {
        ...themeData,
        createdAt: Date.now(),
        name
    };
    return save('theme-presets', presets);
}

/**
 * Load all theme presets
 * @returns {Object} Map of preset name to theme data
 */
export function loadThemePresets() {
    return load('theme-presets', {});
}

/**
 * Delete theme preset
 * @param {string} name - Preset name
 * @returns {boolean} Success status
 */
export function deleteThemePreset(name) {
    const presets = load('theme-presets', {});
    delete presets[name];
    return save('theme-presets', presets);
}

// Slide selection methods

/**
 * Save selected slides for deck building
 * @param {Array} slides - Array of slide objects with {id, name, layout}
 * @returns {boolean} Success status
 */
export function saveSelectedSlides(slides) {
    return save('selected-slides', slides);
}

/**
 * Load selected slides
 * @returns {Array} Array of slide objects
 */
export function loadSelectedSlides() {
    return load('selected-slides', []);
}

/**
 * Clear selected slides
 * @returns {boolean} Success status
 */
export function clearSelectedSlides() {
    return remove('selected-slides');
}

// Deck metadata methods

/**
 * Save deck metadata
 * @param {Object} metadata - Deck metadata
 * @param {string} metadata.filename - Deck filename
 * @param {string} metadata.title - Presentation title
 * @param {string} metadata.author - Author name
 * @param {string} metadata.date - Date
 * @returns {boolean} Success status
 */
export function saveDeckMetadata(metadata) {
    return save('deck-metadata', metadata);
}

/**
 * Load deck metadata
 * @returns {Object|null} Deck metadata or null
 */
export function loadDeckMetadata() {
    return load('deck-metadata', null);
}

// Deck library methods

/**
 * Save deck to library
 * @param {Object} deck - Deck configuration
 * @param {string} deck.id - Unique deck ID
 * @param {string} deck.filename - Deck filename
 * @param {Array} deck.slides - Array of slide IDs
 * @param {Object} deck.theme - Theme data
 * @param {Object} deck.metadata - Deck metadata
 * @returns {boolean} Success status
 */
export function saveDeckToLibrary(deck) {
    const library = load('deck-library', []);
    
    // Check if deck already exists
    const existingIndex = library.findIndex(d => d.id === deck.id);
    
    if (existingIndex > -1) {
        // Update existing deck
        library[existingIndex] = {
            ...deck,
            updatedAt: Date.now()
        };
    } else {
        // Add new deck
        library.push({
            ...deck,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }
    
    return save('deck-library', library);
}

/**
 * Load all decks from library
 * @returns {Array} Array of deck objects
 */
export function loadDeckLibrary() {
    return load('deck-library', []);
}

/**
 * Delete deck from library
 * @param {string} deckId - Deck ID to delete
 * @returns {boolean} Success status
 */
export function deleteDeckFromLibrary(deckId) {
    const library = load('deck-library', []);
    const filtered = library.filter(d => d.id !== deckId);
    return save('deck-library', filtered);
}

/**
 * Load specific deck from library
 * @param {string} deckId - Deck ID
 * @returns {Object|null} Deck object or null
 */
export function loadDeck(deckId) {
    const library = load('deck-library', []);
    return library.find(d => d.id === deckId) || null;
}

// Settings methods

/**
 * Save user settings
 * @param {Object} settings - User preferences
 * @returns {boolean} Success status
 */
export function saveSettings(settings) {
    return save('settings', settings);
}

/**
 * Load user settings
 * @returns {Object} Settings object
 */
export function loadSettings() {
    return load('settings', {
        autoSave: true,
        showKeyboardShortcuts: true,
        defaultTheme: 'academic'
    });
}

// Export info for debugging
export function getStorageInfo() {
    return {
        namespace: NAMESPACE,
        version: VERSION,
        keys: getAllKeys(),
        size: getSize(),
        sizeKB: (getSize() / 1024).toFixed(2)
    };
}
