import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { QuizQuestion } from './quizContent';

interface QuizQuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onCorrectAnswer: () => void;
}

export function QuizQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onCorrectAnswer
}: QuizQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowError(false);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer) {
      onCorrectAnswer();
    } else {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setSelectedAnswer(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <Card className="animate-fade-in shadow-xl border-2 border-pink-200 bg-white/90 backdrop-blur relative z-20">
      <CardHeader className="text-center pb-4">
        <div className="text-sm text-pink-600 font-medium mb-2">
          Question {questionNumber} of {totalQuestions}
        </div>
        <CardTitle className="text-2xl md:text-3xl text-rose-900 font-serif">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== null}
            variant={
              selectedAnswer === option
                ? option === question.correctAnswer
                  ? 'default'
                  : 'destructive'
                : 'outline'
            }
            className={`w-full h-auto py-4 text-lg transition-all relative z-30 ${
              selectedAnswer === null
                ? 'hover:bg-pink-100 hover:border-pink-300 hover:scale-105 cursor-pointer'
                : 'cursor-not-allowed'
            } ${
              selectedAnswer === option && option === question.correctAnswer
                ? 'bg-pink-500 hover:bg-pink-600'
                : ''
            }`}
          >
            {option}
          </Button>
        ))}
        {showError && (
          <p className="text-center text-rose-600 text-sm animate-pulse">
            Not quite... try again! 💕
          </p>
        )}
      </CardContent>
    </Card>
  );
}
