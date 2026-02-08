import { Heart } from 'lucide-react';

const romanticMessages = [
  "Perfect! You know me so well 💕",
  "That's right! My heart skips a beat 💗",
  "Yes! You're amazing 💖"
];

export function CorrectAnswerFeedback() {
  const message = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div className="animate-heart-pop">
        <Heart className="w-24 h-24 text-pink-500 fill-pink-500 drop-shadow-lg" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 animate-fade-in">
        <p className="text-2xl font-serif text-rose-700 text-center whitespace-nowrap">
          {message}
        </p>
      </div>
    </div>
  );
}
