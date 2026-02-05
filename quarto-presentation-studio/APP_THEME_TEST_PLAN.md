# App Theme System Test Plan
## Comprehensive Testing Checklist

**Date:** February 5, 2026  
**Feature:** App Theme System  
**Status:** Testing in Progress

---

## 🧪 TEST CATEGORIES

### 1. THEME SWITCHING
### 2. THEME PERSISTENCE
### 3. VISUAL UPDATES
### 4. SETTINGS MODULE
### 5. INTEGRATION
### 6. EDGE CASES
### 7. CROSS-BROWSER

---

## 1. THEME SWITCHING TESTS

### Test 1.1: Theme Selection Dropdown
- [ ] Dropdown shows all 4 themes (Default Dark, Light Grey, Corporate Blue, Midnight)
- [ ] Current theme is pre-selected
- [ ] Theme names are readable
- [ ] Dropdown is functional

### Test 1.2: Theme Application
- [ ] Selecting "Default Dark" applies dark theme
- [ ] Selecting "Light Grey" applies light grey theme
- [ ] Selecting "Corporate Blue" applies corporate theme
- [ ] Selecting "Midnight" applies midnight theme

### Test 1.3: Immediate Visual Feedback
- [ ] Sidebar colors change immediately
- [ ] Topbar colors change immediately
- [ ] Content background changes immediately
- [ ] Card backgrounds change immediately
- [ ] Text colors change immediately

### Test 1.4: Theme Preview
- [ ] Preview box shows on theme selection
- [ ] Preview displays theme name
- [ ] Preview displays theme description
- [ ] Preview shows color samples
- [ ] Preview shows icon colors

---

## 2. THEME PERSISTENCE TESTS

### Test 2.1: localStorage Save
- [ ] Theme saved to localStorage on selection
- [ ] Key: 'quarto-studio:appTheme'
- [ ] Value is theme ID (string)
- [ ] No errors in console

### Test 2.2: Page Refresh
- [ ] Select "Light Grey" theme
- [ ] Refresh page (F5)
- [ ] Light Grey theme still active
- [ ] Dropdown shows "Light Grey" selected

### Test 2.3: Browser Restart
- [ ] Select theme
- [ ] Close browser
- [ ] Reopen browser
- [ ] Navigate to dashboard
- [ ] Theme still active

### Test 2.4: Cross-Session Persistence
- [ ] Theme persists between different visits
- [ ] No theme reset on new session
- [ ] Settings module shows correct theme

---

## 3. VISUAL UPDATE TESTS

### Test 3.1: Sidebar Updates
- [ ] Sidebar background color changes
- [ ] Sidebar text color changes
- [ ] Sidebar border color changes
- [ ] Logo background/text color changes
- [ ] Collapse button color changes

### Test 3.2: Navigation Updates
- [ ] Active nav item background changes
- [ ] Active nav item text color changes
- [ ] Active nav item border (Light Grey: 4px left border)
- [ ] Inactive nav items styled correctly
- [ ] Hover states work correctly

### Test 3.3: Topbar Updates
- [ ] Topbar background color changes
- [ ] Topbar text color changes
- [ ] Topbar border color changes
- [ ] Breadcrumb text color changes

### Test 3.4: Content Area Updates
- [ ] Main content background color changes
- [ ] Card backgrounds change
- [ ] Card borders change
- [ ] Heading colors change
- [ ] Body text colors change
- [ ] Muted text colors change

### Test 3.5: Feature Icons (Home Module)
- [ ] Design icon background changes
- [ ] Browse icon background changes
- [ ] Build icon background changes
- [ ] Icons remain white color
- [ ] No hover color transitions (Light Grey)

### Test 3.6: Light Grey Specific Features
- [ ] Flat colors (no gradients)
- [ ] Active item: white background
- [ ] Active item: 4px blue left border
- [ ] Static icon colors
- [ ] Slate grey borders throughout

### Test 3.7: Corporate Blue Specific Features
- [ ] Blue gradient sidebar
- [ ] Blue topbar background
- [ ] Light blue content area
- [ ] White sidebar text
- [ ] Blue accent colors

### Test 3.8: Midnight Specific Features
- [ ] Very dark backgrounds
- [ ] Purple/indigo accents
- [ ] Light text on dark
- [ ] Purple gradient active items
- [ ] Indigo borders

---

## 4. SETTINGS MODULE TESTS

### Test 4.1: Module Loading
- [ ] Settings module loads without errors
- [ ] Navigate to Settings (Ctrl+6)
- [ ] Settings content displays
- [ ] No console errors

### Test 4.2: UI Elements Present
- [ ] "App Theme" section visible
- [ ] Theme dropdown present
- [ ] Theme preview area present
- [ ] "Preferences" section visible
- [ ] "Reset to Defaults" button present
- [ ] Note about presentation themes visible

### Test 4.3: Theme Selector Functionality
- [ ] Dropdown populated with themes
- [ ] Current theme pre-selected
- [ ] Clicking dropdown shows all options
- [ ] Selecting theme triggers change
- [ ] Preview updates on selection

### Test 4.4: Reset to Defaults
- [ ] Select non-default theme (e.g., Light Grey)
- [ ] Click "Reset to Defaults"
- [ ] Confirmation dialog appears
- [ ] Click OK
- [ ] Theme resets to "Default Dark"
- [ ] Dropdown shows "Default Dark"
- [ ] Alert confirms reset

### Test 4.5: Settings Persistence
- [ ] Change theme in Settings
- [ ] Navigate to another module
- [ ] Return to Settings
- [ ] Dropdown still shows selected theme
- [ ] Preview still shows selected theme

---

## 5. INTEGRATION TESTS

### Test 5.1: Module Navigation Integration
- [ ] Change theme in Settings
- [ ] Navigate to Home (Ctrl+1)
- [ ] Theme persists
- [ ] Navigate to Design (Ctrl+2)
- [ ] Theme persists
- [ ] Navigate to Browse (Ctrl+3)
- [ ] Theme persists
- [ ] Navigate to Build (Ctrl+4)
- [ ] Theme persists
- [ ] Navigate to Library (Ctrl+5)
- [ ] Theme persists

### Test 5.2: Active State Updates
- [ ] Change theme
- [ ] Navigate between modules
- [ ] Active nav item styling updates correctly
- [ ] Light Grey shows 4px border on active
- [ ] Other themes show gradient/background on active

### Test 5.3: Sidebar Collapse/Expand
- [ ] Apply Light Grey theme
- [ ] Collapse sidebar (Ctrl+B)
- [ ] Colors remain correct
- [ ] Expand sidebar
- [ ] Colors still correct
- [ ] Icons visible in collapsed state

### Test 5.4: Theme Independence
- [ ] App theme changes do NOT affect presentation themes
- [ ] Design module themes work independently
- [ ] Can have Light Grey app + Business presentation theme
- [ ] Can have Dark app + Academic presentation theme
- [ ] Both theme systems coexist

### Test 5.5: Startup Integration
- [ ] Close browser
- [ ] Reopen and navigate to dashboard
- [ ] Saved theme loads automatically
- [ ] Theme applied before user sees page
- [ ] No flash of wrong theme

---

## 6. EDGE CASE TESTS

### Test 6.1: Invalid Theme ID
- [ ] Manually set invalid theme in localStorage
- [ ] Reload page
- [ ] Defaults to "Default Dark"
- [ ] No JavaScript errors

### Test 6.2: Missing localStorage
- [ ] Disable localStorage in browser
- [ ] Select theme
- [ ] Graceful handling (no errors)
- [ ] Theme still changes (even if not saved)

### Test 6.3: Rapid Theme Switching
- [ ] Quickly switch between all 4 themes
- [ ] No visual glitches
- [ ] All transitions smooth
- [ ] Final theme applies correctly
- [ ] No memory leaks

### Test 6.4: Theme During Module Load
- [ ] Select theme while module is loading
- [ ] Theme applies correctly
- [ ] No conflicts with module init

### Test 6.5: Empty/Null localStorage
- [ ] Clear localStorage completely
- [ ] Reload dashboard
- [ ] Default theme applies
- [ ] No errors

---

## 7. CROSS-BROWSER TESTS

### Test 7.1: Chrome/Edge
- [ ] All themes work
- [ ] Colors accurate
- [ ] Persistence works
- [ ] No console errors

### Test 7.2: Firefox
- [ ] All themes work
- [ ] Colors accurate
- [ ] Persistence works
- [ ] No console errors

### Test 7.3: Safari
- [ ] All themes work
- [ ] Colors accurate
- [ ] Persistence works
- [ ] No console errors

---

## 8. PERFORMANCE TESTS

### Test 8.1: Theme Switch Speed
- [ ] Theme change < 100ms
- [ ] No visible lag
- [ ] Smooth transitions

### Test 8.2: Startup Performance
- [ ] Theme loads quickly on startup
- [ ] No delay in initial render
- [ ] No flash of unstyled content

### Test 8.3: Memory Usage
- [ ] No memory leaks after theme changes
- [ ] Browser memory stable
- [ ] No increasing memory on repeated changes

---

## 9. ACCESSIBILITY TESTS

### Test 9.1: Contrast Ratios
- [ ] Default Dark: 4.5:1 minimum
- [ ] Light Grey: 4.5:1 minimum
- [ ] Corporate Blue: 4.5:1 minimum
- [ ] Midnight: 4.5:1 minimum

### Test 9.2: Keyboard Navigation
- [ ] Can navigate to Settings with Ctrl+6
- [ ] Can tab to theme dropdown
- [ ] Can select theme with keyboard
- [ ] Can activate reset button with Enter

### Test 9.3: Screen Reader
- [ ] Theme selector has label
- [ ] Options are readable
- [ ] Preview has description
- [ ] Buttons have aria-labels (if needed)

---

## 10. DOCUMENTATION TESTS

### Test 10.1: Code Documentation
- [ ] app-themes.js has JSDoc comments
- [ ] settings.js has JSDoc comments
- [ ] Functions documented
- [ ] Parameters documented

### Test 10.2: User Documentation
- [ ] APP_THEMES_GUIDE.md exists
- [ ] Guide explains all themes
- [ ] Usage instructions clear
- [ ] Screenshots/examples present (if applicable)

---

## AUTOMATED VERIFICATION

Run these code checks:

```bash
# Check for errors
grep -r "console.error" public/js/utils/app-themes.js
grep -r "console.error" public/js/modules/settings.js

# Check theme definitions
grep -r "APP_THEMES" public/js/utils/app-themes.js

# Check localStorage usage
grep -r "localStorage" public/js/utils/app-themes.js
grep -r "localStorage" public/js/modules/settings.js
```

---

## MANUAL TEST SCRIPT

### Quick Test Sequence (5 minutes)

1. **Start Server**
   ```bash
   npm start
   ```

2. **Open Dashboard**
   - Navigate to http://localhost:3000/dashboard
   - Check default theme applied

3. **Test Theme Switching**
   - Press Ctrl+6 (Settings)
   - Select "Light Grey"
   - Verify sidebar is now light grey
   - Verify active item has blue left border

4. **Test Persistence**
   - Refresh page (F5)
   - Verify Light Grey still active

5. **Test All Themes**
   - Select "Corporate Blue"
   - Verify blue sidebar and topbar
   - Select "Midnight"
   - Verify dark purple theme
   - Select "Default Dark"
   - Verify original dark theme

6. **Test Navigation**
   - While on Light Grey theme:
   - Navigate through all modules (Ctrl+1-6)
   - Verify theme persists
   - Verify active states update correctly

7. **Test Reset**
   - Select "Midnight"
   - Click "Reset to Defaults"
   - Confirm
   - Verify returns to "Default Dark"

---

## KNOWN ISSUES TO CHECK

- [ ] Theme flash on initial load
- [ ] Active state border on Light Grey
- [ ] Icon colors on theme switch
- [ ] Sidebar collapsed state colors
- [ ] Module card backgrounds in all themes

---

## SUCCESS CRITERIA

✅ **All 4 themes work correctly**  
✅ **Theme persists across sessions**  
✅ **No console errors**  
✅ **Visual updates immediate**  
✅ **Settings module functional**  
✅ **No conflicts with presentation themes**  
✅ **Keyboard shortcuts work**  
✅ **Reset to defaults works**  
✅ **Cross-module persistence**  
✅ **Documentation complete**

---

## TEST RESULTS

**Status:** [ ] PASS | [ ] FAIL | [ ] IN PROGRESS

**Tested By:**  
**Date:**  
**Browser:**  
**Issues Found:**

---

**Test Plan Version:** 1.0  
**Last Updated:** February 5, 2026
