# Product Requirements Document (PRD)

## Agency Velocity Audit

**Version:** 1.0  
**Last Updated:** January 2026  
**Owner:** Recruiterflow Marketing

---

## Executive Summary

The Agency Velocity Audit is an interactive micro-tool designed to help recruitment agencies benchmark their operational maturity. It serves as a lead generation mechanism by providing valuable insights to prospects while capturing qualified leads for the sales team.

## Problem Statement

Recruitment agency owners and leaders often lack visibility into how their operational practices compare to industry best practices. They may be:
- Unaware of inefficiencies in their current processes
- Uncertain about which areas to prioritize for improvement
- Hesitant to engage with sales without first understanding their own needs

## Solution

A self-service diagnostic tool that:
1. Takes less than 1 minute to complete
2. Asks 4 targeted questions about key operational areas
3. Provides immediate, personalized feedback
4. Offers a clear next step (book a consultation)

## Target Users

### Primary: Agency Owners/Directors
- Running agencies with 5-50 recruiters
- Looking to scale operations
- Concerned about visibility and efficiency

### Secondary: Operations Managers
- Responsible for process improvement
- Evaluating tools and systems
- Reporting to leadership

## User Journey

```
Awareness → Landing Page → Start Audit → Answer Questions → View Results → Book Demo
```

### Detailed Flow

1. **Awareness**: User discovers audit via LinkedIn ad, email, or website
2. **Landing**: User reads value proposition ("Benchmark your agency in 30 seconds")
3. **Welcome**: User sees personalized greeting (if company param provided)
4. **Questions**: User answers 4 multiple-choice questions
5. **Results**: User receives category + diagnostic explanation
6. **CTA**: User clicks to book a demo call

## Features

### Core Features

| Feature | Description | Priority |
|---------|-------------|----------|
| 4-Question Quiz | Interactive card-based answer selection | P0 |
| Scoring Engine | Calculate total score, map to category | P0 |
| Results Screen | Show category, explanation, CTA | P0 |
| Calendly Integration | Book demo directly from results | P0 |
| Progress Indicator | Show question progress (1/4, 2/4, etc.) | P1 |
| Back Navigation | Allow going back to previous questions | P1 |
| State Persistence | Remember progress on page refresh | P1 |

### Personalization Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Company Personalization | Show company name in title if provided | P1 |
| UTM Tracking | Pass UTM params to analytics | P1 |
| Calendly Prefill | Pass context to Calendly booking | P2 |

### Analytics Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Event Tracking | Emit GA4-compatible events | P0 |
| Funnel Tracking | Track drop-off at each step | P1 |
| Score Distribution | Understand how users score | P2 |

## Questions & Scoring

### Question Framework

Each question maps to a key operational dimension:

1. **Q1: Target Visibility** - How fast do you spot missed targets?
2. **Q2: Forecasting Method** - What drives your forecasting?
3. **Q3: Activity Tracking** - How do you track recruiter activity?
4. **Q4: Performance Visibility** - How visible is performance data across the org?

### Scoring Logic

- **Option A**: 3 points (Best practice)
- **Option B**: 2 points (Good, room for improvement)
- **Option C**: 1 point (Manual/limited)
- **Option D**: 0 points (Lacking/reactive)

### Category Mapping

| Score | Category | Urgency Level |
|-------|----------|---------------|
| 0-3 | Reactive | Critical |
| 4-6 | Manual | Developing |
| 7-9 | Managed | Solid |
| 10-12 | High-Velocity | Excellent |

## Success Metrics

### Primary Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Completion Rate | >70% | (Completed / Started) |
| CTA Click Rate | >40% | (CTA Clicks / Completed) |
| Demo Booking Rate | >20% | (Booked / CTA Clicks) |

### Secondary Metrics

| Metric | Purpose |
|--------|---------|
| Avg. Score | Understand target market maturity |
| Category Distribution | Identify common pain points |
| Time to Complete | Optimize question count/complexity |
| Drop-off by Question | Identify problematic questions |

## Technical Requirements

See [TRD.md](./TRD.md) for detailed technical requirements.

### Summary

- React + TypeScript + Vite
- Static build (no server required)
- Config-driven content (quiz.json)
- Webflow-embeddable (iframe + script)
- Mobile responsive
- GA4 analytics integration

## Content Requirements

### Tone & Voice

- **Professional but approachable**: Not salesy or pushy
- **Diagnostic, not judgmental**: Frame results as insights, not criticism
- **Action-oriented**: Clear next step without pressure

### Copy Guidelines

- Questions should be clear and jargon-free
- Answer options should be distinct (no overlapping meanings)
- Results should explain "what this means" not "what's wrong"
- CTA should feel like an invitation, not a demand

## Timeline & Milestones

| Milestone | Description | Status |
|-----------|-------------|--------|
| MVP Launch | Core quiz functionality | Complete |
| Analytics Integration | GA4 event tracking | Complete |
| Webflow Embed | Iframe + script embed options | Complete |
| ABM Personalization | URL param personalization | Complete |

## Future Considerations

### Phase 2 Potential Features

- Email capture before results
- PDF report download
- Benchmark comparison ("You vs. average")
- Industry-specific questions
- Multi-language support

### A/B Testing Opportunities

- Question wording
- CTA copy and placement
- Results messaging
- Number of questions (3 vs 4 vs 5)

---

## Appendix: Competitive Analysis

Similar tools in the market:
- HubSpot Website Grader
- Salesforce Maturity Assessment
- Gartner Digital IQ

Key differentiators:
- Speed (30 seconds vs 5+ minutes)
- Recruitment-specific focus
- No email gate before results
