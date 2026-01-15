import { AlertTriangle, TrendingUp, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "./Header";
import { quizConfig } from "@/lib/quiz-config";
import { useQuiz } from "@/lib/quiz-context";
import { buildCalendlyUrl } from "@/lib/personalization";
import { emitAnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  critical: {
    bg: "bg-destructive/10 border-destructive/20",
    text: "text-destructive",
    icon: AlertTriangle
  },
  warning: {
    bg: "bg-accent border-accent-border",
    text: "text-accent-foreground",
    icon: Target
  },
  moderate: {
    bg: "bg-primary/10 border-primary/20",
    text: "text-primary",
    icon: TrendingUp
  },
  success: {
    bg: "bg-accent border-primary/30",
    text: "text-primary",
    icon: CheckCircle
  }
};

export function ResultScreen() {
  const { computedCategory, totalScore, personalization, goBack } = useQuiz();
  
  if (!computedCategory) {
    return null;
  }
  
  const style = badgeStyles[computedCategory.badge_color] || badgeStyles.moderate;
  const BadgeIcon = style.icon;
  
  const calendlyUrl = buildCalendlyUrl(quizConfig.cta.default_calendly_url, {
    category: computedCategory.category_id,
    score: totalScore,
    personalization
  });
  
  const handleCtaClick = () => {
    emitAnalyticsEvent("cta_clicked", {
      calendly_url: calendlyUrl,
      category: computedCategory.category_id
    });
    
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };
  
  const descriptionParts = computedCategory.description.split("\n\n");
  
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <Header showBack={true} onBack={goBack} />
      
      <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
          <div 
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6",
              style.bg
            )}
            data-testid="badge-result"
          >
            <BadgeIcon className={cn("w-4 h-4", style.text)} />
            <span className={cn("text-xs font-bold uppercase tracking-wide", style.text)}>
              {computedCategory.badge_text}
            </span>
          </div>
          
          <h2 
            className="text-lg md:text-xl font-medium text-muted-foreground mb-2"
            data-testid="text-result-category"
          >
            {computedCategory.title}
          </h2>
          
          <h1 
            className="text-2xl md:text-3xl font-bold text-foreground mb-6"
            data-testid="text-result-title"
          >
            {computedCategory.headline}
          </h1>
          
          <div className="space-y-4 mb-8 md:mb-10">
            {descriptionParts.map((paragraph, index) => (
              <p 
                key={index}
                className="text-base text-muted-foreground leading-relaxed"
                data-testid={`text-result-description-${index}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          
          <Card className="w-full max-w-md p-6 md:p-8 bg-card">
            <Button
              size="lg"
              onClick={handleCtaClick}
              className="w-full px-8 py-6 text-base font-semibold rounded-xl mb-3"
              data-testid="button-cta"
            >
              {computedCategory.cta_label}
            </Button>
            
            <p className="text-sm text-muted-foreground">
              15-20 minutes · No prep needed
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
