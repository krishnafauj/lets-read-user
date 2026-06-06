"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Zap,
  BookOpen,
  Target,
  Trophy,
  Clock,
  TrendingUp,
  ChevronRight,
  RotateCcw,
  Play,
  CheckCircle2,
  Circle,
  AlertCircle,
  Flame,
  Map,
  Timer,
  BarChart2,
  Star,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "quizzes" | "flashcards" | "mock-tests" | "learning-paths";

interface QuizResult {
  id: number;
  space: string;
  score: number;
  total: number;
  date: string;
  timeTaken: string;
  trend: number;
  emoji: string;
}

interface FlashcardDeck {
  id: number;
  name: string;
  cardCount: number;
  dueCards: number;
  mastery: number;
  emoji: string;
  color: string;
}

interface MockTest {
  id: number;
  name: string;
  duration: string;
  questions: number;
  bestScore: number | null;
  attempts: number;
  emoji: string;
}

interface PathNode {
  id: number;
  title: string;
  status: "completed" | "current" | "locked";
  chapter: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const spaces = ["Deep Work", "Atomic Habits", "The Lean Startup", "Thinking, Fast and Slow"];

const quizResults: QuizResult[] = [
  { id: 1, space: "Deep Work", score: 87, total: 100, date: "Today, 2:30 PM", timeTaken: "8m 42s", trend: 5, emoji: "🧠" },
  { id: 2, space: "Atomic Habits", score: 73, total: 100, date: "Yesterday", timeTaken: "12m 15s", trend: -2, emoji: "⚡" },
  { id: 3, space: "The Lean Startup", score: 91, total: 100, date: "Jun 3", timeTaken: "6m 58s", trend: 8, emoji: "🚀" },
  { id: 4, space: "Thinking, Fast and Slow", score: 65, total: 100, date: "Jun 1", timeTaken: "18m 30s", trend: -3, emoji: "💡" },
];

const flashcardDecks: FlashcardDeck[] = [
  { id: 1, name: "Deep Work Concepts", cardCount: 47, dueCards: 12, mastery: 74, emoji: "🧠", color: "from-indigo-500 to-purple-600" },
  { id: 2, name: "Habit Loop Principles", cardCount: 35, dueCards: 5, mastery: 88, emoji: "⚡", color: "from-amber-500 to-orange-600" },
  { id: 3, name: "Lean Startup Methods", cardCount: 52, dueCards: 0, mastery: 95, emoji: "🚀", color: "from-emerald-500 to-teal-600" },
  { id: 4, name: "Cognitive Biases", cardCount: 68, dueCards: 24, mastery: 51, emoji: "💡", color: "from-rose-500 to-pink-600" },
];

const mockTests: MockTest[] = [
  { id: 1, name: "Deep Work Mastery", duration: "30 min", questions: 30, bestScore: 82, attempts: 3, emoji: "🧠" },
  { id: 2, name: "Habits & Behavior", duration: "25 min", questions: 25, bestScore: 76, attempts: 2, emoji: "⚡" },
  { id: 3, name: "Startup Fundamentals", duration: "40 min", questions: 40, bestScore: null, attempts: 0, emoji: "🚀" },
];

const pathNodes: PathNode[] = [
  { id: 1, title: "Introduction to Deep Work", chapter: "Chapter 1", status: "completed" },
  { id: 2, title: "The Rhythmic Philosophy", chapter: "Chapter 2", status: "completed" },
  { id: 3, title: "Quit Social Media", chapter: "Chapter 3", status: "completed" },
  { id: 4, title: "Deep Work Scheduling", chapter: "Chapter 4", status: "current" },
  { id: 5, title: "Become Hard to Reach", chapter: "Chapter 5", status: "locked" },
  { id: 6, title: "Final Mastery Assessment", chapter: "Chapter 6", status: "locked" },
];

// ─── Mastery Ring ─────────────────────────────────────────────────────────────

function MasteryRing({ value }: { value: number }) {
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <svg width={200} height={200} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={100}
          cy={100}
          r={normalizedRadius}
          fill="none"
          stroke="#27272A"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <motion.circle
          cx={100}
          cy={100}
          r={normalizedRadius}
          fill="none"
          stroke="url(#masteryGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="masteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {value}%
        </motion.span>
        <span className="text-xs text-zinc-400 mt-1">Average Mastery</span>
      </div>
    </div>
  );
}

// ─── Quizzes Tab ──────────────────────────────────────────────────────────────

function QuizzesTab() {
  const [selectedSpace, setSelectedSpace] = useState(spaces[0]);
  const [quizType, setQuizType] = useState<"quick" | "standard" | "deep">("quick");

  const quizTypes = [
    { key: "quick" as const, label: "Quick", questions: 5 },
    { key: "standard" as const, label: "Standard", questions: 15 },
    { key: "deep" as const, label: "Deep", questions: 30 },
  ];

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {/* Quick Quiz Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-indigo-500/30 p-6"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 100%)" }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Quick Quiz</h3>
        </div>
        <p className="text-zinc-400 text-sm mb-5 ml-12">Ready to test yourself?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Space selector */}
          <div>
            <label className="block text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Select Space</label>
            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {spaces.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Quiz type */}
          <div>
            <label className="block text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Quiz Type</label>
            <div className="flex gap-2">
              {quizTypes.map((qt) => (
                <button
                  key={qt.key}
                  onClick={() => setQuizType(qt.key)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    quizType === qt.key
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  {qt.label}
                  <span className="block text-xs opacity-70">{qt.questions}q</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Link href="/learning-center/quiz">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all"
          >
            <Play className="w-4 h-4" />
            Start Quiz
          </motion.button>
        </Link>
      </motion.div>

      {/* Recent Results */}
      <motion.div variants={itemVariants}>
        <h3 className="text-base font-semibold text-white mb-3">Recent Quiz Results</h3>
        <div className="space-y-3">
          {quizResults.map((result) => (
            <motion.div
              key={result.id}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 transition-colors"
            >
              <div className="text-2xl">{result.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-white truncate">{result.space}</span>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      result.trend > 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {result.trend > 0 ? "+" : ""}{result.trend} from last
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{result.timeTaken}</span>
                  <span>{result.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{result.score}</div>
                  <div className="text-xs text-zinc-500">/{result.total}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-medium transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Retry
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Flashcards Tab ───────────────────────────────────────────────────────────

function FlashcardsTab() {
  const [selectedSpace, setSelectedSpace] = useState(spaces[0]);
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {/* Study Mode Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-amber-500/30 p-6"
        style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.10) 0%, rgba(234,88,12,0.07) 100%)" }}
      >
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Study Mode</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-4 ml-12">Reinforce your knowledge with spaced repetition</p>
            <div className="mb-4">
              <label className="block text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Select Space</label>
              <select
                value={selectedSpace}
                onChange={(e) => setSelectedSpace(e.target.value)}
                className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                {spaces.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <Link href="/learning-center/flashcards">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:from-amber-400 hover:to-orange-400 transition-all"
              >
                <Play className="w-4 h-4" />
                Study Now
              </motion.button>
            </Link>
          </div>

          {/* Mini flashcard preview */}
          <div
            className="relative cursor-pointer shrink-0"
            style={{ width: 140, height: 100, perspective: 600 }}
            onClick={() => setFlipped(!flipped)}
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-xl border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center p-3 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-xs text-zinc-500 mb-1">Question</span>
                <span className="text-xs text-white font-medium leading-tight">What is deep work?</span>
                <span className="text-[10px] text-zinc-600 mt-2">click to flip</span>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 rounded-xl border border-amber-500/40 bg-zinc-900 flex flex-col items-center justify-center p-3 text-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-xs text-amber-400 mb-1">Answer</span>
                <span className="text-xs text-white font-medium leading-tight">Professional activity performed in a state of distraction-free concentration</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decks Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-base font-semibold text-white mb-3">Flashcard Decks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {flashcardDecks.map((deck) => (
            <motion.div
              key={deck.id}
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{deck.emoji}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{deck.name}</div>
                    <div className="text-xs text-zinc-500">{deck.cardCount} cards</div>
                  </div>
                </div>
                {deck.dueCards > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-400">
                    <AlertCircle className="w-3 h-3" />
                    Due: {deck.dueCards}
                  </span>
                )}
              </div>
              {/* Mastery bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Mastery</span>
                  <span className="text-white font-medium">{deck.mastery}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${deck.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${deck.mastery}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Mock Tests Tab ───────────────────────────────────────────────────────────

function MockTestsTab() {
  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
      <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-900/60">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <Timer className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Exam Simulation Mode</div>
          <div className="text-xs text-zinc-500">Full-length tests with timed conditions and detailed analytics</div>
        </div>
      </motion.div>

      {mockTests.map((test) => (
        <motion.div
          key={test.id}
          variants={itemVariants}
          whileHover={{ y: -1 }}
          className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 transition-all"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl">{test.emoji}</span>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-white">{test.name}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{test.duration}</span>
                    <span>{test.questions} questions</span>
                    {test.attempts > 0 && <span>{test.attempts} attempt{test.attempts > 1 ? "s" : ""}</span>}
                  </div>
                </div>
                {test.bestScore !== null && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{test.bestScore}%</div>
                    <div className="text-xs text-zinc-500">Best score</div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mt-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  {test.attempts === 0 ? "Start Test" : "Retake"}
                </motion.button>
                {test.bestScore !== null && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    Improve Score
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Learning Paths Tab ───────────────────────────────────────────────────────

function LearningPathsTab() {
  const statusIcon = (status: PathNode["status"]) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    if (status === "current") return <div className="w-5 h-5 rounded-full border-2 border-indigo-400 bg-indigo-500/30 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-indigo-400" /></div>;
    return <Circle className="w-5 h-5 text-zinc-600" />;
  };

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="p-5 rounded-2xl border border-indigo-500/30 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(168,85,247,0.07) 100%)" }}
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Map className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Deep Work — Learning Path</div>
          <div className="text-xs text-zinc-400 mt-0.5">3 of 6 chapters completed · Est. 2h 30m remaining</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">50%</div>
          <div className="text-xs text-zinc-500">Complete</div>
        </div>
      </motion.div>

      {/* Path nodes */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-zinc-800" />

        <div className="space-y-2">
          {pathNodes.map((node, idx) => (
            <motion.div
              key={node.id}
              variants={itemVariants}
              className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${
                node.status === "current"
                  ? "border-indigo-500/50 bg-indigo-500/8"
                  : node.status === "completed"
                  ? "border-zinc-800 bg-zinc-900/40"
                  : "border-zinc-800/50 bg-zinc-900/20 opacity-50"
              }`}
            >
              {/* Node icon (sits on the line) */}
              <div className="relative z-10 shrink-0 w-5 h-5 ml-3">
                {statusIcon(node.status)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">{node.chapter}</span>
                  {node.status === "current" && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-semibold text-indigo-400">
                      Current
                    </span>
                  )}
                </div>
                <div className={`text-sm font-medium ${node.status === "locked" ? "text-zinc-600" : "text-white"}`}>
                  {node.title}
                </div>
              </div>

              {node.status === "current" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors"
                >
                  Continue
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={itemVariants} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center gap-3">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-sm text-zinc-400">
          Next up: <span className="text-white font-medium">Chapter 4 — Deep Work Scheduling</span>
        </span>
        <ChevronRight className="w-4 h-4 text-zinc-600 ml-auto" />
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LearningCenterPage() {
  const [activeTab, setActiveTab] = useState<Tab>("quizzes");

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "quizzes", label: "Quizzes", icon: <Zap className="w-4 h-4" /> },
    { key: "flashcards", label: "Flashcards", icon: <BookOpen className="w-4 h-4" /> },
    { key: "mock-tests", label: "Mock Tests", icon: <Target className="w-4 h-4" /> },
    { key: "learning-paths", label: "Learning Paths", icon: <Map className="w-4 h-4" /> },
  ];

  const stats = [
    { label: "Quizzes Taken", value: "47", icon: <Zap className="w-4 h-4" />, color: "text-indigo-400", bg: "bg-indigo-500/15" },
    { label: "Cards Reviewed", value: "312", icon: <BookOpen className="w-4 h-4" />, color: "text-amber-400", bg: "bg-amber-500/15" },
    { label: "Study Streak", value: "12d", icon: <Flame className="w-4 h-4" />, color: "text-orange-400", bg: "bg-orange-500/15" },
    { label: "Time Studied", value: "28h", icon: <Clock className="w-4 h-4" />, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-full p-6 md:p-8 max-w-5xl mx-auto"
    >
      {/* Top Section */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Text */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-6 h-6 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Learning Center</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              Test your knowledge,
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                track your mastery
              </span>
            </h1>
            <p className="text-zinc-400 text-sm mt-3 mb-6">
              Quizzes, flashcards, and mock tests — all in one place.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{s.value}</div>
                    <div className="text-[11px] text-zinc-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mastery Ring */}
          <div className="flex flex-col items-center gap-3">
            <MasteryRing value={78} />
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">+6%</span>
              <span>this week</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="min-h-[600px] relative">
        <AnimatePresence mode="wait">
          {activeTab === "quizzes" && <QuizzesTab key="quizzes" />}
          {activeTab === "flashcards" && <FlashcardsTab key="flashcards" />}
          {activeTab === "mock-tests" && <MockTestsTab key="mock-tests" />}
          {activeTab === "learning-paths" && <LearningPathsTab key="learning-paths" />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
