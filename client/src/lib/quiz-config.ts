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

let cachedConfig: QuizConfig | null = null;

export async function loadQuizConfig(): Promise<QuizConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }
  
  const response = await fetch('/quiz.json');
  if (!response.ok) {
    throw new Error('Failed to load quiz configuration');
  }
  
  cachedConfig = await response.json();
  return cachedConfig!;
}

export function getQuizConfig(): QuizConfig {
  if (!cachedConfig) {
    throw new Error('Quiz config not loaded. Call loadQuizConfig() first.');
  }
  return cachedConfig;
}
