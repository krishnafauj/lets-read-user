"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Play,
  Flame,
  Clock,
  BookOpen,
  TrendingUp,
  Star,
  ChevronRight,
  Brain,
  Target,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Timer,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -2, transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface LearningCard {
  id: number;
  title: string;
  author: string;
  progress: number;
  gradient: string;
  lastSession: string;
  emoji: string;
}

interface SpaceCard {
  id: number;
  title: string;
  creator: string;
  conversations: number;
  mastery: number;
  emoji: string;
  borderGradient: string;
  tags: string[];
  isActive: boolean;
}

interface Recommendation {
  id: number;
  title: string;
  author: string;
  reason: string;
  emoji: string;
  gradient: string;
  rating: number;
}

interface StatCard {
  id: number;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  color: string;
}

interface RecentChat {
  id: number;
  space: string;
  question: string;
  timestamp: string;
  emoji: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const learningCards: LearningCard[] = [
  {
    id: 1,
    title: "Deep Work",
    author: "Cal Newport",
    progress: 68,
    gradient: "from-indigo-500 to-purple-600",
    lastSession: "2 hours ago",
    emoji: "🧠",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    progress: 42,
    gradient: "from-emerald-500 to-teal-600",
    lastSession: "Yesterday",
    emoji: "⚡",
  },
  {
    id: 3,
    title: "The Art of War",
    author: "Sun Tzu",
    progress: 91,
    gradient: "from-orange-500 to-red-600",
    lastSession: "3 days ago",
    emoji: "⚔️",
  },
];

const spaceCards: SpaceCard[] = [
  {
    id: 1,
    title: "Deep Work by Cal Newport",
    creator: "Alex Morgan",
    conversations: 12,
    mastery: 89,
    emoji: "🧠",
    borderGradient: "from-indigo-500 to-purple-500",
    tags: ["Productivity", "Focus"],
    isActive: true,
  },
  {
    id: 2,
    title: "Atomic Habits",
    creator: "Alex Morgan",
    conversations: 8,
    mastery: 74,
    emoji: "⚡",
    borderGradient: "from-emerald-500 to-teal-500",
    tags: ["Habits", "Self-Growth"],
    isActive: true,
  },
  {
    id: 3,
    title: "The Art of War",
    creator: "Alex Morgan",
    conversations: 5,
    mastery: 95,
    emoji: "⚔️",
    borderGradient: "from-orange-500 to-red-500",
    tags: ["Strategy", "Leadership"],
    isActive: false,
  },
  {
    id: 4,
    title: "Sapiens: A Brief History",
    creator: "Alex Morgan",
    conversations: 19,
    mastery: 61,
    emoji: "🌍",
    borderGradient: "from-blue-500 to-cyan-500",
    tags: ["History", "Anthropology"],
    isActive: true,
  },
];

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: "Getting Things Done",
    author: "David Allen",
    reason: "Because you're learning productivity",
    emoji: "📋",
    gradient: "from-violet-500 to-purple-600",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    reason: "Pairs well with Deep Work",
    emoji: "🌊",
    gradient: "from-sky-500 to-blue-600",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Essentialism",
    author: "Greg McKeown",
    reason: "Top pick for focus learners",
    emoji: "🎯",
    gradient: "from-rose-500 to-pink-600",
    rating: 4.9,
  },
];

const statCards: StatCard[] = [
  {
    id: 1,
    label: "Hours This Week",
    value: "14.5",
    trend: "+2.3h",
    trendUp: true,
    icon: <Timer size={18} />,
    color: "text-indigo-400",
  },
  {
    id: 2,
    label: "Active Spaces",
    value: "7",
    trend: "+2",
    trendUp: true,
    icon: <BookOpen size={18} />,
    color: "text-emerald-400",
  },
  {
    id: 3,
    label: "Questions Asked",
    value: "248",
    trend: "+31",
    trendUp: true,
    icon: <Brain size={18} />,
    color: "text-purple-400",
  },
  {
    id: 4,
    label: "Mastery Score",
    value: "82%",
    trend: "+4%",
    trendUp: true,
    icon: <Target size={18} />,
    color: "text-orange-400",
  },
];

const recentChats: RecentChat[] = [
  {
    id: 1,
    space: "Deep Work",
    question: "What is the difference between shallow and deep work?",
    timestamp: "2 hours ago",
    emoji: "🧠",
  },
  {
    id: 2,
    space: "Atomic Habits",
    question: "How does the habit loop work in practice?",
    timestamp: "Yesterday, 9:14 PM",
    emoji: "⚡",
  },
  {
    id: 3,
    space: "Sapiens",
    question: "Explain the cognitive revolution and its impact on humans",
    timestamp: "2 days ago",
    emoji: "🌍",
  },
  {
    id: 4,
    space: "The Art of War",
    question: "How can Sun Tzu's strategies apply to modern business?",
    timestamp: "3 days ago",
    emoji: "⚔️",
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function CircularProgress({ percent }: { percent: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="56" height="56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#27272A" strokeWidth="3" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="url(#prog)"
          strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xs font-semibold text-white z-10">{percent}%</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen" style={{ background: "#09090B", color: "#FAFAFA" }}>
      <motion.div
        className="max-w-7xl mx-auto px-6 py-10 space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── 1. GREETING HEADER ───────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Good morning, Alex 👋
              </h1>
              <p className="mt-1 text-base" style={{ color: "#A1A1AA" }}>
                You have 3 active learning sessions
              </p>
              <p className="mt-1 text-sm font-medium" style={{ color: "#71717A" }}>
                {dateStr} &nbsp;·&nbsp; {timeStr}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(99,102,241,0.35)",
                }}
              >
                <MessageSquare size={15} />
                Start AI Chat
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border"
                style={{
                  background: "#18181B",
                  borderColor: "#3F3F46",
                  color: "#E4E4E7",
                }}
              >
                <Play size={15} />
                Continue Learning
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* ── 2. STREAK BANNER ────────────────────────────────────────────── */}
        <motion.section variants={itemVariants}>
          <div
            className="rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
            }}
          >
            <div
              className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ background: "#18181B" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(99,102,241,0.15)" }}
                >
                  🔥
                </div>
                <div>
                  <p className="text-xl font-bold">47 Day Streak!</p>
                  <p className="text-sm mt-0.5" style={{ color: "#A1A1AA" }}>
                    Keep going! 3 more days to reach your goal
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <div className="flex justify-between text-xs" style={{ color: "#71717A" }}>
                  <span>Progress to 50 days</span>
                  <span className="font-semibold text-indigo-400">47 / 50</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "#27272A" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
                <p className="text-xs font-medium text-indigo-400 flex items-center gap-1">
                  <Flame size={12} /> On fire — you&apos;re in the top 3% this week
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 3. CONTINUE LEARNING ────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Continue where you left off</h2>
            <button
              className="text-sm flex items-center gap-1 font-medium"
              style={{ color: "#6366f1" }}
            >
              See all <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {learningCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="flex-shrink-0 w-72 rounded-2xl border p-5 flex flex-col gap-4 cursor-pointer"
                style={{ background: "#18181B", borderColor: "#27272A" }}
              >
                {/* Thumbnail */}
                <div
                  className={`h-32 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-4xl`}
                >
                  {card.emoji}
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{card.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                      {card.author}
                    </p>
                    <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "#52525B" }}>
                      <Clock size={11} /> Last session: {card.lastSession}
                    </p>
                  </div>
                  <CircularProgress percent={card.progress} />
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    color: "#818cf8",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  <Play size={14} /> Continue
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 4. AI SPACES GRID ────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your AI Spaces</h2>
            <button
              className="text-sm flex items-center gap-1 font-medium"
              style={{ color: "#6366f1" }}
            >
              Manage spaces <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spaceCards.map((space) => (
              <motion.div
                key={space.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="rounded-2xl border overflow-hidden cursor-pointer"
                style={{ background: "#18181B", borderColor: "#27272A" }}
              >
                {/* Gradient top bar */}
                <div
                  className={`h-1 bg-gradient-to-r ${space.borderGradient}`}
                />
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${space.borderGradient} flex items-center justify-center text-lg`}
                      >
                        {space.emoji}
                      </div>
                      <div>
                        <p className="font-semibold text-sm leading-snug">{space.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                          by {space.creator}
                        </p>
                      </div>
                    </div>

                    {space.isActive && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-xs" style={{ color: "#34d399" }}>Active</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs" style={{ color: "#71717A" }}>
                    {space.conversations} conversations &nbsp;·&nbsp;
                    <span style={{ color: "#a78bfa" }}>{space.mastery}% mastery</span>
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {space.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full"
                        style={{ background: "#27272A", color: "#A1A1AA" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 5. RECOMMENDATIONS ───────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400" />
            <h2 className="text-lg font-semibold">Recommended for you</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="rounded-2xl border p-5 flex flex-col gap-3 cursor-pointer"
                style={{ background: "#18181B", borderColor: "#27272A" }}
              >
                <div
                  className={`h-24 rounded-xl bg-gradient-to-br ${rec.gradient} flex items-center justify-center text-4xl`}
                >
                  {rec.emoji}
                </div>
                <div>
                  <p className="font-semibold text-sm">{rec.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                    {rec.author}
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{ background: "#27272A", color: "#A1A1AA" }}
                >
                  <Brain size={12} className="text-purple-400 flex-shrink-0" />
                  {rec.reason}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-xs text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span>{rec.rating}</span>
                  </div>
                  <button
                    className="text-xs flex items-center gap-1 font-medium"
                    style={{ color: "#818cf8" }}
                  >
                    Explore <ArrowUpRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 6. QUICK STATS ───────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-400" />
            Your progress
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <motion.div
                key={stat.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="rounded-2xl border p-5 flex flex-col gap-3"
                style={{ background: "#18181B", borderColor: "#27272A" }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    {stat.icon}
                  </div>
                  <span
                    className="text-xs font-semibold flex items-center gap-0.5"
                    style={{ color: stat.trendUp ? "#34d399" : "#f87171" }}
                  >
                    <TrendingUp size={11} />
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 7. RECENT AI CONVERSATIONS ───────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare size={18} className="text-purple-400" />
              Recent AI Conversations
            </h2>
            <button
              className="text-sm flex items-center gap-1 font-medium"
              style={{ color: "#6366f1" }}
            >
              View all <ChevronRight size={14} />
            </button>
          </div>

          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: "#18181B", borderColor: "#27272A" }}
          >
            {recentChats.map((chat, i) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                className="flex items-center justify-between px-5 py-4 group cursor-pointer"
                style={{
                  borderBottom: i < recentChats.length - 1 ? "1px solid #27272A" : "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: "#27272A" }}
                  >
                    {chat.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium mb-0.5" style={{ color: "#6366f1" }}>
                      {chat.space}
                    </p>
                    <p className="text-sm truncate" style={{ color: "#E4E4E7" }}>
                      {chat.question}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                  <span className="text-xs hidden sm:block" style={{ color: "#52525B" }}>
                    {chat.timestamp}
                  </span>
                  <button
                    className="text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#818cf8" }}
                  >
                    View <ArrowUpRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── BOTTOM SPACER ───────────────────────────────────────────────── */}
        <div className="h-8" />
      </motion.div>
    </div>
  );
}
