"use client";

import { motion } from "framer-motion";
import { FilterDropdown } from "./SearchFilters";
import { FilterPills, FilterStars, SearchableTags } from "./FilterControls";
import { X } from "lucide-react";

interface AdvancedFiltersSidebarProps {
  activeTab: "books" | "authors" | "genres";
  activeFilters: Record<string, string[]>;
  onFilterChange: (key: string, value: string[]) => void;
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
        className="fixed inset-y-0 right-0 w-[380px] max-w-full bg-background/90 backdrop-blur-3xl border-l border-white/5 shadow-[auto_-20px_50px_rgba(0,0,0,0.3)] z-50 flex flex-col"
      >
        <div className="p-6 flex items-center justify-between border-b border-border bg-transparent">
          <h3 className="text-xl font-medium tracking-tight text-foreground">
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
            <div className="flex flex-col gap-5">
              <FilterPills label="Format" options={["Physical Book", "eBook", "Audiobook", "PDF / Digital"]} selected={activeFilters["Format"] || []} onChange={(v) => onFilterChange("Format", v)} />
              <SearchableTags label="Primary Genre" options={[
                "Art & Photography", "Biography", "Business", "Children's", "Cookbooks", 
                "Comics & Graphic Novels", "Crafts & Hobbies", "Fantasy", "Health & Wellness", 
                "Historical Fiction", "History", "Horror", "Humor", "Literary Fiction", 
                "Memoir", "Mystery / Thriller", "Non-Fiction", "Philosophy", "Poetry", 
                "Politics", "Religion & Spirituality", "Romance", "Sci-Fi", "Science & Nature", 
                "Self-Help", "Sports", "Travel", "True Crime", "Young Adult"
              ]} selected={activeFilters["Primary Genre"] || []} onChange={(v) => onFilterChange("Primary Genre", v)} />
              <FilterPills label="Publication Year" options={["2020s", "2010s", "2000s", "20th Century", "Older"]} selected={activeFilters["Publication Year"] || []} onChange={(v) => onFilterChange("Publication Year", v)} />
              <SearchableTags label="Language" options={["English", "Spanish", "French", "German", "Mandarin", "Japanese", "Arabic", "Hindi", "Russian", "Italian", "Portuguese"]} selected={activeFilters["Language"] || []} onChange={(v) => onFilterChange("Language", v)} />
              <FilterPills label="Target Audience" options={["Children", "Middle Grade", "Young Adult", "Adult"]} selected={activeFilters["Target Audience"] || []} onChange={(v) => onFilterChange("Target Audience", v)} />
              <FilterStars label="Rating" selected={activeFilters["Rating"] || []} onChange={(v) => onFilterChange("Rating", v)} />
              <FilterPills label="Length" options={["Under 200 pages", "200-400 pages", "Over 400 pages"]} selected={activeFilters["Length"] || []} onChange={(v) => onFilterChange("Length", v)} />
              <FilterPills label="Awards & Accolades" options={["Award Winners Only", "Pulitzer Prize", "Booker Prize", "Hugo Award", "National Book Award"]} selected={activeFilters["Awards & Accolades"] || []} onChange={(v) => onFilterChange("Awards & Accolades", v)} />
              <FilterDropdown label="Sort By" options={["Relevance", "Popularity", "Highest Rated", "Newest First", "Oldest First"]} value={activeFilters["Sort By"]?.[0] || "Relevance"} onChange={(v) => onFilterChange("Sort By", v === "Relevance" ? [] : [v])} />
            </div>
          )}

          {activeTab === "authors" && (
            <div className="flex flex-col gap-5">
              <FilterPills label="Literary Era" options={["Contemporary", "Modernist", "Victorian", "Romantic", "Renaissance", "Classical", "Ancient"]} selected={activeFilters["Literary Era"] || []} onChange={(v) => onFilterChange("Literary Era", v)} />
              <SearchableTags label="Primary Genre" options={[
                "Art & Photography", "Biography", "Business", "Children's", "Cookbooks", 
                "Comics & Graphic Novels", "Crafts & Hobbies", "Fantasy", "Health & Wellness", 
                "Historical Fiction", "History", "Horror", "Humor", "Literary Fiction", 
                "Memoir", "Mystery / Thriller", "Non-Fiction", "Philosophy", "Poetry", 
                "Politics", "Religion & Spirituality", "Romance", "Sci-Fi", "Science & Nature", 
                "Self-Help", "Sports", "Travel", "True Crime", "Young Adult"
              ]} selected={activeFilters["Primary Genre"] || []} onChange={(v) => onFilterChange("Primary Genre", v)} />
              <FilterPills label="Region / Nationality" options={["North America", "Latin America", "Europe", "Asia", "Africa", "Oceania"]} selected={activeFilters["Region / Nationality"] || []} onChange={(v) => onFilterChange("Region / Nationality", v)} />
              <SearchableTags label="Language" options={["English", "Spanish", "French", "German", "Mandarin", "Japanese", "Arabic", "Hindi", "Russian"]} selected={activeFilters["Language"] || []} onChange={(v) => onFilterChange("Language", v)} />
              <FilterPills label="Accolades" options={["Nobel Laureate", "Pulitzer Winner", "NYT Bestseller", "Booker Prize Winner"]} selected={activeFilters["Accolades"] || []} onChange={(v) => onFilterChange("Accolades", v)} />
              <FilterDropdown label="Sort By" options={["Relevance", "Popularity", "A-Z", "Z-A", "Most Published"]} value={activeFilters["Sort By"]?.[0] || "Relevance"} onChange={(v) => onFilterChange("Sort By", v === "Relevance" ? [] : [v])} />
            </div>
          )}

          {activeTab === "genres" && (
            <div className="flex flex-col gap-5">
              <FilterPills label="Collection Type" options={["Editor's Picks", "User Created", "Seasonal", "Award Lists"]} selected={activeFilters["Collection Type"] || []} onChange={(v) => onFilterChange("Collection Type", v)} />
              <FilterPills label="Size" options={["Under 10 Books", "10-50 Books", "50+ Books"]} selected={activeFilters["Size"] || []} onChange={(v) => onFilterChange("Size", v)} />
              <FilterDropdown label="Sort By" options={["Relevance", "Most Followed", "Recently Updated", "Highest Rated"]} value={activeFilters["Sort By"]?.[0] || "Relevance"} onChange={(v) => onFilterChange("Sort By", v === "Relevance" ? [] : [v])} />
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-border bg-transparent flex flex-col gap-3 shrink-0">
          <button onClick={onClearFilters} className="w-full py-2.5 rounded-xl text-sm font-medium bg-transparent text-text-muted border border-transparent hover:bg-surface-hover hover:text-foreground transition-all">
            Reset Filters
          </button>
          <button onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all shadow-sm">
            Show Results
          </button>
        </div>
      </motion.div>
    </>
  );
};
