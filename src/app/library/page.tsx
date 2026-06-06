"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
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
  BookMarked,
  X,
  Calendar,
  Heart,
  Clock,
  Bookmark,
  Library,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Tab, ViewMode } from "@/features/library/types";
import { libraryItems } from "@/features/library/data/mockData";
import { LibraryCard } from "@/features/library/components/LibraryCard";
import { EmptyState } from "@/features/library/components/EmptyState";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "All", icon: <Grid3X3 size={16} /> },
  { key: "books", label: "Books", icon: <BookOpen size={16} /> },
  { key: "favorites", label: "Favorites", icon: <Heart size={16} /> },
  { key: "owned", label: "Owned", icon: <Library size={16} /> },
  { key: "rented", label: "Rented", icon: <Clock size={16} /> },
  { key: "ai-workspace", label: "AI Workspace", icon: <Sparkles size={16} /> },
  { key: "wishlist", label: "Wishlist", icon: <Bookmark size={16} /> },
  { key: "notes", label: "Notes", icon: <FileText size={16} /> },
  { key: "highlights", label: "Highlights", icon: <Highlighter size={16} /> },
  { key: "downloads", label: "Downloads", icon: <Download size={16} /> },
];

const SPACES = ["All Spaces", "Productivity", "Psychology", "Self Improvement", "Finance", "Entrepreneurship"];
const SORT_OPTIONS = ["Recently Added", "A–Z", "Progress", "Starred First"];

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
      (activeTab === "favorites" && item.starred === true) ||
      (activeTab === "owned" && item.ownership === "owned") ||
      (activeTab === "rented" && item.ownership === "rented") ||
      (activeTab === "ai-workspace" && item.type === "ai-workspace") ||
      (activeTab === "wishlist" && item.ownership === "wishlist") ||
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
    favorites: libraryItems.filter((i) => i.starred === true).length,
    owned: libraryItems.filter((i) => i.ownership === "owned").length,
    rented: libraryItems.filter((i) => i.ownership === "rented").length,
    "ai-workspace": libraryItems.filter((i) => i.type === "ai-workspace").length,
    wishlist: libraryItems.filter((i) => i.ownership === "wishlist").length,
    notes: libraryItems.filter((i) => i.type === "note").length,
    highlights: libraryItems.filter((i) => i.type === "highlight").length,
    downloads: libraryItems.filter((i) => i.type === "download").length,
  };

  return (
    <div className="relative min-h-screen">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-sm bg-primary/5 blur-[120px]" />
        <div className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] rounded-sm bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] rounded-sm bg-primary/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative pt-4 pb-20 px-6 lg:px-12 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-medium text-foreground flex items-center gap-3">
                Your Library
              </h1>
            <p className="text-text-muted text-sm mt-2 font-medium">
              {libraryItems.length} items saved across your spaces
            </p>
          </div>
          <div className="flex items-center gap-2 p-1 bg-surface-hover/30 border border-border/50 rounded-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-sm transition-all ${
                viewMode === "grid"
                  ? "bg-surface shadow-sm text-foreground"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-sm transition-all ${
                viewMode === "list"
                  ? "bg-surface shadow-sm text-foreground"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="w-full overflow-x-auto scrollbar-hide mb-8 pb-2">
        <div className="flex gap-1.5 p-1.5 bg-surface-hover/30 rounded-sm border border-border/40 w-fit min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "text-background"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeLibTab"
                  className="absolute inset-0 rounded-sm bg-foreground shadow-sm"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {tab.icon}
                {tab.label}
                <span className={`text-[10px] px-2 py-0.5 rounded-sm font-semibold ${activeTab === tab.key ? "bg-background/20 text-background" : "bg-border text-text-muted"}`}>
                  {counts[tab.key]}
                </span>
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search + Filter bar */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="relative flex-1 w-full sm:min-w-64">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your library..."
            className="w-full pl-11 pr-4 py-3.5 rounded-sm bg-surface/50 border border-border/60 text-sm font-medium text-foreground placeholder:text-text-muted focus:outline-none focus:border-foreground/30 focus:ring-4 focus:ring-foreground/5 transition-all shadow-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors p-1 bg-surface-hover rounded-sm">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm border text-sm font-medium transition-all shadow-sm ${
              showFilters || selectedSpace !== "All Spaces"
                ? "bg-foreground text-background border-foreground"
                : "bg-surface border-border/60 text-text-muted hover:text-foreground hover:bg-surface-hover/50 hover:border-foreground/20"
            }`}
          >
            <Filter size={16} />
            Filter
            {selectedSpace !== "All Spaces" && (
              <span className="w-2 h-2 rounded-sm bg-background" />
            )}
          </button>

          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none flex items-center gap-2 px-5 py-3.5 pr-10 rounded-sm bg-surface border border-border/60 text-sm font-medium text-text-muted focus:outline-none focus:border-foreground/30 focus:ring-4 focus:ring-foreground/5 cursor-pointer transition-all shadow-sm hover:border-foreground/20"
            >
              {SORT_OPTIONS.map((opt) => (
               <option key={opt} value={opt} className="bg-surface text-foreground font-medium">{opt}</option>
              ))}
            </select>
            <SortAsc size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-8 origin-top"
          >
            <div className="p-6 rounded-sm bg-surface-hover/30 border border-border/40 flex flex-wrap gap-8 shadow-sm">
              <div className="flex-1 min-w-[200px]">
                <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider block mb-3 pl-1">Space</label>
                <div className="flex flex-wrap gap-2">
                  {SPACES.map((space) => (
                    <button
                      key={space}
                      onClick={() => setSelectedSpace(space)}
                      className={`px-3.5 py-2 rounded-sm text-xs font-medium transition-all border ${
                        selectedSpace === space
                          ? "bg-foreground text-background border-foreground shadow-sm"
                          : "bg-surface-hover/50 text-text-muted border-border/40 hover:text-foreground hover:bg-surface hover:border-foreground/30"
                      }`}
                    >
                      {space}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider block mb-3 pl-1">Date Added</label>
                <div className="flex flex-wrap gap-2">
                  {["Today", "This Week", "This Month", "All Time"].map((d) => (
                    <button
                      key={d}
                      className="px-3.5 py-2 rounded-sm text-xs font-medium transition-all border bg-surface-hover/50 text-text-muted border-border/40 hover:text-foreground hover:bg-surface hover:border-foreground/30 flex items-center gap-1.5"
                    >
                      <Calendar size={12} className="opacity-70" />
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
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
    </div>
  );
}
