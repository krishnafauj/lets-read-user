"use client";

import { motion } from "framer-motion";
import { GreetingHeader } from "@/features/home/components/GreetingHeader";
import { ContinueLearning } from "@/features/home/components/ContinueLearning";
import { AiSpacesGrid } from "@/features/home/components/AiSpacesGrid";
import { Recommendations } from "@/features/home/components/Recommendations";
import { QuickStats } from "@/features/home/components/QuickStats";
import { RecentConversations } from "@/features/home/components/RecentConversations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-10 space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <GreetingHeader />
        <ContinueLearning />
        <Recommendations />
        <AiSpacesGrid />
        <QuickStats />
        <RecentConversations />
        
        {/* ── BOTTOM SPACER ───────────────────────────────────────────────── */}
        <div className="h-8" />
      </motion.div>
    </div>
  );
}
