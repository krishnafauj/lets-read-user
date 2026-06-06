"use client";

import { motion } from "framer-motion";

export function MasteryRing({ value }: { value: number }) {
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <svg width={200} height={200} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={100}
          cy={100}
          r={normalizedRadius}
          fill="none"
          className="stroke-surface-hover"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <motion.circle
          cx={100}
          cy={100}
          r={normalizedRadius}
          fill="none"
          stroke="url(#masteryGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="masteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-extrabold text-foreground"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {value}%
        </motion.span>
        <span className="text-xs font-medium text-text-muted mt-1 uppercase tracking-wider">Mastery</span>
      </div>
    </div>
  );
}
