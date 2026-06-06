"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  Timer,
  SkipForward,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 1,
    text: "What does Cal Newport define as 'Deep Work'?",
    options: [
      "Working late into the night without breaks",
      "Professional activities in a state of distraction-free concentration",
      "Using multiple productivity apps simultaneously",
      "Delegating shallow tasks to focus on important ones",
    ],
    correctIndex: 1,
    explanation: "Newport defines Deep Work as professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit.",
  },
  {
    id: 2,
    text: "According to Newport, which of the following is a 'shallow work' characteristic?",
    options: [
      "Requires significant cognitive effort",
      "Creates new value that is hard to replicate",
      "Logistical-style tasks performed while distracted",
      "Demands expertise and specialized skills",
    ],
    correctIndex: 2,
    explanation: "Shallow work refers to non-cognitively demanding, logistical-style tasks that can often be performed while distracted and tend not to create much new value.",
  },
  {
    id: 3,
    text: "What is the 'rhythmic philosophy' of deep work scheduling?",
    options: [
      "Working in sync with music to boost focus",
      "Creating a regular habit of deep work at the same time each day",
      "Alternating between deep and shallow work every 30 minutes",
      "Scheduling deep work only on weekends",
    ],
    correctIndex: 1,
    explanation: "The rhythmic philosophy involves creating a regular habit — a consistent daily routine — for deep work, making it automatic through scheduling.",
  },
  {
    id: 4,
    text: "Newport's 'bimodal philosophy' involves:",
    options: [
      "Using two different productivity systems",
      "Working deeply for two hours every morning",
      "Dividing time between deep work periods and open access to distraction",
      "Alternating deep work days with shallow work days",
    ],
    correctIndex: 3,
    explanation: "The bimodal philosophy involves dividing time into clearly delineated stretches of deep work and stretches with no such demands — typically on a daily, weekly, or seasonal scale.",
  },
  {
    id: 5,
    text: "What does Newport recommend as the best way to resist distraction during deep work?",
    options: [
      "Installing website blockers",
      "Working in a separate room with no phone",
      "Scheduling every minute of your workday in advance",
      "Accepting that some distraction is inevitable and pushing through",
    ],
    correctIndex: 2,
    explanation: "Newport advocates for time-block planning — scheduling every minute of your work day — to proactively protect your deep work time and minimize reactive shallow responses.",
  },
];

// ─── Timer Component ──────────────────────────────────────────────────────────

function QuizTimer({ seconds }: { seconds: number }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLow = seconds < 30;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-mono font-semibold transition-colors shadow-sm ${
        isLow
          ? "border-rose-500/50 bg-rose-500/10 text-rose-500"
          : "border-border/40 bg-surface text-text-muted"
      }`}
    >
      <Timer className={`w-4 h-4 ${isLow ? "animate-pulse" : ""}`} />
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 min
  const [finished, setFinished] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setFinished(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  const question = questions[currentQ];
  const totalQ = questions.length;
  const progress = ((currentQ + (confirmed ? 1 : 0)) / totalQ) * 100;

  const handleSelect = useCallback((idx: number) => {
    if (confirmed) return;
    setSelected(idx);
  }, [confirmed]);

  const handleSubmit = () => {
    if (selected === null) return;
    const updated = [...answers];
    updated[currentQ] = selected;
    setAnswers(updated);
    setConfirmed(true);
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQ) {
      setFinished(true);
      return;
    }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setConfirmed(false);
  };

  const handleSkip = () => {
    if (currentQ + 1 >= totalQ) {
      setFinished(true);
      return;
    }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setConfirmed(false);
  };

  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;

  if (finished) {
    const pct = Math.round((score / totalQ) * 100);
    return (
      <div className="min-h-full flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "💪"}</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h2>
          <p className="text-text-muted mb-6 text-sm">You answered {score} out of {totalQ} correctly</p>

          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg width={144} height={144} className="-rotate-90">
              <circle cx={72} cy={72} r={62} fill="none" className="stroke-surface-hover" strokeWidth={10} />
              <motion.circle
                cx={72} cy={72} r={62} fill="none"
                stroke={pct >= 80 ? "#10B981" : pct >= 60 ? "#F59E0B" : "#EF4444"}
                strokeWidth={10} strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 62}
                initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 62 * (1 - pct / 100) }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{pct}%</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Link href="/learning-center">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-[12px] border border-border/40 bg-surface text-foreground text-sm font-medium hover:bg-surface-hover transition-colors shadow-sm"
              >
                Back to Learning Center
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setCurrentQ(0); setSelected(null); setConfirmed(false); setAnswers(Array(questions.length).fill(null)); setTimeLeft(15 * 60); setFinished(false); }}
              className="px-5 py-2.5 rounded-[12px] bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors shadow-sm"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col p-4 md:p-6 max-w-3xl mx-auto bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/learning-center" className="flex items-center gap-1.5 text-text-muted hover:text-foreground text-sm font-medium transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Learning Center
        </Link>
        <QuizTimer seconds={timeLeft} />
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-text-muted mb-2">
          <span className="font-semibold text-foreground">Q{currentQ + 1} of {totalQ}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden border border-border/20">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        {/* Step dots */}
        <div className="flex gap-1.5 mt-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-1 rounded-full transition-colors ${
                idx < currentQ
                  ? answers[idx] === questions[idx].correctIndex ? "bg-emerald-500" : "bg-rose-500"
                  : idx === currentQ
                  ? "bg-primary/70"
                  : "bg-surface-hover"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1"
        >
          <div className="mb-6">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-widest">Deep Work · Question {currentQ + 1}</span>
            <h2 className="text-xl md:text-[22px] font-medium text-foreground mt-2 leading-snug tracking-tight">{question.text}</h2>
          </div>

          {/* Options */}
          <div className="grid gap-3 mb-6">
            {question.options.map((option, idx) => {
              let state: "default" | "selected" | "correct" | "wrong" | "missed" = "default";
              if (confirmed) {
                if (idx === question.correctIndex) state = "correct";
                else if (idx === selected) state = "wrong";
              } else if (idx === selected) {
                state = "selected";
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  whileHover={confirmed ? {} : { scale: 1.01, x: 2 }}
                  whileTap={confirmed ? {} : { scale: 0.99 }}
                  className={`w-full text-left p-4 rounded-[14px] border text-[14px] font-medium transition-all flex items-center gap-4 shadow-sm ${
                    state === "correct"
                      ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-600"
                      : state === "wrong"
                      ? "border-rose-500/70 bg-rose-500/10 text-rose-600"
                      : state === "selected"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border/40 bg-surface text-text-muted hover:border-border hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-[10px] border text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                      state === "correct"
                        ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-600"
                        : state === "wrong"
                        ? "border-rose-500/30 bg-rose-500/20 text-rose-600"
                        : state === "selected"
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border/40 bg-surface-hover text-text-muted"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{option}</span>
                  {state === "correct" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {state === "wrong" && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {confirmed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 overflow-hidden"
              >
                <div className="p-5 rounded-[16px] border border-primary/20 bg-primary/5">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Explanation</div>
                  <p className="text-[14px] text-foreground leading-relaxed font-light">{question.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Bottom actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleSkip}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] border border-border/40 bg-surface text-text-muted hover:text-foreground hover:bg-surface-hover text-sm font-medium transition-colors shadow-sm"
        >
          <SkipForward className="w-4 h-4" />
          Skip
        </motion.button>

        {!confirmed ? (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={selected === null}
            className="flex items-center gap-2 px-6 py-2.5 rounded-[12px] bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors shadow-sm"
          >
            Submit Answer
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-[12px] bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors shadow-sm"
          >
            {currentQ + 1 >= totalQ ? "See Results" : "Next Question"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
