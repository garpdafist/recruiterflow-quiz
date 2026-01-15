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
          icon: "zap",
          score: 4
        },
        {
          id: "q1_b",
          label: "Weekly",
          subtext: "After checking reports",
          icon: "bar-chart",
          score: 3
        },
        {
          id: "q1_c",
          label: "Monthly",
          subtext: "At the end of the month",
          icon: "calendar",
          score: 2
        },
        {
          id: "q1_d",
          label: "Too late",
          subtext: "When it's a problem",
          icon: "flame",
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
          icon: "bot",
          score: 4
        },
        {
          id: "q2_b",
          label: "BI Tools",
          subtext: "Manual dashboards",
          icon: "trending-up",
          score: 3
        },
        {
          id: "q2_c",
          label: "Excel / Sheets",
          subtext: "Manual exports",
          icon: "file-spreadsheet",
          score: 2
        },
        {
          id: "q2_d",
          label: "Meetings",
          subtext: "Ad-hoc updates",
          icon: "users",
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
          icon: "cpu",
          score: 4
        },
        {
          id: "q3_b",
          label: "Daily reports",
          subtext: "Recruiters submit logs",
          icon: "clipboard-list",
          score: 3
        },
        {
          id: "q3_c",
          label: "Weekly check-ins",
          subtext: "Team meetings",
          icon: "calendar-check",
          score: 2
        },
        {
          id: "q3_d",
          label: "We don't",
          subtext: "Trust-based system",
          icon: "help-circle",
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
          icon: "bell",
          score: 4
        },
        {
          id: "q4_b",
          label: "Within a week",
          subtext: "Pipeline reviews",
          icon: "clock",
          score: 3
        },
        {
          id: "q4_c",
          label: "When asked",
          subtext: "Client follow-ups",
          icon: "phone",
          score: 2
        },
        {
          id: "q4_d",
          label: "Too late",
          subtext: "After it's lost",
          icon: "x-circle",
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
      badge_text: "THREAT LEVEL: CRITICAL",
      badge_color: "critical",
      headline: "You are currently flying blind.",
      description: "Our analysis shows your agency relies heavily on lagging indicators. By the time you spot a revenue gap, it's often too late to fix it.\n\nCompetitors with automated tracking are moving 3x faster than you.",
      cta_label: "Fix Your Data Visibility"
    },
    {
      category_id: "manual",
      min_score: 8,
      max_score: 11,
      title: "The 'Manual' Agency",
      badge_text: "THREAT LEVEL: HIGH",
      badge_color: "warning",
      headline: "Your team is spending too much time on reports.",
      description: "You have some visibility, but it's inconsistent and labor-intensive. Manual processes mean data is often outdated by the time decisions are made.\n\nYou're leaving revenue on the table with every delayed insight.",
      cta_label: "Automate Your Reporting"
    },
    {
      category_id: "managed",
      min_score: 12,
      max_score: 14,
      title: "The 'Managed' Agency",
      badge_text: "STATUS: IMPROVING",
      badge_color: "moderate",
      headline: "You're on the right track.",
      description: "Your agency has repeatable processes and decent visibility. However, there's still room to move from reactive to proactive operations.\n\nSmall optimizations could unlock significant efficiency gains.",
      cta_label: "Optimize Your Workflow"
    },
    {
      category_id: "high-velocity",
      min_score: 15,
      max_score: 16,
      title: "The 'High-Velocity' Agency",
      badge_text: "STATUS: EXCELLENT",
      badge_color: "success",
      headline: "You're operating at peak performance.",
      description: "Congratulations! Your agency has real-time visibility and proactive operations. You're in the top tier of recruiting agencies.\n\nLet's explore how to maintain and extend your competitive advantage.",
      cta_label: "Explore Advanced Features"
    }
  ],
  cta: {
    default_label: "Talk to our team",
    default_calendly_url: "https://calendly.com/recruiterflow/demo"
  }
};
