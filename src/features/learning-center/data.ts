import { QuizResult, FlashcardDeck, MockTest, PathNode } from "./types";

export const spaces = [
  "Deep Work",
  "Atomic Habits",
  "The Lean Startup",
  "Thinking, Fast and Slow"
];

export const quizResults: QuizResult[] = [
  { id: 1, space: "Deep Work", score: 87, total: 100, date: "Today, 2:30 PM", timeTaken: "8m 42s", trend: 5, emoji: "🧠" },
  { id: 2, space: "Atomic Habits", score: 73, total: 100, date: "Yesterday", timeTaken: "12m 15s", trend: -2, emoji: "⚡" },
  { id: 3, space: "The Lean Startup", score: 91, total: 100, date: "Jun 3", timeTaken: "6m 58s", trend: 8, emoji: "🚀" },
  { id: 4, space: "Thinking, Fast and Slow", score: 65, total: 100, date: "Jun 1", timeTaken: "18m 30s", trend: -3, emoji: "💡" },
];

export const flashcardDecks: FlashcardDeck[] = [
  { id: 1, name: "Deep Work Concepts", cardCount: 47, dueCards: 12, mastery: 74, emoji: "🧠", color: "from-indigo-500 to-purple-600" },
  { id: 2, name: "Habit Loop Principles", cardCount: 35, dueCards: 5, mastery: 88, emoji: "⚡", color: "from-amber-500 to-orange-600" },
  { id: 3, name: "Lean Startup Methods", cardCount: 52, dueCards: 0, mastery: 95, emoji: "🚀", color: "from-emerald-500 to-teal-600" },
  { id: 4, name: "Cognitive Biases", cardCount: 68, dueCards: 24, mastery: 51, emoji: "💡", color: "from-rose-500 to-pink-600" },
];

export const mockTests: MockTest[] = [
  { id: 1, name: "Deep Work Mastery", duration: "30 min", questions: 30, bestScore: 82, attempts: 3, emoji: "🧠" },
  { id: 2, name: "Habits & Behavior", duration: "25 min", questions: 25, bestScore: 76, attempts: 2, emoji: "⚡" },
  { id: 3, name: "Startup Fundamentals", duration: "40 min", questions: 40, bestScore: null, attempts: 0, emoji: "🚀" },
];

export const pathNodes: PathNode[] = [
  { id: 1, title: "Introduction to Deep Work", chapter: "Chapter 1", status: "completed" },
  { id: 2, title: "The Rhythmic Philosophy", chapter: "Chapter 2", status: "completed" },
  { id: 3, title: "Quit Social Media", chapter: "Chapter 3", status: "completed" },
  { id: 4, title: "Deep Work Scheduling", chapter: "Chapter 4", status: "current" },
  { id: 5, title: "Become Hard to Reach", chapter: "Chapter 5", status: "locked" },
  { id: 6, title: "Final Mastery Assessment", chapter: "Chapter 6", status: "locked" },
];
