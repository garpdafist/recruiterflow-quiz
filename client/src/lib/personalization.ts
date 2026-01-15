export interface PersonalizationParams {
  company?: string;
  persona?: string;
  industry?: string;
  source?: string;
  utm_source?: string;
  utm_campaign?: string;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .substring(0, 100);
}

export function getPersonalizationParams(): PersonalizationParams {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const result: PersonalizationParams = {};

  const allowedParams: (keyof PersonalizationParams)[] = [
    "company",
    "persona",
    "industry",
    "source",
    "utm_source",
    "utm_campaign"
  ];

  allowedParams.forEach((key) => {
    const value = params.get(key);
    if (value) {
      result[key] = sanitizeInput(value);
    }
  });

  return result;
}

export function getPersonalizedTitle(baseTitle: string, params: PersonalizationParams): string {
  if (params.company) {
    return `${baseTitle} for ${params.company}`;
  }
  return baseTitle;
}

export function buildCalendlyUrl(baseUrl: string, params: {
  category?: string;
  score?: number;
  personalization?: PersonalizationParams;
}): string {
  const url = new URL(baseUrl);
  
  if (params.category) {
    url.searchParams.set("category", params.category);
  }
  if (params.score !== undefined) {
    url.searchParams.set("score", String(params.score));
  }
  if (params.personalization) {
    Object.entries(params.personalization).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
  }
  
  return url.toString();
}
