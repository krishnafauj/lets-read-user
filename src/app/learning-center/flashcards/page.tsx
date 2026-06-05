"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  CheckCircle2,
  RefreshCcw,
  Keyboard,
  RotateCcw,
  Trophy,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Flashcard {
  id: number;
  front: string;
  back: string;
  explanation: string;
  tag: string;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const deck: Flashcard[] = [
  {
    id: 1,
    front: "What is Deep Work?",
    back: "Professional activities performed in a state of distraction-free concentration.",
    explanation: "Deep work pushes cognitive capabilities to their limit and creates new value that is hard to replicate, making it increasingly rare and valuable in the knowledge economy.",
    tag: "Core Concept",
  },
  {
    id: 2,
    front: "What is the 'Attention Residue' effect?",
    back: "When switching tasks, part of your attention remains on the original task.",
    explanation: "Coined by Sophie Leroy, attention residue explains why multitasking and rapid task-switching hurt performance — your cognitive resources are divided even after you move on.",
    tag: "Research",
  },
  {
    id: 3,
    front: "Define 'Shallow Work'.",
    back: "Non-cognitively demanding logistical-style tasks, often performed while distracted.",
    explanation: "Shallow work tends not to create much new value and is easy to replicate. Examples include most emails, scheduling tasks, and routine administrative work.",
    tag: "Core Concept",
  },
  {
    id: 4,
    front: "What is the 'Rhythmic Philosophy' of deep work?",
    back: "Creating a consistent daily routine for deep work at the same scheduled time.",
    explanation: "By making deep work a daily habit through consistent timing, you eliminate the friction of deciding when to work deeply — the decision is pre-made.",
    tag: "Strategy",
  },
  {
    id: 5,
    front: "What is 'Time-Block Planning'?",
    back: "Scheduling every minute of your workday in advance into task blocks.",
    explanation: "Newport's time-block planning forces you to acknowledge the finite nature of daily time and deliberately assign it to your highest-priority work, protecting deep work sessions.",
    tag: "Technique",
  },
  {
    id: 6,
    front: "What does Newport mean by 'Craftsman Approach to Tools'?",
    back: "Adopt a tool only if its positive impacts substantially outweigh its negatives.",
    explanation: "As opposed to the 'any-benefit' approach (use a tool if it has any benefit), the craftsman approach demands careful cost-benefit analysis for every digital tool you adopt.",
    tag: "Strategy",
  },
  {
    id: 7,
    front: "What is the 'Fixed-Schedule Productivity' strategy?",
    back: "Set a firm end-time for your workday and work backward to fit everything in.",
    explanation: "By committing to a hard stop time (e.g., 5:30 PM), you create a forcing function that drives more efficient, focused work during the available hours.",
    tag: "Technique",
  },
  {
    id: 8,
    front: "What is 'Productive Meditation'?",
    back: "Using physically active but mentally unoccupied time to focus on a professional problem.",
    explanation: "During activities like walking or commuting, you redirect your attention to a well-defined professional challenge, training deep focus while making progress on important problems.",
    tag: "Practice",
  },
];

// ─── Flashcard Component ──────────────────────────────────────────────────────

function FlashCard({
  card,
  flipped,
  onFlip,
}: {
  card: Flashcard;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ width: "100%", maxWidth: 600, height: 320, perspective: 1200 }}
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border border-zinc-700 flex flex-col items-center justify-center p-8 text-center"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(145deg, #1C1C1F 0%, #141416 100%)",
          }}
        >
          <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-semibold text-indigo-400 mb-4">
            {card.tag}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-6">
            {card.front}
          </h3>
          <p className="text-xs text-zinc-500 flex items-center gap-1.5">
            <RotateCcw className="w-3 h-3" />
            Click to reveal answer
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-indigo-500/40 flex flex-col items-start justify-start p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)",
          }}
        >
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-xs font-semibold text-indigo-400 mb-4">
            Answer
          </span>
          <p className="text-lg font-semibold text-white leading-snug mb-4">{card.back}</p>
          <div className="border-t border-zinc-700/60 pt-4 w-full">
            <p className="text-sm text-zinc-400 leading-relaxed">{card.explanation}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FlashcardsPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [review, setReview] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);

  const card = deck[currentIdx];
  const total = deck.length;

  const goNext = useCallback(() => {
    if (currentIdx + 1 >= total) {
      setFinished(true);
      return;
    }
    setCurrentIdx((i) => i + 1);
    setFlipped(false);
  }, [currentIdx, total]);

  const handleKnow = () => {
    setKnown((prev) => new Set([...prev, card.id]));
    goNext();
  };

  const handleReview = () => {
    setReview((prev) => new Set([...prev, card.id]));
    goNext();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (finished) return;
      if (e.code === "Space") { e.preventDefault(); setFlipped((f) => !f); }
      if (e.code === "ArrowRight" && flipped) handleKnow();
      if (e.code === "ArrowLeft" && flipped) handleReview();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipped, finished, handleKnow]);

  const knownCount = known.size;
  const reviewCount = review.size;
  const progress = ((currentIdx) / total) * 100;

  if (finished) {
    const masteryPct = Math.round((knownCount / total) * 100);
    return (
      <div className="min-h-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full text-center"
        >
          <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Session Complete!</h2>
          <p className="text-zinc-400 text-sm mb-6">You reviewed all {total} cards in this deck</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
              <div className="text-2xl font-bold text-emerald-400">{knownCount}</div>
              <div className="text-xs text-zinc-400 mt-1">Knew it</div>
            </div>
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10">
              <div className="text-2xl font-bold text-rose-400">{reviewCount}</div>
              <div className="text-xs text-zinc-400 mt-1">Need review</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
              <span>Session Mastery</span>
              <span className="text-white font-semibold">{masteryPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: `${masteryPct}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Link href="/learning-center">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
              >
                Back
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCurrentIdx(0); setFlipped(false);
                setKnown(new Set()); setReview(new Set());
                setFinished(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            >
              Study Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col p-4 md:p-6 max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/learning-center" className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Learning Center
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {knownCount} known
            </span>
            <span className="flex items-center gap-1.5 text-rose-400 font-medium">
              <RefreshCcw className="w-3.5 h-3.5" />
              {reviewCount} review
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
          <span className="font-semibold text-white">Card {currentIdx + 1} of {total}</span>
          <span>{Math.round(progress)}% through deck</span>
        </div>
        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        {/* Mini dots */}
        <div className="flex gap-1 mt-2">
          {deck.map((c, idx) => (
            <div
              key={c.id}
              className={`flex-1 h-1 rounded-full transition-colors ${
                known.has(c.id)
                  ? "bg-emerald-500"
                  : review.has(c.id)
                  ? "bg-rose-500"
                  : idx === currentIdx
                  ? "bg-amber-400"
                  : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <FlashCard card={card} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex gap-4 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleReview}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-sm transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Review Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleKnow}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Know it
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zinc-600">
        <Keyboard className="w-3.5 h-3.5" />
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">Space</kbd> flip
          {flipped && (
            <>
              {" "}·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">←</kbd> review
              {" "}·{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">→</kbd> know it
            </>
          )}
        </span>
      </div>
    </div>
  );
}
