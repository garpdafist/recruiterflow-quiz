# Technical Requirements Document (TRD)

## Agency Velocity Audit

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Engineering Team

---

## Overview

This document outlines the technical architecture, implementation details, and deployment specifications for the Recruiterflow Agency Velocity Audit application.

## Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS |
| State Management | React Context + localStorage |
| Routing | wouter |
| UI Components | Radix UI (shadcn/ui) |

### Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── quiz/
│   │   │   │   ├── QuizContainer.tsx    # Main container with provider
│   │   │   │   ├── WelcomeScreen.tsx    # Welcome/intro screen
│   │   │   │   ├── QuestionScreen.tsx   # Question display
│   │   │   │   ├── ResultScreen.tsx     # Results with CTA
│   │   │   │   ├── AnswerCard.tsx       # Individual answer option
│   │   │   │   └── Header.tsx           # Header with back/progress
│   │   │   └── ui/                      # shadcn/ui components
│   │   ├── lib/
│   │   │   ├── quiz-config.ts           # TypeScript quiz configuration
│   │   │   ├── quiz-context.tsx         # React context for quiz state
│   │   │   ├── personalization.ts       # URL param handling
│   │   │   └── analytics.ts             # Event emitting
│   │   ├── pages/
│   │   │   └── quiz.tsx                 # Quiz page
│   │   ├── App.tsx
│   │   └── index.css
│   └── index.html
├── public/
│   └── quiz.json                        # JSON config (for reference)
├── docs/
│   ├── README.md
│   ├── PRD.md
│   └── TRD.md
└── dist/
    └── public/                          # Production build output
```

## State Management

### Quiz Context

```typescript
interface QuizState {
  currentStep: 'welcome' | 'question' | 'result';
  currentQuestionIndex: number;
  answers: Record<string, string>;
  totalScore: number;
  personalization: PersonalizationParams;
}
```

### State Persistence

- State is persisted to `localStorage` under key `rf-agency-audit-state`
- On page load, state is restored and score is recomputed from answers
- This handles config changes gracefully (scores recalculated from current config)

### Score Computation

```typescript
function computeScore(answers: Record<string, string>): number {
  return Object.entries(answers).reduce((total, [questionId, answerId]) => {
    const question = quizConfig.questions.find(q => q.id === questionId);
    const option = question?.options.find(o => o.id === answerId);
    return total + (option?.score ?? 0);
  }, 0);
}
```

## Configuration

### Runtime JSON Loading

The quiz configuration is loaded at runtime from `/quiz.json`. This allows content changes without code modifications.

- **File location**: `client/public/quiz.json`
- **TypeScript types**: `client/src/lib/quiz-config.ts` (types only, no hardcoded content)
- **Loading**: `loadQuizConfig()` fetches JSON on app initialization
- **State**: Config is cached and provided via React Context

### quiz.json Schema

```typescript
interface QuizConfig {
  metadata: {
    title: string;
    subtitle: string;
    welcome_cta: string;
    time_estimate: string;
  };
  questions: Array<{
    id: string;
    title: string;
    subtitle: string;
    options: Array<{
      id: string;
      label: string;
      subtext: string;
      icon: string;  // Emoji character
      score: number; // 0-3
    }>;
  }>;
  results: Array<{
    category_id: string;
    min_score: number;
    max_score: number;
    title: string;
    badge_text: string;
    badge_color: 'critical' | 'warning' | 'moderate' | 'success';
    headline: string;
    description: string;
    cta_label: string;
  }>;
  cta: {
    default_label: string;
    default_calendly_url: string;
  };
}
```

### Scoring Configuration

| Option | Score |
|--------|-------|
| A (first option) | 3 |
| B (second option) | 2 |
| C (third option) | 1 |
| D (fourth option) | 0 |

### Category Thresholds

| Category | Min Score | Max Score |
|----------|-----------|-----------|
| Reactive | 0 | 3 |
| Manual | 4 | 6 |
| Managed | 7 | 9 |
| High-Velocity | 10 | 12 |

## Personalization

### URL Parameters

```typescript
interface PersonalizationParams {
  company?: string;
  persona?: string;
  industry?: string;
  utm_source?: string;
  utm_campaign?: string;
}
```

### Sanitization

All URL parameters are sanitized to prevent XSS:

```typescript
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 100);
}
```

### Usage

```typescript
// Welcome title personalization
if (personalization.company) {
  title = `Agency Velocity Audit for ${personalization.company}`;
}

// Calendly URL prefill
const calendlyUrl = buildCalendlyUrl(baseUrl, {
  category,
  score,
  personalization
});
```

## Analytics

### Event Interface

```typescript
interface AnalyticsEvent {
  event: string;
  timestamp: string;
  [key: string]: any;
}
```

### Events Emitted

| Event | Trigger | Payload |
|-------|---------|---------|
| `audit_viewed` | Page load | personalization params |
| `audit_started` | Start button click | - |
| `question_answered` | Answer selection | question_id, answer_id |
| `audit_completed` | Results shown | category, score |
| `cta_clicked` | CTA button click | calendly_url, category |

### Implementation

```typescript
function emitAnalyticsEvent(eventName: string, data?: object) {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...data
  };
  
  // Development: log to console
  console.log('[Analytics]', event);
  
  // Production: send to GA4
  if (window.gtag) {
    window.gtag('event', eventName, data);
  }
}
```

## Build & Deployment

### Development

```bash
npm install
npm run dev
# Runs on http://localhost:5000
```

### Production Build

```bash
npm run build
# Output: dist/public/
```

### Build Output

```
dist/public/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── quiz.json
```

### Deployment Options

1. **Static Hosting**: Vercel, Netlify, AWS S3 + CloudFront
2. **CDN**: CloudFlare, Fastly
3. **Self-Hosted**: nginx, Apache

## Embedding

### iframe Method

```html
<iframe 
  src="https://audit.recruiterflow.com/?company=ClientName" 
  width="100%" 
  height="700" 
  frameborder="0"
  style="border: none; border-radius: 12px;"
></iframe>
```

### Script Mount Method

```html
<div id="rf-agency-audit"></div>
<script>
  window.RF_AUDIT_CONFIG = {
    container: '#rf-agency-audit',
    company: 'ClientName'
  };
</script>
<script src="https://audit.recruiterflow.com/assets/index.js" defer></script>
```

## Security Considerations

### Input Sanitization

- All URL parameters are sanitized before use
- No raw HTML injection possible
- Content Security Policy recommended for production

### Recommended CSP

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  frame-src https://calendly.com;
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Safari | iOS 14+ |
| Chrome Android | 90+ |

## Performance

### Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Bundle Size (gzipped) | < 100KB |

### Optimizations

- Code splitting (if needed for future features)
- Asset optimization via Vite
- Lazy loading of non-critical components
- Minimal dependencies

## Testing

### Manual Testing Checklist

- [ ] Welcome screen loads correctly
- [ ] All 4 questions display
- [ ] Answer selection works
- [ ] Progress indicator updates
- [ ] Back navigation preserves state
- [ ] Results show correct category
- [ ] CTA opens Calendly
- [ ] URL params personalize content
- [ ] Analytics events fire
- [ ] Mobile responsive
- [ ] State persists on refresh

### Automated Testing (Future)

- Unit tests for scoring logic
- Integration tests for quiz flow
- E2E tests with Playwright

## Monitoring

### Recommended Monitoring

- Error tracking (Sentry)
- Analytics (GA4)
- Uptime monitoring (Pingdom, UptimeRobot)

### Key Metrics to Track

- Page load success rate
- Quiz completion rate
- Error rate by component
- CTA click rate

---

## Changelog

### v1.0.0 (January 2026)
- Initial release
- 4-question quiz with scoring
- URL personalization
- GA4 analytics integration
- Webflow embedding support
