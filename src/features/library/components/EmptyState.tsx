"use client";

import { motion } from "framer-motion";
import { Library } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-24 h-24 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6 shadow-sm">
        <Library size={36} className="text-primary/80" />
      </div>
      <h3 className="text-xl font-medium text-foreground mb-3">Your library is empty</h3>
      <p className="text-text-muted text-sm max-w-xs leading-relaxed">
        Start exploring spaces and saving content — books, notes, and highlights will appear here.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all shadow-md"
      >
        Explore Spaces
      </motion.button>
    </motion.div>
  );
}
