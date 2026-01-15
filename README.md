# Recruiterflow Agency Velocity Audit

A production-ready micro web tool that helps recruitment agencies benchmark their operational maturity through an interactive 4-question audit.

## Features

- **Welcome Screen**: Logo, title, description, and primary CTA
- **4 Question Screens**: Each with title, subtitle, and 4 answer cards (icon, label, subtext)
- **Progress Indicator**: Shows "1/4", "2/4", etc. in the top-right
- **Auto-Advance**: Selecting an answer automatically advances to the next question
- **Back Navigation**: Back arrow in the top-left preserves prior answers
- **Results Screen**: Category title, explanation, and configurable CTA button
- **Personalization**: URL params (company, persona, industry, utm_source, etc.)
- **Analytics**: GA4-friendly events emitted for tracking
- **Config-Driven**: All content managed via a single configuration file

## Quick Start

### Development

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5000`

### Build for Production

```bash
npm run build
```

This creates a production build in the `dist/` folder.

## Configuration

All quiz content is defined in `client/src/lib/quiz-config.ts`:

- **metadata**: Title, subtitle, welcome CTA, time estimate
- **questions**: Array of questions with options (label, subtext, icon, score)
- **results**: Category definitions with score ranges and copy
- **cta**: Default Calendly URL and label

### Editing Quiz Content

1. Open `client/src/lib/quiz-config.ts`
2. Modify the `quizConfig` object
3. Available icons: zap, bar-chart, calendar, flame, bot, trending-up, file-spreadsheet, users, cpu, clipboard-list, calendar-check, help-circle, bell, clock, phone, x-circle

## Personalization (ABM)

Append URL parameters to personalize the experience:

```
?company=Acme%20Recruiting&utm_source=linkedin&utm_campaign=spring2026
```

Supported parameters:
- `company` - Personalizes the welcome headline
- `persona` - Passed to Calendly for context
- `industry` - Passed to Calendly for context
- `source` - Traffic source tracking
- `utm_source` - UTM source
- `utm_campaign` - UTM campaign

## Analytics Events

The app emits these events (console.log in dev, GA4-compatible):

| Event | Payload |
|-------|---------|
| `audit_viewed` | company, utm_source, utm_campaign |
| `audit_started` | company |
| `question_answered` | question_id, answer_id |
| `audit_completed` | category, score |
| `cta_clicked` | calendly_url, category |

### Connecting to GA4

Add this to your HTML head:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Events will automatically be sent to GA4 when `window.gtag` is available.

## Webflow Embedding

### Option A: Script Mount (Recommended)

1. In Webflow, add an Embed element where you want the quiz
2. Paste this code:

```html
<div id="rf-agency-audit"></div>
<script>
  (function() {
    var container = document.getElementById('rf-agency-audit');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://YOUR_DOMAIN/?company=' + encodeURIComponent(window.rfCompany || '');
    iframe.style.cssText = 'width:100%;height:700px;border:none;border-radius:16px;';
    iframe.allow = 'clipboard-write';
    container.appendChild(iframe);
  })();
</script>
```

3. Replace `YOUR_DOMAIN` with your hosted domain
4. Optional: Set `window.rfCompany` to personalize

### Option B: iFrame Embed (Fallback)

```html
<iframe 
  src="https://YOUR_DOMAIN/?company=Acme%20Recruiting&utm_source=webflow" 
  width="100%" 
  height="700" 
  frameborder="0"
  style="border-radius: 16px; max-width: 800px; margin: 0 auto; display: block;"
></iframe>
```

### Responsive Sizing Tips

- Set `max-width: 800px` and `margin: 0 auto` for centered layout
- Use `min-height: 700px` to prevent content clipping
- The quiz is fully responsive and works on mobile

## Scoring Logic

Each answer has a score (1-4 points). Total scores map to categories:

| Score Range | Category |
|-------------|----------|
| 4-7 | Reactive (Critical) |
| 8-11 | Manual (High Risk) |
| 12-14 | Managed (Improving) |
| 15-16 | High-Velocity (Excellent) |

## Tech Stack

- React 18 + TypeScript
- Vite for bundling
- Tailwind CSS for styling
- Lucide React for icons
- No external dependencies for quiz logic

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   └── quiz/
│   │       ├── AnswerCard.tsx
│   │       ├── Header.tsx
│   │       ├── QuestionScreen.tsx
│   │       ├── QuizContainer.tsx
│   │       ├── ResultScreen.tsx
│   │       └── WelcomeScreen.tsx
│   ├── lib/
│   │   ├── analytics.ts
│   │   ├── personalization.ts
│   │   ├── quiz-config.ts
│   │   └── quiz-context.tsx
│   └── pages/
│       └── quiz.tsx
```

## License

Proprietary - Recruiterflow
