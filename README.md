# Quarto Template Browser

A dependency-minimal web app for browsing, previewing, and building Quarto RevealJS decks from template fragments.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Templates
```bash
npm run generate
```

This creates:
- `templates/fragments/*.qmd` (69 template fragments)
- `templates/registry.json` (template metadata)

### 3. Start Server
```bash
npm start
```

Open: http://localhost:3000

## Features

- **Browse Templates**: Browse 69 template fragments by layout, search by name/id
- **Live Preview**: Click "Preview" to see each template in an iframe
- **Build Decks**: Select templates in order, create .qmd deck files
- **Safe Preview**: No execution of arbitrary JavaScript
- **Filename Validation**: Server-side sanitization, prevents overwrite by default
- **No Build Tools**: Pure Express + vanilla ES6 modules

## Project Structure

```
.
├── public/
│   ├── index.html          # Main UI
│   ├── css/app.css         # Styling
│   └── js/
│       ├── app.js          # Entry point
│       ├── api.js          # API client
│       ├── state.js        # State management
│       ├── ui.js           # UI rendering
│       ├── preview.js      # Preview rendering
│       └── deck.js         # Deck validation
├── server.js               # Express server
├── templates/
│   ├── deck-wrapper.qmd    # YAML wrapper ({{SLIDES}} placeholder)
│   ├── registry.json       # Template metadata
│   └── fragments/          # 69 .qmd fragments
├── decks/                  # Output directory for created decks
├── scripts/
│   └── generate-templates.js
└── package.json
```

## API Endpoints

### GET /api/templates
Returns all templates from registry.json

**Response:**
```json
{ "ok": true, "templates": [...] }
```

### GET /api/templates/:id
Returns a template and its fragment text

**Response:**
```json
{
  "ok": true,
  "template": { "id", "name", "layout", ... },
  "fragmentText": "..."
}
```

### POST /api/decks/create
Creates a new deck file

**Request:**
```json
{ "filename": "my-deck", "slides": ["template-id-1", "template-id-2"] }
```

**Response:**
```json
{ "ok": true, "path": "decks/my-deck.qmd" }
```

**Error responses:**
- `400`: Invalid filename or slides
- `409`: File already exists

## Template Schema

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

## Fragment Format

Each `.qmd` file in `templates/fragments/`:
```qmd
## {.slide-class}

Content here (HTML, markdown, or plain text)
```

**Important**: No YAML in fragments. Only the wrapper (`deck-wrapper.qmd`) contains YAML.

## Creating a Deck

1. In the browser, select templates in order
2. Enter filename (alphanumeric, hyphens, underscores)
3. Click "Create Deck"
4. Server creates `decks/<filename>.qmd`
5. Render with Quarto:
   ```bash
   quarto render decks/<filename>.qmd
   ```

## Customization

### Change Wrapper Format
Edit `templates/deck-wrapper.qmd` to modify RevealJS settings or add CSS.

### Add/Modify Templates
Edit `scripts/generate-templates.js` to change template definitions, then run `npm run generate`.

### Style UI
Edit `public/css/app.css`.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

ES6 modules required.

## License

MIT
