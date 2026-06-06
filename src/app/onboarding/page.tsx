"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Check, ArrowRight, ChevronRight, Sparkles, BookOpen } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Interest {
  id: string;
  label: string;
  emoji: string;
}

interface LearningStyle {
  id: string;
  emoji: string;
  title: string;
  description: string;
  recommended?: boolean;
}

interface Space {
  id: string;
  title: string;
  description: string;
  gradient: string;
  emoji: string;
  subscribers: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const interests: Interest[] = [
  { id: "business", label: "Business", emoji: "💼" },
  { id: "psychology", label: "Psychology", emoji: "🧠" },
  { id: "technology", label: "Technology", emoji: "⚡" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "history", label: "History", emoji: "📜" },
  { id: "philosophy", label: "Philosophy", emoji: "🌿" },
  { id: "design", label: "Design", emoji: "🎨" },
  { id: "finance", label: "Finance", emoji: "📈" },
  { id: "health", label: "Health", emoji: "💪" },
  { id: "literature", label: "Literature", emoji: "📚" },
];

const learningStyles: LearningStyle[] = [
  {
    id: "ai",
    emoji: "💬",
    title: "AI Conversations",
    description: "Ask questions, explore ideas through natural dialogue",
    recommended: true,
  },
  {
    id: "visual",
    emoji: "📊",
    title: "Visual Summaries",
    description: "Digests, charts, and key concept maps",
  },
  {
    id: "flashcards",
    emoji: "🃏",
    title: "Flashcards & Quizzes",
    description: "Spaced repetition for lasting retention",
  },
  {
    id: "reading",
    emoji: "📖",
    title: "Structured Reading",
    description: "Curated texts with guided highlights",
  },
];

const sampleSpaces: Space[] = [
  {
    id: "s1",
    title: "Mental Models",
    description: "Master frameworks for better thinking and decision-making",
    gradient: "from-violet-600 to-indigo-600",
    emoji: "🧠",
    subscribers: "12.4k",
  },
  {
    id: "s2",
    title: "Startup Playbook",
    description: "Lessons from the world's most successful founders",
    gradient: "from-emerald-600 to-teal-600",
    emoji: "🚀",
    subscribers: "8.2k",
  },
  {
    id: "s3",
    title: "Future of Tech",
    description: "AI, biotech, and the technologies shaping tomorrow",
    gradient: "from-sky-600 to-blue-600",
    emoji: "⚡",
    subscribers: "15.1k",
  },
  {
    id: "s4",
    title: "Philosophy Now",
    description: "Ancient wisdom applied to modern life challenges",
    gradient: "from-amber-600 to-orange-600",
    emoji: "🌿",
    subscribers: "6.7k",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const pageVariants: Variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25, ease: "easeIn" } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Step Components ──────────────────────────────────────────────────────────

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="welcome"
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-8 max-w-md"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent tracking-tight">
            Let&apos;sRead
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
          <p className="text-2xl font-medium text-white/90 leading-snug">
            Learn anything.<br />Understand everything.
          </p>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300 tracking-wide">Powered by AI</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 w-full">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full max-w-xs flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/30 transition-shadow"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <button className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
            Already have an account?{" "}
            <span className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StepPersonalization({
  onNext,
  selected,
  setSelected,
}: {
  onNext: () => void;
  selected: string[];
  setSelected: (ids: string[]) => void;
}) {
  const toggle = (id: string) => {
    setSelected(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  };

  return (
    <motion.div
      key="personalization"
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col min-h-screen px-6 py-12 max-w-lg mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <p className="text-sm text-zinc-500 font-medium tracking-wider uppercase">Step 2 of 4</p>
          <h2 className="text-3xl font-bold text-white">What do you want to learn?</h2>
          <p className="text-zinc-400">Select all that interest you</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {interests.map((interest) => {
            const isSelected = selected.includes(interest.id);
            return (
              <motion.button
                key={interest.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggle(interest.id)}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-500/15 border-indigo-500/60 text-white shadow-sm shadow-indigo-500/20"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-600"
                }`}
              >
                <span className="text-xl">{interest.emoji}</span>
                <span className="text-sm font-medium">{interest.label}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={selected.length === 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-lg shadow-indigo-500/20"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StepLearningStyle({
  onNext,
  selected,
  setSelected,
}: {
  onNext: () => void;
  selected: string;
  setSelected: (id: string) => void;
}) {
  return (
    <motion.div
      key="learning-style"
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col min-h-screen px-6 py-12 max-w-lg mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <p className="text-sm text-zinc-500 font-medium tracking-wider uppercase">Step 3 of 4</p>
          <h2 className="text-3xl font-bold text-white">How do you learn best?</h2>
          <p className="text-zinc-400">Choose your preferred learning style</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          {learningStyles.map((style) => {
            const isSelected = selected === style.id;
            return (
              <motion.button
                key={style.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(style.id)}
                className={`relative flex items-start gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-500/15 border-indigo-500/60 shadow-md shadow-indigo-500/20"
                    : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {/* Glow ring on selection */}
                {isSelected && (
                  <motion.div
                    layoutId="style-glow"
                    className="absolute inset-0 rounded-2xl ring-1 ring-indigo-500/40 pointer-events-none"
                  />
                )}

                <span className="text-3xl mt-0.5">{style.emoji}</span>
                <div className="flex flex-col gap-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-base ${isSelected ? "text-white" : "text-zinc-200"}`}>
                      {style.title}
                    </span>
                    {style.recommended && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400">{style.description}</p>
                </div>

                <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? "border-indigo-500 bg-indigo-500" : "border-zinc-600"
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!selected}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-lg shadow-indigo-500/20"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StepDiscoverSpaces({ onFinish }: { onFinish: () => void }) {
  const [subscribed, setSubscribed] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSubscribed((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      key="discover"
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="flex flex-col min-h-screen px-6 py-12 max-w-lg mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <p className="text-sm text-zinc-500 font-medium tracking-wider uppercase">Step 4 of 4</p>
          <h2 className="text-3xl font-bold text-white">Spaces recommended for you</h2>
          <p className="text-zinc-400">Subscribe to get curated content in your feed</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          {sampleSpaces.map((space) => {
            const isSub = subscribed.includes(space.id);
            return (
              <motion.div
                key={space.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${space.gradient} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
                  {space.emoji}
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="font-semibold text-white text-sm">{space.title}</span>
                  <span className="text-xs text-zinc-400 truncate">{space.description}</span>
                  <span className="text-xs text-zinc-600">{space.subscribers} subscribers</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggle(space.id)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isSub
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {isSub ? "Subscribed" : "Subscribe"}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.01, boxShadow: "0 0 25px rgba(99,102,241,0.35)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onFinish}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20"
          >
            Start Learning
            <Sparkles className="w-4 h-4" />
          </motion.button>
          <button
            onClick={onFinish}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors text-center"
          >
            Explore more later
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Progress Dots ─────────────────────────────────────────────────────────────

function ProgressDots({ step, total }: { step: number; total: number }) {
  if (step === 0) return null;
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
      {Array.from({ length: total - 1 }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i + 1 === step ? 24 : 8,
            backgroundColor: i + 1 <= step ? "#6366F1" : "#27272A",
          }}
          transition={{ duration: 0.3 }}
          className="h-2 rounded-full"
        />
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const next = () => setStep((s) => s + 1);

  const finish = () => {
    // Navigate to dashboard
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <ProgressDots step={step} total={5} />

      <AnimatePresence mode="wait">
        {step === 0 && <StepWelcome key="step0" onNext={next} />}
        {step === 1 && (
          <StepPersonalization
            key="step1"
            onNext={next}
            selected={selectedInterests}
            setSelected={setSelectedInterests}
          />
        )}
        {step === 2 && (
          <StepLearningStyle
            key="step2"
            onNext={next}
            selected={selectedStyle}
            setSelected={setSelectedStyle}
          />
        )}
        {step === 3 && <StepDiscoverSpaces key="step3" onFinish={finish} />}
      </AnimatePresence>
    </div>
  );
}
