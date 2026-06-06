"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, BookOpen, Users, LayoutGrid, Clock, Star, Flame, ChevronDown, X } from "lucide-react";

interface SearchFiltersProps {
  activeTab: "books" | "authors" | "genres";
  setActiveTab: (tab: "books" | "authors" | "genres") => void;
}

export const SearchFilters = ({ activeTab, setActiveTab }: SearchFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => {
      if (value.startsWith("Any") || value === "All Languages") {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  };

  const removeFilter = (key: string) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  const tabs = [
    { id: "books", label: "Books", icon: <BookOpen size={16} /> },
    { id: "authors", label: "Authors", icon: <Users size={16} /> },
    { id: "genres", label: "Collections", icon: <LayoutGrid size={16} /> },
  ] as const;

  return (
    <div className="w-full mb-8">
      {/* Main Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-surface-hover text-text-muted hover:text-foreground border border-border"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
        
        <div className="ml-auto pl-4 border-l border-border flex items-center gap-2">
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              showAdvanced 
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                : "text-text-muted hover:text-foreground bg-surface-hover border border-border"
            }`}
          >
            <SlidersHorizontal size={16} />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Dynamic Sub-Filters based on active tab */}
      <motion.div 
        key={`basic-${activeTab}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-surface-hover/50 border border-border mb-4"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mr-2">Quick Filters:</span>
        
        {/* Render Active Advanced Filters */}
        {Object.entries(activeFilters).map(([key, value]) => (
          <FilterChip 
            key={key} 
            label={`${key}: ${value}`} 
            onRemove={() => removeFilter(key)}
          />
        ))}

        {activeTab === "books" && (
          <>
            <FilterChip label="Audiobooks Only" icon={<Clock size={12} />} />
            <FilterChip label="Top Rated" icon={<Star size={12} />} />
            <FilterChip label="New Releases" icon={<Flame size={12} />} />
          </>
        )}

        {activeTab === "authors" && (
          <>
            <FilterChip label="Verified Only" icon={<CheckBadge />} />
            <FilterChip label="Trending Authors" icon={<Flame size={12} />} />
            <FilterChip label="Award Winners" icon={<Star size={12} />} />
          </>
        )}

        {activeTab === "genres" && (
          <>
            <FilterChip label="Curated by Experts" icon={<Star size={12} />} />
            <FilterChip label="Trending Collections" icon={<Flame size={12} />} />
          </>
        )}
      </motion.div>

      {/* Comprehensive Advanced Filters Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-3xl bg-surface border border-border shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Advanced {activeTab === 'books' ? 'Book' : activeTab === 'authors' ? 'Author' : 'Collection'} Search</h3>
                <button 
                  onClick={() => setShowAdvanced(false)}
                  className="text-xs font-semibold text-text-muted hover:text-foreground underline underline-offset-2"
                >
                  Clear & Close
                </button>
              </div>

              {activeTab === "books" && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <FilterDropdown label="Format" options={["Any Format", "Physical Book", "eBook", "Audiobook", "PDF / Digital"]} value={activeFilters["Format"] || "Any Format"} onChange={(v) => handleFilterChange("Format", v)} />
                  <FilterDropdown label="Publication Year" options={["Any Year", "2020s", "2010s", "2000s", "20th Century", "19th Century", "Older"]} value={activeFilters["Publication Year"] || "Any Year"} onChange={(v) => handleFilterChange("Publication Year", v)} />
                  <FilterDropdown label="Language" options={["Any Language", "English", "Spanish", "French", "German", "Mandarin", "Japanese", "Arabic", "Hindi", "Russian"]} value={activeFilters["Language"] || "Any Language"} onChange={(v) => handleFilterChange("Language", v)} />
                  <FilterDropdown label="Target Audience" options={["All Ages", "Children", "Middle Grade", "Young Adult", "Adult"]} value={activeFilters["Target Audience"] || "All Ages"} onChange={(v) => handleFilterChange("Target Audience", v)} />
                  <FilterDropdown label="Rating" options={["Any Rating", "4.5+ Stars", "4.0+ Stars", "3.0+ Stars"]} value={activeFilters["Rating"] || "Any Rating"} onChange={(v) => handleFilterChange("Rating", v)} />
                  <FilterDropdown label="Length" options={["Any Length", "Under 200 pages", "200-400 pages", "Over 400 pages"]} value={activeFilters["Length"] || "Any Length"} onChange={(v) => handleFilterChange("Length", v)} />
                  <FilterDropdown label="Awards & Accolades" options={["Any", "Award Winners Only", "Pulitzer Prize", "Booker Prize", "Hugo Award", "National Book Award"]} value={activeFilters["Awards & Accolades"] || "Any"} onChange={(v) => handleFilterChange("Awards & Accolades", v)} />
                  <FilterDropdown label="Sort By" options={["Relevance", "Popularity", "Highest Rated", "Newest First", "Oldest First"]} value={activeFilters["Sort By"] || "Relevance"} onChange={(v) => handleFilterChange("Sort By", v)} />
                </div>
              )}

              {activeTab === "authors" && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <FilterDropdown label="Literary Era" options={["Any Era", "Contemporary (1945-Present)", "Modernist (1900-1945)", "Victorian", "Romantic", "Renaissance", "Classical", "Ancient"]} value={activeFilters["Literary Era"] || "Any Era"} onChange={(v) => handleFilterChange("Literary Era", v)} />
                  <FilterDropdown label="Primary Genre" options={["Any Genre", "Literary Fiction", "Fantasy", "Sci-Fi", "Mystery / Thriller", "Romance", "Historical", "Non-Fiction", "Poetry", "Biography"]} value={activeFilters["Primary Genre"] || "Any Genre"} onChange={(v) => handleFilterChange("Primary Genre", v)} />
                  <FilterDropdown label="Region / Nationality" options={["Any Region", "North America", "Latin America", "Europe", "Asia", "Africa", "Oceania"]} value={activeFilters["Region / Nationality"] || "Any Region"} onChange={(v) => handleFilterChange("Region / Nationality", v)} />
                  <FilterDropdown label="Language" options={["Any Language", "English", "Spanish", "French", "German", "Mandarin", "Japanese", "Arabic", "Hindi", "Russian"]} value={activeFilters["Language"] || "Any Language"} onChange={(v) => handleFilterChange("Language", v)} />
                  <FilterDropdown label="Accolades" options={["Any", "Nobel Laureate", "Pulitzer Winner", "NYT Bestseller", "Booker Prize Winner"]} value={activeFilters["Accolades"] || "Any"} onChange={(v) => handleFilterChange("Accolades", v)} />
                  <FilterDropdown label="Sort By" options={["Relevance", "Popularity", "A-Z", "Z-A", "Most Published"]} value={activeFilters["Sort By"] || "Relevance"} onChange={(v) => handleFilterChange("Sort By", v)} />
                </div>
              )}

              {activeTab === "genres" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FilterDropdown label="Collection Type" options={["Any Type", "Editor's Picks", "User Created", "Seasonal", "Award Lists"]} value={activeFilters["Collection Type"] || "Any Type"} onChange={(v) => handleFilterChange("Collection Type", v)} />
                  <FilterDropdown label="Size" options={["Any Size", "Under 10 Books", "10-50 Books", "50+ Books"]} value={activeFilters["Size"] || "Any Size"} onChange={(v) => handleFilterChange("Size", v)} />
                  <FilterDropdown label="Sort By" options={["Relevance", "Most Followed", "Recently Updated", "Highest Rated"]} value={activeFilters["Sort By"] || "Relevance"} onChange={(v) => handleFilterChange("Sort By", v)} />
                </div>
              )}
              
              <div className="mt-8 flex justify-end gap-3">
                <button onClick={clearAllFilters} className="px-6 py-2 rounded-full text-sm font-semibold bg-surface-hover text-foreground border border-border hover:bg-border transition-colors">
                  Reset
                </button>
                <button onClick={() => setShowAdvanced(false)} className="px-6 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors shadow-md shadow-primary/20">
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">{label}</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-background border border-border text-sm text-foreground rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-text-muted">
        <ChevronDown size={14} />
      </div>
    </div>
  </div>
);

const FilterChip = ({ label, icon, onRemove }: { label: string, icon?: React.ReactNode, onRemove?: () => void }) => (
  <button 
    onClick={onRemove}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-primary hover:text-primary transition-colors text-text-muted group"
  >
    {icon}
    {label}
    {onRemove && <X size={12} className="opacity-50 group-hover:opacity-100" />}
  </button>
);

const CheckBadge = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
