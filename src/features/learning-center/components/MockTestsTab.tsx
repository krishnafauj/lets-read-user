"use client";

import { motion, Variants } from "framer-motion";
import { Timer, Clock, Play, TrendingUp } from "lucide-react";
import { mockTests } from "../data";

const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function MockTestsTab() {
  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
      <motion.div variants={itemVariants} className="flex items-center gap-4 p-5 rounded-sm border border-border/40 bg-surface shadow-sm">
        <div className="w-12 h-12 rounded-sm bg-emerald-500/10 flex items-center justify-center shrink-0">
          <Timer className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <div className="text-[15px] font-medium text-foreground tracking-tight">Exam Simulation Mode</div>
          <div className="text-[13px] font-light text-text-muted mt-0.5">Full-length tests with timed conditions and detailed analytics</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTests.map((test) => (
          <motion.div
            key={test.id}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="p-5 rounded-sm border border-border/40 bg-surface hover:bg-surface-hover/50 hover:shadow-md transition-all cursor-default flex flex-col group"
          >
            <div className="flex items-start gap-4 mb-5">
              <span className="text-[28px] w-12 h-12 flex items-center justify-center bg-background/50 rounded-sm group-hover:scale-105 transition-transform shrink-0">{test.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="pr-3">
                    <h4 className="text-[15px] font-medium text-foreground truncate">{test.name}</h4>
                    <div className="flex items-center gap-3 mt-1.5 text-[12px] font-light text-text-muted">
                      <span className="flex items-center gap-1.5"><Clock size={12} className="opacity-70" />{test.duration}</span>
                      <span className="text-border/60">·</span>
                      <span>{test.questions} qs</span>
                      {test.attempts > 0 && (
                        <>
                          <span className="text-border/60">·</span>
                          <span>{test.attempts} attempt{test.attempts > 1 ? "s" : ""}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {test.bestScore !== null && (
                    <div className="text-right shrink-0">
                      <div className="text-[18px] font-medium text-foreground leading-none">{test.bestScore}%</div>
                      <div className="text-[10px] font-medium text-text-muted mt-1 uppercase tracking-widest">Best</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-medium transition-colors shadow-sm shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                {test.attempts === 0 ? "Start Test" : "Retake"}
              </motion.button>
              {test.bestScore !== null && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-surface-hover border border-border/50 text-foreground text-[13px] font-medium transition-colors hover:bg-background shadow-sm"
                >
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  Improve
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
