# App Theme System Guide
## Dashboard Color Customization

The Quarto Presentation Studio now includes a comprehensive app theme system that allows you to customize the color scheme of the entire dashboard interface.

---

## 🎨 Available Themes

### 1. Default Dark
**Description:** Dark sidebar with blue accents  
**Style:** Professional development environment

**Colors:**
- Sidebar: Dark gradient (#0f172a to #1e293b)
- Text: Light (#E8EEF3)
- Active item: Blue gradient
- Content: Light background (#f8fafc)
- Accents: Blue (#0067FF)

**Best for:** Default professional look, comfortable for long sessions

---

### 2. Light Grey
**Description:** Clean flat grey with blue accents  
**Style:** Academic/professional flat design

**Colors:**
- Sidebar: Slate grey (#f1f5f9)
- Text: Dark slate (#334155)
- Active item: White with blue left border
- Content: Off-white (#f8fafc)
- Accents: Blue (#2563eb)

**Features:**
- Flat design with no gradients
- 4px left border on active items
- Static icon colors (no hover transitions)
- Clean, minimal aesthetic

**Best for:** Academic settings, minimal design preference, light theme users

---

### 3. Corporate Blue
**Description:** Professional blue theme  
**Style:** Corporate/business environment

**Colors:**
- Sidebar: Blue gradient (#1e3a8a to #1e40af)
- Text: White
- Active item: Bright blue (#3b82f6)
- Top bar: Blue background
- Content: Light blue background (#eff6ff)
- Accents: Various blues

**Best for:** Corporate presentations, business environments, professional settings

---

### 4. Midnight
**Description:** Deep dark theme with purple accents  
**Style:** Modern dark mode with vibrant accents

**Colors:**
- Sidebar: Very dark gradient (#0a0a0f to #1a1a2e)
- Text: Light indigo (#e0e7ff)
- Active item: Purple gradient (#6366f1 to #4f46e5)
- Content: Dark background (#0f0f1e)
- Accents: Indigo/purple

**Best for:** Night work, modern aesthetic, reducing eye strain in low light

---

## 🔧 How to Use

### Changing App Theme

1. **Navigate to Settings:**
   - Click "Settings" in the sidebar (or press `Ctrl+6`)

2. **Select Theme:**
   - Find "App Theme" section
   - Click the dropdown menu
   - Select your preferred theme

3. **Preview:**
   - Theme preview shows immediately
   - Dashboard updates in real-time

4. **Auto-Save:**
   - Your selection is automatically saved
   - Theme persists across browser sessions

### Keyboard Shortcut
- Press `Ctrl+6` to quickly access Settings

---

## 📐 What the App Theme Affects

### ✅ Styled Elements
- **Sidebar:** Background, text, borders, active states, hover effects
- **Top Bar:** Background, text, breadcrumb colors
- **Navigation:** Active item highlighting, hover states
- **Content Area:** Background color
- **Cards:** Background, borders
- **Headings:** All heading colors
- **Text:** Body text, muted text
- **Logo:** TSM logo colors
- **Feature Icons:** Home module icon backgrounds

### ❌ Not Affected
- **Presentation Themes:** Design module themes remain separate
- **Template Content:** Template previews unchanged
- **Code Syntax:** Code views maintain their highlighting
- **SVG Previews:** Template preview images unchanged

---

## 🎯 Technical Details

### Theme Structure

Each theme defines:
```javascript
{
    id: 'themeName',
    name: 'Display Name',
    description: 'Theme description',
    sidebar: { /* sidebar colors */ },
    topbar: { /* top bar colors */ },
    content: { /* content area colors */ },
    accent: { /* accent colors */ },
    icons: { /* feature icon colors */ }
}
```

### Storage
- Themes stored in: `localStorage['quarto-studio:appTheme']`
- Persists across sessions
- Browser-specific (per device)

### Files
- **Theme System:** [app-themes.js](public/js/utils/app-themes.js)
- **Settings Module:** [settings.js](public/js/modules/settings.js)
- **Integration:** [app-new.js](public/js/app-new.js)

---

## 🎨 Design Philosophy

### Light Grey Theme
The Light Grey theme follows a flat design philosophy:
- **No gradients:** All colors are solid
- **Subtle borders:** Slate grey borders for definition
- **Left border indicator:** 4px blue border on active items
- **Static icons:** No color transitions on hover
- **High readability:** Strong contrast for text

### Accessibility
All themes maintain:
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Clear visual hierarchy
- Keyboard navigation support

---

## 🔄 Differences from Presentation Themes

### App Theme (This Feature)
- **Controls:** Dashboard UI colors
- **Scope:** Sidebar, topbar, navigation, cards
- **Location:** Settings module
- **Purpose:** Customize your working environment

### Presentation Theme (Design Module)
- **Controls:** Slide colors, fonts, layouts
- **Scope:** Generated presentations only
- **Location:** Design module
- **Purpose:** Customize your presentation output

**Both are independent** - you can mix any app theme with any presentation theme!

---

## 💡 Tips

### Choosing a Theme
- **Default Dark:** Best for general use, reduces eye strain
- **Light Grey:** Best for bright environments, minimal aesthetic
- **Corporate Blue:** Best for professional settings, brand consistency
- **Midnight:** Best for night work, modern look

### Productivity
- Match theme to your environment lighting
- Light themes for bright rooms
- Dark themes for dim lighting
- Try different themes for different times of day

### Consistency
- Use the same theme across sessions for familiarity
- Theme auto-loads on startup
- No need to re-select each time

---

## 🐛 Troubleshooting

### Theme Not Applying
1. Refresh the page
2. Clear browser cache
3. Check browser console for errors
4. Try selecting theme again

### Theme Not Saving
1. Check localStorage is enabled
2. Verify browser privacy settings
3. Try incognito mode to test
4. Check browser storage quota

### Colors Look Wrong
1. Ensure browser is up to date
2. Disable browser extensions
3. Check display color settings
4. Try a different browser

---

## 🚀 Future Enhancements

Potential additions:
- Custom theme creator
- Import/export themes
- System theme detection (auto dark/light)
- High contrast mode
- Colorblind-friendly themes
- Theme sharing between users

---

## 📝 Customization

Want to add your own theme? Edit:
```javascript
// public/js/utils/app-themes.js

export const APP_THEMES = {
    // Add your theme here
    myCustomTheme: {
        id: 'myCustomTheme',
        name: 'My Custom Theme',
        // ... define colors
    }
}
```

---

**Version:** 2.0.0  
**Feature:** App Theme System  
**Status:** ✅ Active  
**Last Updated:** February 5, 2026

