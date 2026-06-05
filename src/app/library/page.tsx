"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  FileText,
  Highlighter,
  Download,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Star,
  Clock,
  BookMarked,
  Library,
  ChevronDown,
  X,
  Calendar,
} from "lucide-react";
import { useState } from "react";

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
  hover: { scale: 1.02, y: -3, transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "all" | "books" | "notes" | "highlights" | "downloads";
type ViewMode = "grid" | "list";

interface LibraryItem {
  id: number;
  type: "book" | "note" | "highlight" | "download";
  title: string;
  author?: string;
  space: string;
  spaceColor: string;
  date: string;
  progress?: number;
  starred: boolean;
  emoji: string;
  excerpt?: string;
  readTime?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const libraryItems: LibraryItem[] = [
  {
    id: 1,
    type: "book",
    title: "Deep Work",
    author: "Cal Newport",
    space: "Productivity",
    spaceColor: "#6366F1",
    date: "2 days ago",
    progress: 68,
    starred: true,
    emoji: "📘",
    readTime: "4h 20m left",
  },
  {
    id: 2,
    type: "book",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    space: "Psychology",
    spaceColor: "#8B5CF6",
    date: "1 week ago",
    progress: 35,
    starred: false,
    emoji: "🧠",
    readTime: "8h left",
  },
  {
    id: 3,
    type: "note",
    title: "Key Insights on Flow States",
    space: "Psychology",
    spaceColor: "#8B5CF6",
    date: "3 days ago",
    starred: true,
    emoji: "📝",
    excerpt: "Flow is the mental state of being fully immersed in an activity with energized focus...",
  },
  {
    id: 4,
    type: "highlight",
    title: "\"The ability to perform deep work is becoming increasingly rare...\"",
    space: "Productivity",
    spaceColor: "#6366F1",
    date: "2 days ago",
    starred: false,
    emoji: "✏️",
    excerpt: "From: Deep Work — Cal Newport",
  },
  {
    id: 5,
    type: "book",
    title: "Atomic Habits",
    author: "James Clear",
    space: "Self Improvement",
    spaceColor: "#22C55E",
    date: "2 weeks ago",
    progress: 100,
    starred: true,
    emoji: "⚡",
    readTime: "Completed",
  },
  {
    id: 6,
    type: "download",
    title: "The Psychology of Money — PDF",
    author: "Morgan Housel",
    space: "Finance",
    spaceColor: "#F59E0B",
    date: "5 days ago",
    starred: false,
    emoji: "💰",
    readTime: "Offline",
  },
  {
    id: 7,
    type: "note",
    title: "Habit Stack Template",
    space: "Self Improvement",
    spaceColor: "#22C55E",
    date: "1 week ago",
    starred: false,
    emoji: "📋",
    excerpt: "Morning: Meditate → Journal → Exercise. The key is attaching new habits to existing ones...",
  },
  {
    id: 8,
    type: "highlight",
    title: "\"You do not rise to the level of your goals, you fall to the level of your systems.\"",
    space: "Self Improvement",
    spaceColor: "#22C55E",
    date: "2 weeks ago",
    starred: true,
    emoji: "✏️",
    excerpt: "From: Atomic Habits — James Clear",
  },
  {
    id: 9,
    type: "book",
    title: "Zero to One",
    author: "Peter Thiel",
    space: "Entrepreneurship",
    spaceColor: "#EC4899",
    date: "3 weeks ago",
    progress: 55,
    starred: false,
    emoji: "🚀",
    readTime: "3h 10m left",
  },
];

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "All", icon: <Grid3X3 size={14} /> },
  { key: "books", label: "Books", icon: <BookOpen size={14} /> },
  { key: "notes", label: "Notes", icon: <FileText size={14} /> },
  { key: "highlights", label: "Highlights", icon: <Highlighter size={14} /> },
  { key: "downloads", label: "Downloads", icon: <Download size={14} /> },
];

const SPACES = ["All Spaces", "Productivity", "Psychology", "Self Improvement", "Finance", "Entrepreneurship"];
const SORT_OPTIONS = ["Recently Added", "A–Z", "Progress", "Starred First"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-[var(--color-primary)]"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

function LibraryCard({ item, view }: { item: LibraryItem; view: ViewMode }) {
  const [starred, setStarred] = useState(item.starred);

  if (view === "list") {
    return (
      <motion.div
        variants={itemVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: item.spaceColor + "20" }}
        >
          {item.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">{item.title}</h3>
          {item.author && (
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.author}</p>
          )}
          {item.excerpt && (
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">{item.excerpt}</p>
          )}
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: item.spaceColor + "20", color: item.spaceColor }}
          >
            {item.space}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
            <Clock size={10} /> {item.date}
          </span>
        </div>
        {item.progress !== undefined && (
          <div className="hidden md:block w-24 shrink-0">
            <ProgressBar value={item.progress} />
            <p className="text-xs text-[var(--color-text-muted)] mt-1 text-right">{item.progress}%</p>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setStarred(!starred); }}
          className="shrink-0"
        >
          <Star
            size={16}
            className={starred ? "text-[var(--color-warning)] fill-[var(--color-warning)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-subtle)]"}
          />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors cursor-pointer flex flex-col gap-3"
    >
      {/* Space badge */}
      <div className="flex items-center justify-between">
        <span
          className="px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ background: item.spaceColor + "20", color: item.spaceColor }}
        >
          {item.space}
        </span>
        <button onClick={(e) => { e.stopPropagation(); setStarred(!starred); }}>
          <Star
            size={15}
            className={starred ? "text-[var(--color-warning)] fill-[var(--color-warning)]" : "text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"}
          />
        </button>
      </div>

      {/* Emoji + title */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: item.spaceColor + "15" }}
        >
          {item.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-text)] leading-snug line-clamp-2">{item.title}</h3>
          {item.author && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.author}</p>
          )}
          {item.excerpt && (
            <p className="text-xs text-[var(--color-text-subtle)] mt-1 line-clamp-2">{item.excerpt}</p>
          )}
        </div>
      </div>

      {/* Progress */}
      {item.progress !== undefined && (
        <div>
          <ProgressBar value={item.progress} />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-[var(--color-text-muted)]">{item.progress}% complete</span>
            {item.readTime && (
              <span className="text-xs text-[var(--color-text-muted)]">{item.readTime}</span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-[var(--color-border)]">
        <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
          <Clock size={10} /> {item.date}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
          style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-text-muted)" }}
        >
          {item.type}
        </span>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-24 h-24 rounded-3xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mb-6">
        <Library size={36} className="text-[var(--color-primary)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Your library is empty</h3>
      <p className="text-[var(--color-text-muted)] text-sm max-w-xs">
        Start exploring spaces and saving content — books, notes, and highlights will appear here.
      </p>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        Explore Spaces
      </motion.button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedSpace, setSelectedSpace] = useState("All Spaces");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = libraryItems.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "books" && item.type === "book") ||
      (activeTab === "notes" && item.type === "note") ||
      (activeTab === "highlights" && item.type === "highlight") ||
      (activeTab === "downloads" && item.type === "download");
    const matchesSpace = selectedSpace === "All Spaces" || item.space === selectedSpace;
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.author?.toLowerCase().includes(query.toLowerCase()) ?? false);
    return matchesTab && matchesSpace && matchesQuery;
  });

  const counts: Record<Tab, number> = {
    all: libraryItems.length,
    books: libraryItems.filter((i) => i.type === "book").length,
    notes: libraryItems.filter((i) => i.type === "note").length,
    highlights: libraryItems.filter((i) => i.type === "highlight").length,
    downloads: libraryItems.filter((i) => i.type === "download").length,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-6 lg:p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] flex items-center gap-3">
              <BookMarked className="text-[var(--color-primary)]" size={28} />
              Your Library
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">
              {libraryItems.length} items saved across your spaces
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === "grid"
                  ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/40 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <Grid3X3 size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === "list"
                  ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/40 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              <List size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-1 p-1 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] w-fit mb-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? "text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="activeLibTab"
                className="absolute inset-0 rounded-lg bg-[var(--color-primary)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20" : "bg-white/5"}`}>
                {counts[tab.key]}
              </span>
            </span>
          </button>
        ))}
      </motion.div>

      {/* Search + Filter bar */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-56">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your library..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            showFilters || selectedSpace !== "All Spaces"
              ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/40 text-[var(--color-primary)]"
              : "bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
        >
          <Filter size={14} />
          Filter
          {selectedSpace !== "All Spaces" && (
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          )}
        </button>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none flex items-center gap-2 px-4 py-2.5 pr-8 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 cursor-pointer transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <SortAsc size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
        </div>
      </motion.div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] flex flex-wrap gap-4">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] mb-2 block">Space</label>
                <div className="flex flex-wrap gap-2">
                  {SPACES.map((space) => (
                    <button
                      key={space}
                      onClick={() => setSelectedSpace(space)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedSpace === space
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-white/5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/10"
                      }`}
                    >
                      {space}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] mb-2 block">Date Added</label>
                <div className="flex flex-wrap gap-2">
                  {["Today", "This Week", "This Month", "All Time"].map((d) => (
                    <button
                      key={d}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/10 transition-colors flex items-center gap-1"
                    >
                      <Calendar size={10} />
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content grid / list */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <EmptyState key="empty" />
        ) : (
          <motion.div
            key={`${activeTab}-${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "flex flex-col gap-3"
            }
          >
            {filtered.map((item) => (
              <LibraryCard key={item.id} item={item} view={viewMode} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
