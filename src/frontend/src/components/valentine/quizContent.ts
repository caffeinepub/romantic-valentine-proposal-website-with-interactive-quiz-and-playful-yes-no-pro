export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What is my favorite Raja song?",
    options: ["Kanave Kanave", "Vellai Pura", "Usure Pogudhey", "Kadhal Rojave"],
    correctAnswer: "Vellai Pura"
  },
  {
    question: "What color shirt was I wearing on our 1st anniversary?",
    options: ["Blue", "White", "Pink", "Black"],
    correctAnswer: "Pink"
  },
  {
    question: "What was the exact time when I first proposed my love to you?",
    options: ["11:30 PM", "12:40 AM", "1:15 AM", "12:00 AM"],
    correctAnswer: "12:40 AM"
  }
];
