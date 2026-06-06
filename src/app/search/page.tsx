"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchHeader } from "@/features/search/components/SearchHeader";
import { SearchFilters } from "@/features/search/components/SearchFilters";
import { SearchResults } from "@/features/search/components/SearchResults";
import { AdvancedFiltersSidebar } from "@/features/search/components/AdvancedFiltersSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger } from "@/features/discover/utils/animations";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as "books" | "authors" | "genres" | null;
  const [activeTab, setActiveTab] = useState<"books" | "authors" | "genres">(tabParam || "books");
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(() => {
    const initialGenre = searchParams.get('genre');
    if (initialGenre) {
      return { "Primary Genre": [initialGenre] };
    }
    return {};
  });

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    const genre = searchParams.get('genre');
    if (genre && (!activeFilters["Primary Genre"] || !activeFilters["Primary Genre"].includes(genre))) {
      setActiveFilters(prev => ({ 
        ...prev, 
        "Primary Genre": prev["Primary Genre"] ? [...new Set([...prev["Primary Genre"], genre])] : [genre] 
      }));
      setShowAdvanced(true);
    }
  }, [searchParams]);

  const handleFilterChange = (key: string, values: string[]) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      if (values.length === 0) {
        delete next[key];
      } else {
        next[key] = values;
      }
      return next;
    });
  };

  const removeFilter = (key: string, valueToRemove?: string) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      if (valueToRemove && next[key]) {
        next[key] = next[key].filter(v => v !== valueToRemove);
        if (next[key].length === 0) {
          delete next[key];
        }
      } else {
        delete next[key];
      }
      return next;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background pt-2 pb-20 px-4 md:px-8 flex flex-col items-center selection:bg-primary/30">
      <motion.div 
        className="w-full max-w-[1200px]"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        <SearchHeader />
        <SearchFilters 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          activeFilters={activeFilters}
          onRemoveFilter={removeFilter}
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
        />
        
        <div className="mt-4 w-full">
          <SearchResults activeTab={activeTab} />
        </div>
        
        <AnimatePresence>
          {showAdvanced && (
            <AdvancedFiltersSidebar
              activeTab={activeTab}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearAllFilters}
              onClose={() => setShowAdvanced(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
