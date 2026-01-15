import { cn } from "@/lib/utils";

interface AnswerCardProps {
  label: string;
  subtext: string;
  icon: string;
  isSelected?: boolean;
  onClick: () => void;
  testId?: string;
}

export function AnswerCard({
  label,
  subtext,
  icon,
  isSelected = false,
  onClick,
  testId
}: AnswerCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full p-5 md:p-6 rounded-xl border-2 text-left transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "hover:border-primary/40 hover:shadow-md hover:scale-[1.02]",
        isSelected
          ? "border-primary bg-accent shadow-md"
          : "border-border bg-card"
      )}
      data-testid={testId}
      aria-pressed={isSelected}
    >
      <div className="flex flex-col gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted/50">
          <span className="text-2xl" role="img" aria-hidden="true">
            {icon}
          </span>
        </div>
        
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            {label}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {subtext}
          </p>
        </div>
      </div>
    </button>
  );
}
