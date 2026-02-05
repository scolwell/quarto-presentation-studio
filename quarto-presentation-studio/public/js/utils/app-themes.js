/**
 * App Theme Utility
 * Manages UI color themes for the dashboard (not presentation themes)
 */

export const APP_THEMES = {
    default: {
        id: 'default',
        name: 'Default Dark',
        description: 'Dark sidebar with blue accents',
        sidebar: {
            bg: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            text: '#E8EEF3',
            textMuted: '#94a3b8',
            border: '#334155',
            activeItemBg: 'linear-gradient(135deg, #0067FF 0%, #0052CC 100%)',
            activeItemText: '#FFFFFF',
            hoverBg: 'rgba(255, 255, 255, 0.1)',
            logoBg: '#0067FF',
            logoText: '#FFFFFF'
        },
        topbar: {
            bg: '#FFFFFF',
            text: '#1F2933',
            border: '#E6EAEE'
        },
        content: {
            bg: '#f8fafc',
            cardBg: '#FFFFFF',
            cardBorder: '#E6EAEE',
            headingText: '#0F1419',
            bodyText: '#3E4C59',
            mutedText: '#7C8B9A'
        },
        accent: {
            primary: '#0067FF',
            secondary: '#0052CC',
            success: '#00C853',
            warning: '#FFB300',
            danger: '#E53935'
        },
        icons: {
            design: '#0067FF',
            browse: '#00C853',
            build: '#9C27B0'
        }
    },
    
    lightGrey: {
        id: 'lightGrey',
        name: 'Light Grey',
        description: 'Clean flat grey with blue accents',
        sidebar: {
            bg: '#f1f5f9', // bg-slate-100
            text: '#334155', // text-slate-700
            textMuted: '#64748b',
            border: '#e2e8f0', // border-slate-200
            activeItemBg: '#FFFFFF',
            activeItemText: '#1e40af', // text-blue-800
            activeItemBorder: '#2563eb', // border-blue-600
            hoverBg: '#e2e8f0', // hover:bg-slate-200
            logoBg: '#2563eb', // bg-blue-600
            logoText: '#FFFFFF'
        },
        topbar: {
            bg: '#FFFFFF',
            text: '#0f172a',
            border: '#e2e8f0'
        },
        content: {
            bg: '#f8fafc', // bg-slate-50
            cardBg: '#FFFFFF',
            cardBorder: '#e2e8f0',
            headingText: '#0f172a', // text-slate-900
            bodyText: '#475569', // text-slate-600
            mutedText: '#94a3b8' // text-slate-400
        },
        accent: {
            primary: '#1d4ed8', // text-blue-700
            secondary: '#1e3a8a', // text-blue-900
            success: '#059669',
            warning: '#d97706',
            danger: '#dc2626'
        },
        icons: {
            design: '#2563eb', // bg-blue-600
            browse: '#059669', // bg-emerald-600
            build: '#7c3aed' // bg-violet-600
        }
    },
    
    corporate: {
        id: 'corporate',
        name: 'Corporate Blue',
        description: 'Professional blue theme',
        sidebar: {
            bg: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
            text: '#FFFFFF',
            textMuted: '#93c5fd',
            border: '#3b82f6',
            activeItemBg: '#3b82f6',
            activeItemText: '#FFFFFF',
            hoverBg: 'rgba(59, 130, 246, 0.3)',
            logoBg: '#FFFFFF',
            logoText: '#1e3a8a'
        },
        topbar: {
            bg: '#1e40af',
            text: '#FFFFFF',
            border: '#3b82f6'
        },
        content: {
            bg: '#eff6ff',
            cardBg: '#FFFFFF',
            cardBorder: '#bfdbfe',
            headingText: '#1e3a8a',
            bodyText: '#1e40af',
            mutedText: '#60a5fa'
        },
        accent: {
            primary: '#2563eb',
            secondary: '#1d4ed8',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444'
        },
        icons: {
            design: '#3b82f6',
            browse: '#10b981',
            build: '#8b5cf6'
        }
    },
    
    midnight: {
        id: 'midnight',
        name: 'Midnight',
        description: 'Deep dark theme with purple accents',
        sidebar: {
            bg: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%)',
            text: '#e0e7ff',
            textMuted: '#a5b4fc',
            border: '#312e81',
            activeItemBg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            activeItemText: '#FFFFFF',
            hoverBg: 'rgba(99, 102, 241, 0.2)',
            logoBg: '#6366f1',
            logoText: '#FFFFFF'
        },
        topbar: {
            bg: '#1a1a2e',
            text: '#e0e7ff',
            border: '#312e81'
        },
        content: {
            bg: '#0f0f1e',
            cardBg: '#1a1a2e',
            cardBorder: '#312e81',
            headingText: '#e0e7ff',
            bodyText: '#c7d2fe',
            mutedText: '#818cf8'
        },
        accent: {
            primary: '#6366f1',
            secondary: '#4f46e5',
            success: '#34d399',
            warning: '#fbbf24',
            danger: '#f87171'
        },
        icons: {
            design: '#6366f1',
            browse: '#34d399',
            build: '#a78bfa'
        }
    }
};

/**
 * Apply theme to the dashboard
 */
export function applyAppTheme(themeId) {
    const theme = APP_THEMES[themeId] || APP_THEMES.default;
    
    // Apply sidebar styles
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.background = theme.sidebar.bg;
        sidebar.style.color = theme.sidebar.text;
        
        // Update nav items
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.style.color = theme.sidebar.text;
            
            // Update hover state
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    item.style.background = theme.sidebar.hoverBg;
                }
            });
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.background = 'transparent';
                }
            });
            
            // Update active state
            if (item.classList.contains('active')) {
                if (themeId === 'lightGrey') {
                    item.style.background = theme.sidebar.activeItemBg;
                    item.style.color = theme.sidebar.activeItemText;
                    item.style.borderLeft = `4px solid ${theme.sidebar.activeItemBorder}`;
                } else {
                    item.style.background = theme.sidebar.activeItemBg;
                    item.style.color = theme.sidebar.activeItemText;
                    item.style.borderLeft = 'none';
                }
            } else {
                item.style.borderLeft = 'none';
            }
        });
        
        // Update logo
        const logo = sidebar.querySelector('.logo');
        if (logo) {
            logo.style.background = theme.sidebar.logoBg;
            logo.style.color = theme.sidebar.logoText;
        }
        
        // Update collapse button
        const collapseBtn = sidebar.querySelector('#collapseBtn');
        if (collapseBtn) {
            collapseBtn.style.color = theme.sidebar.text;
            collapseBtn.style.background = theme.sidebar.hoverBg;
        }
    }
    
    // Apply topbar styles
    const topbar = document.getElementById('topbar');
    if (topbar) {
        topbar.style.background = theme.topbar.bg;
        topbar.style.color = theme.topbar.text;
        topbar.style.borderBottom = `1px solid ${theme.topbar.border}`;
        
        const breadcrumbs = topbar.querySelectorAll('.breadcrumb-item');
        breadcrumbs.forEach(item => {
            item.style.color = theme.topbar.text;
        });
    }
    
    // Apply content area styles
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.background = theme.content.bg;
    }
    
    // Apply module content styles
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        const cards = module.querySelectorAll('.card, .control-panel, .preview-container');
        cards.forEach(card => {
            card.style.background = theme.content.cardBg;
            card.style.border = `1px solid ${theme.content.cardBorder}`;
        });
        
        const headings = module.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(h => {
            h.style.color = theme.content.headingText;
        });
    });
    
    // Update feature card icons (Home module)
    updateFeatureIcons(theme);
    
    // Save theme preference
    localStorage.setItem('quarto-studio:appTheme', themeId);
}

/**
 * Update feature card icons in Home module
 */
function updateFeatureIcons(theme) {
    const designIcon = document.querySelector('[data-feature="design"] .feature-icon');
    const browseIcon = document.querySelector('[data-feature="browse"] .feature-icon');
    const buildIcon = document.querySelector('[data-feature="build"] .feature-icon');
    
    if (designIcon) {
        designIcon.style.background = theme.icons.design;
        designIcon.style.color = '#FFFFFF';
    }
    if (browseIcon) {
        browseIcon.style.background = theme.icons.browse;
        browseIcon.style.color = '#FFFFFF';
    }
    if (buildIcon) {
        buildIcon.style.background = theme.icons.build;
        buildIcon.style.color = '#FFFFFF';
    }
}

/**
 * Load saved app theme
 */
export function loadSavedAppTheme() {
    const saved = localStorage.getItem('quarto-studio:appTheme');
    return saved || 'default';
}

/**
 * Get current app theme
 */
export function getCurrentAppTheme() {
    return loadSavedAppTheme();
}

/**
 * Get all available app themes
 */
export function getAppThemes() {
    return Object.values(APP_THEMES);
}
