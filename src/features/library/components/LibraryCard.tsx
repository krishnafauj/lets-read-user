"use client";

import { motion, Variants } from "framer-motion";
import { Clock, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import { LibraryItem, ViewMode } from "../types";
import { ProgressBar } from "./ProgressBar";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -2, transition: { duration: 0.2, ease: "easeOut" } },
};

export function LibraryCard({ item, view }: { item: LibraryItem; view: ViewMode }) {
  const [starred, setStarred] = useState(item.starred);

  if (view === "list") {
    return (
      <motion.div
        variants={itemVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="group flex items-center gap-4 p-4 rounded-2xl bg-surface-hover/30 border border-border/40 hover:bg-surface hover:shadow-md transition-all cursor-pointer"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
          style={{ background: item.spaceColor + "15" }}
        >
          {item.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
          {item.author && (
            <p className="text-xs text-text-muted mt-0.5 font-medium">{item.author}</p>
          )}
          {item.excerpt && (
            <p className="text-xs text-text-muted mt-1 truncate italic">"{item.excerpt}"</p>
          )}
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0">
          <span
            className="px-2.5 py-0.5 rounded-[8px] text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: item.spaceColor + "15", color: item.spaceColor }}
          >
            {item.space}
          </span>
          <span className="text-xs text-text-muted flex items-center gap-1 font-medium">
            <Clock size={12} className="text-text-muted/60" /> {item.date}
          </span>
        </div>
        {item.progress !== undefined && (
          <div className="hidden md:block w-28 shrink-0">
            <ProgressBar value={item.progress} />
            <p className="text-[10px] text-text-muted mt-1.5 text-right font-medium uppercase tracking-wider">{item.progress}%</p>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setStarred(!starred); }}
          className="shrink-0 p-2 rounded-full hover:bg-surface-hover/50 transition-colors ml-2"
        >
          <Star
            size={18}
            className={starred ? "text-amber-400 fill-amber-400" : "text-text-muted/40 group-hover:text-text-muted/80 transition-colors"}
          />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative flex flex-col h-[280px] rounded-[24px] overflow-hidden bg-surface border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Top Light Colored Block */}
      <div 
        className="flex-1 p-6 flex flex-col relative overflow-hidden"
        style={{ backgroundColor: item.spaceColor + "20" }}
      >
        {item.coverImage && (
          <>
            <img 
              src={item.coverImage} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-multiply group-hover:opacity-70 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500 z-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-0" />
          </>
        )}

        <button 
          onClick={(e) => { e.stopPropagation(); setStarred(!starred); }} 
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-black/5 transition-colors z-10"
        >
          <Star
            size={18}
            className={starred ? "text-amber-500 fill-amber-500" : "text-foreground/30 group-hover:text-foreground/60 transition-all"}
          />
        </button>

        <div className="pr-8 relative z-10">
          <h3 className="text-xl font-medium text-foreground leading-tight mb-2 line-clamp-2 drop-shadow-sm">
            {item.title}
          </h3>
          <p className="text-[13px] text-foreground/90 font-normal leading-relaxed line-clamp-2 drop-shadow-sm">
            {item.excerpt ? `"${item.excerpt}"` : item.author}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 relative z-10">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
            style={{ backgroundColor: item.spaceColor + "40", color: "var(--color-foreground)" }}
          >
            {item.space}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
            style={{ backgroundColor: "rgba(255,255,255,0.6)", color: "var(--color-foreground)" }}
          >
            {item.type}
          </span>
          {item.progress !== undefined && (
            <span
              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", color: "var(--color-foreground)" }}
            >
              {item.progress}%
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 px-5 bg-surface flex items-center justify-between border-t border-border/50 shrink-0">
        <span className="text-[15px] font-medium text-foreground">Explore</span>
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-hover text-text-muted group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}
