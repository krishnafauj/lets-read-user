"use client";

import { motion, Variants } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import { statCards } from "../apis/mockData";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function QuickStats() {
  return (
    <motion.section variants={itemVariants} className="space-y-5">
      <h2 className="text-xl font-normal flex items-center gap-2">
        <BarChart3 size={20} className="text-primary" />
        Your progress
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {statCards.map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-surface border border-border p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:border-primary/20 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} bg-background border border-border shadow-inner group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-normal flex items-center gap-1 px-2 py-1 rounded-md ${
                  stat.trendUp 
                    ? "text-success bg-success/10" 
                    : "text-destructive bg-destructive/10"
                }`}
              >
                <TrendingUp size={12} />
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-3xl font-normal tracking-tight text-foreground">{stat.value}</p>
              <p className="text-sm mt-1 text-text-muted font-medium">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
