import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNoButtonDodge } from './useNoButtonDodge';

interface DodgingNoButtonProps {
  onYes?: () => void;
}

export function DodgingNoButton({ onYes }: DodgingNoButtonProps) {
  const [isCracked, setIsCracked] = useState(false);
  const { position, buttonRef, containerRef } = useNoButtonDodge({ enabled: !isCracked });

  const handleNoClick = () => {
    setIsCracked(true);
  };

  const handleHiddenYesClick = () => {
    if (onYes) {
      onYes();
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Hidden "Yes" button that appears after crack */}
      {isCracked && (
        <Button
          onClick={handleHiddenYesClick}
          size="lg"
          className="text-xl px-12 py-6 bg-pink-500 hover:bg-pink-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 pointer-events-auto animate-fade-in"
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        >
          Yes, I'll say it for you! 💕😉
        </Button>
      )}

      {/* Original "No" button with crack animation */}
      <div
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: isCracked ? 'none' : 'left 0.3s ease-out, top 0.3s ease-out',
          zIndex: 2
        }}
      >
        <Button
          ref={buttonRef}
          onClick={handleNoClick}
          size="lg"
          variant="outline"
          className={`text-xl px-12 py-6 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 shadow-lg transition-all pointer-events-auto ${
            isCracked ? 'animate-crack-fall' : ''
          }`}
          style={{
            pointerEvents: isCracked ? 'none' : 'auto'
          }}
        >
          No
        </Button>
      </div>
    </div>
  );
}
