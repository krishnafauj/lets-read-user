"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mic,
  X,
  TrendingUp,
  Star,
  ChevronRight,
  Users,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Briefcase,
  Brain,
  Monitor,
  Palette,
  Globe,
  DollarSign,
  UserPlus,
  Hash,
  LayoutGrid,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -3, transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrendingSpace {
  id: number;
  rank: string;
  title: string;
  creator: string;
  category: string;
  emoji: string;
  gradient: string;
  newSubscribers: number;
  rating: number;
  price: "Free" | string;
}

interface Creator {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  gradient: string;
  spaceCount: number;
  followers: number;
  verified: boolean;
}

interface TopicTile {
  id: number;
  name: string;
  spaceCount: number;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
}

interface SpaceCard {
  id: number;
  title: string;
  creator: string;
  emoji: string;
  gradient: string;
  rating: number;
  price: "Free" | string;
  category: string;
  learners: number;
}

interface SearchResult {
  spaces: { id: number; title: string; creator: string; emoji: string }[];
  creators: { id: number; name: string; specialty: string; avatar: string }[];
  topics: { id: number; name: string; spaceCount: number }[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const RECENT_SEARCHES = [
  "Atomic Habits",
  "Psychology of Money",
  "Machine Learning",
  "Design Thinking",
  "Stoicism",
];

const CATEGORIES = [
  { id: "all", label: "All", emoji: null },
  { id: "books", label: "Books", emoji: "📖" },
  { id: "courses", label: "Courses", emoji: "🎓" },
  { id: "research", label: "Research", emoji: "🔬" },
  { id: "business", label: "Business", emoji: "💼" },
  { id: "psychology", label: "Psychology", emoji: "🧠" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "design", label: "Design", emoji: "🎨" },
  { id: "history", label: "History", emoji: "🌍" },
  { id: "finance", label: "Finance", emoji: "💰" },
];

const trendingSpaces: TrendingSpace[] = [
  {
    id: 1,
    rank: "01",
    title: "Thinking, Fast and Slow",
    creator: "Daniel Kahneman",
    category: "Psychology",
    emoji: "🧠",
    gradient: "from-violet-600 to-purple-700",
    newSubscribers: 234,
    rating: 4.9,
    price: "Free",
  },
  {
    id: 2,
    rank: "02",
    title: "The Psychology of Money",
    creator: "Morgan Housel",
    category: "Finance",
    emoji: "💰",
    gradient: "from-emerald-600 to-teal-700",
    newSubscribers: 187,
    rating: 4.8,
    price: "$4.99",
  },
  {
    id: 3,
    rank: "03",
    title: "Zero to One",
    creator: "Peter Thiel",
    category: "Business",
    emoji: "🚀",
    gradient: "from-orange-600 to-red-700",
    newSubscribers: 156,
    rating: 4.7,
    price: "Free",
  },
];

const featuredCreators: Creator[] = [
  {
    id: 1,
    name: "Sarah Chen",
    specialty: "Psychology & Behavior",
    avatar: "SC",
    gradient: "from-violet-500 to-purple-600",
    spaceCount: 14,
    followers: 23400,
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Wright",
    specialty: "Business Strategy",
    avatar: "MW",
    gradient: "from-emerald-500 to-teal-600",
    spaceCount: 9,
    followers: 18700,
    verified: true,
  },
  {
    id: 3,
    name: "Priya Nair",
    specialty: "Neuroscience & AI",
    avatar: "PN",
    gradient: "from-sky-500 to-blue-600",
    spaceCount: 12,
    followers: 31200,
    verified: true,
  },
  {
    id: 4,
    name: "Luca Rossi",
    specialty: "Philosophy & Ethics",
    avatar: "LR",
    gradient: "from-rose-500 to-pink-600",
    spaceCount: 7,
    followers: 9800,
    verified: false,
  },
  {
    id: 5,
    name: "Aisha Patel",
    specialty: "Finance & Investing",
    avatar: "AP",
    gradient: "from-amber-500 to-orange-600",
    spaceCount: 11,
    followers: 27600,
    verified: true,
  },
];

const topicTiles: TopicTile[] = [
  {
    id: 1,
    name: "Psychology",
    spaceCount: 342,
    icon: <Brain size={28} />,
    gradient: "from-violet-900/80 to-purple-900/80",
    textColor: "text-violet-300",
  },
  {
    id: 2,
    name: "Technology",
    spaceCount: 589,
    icon: <Monitor size={28} />,
    gradient: "from-sky-900/80 to-blue-900/80",
    textColor: "text-sky-300",
  },
  {
    id: 3,
    name: "Business",
    spaceCount: 428,
    icon: <Briefcase size={28} />,
    gradient: "from-emerald-900/80 to-teal-900/80",
    textColor: "text-emerald-300",
  },
  {
    id: 4,
    name: "Design",
    spaceCount: 213,
    icon: <Palette size={28} />,
    gradient: "from-rose-900/80 to-pink-900/80",
    textColor: "text-rose-300",
  },
  {
    id: 5,
    name: "History",
    spaceCount: 176,
    icon: <Globe size={28} />,
    gradient: "from-amber-900/80 to-orange-900/80",
    textColor: "text-amber-300",
  },
  {
    id: 6,
    name: "Finance",
    spaceCount: 305,
    icon: <DollarSign size={28} />,
    gradient: "from-green-900/80 to-emerald-900/80",
    textColor: "text-green-300",
  },
];

const recentlyAddedSpaces: SpaceCard[] = [
  {
    id: 1,
    title: "Sapiens: A Brief History",
    creator: "Yuval Noah Harari",
    emoji: "🌍",
    gradient: "from-blue-600 to-cyan-700",
    rating: 4.8,
    price: "Free",
    category: "History",
    learners: 8420,
  },
  {
    id: 2,
    title: "The Lean Startup",
    creator: "Eric Ries",
    emoji: "📈",
    gradient: "from-green-600 to-emerald-700",
    rating: 4.6,
    price: "$3.99",
    category: "Business",
    learners: 6200,
  },
  {
    id: 3,
    title: "Deep Learning Fundamentals",
    creator: "Dr. Yoshua Bengio",
    emoji: "🤖",
    gradient: "from-indigo-600 to-violet-700",
    rating: 4.9,
    price: "$9.99",
    category: "Tech",
    learners: 12800,
  },
  {
    id: 4,
    title: "Influence: Science of Persuasion",
    creator: "Robert Cialdini",
    emoji: "🎯",
    gradient: "from-orange-600 to-rose-700",
    rating: 4.7,
    price: "Free",
    category: "Psychology",
    learners: 9100,
  },
  {
    id: 5,
    title: "A Random Walk Down Wall Street",
    creator: "Burton Malkiel",
    emoji: "📊",
    gradient: "from-teal-600 to-cyan-700",
    rating: 4.5,
    price: "$4.99",
    category: "Finance",
    learners: 5400,
  },
  {
    id: 6,
    title: "The Design of Everyday Things",
    creator: "Don Norman",
    emoji: "🎨",
    gradient: "from-pink-600 to-rose-700",
    rating: 4.8,
    price: "Free",
    category: "Design",
    learners: 7300,
  },
  {
    id: 7,
    title: "How to Win Friends",
    creator: "Dale Carnegie",
    emoji: "🤝",
    gradient: "from-amber-600 to-yellow-700",
    rating: 4.6,
    price: "Free",
    category: "Psychology",
    learners: 15200,
  },
  {
    id: 8,
    title: "Clean Code",
    creator: "Robert C. Martin",
    emoji: "💻",
    gradient: "from-slate-600 to-gray-700",
    rating: 4.7,
    price: "$6.99",
    category: "Tech",
    learners: 11400,
  },
];

const MOCK_RESULTS: SearchResult = {
  spaces: [
    { id: 1, title: "Thinking, Fast and Slow", creator: "Daniel Kahneman", emoji: "🧠" },
    { id: 2, title: "The Psychology of Money", creator: "Morgan Housel", emoji: "💰" },
    { id: 3, title: "Atomic Habits", creator: "James Clear", emoji: "⚡" },
  ],
  creators: [
    { id: 1, name: "Sarah Chen", specialty: "Psychology & Behavior", avatar: "SC" },
    { id: 2, name: "Marcus Wright", specialty: "Business Strategy", avatar: "MW" },
  ],
  topics: [
    { id: 1, name: "Psychology", spaceCount: 342 },
    { id: 2, name: "Behavioral Finance", spaceCount: 87 },
  ],
};

// ─── Helper: format numbers ───────────────────────────────────────────────────

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-yellow-400">
      <Star size={11} fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}

function PriceBadge({ price }: { price: "Free" | string }) {
  const isFree = price === "Free";
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-semibold"
      style={{
        background: isFree ? "rgba(34,197,94,0.15)" : "rgba(99,102,241,0.15)",
        color: isFree ? "#4ade80" : "#818cf8",
        border: `1px solid ${isFree ? "rgba(34,197,94,0.3)" : "rgba(99,102,241,0.3)"}`,
      }}
    >
      {price}
    </span>
  );
}

function TrendingBadge() {
  return (
    <span
      className="text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1"
      style={{
        background: "rgba(239,68,68,0.15)",
        color: "#f87171",
        border: "1px solid rgba(239,68,68,0.3)",
      }}
    >
      <TrendingUp size={10} />
      Trending
    </span>
  );
}

// ─── Search Dropdown ──────────────────────────────────────────────────────────

function SearchDropdown({
  results,
  onClose,
  query,
}: {
  results: SearchResult;
  onClose: () => void;
  query: string;
}) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const allItems = [
    ...results.spaces.map((s) => ({ ...s, type: "space" as const })),
    ...results.creators.map((c) => ({ ...c, type: "creator" as const })),
    ...results.topics.map((t) => ({ ...t, type: "topic" as const })),
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, allItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [allItems.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50"
      style={{
        background: "#111113",
        borderColor: "#3F3F46",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
      }}
    >
      {/* Spaces */}
      {results.spaces.length > 0 && (
        <div className="p-3">
          <p className="text-xs font-semibold px-2 mb-2 flex items-center gap-1.5" style={{ color: "#52525B" }}>
            <BookOpen size={11} /> Spaces
          </p>
          {results.spaces.map((space, i) => (
            <div
              key={space.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
              style={{
                background: focusedIndex === i ? "rgba(99,102,241,0.1)" : "transparent",
              }}
              onMouseEnter={() => setFocusedIndex(i)}
            >
              <span className="text-xl">{space.emoji}</span>
              <div>
                <p className="text-sm font-medium" style={{ color: "#E4E4E7" }}>
                  {space.title}
                </p>
                <p className="text-xs" style={{ color: "#71717A" }}>
                  {space.creator}
                </p>
              </div>
              <ArrowUpRight size={14} className="ml-auto opacity-40" style={{ color: "#A1A1AA" }} />
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div style={{ borderTop: "1px solid #27272A" }} />

      {/* Creators */}
      {results.creators.length > 0 && (
        <div className="p-3">
          <p className="text-xs font-semibold px-2 mb-2 flex items-center gap-1.5" style={{ color: "#52525B" }}>
            <UserPlus size={11} /> Creators
          </p>
          {results.creators.map((creator, i) => {
            const idx = results.spaces.length + i;
            return (
              <div
                key={creator.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
                style={{
                  background: focusedIndex === idx ? "rgba(99,102,241,0.1)" : "transparent",
                }}
                onMouseEnter={() => setFocusedIndex(idx)}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                  }}
                >
                  {creator.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#E4E4E7" }}>
                    {creator.name}
                  </p>
                  <p className="text-xs" style={{ color: "#71717A" }}>
                    {creator.specialty}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Divider */}
      <div style={{ borderTop: "1px solid #27272A" }} />

      {/* Topics */}
      {results.topics.length > 0 && (
        <div className="p-3">
          <p className="text-xs font-semibold px-2 mb-2 flex items-center gap-1.5" style={{ color: "#52525B" }}>
            <Hash size={11} /> Topics
          </p>
          {results.topics.map((topic, i) => {
            const idx = results.spaces.length + results.creators.length + i;
            return (
              <div
                key={topic.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer"
                style={{
                  background: focusedIndex === idx ? "rgba(99,102,241,0.1)" : "transparent",
                }}
                onMouseEnter={() => setFocusedIndex(idx)}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#27272A" }}
                >
                  <Hash size={14} style={{ color: "#71717A" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#E4E4E7" }}>
                    {topic.name}
                  </p>
                  <p className="text-xs" style={{ color: "#71717A" }}>
                    {topic.spaceCount} spaces
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #27272A", background: "rgba(255,255,255,0.02)" }}
      >
        <p className="text-xs" style={{ color: "#52525B" }}>
          Press <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: "#27272A", color: "#A1A1AA" }}>↑↓</kbd> to navigate,{" "}
          <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: "#27272A", color: "#A1A1AA" }}>↵</kbd> to select,{" "}
          <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: "#27272A", color: "#A1A1AA" }}>Esc</kbd> to close
        </p>
        <button className="text-xs flex items-center gap-1" style={{ color: "#6366f1" }}>
          See all results for &quot;{query}&quot; <ArrowUpRight size={12} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [followedCreators, setFollowedCreators] = useState<Set<number>>(new Set());
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const hasQuery = query.trim().length > 1;

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleFollow = (id: number) => {
    setFollowedCreators((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#09090B", color: "#FAFAFA" }}>
      <motion.div
        className="max-w-7xl mx-auto px-6 py-10 space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── 1. HERO SEARCH ────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Discover Knowledge Spaces
            </h1>
            <p className="text-base" style={{ color: "#71717A" }}>
              Explore thousands of curated spaces built by expert creators
            </p>
          </div>

          {/* Search bar */}
          <div ref={searchRef} className="relative max-w-3xl mx-auto">
            <div
              className="flex items-center gap-3 rounded-2xl border px-5 py-4 transition-all"
              style={{
                background: "#18181B",
                borderColor: showDropdown || hasQuery ? "#6366f1" : "#3F3F46",
                boxShadow: showDropdown || hasQuery ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
              }}
            >
              <Search size={20} style={{ color: "#52525B", flexShrink: 0 }} />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(e.target.value.trim().length > 1);
                }}
                onFocus={() => {
                  if (query.trim().length > 1) setShowDropdown(true);
                }}
                placeholder="Search knowledge spaces, topics, creators..."
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: "#FAFAFA" }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setShowDropdown(false); }}
                  className="flex-shrink-0"
                >
                  <X size={16} style={{ color: "#52525B" }} />
                </button>
              )}
              <button
                onClick={() => setIsMicActive((v) => !v)}
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  background: isMicActive ? "rgba(99,102,241,0.2)" : "transparent",
                  color: isMicActive ? "#818cf8" : "#52525B",
                }}
              >
                <Mic size={16} />
              </button>
            </div>

            {/* Search dropdown */}
            <AnimatePresence>
              {showDropdown && hasQuery && (
                <SearchDropdown
                  results={MOCK_RESULTS}
                  query={query}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Recent searches */}
          <div className="flex items-center gap-2 flex-wrap max-w-3xl mx-auto">
            <span className="text-xs" style={{ color: "#52525B" }}>
              Recent:
            </span>
            {RECENT_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => { setQuery(term); setShowDropdown(true); }}
                className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-indigo-500/50"
                style={{
                  background: "#18181B",
                  borderColor: "#3F3F46",
                  color: "#A1A1AA",
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </motion.section>

        {/* ── 2. FEATURED BANNER ────────────────────────────────────────────── */}
        <motion.section variants={itemVariants}>
          <motion.div
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            className="relative rounded-3xl overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
              minHeight: "220px",
            }}
          >
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px",
              }}
            />

            {/* Glow orbs */}
            <div
              className="absolute top-[-40px] right-[10%] w-64 h-64 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
            />
            <div
              className="absolute bottom-[-40px] left-[20%] w-48 h-48 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
            />

            <div className="relative z-10 p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-5">
                {/* Book emoji tile */}
                <div
                  className="w-20 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  🧠
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                      style={{
                        background: "rgba(251,191,36,0.2)",
                        color: "#fbbf24",
                        border: "1px solid rgba(251,191,36,0.3)",
                      }}
                    >
                      ✦ Editor&apos;s Pick
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Psychology
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    Thinking, Fast and Slow
                  </h2>
                  <p className="text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Daniel Kahneman
                  </p>
                  <p className="text-sm flex items-center gap-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <Users size={13} />
                    Join{" "}
                    <span className="font-semibold text-white">12,847</span> learners
                    exploring this space
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl font-semibold text-sm flex-shrink-0 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                }}
              >
                Explore Space
                <ArrowUpRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        {/* ── 3. CATEGORIES SCROLL ─────────────────────────────────────────── */}
        <motion.section variants={itemVariants}>
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "#18181B",
                    color: isActive ? "#fff" : "#A1A1AA",
                    border: `1px solid ${isActive ? "transparent" : "#3F3F46"}`,
                    boxShadow: isActive ? "0 0 16px rgba(99,102,241,0.3)" : "none",
                  }}
                >
                  {cat.emoji && <span className="mr-1.5">{cat.emoji}</span>}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* ── 4. TRENDING NOW ──────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp size={20} className="text-red-400" />
              Trending Now
            </h2>
            <button
              className="text-sm flex items-center gap-1 font-medium"
              style={{ color: "#6366f1" }}
            >
              See all <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {trendingSpaces.map((space, i) => (
              <motion.div
                key={space.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="rounded-2xl border overflow-hidden cursor-pointer"
                style={{ background: "#18181B", borderColor: "#27272A" }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Gradient thumbnail */}
                <div
                  className={`h-40 bg-gradient-to-br ${space.gradient} flex items-end p-4 relative`}
                >
                  {/* Rank number */}
                  <span
                    className="absolute top-4 left-4 text-5xl font-black opacity-20 leading-none select-none"
                    style={{ color: "#fff" }}
                  >
                    {space.rank}
                  </span>
                  <span className="text-5xl z-10">{space.emoji}</span>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <TrendingBadge />
                    <PriceBadge price={space.price} />
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="font-semibold text-sm leading-snug">{space.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                      {space.creator}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <StarRating rating={space.rating} />
                    <p className="text-xs flex items-center gap-1" style={{ color: "#34d399" }}>
                      <TrendingUp size={11} />
                      +{space.newSubscribers} new subscribers this week
                    </p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2 rounded-xl text-sm font-semibold"
                    style={{
                      background: "rgba(99,102,241,0.12)",
                      color: "#818cf8",
                      border: "1px solid rgba(99,102,241,0.25)",
                    }}
                  >
                    View Space
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 5. FEATURED CREATORS ─────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-400" />
              Featured Creators
            </h2>
            <button
              className="text-sm flex items-center gap-1 font-medium"
              style={{ color: "#6366f1" }}
            >
              Browse all <ChevronRight size={14} />
            </button>
          </div>

          <div
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {featuredCreators.map((creator) => {
              const isFollowing = followedCreators.has(creator.id);
              return (
                <motion.div
                  key={creator.id}
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="flex-shrink-0 w-56 rounded-2xl border p-5 flex flex-col items-center gap-3 cursor-pointer"
                  style={{ background: "#18181B", borderColor: "#27272A" }}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${creator.gradient} flex items-center justify-center text-lg font-bold text-white`}
                    >
                      {creator.avatar}
                    </div>
                    {creator.verified && (
                      <div
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                        style={{ background: "#6366f1", border: "2px solid #18181B" }}
                      >
                        ✓
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="font-semibold text-sm">{creator.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                      {creator.specialty}
                    </p>
                  </div>

                  <div className="flex gap-3 text-center w-full">
                    <div className="flex-1">
                      <p className="text-sm font-bold">{creator.spaceCount}</p>
                      <p className="text-xs" style={{ color: "#52525B" }}>
                        Spaces
                      </p>
                    </div>
                    <div className="w-px" style={{ background: "#27272A" }} />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{formatNumber(creator.followers)}</p>
                      <p className="text-xs" style={{ color: "#52525B" }}>
                        Followers
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(creator.id);
                    }}
                    className="w-full py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: isFollowing
                        ? "rgba(99,102,241,0.15)"
                        : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: isFollowing ? "#818cf8" : "#fff",
                      border: isFollowing ? "1px solid rgba(99,102,241,0.3)" : "none",
                    }}
                  >
                    {isFollowing ? "Following ✓" : "Follow"}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── 6. BROWSE BY TOPIC ───────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <LayoutGrid size={20} className="text-indigo-400" />
              Browse by Topic
            </h2>
            <button
              className="text-sm flex items-center gap-1 font-medium"
              style={{ color: "#6366f1" }}
            >
              All topics <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topicTiles.map((topic, i) => (
              <motion.div
                key={topic.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className={`rounded-2xl border p-5 flex flex-col items-center gap-3 cursor-pointer bg-gradient-to-br ${topic.gradient}`}
                style={{ borderColor: "#27272A" }}
                transition={{ delay: i * 0.04 }}
              >
                <div className={topic.textColor}>{topic.icon}</div>
                <div className="text-center">
                  <p className="font-semibold text-sm text-white">{topic.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {topic.spaceCount} spaces
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 7. RECENTLY ADDED ────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen size={20} className="text-emerald-400" />
              Recently Added
            </h2>
            <button
              className="text-sm flex items-center gap-1 font-medium"
              style={{ color: "#6366f1" }}
            >
              View all <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyAddedSpaces.map((space, i) => (
              <motion.div
                key={space.id}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="rounded-2xl border overflow-hidden cursor-pointer"
                style={{ background: "#18181B", borderColor: "#27272A" }}
                transition={{ delay: i * 0.03 }}
              >
                {/* Thumbnail */}
                <div
                  className={`h-32 bg-gradient-to-br ${space.gradient} flex items-center justify-center text-4xl relative`}
                >
                  {space.emoji}
                  {/* Category pill */}
                  <span
                    className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      color: "rgba(255,255,255,0.75)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {space.category}
                  </span>
                </div>

                <div className="p-4 space-y-2.5">
                  <div>
                    <p className="font-semibold text-sm leading-snug line-clamp-1">
                      {space.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                      {space.creator}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <StarRating rating={space.rating} />
                    <p className="text-xs" style={{ color: "#52525B" }}>
                      {formatNumber(space.learners)} learners
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <PriceBadge price={space.price} />
                    <button
                      className="text-xs font-medium flex items-center gap-0.5"
                      style={{ color: "#818cf8" }}
                    >
                      Explore <ArrowUpRight size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants}>
          <div
            className="rounded-3xl p-px"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
            }}
          >
            <div
              className="rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ background: "#111113" }}
            >
              <div>
                <h3 className="text-2xl font-bold">Create Your Own Space</h3>
                <p className="mt-1 text-sm" style={{ color: "#71717A" }}>
                  Share your knowledge with thousands of eager learners worldwide
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                  }}
                >
                  Become a Creator
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm border"
                  style={{
                    background: "transparent",
                    borderColor: "#3F3F46",
                    color: "#E4E4E7",
                  }}
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="h-8" />
      </motion.div>
    </div>
  );
}
