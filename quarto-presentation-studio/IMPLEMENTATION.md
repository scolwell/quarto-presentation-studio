# Quarto Template Browser - Complete Implementation ✓

## Overview
A lightweight, dependency-minimal web application for browsing, previewing, and assembling Quarto RevealJS presentation decks from reusable template fragments.

**Live at:** http://localhost:3000

## Features Implemented

✅ **75 Template Library** (organized by layout category)
✅ **Template Registry** (JSON metadata)
✅ **Safe Preview** (iframe-based, no code execution)
✅ **Deck Builder** (drag-select slides, reorder, create)
✅ **Server-Side Validation** (filename sanitization, no overwrite by default)
✅ **Layout Filtering** (by category)
✅ **Search** (by name, id, layout)
✅ **Slide Management** (up/down/remove buttons)
✅ **Responsive UI** (left panel + right builder)

## Project Structure

```
quarto-theme-gen feb4/
├── server.js                 # Express server (port 3000)
├── package.json              # Dependencies
├── README.md
├── .gitignore
├── decks/                    # Output directory for created decks
├── templates/
│   ├── deck-wrapper.qmd      # YAML wrapper with {{SLIDES}} placeholder
│   ├── registry.json         # 75 templates metadata
│   └── fragments/            # 75 .qmd fragment files
├── public/
│   ├── index.html
│   ├── css/
│   │   └── app.css
│   └── js/
│       ├── app.js            # Entry point, event wiring
│       ├── api.js            # HTTP client
│       ├── state.js          # State management
│       ├── ui.js             # Rendering, filter, search
│       ├── preview.js        # Safe iframe preview
│       └── deck.js           # Filename validation
└── scripts/
    └── generate-templates.js # Generator for 75 templates
```

## Template Categories (75 Total)

| Category | Count | Examples |
|----------|-------|----------|
| Title | 8 | Title Slide, Title with Background, Title with Date |
| Section | 8 | Section Header, Divider, Chapter Slide |
| Content 1-Col | 12 | Title+Text, Title+Bullets, Timeline, Callout |
| Content 2-Col | 12 | Two Columns, Image+Text, Split Screen |
| Comparison | 6 | Three Column, Matrix, Venn, Four Quadrant |
| Figure/Media | 9 | Full Figure, Gallery, Hero Image, Video, Carousel |
| Data | 8 | Tables (4), Charts (4) |
| Code | 3 | Code Block, Title+Code, Two Code Blocks |
| Equation | 3 | Single, Title+Equation, Multi Equations |
| Utility | 6 | Thank You, Questions, Backup, Blank, Resources |

## Key Files

### server.js
- Serves static files from `/public`
- **GET /api/templates** - List all templates
- **GET /api/templates/:id** - Get template + fragment text
- **POST /api/decks/create** - Create and save deck .qmd
  - Validates filename (sanitizes, rejects path traversal)
  - Refuses overwrite (409 status)
  - Reads wrapper + fragments, replaces {{SLIDES}}, saves to `/decks/`

### public/index.html
- Layout: 2-panel (left = browser, right = builder)
- Filter by layout dropdown
- Search by name/id/layout
- Template grid with Preview/Add buttons
- Selected slides list with reorder/remove
- Filename input + Create Deck button
- Status messages area

### public/js/app.js
- Entry point: Loads registry, initializes UI, wires events
- Handles preview and deck creation

### public/js/api.js
- `fetchTemplates()` - GET /api/templates
- `fetchTemplate(id)` - GET /api/templates/:id
- `createDeck(filename, slides)` - POST /api/decks/create

### public/js/state.js
- Global state: templates, selectedSlides, filters
- Helper functions for filtering, adding/removing slides

### public/js/ui.js
- Renders template grid with dynamic filter/search
- Renders selected slides list with controls
- Shows status messages (success/error/info)

### public/js/preview.js
- Generates minimal HTML for preview iframe
- Escapes HTML to prevent injection
- Shows fragment in 1280x720 slide frame

### public/js/deck.js
- Client-side filename validation
- Mirrors server sanitization logic

### templates/deck-wrapper.qmd
```qmd
---
title: ""
format:
  revealjs:
    title-slide: false
    slide-number: false
    controls: true
    progress: false
    center: false
    width: 1280
    height: 720
    margin: 0.07
    theme: [default]
    css: [deck.css]
---

{{SLIDES}}
```

## Fragment Format

Each `/templates/fragments/*.qmd` file:
```qmd
## {.slide-class}

Content here
```

**No YAML inside fragments** - only the wrapper contains YAML.

## API Endpoints

### GET /api/templates
Returns array of template objects with metadata.

**Response:**
```json
{
  "ok": true,
  "templates": [
    {
      "id": "title-1",
      "name": "Title Slide",
      "layout": "title",
      "powerpointEquivalent": "Title Slide",
      "slideClass": "title-slide",
      "fragment": "templates/fragments/title-1.qmd",
      "tags": ["title", "title-slide"]
    }
  ]
}
```

### GET /api/templates/:id
Returns template metadata + fragment text.

**Response:**
```json
{
  "ok": true,
  "template": { ... },
  "fragmentText": "## {.title-slide}\n\nTitle and subtitle placeholder"
}
```

### POST /api/decks/create
Creates a new deck file from selected templates.

**Request:**
```json
{
  "filename": "my-deck",
  "slides": ["title-1", "content-1col-1", "utility-2"]
}
```

**Response (201):**
```json
{
  "ok": true,
  "path": "decks/my-deck.qmd"
}
```

**Error Responses:**
- `400` - Invalid filename or slide IDs
- `409` - File already exists

## Filename Validation

Server-side:
- Lowercase, trim, spaces → hyphens
- Remove non-`[a-z0-9-_]` chars
- Collapse hyphens
- Regex: `^[a-z0-9][a-z0-9-_]{1,63}$`
- Refuse path traversal (`..`, `/`, `\`)

## Running

### Setup
```bash
npm install
npm run generate    # Creates fragments + registry
```

### Start
```bash
npm start
# Opens http://localhost:3000
```

### Create a Deck
1. Filter/search templates (optional)
2. Click "Preview" to see template in iframe
3. Click "Add" to select templates in order
4. Use ↑/↓/✕ to reorder/remove slides
5. Enter filename (e.g., "my-presentation")
6. Click "Create Deck"
7. Server creates `decks/my-presentation.qmd`

### Render with Quarto
```bash
quarto render decks/my-presentation.qmd
```

## Technology Stack

- **Server:** Express.js (Node.js)
- **Frontend:** Vanilla HTML/CSS/ES6 modules
- **Preview:** Safe iframe rendering (HTML escaped)
- **No build tool:** Direct ES6 module imports, static file serving

## Customization

### Add More Templates
Edit `scripts/generate-templates.js`:
1. Add template objects to array
2. Run `npm run generate`

### Change Wrapper Format
Edit `templates/deck-wrapper.qmd` to modify:
- RevealJS settings
- CSS includes
- Slide transitions, margins, themes

### Style UI
Edit `public/css/app.css` - all styling is there

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
(Requires ES6 module support)

## Notes

- ✓ 75 high-value templates across all major slide types
- ✓ No webpack/Vite - pure Express + vanilla JS
- ✓ Templates are real .qmd files, not JSON
- ✓ Safe preview (no code execution)
- ✓ Server validates everything
- ✓ Can be deployed to any Node.js host
- ✓ Fully functional MVP ready for styling/customization
