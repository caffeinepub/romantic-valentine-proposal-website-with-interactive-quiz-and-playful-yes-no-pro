import { useState } from 'react';
import { QuizQuestionCard } from './QuizQuestionCard';
import { TransitionStep } from './TransitionStep';
import { CorrectAnswerFeedback } from './CorrectAnswerFeedback';
import { quizQuestions } from './quizContent';

interface QuizFlowProps {
  onComplete: () => void;
}

export function QuizFlow({ onComplete }: QuizFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleCorrectAnswer = () => {
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(quizQuestions.length); // Move to transition
      }
    }, 1500);
  };

  const handleTransitionComplete = () => {
    onComplete();
  };

  if (currentStep === quizQuestions.length) {
    return <TransitionStep onComplete={handleTransitionComplete} />;
  }

  return (
    <div className="relative z-10">
      <QuizQuestionCard
        key={currentStep}
        question={quizQuestions[currentStep]}
        questionNumber={currentStep + 1}
        totalQuestions={quizQuestions.length}
        onCorrectAnswer={handleCorrectAnswer}
      />
      {showFeedback && <CorrectAnswerFeedback />}
    </div>
  );
}
