import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { loadQuizConfig, getQuizConfig, type QuizConfig, type QuizResult } from "./quiz-config";
import { getPersonalizationParams, type PersonalizationParams } from "./personalization";
import { emitAnalyticsEvent } from "./analytics";

export type QuizStep = "welcome" | "question" | "result";

interface QuizState {
  currentStep: QuizStep;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  totalScore: number;
  computedCategory: QuizResult | null;
  personalization: PersonalizationParams;
  isLoading: boolean;
  config: QuizConfig | null;
}

interface QuizContextValue extends Omit<QuizState, 'config'> {
  startQuiz: () => void;
  answerQuestion: (questionId: string, optionId: string, score: number) => void;
  goBack: () => void;
  resetQuiz: () => void;
  totalQuestions: number;
  config: QuizConfig | null;
}

const QuizContext = createContext<QuizContextValue | null>(null);

const STORAGE_KEY = "rf-agency-audit-state";

function loadSavedState(config: QuizConfig): Partial<QuizState> | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.answers && Object.keys(parsed.answers).length > 0) {
        let recomputedScore = 0;
        Object.entries(parsed.answers).forEach(([questionId, optionId]) => {
          const question = config.questions.find(q => q.id === questionId);
          if (question) {
            const option = question.options.find(o => o.id === optionId);
            if (option) {
              recomputedScore += option.score;
            }
          }
        });
        parsed.totalScore = recomputedScore;
        if (parsed.currentStep === "result") {
          parsed.computedCategory = computeResult(recomputedScore, config);
        }
      }
      return parsed;
    }
  } catch {
  }
  return null;
}

function saveState(state: QuizState): void {
  try {
    const { config, isLoading, ...stateToSave } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch {
  }
}

function clearSavedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
  }
}

function computeResult(score: number, config: QuizConfig): QuizResult | null {
  return config.results.find(
    (result) => score >= result.min_score && score <= result.max_score
  ) || null;
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>({
    currentStep: "welcome",
    currentQuestionIndex: 0,
    answers: {},
    totalScore: 0,
    computedCategory: null,
    personalization: getPersonalizationParams(),
    isLoading: true,
    config: null
  });

  useEffect(() => {
    loadQuizConfig().then((config) => {
      const saved = loadSavedState(config);
      const personalization = getPersonalizationParams();
      
      if (saved && saved.currentStep !== "welcome") {
        setState({
          currentStep: saved.currentStep || "welcome",
          currentQuestionIndex: saved.currentQuestionIndex || 0,
          answers: saved.answers || {},
          totalScore: saved.totalScore || 0,
          computedCategory: saved.computedCategory || null,
          personalization,
          isLoading: false,
          config
        });
      } else {
        setState({
          currentStep: "welcome",
          currentQuestionIndex: 0,
          answers: {},
          totalScore: 0,
          computedCategory: null,
          personalization,
          isLoading: false,
          config
        });
      }
      
      emitAnalyticsEvent("audit_viewed", {
        company: personalization.company,
        utm_source: personalization.utm_source,
        utm_campaign: personalization.utm_campaign
      });
    });
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      saveState(state);
    }
  }, [state]);

  const startQuiz = useCallback(() => {
    emitAnalyticsEvent("audit_started", {
      company: state.personalization.company
    });
    
    setState((prev) => ({
      ...prev,
      currentStep: "question",
      currentQuestionIndex: 0,
      answers: {},
      totalScore: 0,
      computedCategory: null
    }));
  }, [state.personalization.company]);

  const answerQuestion = useCallback((questionId: string, optionId: string, score: number) => {
    emitAnalyticsEvent("question_answered", {
      question_id: questionId,
      answer_id: optionId
    });

    setState((prev) => {
      if (!prev.config) return prev;
      
      const newAnswers = { ...prev.answers, [questionId]: optionId };
      const previousScore = prev.answers[questionId]
        ? prev.config.questions[prev.currentQuestionIndex].options.find(
            (o) => o.id === prev.answers[questionId]
          )?.score || 0
        : 0;
      const newTotalScore = prev.totalScore - previousScore + score;
      
      const isLastQuestion = prev.currentQuestionIndex >= prev.config.questions.length - 1;
      
      if (isLastQuestion) {
        const result = computeResult(newTotalScore, prev.config);
        
        emitAnalyticsEvent("audit_completed", {
          category: result?.category_id,
          score: newTotalScore
        });
        
        return {
          ...prev,
          answers: newAnswers,
          totalScore: newTotalScore,
          currentStep: "result",
          computedCategory: result
        };
      }
      
      return {
        ...prev,
        answers: newAnswers,
        totalScore: newTotalScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (!prev.config) return prev;
      
      if (prev.currentStep === "result") {
        return {
          ...prev,
          currentStep: "question",
          currentQuestionIndex: prev.config.questions.length - 1
        };
      }
      
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1
        };
      }
      
      return {
        ...prev,
        currentStep: "welcome"
      };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    clearSavedState();
    setState((prev) => ({
      ...prev,
      currentStep: "welcome",
      currentQuestionIndex: 0,
      answers: {},
      totalScore: 0,
      computedCategory: null,
      personalization: getPersonalizationParams()
    }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        startQuiz,
        answerQuestion,
        goBack,
        resetQuiz,
        totalQuestions: state.config?.questions.length || 0
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
}
