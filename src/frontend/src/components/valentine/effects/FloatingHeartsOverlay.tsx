import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function FloatingHeartsOverlay() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const heartPieces: FloatingHeart[] = [];

    for (let i = 0; i < 20; i++) {
      heartPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 20 + Math.random() * 20
      });
    }

    setHearts(heartPieces);

    const timer = setTimeout(() => {
      setHearts([]);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        >
          <Heart
            className="text-pink-500 fill-pink-500 opacity-80"
            style={{ width: `${heart.size}px`, height: `${heart.size}px` }}
          />
        </div>
      ))}
    </div>
  );
}
