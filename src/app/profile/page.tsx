"use client";

import { motion } from "framer-motion";
import { GreetingHeader } from "@/features/home/components/GreetingHeader";
import { QuickStats } from "@/features/home/components/QuickStats";
import { StreakBanner } from "@/features/home/components/StreakBanner";
import { ContinueLearning } from "@/features/home/components/ContinueLearning";
import { Recommendations } from "@/features/home/components/Recommendations";
import { AiSpacesGrid } from "@/features/home/components/AiSpacesGrid";
import { RecentConversations } from "@/features/home/components/RecentConversations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full space-y-10 pb-20"
      >
        <GreetingHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <QuickStats />
          </div>
          <div>
            <StreakBanner />
          </div>
        </div>

        <ContinueLearning />
        <Recommendations />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AiSpacesGrid />
          <RecentConversations />
        </div>
      </motion.div>
    </div>
  );
}
