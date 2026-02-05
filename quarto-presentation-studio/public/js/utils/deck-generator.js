/**
 * Deck Generator Utility
 * Generate QMD, SCSS, and README files for deck export
 */

import { generateSCSS as generateThemeSCSS, generateYAML } from './theme-generator.js';

/**
 * Build complete QMD file with all selected templates
 */
export async function buildQMD(selectedSlides, theme, metadata) {
    const title = metadata.title || 'My Presentation';
    const subtitle = metadata.subtitle || '';
    const author = metadata.author || 'Author Name';
    const date = metadata.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Build YAML frontmatter
    let qmd = `---
title: "${title}"`;
    
    if (subtitle) {
        qmd += `\nsubtitle: "${subtitle}"`;
    }
    
    qmd += `\nauthor: "${author}"
date: "${date}"
format:
  revealjs:
    theme: custom.scss
    slide-number: ${theme.options?.slideNumber || false}
    progress: ${theme.options?.progress || false}
    controls: ${theme.options?.controls || true}
    width: 1280
    height: 720
    margin: 0.1
    min-scale: 0.2
    max-scale: 2.0
---

`;
    
    // Fetch and append each template fragment
    for (let i = 0; i < selectedSlides.length; i++) {
        const slide = selectedSlides[i];
        
        try {
            const response = await fetch(`/${slide.fragment}`);
            const fragmentContent = await response.text();
            
            // Remove YAML frontmatter from fragments if present
            let cleanContent = fragmentContent.replace(/^---[\s\S]*?---\n/, '');
            
            // Add slide separator between slides
            if (i > 0) {
                qmd += '\n\n';
            }
            
            qmd += cleanContent.trim() + '\n';
        } catch (error) {
            console.error(`Error loading fragment ${slide.fragment}:`, error);
            qmd += `\n## Error Loading Slide\n\nCould not load: ${slide.name}\n`;
        }
    }
    
    return qmd;
}

/**
 * Build SCSS theme file
 */
export function buildSCSS(theme) {
    return generateThemeSCSS(theme);
}

/**
 * Build README.md with instructions
 */
export function buildREADME(metadata, theme, slideCount) {
    const filename = metadata.filename || 'my-deck';
    const themeName = theme.name || 'Custom Theme';
    
    return `# ${metadata.title || 'Presentation'}

Generated with Quarto Presentation Studio

## Overview

- **Author:** ${metadata.author || 'Author Name'}
- **Date:** ${metadata.date || 'Date'}
- **Slides:** ${slideCount}
- **Theme:** ${themeName}

## Files Included

- \`${filename}.qmd\` - Main presentation file (Quarto Markdown)
- \`custom.scss\` - Custom theme stylesheet
- \`README.md\` - This file

## How to Use

### Prerequisites

Make sure you have Quarto installed:

\`\`\`bash
# Check if Quarto is installed
quarto --version

# If not installed, visit: https://quarto.org/docs/get-started/
\`\`\`

### Render the Presentation

\`\`\`bash
# Render to RevealJS HTML
quarto render ${filename}.qmd

# Preview with automatic reload
quarto preview ${filename}.qmd
\`\`\`

### Output

The rendered presentation will be saved as \`${filename}.html\`.

Open it in your browser to view your presentation!

## Customization

### Modify Theme

Edit \`custom.scss\` to customize:
- Colors
- Fonts
- Slide layouts
- Spacing and sizing

### Edit Content

Edit \`${filename}.qmd\` to:
- Update slide content
- Add new slides
- Reorder slides
- Modify metadata

### Quarto Options

In the YAML frontmatter of \`${filename}.qmd\`, you can adjust:
- \`slide-number\`: Show/hide slide numbers
- \`progress\`: Show/hide progress bar
- \`controls\`: Show/hide navigation controls
- \`width\` / \`height\`: Presentation dimensions
- And many more RevealJS options

## Resources

- [Quarto Documentation](https://quarto.org/docs/presentations/revealjs/)
- [RevealJS Documentation](https://revealjs.com/)
- [Quarto Presentation Studio](https://github.com/yourusername/quarto-presentation-studio)

## License

Your presentation content is yours. The generated structure follows standard Quarto practices.

---

*Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}*
`;
}

/**
 * Create downloadable ZIP file with all deck files
 */
export async function createZipFile(qmd, scss, readme, filename) {
    // For browser-based ZIP creation, we'll use JSZip if available
    // For now, we'll create individual file downloads
    
    const files = [
        { name: `${filename}.qmd`, content: qmd, type: 'text/plain' },
        { name: 'custom.scss', content: scss, type: 'text/plain' },
        { name: 'README.md', content: readme, type: 'text/plain' }
    ];
    
    return files;
}

/**
 * Download a single file
 */
export function downloadFile(filename, content, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Download all deck files
 */
export async function downloadDeckFiles(qmd, scss, readme, filename, options = {}) {
    const includeReadme = options.includeReadme !== false;
    const includeTheme = options.includeTheme !== false;
    
    // Download QMD file (always)
    downloadFile(`${filename}.qmd`, qmd);
    
    // Wait a bit between downloads to avoid browser blocking
    await delay(300);
    
    // Download SCSS if requested
    if (includeTheme) {
        downloadFile('custom.scss', scss);
        await delay(300);
    }
    
    // Download README if requested
    if (includeReadme) {
        downloadFile('README.md', readme);
    }
}

/**
 * Helper delay function
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
