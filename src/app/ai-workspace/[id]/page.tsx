"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowLeft,
  MessageSquare,
  Brain,
  Zap,
  BarChart3,
  BookOpen,
  Clock,
  Target,
  ChevronRight,
  Play,
  CheckCircle2,
  Circle,
  Sparkles,
  Star,
  TrendingUp,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type SpaceTab = "overview" | "chat" | "quizzes" | "flashcards" | "progress";

interface Chapter {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  topics: number;
}

interface SpaceData {
  id: string;
  name: string;
  author: string;
  emoji: string;
  bannerGradient: string;
  progress: number;
  status: "active" | "completed" | "archived";
  chats: number;
  timeSpent: string;
  mastery: number;
  tags: string[];
  description: string;
  keyTopics: string[];
  chapters: Chapter[];
  rating: number;
  totalChapters: number;
  completedChapters: number;
  streak: number;
  quizzesCompleted: number;
  flashcardsReviewed: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SPACE_DATA: SpaceData = {
  id: "1",
  name: "Deep Work",
  author: "Cal Newport",
  emoji: "🧠",
  bannerGradient: "from-indigo-600 via-purple-600 to-violet-700",
  progress: 67,
  status: "active",
  chats: 24,
  timeSpent: "3h 20m",
  mastery: 89,
  tags: ["Business", "Productivity"],
  rating: 4.8,
  totalChapters: 8,
  completedChapters: 5,
  streak: 12,
  quizzesCompleted: 7,
  flashcardsReviewed: 84,
  description:
    "Deep Work by Cal Newport is a compelling argument for the value of focused, distraction-free work in an age of constant connectivity. Newport defines deep work as professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. This space walks you through the philosophy, rules, and practical strategies to cultivate deep work habits and transform your professional output.",
  keyTopics: [
    "The Deep Work Hypothesis",
    "Deep Work is Rare",
    "Deep Work is Valuable",
    "Work Deeply — Scheduling Philosophies",
    "Embrace Boredom",
    "Quit Social Media",
    "Drain the Shallows",
    "The 4 Disciplines of Execution",
  ],
  chapters: [
    {
      id: 1,
      title: "Introduction: Deep Work is Valuable",
      duration: "18 min",
      completed: true,
      locked: false,
      topics: 4,
    },
    {
      id: 2,
      title: "Deep Work is Rare",
      duration: "22 min",
      completed: true,
      locked: false,
      topics: 5,
    },
    {
      id: 3,
      title: "Deep Work is Meaningful",
      duration: "25 min",
      completed: true,
      locked: false,
      topics: 6,
    },
    {
      id: 4,
      title: "Work Deeply — The Monastic Philosophy",
      duration: "20 min",
      completed: true,
      locked: false,
      topics: 4,
    },
    {
      id: 5,
      title: "Work Deeply — The Bimodal & Rhythmic Philosophy",
      duration: "28 min",
      completed: true,
      locked: false,
      topics: 5,
    },
    {
      id: 6,
      title: "Embrace Boredom",
      duration: "24 min",
      completed: false,
      locked: false,
      topics: 4,
    },
    {
      id: 7,
      title: "Quit Social Media",
      duration: "30 min",
      completed: false,
      locked: false,
      topics: 6,
    },
    {
      id: 8,
      title: "Drain the Shallows",
      duration: "26 min",
      completed: false,
      locked: true,
      topics: 5,
    },
  ],
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

function RingChart({ percent, size = 120 }: { percent: number; size?: number }) {
  const strokeWidth = 10;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  const cx = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        style={{ position: "absolute", inset: 0 }}
      >
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#1E1E22"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circ}`}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 text-center">
        <p className="text-2xl font-bold" style={{ color: "#FAFAFA" }}>
          {percent}%
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
          complete
        </p>
      </div>
    </div>
  );
}

function OverviewTab({ space }: { space: SpaceData }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Description */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-base font-semibold" style={{ color: "#FAFAFA" }}>
          About this Space
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>
          {space.description}
        </p>
      </motion.div>

      {/* Key Topics */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-base font-semibold" style={{ color: "#FAFAFA" }}>
          Key Topics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {space.keyTopics.map((topic, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "#111113", border: "1px solid #27272A" }}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(99,102,241,0.15)" }}
              >
                <span className="text-xs font-bold" style={{ color: "#6366f1" }}>
                  {i + 1}
                </span>
              </div>
              <span className="text-sm" style={{ color: "#E4E4E7" }}>
                {topic}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chapters */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold" style={{ color: "#FAFAFA" }}>
            Chapters
          </h3>
          <span className="text-sm" style={{ color: "#71717A" }}>
            {space.completedChapters} / {space.totalChapters} completed
          </span>
        </div>

        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: "#111113", borderColor: "#27272A" }}
        >
          {space.chapters.map((chapter, i) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
              className="flex items-center gap-4 px-5 py-4 group cursor-pointer transition-colors"
              style={{
                borderBottom: i < space.chapters.length - 1 ? "1px solid #1E1E22" : "none",
                opacity: chapter.locked ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!chapter.locked)
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.02)";
              }}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              {/* Status icon */}
              <div className="flex-shrink-0">
                {chapter.locked ? (
                  <Lock size={18} style={{ color: "#52525B" }} />
                ) : chapter.completed ? (
                  <CheckCircle2 size={18} style={{ color: "#34d399" }} />
                ) : (
                  <Circle size={18} style={{ color: "#3F3F46" }} />
                )}
              </div>

              {/* Chapter info */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: chapter.completed ? "#71717A" : "#FAFAFA" }}
                >
                  {chapter.title}
                </p>
                <p className="text-xs mt-0.5 flex items-center gap-2" style={{ color: "#52525B" }}>
                  <Clock size={11} /> {chapter.duration}
                  <span>·</span>
                  <BookOpen size={11} /> {chapter.topics} topics
                </p>
              </div>

              {/* Action */}
              {!chapter.locked && (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                >
                  <Play size={11} />
                  {chapter.completed ? "Review" : "Start"}
                </motion.button>
              )}
              {!chapter.locked && (
                <ChevronRight
                  size={14}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#52525B" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProgressTab({ space }: { space: SpaceData }) {
  const stats = [
    { label: "Chapters Done", value: `${space.completedChapters}/${space.totalChapters}`, icon: <BookOpen size={16} />, color: "text-indigo-400" },
    { label: "Time Spent", value: space.timeSpent, icon: <Clock size={16} />, color: "text-teal-400" },
    { label: "Mastery Score", value: `${space.mastery}%`, icon: <Target size={16} />, color: "text-purple-400" },
    { label: "Day Streak", value: `${space.streak}d`, icon: <TrendingUp size={16} />, color: "text-amber-400" },
    { label: "Quizzes", value: `${space.quizzesCompleted} done`, icon: <Brain size={16} />, color: "text-rose-400" },
    { label: "Flashcards", value: `${space.flashcardsReviewed} reviewed`, icon: <Zap size={16} />, color: "text-emerald-400" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Ring chart */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-2xl border"
        style={{ background: "#111113", borderColor: "#27272A" }}
      >
        <RingChart percent={space.progress} size={140} />
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: "#FAFAFA" }}>
              Overall Completion
            </h3>
            <p className="text-sm mt-1" style={{ color: "#71717A" }}>
              You&apos;ve completed {space.completedChapters} of {space.totalChapters} chapters.
              {space.progress < 100 ? " Keep going!" : " Excellent work!"}
            </p>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1E1E22" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
              initial={{ width: 0 }}
              animate={{ width: `${space.progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <div className="flex items-center justify-between text-xs" style={{ color: "#71717A" }}>
            <span>0%</span>
            <span className="font-semibold" style={{ color: "#6366f1" }}>
              {space.progress}% complete
            </span>
            <span>100%</span>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="rounded-2xl border p-5 flex flex-col gap-3"
            style={{ background: "#111113", borderColor: "#27272A" }}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "#FAFAFA" }}>
                {stat.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function PlaceholderTab({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 gap-5"
    >
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <div style={{ color: "#6366f1" }}>{icon}</div>
      </div>
      <div className="text-center space-y-1.5">
        <h3 className="text-base font-semibold" style={{ color: "#FAFAFA" }}>
          {label} Coming Soon
        </h3>
        <p className="text-sm" style={{ color: "#71717A" }}>
          This feature is being built for you.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff",
        }}
      >
        <Sparkles size={14} />
        Get Notified
      </motion.button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SpaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const _id = resolvedParams.id;
  const space = SPACE_DATA; // In production, fetch by id

  const [activeTab, setActiveTab] = useState<SpaceTab>("overview");

  const tabs: { id: SpaceTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BookOpen size={14} /> },
    { id: "chat", label: "AI Chat", icon: <MessageSquare size={14} /> },
    { id: "quizzes", label: "Quizzes", icon: <Brain size={14} /> },
    { id: "flashcards", label: "Flashcards", icon: <Zap size={14} /> },
    { id: "progress", label: "Progress", icon: <BarChart3 size={14} /> },
  ];

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background relative" style={{ color: "#FAFAFA" }}>
      {/* ── HERO HEADER ──────────────────────────────────────────────────── */}
      <div className={`relative bg-gradient-to-br ${space.bannerGradient} overflow-hidden`}>
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: "rgba(255,255,255,0.15)", transform: "translate(30%, -30%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-6 pb-8">
          {/* Back button */}
          <Link href="/ai-workspace">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-sm font-medium mb-6 transition-opacity"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <ArrowLeft size={16} />
              Back to Spaces
            </motion.button>
          </Link>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-end gap-6"
          >
            {/* Emoji avatar */}
            <motion.div
              variants={itemVariants}
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {space.emoji}
            </motion.div>

            {/* Info */}
            <motion.div variants={itemVariants} className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{space.name}</h1>
                {space.status === "completed" && (
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(52,211,153,0.2)", color: "#34d399" }}
                  >
                    Completed
                  </span>
                )}
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                by {space.author}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Star size={12} fill="currentColor" style={{ color: "#fbbf24" }} />
                  <span style={{ color: "#fbbf24" }}>{space.rating}</span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <MessageSquare size={11} />
                  {space.chats} conversations
                </div>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Clock size={11} />
                  {space.timeSpent} learned
                </div>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Target size={11} />
                  {space.mastery}% mastery
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {space.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      color: "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex gap-3 flex-shrink-0">
              <Link href={`/ai-workspace/${_id}/chat-0`}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <MessageSquare size={15} />
                  Ask AI
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  color: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Play size={15} />
                Continue
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 space-y-1.5"
          >
            <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span>Overall progress</span>
              <span className="font-semibold text-white">{space.progress}%</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "rgba(255,255,255,0.7)" }}
                initial={{ width: 0 }}
                animate={{ width: `${space.progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── TAB BAR ──────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ background: "#09090B", borderColor: "#1E1E22" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0"
                style={{
                  color: activeTab === tab.id ? "#FAFAFA" : "#71717A",
                }}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <OverviewTab space={space} />
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <PlaceholderTab label="AI Chat" icon={<MessageSquare size={28} />} />
            </motion.div>
          )}

          {activeTab === "quizzes" && (
            <motion.div
              key="quizzes"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <PlaceholderTab label="Quizzes" icon={<Brain size={28} />} />
            </motion.div>
          )}

          {activeTab === "flashcards" && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <PlaceholderTab label="Flashcards" icon={<Zap size={28} />} />
            </motion.div>
          )}

          {activeTab === "progress" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressTab space={space} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-12" />
    </div>
  );
}
