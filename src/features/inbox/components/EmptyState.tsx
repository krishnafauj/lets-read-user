import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { FilterTab } from "../types";

export function EmptyState({ tab }: { tab: FilterTab }) {
  const labels: Record<FilterTab, string> = {
    all: "No notifications yet",
    learning: "No learning updates",
    updates: "No content updates",
    achievements: "No achievements yet",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
        <Bell size={30} className="text-primary" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{labels[tab]}</h3>
      <p className="text-text-muted text-sm max-w-xs">
        When you earn achievements, get updates, or receive answers — they&apos;ll appear here.
      </p>
    </motion.div>
  );
}
