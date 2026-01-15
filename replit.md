# Recruiterflow Agency Velocity Audit

## Overview
An interactive 4-question audit tool for recruitment agencies to benchmark their operational maturity. Built with React + TypeScript + Tailwind CSS.

## Architecture

### Frontend Structure
- `client/src/pages/quiz.tsx` - Main quiz page
- `client/src/components/quiz/` - All quiz components
  - `QuizContainer.tsx` - Main container with provider
  - `WelcomeScreen.tsx` - Welcome/intro screen
  - `QuestionScreen.tsx` - Question display with answer cards
  - `ResultScreen.tsx` - Results with category and CTA
  - `AnswerCard.tsx` - Individual answer option card
  - `Header.tsx` - Header with back button and progress

### State Management
- `client/src/lib/quiz-context.tsx` - React context for quiz state
- Uses localStorage for persistence across page refreshes
- Manages: currentStep, answers, score, category

### Configuration
- `client/src/lib/quiz-config.ts` - All quiz content (questions, answers, results, CTAs)
- `client/src/lib/personalization.ts` - URL parameter handling for ABM
- `client/src/lib/analytics.ts` - GA4-compatible event emitting

## Key Features
1. **Config-driven content** - All questions, answers, and results in quiz-config.ts
2. **Personalization** - URL params: company, persona, industry, utm_source, utm_campaign
3. **Analytics** - Events: audit_viewed, audit_started, question_answered, audit_completed, cta_clicked
4. **Scoring** - Each answer has score (1-4), total maps to 4 categories
5. **Webflow embed** - Works as iframe or script mount

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production

## URL Parameters for Testing
```
/?company=Acme%20Recruiting&utm_source=linkedin
```

## Scoring Categories
- 4-7 points: Reactive (Critical)
- 8-11 points: Manual (High Risk)
- 12-14 points: Managed (Improving)
- 15-16 points: High-Velocity (Excellent)
