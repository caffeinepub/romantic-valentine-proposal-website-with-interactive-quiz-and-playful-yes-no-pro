import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { DodgingNoButton } from './DodgingNoButton';

interface ProposalScreenProps {
  onYes: () => void;
}

export function ProposalScreen({ onYes }: ProposalScreenProps) {
  return (
    <Card className="animate-fade-in shadow-2xl border-2 border-pink-300 bg-white/95 backdrop-blur">
      <CardContent className="py-12 px-6 md:px-12 text-center space-y-8">
        <div className="flex justify-center">
          <Heart className="w-20 h-20 text-pink-500 fill-pink-500 animate-pulse-heart" />
        </div>
        
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-serif text-rose-700 italic">
            So now there's only one thing left to ask…
          </p>
          
          <h1 className="text-4xl md:text-6xl font-serif text-rose-900 font-bold leading-tight">
            Will you be my Valentine?
          </h1>
        </div>

        <div className="relative min-h-[120px] flex items-center justify-center">
          <div className="flex gap-6 items-center justify-center">
            <Button
              onClick={onYes}
              size="lg"
              className="text-xl px-12 py-6 bg-pink-500 hover:bg-pink-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
            >
              Yes! 💕
            </Button>
            
            <DodgingNoButton onYes={onYes} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
