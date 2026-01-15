# Design Guidelines: Recruiterflow Agency Velocity Audit

## Design Approach
**Reference-Based**: Drawing inspiration from Linear's clean typography, Typeform's conversational quiz flow, and Stripe's minimalist precision. This creates a professional, trustworthy diagnostic experience.

## Layout System
**Centered Card Pattern**: All screens use a centered, elevated card container:
- Desktop: max-w-3xl (768px) centered container
- Mobile: Full-width with px-4 edge padding
- Vertical centering: min-h-screen flex items-center justify-center
- Card elevation: Subtle shadow with rounded corners (rounded-2xl)

**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, and 16 for consistent rhythm
- Between major sections: space-y-8 or space-y-12
- Card padding: p-8 md:p-12
- Button spacing: gap-4

## Typography

**Hierarchy**:
- Main Titles: text-3xl md:text-4xl font-bold leading-tight
- Question Titles: text-2xl md:text-3xl font-semibold
- Subtitles/Descriptions: text-lg md:text-xl font-normal opacity-80
- Answer Labels: text-base md:text-lg font-medium
- Answer Subtext: text-sm opacity-70
- Progress Indicator: text-sm font-medium
- Result Category Badge: text-xs uppercase tracking-wide font-semibold

**Font Stack**: Use Inter or DM Sans from Google Fonts for professional, readable interface typography

## Component Library

**Welcome Screen (Screen 0)**:
- Logo placement: Top-center, mb-8
- Title and subtitle stack: space-y-4, text-center
- Primary CTA: Large button, mt-12, full-width on mobile, auto-width centered on desktop
- Container: Centered card with generous padding

**Question Screens (1-4)**:
- Header: Fixed top section with back arrow (top-left), progress indicator (top-right), mb-8
- Question title and subtitle: Centered, space-y-3, mb-8
- Answer grid: 2x2 grid on desktop (grid-cols-2 gap-4), stack on mobile (grid-cols-1 gap-3)
- Each answer card: Clickable card with icon (top), label (bold), subtext (light), p-6, hover lift effect, rounded-xl border
- Auto-advance on selection with subtle transition

**Results Screen**:
- Category badge: Inline badge with rounded-full, px-4 py-2, centered, mb-4
- Category title: Large heading, text-center, mb-6
- Explanation: Centered text block, max-w-2xl, mb-8
- Primary CTA: Large prominent button, centered

**Buttons**:
- Primary CTA: px-8 py-4, rounded-xl, text-base font-semibold, full-width mobile / auto-width desktop
- Back navigation: Icon-only circle button, w-10 h-10, rounded-full
- Answer cards: Full card clickable with hover state (transform scale-102, subtle shadow increase)

**Progress Indicator**: 
- Simple text "1/4", "2/4" etc. in top-right
- Small circular indicators below (4 dots, filled/unfilled) for visual reinforcement

**Icons**: 
- Use Heroicons (outline style) via CDN
- Answer card icons: w-12 h-12, mb-4
- Back arrow: w-5 h-5
- Consistent stroke-width across all icons

## Micro-interactions
- Answer card hover: Subtle scale and shadow increase
- Selection state: Border highlight and background tint on selected card
- Transitions: Use transition-all duration-200 for smooth interactions
- Page transitions: Fade between question screens (300ms)

## Mobile Responsiveness
- Single column layout below md breakpoint
- Reduce padding: p-6 on mobile vs p-12 on desktop
- Stack answer cards vertically with gap-3
- Full-width buttons on mobile
- Maintain touch-friendly tap targets (min 44px height)

## Accessibility
- All interactive cards: keyboard focusable with visible focus rings
- Semantic HTML: proper heading hierarchy, button elements
- ARIA labels for back navigation and progress
- Color contrast ratios meeting WCAG AA
- Focus indicators: ring-2 ring-offset-2

## Visual Consistency
- Border radius: rounded-xl for cards, rounded-2xl for main container, rounded-full for badges
- Consistent shadow depth across all elevated elements
- Uniform spacing between all similar element types
- Icon sizes consistent within context (navigation vs answer cards)

## Images
This tool does not use hero images. It's a focused, utility-driven quiz interface where clarity and usability take precedence over decorative imagery.