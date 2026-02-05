# Quarto Presentation Studio

A complete web-based dashboard for creating professional Quarto RevealJS presentations. Design custom themes, browse 80+ slide templates, and build presentation decks—all in your browser!

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
npm start
```

### 3. Open Dashboard
**New Dashboard:** http://localhost:3000/dashboard  
**Original Browser:** http://localhost:3000

### 4. Create Your First Presentation
1. **Design Theme** → Choose a preset or customize your own
2. **Browse Templates** → Select from 80+ professional slides
3. **Build Deck** → Add metadata and download
4. **Preview in Quarto** → `quarto preview presentation.qmd`

⏱️ **Time to first presentation: 5 minutes!**

---

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[Testing Guide](TESTING_GUIDE.md)** - Comprehensive testing checklist
- **[Integration Complete](INTEGRATION_COMPLETE.md)** - Full technical details
- **[Implementation](IMPLEMENTATION.md)** - Original implementation notes

---

## ✨ Features

### 🎨 Theme Designer (Designer Pro)
- **3 Built-in Presets:**
  - Academic - Professional academic style
  - Business - Clean corporate look  
  - Creative - Bold and modern
- **Unlimited Custom Themes:**
  - Create, save, update, delete
  - Color customization (background, text, heading, accent)
  - Font selection (heading and body)
  - Size controls (title and body)
  - Reveal.js options (slide numbers, progress, controls)
- **Live Preview:** See changes in real-time
- **Code Generation:** Auto-generate YAML and SCSS
- **Theme Persistence:** Saved in browser localStorage

### 📚 Template Browser
- **80+ Professional Templates:**
  - Title slides (9 variations)
  - Section dividers (8 variations)
  - Content layouts (24 variations: 1-col, 2-col)
  - Figure layouts (9 variations)
  - Data visualizations (8 variations: charts, tables)
  - Code blocks (7 variations)
  - Comparisons (6 variations)
  - Equations (3 variations)
  - Utility slides (6 variations)
- **Smart Filtering:**
  - Filter by layout type
  - Search by keywords
  - Combined filters
- **Visual Preview:** SVG thumbnails for quick identification
- **One-Click Add:** Add templates to deck instantly

### 🔨 Deck Builder
- **Metadata Editor:** Title, subtitle, author, date
- **Slide Management:**
  - View selected slides
  - Remove individual slides
  - Clear all slides
  - Reorder slides (drag-drop coming soon)
- **Theme Application:** Apply custom or preset themes
- **Multi-View Preview:**
  - Full QMD preview
  - YAML frontmatter
  - SCSS theme code
  - README instructions
- **One-Click Download:** Get ready-to-use .qmd, .scss, README

### 🎯 Dashboard Interface
- **Modular Navigation:**
  - Home - Welcome and overview
  - Design - Theme customization
  - Browse - Template selection
  - Build - Deck assembly
  - Library - Saved decks (coming soon)
  - Settings - Preferences (coming soon)
- **Keyboard Shortcuts:** Ctrl+1-6 for navigation, Ctrl+B for sidebar
- **State Persistence:** All work saved automatically
- **Responsive Design:** Works on desktop, laptop, tablet, mobile

---

## 🏗️ Architecture

### Modern Modular Design
- **Frontend:** Vanilla JavaScript (ES6 modules)
- **Backend:** Node.js + Express
- **Storage:** localStorage (browser-based)
- **Templates:** Quarto Markdown (.qmd)
- **Styling:** SCSS (generated)
- **Presentation:** Reveal.js

### Project Structure

```
quarto-presentation-studio/
├── public/
│   ├── index.html              # Original template browser
│   ├── index-new.html          # New dashboard interface
│   ├── css/
│   │   └── app.css             # Shared styles
│   ├── js/
│   │   ├── app.js              # Original entry point
│   │   ├── app-new.js          # Dashboard entry point
│   │   ├── api.js              # API client
│   │   ├── modules/
│   │   │   ├── router.js       # Module routing & navigation
│   │   │   ├── state.js        # Global state management
│   │   │   ├── design.js       # Theme designer module
│   │   │   ├── browse.js       # Template browser module
│   │   │   └── build.js        # Deck builder module
│   │   ├── components/
│   │   │   └── sidebar.js      # Collapsible sidebar component
│   │   └── utils/
│   │       ├── storage.js      # localStorage wrapper
│   │       ├── theme-generator.js    # SCSS/YAML generation
│   │       └── deck-generator.js     # QMD assembly
│   └── previews/               # SVG template previews
├── templates/
│   ├── fragments/              # 80+ template .qmd files
│   ├── registry.json           # Template metadata
│   └── deck-wrapper.qmd        # Deck YAML template
├── decks/                      # Generated deck files
├── server.js                   # Express server
├── scripts/
│   └── generate-templates.js   # Template generator
└── package.json
```

### Key Modules

**Router** ([router.js](public/js/modules/router.js))
- Module switching with URL hash routing
- Lifecycle callbacks (onEnter, onExit)
- Keyboard shortcut integration
- Browser back/forward support

**State** ([state.js](public/js/modules/state.js))
- Centralized reactive state
- Subscribe/notify pattern
- Deep path access
- localStorage persistence

**Design** ([design.js](public/js/modules/design.js))
- Theme preset management
- Custom theme CRUD
- Real-time preview updates
- SCSS/YAML generation

**Browse** ([browse.js](public/js/modules/browse.js))
- Template grid rendering
- Search and filter
- Preview modal
- Slide selection

**Build** ([build.js](public/js/modules/build.js))
- Slide list management
- Metadata editing
- Theme application
- File generation & download

---

## 🔌 API Endpoints

### GET `/api/templates`
Returns all templates from registry

**Response:**
```json
{ 
  "ok": true, 
  "templates": [...]
}
```

### GET `/api/templates/:id`
Returns specific template with fragment content

**Response:**
```json
{
  "ok": true,
  "template": { "id": "...", "name": "...", ... },
  "fragmentText": "..."
}
```

### POST `/api/decks/create`
Creates a new deck file (legacy endpoint)

**Request:**
```json
{ 
  "filename": "my-deck", 
  "slides": ["template-id-1", "template-id-2"]
}
```

**Response:**
```json
{ "ok": true, "path": "decks/my-deck.qmd" }
```

**Error responses:**
- `400`: Invalid filename or slides
- `409`: File already exists

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+1` | Navigate to Home |
| `Ctrl+2` | Navigate to Design Theme |
| `Ctrl+3` | Navigate to Browse Templates |
| `Ctrl+4` | Navigate to Build Deck |
| `Ctrl+5` | Navigate to Library |
| `Ctrl+6` | Navigate to Settings |
| `Ctrl+B` | Toggle Sidebar |
| `?` | Show Keyboard Shortcuts Help |
| `Esc` | Close Modals |

---

## 🎨 Theme Presets

### Academic
**Style:** Professional academic presentations
- **Colors:** White background, dark text, blue accent (#0067FF)
- **Fonts:** Georgia (headings), Calibri (body)
- **Use for:** Research presentations, lectures, academic conferences

### Business
**Style:** Clean corporate presentations
- **Colors:** White background, dark gray text, professional blue (#2563EB)
- **Fonts:** Arial (headings & body)
- **Use for:** Business meetings, reports, corporate presentations

### Creative
**Style:** Bold and modern presentations
- **Colors:** Dark background (#1F2933), light text, coral accent (#FF6B6B)
- **Fonts:** Helvetica (headings & body)
- **Use for:** Creative pitches, design reviews, modern showcases

---

## 📦 Generated Files

When you download a deck, you receive:

### `presentation.qmd`
Main Quarto markdown file containing:
- YAML frontmatter (metadata, theme, Reveal.js options)
- All selected slide content
- Ready to edit and customize

### `custom.scss`
Custom theme stylesheet with:
- Color variables
- Font definitions
- Size specifications
- Reveal.js customizations

### `README.md`
Usage instructions including:
- How to preview the presentation
- How to build to HTML
- Customization tips
- Quarto command reference

---

## 🔧 Template Schema

Each template in `registry.json`:
```json
{
  "id": "title-1",
  "name": "Title Slide",
  "layout": "title",
  "powerpointEquivalent": "Title Slide",
  "slideClass": "title-slide",
  "fragment": "templates/fragments/title-1.qmd",
  "tags": ["title", "title-slide"]
}
```

### Fragment Format

Each `.qmd` file in `templates/fragments/`:
```qmd
## {.slide-class}

Content here (HTML, markdown, or plain text)
```

**Important**: No YAML in fragments. Only the wrapper (`deck-wrapper.qmd`) contains YAML.

---

## 🐛 Troubleshooting

### Server won't start
- Check Node.js version: `node --version` (v14+ required)
- Verify port 3000 available
- Check for errors in console

### Templates don't load
- Ensure `templates/registry.json` exists
- Verify `templates/fragments/` has .qmd files
- Check server console for errors

### Dashboard shows blank
- Clear browser cache
- Check browser console for errors
- Verify accessing correct URL: `/dashboard`

### Downloads don't work
- Check browser download settings
- Verify popup blocker not blocking
- Check browser console for errors

### State doesn't persist
- Verify localStorage enabled in browser
- Check browser privacy settings
- Try incognito/private mode to test

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

ES6 modules required.

---

## 📝 License

MIT

---

**Version:** 2.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** February 5, 2026
