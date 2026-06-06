"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";

export const FilterPills = ({ label, options, selected, onChange }: { label: string, options: string[], selected: string[], onChange: (v: string[]) => void }) => {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider pl-1">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-3.5 py-1.5 rounded-[10px] text-xs font-medium transition-all border ${
                isSelected 
                  ? "bg-foreground text-background border-foreground shadow-sm" 
                  : "bg-surface-hover/30 text-foreground border-border/50 hover:border-foreground/30 hover:bg-surface-hover"
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export const FilterStars = ({ label, selected, onChange }: { label: string, selected: string[], onChange: (v: string[]) => void }) => {
  const currentRating = selected[0] || "";
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider pl-1">{label}</label>
      <div className="flex items-center gap-1.5">
        {[5, 4, 3, 2, 1].map(stars => {
          const val = `${stars}.0+ Stars`;
          const isSelected = currentRating === val;
          return (
            <button
              key={stars}
              onClick={() => onChange(isSelected ? [] : [val])}
              className={`p-2 rounded-[10px] transition-all border ${
                isSelected ? "bg-amber-500/15 border-amber-500 text-amber-500 shadow-sm shadow-amber-500/20" : "bg-surface-hover/30 border-border/50 text-text-muted hover:text-amber-500 hover:border-amber-500/50 hover:bg-surface-hover"
              }`}
              title={val}
            >
              <Star size={16} className={isSelected ? "fill-amber-500" : ""} />
            </button>
          )
        })}
      </div>
    </div>
  );
};

export const SearchableTags = ({ label, options, selected, onChange }: { label: string, options: string[], selected: string[], onChange: (v: string[]) => void }) => {
  const [query, setQuery] = useState("");
  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider pl-1 flex justify-between items-center">
        {label}
        {selected.length > 0 && <span className="text-foreground normal-case font-medium text-[10px] bg-foreground/5 px-1.5 rounded border border-border/50">{selected.length} selected</span>}
      </label>
      <div className="relative mb-1">
        <input 
          type="text" 
          placeholder={`Search ${options.length} options...`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-surface/40 backdrop-blur-md border border-border/60 text-xs text-foreground rounded-xl pl-8 pr-3 py-2 outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/5 transition-all shadow-sm placeholder:text-text-muted/50"
        />
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60" />
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1 content-start">
        {filtered.length === 0 ? (
          <div className="text-xs text-text-muted/50 py-2 w-full text-center italic">No matches found</div>
        ) : (
          filtered.map(opt => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`px-3 py-1 rounded-[8px] text-[11px] font-medium transition-all border ${
                  isSelected 
                    ? "bg-foreground text-background border-foreground shadow-sm" 
                    : "bg-surface-hover/30 text-text-muted border-transparent hover:text-foreground hover:border-border/60 hover:bg-surface-hover"
                }`}
              >
                {opt}
              </button>
            )
          })
        )}
      </div>
    </div>
  );
};
