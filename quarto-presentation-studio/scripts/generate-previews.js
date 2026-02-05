#!/usr/bin/env node
/**
 * generate-previews.js
 * Pre-renders template preview images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.dirname(__dirname);

// Load registry
function loadRegistry() {
  const registryPath = path.join(ROOT, 'templates', 'registry.json');
  const data = fs.readFileSync(registryPath, 'utf8');
  return JSON.parse(data);
}

// Template definitions with example content
const PREVIEW_TEMPLATES = {
  'title': {
    html: `
      <div style="text-align: center; padding-top: 120px;">
        <h1 style="font-size: 48px; color: #1a1a1a; margin-bottom: 20px; font-weight: 700;">Your Presentation Title</h1>
        <p style="font-size: 24px; color: #666; margin-bottom: 80px;">A compelling subtitle</p>
        <p style="font-size: 18px; color: #999;">Jane Smith</p>
        <p style="font-size: 16px; color: #999; margin-top: 10px;">February 2026</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-bg': {
    html: `
      <div style="text-align: center; padding-top: 140px;">
        <h1 style="font-size: 56px; color: #ffffff; margin-bottom: 20px; font-weight: 700;">Your Presentation Title</h1>
        <p style="font-size: 28px; color: rgba(255,255,255,0.9); margin-bottom: 60px;">A compelling subtitle</p>
        <p style="font-size: 20px; color: rgba(255,255,255,0.8);">Jane Smith</p>
        <p style="font-size: 18px; color: rgba(255,255,255,0.7); margin-top: 10px;">February 2026</p>
      </div>
    `,
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  'section': {
    html: `
      <div style="padding-top: 180px;">
        <h2 style="font-size: 52px; color: #ffffff; margin-bottom: 30px; font-weight: 700;">Section Title</h2>
        <p style="font-size: 22px; color: rgba(255,255,255,0.8);">Introduction to the next topic</p>
      </div>
    `,
    bg: '#1a1a1a'
  },
  'content-1col': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Key Points</h2>
        <ul style="font-size: 20px; line-height: 2; color: #333; list-style-position: outside; padding-left: 30px;">
          <li style="margin-bottom: 20px;">First important concept to understand</li>
          <li style="margin-bottom: 20px;">Second critical takeaway for your audience</li>
          <li style="margin-bottom: 20px;">Third key message that drives the point home</li>
          <li style="margin-bottom: 20px;">Final thought to remember</li>
        </ul>
      </div>
    `,
    bg: '#ffffff'
  },
  'content-2col': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Comparison</h2>
        <div style="display: flex; gap: 60px;">
          <div style="flex: 1;">
            <h3 style="font-size: 32px; margin-bottom: 25px; color: #1a1a1a;">Option A</h3>
            <ul style="font-size: 18px; line-height: 1.8; color: #333;">
              <li style="margin-bottom: 15px;">Advantage one</li>
              <li style="margin-bottom: 15px;">Advantage two</li>
              <li style="margin-bottom: 15px;">Advantage three</li>
            </ul>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 32px; margin-bottom: 25px; color: #1a1a1a;">Option B</h3>
            <ul style="font-size: 18px; line-height: 1.8; color: #333;">
              <li style="margin-bottom: 15px;">Different approach</li>
              <li style="margin-bottom: 15px;">Alternative benefit</li>
              <li style="margin-bottom: 15px;">Unique feature</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'code': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Code Example</h2>
        <pre style="background: #1e1e1e; color: #d4d4d4; padding: 25px; border-radius: 8px; font-family: monospace; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">function processData(input) {
  const result = input
    .filter(x => x > 0)
    .map(x => x * 2);
  return result;
}</pre>
        <p style="font-size: 18px; color: #333;">This function demonstrates data transformation using modern JavaScript.</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'data': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Data Overview</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 18px;">
          <thead>
            <tr style="background: #f3f4f6;">
              <th style="border: 1px solid #ddd; padding: 15px; text-align: left;">Metric</th>
              <th style="border: 1px solid #ddd; padding: 15px; text-align: left;">Q1</th>
              <th style="border: 1px solid #ddd; padding: 15px; text-align: left;">Q2</th>
              <th style="border: 1px solid #ddd; padding: 15px; text-align: left;">Q3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 15px;">Revenue</td>
              <td style="border: 1px solid #ddd; padding: 15px;">$2.5M</td>
              <td style="border: 1px solid #ddd; padding: 15px;">$3.2M</td>
              <td style="border: 1px solid #ddd; padding: 15px;">$4.1M</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 15px;">Growth</td>
              <td style="border: 1px solid #ddd; padding: 15px;">15%</td>
              <td style="border: 1px solid #ddd; padding: 15px;">28%</td>
              <td style="border: 1px solid #ddd; padding: 15px;">34%</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    bg: '#ffffff'
  },
  'figure': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Visual Example</h2>
        <div style="background: #f0f0f0; height: 280px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #999; font-size: 20px;">[Image Placeholder]</p>
        </div>
        <p style="text-align: center; font-size: 16px; color: #666;">Figure 1: Description of the image content</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'equation': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 50px; font-weight: 700;">Mathematical Formula</h2>
        <div style="font-size: 48px; text-align: center; margin: 60px 0; font-family: 'Times New Roman', serif;">
          E = mc²
        </div>
        <p style="font-size: 18px; color: #333; text-align: center;">Einstein's mass-energy equivalence demonstrates the relationship between mass and energy.</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'comparison': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 50px; font-weight: 700;">Before vs After</h2>
        <div style="display: flex; gap: 60px; margin-top: 40px;">
          <div style="flex: 1;">
            <h3 style="font-size: 32px; margin-bottom: 20px; color: #1a1a1a;">Before</h3>
            <p style="font-size: 18px; color: #333; line-height: 1.8;">Traditional approach with limitations and constraints</p>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 32px; margin-bottom: 20px; color: #1a1a1a;">After</h3>
            <p style="font-size: 18px; color: #333; line-height: 1.8;">Improved solution with enhanced benefits and features</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'default': {
    html: `
      <div>
        <h2 style="font-size: 44px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Slide Title</h2>
        <p style="font-size: 20px; color: #333; line-height: 1.8;">This is where your content will appear. You can customize this template with your own text, images, and formatting.</p>
      </div>
    `,
    bg: '#ffffff'
  }
};

// Determine template type
function getTemplateType(template) {
  const id = template.id.toLowerCase();
  
  if (id.includes('bg')) return 'title-bg';
  if (id.startsWith('title-')) return 'title';
  if (id.startsWith('section-')) return 'section';
  if (id.includes('content-1col')) return 'content-1col';
  if (id.includes('content-2col')) return 'content-2col';
  if (id.includes('code-')) return 'code';
  if (id.includes('chart') || id.includes('data-') || id.includes('table')) return 'data';
  if (id.includes('figure-')) return 'figure';
  if (id.includes('equation-')) return 'equation';
  if (id.includes('comparison-')) return 'comparison';
  
  return 'default';
}

// Generate SVG previews
function generatePreviews() {
  const templates = loadRegistry();
  const previewsDir = path.join(ROOT, 'public', 'previews');
  
  // Create previews directory
  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir, { recursive: true });
  }
  
  console.log(`Generating ${templates.length} preview images...`);
  
  templates.forEach((template, index) => {
    const type = getTemplateType(template);
    const previewTemplate = PREVIEW_TEMPLATES[type] || PREVIEW_TEMPLATES['default'];
    
    const svg = `
<svg width="960" height="540" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="960" height="540" fill="${previewTemplate.bg === 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' ? 'url(#grad1)' : previewTemplate.bg}"/>
  <foreignObject x="0" y="0" width="960" height="540">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 960px; height: 540px; padding: 60px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
      ${previewTemplate.html}
    </div>
  </foreignObject>
</svg>
    `.trim();
    
    const outputPath = path.join(previewsDir, `${template.id}.svg`);
    fs.writeFileSync(outputPath, svg, 'utf8');
    
    if ((index + 1) % 10 === 0) {
      console.log(`  Generated ${index + 1}/${templates.length}...`);
    }
  });
  
  console.log(`✓ Generated ${templates.length} preview images in public/previews/`);
}

// Run
generatePreviews();
