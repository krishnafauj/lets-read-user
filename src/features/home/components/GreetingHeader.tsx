"use client";

import { motion, Variants } from "framer-motion";
import { Flame, Settings } from "lucide-react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function GreetingHeader() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.section variants={itemVariants} className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal tracking-tight flex items-center gap-3">
            Good morning, Alex 👋
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-normal flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <Flame size={14} /> 47 
            </span>
            <p className="text-sm" style={{ color: "#A1A1AA" }}>
              You have 3 active learning sessions
            </p>
          </div>
          <p className="mt-2 text-sm font-medium" style={{ color: "#71717A" }}>
            {dateStr} &nbsp;·&nbsp; {timeStr}
          </p>
        </div>
        <div className="flex items-center">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-surface border border-border text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors shadow-sm font-medium text-sm">
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>
    </motion.section>
  );
}
