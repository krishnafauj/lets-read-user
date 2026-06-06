"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function StreakBanner() {
  return (
    <motion.section variants={itemVariants}>
      <div
        className="rounded-2xl p-px"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
        }}
      >
        <div
          className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ background: "#18181B" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "rgba(99,102,241,0.15)" }}
            >
              🔥
            </div>
            <div>
              <p className="text-xl font-bold">47 Day Streak!</p>
              <p className="text-sm mt-0.5" style={{ color: "#A1A1AA" }}>
                Keep going! 3 more days to reach your goal
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="flex justify-between text-xs" style={{ color: "#71717A" }}>
              <span>Progress to 50 days</span>
              <span className="font-semibold text-indigo-400">47 / 50</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "#27272A" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                }}
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              />
            </div>
            <p className="text-xs font-medium text-indigo-400 flex items-center gap-1">
              <Flame size={12} /> On fire — you&apos;re in the top 3% this week
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
