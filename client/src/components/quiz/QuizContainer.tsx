import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { QuizProvider, useQuiz } from "@/lib/quiz-context";
import { WelcomeScreen } from "./WelcomeScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";
import { cn } from "@/lib/utils";

function QuizContent() {
  const { currentStep, isLoading } = useQuiz();
  
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <>
      {currentStep === "welcome" && <WelcomeScreen />}
      {currentStep === "question" && <QuestionScreen />}
      {currentStep === "result" && <ResultScreen />}
    </>
  );
}

export function QuizContainer() {
  return (
    <QuizProvider>
      <div 
        className={cn(
          "min-h-screen w-full flex items-center justify-center",
          "bg-background p-4 md:p-8"
        )}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }}
      >
        <Card 
          className={cn(
            "w-full max-w-3xl",
            "p-6 md:p-10 lg:p-12",
            "shadow-xl",
            "min-h-[600px] md:min-h-[650px]",
            "flex flex-col"
          )}
          data-testid="card-quiz-container"
        >
          <QuizContent />
        </Card>
      </div>
    </QuizProvider>
  );
}
