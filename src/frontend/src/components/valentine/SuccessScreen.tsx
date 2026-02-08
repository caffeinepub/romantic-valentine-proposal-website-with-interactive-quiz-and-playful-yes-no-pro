import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export function SuccessScreen() {
  return (
    <Card className="animate-fade-in shadow-2xl border-2 border-pink-300 bg-white/95 backdrop-blur">
      <CardContent className="py-16 px-6 md:px-12 text-center space-y-8">
        <div className="flex justify-center gap-4">
          <Heart className="w-16 h-16 text-pink-500 fill-pink-500 animate-pulse-heart" />
          <Heart className="w-20 h-20 text-rose-500 fill-rose-500 animate-pulse-heart" style={{ animationDelay: '0.2s' }} />
          <Heart className="w-16 h-16 text-pink-500 fill-pink-500 animate-pulse-heart" style={{ animationDelay: '0.4s' }} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif text-rose-900 font-bold leading-tight">
          You were always my answer.
        </h1>
        
        <p className="text-2xl md:text-3xl font-serif text-rose-700 leading-relaxed">
          Today, tomorrow, and every Valentine after this.
        </p>

        <div className="pt-8">
          <Heart className="w-12 h-12 text-pink-400 fill-pink-400 mx-auto animate-pulse-heart" />
        </div>
      </CardContent>
    </Card>
  );
}
