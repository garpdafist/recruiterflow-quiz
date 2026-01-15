import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoUrl from "@assets/Recuiterflow_logo-02_1768485505737.png";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  currentQuestion?: number;
  totalQuestions?: number;
  showProgress?: boolean;
}

export function Header({
  showBack = false,
  onBack,
  currentQuestion,
  totalQuestions,
  showProgress = false
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between w-full pb-4 md:pb-6 border-b border-border/50">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
            aria-label="Go back"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <img 
            src={logoUrl} 
            alt="Recruiterflow" 
            className="h-6 md:h-7 w-auto"
          />
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground text-sm">
            Agency Audit
          </span>
        </div>
      </div>
      
      {showProgress && currentQuestion !== undefined && totalQuestions !== undefined && (
        <div className="flex items-center gap-3">
          <div 
            className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
            aria-label={`Question ${currentQuestion} of ${totalQuestions}`}
            data-testid="text-progress"
          >
            {currentQuestion} / {totalQuestions}
          </div>
        </div>
      )}
    </header>
  );
}

export function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mt-4" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-colors duration-200",
            i < current ? "bg-primary" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}
