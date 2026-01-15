type AnalyticsEventName = 
  | "audit_viewed"
  | "audit_started"
  | "question_answered"
  | "audit_completed"
  | "cta_clicked";

interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: object) => void;
  }
}

export function emitAnalyticsEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload
  };
  
  console.log("[Analytics]", event);

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, payload);
  }
}
