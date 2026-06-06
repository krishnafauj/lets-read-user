"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Star, ArrowUpRight, ChevronLeft, ChevronRight, Hash, ArrowRight } from "lucide-react";
import { recommendations } from "../apis/mockData";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Recommendations() {
  return (
    <motion.section variants={itemVariants} className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-warning" />
          <h2 className="text-xl font-semibold">Recommended for you</h2>
        </div>
        <Link href="/recommendations" className="text-sm flex items-center gap-1 font-medium text-text-muted hover:text-foreground transition-colors">
          See all <ChevronRight size={14} />
        </Link>
      </div>

        <div 
          className="flex gap-5 overflow-x-auto py-6 px-8 -mx-8 scroll-smooth" 
          style={{ scrollbarWidth: "none" }}
        >
          {recommendations.map((rec) => (
            <motion.div
              key={rec.id}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-[280px] rounded-sm bg-surface border border-border p-4 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/50 group"
            >
              {/* Top Image Block */}
              <div
                className={`h-32 w-full rounded-sm bg-gradient-to-br ${rec.gradient} flex items-center justify-center text-5xl relative overflow-hidden shadow-inner mb-4`}
              >
                <span className="drop-shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10">{rec.emoji}</span>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                
                {/* Rating neatly tucked inside image */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[11px] font-semibold text-white bg-black/30 px-2 py-1 rounded-md backdrop-blur-md border border-white/10 group-hover:border-white/30 transition-colors">
                  <Star size={12} className="text-warning fill-warning" /> {rec.rating}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {rec.title}
                </h3>
                <p className="text-sm text-text-muted mt-0.5 line-clamp-1">
                  By {rec.author}
                </p>

                {/* Minimalist Reason */}
                <p className="text-[13px] text-text-muted/80 mt-2 line-clamp-2">
                  {rec.reason}
                </p>

                {/* Divider */}
                <div className="w-full h-[1px] bg-border my-4 group-hover:bg-border/50 transition-colors"></div>

                {/* Minimalist Tags that elegantly wrap */}
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-auto">
                  {rec.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold text-text-muted opacity-80 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* See All Card at the end of the scroll list */}
          <Link
            href="/recommendations"
            className="flex-shrink-0 w-[140px] rounded-sm border-2 border-dashed border-border p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-surface/50 group"
          >
            <div className="w-12 h-12 rounded-sm bg-surface border border-border flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/50 transition-colors mb-3 shadow-sm">
              <ArrowRight size={20} />
            </div>
            <span className="text-sm font-semibold text-text-muted group-hover:text-primary transition-colors text-center">
              See all
            </span>
          </Link>
        </div>
    </motion.section>
  );
}
