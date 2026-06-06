"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Zap, Play, Clock, RotateCcw } from "lucide-react";
import { spaces, quizResults } from "../data";

const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function QuizzesTab() {
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
        className="rounded-[20px] border border-border/40 p-6 bg-surface shadow-sm"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[14px] bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-foreground tracking-tight">Quick Quiz</h3>
        </div>
        <p className="text-text-muted text-sm font-light mb-6 ml-[52px]">Ready to test your knowledge?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Space selector */}
          <div>
            <label className="block text-[11px] text-text-muted mb-2 font-medium uppercase tracking-widest pl-1">Select Space</label>
            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="w-full px-4 py-3 rounded-[14px] border border-border/40 bg-surface-hover text-foreground text-[14px] font-medium focus:outline-none focus:border-primary/50 transition-colors cursor-pointer appearance-none shadow-sm"
            >
              {spaces.map((s) => (
                <option key={s} value={s} className="bg-surface text-foreground">{s}</option>
              ))}
            </select>
          </div>

          {/* Quiz type */}
          <div>
            <label className="block text-[11px] text-text-muted mb-2 font-medium uppercase tracking-widest pl-1">Quiz Type</label>
            <div className="flex gap-2">
              {quizTypes.map((qt) => (
                <button
                  key={qt.key}
                  onClick={() => setQuizType(qt.key)}
                  className={`flex-1 py-3 rounded-[14px] text-[13px] font-medium transition-all border shadow-sm ${
                    quizType === qt.key
                      ? "bg-primary border-primary text-white"
                      : "bg-surface-hover border-border/40 text-text-muted hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {qt.label}
                  <span className="block text-[10px] opacity-70 mt-0.5">{qt.questions}q</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Link href={`/learning-center/quiz/${Math.random().toString(36).substring(2, 15)}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 rounded-[14px] bg-primary text-white font-medium text-[14px] hover:bg-primary-dark transition-all shadow-sm shadow-primary/20"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Quiz
          </motion.button>
        </Link>
      </motion.div>

      {/* Recent Results */}
      <motion.div variants={itemVariants}>
        <h3 className="text-[15px] font-medium text-foreground mb-4 pl-1">Recent Quiz Results</h3>
        <div className="space-y-3">
          {quizResults.map((result) => (
            <motion.div
              key={result.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 p-4 rounded-[16px] border border-border/40 bg-surface hover:bg-surface-hover/50 transition-colors shadow-sm cursor-default group"
            >
              <div className="text-[28px] w-12 h-12 flex items-center justify-center bg-background/50 rounded-[12px] group-hover:scale-105 transition-transform">{result.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[15px] font-medium text-foreground truncate tracking-tight">{result.space}</span>
                  <span
                    className={`flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase ${
                      result.trend > 0 ? "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20" : "text-rose-500 bg-rose-500/10 border border-rose-500/20"
                    }`}
                  >
                    {result.trend > 0 ? "+" : ""}{result.trend} from last
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[12px] font-light text-text-muted">
                  <span className="flex items-center gap-1.5"><Clock size={12} className="opacity-70" />{result.timeTaken}</span>
                  <span className="text-border/60">·</span>
                  <span>{result.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <div className="text-[18px] font-medium text-foreground leading-none">{result.score}</div>
                  <div className="text-[11px] font-medium text-text-muted mt-1">/{result.total}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-surface-hover border border-border/50 hover:bg-background text-[12px] text-foreground font-medium transition-colors shadow-sm"
                >
                  <RotateCcw size={14} />
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
