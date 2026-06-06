"use client";

import { motion } from "framer-motion";
import { DiscoverHero } from "@/features/discover/components/DiscoverHero";
import { TrendingCarousel } from "@/features/discover/components/TrendingCarousel";
import { GenreGrid } from "@/features/discover/components/GenreGrid";
import { AuthorSpotlight } from "@/features/discover/components/AuthorSpotlight";
import { CuratedRows } from "@/features/discover/components/CuratedRows";
import { containerStagger } from "@/features/discover/utils/animations";

export default function DiscoverPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background pt-6 pb-20 px-4 md:px-8 flex flex-col items-center selection:bg-primary/30">
      <motion.div 
        className="w-full max-w-[1200px]"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        <DiscoverHero />
        <TrendingCarousel />
        <GenreGrid />
        <AuthorSpotlight />
        <CuratedRows />
      </motion.div>
    </div>
  );
}
