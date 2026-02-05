# Quick Start Guide
## Quarto Presentation Studio

Get started building professional Quarto presentations in minutes!

---

## 🚀 Start the Dashboard

### 1. Open Terminal
```bash
cd quarto-presentation-studio
npm start
```

### 2. Open Browser
Navigate to: **http://localhost:3000/dashboard**

✅ You should see the dashboard with a dark sidebar and light content area.

---

## 🎯 Create Your First Presentation (5 minutes)

### Step 1: Design a Theme (2 min)

1. Click **"Design Theme"** in sidebar (or press `Ctrl+2`)
2. Choose a preset:
   - **Academic** - Professional academic style
   - **Business** - Clean corporate look
   - **Creative** - Bold and modern
3. **Optional:** Customize colors, fonts, sizes
4. Click **"Apply to Deck"** button

### Step 2: Select Slides (2 min)

1. Click **"Browse Templates"** in sidebar (or press `Ctrl+3`)
2. Browse 80+ professional templates
3. Click **"Add to Deck"** on templates you like:
   - Start with a Title slide
   - Add Section dividers
   - Add Content slides
   - Add Data/Figure slides
4. You now have 5-10 slides selected

### Step 3: Build & Download (1 min)

1. Click **"Build Deck"** in sidebar (or press `Ctrl+4`)
2. Fill in metadata:
   - **Title:** "My First Presentation"
   - **Author:** Your name
   - **Date:** Today's date
3. Click **"Download Deck"** button
4. Unzip the downloaded file

### Step 4: Preview in Quarto

```bash
cd my-presentation
quarto preview presentation.qmd
```

🎉 **Done!** Your presentation is live in your browser!

---

## 📚 Module Overview

### 🏠 Home
Welcome screen with overview and quick links.

### 🎨 Design Theme
Create and customize presentation themes:
- 3 built-in presets (Academic, Business, Creative)
- Unlimited custom themes
- Live preview
- Color, font, and size controls
- Save and reuse your themes

### 📚 Browse Templates
Browse 80+ professional slide templates:
- Filter by layout (Title, Section, Content, etc.)
- Search by keywords
- Visual previews
- One-click add to deck

### 🔨 Build Deck
Assemble your presentation:
- Edit metadata (title, author, date)
- Review selected slides
- Apply theme
- Preview generated code
- Download ready-to-use files

### 💾 Library
Save and manage your presentations (coming soon)

### ⚙️ Settings
Configure preferences (coming soon)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+1` | Go to Home |
| `Ctrl+2` | Go to Design |
| `Ctrl+3` | Go to Browse |
| `Ctrl+4` | Go to Build |
| `Ctrl+5` | Go to Library |
| `Ctrl+6` | Go to Settings |
| `Ctrl+B` | Toggle Sidebar |
| `?` | Show Help |
| `Esc` | Close Modals |

---

## 🎨 Working with Themes

### Use a Built-in Preset
1. Go to Design module
2. Select "Academic", "Business", or "Creative" from dropdown
3. Click "Apply to Deck"

### Create a Custom Theme
1. Go to Design module
2. Select a preset as starting point
3. Modify colors, fonts, sizes
4. Click "Save as..."
5. Enter a name (e.g., "My Brand")
6. Click Save

### Reuse a Custom Theme
1. Go to Design module
2. Select your custom theme from dropdown
3. It loads with all your settings
4. Click "Apply to Deck"

### Update a Custom Theme
1. Select your custom theme
2. Make changes
3. Click "Update Theme" button
4. Changes saved!

---

## 📖 Template Categories

| Category | Count | Description |
|----------|-------|-------------|
| **Title** | 9 | Opening slides with various styles |
| **Section** | 8 | Section dividers and transitions |
| **Content-1col** | 12 | Single column content layouts |
| **Content-2col** | 12 | Two column content layouts |
| **Figure** | 9 | Image and figure layouts |
| **Data-Chart** | 4 | Chart and graph layouts |
| **Data-Table** | 4 | Table layouts |
| **Code** | 7 | Code block layouts |
| **Comparison** | 6 | Side-by-side comparisons |
| **Equation** | 3 | Mathematical equation layouts |
| **Utility** | 6 | Blank, divider, and special slides |

---

## 💡 Pro Tips

### Theme Design
- **Start with a preset** - Easier than starting from scratch
- **Test in preview** - See changes in real-time
- **Save variations** - Create multiple themes for different audiences
- **Use SCSS tab** - Copy code to manually fine-tune

### Template Selection
- **Start with structure** - Title → Sections → Content
- **Mix layouts** - Variety keeps presentations interesting
- **Use filter** - Quickly find template types
- **Preview before adding** - Click card to see details

### Deck Building
- **Fill metadata first** - Title, author, date
- **Review preview** - Check YAML tab for configuration
- **Download early** - Test in Quarto, refine as needed
- **Save to library** - Reuse your decks (coming soon)

---

## 🔄 Typical Workflow

```
1. Design → Choose/customize theme
           ↓
2. Browse → Select slide templates
           ↓
3. Build  → Assemble deck, add metadata
           ↓
4. Download → Get .qmd, .scss, README
           ↓
5. Quarto → Preview and present!
```

**Time:** 5-10 minutes for a complete presentation

---

## 📦 Downloaded Files

When you click "Download Deck", you get:

### presentation.qmd
The main Quarto markdown file with:
- YAML frontmatter (title, author, theme, settings)
- All your selected slide content
- Ready to edit and customize

### custom.scss
Your custom theme file with:
- Color variables
- Font settings
- Size definitions
- Reveal.js customizations

### README.md
Instructions for:
- Building the presentation
- Previewing locally
- Rendering to HTML
- Customization tips

---

## 🛠️ Using Your Presentation

### Preview Locally
```bash
quarto preview presentation.qmd
```
Opens in browser with live reload

### Build to HTML
```bash
quarto render presentation.qmd
```
Creates `presentation.html`

### Customize Content
Edit `presentation.qmd`:
- Replace placeholder text
- Add your content
- Modify structure
- Add images, code, equations

### Customize Theme
Edit `custom.scss`:
- Fine-tune colors
- Adjust spacing
- Add custom styles
- Override defaults

---

## 📱 Responsive Design

The dashboard works on all devices:

### Desktop (Recommended)
- Full sidebar visible
- Large preview areas
- Optimal workflow

### Laptop
- Collapsible sidebar
- Responsive layout
- All features available

### Tablet
- Auto-collapsed sidebar
- Touch-friendly
- Portrait/landscape support

### Mobile
- Sidebar hidden by default
- Stacked layout
- Core features accessible

---

## 💾 Data Persistence

Your work is automatically saved:

### What's Saved
- ✅ Current module
- ✅ Sidebar collapsed state
- ✅ Selected theme
- ✅ Custom themes
- ✅ Selected slides
- ✅ Deck metadata

### When It's Saved
- Automatically as you work
- Persists across page refreshes
- Survives browser restart
- Stored in browser localStorage

### Clearing Data
To start fresh:
1. Open browser DevTools
2. Console tab
3. Type: `localStorage.clear()`
4. Refresh page

---

## ❓ FAQ

### Q: Can I edit templates?
**A:** Templates are pre-built fragments. After download, you can edit the .qmd file to customize content.

### Q: How many custom themes can I create?
**A:** Unlimited! They're saved in browser storage.

### Q: Can I share custom themes?
**A:** Currently themes are browser-local. Export/import feature coming soon.

### Q: Can I reorder slides?
**A:** Currently slides are ordered by selection. Drag-drop reordering coming soon.

### Q: Where are my decks saved?
**A:** Downloads go to your browser's download folder. Library feature (for saving in app) coming soon.

### Q: Can I use my own fonts?
**A:** The dropdown includes common system fonts. For custom fonts, edit the .scss file after download.

### Q: Does this require internet?
**A:** After starting the server, it works offline. Quarto rendering also works offline.

### Q: Can I export to PDF/PowerPoint?
**A:** After rendering with Quarto, you can export:
- PDF: `quarto render presentation.qmd --to pdf`
- PowerPoint: `quarto render presentation.qmd --to pptx`

---

## 🐛 Troubleshooting

### Dashboard won't load
- Verify server is running (`npm start`)
- Check correct URL: http://localhost:3000/dashboard
- Clear browser cache
- Check console for errors

### Templates don't show
- Verify registry.json exists in templates/
- Check fragments/ folder has .qmd files
- Restart server

### Theme changes don't apply
- Click "Apply to Deck" button
- Navigate to Build module
- Verify theme name shown

### Download doesn't work
- Check browser download settings
- Try different browser
- Check console for errors

### State doesn't persist
- Check localStorage not disabled
- Try different browser
- Clear and restart

---

## 🎓 Next Steps

Once you're comfortable:

1. **Explore all templates** - 80+ options!
2. **Create theme variations** - Different audiences, contexts
3. **Build a library** - Reusable slide decks
4. **Learn Quarto** - Unlock full presentation power
5. **Customize .qmd files** - Add your unique content

---

## 📚 Resources

### Quarto Documentation
- [Quarto Presentations](https://quarto.org/docs/presentations/)
- [Reveal.js Options](https://quarto.org/docs/presentations/revealjs/)
- [SCSS Theming](https://quarto.org/docs/presentations/revealjs/themes.html)

### Reveal.js
- [Reveal.js Docs](https://revealjs.com/)
- [Keyboard Shortcuts](https://revealjs.com/keyboard/)
- [Speaker View](https://revealjs.com/speaker-view/)

---

## ✨ Tips for Great Presentations

### Design
- **Keep it simple** - Less is more
- **Consistent colors** - Stick to your theme
- **Readable fonts** - Not too small
- **High contrast** - Dark on light or vice versa

### Content
- **One idea per slide** - Focus audience attention
- **Visuals over text** - Images > bullet points
- **Tell a story** - Beginning, middle, end
- **Practice timing** - Know your pace

### Templates
- **Mix it up** - Use variety of layouts
- **Use sections** - Break into logical chunks
- **Start strong** - Engaging title slide
- **End strong** - Clear conclusion or call-to-action

---

**Ready to create amazing presentations?**

🚀 Start now: http://localhost:3000/dashboard

---

**Version:** 2.0.0  
**Last Updated:** February 5, 2026

