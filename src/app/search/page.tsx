"use client";

import { useState } from "react";
import { SearchHeader } from "@/features/search/components/SearchHeader";
import { SearchFilters } from "@/features/search/components/SearchFilters";
import { SearchResults } from "@/features/search/components/SearchResults";
import { motion } from "framer-motion";
import { containerStagger } from "@/features/discover/utils/animations";

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<"books" | "authors" | "genres">("books");

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background pt-6 pb-20 px-4 md:px-8 flex flex-col items-center selection:bg-primary/30">
      <motion.div 
        className="w-full max-w-[1200px]"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        <SearchHeader />
        <SearchFilters activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchResults activeTab={activeTab} />
      </motion.div>
    </div>
  );
}
