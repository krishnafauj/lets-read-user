"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, BookOpen, Users, LayoutGrid, Clock, Star, Flame, ChevronDown, X } from "lucide-react";

interface SearchFiltersProps {
  activeTab: "books" | "authors" | "genres";
  setActiveTab: (tab: "books" | "authors" | "genres") => void;
  activeFilters: Record<string, string>;
  onRemoveFilter: (key: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
}

export const SearchFilters = ({ 
  activeTab, 
  setActiveTab, 
  activeFilters, 
  onRemoveFilter, 
  showAdvanced, 
  setShowAdvanced 
}: SearchFiltersProps) => {

  const tabs = [
    { id: "books", label: "Books", icon: <BookOpen size={16} /> },
    { id: "authors", label: "Authors", icon: <Users size={16} /> },
    { id: "genres", label: "Collections", icon: <LayoutGrid size={16} /> },
  ] as const;

  return (
    <div className="w-full mb-4">
      {/* Main Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
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
            onRemove={() => onRemoveFilter(key)}
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

        <div className="ml-auto">
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              showAdvanced 
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20" 
                : "text-text-muted hover:text-foreground bg-background border border-border hover:border-primary hover:text-primary"
            }`}
          >
            <SlidersHorizontal size={16} />
            Advanced Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const FilterDropdown = ({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider pl-1">{label}</label>
    <div className="relative group">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-surface/40 backdrop-blur-md border border-border/60 text-[13px] font-medium text-foreground rounded-xl px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm hover:border-primary/40 hover:bg-surface-hover/60 cursor-pointer"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt} className="bg-surface text-foreground font-medium py-1">{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
        <ChevronDown size={14} strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

export const FilterChip = ({ label, icon, onRemove }: { label: string, icon?: React.ReactNode, onRemove?: () => void }) => (
  <button 
    onClick={onRemove}
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border hover:border-primary hover:text-primary transition-colors text-text-muted group"
  >
    {icon}
    {label}
    {onRemove && <X size={12} className="opacity-50 group-hover:opacity-100" />}
  </button>
);

export const CheckBadge = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
