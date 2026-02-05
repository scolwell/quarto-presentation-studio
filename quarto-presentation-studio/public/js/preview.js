/**
 * preview.js
 * Renders template previews directly as HTML
 */

// Template preview definitions
const PREVIEW_TEMPLATES = {
  'title': {
    html: `
      <div style="text-align: center; padding-top: 140px;">
        <h1 style="font-size: 52px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Your Presentation Title</h1>
        <p style="font-size: 28px; color: #666;">A compelling subtitle</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-bg': {
    html: `
      <div style="text-align: center; padding-top: 140px;">
        <h1 style="font-size: 56px; color: #ffffff; margin-bottom: 20px; font-weight: 700;">Your Presentation Title</h1>
        <p style="font-size: 28px; color: rgba(255,255,255,0.9);">A compelling subtitle</p>
      </div>
    `,
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  'title-left': {
    html: `
      <div style="padding-top: 120px; padding-left: 80px;">
        <h1 style="font-size: 52px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Project Overview</h1>
        <p style="font-size: 24px; color: #666;">Team Collaboration</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-date': {
    html: `
      <div style="text-align: center; padding-top: 120px;">
        <h1 style="font-size: 52px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Annual Report 2026</h1>
        <p style="font-size: 24px; color: #666; margin-bottom: 50px;">Company Overview</p>
        <p style="font-size: 18px; color: #999;">February 4, 2026</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-author': {
    html: `
      <div style="text-align: center; padding-top: 120px;">
        <h1 style="font-size: 52px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Research Findings</h1>
        <p style="font-size: 24px; color: #666; margin-bottom: 60px;">A comprehensive study</p>
        <p style="font-size: 20px; color: #999;">Dr. Jane Smith</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-logo': {
    html: `
      <div style="text-align: center; padding-top: 100px;">
        <div style="margin-bottom: 60px; font-size: 48px;">📊</div>
        <h1 style="font-size: 48px; color: #1a1a1a; margin-bottom: 20px; font-weight: 700;">Company Presentation</h1>
        <p style="font-size: 22px; color: #666;">Q4 2026 Results</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-large': {
    html: `
      <div style="text-align: center; padding-top: 160px;">
        <h1 style="font-size: 68px; color: #1a1a1a; font-weight: 700;">BIG ANNOUNCEMENT</h1>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-accent': {
    html: `
      <div style="text-align: center; padding-top: 120px;">
        <div style="width: 120px; height: 6px; background: #667eea; margin: 0 auto 40px;"></div>
        <h1 style="font-size: 52px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Strategy Review</h1>
        <p style="font-size: 24px; color: #666;">2026 Planning</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-full': {
    html: `
      <div style="padding-top: 100px; text-align: center;">
        <h1 style="font-size: 52px; color: #1a1a1a; font-weight: 700; margin-bottom: 15px;">Presentation Title</h1>
        <p style="font-size: 28px; color: #667eea; margin-bottom: 40px; font-weight: 500;">Subtitle goes here</p>
        <div style="font-size: 20px; color: #666; line-height: 1.9;">
          <p style="margin-bottom: 8px;">Dr. Jane Smith</p>
          <p style="margin-bottom: 8px;">February 4, 2026</p>
          <p>Conference Center, San Francisco</p>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'section': {
    html: `
      <div style="padding-top: 180px; text-align: center;">
        <h2 style="font-size: 52px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Section Title</h2>
        <p style="font-size: 22px; color: #666;">Introduction to the next topic</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'section-alt1': {
    html: `
      <div style="padding-top: 100px; padding-left: 80px;">
        <h2 style="font-size: 56px; color: #1a1a1a; margin-bottom: 20px; font-weight: 700;">Section</h2>
        <div style="width: 100px; height: 6px; background: #667eea; margin-bottom: 30px;"></div>
        <p style="font-size: 24px; color: #666;">New Topic Overview</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'section-alt2': {
    html: `
      <div style="padding-top: 120px; text-align: left; padding-left: 80px;">
        <p style="font-size: 18px; color: #999; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">Chapter Three</p>
        <h2 style="font-size: 52px; color: #1a1a1a; font-weight: 700; margin-bottom: 25px;">Key Concepts</h2>
        <p style="font-size: 22px; color: #666;">Exploring the fundamentals</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'section-alt3': {
    html: `
      <div style="padding-top: 180px; text-align: center;">
        <p style="font-size: 16px; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Part Four</p>
        <h2 style="font-size: 52px; color: #1a1a1a; font-weight: 700;">Discussion</h2>
      </div>
    `,
    bg: '#ffffff'
  },
  'section-alt4': {
    html: `
      <div style="padding-top: 180px; text-align: center;">
        <p style="font-size: 16px; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Part One</p>
        <h2 style="font-size: 52px; color: #1a1a1a; font-weight: 700;">Section Title</h2>
      </div>
    `,
    bg: '#ffffff'
  },
  'chapter': {
    html: `
      <div style="padding-top: 150px; text-align: center;">
        <p style="font-size: 20px; color: #667eea; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 25px; font-weight: 600;">Chapter 01</p>
        <h2 style="font-size: 56px; color: #1a1a1a; font-weight: 700; margin-bottom: 30px;">Chapter Title</h2>
        <p style="font-size: 24px; color: #666;">Introduction and overview</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'intermission': {
    html: `
      <div style="padding-top: 200px; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 30px;">⏸️</div>
        <h2 style="font-size: 48px; color: #1a1a1a; font-weight: 700;">Intermission</h2>
        <p style="font-size: 20px; color: #999; margin-top: 20px;">Please take a short break</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'coming-next': {
    html: `
      <div style="padding-top: 160px; text-align: center;">
        <p style="font-size: 18px; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;">Up Next</p>
        <h2 style="font-size: 52px; color: #1a1a1a; font-weight: 700; margin-bottom: 30px;">Coming Next</h2>
        <div style="font-size: 24px; color: #667eea; margin-top: 40px;">→</div>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-text': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 36px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Slide Title</h2>
        <p style="font-size: 20px; line-height: 1.8; color: #333;">This is the main content area with text that flows naturally. It can contain multiple paragraphs and detailed explanations to support your presentation points.</p>
        <p style="font-size: 20px; line-height: 1.8; color: #333; margin-top: 20px;">Additional paragraphs provide more context and depth to the discussion.</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-bullets': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 36px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Key Points</h2>
        <ul style="font-size: 20px; line-height: 1.8; color: #333; list-style-position: outside; padding-left: 30px;">
          <li style="margin-bottom: 15px;">First important point with details</li>
          <li style="margin-bottom: 15px;">Second key consideration to discuss</li>
          <li style="margin-bottom: 15px;">Third critical insight for review</li>
          <li>Final takeaway message</li>
        </ul>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-numbered': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 36px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Process Steps</h2>
        <ol style="font-size: 20px; line-height: 1.8; color: #333; list-style-position: outside; padding-left: 30px;">
          <li style="margin-bottom: 15px;">First step in the process</li>
          <li style="margin-bottom: 15px;">Second step to complete</li>
          <li style="margin-bottom: 15px;">Third action to take</li>
          <li>Final step to finish</li>
        </ol>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-quote': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 36px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Inspirational Quote</h2>
        <blockquote style="border-left: 5px solid #667eea; padding-left: 30px; margin: 0;">
          <p style="font-size: 24px; line-height: 1.6; color: #333; font-style: italic; margin-bottom: 20px;">"The only way to do great work is to love what you do."</p>
          <footer style="font-size: 18px; color: #666;">— Steve Jobs</footer>
        </blockquote>
      </div>
    `,
    bg: '#ffffff'
  },
  'content-1col': {
    html: `
      <div style="padding-top: 60px;">
        <h2 style="font-size: 36px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Slide Title</h2>
        <ul style="font-size: 20px; line-height: 1.8; color: #333; list-style-position: inside;">
          <li>First key point with supporting details</li>
          <li style="margin-top: 20px;">Second important insight</li>
          <li style="margin-top: 20px;">Third consideration to discuss</li>
        </ul>
      </div>
    `,
    bg: '#ffffff'
  },
  'content-1col-alt': {
    html: `
      <div style="padding-top: 60px; padding-left: 40px;">
        <h2 style="font-size: 40px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Topics to Cover</h2>
        <div style="border-left: 4px solid #667eea; padding-left: 30px;">
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;"><strong>Overview:</strong> Project background and goals</p>
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;"><strong>Methods:</strong> Approaches and strategies</p>
          <p style="font-size: 18px; color: #333;"><strong>Results:</strong> Key findings and outcomes</p>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'content-2col': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="display: flex; gap: 60px;">
          <div style="flex: 1;">
            <p style="font-size: 20px; line-height: 1.8; color: #333;">This is the left column with content that flows naturally. It can contain multiple paragraphs and ideas.</p>
          </div>
          <div style="flex: 1;">
            <p style="font-size: 20px; line-height: 1.8; color: #333;">This is the right column with complementary information that balances the layout.</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-two-col': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 36px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Two Column Layout</h2>
        <div style="display: flex; gap: 60px;">
          <div style="flex: 1;">
            <h3 style="font-size: 22px; margin-bottom: 15px; color: #333;">Left Column</h3>
            <ul style="font-size: 18px; line-height: 1.8; color: #666;">
              <li>Point one</li>
              <li>Point two</li>
            </ul>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 22px; margin-bottom: 15px; color: #333;">Right Column</h3>
            <ul style="font-size: 18px; line-height: 1.8; color: #666;">
              <li>Point three</li>
              <li>Point four</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'img-left-text-right': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="display: flex; gap: 60px; align-items: center;">
          <div style="flex: 1; background: #f8f9fa; padding: 80px 40px; border-radius: 8px; text-align: center;">
            <div style="font-size: 48px;">🖼️</div>
            <div style="font-size: 14px; color: #999; margin-top: 10px;">Image</div>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 28px; margin-bottom: 20px; color: #1a1a1a; font-weight: 600;">Text Content</h3>
            <p style="font-size: 18px; line-height: 1.7; color: #666;">Description and details about the image appear here in the right column.</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'text-left-img-right': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="display: flex; gap: 60px; align-items: center;">
          <div style="flex: 1;">
            <h3 style="font-size: 28px; margin-bottom: 20px; color: #1a1a1a; font-weight: 600;">Text Content</h3>
            <p style="font-size: 18px; line-height: 1.7; color: #666;">Description and details appear here in the left column.</p>
          </div>
          <div style="flex: 1; background: #f8f9fa; padding: 80px 40px; border-radius: 8px; text-align: center;">
            <div style="font-size: 48px;">🖼️</div>
            <div style="font-size: 14px; color: #999; margin-top: 10px;">Image</div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'two-images': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="display: flex; gap: 40px;">
          <div style="flex: 1; background: #f8f9fa; padding: 60px 30px; border-radius: 8px; text-align: center;">
            <div style="font-size: 42px;">🖼️</div>
            <div style="font-size: 14px; color: #999; margin-top: 10px;">Image 1</div>
          </div>
          <div style="flex: 1; background: #f8f9fa; padding: 60px 30px; border-radius: 8px; text-align: center;">
            <div style="font-size: 42px;">🖼️</div>
            <div style="font-size: 14px; color: #999; margin-top: 10px;">Image 2</div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'pro-con': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700; text-align: center;">Analysis</h2>
        <div style="display: flex; gap: 40px;">
          <div style="flex: 1; background: #e8f5e9; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 24px; margin-bottom: 20px; color: #2e7d32; font-weight: 600;">✓ Pros</h3>
            <ul style="font-size: 16px; line-height: 1.8; color: #555;">
              <li>Advantage one</li>
              <li>Benefit two</li>
            </ul>
          </div>
          <div style="flex: 1; background: #ffebee; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 24px; margin-bottom: 20px; color: #c62828; font-weight: 600;">✗ Cons</h3>
            <ul style="font-size: 16px; line-height: 1.8; color: #555;">
              <li>Drawback one</li>
              <li>Limitation two</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'before-after': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700; text-align: center;">Transformation</h2>
        <div style="display: flex; gap: 40px;">
          <div style="flex: 1; background: #f5f5f5; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 22px; margin-bottom: 20px; color: #666; font-weight: 600;">Before</h3>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">Original state or condition described here.</p>
          </div>
          <div style="flex: 1; background: #e3f2fd; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 22px; margin-bottom: 20px; color: #1976d2; font-weight: 600;">After</h3>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">Improved state or outcome shown here.</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'two-lists': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Comparison</h2>
        <div style="display: flex; gap: 60px;">
          <div style="flex: 1;">
            <h3 style="font-size: 22px; margin-bottom: 20px; color: #333; font-weight: 600;">Category A</h3>
            <ul style="font-size: 18px; line-height: 1.8; color: #666;">
              <li>Item one</li>
              <li>Item two</li>
              <li>Item three</li>
            </ul>
          </div>
          <div style="flex: 1;">
            <h3 style="font-size: 22px; margin-bottom: 20px; color: #333; font-weight: 600;">Category B</h3>
            <ul style="font-size: 18px; line-height: 1.8; color: #666;">
              <li>Item one</li>
              <li>Item two</li>
              <li>Item three</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'features': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Feature Comparison</h2>
        <div style="display: flex; gap: 40px;">
          <div style="flex: 1; border: 2px solid #667eea; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 22px; margin-bottom: 20px; color: #667eea; font-weight: 600;">Plan A</h3>
            <div style="font-size: 16px; color: #666; line-height: 2;">
              <div>✓ Feature 1</div>
              <div>✓ Feature 2</div>
            </div>
          </div>
          <div style="flex: 1; border: 2px solid #764ba2; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 22px; margin-bottom: 20px; color: #764ba2; font-weight: 600;">Plan B</h3>
            <div style="font-size: 16px; color: #666; line-height: 2;">
              <div>✓ Feature 1</div>
              <div>✓ Feature 3</div>
            </div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'quotes': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="display: flex; gap: 50px;">
          <div style="flex: 1;">
            <div style="font-size: 48px; color: #ddd; line-height: 0.5; margin-bottom: 20px;">“</div>
            <p style="font-size: 18px; font-style: italic; color: #555; line-height: 1.6;">First quote text goes here</p>
            <p style="font-size: 14px; color: #999; margin-top: 15px;">— Author Name</p>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 48px; color: #ddd; line-height: 0.5; margin-bottom: 20px;">“</div>
            <p style="font-size: 18px; font-style: italic; color: #555; line-height: 1.6;">Second quote text goes here</p>
            <p style="font-size: 14px; color: #999; margin-top: 15px;">— Another Person</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'split': {
    html: `
      <div style="display: flex; height: 100%;">
        <div style="flex: 1; background: #667eea; display: flex; align-items: center; justify-content: center; padding: 60px;">
          <div style="text-align: center; color: white;">
            <h3 style="font-size: 32px; font-weight: 700; margin-bottom: 20px;">Left Side</h3>
            <p style="font-size: 18px;">Content for the left section</p>
          </div>
        </div>
        <div style="flex: 1; background: #764ba2; display: flex; align-items: center; justify-content: center; padding: 60px;">
          <div style="text-align: center; color: white;">
            <h3 style="font-size: 32px; font-weight: 700; margin-bottom: 20px;">Right Side</h3>
            <p style="font-size: 18px;">Content for the right section</p>
          </div>
        </div>
      </div>
    `,
    bg: 'transparent'
  },
  'label-content': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="display: flex; gap: 50px;">
          <div style="flex: 0 0 200px; text-align: right; padding-right: 30px; border-right: 3px solid #667eea;">
            <div style="font-size: 18px; font-weight: 600; color: #667eea; margin-bottom: 40px;">LABEL 1</div>
            <div style="font-size: 18px; font-weight: 600; color: #667eea;">LABEL 2</div>
          </div>
          <div style="flex: 1;">
            <p style="font-size: 18px; line-height: 1.8; color: #333; margin-bottom: 40px;">Content for the first labeled section goes here.</p>
            <p style="font-size: 18px; line-height: 1.8; color: #333;">Content for the second labeled section goes here.</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'content-only': {
    html: `
      <div style="padding: 80px 120px; text-align: center;">
        <p style="font-size: 24px; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto;">
          This is a content-only slide with no title. The text is centered and provides a clean, focused presentation of key information or a quote.
        </p>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-code': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Code Example</h2>
        <pre style="background: #f8f9fa; color: #1a1a1a; padding: 25px; border-radius: 8px; font-size: 15px; font-family: 'Monaco', monospace; line-height: 1.5; border: 1px solid #dee2e6;"><code>function processData(items) {
  return items.map(x => x * 2)
    .filter(x => x > 10);
}</code></pre>
      </div>
    `,
    bg: '#ffffff'
  },
  'timeline': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Project Timeline</h2>
        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">1</div>
          <div><div style="font-size: 20px; font-weight: 600; color: #1a1a1a;">Planning Phase</div><div style="font-size: 16px; color: #666; margin-top: 5px;">Q1 2026</div></div>
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="width: 60px; height: 60px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">2</div>
          <div><div style="font-size: 20px; font-weight: 600; color: #1a1a1a;">Execution</div><div style="font-size: 16px; color: #666; margin-top: 5px;">Q2-Q3 2026</div></div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'steps': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">How to Get Started</h2>
        <div style="margin-bottom: 25px;">
          <div style="display: flex; gap: 20px;">
            <div style="font-size: 28px; font-weight: 700; color: #667eea; flex-shrink: 0;">1</div>
            <div><div style="font-size: 20px; font-weight: 600; color: #1a1a1a;">Create Account</div><div style="font-size: 16px; color: #666; margin-top: 5px;">Sign up and verify your email</div></div>
          </div>
        </div>
        <div style="margin-bottom: 25px;">
          <div style="display: flex; gap: 20px;">
            <div style="font-size: 28px; font-weight: 700; color: #667eea; flex-shrink: 0;">2</div>
            <div><div style="font-size: 20px; font-weight: 600; color: #1a1a1a;">Configure Settings</div><div style="font-size: 16px; color: #666; margin-top: 5px;">Customize your preferences</div></div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'callout': {
    html: `
      <div style="padding-top: 100px;">
        <div style="background: #fff3cd; border-left: 6px solid #ffc107; padding: 40px; border-radius: 8px;">
          <div style="font-size: 28px; margin-bottom: 15px;">⚠️</div>
          <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 20px; font-weight: 700;">Important Notice</h2>
          <p style="font-size: 18px; color: #333; line-height: 1.6;">This is a callout box highlighting critical information that needs special attention from the audience.</p>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-image': {
    html: `
      <div style="padding-top: 60px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Visual Example</h2>
        <div style="background: #f8f9fa; padding: 60px; border-radius: 8px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 15px;">🖼️</div>
          <div style="font-size: 16px; color: #999;">Image placeholder</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'full-image': {
    html: `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa;">
        <div style="text-align: center;">
          <div style="font-size: 72px; margin-bottom: 20px;">🖼️</div>
          <div style="font-size: 20px; color: #666;">Full Width Image</div>
        </div>
      </div>
    `,
    bg: '#f8f9fa'
  },
  'data-chart': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Data Visualization</h2>
        <div style="background: #f8f9fa; padding: 40px; border-radius: 8px; text-align: center;">
          <div style="font-size: 18px; color: #666;">📊 Chart Placeholder</div>
          <div style="margin-top: 20px; font-size: 14px; color: #999;">Interactive visualization would appear here</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'three-col': {
    html: `
      <div style="padding-top: 60px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Three Column Comparison</h2>
        <div style="display: flex; gap: 30px;">
          <div style="flex: 1; background: #e3f2fd; padding: 25px; border-radius: 8px; text-align: center;">
            <h3 style="font-size: 20px; margin-bottom: 15px; color: #1976d2;">Option A</h3>
            <p style="font-size: 14px; color: #555;">Details here</p>
          </div>
          <div style="flex: 1; background: #f3e5f5; padding: 25px; border-radius: 8px; text-align: center;">
            <h3 style="font-size: 20px; margin-bottom: 15px; color: #7b1fa2;">Option B</h3>
            <p style="font-size: 14px; color: #555;">Details here</p>
          </div>
          <div style="flex: 1; background: #e8f5e9; padding: 25px; border-radius: 8px; text-align: center;">
            <h3 style="font-size: 20px; margin-bottom: 15px; color: #388e3c;">Option C</h3>
            <p style="font-size: 14px; color: #555;">Details here</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'matrix': {
    html: `
      <div style="padding-top: 60px;">
        <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Comparison Matrix</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead><tr style="background: #667eea; color: white;"><th style="padding: 12px; text-align: left;">Feature</th><th style="padding: 12px;">Plan A</th><th style="padding: 12px;">Plan B</th></tr></thead>
          <tbody>
            <tr style="background: #f8f9fa;"><td style="padding: 10px; font-weight: 600;">Speed</td><td style="padding: 10px; text-align: center;">✓</td><td style="padding: 10px; text-align: center;">✓</td></tr>
            <tr><td style="padding: 10px; font-weight: 600;">Cost</td><td style="padding: 10px; text-align: center;">✓</td><td style="padding: 10px; text-align: center;">✗</td></tr>
          </tbody>
        </table>
      </div>
    `,
    bg: '#ffffff'
  },
  'venn': {
    html: `
      <div style="padding-top: 80px; text-align: center;">
        <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Venn Diagram</h2>
        <div style="position: relative; display: flex; justify-content: center; align-items: center; height: 200px;">
          <div style="position: absolute; left: 200px; width: 150px; height: 150px; border-radius: 50%; background: rgba(102, 126, 234, 0.5); border: 3px solid #667eea;"></div>
          <div style="position: absolute; right: 200px; width: 150px; height: 150px; border-radius: 50%; background: rgba(118, 75, 162, 0.5); border: 3px solid #764ba2;"></div>
          <div style="position: absolute; font-size: 14px; font-weight: 600; color: #333;">Overlap</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'spectrum': {
    html: `
      <div style="padding-top: 100px;">
        <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700; text-align: center;">Spectrum Analysis</h2>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 16px; font-weight: 600; color: #c62828;">Low</div>
          </div>
          <div style="flex: 3; height: 40px; background: linear-gradient(to right, #c62828, #fdd835, #2e7d32); border-radius: 20px;"></div>
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 16px; font-weight: 600; color: #2e7d32;">High</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #666;">Value increases from left to right</div>
      </div>
    `,
    bg: '#ffffff'
  },
  'four-quad': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700; text-align: center;">Four Quadrant Matrix</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="background: #e3f2fd; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 18px; color: #1976d2; font-weight: 600; margin-bottom: 10px;">Quadrant 1</h3>
            <p style="font-size: 14px; color: #555;">High Impact, Low Effort</p>
          </div>
          <div style="background: #f3e5f5; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 18px; color: #7b1fa2; font-weight: 600; margin-bottom: 10px;">Quadrant 2</h3>
            <p style="font-size: 14px; color: #555;">High Impact, High Effort</p>
          </div>
          <div style="background: #fff3cd; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 18px; color: #f57c00; font-weight: 600; margin-bottom: 10px;">Quadrant 3</h3>
            <p style="font-size: 14px; color: #555;">Low Impact, Low Effort</p>
          </div>
          <div style="background: #ffebee; padding: 30px; border-radius: 8px;">
            <h3 style="font-size: 18px; color: #c62828; font-weight: 600; margin-bottom: 10px;">Quadrant 4</h3>
            <p style="font-size: 14px; color: #555;">Low Impact, High Effort</p>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'options': {
    html: `
      <div style="padding-top: 60px;">
        <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700; text-align: center;">Choose Your Option</h2>
        <div style="display: flex; gap: 30px; justify-content: center;">
          <div style="background: #ffffff; border: 3px solid #667eea; padding: 30px 40px; border-radius: 12px; text-align: center; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 15px;">🎯</div>
            <h3 style="font-size: 20px; color: #667eea; font-weight: 600;">Option A</h3>
          </div>
          <div style="background: #ffffff; border: 3px solid #764ba2; padding: 30px 40px; border-radius: 12px; text-align: center; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 15px;">✨</div>
            <h3 style="font-size: 20px; color: #764ba2; font-weight: 600;">Option B</h3>
          </div>
          <div style="background: #ffffff; border: 3px solid #2e7d32; padding: 30px 40px; border-radius: 12px; text-align: center; cursor: pointer;">
            <div style="font-size: 24px; margin-bottom: 15px;">🚀</div>
            <h3 style="font-size: 20px; color: #2e7d32; font-weight: 600;">Option C</h3>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'utility': {
    html: `
      <div style="padding-top: 200px; text-align: center;">
        <p style="font-size: 20px; color: #666;">Utility slide content</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'thank-you': {
    html: `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center;">
        <div>
          <h1 style="font-size: 64px; color: #1a1a1a; font-weight: 700; margin-bottom: 30px;">Thank You</h1>
          <p style="font-size: 28px; color: #666;">Questions?</p>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'questions': {
    html: `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center;">
        <div>
          <div style="font-size: 80px; margin-bottom: 30px;">❓</div>
          <h1 style="font-size: 56px; color: #1a1a1a; font-weight: 700;">Questions?</h1>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'backup': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <div style="display: inline-block; background: #fff3cd; color: #856404; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: 600; margin-bottom: 30px;">BACKUP SLIDE</div>
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Additional Information</h2>
        <p style="font-size: 18px; color: #666; line-height: 1.8;">This slide contains supplementary details for reference during Q&A.</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'blank': {
    html: `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
        <p style="font-size: 16px; color: #ccc; font-style: italic;">Blank slide</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'resources': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Resources</h2>
        <ul style="font-size: 18px; line-height: 2; color: #333; list-style-position: inside;">
          <li>Documentation: example.com/docs</li>
          <li>GitHub Repository: github.com/project</li>
          <li>Contact: support@example.com</li>
        </ul>
      </div>
    `,
    bg: '#ffffff'
  },
  'appendix': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <div style="border-bottom: 3px solid #667eea; padding-bottom: 20px; margin-bottom: 30px;">
          <h2 style="font-size: 32px; color: #1a1a1a; font-weight: 700;">Appendix</h2>
          <p style="font-size: 16px; color: #999; margin-top: 10px;">Supporting materials and references</p>
        </div>
        <p style="font-size: 16px; color: #666; line-height: 1.8;">Additional technical details, data sources, and methodology notes.</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'code-block': {
    html: `
      <div style="padding-top: 100px; padding-left: 80px; padding-right: 80px;">
        <pre style="background: #f8f9fa; color: #1a1a1a; padding: 30px; border-radius: 8px; font-size: 16px; font-family: 'Monaco', 'Courier New', monospace; line-height: 1.6; border: 1px solid #dee2e6;"><code>function processData(items) {
  return items.map(x => x * 2)
    .filter(x => x > 10);
}</code></pre>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-code-block': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Code Example</h2>
        <pre style="background: #f8f9fa; color: #1a1a1a; padding: 25px; border-radius: 8px; font-size: 15px; font-family: 'Monaco', monospace; line-height: 1.5; border: 1px solid #dee2e6;"><code>const data = await fetch('/api/data');
const result = await data.json();
console.log(result);</code></pre>
      </div>
    `,
    bg: '#ffffff'
  },
  'two-code': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Code Comparison</h2>
        <div style="display: flex; gap: 30px;">
          <div style="flex: 1;">
            <div style="font-size: 14px; color: #666; margin-bottom: 10px; font-weight: 600;">Before</div>
            <pre style="background: #f8f9fa; color: #1a1a1a; padding: 20px; border-radius: 8px; font-size: 13px; font-family: 'Monaco', monospace; line-height: 1.4; border: 1px solid #dee2e6;"><code>var x = 1;
var y = 2;</code></pre>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 14px; color: #666; margin-bottom: 10px; font-weight: 600;">After</div>
            <pre style="background: #f8f9fa; color: #1a1a1a; padding: 20px; border-radius: 8px; font-size: 13px; font-family: 'Monaco', monospace; line-height: 1.4; border: 1px solid #dee2e6;"><code>const x = 1;
const y = 2;</code></pre>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'simple-table': {
    html: `
      <div style="padding-top: 100px; padding-left: 80px; padding-right: 80px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
          <thead><tr style="background: #f8f9fa;"><th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Name</th><th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Value</th></tr></thead>
          <tbody><tr><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Item A</td><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">100</td></tr><tr><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Item B</td><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">200</td></tr><tr><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Item C</td><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">150</td></tr></tbody>
        </table>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-table': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Data Summary</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
          <thead><tr style="background: #667eea; color: white;"><th style="padding: 12px; text-align: left;">Product</th><th style="padding: 12px; text-align: right;">Sales</th></tr></thead>
          <tbody><tr><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Widget</td><td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right;">$5,000</td></tr><tr><td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Gadget</td><td style="padding: 12px; border-bottom: 1px solid #dee2e6; text-align: right;">$8,500</td></tr></tbody>
        </table>
      </div>
    `,
    bg: '#ffffff'
  },
  'striped-table': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
          <thead><tr style="background: #1a1a1a; color: white;"><th style="padding: 12px; text-align: left;">Category</th><th style="padding: 12px; text-align: center;">Count</th><th style="padding: 12px; text-align: right;">%</th></tr></thead>
          <tbody><tr style="background: #f8f9fa;"><td style="padding: 12px;">Type A</td><td style="padding: 12px; text-align: center;">45</td><td style="padding: 12px; text-align: right;">30%</td></tr><tr><td style="padding: 12px;">Type B</td><td style="padding: 12px; text-align: center;">70</td><td style="padding: 12px; text-align: right;">47%</td></tr><tr style="background: #f8f9fa;"><td style="padding: 12px;">Type C</td><td style="padding: 12px; text-align: center;">35</td><td style="padding: 12px; text-align: right;">23%</td></tr></tbody>
        </table>
      </div>
    `,
    bg: '#ffffff'
  },
  'large-table': {
    html: `
      <div style="padding-top: 40px; padding-left: 80px; padding-right: 80px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead><tr style="background: #667eea; color: white;"><th style="padding: 8px; text-align: left;">Q1</th><th style="padding: 8px;">Q2</th><th style="padding: 8px;">Q3</th><th style="padding: 8px;">Q4</th><th style="padding: 8px;">Total</th></tr></thead>
          <tbody>
            <tr style="background: #f8f9fa;"><td style="padding: 8px; font-weight: 600;">Revenue</td><td style="padding: 8px;">$100K</td><td style="padding: 8px;">$120K</td><td style="padding: 8px;">$110K</td><td style="padding: 8px; font-weight: 600;">$430K</td></tr>
            <tr><td style="padding: 8px; font-weight: 600;">Costs</td><td style="padding: 8px;">$60K</td><td style="padding: 8px;">$65K</td><td style="padding: 8px;">$70K</td><td style="padding: 8px; font-weight: 600;">$195K</td></tr>
            <tr style="background: #f8f9fa;"><td style="padding: 8px; font-weight: 600;">Profit</td><td style="padding: 8px;">$40K</td><td style="padding: 8px;">$55K</td><td style="padding: 8px;">$40K</td><td style="padding: 8px; font-weight: 600;">$235K</td></tr>
          </tbody>
        </table>
      </div>
    `,
    bg: '#ffffff'
  },
  'single-eq': {
    html: `
      <div style="padding-top: 150px; text-align: center;">
        <div style="font-size: 48px; font-family: 'Georgia', serif; color: #333;">
          E = mc²
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'title-eq': {
    html: `
      <div style="padding-top: 100px; text-align: center;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 50px; font-weight: 700;">Mass-Energy Equivalence</h2>
        <div style="font-size: 40px; font-family: 'Georgia', serif; color: #333;">
          E = mc²
        </div>
        <p style="margin-top: 40px; font-size: 18px; color: #666;">Einstein's famous equation</p>
      </div>
    `,
    bg: '#ffffff'
  },
  'multi-eq': {
    html: `
      <div style="padding-top: 80px;">
        <h2 style="font-size: 28px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700; text-align: center;">Key Equations</h2>
        <div style="text-align: center; line-height: 2.5;">
          <div style="font-size: 28px; font-family: 'Georgia', serif; color: #333; margin-bottom: 30px;">F = ma</div>
          <div style="font-size: 28px; font-family: 'Georgia', serif; color: #333; margin-bottom: 30px;">E = mc²</div>
          <div style="font-size: 28px; font-family: 'Georgia', serif; color: #333;">a² + b² = c²</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'full-figure': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="background: #f8f9fa; padding: 100px 60px; border-radius: 8px; text-align: center;">
          <div style="font-size: 72px; margin-bottom: 20px;">🖼️</div>
          <div style="font-size: 18px; color: #666;">Full Width Figure</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'fig-title': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Figure Title</h2>
        <div style="background: #f8f9fa; padding: 80px 50px; border-radius: 8px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 15px;">🖼️</div>
          <div style="font-size: 16px; color: #666;">Figure with descriptive title</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'gallery': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Image Gallery</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          <div style="background: #f8f9fa; padding: 40px 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 36px;">🖼️</div>
          </div>
          <div style="background: #f8f9fa; padding: 40px 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 36px;">🖼️</div>
          </div>
          <div style="background: #f8f9fa; padding: 40px 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 36px;">🖼️</div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'hero-image': {
    html: `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);">
        <div style="text-align: center; padding-left: 80px; padding-right: 80px;">
          <div style="font-size: 80px; margin-bottom: 25px;">🖼️</div>
          <h2 style="font-size: 36px; color: #1a1a1a; font-weight: 700;">Hero Image</h2>
          <p style="font-size: 20px; color: #666; margin-top: 15px;">Full screen visual impact</p>
        </div>
      </div>
    `,
    bg: 'transparent'
  },
  'video': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="background: #1a1a1a; padding: 120px 60px; border-radius: 8px; text-align: center; position: relative;">
          <div style="font-size: 72px; color: white; margin-bottom: 20px;">▶️</div>
          <div style="font-size: 18px; color: #ccc;">Video Content</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'icon-grid': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 40px; font-weight: 700;">Features</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">🎯</div>
            <h3 style="font-size: 18px; color: #333;">Feature 1</h3>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">⚡</div>
            <h3 style="font-size: 18px; color: #333;">Feature 2</h3>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">🚀</div>
            <h3 style="font-size: 18px; color: #333;">Feature 3</h3>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'diagram': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Process Flow</h2>
        <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
          <div style="background: #667eea; color: white; padding: 30px 40px; border-radius: 8px; font-size: 18px; font-weight: 600;">Step 1</div>
          <div style="font-size: 24px; color: #667eea;">→</div>
          <div style="background: #667eea; color: white; padding: 30px 40px; border-radius: 8px; font-size: 18px; font-weight: 600;">Step 2</div>
          <div style="font-size: 24px; color: #667eea;">→</div>
          <div style="background: #667eea; color: white; padding: 30px 40px; border-radius: 8px; font-size: 18px; font-weight: 600;">Step 3</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'screenshot': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Application Screenshot</h2>
        <div style="background: #f8f9fa; border: 2px solid #dee2e6; border-radius: 8px; padding: 60px 40px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 15px;">💻</div>
          <div style="font-size: 16px; color: #666;">Screenshot placeholder</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'carousel': {
    html: `
      <div style="padding-top: 80px; padding-left: 80px; padding-right: 80px;">
        <div style="position: relative; background: #f8f9fa; padding: 100px 60px; border-radius: 8px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 20px;">🖼️</div>
          <div style="font-size: 18px; color: #666; margin-bottom: 30px;">Slide 1 of 3</div>
          <div style="display: flex; justify-content: center; gap: 10px;">
            <div style="width: 12px; height: 12px; background: #667eea; border-radius: 50%;"></div>
            <div style="width: 12px; height: 12px; background: #ddd; border-radius: 50%;"></div>
            <div style="width: 12px; height: 12px; background: #ddd; border-radius: 50%;"></div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'interactive-r': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Interactive R Analysis</h2>
        <pre style="background: #f8f9fa; color: #1a1a1a; padding: 25px; border-radius: 8px; font-size: 14px; font-family: 'Monaco', monospace; line-height: 1.5; border: 1px solid #dee2e6; margin-bottom: 20px;"><code>model <- lm(y ~ x)
coef(model)  # Live results</code></pre>
        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
          <div style="font-size: 14px; color: #1976d2; font-family: monospace;">
            Intercept: 0.042<br/>
            Slope: 1.987<br/>
            R²: 0.812
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'live-sim': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Live Simulation</h2>
        <div style="display: flex; gap: 30px;">
          <div style="flex: 1;">
            <pre style="background: #f8f9fa; color: #1a1a1a; padding: 20px; border-radius: 8px; font-size: 13px; font-family: 'Monaco', monospace; line-height: 1.4; border: 1px solid #dee2e6;"><code>n <- 1000
results <- replicate(n,
  mean(rnorm(50))
)</code></pre>
          </div>
          <div style="flex: 1; background: #f0f4ff; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
            <div style="font-size: 16px; color: #333; font-weight: 600; margin-bottom: 10px;">Results:</div>
            <div style="font-size: 14px; color: #666; font-family: monospace;">
              Mean: 0.003<br/>
              SD: 0.141<br/>
              ⚡ Running live...
            </div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'interactive-plot': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Interactive Visualization</h2>
        <div style="background: #f8f9fa; padding: 40px; border-radius: 8px; text-align: center; position: relative;">
          <svg width="100%" height="200" viewBox="0 0 400 200">
            <path d="M 0,100 Q 50,50 100,100 T 200,100 T 300,100 T 400,100" stroke="#667eea" stroke-width="3" fill="none"/>
            <circle cx="100" cy="100" r="4" fill="#764ba2"/>
            <circle cx="200" cy="100" r="4" fill="#764ba2"/>
            <circle cx="300" cy="100" r="4" fill="#764ba2"/>
          </svg>
          <div style="position: absolute; top: 10px; right: 10px; font-size: 20px;">📊</div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  },
  'code-output': {
    html: `
      <div style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
        <h2 style="font-size: 32px; color: #1a1a1a; margin-bottom: 30px; font-weight: 700;">Analysis Results</h2>
        <div style="display: flex; gap: 30px;">
          <div style="flex: 1;">
            <div style="font-size: 14px; color: #666; margin-bottom: 10px; font-weight: 600;">Code</div>
            <pre style="background: #f8f9fa; color: #1a1a1a; padding: 20px; border-radius: 8px; font-size: 13px; font-family: 'Monaco', monospace; line-height: 1.4; border: 1px solid #dee2e6;"><code>model <- lm(
  mpg ~ wt + hp
)</code></pre>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 14px; color: #666; margin-bottom: 10px; font-weight: 600;">Output</div>
            <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #333;">
              Coefficients:<br/>
              wt: -3.878<br/>
              hp: -0.032<br/>
              R²: 0.827
            </div>
          </div>
        </div>
      </div>
    `,
    bg: '#ffffff'
  }
};

export function renderPreview(template, fragmentText) {
  // Determine template type from ID
  let templateType = 'content-1col'; // default
  
  if (template.id.startsWith('title-')) {
    const titleNum = parseInt(template.id.replace('title-', ''));
    if (titleNum === 1) {
      templateType = 'title';
    } else if (titleNum === 2) {
      templateType = 'title-bg';
    } else if (titleNum === 3) {
      templateType = 'title-left';
    } else if (titleNum === 4) {
      templateType = 'title-date';
    } else if (titleNum === 5) {
      templateType = 'title-author';
    } else if (titleNum === 6) {
      templateType = 'title-logo';
    } else if (titleNum === 7) {
      templateType = 'title-large';
    } else if (titleNum === 8) {
      templateType = 'title-accent';
    } else if (titleNum === 9) {
      templateType = 'title-full';
    } else {
      templateType = 'title';
    }
  } else if (template.id.startsWith('section-')) {
    const sectionNum = parseInt(template.id.replace('section-', ''));
    if (sectionNum === 1) {
      templateType = 'section';
    } else if (sectionNum === 2) {
      templateType = 'section-alt1';
    } else if (sectionNum === 3) {
      templateType = 'section-alt2';
    } else if (sectionNum === 4) {
      templateType = 'section-alt3';
    } else if (sectionNum === 5) {
      templateType = 'chapter';
    } else if (sectionNum === 6) {
      templateType = 'section-alt4';
    } else if (sectionNum === 7) {
      templateType = 'intermission';
    } else if (sectionNum === 8) {
      templateType = 'coming-next';
    } else {
      templateType = 'section';
    }
  } else if (template.id.startsWith('content-1col-')) {
    const contentNum = parseInt(template.id.replace('content-1col-', ''));
    if (contentNum === 1) {
      templateType = 'title-text';
    } else if (contentNum === 2) {
      templateType = 'title-bullets';
    } else if (contentNum === 3) {
      templateType = 'title-numbered';
    } else if (contentNum === 4) {
      templateType = 'title-quote';
    } else if (contentNum === 5) {
      templateType = 'content-only';
    } else if (contentNum === 7) {
      templateType = 'title-code';
    } else if (contentNum === 8) {
      templateType = 'timeline';
    } else if (contentNum === 9) {
      templateType = 'steps';
    } else if (contentNum === 10) {
      templateType = 'callout';
    } else if (contentNum === 11) {
      templateType = 'title-image';
    } else if (contentNum === 12) {
      templateType = 'full-image';
    } else {
      templateType = contentNum % 2 === 0 ? 'content-1col-alt' : 'content-1col';
    }
  } else if (template.id.startsWith('content-2col-')) {
    const contentNum = parseInt(template.id.replace('content-2col-', ''));
    if (contentNum === 1) {
      templateType = 'content-2col';
    } else if (contentNum === 2) {
      templateType = 'title-two-col';
    } else if (contentNum === 3) {
      templateType = 'img-left-text-right';
    } else if (contentNum === 4) {
      templateType = 'text-left-img-right';
    } else if (contentNum === 5) {
      templateType = 'two-images';
    } else if (contentNum === 6) {
      templateType = 'pro-con';
    } else if (contentNum === 7) {
      templateType = 'before-after';
    } else if (contentNum === 8) {
      templateType = 'two-lists';
    } else if (contentNum === 9) {
      templateType = 'features';
    } else if (contentNum === 10) {
      templateType = 'quotes';
    } else if (contentNum === 11) {
      templateType = 'split';
    } else if (contentNum === 12) {
      templateType = 'label-content';
    } else {
      templateType = 'content-2col';
    }
  } else if (template.id.startsWith('code-')) {
    const codeNum = parseInt(template.id.replace('code-', ''));
    if (codeNum === 1) {
      templateType = 'code-block';
    } else if (codeNum === 2) {
      templateType = 'title-code-block';
    } else if (codeNum === 3) {
      templateType = 'two-code';
    } else if (codeNum === 4) {
      templateType = 'interactive-r';
    } else if (codeNum === 5) {
      templateType = 'live-sim';
    } else if (codeNum === 6) {
      templateType = 'interactive-plot';
    } else if (codeNum === 7) {
      templateType = 'code-output';
    } else {
      templateType = 'code-block';
    }
  } else if (template.id.startsWith('data-chart-')) {
    templateType = 'data-chart';
  } else if (template.id.startsWith('data-table-')) {
    const tableNum = parseInt(template.id.replace('data-table-', ''));
    if (tableNum === 1) {
      templateType = 'simple-table';
    } else if (tableNum === 2) {
      templateType = 'title-table';
    } else if (tableNum === 3) {
      templateType = 'striped-table';
    } else if (tableNum === 4) {
      templateType = 'large-table';
    } else {
      templateType = 'simple-table';
    }
  } else if (template.id.startsWith('figure-')) {
    const figNum = parseInt(template.id.replace('figure-', ''));
    if (figNum === 1) {
      templateType = 'full-figure';
    } else if (figNum === 2) {
      templateType = 'fig-title';
    } else if (figNum === 3) {
      templateType = 'gallery';
    } else if (figNum === 4) {
      templateType = 'hero-image';
    } else if (figNum === 5) {
      templateType = 'video';
    } else if (figNum === 6) {
      templateType = 'icon-grid';
    } else if (figNum === 7) {
      templateType = 'diagram';
    } else if (figNum === 8) {
      templateType = 'screenshot';
    } else if (figNum === 9) {
      templateType = 'carousel';
    } else {
      templateType = 'full-figure';
    }
  } else if (template.id.startsWith('equation-')) {
    const eqNum = parseInt(template.id.replace('equation-', ''));
    if (eqNum === 1) {
      templateType = 'single-eq';
    } else if (eqNum === 2) {
      templateType = 'title-eq';
    } else if (eqNum === 3) {
      templateType = 'multi-eq';
    } else {
      templateType = 'single-eq';
    }
  } else if (template.id.startsWith('comparison-')) {
    const compNum = parseInt(template.id.replace('comparison-', ''));
    if (compNum === 1) {
      templateType = 'three-col';
    } else if (compNum === 2) {
      templateType = 'matrix';
    } else if (compNum === 3) {
      templateType = 'venn';
    } else if (compNum === 4) {
      templateType = 'spectrum';
    } else if (compNum === 5) {
      templateType = 'four-quad';
    } else if (compNum === 6) {
      templateType = 'options';
    } else {
      templateType = 'three-col';
    }
  } else if (template.id.startsWith('utility-')) {
    const utilNum = parseInt(template.id.replace('utility-', ''));
    if (utilNum === 1) {
      templateType = 'thank-you';
    } else if (utilNum === 2) {
      templateType = 'questions';
    } else if (utilNum === 3) {
      templateType = 'backup';
    } else if (utilNum === 4) {
      templateType = 'blank';
    } else if (utilNum === 5) {
      templateType = 'resources';
    } else if (utilNum === 6) {
      templateType = 'appendix';
    } else {
      templateType = 'thank-you';
    }
  }
  
  const previewData = PREVIEW_TEMPLATES[templateType] || PREVIEW_TEMPLATES['content-1col'];
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { 
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    body { 
      background: ${previewData.bg};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      transform: scale(0.556);
      transform-origin: top left;
      width: 179.86%;
      height: 179.86%;
    }
  </style>
</head>
<body>
  ${previewData.html}
</body>
</html>
  `;
  
  return html;
}
