import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { quizConfig } from "@/lib/quiz-config";
import { getPersonalizedTitle } from "@/lib/personalization";
import { useQuiz } from "@/lib/quiz-context";

export function WelcomeScreen() {
  const { startQuiz, personalization } = useQuiz();
  const { metadata } = quizConfig;
  
  const personalizedTitle = getPersonalizedTitle(metadata.title, personalization);
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-12">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto px-4">
          <div className="w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 flex items-center justify-center">
            <Rocket className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
          </div>
          
          <h1 
            className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4"
            data-testid="text-title"
          >
            {personalizedTitle}
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 md:mb-12"
            data-testid="text-subtitle"
          >
            {metadata.subtitle}
          </p>
          
          <Button
            size="lg"
            onClick={startQuiz}
            className="px-10 py-6 text-base md:text-lg font-semibold rounded-xl w-full md:w-auto"
            data-testid="button-start"
          >
            {metadata.welcome_cta}
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            {metadata.time_estimate}
          </p>
        </div>
      </div>
    </div>
  );
}
