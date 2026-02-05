#!/usr/bin/env node
/**
 * generate-templates.js
 * Generates 75 template fragments + registry.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const FRAGMENTS_DIR = path.join(ROOT, 'templates', 'fragments');

if (!fs.existsSync(FRAGMENTS_DIR)) {
  fs.mkdirSync(FRAGMENTS_DIR, { recursive: true });
}

const templates = [
  // Title (8)
  { id: 'title-1', name: 'Title Slide', layout: 'title', pptEquiv: 'Title Slide', class: 'title-slide', content: 'Title and subtitle placeholder' },
  { id: 'title-2', name: 'Title with Background', layout: 'title', pptEquiv: 'Title Slide', class: 'title-bg', content: 'Title with background image' },
  { id: 'title-3', name: 'Title Left Aligned', layout: 'title', pptEquiv: 'Title Slide', class: 'title-left', content: 'Title aligned left' },
  { id: 'title-4', name: 'Title with Date', layout: 'title', pptEquiv: 'Title Slide', class: 'title-date', content: 'Title, subtitle, date' },
  { id: 'title-5', name: 'Title with Author', layout: 'title', pptEquiv: 'Title Slide', class: 'title-author', content: 'Title, author, org' },
  { id: 'title-6', name: 'Title with Logo', layout: 'title', pptEquiv: 'Title Slide', class: 'title-logo', content: 'Title with logo' },
  { id: 'title-7', name: 'Title Centered Large', layout: 'title', pptEquiv: 'Title Slide', class: 'title-large', content: 'Large centered title' },
  { id: 'title-8', name: 'Title with Accent', layout: 'title', pptEquiv: 'Title Slide', class: 'title-accent', content: 'Title with accent bar' },
  // Section (8)
  { id: 'section-1', name: 'Section Header', layout: 'section', pptEquiv: 'Section Header', class: 'section-header', content: 'Section title' },
  { id: 'section-2', name: 'Section with Icon', layout: 'section', pptEquiv: 'Section Header', class: 'section-icon', content: 'Section with icon' },
  { id: 'section-3', name: 'Divider Slide', layout: 'section', pptEquiv: 'Section Header', class: 'divider', content: 'Divider element' },
  { id: 'section-4', name: 'Section Colored', layout: 'section', pptEquiv: 'Section Header', class: 'section-color', content: 'Colored header' },
  { id: 'section-5', name: 'Chapter Slide', layout: 'section', pptEquiv: 'Section Header', class: 'chapter', content: 'Chapter title' },
  { id: 'section-6', name: 'Part Slide', layout: 'section', pptEquiv: 'Section Header', class: 'part', content: 'Part heading' },
  { id: 'section-7', name: 'Intermission', layout: 'section', pptEquiv: 'Section Header', class: 'intermission', content: 'Break slide' },
  { id: 'section-8', name: 'Coming Next', layout: 'section', pptEquiv: 'Section Header', class: 'next', content: 'Next preview' },
  // Content 1Col (12)
  { id: 'content-1col-1', name: 'Title + Text', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'title-text', content: 'Title and text' },
  { id: 'content-1col-2', name: 'Title + Bullets', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'title-bullets', content: 'Title with bullets' },
  { id: 'content-1col-3', name: 'Title + Numbered', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'title-numbered', content: 'Title with numbers' },
  { id: 'content-1col-4', name: 'Title + Quote', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'title-quote', content: 'Title with quote' },
  { id: 'content-1col-5', name: 'Content Only', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'content-only', content: 'Content without title' },
  { id: 'content-1col-6', name: 'Title + Definition', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'title-definition', content: 'Title with definition' },
  { id: 'content-1col-7', name: 'Title + Code', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'title-code', content: 'Title with code' },
  { id: 'content-1col-8', name: 'Timeline', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'timeline', content: 'Timeline layout' },
  { id: 'content-1col-9', name: 'Steps', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'steps', content: 'Numbered steps' },
  { id: 'content-1col-10', name: 'Callout', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'callout', content: 'Callout box' },
  { id: 'content-1col-11', name: 'Title + Image', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'title-image', content: 'Title with image' },
  { id: 'content-1col-12', name: 'Full Width Image', layout: 'content-1col', pptEquiv: 'Title and Content', class: 'full-image', content: 'Full image area' },
  // Content 2Col (12)
  { id: 'content-2col-1', name: 'Two Columns Text', layout: 'content-2col', pptEquiv: 'Two Content', class: 'two-text', content: 'Two text columns' },
  { id: 'content-2col-2', name: 'Title + Two Columns', layout: 'content-2col', pptEquiv: 'Two Content', class: 'title-two-col', content: 'Title above columns' },
  { id: 'content-2col-3', name: 'Left Image Right Text', layout: 'content-2col', pptEquiv: 'Two Content', class: 'img-left-text-right', content: 'Image left, text right' },
  { id: 'content-2col-4', name: 'Left Text Right Image', layout: 'content-2col', pptEquiv: 'Two Content', class: 'text-left-img-right', content: 'Text left, image right' },
  { id: 'content-2col-5', name: 'Two Images', layout: 'content-2col', pptEquiv: 'Two Content', class: 'two-images', content: 'Two images' },
  { id: 'content-2col-6', name: 'Pro and Con', layout: 'content-2col', pptEquiv: 'Two Content', class: 'pro-con', content: 'Pro and con' },
  { id: 'content-2col-7', name: 'Before After', layout: 'content-2col', pptEquiv: 'Two Content', class: 'before-after', content: 'Before and after' },
  { id: 'content-2col-8', name: 'Left Right Lists', layout: 'content-2col', pptEquiv: 'Two Content', class: 'two-lists', content: 'Two bullet lists' },
  { id: 'content-2col-9', name: 'Feature Comparison', layout: 'content-2col', pptEquiv: 'Two Content', class: 'features', content: 'Feature comparison' },
  { id: 'content-2col-10', name: 'Quote Left Right', layout: 'content-2col', pptEquiv: 'Two Content', class: 'quotes', content: 'Two quotes' },
  { id: 'content-2col-11', name: 'Split Screen', layout: 'content-2col', pptEquiv: 'Two Content', class: 'split', content: 'Split screen' },
  { id: 'content-2col-12', name: 'Label Left Content Right', layout: 'content-2col', pptEquiv: 'Two Content', class: 'label-content', content: 'Label and content' },
  // Comparison (6)
  { id: 'comparison-1', name: 'Three Column', layout: 'comparison', pptEquiv: 'Comparison', class: 'three-col', content: 'Three columns' },
  { id: 'comparison-2', name: 'Matrix Table', layout: 'comparison', pptEquiv: 'Comparison', class: 'matrix', content: 'Matrix table' },
  { id: 'comparison-3', name: 'Venn Diagram', layout: 'comparison', pptEquiv: 'Comparison', class: 'venn', content: 'Venn diagram' },
  { id: 'comparison-4', name: 'Spectrum', layout: 'comparison', pptEquiv: 'Comparison', class: 'spectrum', content: 'Spectrum scale' },
  { id: 'comparison-5', name: 'Four Quadrant', layout: 'comparison', pptEquiv: 'Comparison', class: 'four-quad', content: 'Four quadrants' },
  { id: 'comparison-6', name: 'Option Chooser', layout: 'comparison', pptEquiv: 'Comparison', class: 'options', content: 'Option chooser' },
  // Figure (9)
  { id: 'figure-1', name: 'Full Figure', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'full-figure', content: 'Full slide figure' },
  { id: 'figure-2', name: 'Figure with Title', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'fig-title', content: 'Figure with title' },
  { id: 'figure-3', name: 'Gallery Grid', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'gallery', content: 'Gallery grid' },
  { id: 'figure-4', name: 'Large Image Focus', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'hero-image', content: 'Hero image' },
  { id: 'figure-5', name: 'Video Embed', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'video', content: 'Video embed' },
  { id: 'figure-6', name: 'Icon Grid', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'icon-grid', content: 'Icon grid' },
  { id: 'figure-7', name: 'Diagram', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'diagram', content: 'Diagram' },
  { id: 'figure-8', name: 'Screenshot', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'screenshot', content: 'Screenshot' },
  { id: 'figure-9', name: 'Carousel', layout: 'figure', pptEquiv: 'Picture with Caption', class: 'carousel', content: 'Carousel' },
  // Data (8)
  { id: 'data-table-1', name: 'Simple Table', layout: 'data', pptEquiv: 'Table Slide', class: 'simple-table', content: 'Simple table' },
  { id: 'data-table-2', name: 'Title + Table', layout: 'data', pptEquiv: 'Table Slide', class: 'title-table', content: 'Title with table' },
  { id: 'data-table-3', name: 'Striped Table', layout: 'data', pptEquiv: 'Table Slide', class: 'striped-table', content: 'Striped table' },
  { id: 'data-table-4', name: 'Large Table', layout: 'data', pptEquiv: 'Table Slide', class: 'large-table', content: 'Large table' },
  { id: 'data-chart-1', name: 'Bar Chart', layout: 'data', pptEquiv: 'Chart Slide', class: 'bar-chart', content: 'Bar chart' },
  { id: 'data-chart-2', name: 'Line Chart', layout: 'data', pptEquiv: 'Chart Slide', class: 'line-chart', content: 'Line chart' },
  { id: 'data-chart-3', name: 'Pie Chart', layout: 'data', pptEquiv: 'Chart Slide', class: 'pie-chart', content: 'Pie chart' },
  { id: 'data-chart-4', name: 'Multi Chart', layout: 'data', pptEquiv: 'Chart Slide', class: 'multi-chart', content: 'Multi chart' },
  // Code (3)
  { id: 'code-1', name: 'Code Block', layout: 'code', pptEquiv: 'Code Slide', class: 'code-block', content: 'Code block' },
  { id: 'code-2', name: 'Title + Code', layout: 'code', pptEquiv: 'Code Slide', class: 'title-code-block', content: 'Title with code' },
  { id: 'code-3', name: 'Two Code Blocks', layout: 'code', pptEquiv: 'Code Slide', class: 'two-code', content: 'Two code blocks' },
  // Equation (3)
  { id: 'equation-1', name: 'Single Equation', layout: 'equation', pptEquiv: 'Equation Slide', class: 'single-eq', content: 'Single equation' },
  { id: 'equation-2', name: 'Title + Equation', layout: 'equation', pptEquiv: 'Equation Slide', class: 'title-eq', content: 'Title with equation' },
  { id: 'equation-3', name: 'Multi Equations', layout: 'equation', pptEquiv: 'Equation Slide', class: 'multi-eq', content: 'Multiple equations' },
  // Utility (6)
  { id: 'utility-1', name: 'Thank You', layout: 'utility', pptEquiv: 'Thank You Slide', class: 'thank-you', content: 'Thank you slide' },
  { id: 'utility-2', name: 'Questions', layout: 'utility', pptEquiv: 'Questions Slide', class: 'questions', content: 'Questions slide' },
  { id: 'utility-3', name: 'Backup Slide', layout: 'utility', pptEquiv: 'Backup Slide', class: 'backup', content: 'Backup slide' },
  { id: 'utility-4', name: 'Blank', layout: 'utility', pptEquiv: 'Blank Slide', class: 'blank', content: 'Blank slide' },
  { id: 'utility-5', name: 'Resources', layout: 'utility', pptEquiv: 'Content Slide', class: 'resources', content: 'Resources' },
  { id: 'utility-6', name: 'Appendix', layout: 'utility', pptEquiv: 'Content Slide', class: 'appendix', content: 'Appendix' },
];

if (templates.length !== 75) {
  console.error(`ERROR: Expected 75 templates, got ${templates.length}`);
  process.exit(1);
}

console.log('Generating template fragments...');
templates.forEach((t) => {
  const filePath = path.join(FRAGMENTS_DIR, `${t.id}.qmd`);
  const content = `## {.${t.class}}\n\n${t.content}`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ ${t.id}.qmd`);
});

const registry = templates.map((t) => ({
  id: t.id,
  name: t.name,
  layout: t.layout,
  powerpointEquivalent: t.pptEquiv,
  slideClass: t.class,
  fragment: `templates/fragments/${t.id}.qmd`,
  tags: [t.layout, t.class],
}));

const registryPath = path.join(ROOT, 'templates', 'registry.json');
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), 'utf8');
console.log(`\n✓ registry.json created with ${registry.length} templates`);
console.log('\n✓ Generation complete!');
