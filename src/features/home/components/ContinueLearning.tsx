"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight, BookOpen } from "lucide-react";
import { learningCards } from "../apis/mockData";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContinueLearning() {
  return (
    <motion.section variants={itemVariants} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen size={20} className="text-primary" />
          Continue learning
        </h2>
        <button className="text-sm flex items-center gap-1 font-medium text-text-muted hover:text-foreground transition-colors">
          See all <ChevronRight size={14} />
        </button>
      </div>

      <div className="relative group/section">
        <div 
          className="flex gap-5 overflow-x-auto py-6 px-8 -mx-8 scroll-smooth" 
          style={{ scrollbarWidth: "none" }}
        >
          {learningCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-[340px] h-32 bg-surface border border-border cursor-pointer transition-all duration-300 hover:border-primary/50 flex group overflow-hidden relative"
            >
              {/* Dropping side line */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300 z-20"></div>

              {/* Left Text Part */}
              <div className="flex-1 p-5 flex flex-col justify-center relative bg-background pl-6">
                <h3 className="font-bold text-base leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-sm text-text-muted mt-1.5 line-clamp-1">
                  By {card.author}
                </p>
                
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                  Resume <ArrowRight size={12} />
                </div>
              </div>

              {/* Right Image Part */}
              <div className={`w-32 h-full bg-gradient-to-br ${card.gradient} flex flex-shrink-0 items-center justify-center relative border-l border-border`}>
                <span className="text-4xl drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500 z-10">
                  {card.emoji}
                </span>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
