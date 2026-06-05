"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  MoreHorizontal,
  Grid3X3,
  List,
  Clock,
  BookOpen,
  Brain,
  Search,
  ChevronDown,
  Sparkles,
  Plus,
} from "lucide-react";
import Link from "next/link";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -3, transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = "all" | "active" | "completed" | "archived";
type SortOption = "recently-active" | "progress" | "added-date";
type ViewMode = "grid" | "list";

interface KnowledgeSpace {
  id: string;
  name: string;
  author: string;
  emoji: string;
  gradient: string;
  bannerGradient: string;
  progress: number;
  status: "active" | "completed" | "archived";
  chats: number;
  timeSpent: string;
  mastery: number;
  tags: string[];
  addedDate: string;
  lastActive: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const SPACES: KnowledgeSpace[] = [
  {
    id: "1",
    name: "Deep Work",
    author: "Cal Newport",
    emoji: "🧠",
    gradient: "from-indigo-500 to-purple-600",
    bannerGradient: "from-indigo-600 via-purple-600 to-violet-700",
    progress: 67,
    status: "active",
    chats: 24,
    timeSpent: "3h 20m",
    mastery: 89,
    tags: ["Business", "Productivity"],
    addedDate: "Jan 12, 2025",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Atomic Habits",
    author: "James Clear",
    emoji: "⚡",
    gradient: "from-teal-500 to-cyan-600",
    bannerGradient: "from-teal-600 via-cyan-600 to-sky-700",
    progress: 42,
    status: "active",
    chats: 18,
    timeSpent: "2h 05m",
    mastery: 74,
    tags: ["Self-Growth", "Habits"],
    addedDate: "Jan 20, 2025",
    lastActive: "Yesterday",
  },
  {
    id: "3",
    name: "The Art of War",
    author: "Sun Tzu",
    emoji: "⚔️",
    gradient: "from-rose-500 to-pink-600",
    bannerGradient: "from-rose-600 via-pink-600 to-fuchsia-700",
    progress: 91,
    status: "completed",
    chats: 31,
    timeSpent: "5h 45m",
    mastery: 95,
    tags: ["Strategy", "Leadership"],
    addedDate: "Dec 5, 2024",
    lastActive: "3 weeks ago",
  },
  {
    id: "4",
    name: "Sapiens",
    author: "Yuval Noah Harari",
    emoji: "🌍",
    gradient: "from-blue-500 to-sky-600",
    bannerGradient: "from-blue-600 via-sky-600 to-cyan-700",
    progress: 55,
    status: "active",
    chats: 19,
    timeSpent: "4h 10m",
    mastery: 61,
    tags: ["History", "Anthropology"],
    addedDate: "Feb 1, 2025",
    lastActive: "5 hours ago",
  },
  {
    id: "5",
    name: "Zero to One",
    author: "Peter Thiel",
    emoji: "🚀",
    gradient: "from-amber-500 to-orange-600",
    bannerGradient: "from-amber-600 via-orange-600 to-red-700",
    progress: 28,
    status: "active",
    chats: 9,
    timeSpent: "1h 30m",
    mastery: 45,
    tags: ["Startup", "Business"],
    addedDate: "Feb 14, 2025",
    lastActive: "2 days ago",
  },
  {
    id: "6",
    name: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    emoji: "🧩",
    gradient: "from-green-500 to-emerald-600",
    bannerGradient: "from-green-600 via-emerald-600 to-teal-700",
    progress: 100,
    status: "completed",
    chats: 42,
    timeSpent: "8h 20m",
    mastery: 98,
    tags: ["Psychology", "Decision Making"],
    addedDate: "Nov 10, 2024",
    lastActive: "1 month ago",
  },
  {
    id: "7",
    name: "The Lean Startup",
    author: "Eric Ries",
    emoji: "📊",
    gradient: "from-violet-500 to-purple-600",
    bannerGradient: "from-violet-600 via-purple-600 to-indigo-700",
    progress: 15,
    status: "archived",
    chats: 4,
    timeSpent: "45m",
    mastery: 22,
    tags: ["Business", "Startup"],
    addedDate: "Oct 3, 2024",
    lastActive: "2 months ago",
  },
  {
    id: "8",
    name: "Essentialism",
    author: "Greg McKeown",
    emoji: "🎯",
    gradient: "from-sky-500 to-blue-600",
    bannerGradient: "from-sky-600 via-blue-600 to-indigo-700",
    progress: 73,
    status: "active",
    chats: 16,
    timeSpent: "2h 50m",
    mastery: 80,
    tags: ["Productivity", "Minimalism"],
    addedDate: "Jan 28, 2025",
    lastActive: "Today",
  },
];

const SORT_LABELS: Record<SortOption, string> = {
  "recently-active": "Recently Active",
  progress: "Progress",
  "added-date": "Added Date",
};

const STATS = [
  { label: "Active Spaces", value: "12", icon: <BookOpen size={16} /> },
  { label: "Completed", value: "3", icon: <Brain size={16} /> },
  { label: "Hours Learned", value: "847", icon: <Clock size={16} /> },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  const color =
    value === 100
      ? "from-emerald-500 to-teal-500"
      : value >= 60
      ? "from-indigo-500 to-purple-500"
      : "from-amber-500 to-orange-500";

  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#27272A" }}>
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

function SpaceCardGrid({ space }: { space: KnowledgeSpace }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="rounded-2xl border overflow-hidden flex flex-col cursor-pointer group"
      style={{ background: "#111113", borderColor: "#27272A" }}
    >
      {/* Banner */}
      <div className={`relative h-28 bg-gradient-to-br ${space.bannerGradient} flex-shrink-0`}>
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Status badge */}
        {space.status === "completed" && (
          <div
            className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(0,0,0,0.4)", color: "#34d399", backdropFilter: "blur(8px)" }}
          >
            Completed
          </div>
        )}
        {space.status === "archived" && (
          <div
            className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(0,0,0,0.4)", color: "#71717A", backdropFilter: "blur(8px)" }}
          >
            Archived
          </div>
        )}
        {/* Emoji + Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex items-end gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
          >
            {space.emoji}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm leading-tight truncate drop-shadow-md">
              {space.name}
            </p>
            <p className="text-xs mt-0.5 drop-shadow-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              {space.author}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Progress */}
        <div className="flex items-center justify-between text-xs mb-0.5">
          <span style={{ color: "#71717A" }}>Progress</span>
          <span className="font-semibold" style={{ color: "#A1A1AA" }}>
            {space.progress}% complete
          </span>
        </div>
        <ProgressBar value={space.progress} />

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs" style={{ color: "#71717A" }}>
          <span>{space.chats} chats</span>
          <span style={{ color: "#3F3F46" }}>·</span>
          <span>{space.timeSpent}</span>
          <span style={{ color: "#3F3F46" }}>·</span>
          <span style={{ color: "#a78bfa" }}>{space.mastery}% mastery</span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {space.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full"
              style={{ background: "#1E1E22", color: "#A1A1AA", border: "1px solid #27272A" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <Link href={`/knowledge-spaces/${space.id}`} className="flex-1">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                boxShadow: "0 0 12px rgba(99,102,241,0.3)",
              }}
            >
              <MessageSquare size={13} />
              Open AI Chat
            </motion.button>
          </Link>
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((p) => !p);
              }}
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#1E1E22", border: "1px solid #27272A", color: "#71717A" }}
            >
              <MoreHorizontal size={14} />
            </motion.button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full right-0 mb-2 w-40 rounded-xl border overflow-hidden z-20"
                  style={{ background: "#18181B", borderColor: "#3F3F46" }}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  {["View Details", "Share Space", "Export Notes", "Archive", "Remove"].map(
                    (item, i) => (
                      <button
                        key={item}
                        className="w-full px-4 py-2.5 text-left text-xs transition-colors"
                        style={{
                          color: i === 4 ? "#f87171" : "#A1A1AA",
                          borderBottom: i < 4 ? "1px solid #27272A" : "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {item}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SpaceCardList({ space }: { space: KnowledgeSpace }) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="rounded-2xl border overflow-hidden flex cursor-pointer"
      style={{ background: "#111113", borderColor: "#27272A" }}
    >
      {/* Thumbnail */}
      <div
        className={`relative w-28 flex-shrink-0 bg-gradient-to-br ${space.bannerGradient} flex items-center justify-center text-3xl`}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
        <span className="relative z-10">{space.emoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 flex flex-col justify-between min-w-0 gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm truncate" style={{ color: "#FAFAFA" }}>
                {space.name}
              </p>
              {space.status === "completed" && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "rgba(52,211,153,0.1)", color: "#34d399" }}
                >
                  Completed
                </span>
              )}
              {space.status === "archived" && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "#1E1E22", color: "#71717A" }}
                >
                  Archived
                </span>
              )}
            </div>
            <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
              {space.author}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href={`/knowledge-spaces/${space.id}`}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                }}
              >
                <MessageSquare size={12} />
                Open
              </motion.button>
            </Link>
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "#1E1E22", border: "1px solid #27272A", color: "#71717A" }}
            >
              <MoreHorizontal size={13} />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-48">
            <ProgressBar value={space.progress} />
          </div>
          <span className="text-xs font-medium" style={{ color: "#A1A1AA" }}>
            {space.progress}%
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs" style={{ color: "#71717A" }}>
            <span>{space.chats} chats</span>
            <span>·</span>
            <span>{space.timeSpent}</span>
            <span>·</span>
            <span style={{ color: "#a78bfa" }}>{space.mastery}% mastery</span>
          </div>
          <div className="flex gap-1.5 ml-auto">
            {space.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#1E1E22", color: "#71717A", border: "1px solid #27272A" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ filter }: { filter: FilterTab }) {
  const messages: Record<FilterTab, { title: string; subtitle: string }> = {
    all: {
      title: "No knowledge spaces yet",
      subtitle: "Discover and add spaces to start your AI-powered learning journey.",
    },
    active: {
      title: "No active spaces",
      subtitle: "Start exploring spaces to see them appear here.",
    },
    completed: {
      title: "No completed spaces yet",
      subtitle: "Keep learning — your completed spaces will show up here.",
    },
    archived: {
      title: "No archived spaces",
      subtitle: "Spaces you archive will appear here.",
    },
  };
  const msg = messages[filter];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-6"
    >
      {/* Illustration */}
      <div className="relative w-32 h-32">
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <BookOpen size={36} style={{ color: "#6366f1" }} />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Sparkles size={8} style={{ color: "#fff" }} />
            </motion.div>
          </div>
        </div>
        {/* Floating dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: "#6366f1",
              opacity: 0.4,
              top: `${20 + i * 25}%`,
              left: i % 2 === 0 ? "-8px" : "auto",
              right: i % 2 !== 0 ? "-8px" : "auto",
            }}
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold" style={{ color: "#FAFAFA" }}>
          {msg.title}
        </h3>
        <p className="text-sm max-w-xs" style={{ color: "#71717A" }}>
          {msg.subtitle}
        </p>
      </div>

      <Link href="/discover">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(99,102,241,0.35)",
          }}
        >
          <Sparkles size={15} />
          Discover Knowledge Spaces
        </motion.button>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KnowledgeSpacesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recently-active");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { id: FilterTab; label: string; count: number }[] = [
    { id: "all", label: "All", count: SPACES.length },
    { id: "active", label: "Active", count: SPACES.filter((s) => s.status === "active").length },
    {
      id: "completed",
      label: "Completed",
      count: SPACES.filter((s) => s.status === "completed").length,
    },
    {
      id: "archived",
      label: "Archived",
      count: SPACES.filter((s) => s.status === "archived").length,
    },
  ];

  const filtered = SPACES.filter((s) => {
    const matchesTab = activeTab === "all" || s.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress;
    if (sortBy === "added-date")
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    return 0; // recently-active: keep original order
  });

  return (
    <div className="min-h-screen" style={{ background: "#09090B", color: "#FAFAFA" }}>
      <motion.div
        className="max-w-7xl mx-auto px-6 py-10 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── 1. TOP SECTION ───────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Knowledge Spaces</h1>
              <p className="mt-1.5 text-base" style={{ color: "#A1A1AA" }}>
                Your AI-powered learning library
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold self-start"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              }}
            >
              <Plus size={15} />
              Add Space
            </motion.button>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 flex-wrap">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div style={{ color: "#6366f1" }}>{stat.icon}</div>
                <span className="text-sm font-semibold" style={{ color: "#FAFAFA" }}>
                  {stat.value}
                </span>
                <span className="text-sm" style={{ color: "#71717A" }}>
                  {stat.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="ml-4" style={{ color: "#3F3F46" }}>
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 2. FILTER BAR ────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants}>
          <div
            className="rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            style={{ background: "#111113", borderColor: "#27272A" }}
          >
            {/* Tabs */}
            <div
              className="flex items-center gap-1 p-1 rounded-xl flex-shrink-0"
              style={{ background: "#0A0A0B" }}
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.96 }}
                  className="relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: activeTab === tab.id ? "#FAFAFA" : "#71717A",
                  }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "#18181B", border: "1px solid #3F3F46" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab.label}
                    <span
                      className="ml-1.5 text-xs"
                      style={{ color: activeTab === tab.id ? "#6366f1" : "#52525B" }}
                    >
                      {tab.count}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#52525B" }}
              />
              <input
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 rounded-xl text-sm outline-none w-44"
                style={{
                  background: "#0A0A0B",
                  border: "1px solid #27272A",
                  color: "#FAFAFA",
                }}
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setSortOpen((p) => !p)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                style={{
                  background: "#0A0A0B",
                  border: "1px solid #27272A",
                  color: "#A1A1AA",
                }}
              >
                <span>{SORT_LABELS[sortBy]}</span>
                <ChevronDown size={13} style={{ color: "#52525B" }} />
              </motion.button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-44 rounded-xl border overflow-hidden z-20"
                    style={{ background: "#18181B", borderColor: "#3F3F46" }}
                    onMouseLeave={() => setSortOpen(false)}
                  >
                    {(Object.keys(SORT_LABELS) as SortOption[]).map((opt, i, arr) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setSortOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors"
                        style={{
                          color: sortBy === opt ? "#6366f1" : "#A1A1AA",
                          borderBottom: i < arr.length - 1 ? "1px solid #27272A" : "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {SORT_LABELS[opt]}
                        {sortBy === opt && (
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View toggle */}
            <div
              className="flex items-center gap-1 p-1 rounded-xl"
              style={{ background: "#0A0A0B", border: "1px solid #27272A" }}
            >
              {(["grid", "list"] as ViewMode[]).map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  whileTap={{ scale: 0.94 }}
                  className="relative w-8 h-7 rounded-lg flex items-center justify-center"
                  style={{ color: viewMode === mode ? "#FAFAFA" : "#52525B" }}
                >
                  {viewMode === mode && (
                    <motion.div
                      layoutId="viewToggle"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "#18181B", border: "1px solid #3F3F46" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {mode === "grid" ? <Grid3X3 size={14} /> : <List size={14} />}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── 3. SPACES GRID / LIST ─────────────────────────────────────────── */}
        <motion.section variants={itemVariants}>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <EmptyState key="empty" filter={activeTab} />
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((space, i) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
                  >
                    <SpaceCardGrid space={space} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                {filtered.map((space, i) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
                  >
                    <SpaceCardList space={space} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <div className="h-8" />
      </motion.div>
    </div>
  );
}
