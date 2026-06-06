"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Brain,
  Zap,
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  Flame,
  Map,
} from "lucide-react";
import { QuizzesTab } from "@/features/learning-center/components/QuizzesTab";
import { FlashcardsTab } from "@/features/learning-center/components/FlashcardsTab";
import { MockTestsTab } from "@/features/learning-center/components/MockTestsTab";
import { LearningPathsTab } from "@/features/learning-center/components/LearningPathsTab";
import { MasteryRing } from "@/features/learning-center/components/MasteryRing";
import { Tab } from "@/features/learning-center/types";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

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
    { label: "Quizzes Taken", value: "47", icon: <Zap className="w-4 h-4" />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Cards Reviewed", value: "312", icon: <BookOpen className="w-4 h-4" />, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Study Streak", value: "12d", icon: <Flame className="w-4 h-4" />, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Time Studied", value: "28h", icon: <Clock className="w-4 h-4" />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
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
            <div className="mb-3">
              <span className="text-[12px] font-medium text-indigo-500 uppercase tracking-widest">Learning Center</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-3 leading-tight tracking-tight drop-shadow-sm">
              Test your knowledge,
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                track your mastery
              </span>
            </h1>
            <p className="text-text-muted text-[15px] font-light mt-1 mb-8 max-w-md">
              Quizzes, flashcards, and mock tests — all tailored to your knowledge spaces.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-3.5 rounded-[16px] border border-border/40 bg-surface shadow-sm">
                  <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center shrink-0 ${s.color}`}>
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[16px] font-medium text-foreground leading-tight">{s.value}</div>
                    <div className="text-[11px] text-text-muted font-medium truncate">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mastery Ring */}
          <div className="flex flex-col items-center gap-2 shrink-0 bg-surface/50 p-6 rounded-[24px] border border-border/40 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <MasteryRing value={78} />
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted uppercase tracking-widest mt-2 relative z-10">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">+6%</span>
              <span className="opacity-70">this week</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-8 w-full overflow-x-auto scrollbar-hide pb-2">
        <div className="flex gap-1.5 p-1.5 rounded-[16px] bg-surface border border-border/40 w-fit min-w-max shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-[14px] font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "text-white"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeLearningTab"
                  className="absolute inset-0 rounded-[12px] bg-primary shadow-md"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
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
