# Recruiterflow Agency Velocity Audit

An interactive 4-question audit tool for recruitment agencies to benchmark their operational maturity.

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Local Development](#local-development)
- [Building for Production](#building-for-production)
- [Hosting](#hosting)
- [Webflow Embedding](#webflow-embedding)
- [Editing the Quiz](#editing-the-quiz)
- [URL Personalization](#url-personalization)
- [Analytics Events](#analytics-events)

## Overview

The Agency Velocity Audit is a lead generation tool designed to help recruitment agencies assess their operational maturity. Users answer 4 questions about their agency's processes, and receive a personalized assessment with a CTA to book a demo.

## How It Works

1. **Welcome Screen** - User sees the audit title, description, and "Start Audit" button
2. **4 Questions** - Each question has 4 answer options (A, B, C, D) worth 3, 2, 1, 0 points respectively
3. **Scoring** - Total score ranges from 0-12 points
4. **Results** - Score maps to one of 4 categories with tailored messaging
5. **CTA** - User can book a call via Calendly

### Scoring Categories

| Score Range | Category | Description |
|-------------|----------|-------------|
| 0-3 | Reactive | Critical - flying blind |
| 4-6 | Manual | Developing - heavy manual effort |
| 7-9 | Managed | Solid - good habits, room to improve |
| 10-12 | High-Velocity | Excellent - ahead of the curve |

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

## Building for Production

```bash
# Build the application
npm run build
```

This creates a `dist/public` folder with all static assets ready for deployment.

## Hosting

The `/dist/public` folder contains:
- `index.html` - Entry point
- `assets/` - JS, CSS, and other static files

### Hosting Options

1. **Static hosting** - Upload `dist/public` to any static host (Vercel, Netlify, AWS S3, etc.)
2. **CDN** - Serve from a CDN for global distribution
3. **Self-hosted** - Serve via nginx, Apache, or any web server

### Example nginx config

```nginx
server {
    listen 80;
    server_name audit.recruiterflow.com;
    root /var/www/agency-audit/dist/public;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Webflow Embedding

### Option 1: iframe Embed (Recommended)

Add this HTML embed block to your Webflow page:

```html
<iframe 
  src="https://your-hosted-url.com/" 
  width="100%" 
  height="700" 
  frameborder="0"
  style="border: none; border-radius: 12px;"
></iframe>
```

### Option 2: Script Mount

Add a container div and load the script:

```html
<div id="rf-agency-audit" style="min-height: 600px;"></div>
<script src="https://your-hosted-url.com/assets/index.js" defer></script>
```

### Responsive Considerations

For mobile responsiveness in Webflow:
- Set iframe width to 100%
- Use min-height of 600px
- The quiz adapts to container width automatically

## Editing the Quiz

All quiz content is config-driven via `client/public/quiz.json`. No code changes required. The config is loaded at runtime, so you can update content without rebuilding.

### File Structure

```json
{
  "metadata": {
    "title": "Agency Velocity Audit",
    "subtitle": "...",
    "welcome_cta": "Start Audit",
    "time_estimate": "Takes less than 1 minute"
  },
  "questions": [...],
  "results": [...],
  "cta": {
    "default_label": "Talk to our team",
    "default_calendly_url": "https://calendly.com/recruiterflow/demo"
  }
}
```

### Editing Questions

Each question has:
- `id` - Unique identifier (q1, q2, etc.)
- `title` - Main question text
- `subtitle` - Helper text below the question
- `options` - Array of 4 answer options

Each option has:
- `id` - Unique identifier
- `label` - Short answer label
- `subtext` - Helper text
- `icon` - Emoji icon
- `score` - Point value (A=3, B=2, C=1, D=0)

### Editing Results

Each result category has:
- `category_id` - Unique identifier
- `min_score` / `max_score` - Score range
- `title` - Category name
- `badge_text` - Badge label
- `badge_color` - critical | warning | moderate | success
- `headline` - Main result headline
- `description` - Detailed explanation (use \n\n for paragraphs)
- `cta_label` - Button text

### Changing the Calendly Link

Update `cta.default_calendly_url` in quiz.json:

```json
"cta": {
  "default_label": "Talk to our team",
  "default_calendly_url": "https://calendly.com/your-team/meeting"
}
```

## URL Personalization

The quiz supports URL parameters for ABM campaigns:

| Parameter | Usage |
|-----------|-------|
| `company` | Personalizes welcome: "Agency Velocity Audit for {company}" |
| `persona` | Tracked in analytics |
| `industry` | Tracked in analytics |
| `utm_source` | Tracked in analytics |
| `utm_campaign` | Tracked in analytics |

### Example URLs

```
https://audit.recruiterflow.com/?company=Acme%20Recruiting
https://audit.recruiterflow.com/?company=TechHire&utm_source=linkedin&utm_campaign=q1-abm
```

All URL parameters are sanitized to prevent HTML injection.

## Analytics Events

The quiz emits GA4-compatible events:

| Event | When | Data |
|-------|------|------|
| `audit_viewed` | Page load | personalization params |
| `audit_started` | Start button clicked | - |
| `question_answered` | Answer selected | question_id, answer_id |
| `audit_completed` | Results shown | category, score |
| `cta_clicked` | CTA button clicked | calendly_url, category |

### Connecting to GA4

Events are sent to `window.gtag` if available. Ensure your GA4 tag is loaded before the quiz:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>

<!-- Then load the quiz -->
<iframe src="..."></iframe>
```

---

For detailed technical documentation, see [TRD.md](./TRD.md).
For product requirements, see [PRD.md](./PRD.md).
