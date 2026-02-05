# Testing Guide
## Quarto Presentation Studio Dashboard

This guide walks through testing all features of the integrated dashboard.

---

## 🚀 Starting the Server

1. Open terminal
2. Navigate to project:
   ```bash
   cd quarto-presentation-studio
   ```
3. Start server:
   ```bash
   npm start
   ```
4. Open browser to: http://localhost:3000/dashboard

---

## 📋 Test Checklist

### ✅ 1. Foundation & Navigation

#### Test: Server Startup
- [ ] Server starts without errors
- [ ] Shows both URLs:
  - http://localhost:3000 (original)
  - http://localhost:3000/dashboard (new)

#### Test: Initial Load
- [ ] Dashboard loads successfully
- [ ] No console errors (open DevTools → Console)
- [ ] Sidebar visible and expanded
- [ ] Home module active by default
- [ ] Breadcrumb shows "Home"

#### Test: Sidebar
- [ ] Click collapse button (‹ icon)
- [ ] Sidebar animates to 70px width
- [ ] Icons still visible
- [ ] Labels hidden
- [ ] Collapse icon changes to ›
- [ ] Click again to expand
- [ ] Sidebar returns to 240px

#### Test: Module Navigation (Click)
- [ ] Click "Design Theme" → Design module shows
- [ ] Click "Browse Templates" → Browse module shows
- [ ] Click "Build Deck" → Build module shows
- [ ] Click "Library" → Library placeholder shows
- [ ] Click "Settings" → Settings placeholder shows
- [ ] Click "Home" → Home module shows
- [ ] Active nav item highlighted in blue
- [ ] Breadcrumb updates each time

#### Test: Module Navigation (Keyboard)
- [ ] Press Ctrl+1 → Navigate to Home
- [ ] Press Ctrl+2 → Navigate to Design
- [ ] Press Ctrl+3 → Navigate to Browse
- [ ] Press Ctrl+4 → Navigate to Build
- [ ] Press Ctrl+5 → Navigate to Library
- [ ] Press Ctrl+6 → Navigate to Settings

#### Test: Sidebar Keyboard Shortcut
- [ ] Press Ctrl+B → Sidebar collapses
- [ ] Press Ctrl+B → Sidebar expands

#### Test: Help Shortcut
- [ ] Press ? key
- [ ] Alert shows keyboard shortcuts
- [ ] Close alert

#### Test: URL Routing
- [ ] Click Design → URL changes to #/design
- [ ] Refresh page → Still on Design module
- [ ] Browser back button → Returns to previous module
- [ ] Browser forward button → Goes forward

#### Test: State Persistence
- [ ] Navigate to Browse module
- [ ] Collapse sidebar
- [ ] Refresh page
- [ ] Verify Browse module still active
- [ ] Verify sidebar still collapsed

---

### ✅ 2. Design Module (Theme Designer)

Navigate to Design module (Ctrl+2)

#### Test: Initial State
- [ ] Preset selector shows "Academic"
- [ ] Preview pane visible
- [ ] Controls section visible
- [ ] Tabs: Preview | YAML | SCSS
- [ ] Preview tab active by default

#### Test: Built-in Presets
- [ ] Select "Academic" from dropdown
  - [ ] Colors load (White bg, dark text, blue accent)
  - [ ] Fonts: Georgia / Calibri
  - [ ] Preview updates
- [ ] Select "Business" from dropdown
  - [ ] Colors change
  - [ ] Fonts: Arial / Arial
  - [ ] Preview updates
- [ ] Select "Creative" from dropdown
  - [ ] Dark background loads
  - [ ] Fonts: Helvetica
  - [ ] Preview updates

#### Test: Color Controls
- [ ] Click background color picker
- [ ] Change to different color (e.g., #F0F0F0)
- [ ] Preview background updates immediately
- [ ] Try text color, heading color, accent color
- [ ] Verify each updates preview

#### Test: Font Controls
- [ ] Change heading font dropdown
- [ ] Preview title font changes
- [ ] Change body font dropdown
- [ ] Preview body text font changes

#### Test: Size Controls
- [ ] Drag title size slider
- [ ] Value display updates (e.g., 44 → 52)
- [ ] Preview title size changes
- [ ] Drag body size slider
- [ ] Preview body size changes

#### Test: Options Checkboxes
- [ ] Toggle "Show slide number"
- [ ] Toggle "Show progress"
- [ ] Toggle "Show controls"
- [ ] (These affect generated YAML, check YAML tab)

#### Test: Preview Tabs
- [ ] Click "YAML" tab
  - [ ] Tab becomes active (blue border)
  - [ ] YAML code shows
  - [ ] Contains theme: custom.scss
  - [ ] Contains slide-number, progress, controls settings
- [ ] Click "SCSS" tab
  - [ ] SCSS code shows
  - [ ] Contains color variables
  - [ ] Contains font variables
  - [ ] Contains size variables
- [ ] Click "Preview" tab
  - [ ] Returns to live preview

#### Test: Save Custom Theme
- [ ] Modify Academic theme (change any color)
- [ ] Click "Save as..." button
- [ ] Modal appears
- [ ] Enter name: "Test Theme"
- [ ] Enter description: "My test theme"
- [ ] Click "Save"
- [ ] Modal closes
- [ ] Dropdown now shows "✏️ Test Theme (custom)"
- [ ] Theme selected in dropdown

#### Test: Update Custom Theme
- [ ] Verify "Test Theme" is selected
- [ ] Modify a color
- [ ] "Update Theme" button visible
- [ ] Click "Update Theme"
- [ ] Alert: "Theme updated successfully"

#### Test: Delete Custom Theme
- [ ] Verify custom theme selected
- [ ] "Delete Theme" button visible
- [ ] Click "Delete Theme"
- [ ] Confirm dialog appears
- [ ] Click OK
- [ ] Theme removed from dropdown
- [ ] Academic theme loaded

#### Test: Create New from Blank
- [ ] Select "+ Create New from Blank"
- [ ] All controls reset to defaults
- [ ] Preview shows default theme
- [ ] Can modify all controls
- [ ] Save as new theme

#### Test: Reset Button
- [ ] Modify current theme
- [ ] Click "Reset" button
- [ ] Confirm dialog
- [ ] Academic theme reloads

#### Test: Apply to Deck
- [ ] Select a theme (e.g., Business)
- [ ] Click "Apply to Deck" button
- [ ] Navigates to Build module
- [ ] Theme shown in Build module

#### Test: Theme Persistence
- [ ] Create custom theme
- [ ] Refresh page
- [ ] Navigate back to Design
- [ ] Custom theme in dropdown
- [ ] Select it → loads correctly

---

### ✅ 3. Browse Module (Template Browser)

Navigate to Browse module (Ctrl+3)

#### Test: Initial State
- [ ] Template grid displays
- [ ] Layout filter: "All Layouts"
- [ ] Search input empty
- [ ] Stats show total templates (e.g., "Showing 80 of 80 templates")

#### Test: Layout Filter
- [ ] Select "Title" from layout dropdown
- [ ] Only title templates show (9 templates)
- [ ] Stats update: "Showing 9 of 80"
- [ ] Select "Section"
- [ ] Only section templates show
- [ ] Select "Content-1col"
- [ ] Only 1-column content shows
- [ ] Try other layouts
- [ ] Select "All Layouts"
- [ ] All 80+ templates show

#### Test: Search
- [ ] Type "data" in search box
- [ ] Templates filter to data-related
- [ ] Stats update
- [ ] Type "title"
- [ ] Only title templates show
- [ ] Clear search
- [ ] All templates return

#### Test: Combined Filters
- [ ] Select layout: "Figure"
- [ ] Type "simple" in search
- [ ] Both filters apply
- [ ] Stats reflect filtered count

#### Test: Reset Filters
- [ ] Set layout and search
- [ ] Click "Reset" button
- [ ] Layout returns to "All Layouts"
- [ ] Search clears
- [ ] All templates show

#### Test: Template Cards
- [ ] Hover over a card
- [ ] Card shadow increases
- [ ] "Add to Deck" button appears
- [ ] Layout badge visible
- [ ] Preview image shows

#### Test: Quick Add
- [ ] Hover over card
- [ ] Click "Add to Deck" button
- [ ] Alert: "Added [Template] to deck"
- [ ] Click another card's Add button
- [ ] Second alert appears

#### Test: Preview Modal
- [ ] Click on a template card (not the button)
- [ ] Modal opens
- [ ] Large preview image shows
- [ ] Title displayed
- [ ] Description displayed
- [ ] Layout badge shown
- [ ] Tags displayed
- [ ] Fragment path shown
- [ ] "Add to Deck" button visible
- [ ] "Close" button visible

#### Test: Modal Add to Deck
- [ ] In modal, click "Add to Deck"
- [ ] Alert appears
- [ ] Modal stays open
- [ ] Click "Close" or X
- [ ] Modal closes

#### Test: Modal Close Methods
- [ ] Open modal
- [ ] Click X button → closes
- [ ] Open modal
- [ ] Click "Close" button → closes
- [ ] Open modal
- [ ] Press Esc key → closes
- [ ] Open modal
- [ ] Click outside modal (on backdrop) → closes

#### Test: Selected Slides Tracking
- [ ] Add multiple templates to deck (5-6)
- [ ] Selected count updates
- [ ] Navigate to Build module (Ctrl+4)
- [ ] Verify slides appear in Build
- [ ] Navigate back to Browse (Ctrl+3)
- [ ] Selection persists

---

### ✅ 4. Build Module (Deck Assembly)

Navigate to Build module (Ctrl+4)

#### Test: Empty State
- [ ] Clear all selected slides (if any)
- [ ] Empty state message shows
- [ ] "Browse Templates" button visible
- [ ] Click button → navigates to Browse

#### Test: With Selected Slides
- [ ] Add slides from Browse module (5-10 slides)
- [ ] Navigate to Build
- [ ] All slides listed
- [ ] Each slide shows:
  - [ ] Drag handle icon (⋮⋮)
  - [ ] Preview image
  - [ ] Slide title
  - [ ] Layout badge
  - [ ] Remove button (×)

#### Test: Metadata Form
- [ ] Title field editable
- [ ] Enter: "My Test Presentation"
- [ ] Subtitle field editable
- [ ] Enter: "Testing the Dashboard"
- [ ] Author field editable
- [ ] Enter: "Your Name"
- [ ] Date field editable
- [ ] Change date

#### Test: Theme Display
- [ ] Current theme section shows theme name
- [ ] "Change Theme" button visible
- [ ] Click "Change Theme"
- [ ] Navigates to Design module
- [ ] Go back to Build (Ctrl+4)
- [ ] Theme still displayed

#### Test: Remove Slides
- [ ] Click × button on a slide
- [ ] Confirm dialog appears
- [ ] Click OK
- [ ] Slide removed from list
- [ ] Count updates

#### Test: Clear All
- [ ] Click "Clear All" button
- [ ] Confirm dialog
- [ ] Click OK
- [ ] All slides removed
- [ ] Empty state shows

#### Test: Preview Tabs
- [ ] Add some slides
- [ ] Enter metadata
- [ ] Click "Preview" tab
  - [ ] Full QMD content shows
  - [ ] Includes YAML frontmatter
  - [ ] Includes all slide fragments
- [ ] Click "YAML" tab
  - [ ] Only YAML frontmatter shows
  - [ ] Contains title, author, date
  - [ ] Contains theme: custom.scss
  - [ ] Contains reveal options
- [ ] Click "SCSS" tab
  - [ ] SCSS theme code shows
  - [ ] Contains color variables
  - [ ] Contains font variables
- [ ] Click "README" tab
  - [ ] Usage instructions show
  - [ ] Contains build command
  - [ ] Contains preview command

#### Test: Download Deck
- [ ] Ensure slides selected and metadata filled
- [ ] Click "Download Deck" button
- [ ] File downloads (check Downloads folder)
- [ ] Unzip file
- [ ] Contains:
  - [ ] presentation.qmd
  - [ ] custom.scss
  - [ ] README.md

#### Test: Save to Library (if implemented)
- [ ] Click "Save to Library" button
- [ ] Success message
- [ ] Navigate to Library module
- [ ] Verify deck in library

#### Test: Metadata Persistence
- [ ] Fill in all metadata
- [ ] Refresh page
- [ ] Navigate to Build
- [ ] Metadata still filled in

#### Test: Slide Reordering (if drag-drop implemented)
- [ ] Drag a slide by handle
- [ ] Move up or down
- [ ] Drop in new position
- [ ] Order updates
- [ ] Preview reflects new order

---

### ✅ 5. Library Module

Navigate to Library module (Ctrl+5)

#### Test: Placeholder
- [ ] Library placeholder shows
- [ ] Message about saved decks
- [ ] (Full implementation optional)

---

### ✅ 6. Settings Module

Navigate to Settings module (Ctrl+6)

#### Test: Placeholder
- [ ] Settings placeholder shows
- [ ] Message about preferences
- [ ] (Full implementation optional)

---

### ✅ 7. Complete Workflow Test

**Scenario:** Create a complete presentation from scratch

1. **Design Theme:**
   - [ ] Navigate to Design (Ctrl+2)
   - [ ] Select "Business" preset
   - [ ] Change heading color to #2563EB
   - [ ] Change title size to 48
   - [ ] Click "Save as..."
   - [ ] Name: "Workflow Test Theme"
   - [ ] Click Save
   - [ ] Click "Apply to Deck"

2. **Browse Templates:**
   - [ ] Navigate to Browse (Ctrl+3)
   - [ ] Filter: "Title"
   - [ ] Add "Title-1" to deck
   - [ ] Filter: "Section"
   - [ ] Add "Section-1" to deck
   - [ ] Filter: "Content-1col"
   - [ ] Add 2-3 content slides
   - [ ] Filter: "Figure"
   - [ ] Add 1-2 figure slides

3. **Build Deck:**
   - [ ] Navigate to Build (Ctrl+4)
   - [ ] Verify all slides listed
   - [ ] Fill metadata:
     - Title: "Complete Workflow Test"
     - Subtitle: "End-to-End Testing"
     - Author: "Tester"
     - Date: Today
   - [ ] Verify theme: "Workflow Test Theme"
   - [ ] Check Preview tab
   - [ ] Check YAML tab
   - [ ] Check SCSS tab
   - [ ] Click "Download Deck"
   - [ ] Verify download

4. **State Persistence:**
   - [ ] Refresh browser
   - [ ] Navigate to Build (Ctrl+4)
   - [ ] Verify:
     - [ ] All slides still there
     - [ ] Metadata still filled
     - [ ] Theme still applied

---

### ✅ 8. Cross-Browser Testing

Test in multiple browsers:

#### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Animations smooth

#### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Animations smooth

#### Safari
- [ ] All features work
- [ ] No console errors
- [ ] Animations smooth

---

### ✅ 9. Responsive Testing

#### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] No overflow
- [ ] All elements accessible

#### Laptop (1366x768)
- [ ] Layout adapts
- [ ] All features work

#### Tablet (768px wide)
- [ ] Sidebar auto-collapses
- [ ] Content readable
- [ ] Touch targets adequate

#### Mobile (375px wide)
- [ ] Layout stacks properly
- [ ] Sidebar collapsed by default
- [ ] All features accessible

---

### ✅ 10. Performance Testing

#### Load Time
- [ ] Initial page load < 1 second
- [ ] Module switching instantaneous
- [ ] No visible lag

#### Interaction Speed
- [ ] Sidebar toggle smooth (< 300ms)
- [ ] Module switch < 100ms
- [ ] Preview updates < 150ms (debounced)

#### Memory
- [ ] No memory leaks after extended use
- [ ] Browser doesn't slow down

---

### ✅ 11. Error Handling

#### Invalid Input
- [ ] Save theme with empty name → error message
- [ ] Delete built-in theme → prevented
- [ ] Navigate with no server → error handled

#### Edge Cases
- [ ] No templates loaded → shows empty state
- [ ] No selected slides → shows empty state
- [ ] Very long theme name → truncates or handles

---

### ✅ 12. Accessibility

#### Keyboard Navigation
- [ ] Can tab through all controls
- [ ] Enter activates buttons
- [ ] Space toggles checkboxes
- [ ] Esc closes modals

#### Screen Reader (if tested)
- [ ] Labels readable
- [ ] Buttons have aria-labels
- [ ] State changes announced

---

## 🐛 Bug Reporting Template

If you find an issue:

```
**Bug Description:**
[Brief description]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Browser/Version:**
[e.g., Chrome 122, Firefox 123]

**Console Errors:**
[Copy any error messages from console]

**Screenshots:**
[If applicable]
```

---

## ✅ Final Checklist

Before marking integration complete:

- [ ] All Phase 1 tests pass
- [ ] All Phase 2 tests pass
- [ ] All Phase 3 tests pass
- [ ] All Phase 4 tests pass
- [ ] Complete workflow works end-to-end
- [ ] No console errors
- [ ] Performance acceptable
- [ ] State persistence works
- [ ] Keyboard shortcuts functional
- [ ] Tested in 2+ browsers
- [ ] Responsive design verified
- [ ] Documentation complete

---

**Testing Status:** 🔄 IN PROGRESS  
**Last Updated:** February 5, 2026

