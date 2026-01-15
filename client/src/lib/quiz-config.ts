export interface QuizOption {
  id: string;
  label: string;
  subtext: string;
  icon: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export interface QuizResult {
  category_id: string;
  min_score: number;
  max_score: number;
  title: string;
  badge_text: string;
  badge_color: "critical" | "warning" | "moderate" | "success";
  headline: string;
  description: string;
  cta_label: string;
}

export interface QuizCTA {
  default_label: string;
  default_calendly_url: string;
}

export interface QuizMetadata {
  title: string;
  subtitle: string;
  welcome_cta: string;
  time_estimate: string;
}

export interface QuizConfig {
  metadata: QuizMetadata;
  questions: QuizQuestion[];
  results: QuizResult[];
  cta: QuizCTA;
}

export const quizConfig: QuizConfig = {
  metadata: {
    title: "Agency Velocity Audit",
    subtitle: "Is your recruitment firm running at full speed? Take this 30-second audit to benchmark your tracking vs. top agencies.",
    welcome_cta: "Start Audit",
    time_estimate: "Takes less than 1 minute"
  },
  questions: [
    {
      id: "q1",
      title: "How fast do you spot missed targets?",
      subtitle: "Thinking about your quarterly placements...",
      options: [
        {
          id: "q1_a",
          label: "Instantly",
          subtext: "Real-time automated data",
          icon: "⚡",
          score: 4
        },
        {
          id: "q1_b",
          label: "Weekly",
          subtext: "After checking reports",
          icon: "📊",
          score: 3
        },
        {
          id: "q1_c",
          label: "Monthly",
          subtext: "At the end of the month",
          icon: "📅",
          score: 2
        },
        {
          id: "q1_d",
          label: "Too late",
          subtext: "When it's a problem",
          icon: "🔥",
          score: 1
        }
      ]
    },
    {
      id: "q2",
      title: "What drives your forecasting?",
      subtitle: "How does your agency track the pipeline?",
      options: [
        {
          id: "q2_a",
          label: "Automation",
          subtext: "Live CRM data",
          icon: "🤖",
          score: 4
        },
        {
          id: "q2_b",
          label: "BI Tools",
          subtext: "Manual dashboards",
          icon: "📈",
          score: 3
        },
        {
          id: "q2_c",
          label: "Excel / Sheets",
          subtext: "Manual exports",
          icon: "📋",
          score: 2
        },
        {
          id: "q2_d",
          label: "Meetings",
          subtext: "Ad-hoc updates",
          icon: "👥",
          score: 1
        }
      ]
    },
    {
      id: "q3",
      title: "How do you track recruiter activity?",
      subtitle: "Monitoring daily sourcing and outreach...",
      options: [
        {
          id: "q3_a",
          label: "Auto-logged",
          subtext: "System captures everything",
          icon: "🖥️",
          score: 4
        },
        {
          id: "q3_b",
          label: "Daily reports",
          subtext: "Recruiters submit logs",
          icon: "📝",
          score: 3
        },
        {
          id: "q3_c",
          label: "Weekly check-ins",
          subtext: "Team meetings",
          icon: "✅",
          score: 2
        },
        {
          id: "q3_d",
          label: "We don't",
          subtext: "Trust-based system",
          icon: "❓",
          score: 1
        }
      ]
    },
    {
      id: "q4",
      title: "When a deal stalls, how fast do you know?",
      subtitle: "Tracking candidate and client engagement...",
      options: [
        {
          id: "q4_a",
          label: "Same day",
          subtext: "Automated alerts",
          icon: "🔔",
          score: 4
        },
        {
          id: "q4_b",
          label: "Within a week",
          subtext: "Pipeline reviews",
          icon: "⏰",
          score: 3
        },
        {
          id: "q4_c",
          label: "When asked",
          subtext: "Client follow-ups",
          icon: "📞",
          score: 2
        },
        {
          id: "q4_d",
          label: "Too late",
          subtext: "After it's lost",
          icon: "❌",
          score: 1
        }
      ]
    }
  ],
  results: [
    {
      category_id: "reactive",
      min_score: 4,
      max_score: 7,
      title: "The 'Reactive' Agency",
      badge_text: "ASSESSMENT: CRITICAL",
      badge_color: "critical",
      headline: "What this means for your agency",
      description: "Agencies at this stage typically discover performance gaps after they've already impacted revenue. Without real-time visibility, your team spends valuable time piecing together information instead of acting on it.\n\nThis often leads to missed targets, delayed course corrections, and difficulty scaling operations predictably.",
      cta_label: "Talk to a Recruiterflow specialist"
    },
    {
      category_id: "manual",
      min_score: 8,
      max_score: 11,
      title: "The 'Manual' Agency",
      badge_text: "ASSESSMENT: DEVELOPING",
      badge_color: "warning",
      headline: "What this means for your agency",
      description: "Your agency has foundational processes, but they require significant manual effort to maintain. Teams at this stage often struggle with data consistency and spend hours on reporting that could be automated.\n\nThe gap between what you know and when you know it creates friction in decision-making and client communication.",
      cta_label: "Talk to a Recruiterflow specialist"
    },
    {
      category_id: "managed",
      min_score: 12,
      max_score: 14,
      title: "The 'Managed' Agency",
      badge_text: "ASSESSMENT: SOLID",
      badge_color: "moderate",
      headline: "What this means for your agency",
      description: "Your agency has established good operational habits with reasonable visibility into performance. The opportunity now is moving from reactive to predictive—anticipating issues before they become problems.\n\nAgencies at this stage often benefit from fine-tuning their existing systems rather than overhauling them.",
      cta_label: "Talk to a Recruiterflow specialist"
    },
    {
      category_id: "high-velocity",
      min_score: 15,
      max_score: 16,
      title: "The 'High-Velocity' Agency",
      badge_text: "ASSESSMENT: EXCELLENT",
      badge_color: "success",
      headline: "What this means for your agency",
      description: "Your agency operates with strong real-time visibility and proactive workflows. You're ahead of most recruiting firms in operational maturity.\n\nAt this stage, the focus shifts to maintaining your edge—scaling what works, identifying blind spots, and preparing for growth.",
      cta_label: "Talk to a Recruiterflow specialist"
    }
  ],
  cta: {
    default_label: "Talk to our team",
    default_calendly_url: "https://calendly.com/recruiterflow/demo"
  }
};
