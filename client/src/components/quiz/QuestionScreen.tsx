import { Header, ProgressDots } from "./Header";
import { AnswerCard } from "./AnswerCard";
import { quizConfig } from "@/lib/quiz-config";
import { useQuiz } from "@/lib/quiz-context";
import { cn } from "@/lib/utils";

export function QuestionScreen() {
  const { 
    currentQuestionIndex, 
    answers, 
    answerQuestion, 
    goBack,
    totalQuestions 
  } = useQuiz();
  
  const question = quizConfig.questions[currentQuestionIndex];
  const selectedOptionId = answers[question.id];
  
  const handleSelectOption = (optionId: string, score: number) => {
    setTimeout(() => {
      answerQuestion(question.id, optionId, score);
    }, 200);
  };
  
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <Header
        showBack={true}
        onBack={goBack}
        showProgress={true}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      
      <div className="flex-1 flex flex-col py-6 md:py-10">
        <div className="mb-6 md:mb-8">
          <h2 
            className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2 md:mb-3"
            data-testid="text-question-title"
          >
            {question.title}
          </h2>
          <p 
            className="text-base md:text-lg text-muted-foreground"
            data-testid="text-question-subtitle"
          >
            {question.subtitle}
          </p>
          
          <ProgressDots current={currentQuestionIndex + 1} total={totalQuestions} />
        </div>
        
        <div 
          className={cn(
            "grid gap-3 md:gap-4",
            "grid-cols-1 md:grid-cols-2"
          )}
        >
          {question.options.map((option) => (
            <AnswerCard
              key={option.id}
              label={option.label}
              subtext={option.subtext}
              icon={option.icon}
              isSelected={selectedOptionId === option.id}
              onClick={() => handleSelectOption(option.id, option.score)}
              testId={`card-answer-${option.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
