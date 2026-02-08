import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface TransitionStepProps {
  onComplete: () => void;
}

export function TransitionStep({ onComplete }: TransitionStepProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Card className="animate-fade-in shadow-2xl border-2 border-pink-300 bg-white/95 backdrop-blur">
      <CardContent className="py-16 px-8 text-center">
        <div className="flex justify-center mb-6">
          <Heart className="w-16 h-16 text-pink-500 fill-pink-500 animate-pulse-heart" />
        </div>
        <p className="text-3xl md:text-4xl font-serif text-rose-900 leading-relaxed">
          So now there's only one thing left to ask…
        </p>
      </CardContent>
    </Card>
  );
}
