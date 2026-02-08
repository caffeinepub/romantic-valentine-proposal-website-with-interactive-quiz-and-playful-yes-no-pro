import { useState } from 'react';
import { QuizFlow } from './QuizFlow';
import { ProposalScreen } from './ProposalScreen';
import { SuccessScreen } from './SuccessScreen';
import { ConfettiOverlay } from './effects/ConfettiOverlay';
import { FloatingHeartsOverlay } from './effects/FloatingHeartsOverlay';

type Screen = 'quiz' | 'proposal' | 'success';

export function ValentineExperience() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('quiz');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleQuizComplete = () => {
    setCurrentScreen('proposal');
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowHearts(true);
    setCurrentScreen('success');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {currentScreen === 'quiz' && <QuizFlow onComplete={handleQuizComplete} />}
        {currentScreen === 'proposal' && <ProposalScreen onYes={handleYesClick} />}
        {currentScreen === 'success' && <SuccessScreen />}
      </div>

      {showConfetti && <ConfettiOverlay />}
      {showHearts && <FloatingHeartsOverlay />}
    </div>
  );
}
