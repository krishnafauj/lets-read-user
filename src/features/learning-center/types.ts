export type Tab = "quizzes" | "flashcards" | "mock-tests" | "learning-paths";

export interface QuizResult {
  id: number;
  space: string;
  score: number;
  total: number;
  date: string;
  timeTaken: string;
  trend: number;
  emoji: string;
}

export interface FlashcardDeck {
  id: number;
  name: string;
  cardCount: number;
  dueCards: number;
  mastery: number;
  emoji: string;
  color: string;
}

export interface MockTest {
  id: number;
  name: string;
  duration: string;
  questions: number;
  bestScore: number | null;
  attempts: number;
  emoji: string;
}

export interface PathNode {
  id: number;
  title: string;
  status: "completed" | "current" | "locked";
  chapter: string;
}
