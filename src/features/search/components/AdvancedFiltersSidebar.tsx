"use client";

import { motion } from "framer-motion";
import { FilterDropdown } from "./SearchFilters";
import { X } from "lucide-react";

interface AdvancedFiltersSidebarProps {
  activeTab: "books" | "authors" | "genres";
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export const AdvancedFiltersSidebar = ({
  activeTab,
  activeFilters,
  onFilterChange,
  onClearFilters,
  onClose
}: AdvancedFiltersSidebarProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 w-[340px] max-w-full bg-background/80 backdrop-blur-3xl border-l border-white/5 shadow-[auto_-20px_50px_rgba(0,0,0,0.3)] z-50 flex flex-col"
      >
        <div className="p-6 flex items-center justify-between border-b border-border/40 bg-transparent">
          <h3 className="text-xl font-black tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Advanced {activeTab === 'books' ? 'Book' : activeTab === 'authors' ? 'Author' : 'Collection'} Search
          </h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-hover/50 text-text-muted hover:text-foreground hover:bg-surface transition-all hover:scale-105 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === "books" && (
            <div className="flex flex-col gap-4">
              <FilterDropdown label="Format" options={["Any Format", "Physical Book", "eBook", "Audiobook", "PDF / Digital"]} value={activeFilters["Format"] || "Any Format"} onChange={(v) => onFilterChange("Format", v)} />
              <FilterDropdown label="Publication Year" options={["Any Year", "2020s", "2010s", "2000s", "20th Century", "19th Century", "Older"]} value={activeFilters["Publication Year"] || "Any Year"} onChange={(v) => onFilterChange("Publication Year", v)} />
              <FilterDropdown label="Language" options={["Any Language", "English", "Spanish", "French", "German", "Mandarin", "Japanese", "Arabic", "Hindi", "Russian"]} value={activeFilters["Language"] || "Any Language"} onChange={(v) => onFilterChange("Language", v)} />
              <FilterDropdown label="Target Audience" options={["All Ages", "Children", "Middle Grade", "Young Adult", "Adult"]} value={activeFilters["Target Audience"] || "All Ages"} onChange={(v) => onFilterChange("Target Audience", v)} />
              <FilterDropdown label="Rating" options={["Any Rating", "4.5+ Stars", "4.0+ Stars", "3.0+ Stars"]} value={activeFilters["Rating"] || "Any Rating"} onChange={(v) => onFilterChange("Rating", v)} />
              <FilterDropdown label="Length" options={["Any Length", "Under 200 pages", "200-400 pages", "Over 400 pages"]} value={activeFilters["Length"] || "Any Length"} onChange={(v) => onFilterChange("Length", v)} />
              <FilterDropdown label="Awards & Accolades" options={["Any", "Award Winners Only", "Pulitzer Prize", "Booker Prize", "Hugo Award", "National Book Award"]} value={activeFilters["Awards & Accolades"] || "Any"} onChange={(v) => onFilterChange("Awards & Accolades", v)} />
              <FilterDropdown label="Sort By" options={["Relevance", "Popularity", "Highest Rated", "Newest First", "Oldest First"]} value={activeFilters["Sort By"] || "Relevance"} onChange={(v) => onFilterChange("Sort By", v)} />
            </div>
          )}

          {activeTab === "authors" && (
            <div className="flex flex-col gap-4">
              <FilterDropdown label="Literary Era" options={["Any Era", "Contemporary (1945-Present)", "Modernist (1900-1945)", "Victorian", "Romantic", "Renaissance", "Classical", "Ancient"]} value={activeFilters["Literary Era"] || "Any Era"} onChange={(v) => onFilterChange("Literary Era", v)} />
              <FilterDropdown label="Primary Genre" options={["Any Genre", "Literary Fiction", "Fantasy", "Sci-Fi", "Mystery / Thriller", "Romance", "Historical", "Non-Fiction", "Poetry", "Biography"]} value={activeFilters["Primary Genre"] || "Any Genre"} onChange={(v) => onFilterChange("Primary Genre", v)} />
              <FilterDropdown label="Region / Nationality" options={["Any Region", "North America", "Latin America", "Europe", "Asia", "Africa", "Oceania"]} value={activeFilters["Region / Nationality"] || "Any Region"} onChange={(v) => onFilterChange("Region / Nationality", v)} />
              <FilterDropdown label="Language" options={["Any Language", "English", "Spanish", "French", "German", "Mandarin", "Japanese", "Arabic", "Hindi", "Russian"]} value={activeFilters["Language"] || "Any Language"} onChange={(v) => onFilterChange("Language", v)} />
              <FilterDropdown label="Accolades" options={["Any", "Nobel Laureate", "Pulitzer Winner", "NYT Bestseller", "Booker Prize Winner"]} value={activeFilters["Accolades"] || "Any"} onChange={(v) => onFilterChange("Accolades", v)} />
              <FilterDropdown label="Sort By" options={["Relevance", "Popularity", "A-Z", "Z-A", "Most Published"]} value={activeFilters["Sort By"] || "Relevance"} onChange={(v) => onFilterChange("Sort By", v)} />
            </div>
          )}

          {activeTab === "genres" && (
            <div className="flex flex-col gap-4">
              <FilterDropdown label="Collection Type" options={["Any Type", "Editor's Picks", "User Created", "Seasonal", "Award Lists"]} value={activeFilters["Collection Type"] || "Any Type"} onChange={(v) => onFilterChange("Collection Type", v)} />
              <FilterDropdown label="Size" options={["Any Size", "Under 10 Books", "10-50 Books", "50+ Books"]} value={activeFilters["Size"] || "Any Size"} onChange={(v) => onFilterChange("Size", v)} />
              <FilterDropdown label="Sort By" options={["Relevance", "Most Followed", "Recently Updated", "Highest Rated"]} value={activeFilters["Sort By"] || "Relevance"} onChange={(v) => onFilterChange("Sort By", v)} />
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-border/40 bg-background/40 flex flex-col gap-3 shrink-0">
          <button onClick={onClearFilters} className="w-full py-2.5 rounded-xl text-sm font-bold bg-surface-hover/50 text-foreground border border-border/50 hover:bg-surface hover:border-primary/30 transition-all hover:shadow-md active:scale-[0.98]">
            Reset Filters
          </button>
          <button onClick={onClose} className="relative w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] active:scale-[0.98] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark transition-transform group-hover:scale-105" />
            <span className="relative z-10">Show Results</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};
