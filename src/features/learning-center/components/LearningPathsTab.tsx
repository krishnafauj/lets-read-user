"use client";

import { motion, Variants } from "framer-motion";
import { Map, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { pathNodes, PathNode } from "../data";

const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function LearningPathsTab() {
  const statusIcon = (status: PathNode["status"]) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (status === "current") return <div className="w-5 h-5 rounded-sm border-2 border-indigo-500 bg-indigo-500/10 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /></div>;
    return <Circle className="w-5 h-5 text-text-muted/40" />;
  };

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="rounded-sm border border-indigo-500/20 p-6 bg-surface shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[60px] rounded-sm pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-sm bg-indigo-500/10 flex items-center justify-center">
                <Map className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-tight">Deep Work Mastery Path</h3>
            </div>
            <p className="text-[13px] font-light text-text-muted ml-[52px]">Structured curriculum based on Cal Newport's principles</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[24px] font-medium text-foreground">50%</div>
            <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest mt-1">Completion</div>
          </div>
        </div>
      </motion.div>

      {/* Path Nodes */}
      <motion.div variants={itemVariants} className="relative">
        {/* Vertical line connecting nodes */}
        <div className="absolute top-6 bottom-8 left-6 w-px bg-border/60" />

        <div className="space-y-6">
          {pathNodes.map((node, i) => (
            <div key={node.id} className="relative flex items-center gap-4 group">
              <div className="w-12 flex justify-center bg-background py-2 relative z-10 shrink-0">
                {statusIcon(node.status)}
              </div>
              
              <div
                className={`flex-1 flex items-center justify-between p-4 rounded-sm border transition-all ${
                  node.status === "current"
                    ? "border-indigo-500/30 bg-indigo-500/5 shadow-sm"
                    : node.status === "completed"
                    ? "border-border/40 bg-surface hover:bg-surface-hover/50 hover:shadow-sm"
                    : "border-border/20 bg-surface/50 opacity-60"
                }`}
              >
                <div>
                  <div className={`text-[11px] font-medium tracking-widest uppercase mb-1 ${
                    node.status === "current" ? "text-indigo-500" : "text-text-muted"
                  }`}>
                    {node.chapter}
                  </div>
                  <h4 className={`text-[15px] font-medium ${
                    node.status === "locked" ? "text-text-muted" : "text-foreground"
                  }`}>
                    {node.title}
                  </h4>
                </div>
                {node.status === "current" && (
                  <motion.button
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-indigo-500 text-white text-[13px] font-medium shadow-sm hover:bg-indigo-600 transition-colors"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
