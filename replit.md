# Recruiterflow Agency Velocity Audit

## Overview
An interactive 4-question audit tool for recruitment agencies to benchmark their operational maturity. Built with React + TypeScript + Tailwind CSS.

## Architecture

### Frontend Structure
- `client/src/pages/quiz.tsx` - Main quiz page
- `client/src/components/quiz/` - All quiz components
  - `QuizContainer.tsx` - Main container with provider
  - `WelcomeScreen.tsx` - Welcome/intro screen with rocket emoji
  - `QuestionScreen.tsx` - Question display with answer cards
  - `ResultScreen.tsx` - Results with category and CTA
  - `AnswerCard.tsx` - Individual answer option card with emoji icons
  - `Header.tsx` - Header with Recruiterflow logo, back button and progress

### State Management
- `client/src/lib/quiz-context.tsx` - React context for quiz state
- Uses localStorage for persistence across page refreshes
- Manages: currentStep, answers, score, category

### Configuration
- `client/public/quiz.json` - All quiz content (loaded at runtime)
- `client/src/lib/quiz-config.ts` - TypeScript types for config schema
- `client/src/lib/personalization.ts` - URL parameter handling for ABM
- `client/src/lib/analytics.ts` - GA4-compatible event emitting

### Documentation
- `docs/README.md` - Comprehensive usage guide
- `docs/PRD.md` - Product Requirements Document
- `docs/TRD.md` - Technical Requirements Document

## Key Features
1. **Config-driven content** - All questions, answers, and results in quiz-config.ts
2. **Personalization** - URL params: company, persona, industry, utm_source, utm_campaign
3. **Analytics** - Events: audit_viewed, audit_started, question_answered, audit_completed, cta_clicked
4. **Scoring** - Each answer has score (A=3, B=2, C=1, D=0), total 0-12 maps to 4 categories
5. **Webflow embed** - Works as iframe or script mount
6. **iOS Emojis** - Native emoji icons for answer cards and welcome screen

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to dist/public)

## URL Parameters for Testing
```
/?company=Acme%20Recruiting&utm_source=linkedin
```

## Scoring Categories
- 0-3 points: Reactive (Critical)
- 4-6 points: Manual (Developing)
- 7-9 points: Managed (Solid)
- 10-12 points: High-Velocity (Excellent)

## Questions
1. How fast do you spot missed targets?
2. What drives your forecasting?
3. How do you track recruiter activity?
4. How visible is individual + team performance data across the org?
