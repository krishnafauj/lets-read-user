"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { BookOpen, Play, AlertCircle } from "lucide-react";
import { spaces, flashcardDecks } from "../data";

const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function FlashcardsTab() {
  const [selectedSpace, setSelectedSpace] = useState(spaces[0]);
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {/* Study Mode Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-[20px] border border-border/40 p-6 bg-surface shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-[14px] bg-amber-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-tight">Study Mode</h3>
            </div>
            <p className="text-text-muted text-sm font-light mb-6 ml-[52px]">Reinforce your knowledge with spaced repetition</p>
            <div className="mb-6 ml-[52px]">
              <label className="block text-[11px] text-text-muted mb-2 font-medium uppercase tracking-widest pl-1">Select Space</label>
              <select
                value={selectedSpace}
                onChange={(e) => setSelectedSpace(e.target.value)}
                className="w-full max-w-xs px-4 py-3 rounded-[14px] border border-border/40 bg-surface-hover text-foreground text-[14px] font-medium focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer appearance-none shadow-sm"
              >
                {spaces.map((s) => (
                  <option key={s} value={s} className="bg-surface text-foreground">{s}</option>
                ))}
              </select>
            </div>
            <div className="ml-[52px]">
              <Link href="/learning-center/flashcards">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-[14px] bg-amber-500 text-white font-medium text-[14px] hover:bg-amber-600 transition-all shadow-sm shadow-amber-500/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Study Now
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mini flashcard preview */}
          <div
            className="relative cursor-pointer shrink-0 mx-auto md:mx-0 w-[200px] h-[140px] md:w-[220px] md:h-[150px]"
            style={{ perspective: 1000 }}
            onClick={() => setFlipped(!flipped)}
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-[20px] border border-border/40 bg-surface shadow-sm flex flex-col items-center justify-center p-4 text-center hover:shadow-md transition-shadow"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-[11px] text-text-muted mb-2 uppercase tracking-widest font-medium">Question</span>
                <span className="text-[15px] text-foreground font-medium leading-snug">What is deep work?</span>
                <span className="text-[10px] text-text-muted/60 mt-auto font-light">click to flip</span>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 rounded-[20px] border border-amber-500/40 bg-amber-500/5 flex flex-col items-center justify-center p-5 text-center shadow-md"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-[11px] text-amber-500 mb-2 uppercase tracking-widest font-medium">Answer</span>
                <span className="text-[13px] text-foreground font-light leading-relaxed">Professional activity performed in a state of distraction-free concentration.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decks Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-[15px] font-medium text-foreground mb-4 pl-1">Flashcard Decks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {flashcardDecks.map((deck) => (
            <motion.div
              key={deck.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="p-5 rounded-[16px] border border-border/40 bg-surface hover:bg-surface-hover/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[28px] w-12 h-12 flex items-center justify-center bg-background/50 rounded-[12px] group-hover:scale-105 transition-transform">{deck.emoji}</span>
                  <div>
                    <div className="text-[14px] font-medium text-foreground tracking-tight">{deck.name}</div>
                    <div className="text-[12px] font-light text-text-muted">{deck.cardCount} cards</div>
                  </div>
                </div>
                {deck.dueCards > 0 && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold tracking-wider text-rose-500 uppercase">
                    <AlertCircle className="w-3 h-3" />
                    Due: {deck.dueCards}
                  </span>
                )}
              </div>
              {/* Mastery bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-medium tracking-widest uppercase text-text-muted">
                  <span>Mastery</span>
                  <span className="text-foreground/70">{deck.mastery}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden border border-border/20">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${deck.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${deck.mastery}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
