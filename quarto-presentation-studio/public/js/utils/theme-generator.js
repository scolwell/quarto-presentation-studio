/**
 * Theme Generator Utility
 * Generates SCSS and YAML code from theme objects
 */

/**
 * Generate Quarto YAML configuration
 */
export function generateYAML(theme) {
    const yaml = `---
title: "Your Presentation Title"
subtitle: "Subtitle Here"
author: "Your Name"
date: "2025-02-04"
format:
  revealjs:
    theme: custom.scss
    slide-number: ${theme.options.slideNumber}
    progress: ${theme.options.progress}
    controls: ${theme.options.controls}
    width: 1280
    height: 720
    margin: 0.1
    min-scale: 0.2
    max-scale: 2.0
---`;
    
    return yaml;
}

/**
 * Generate custom SCSS theme file
 */
export function generateSCSS(theme) {
    const scss = `/*-- scss:defaults --*/

// Color Variables
$backgroundColor: ${theme.colors.bg};
$body-color: ${theme.colors.text};
$heading-color: ${theme.colors.heading};
$link-color: ${theme.colors.accent};

// Typography
$presentation-heading-font: ${theme.fonts.heading}, serif;
$presentation-font-size-root: ${theme.sizes.body}px;

// Heading Sizes
$presentation-h1-font-size: ${theme.sizes.title}px;
$presentation-h2-font-size: ${Math.round(theme.sizes.title * 0.8)}px;
$presentation-h3-font-size: ${Math.round(theme.sizes.title * 0.65)}px;

// Body Font
$mainFont: ${theme.fonts.body}, sans-serif;

/*-- scss:rules --*/

.reveal {
  font-family: $mainFont;
  background-color: $backgroundColor;
  color: $body-color;
}

.reveal h1,
.reveal h2,
.reveal h3,
.reveal h4,
.reveal h5,
.reveal h6 {
  font-family: $presentation-heading-font;
  color: $heading-color;
  font-weight: 700;
}

.reveal a {
  color: $link-color;
  text-decoration: none;
  
  &:hover {
    color: darken($link-color, 15%);
    text-decoration: underline;
  }
}

.reveal strong {
  color: $heading-color;
  font-weight: 700;
}

.reveal em {
  font-style: italic;
}

.reveal code {
  font-family: 'Monaco', 'Courier New', monospace;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 3px;
}

.reveal pre {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
}

.reveal ul,
.reveal ol {
  margin-left: 1.5em;
}

.reveal li {
  margin-bottom: 0.5em;
}

.reveal blockquote {
  border-left: 4px solid $link-color;
  padding-left: 20px;
  font-style: italic;
  margin: 1em 0;
}

// Slide-specific styles
.reveal .slide-background {
  background-color: $backgroundColor;
}

.reveal .title-slide h1 {
  color: $heading-color;
  font-size: $presentation-h1-font-size;
}

.reveal .accent {
  color: $link-color;
}
`;
    
    return scss;
}

/**
 * Download theme as files
 */
export function downloadTheme(theme) {
    const yamlContent = generateYAML(theme);
    const scssContent = generateSCSS(theme);
    
    // Download SCSS file
    downloadFile(`${theme.name}.scss`, scssContent);
    
    // Download YAML frontmatter
    downloadFile(`${theme.name}-config.yaml`, yamlContent);
}

/**
 * Helper to download a file
 */
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
