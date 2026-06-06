"use client";

import { motion } from "framer-motion";
import { ChevronRight, LayoutGrid, MessageSquare, Target } from "lucide-react";
import { spaceCards } from "../apis/mockData";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function AiSpacesGrid() {
  return (
    <motion.section variants={itemVariants} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <LayoutGrid size={20} className="text-primary" />
          Your AI Spaces
        </h2>
        <button className="text-sm flex items-center gap-1 font-medium text-text-muted hover:text-foreground transition-colors">
          Manage spaces <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {spaceCards.map((space) => (
          <motion.div
            key={space.id}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-surface border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/40 group relative overflow-hidden flex flex-col"
          >
            {/* Ambient Background Glow */}
            <div className={`absolute -inset-20 bg-gradient-to-br ${space.borderGradient} opacity-0 group-hover:opacity-[0.03] blur-3xl transition-opacity duration-700 pointer-events-none`}></div>
            
            {/* Dropping Side Line (matches Continue Learning) */}
            <div className={`absolute top-0 left-0 w-1 h-0 bg-gradient-to-b ${space.borderGradient} group-hover:h-full transition-all duration-500 z-20`}></div>

            <div className="p-5 flex flex-col flex-1 relative z-10">
              {/* Header: Icon + Title + Badge */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${space.borderGradient} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative`}
                  >
                    <span className="drop-shadow-md z-10">{space.emoji}</span>
                    <div className="absolute inset-0 rounded-2xl bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {space.title}
                    </h3>
                    <p className="text-[13px] text-text-muted mt-1 line-clamp-1">
                      By <span className="text-foreground/80">{space.creator}</span>
                    </p>
                  </div>
                </div>

              </div>

              <div className="flex-1"></div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-border my-4 group-hover:bg-border/60 transition-colors"></div>

              {/* Footer: Stats & Tags */}
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-2.5">
                  {/* Subtle Tags */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {space.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase tracking-widest font-bold text-text-muted group-hover:text-foreground/70 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Clean Icon Stats */}
                  <div className="flex items-center gap-4 text-[13px] font-medium text-text-muted/90">
                    <div className="flex items-center gap-1.5 group-hover:text-primary/90 transition-colors">
                      <MessageSquare size={14} className="opacity-70" />
                      <span>{space.conversations} <span className="opacity-70 font-normal">chats</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 group-hover:text-warning transition-colors">
                      <Target size={14} className="opacity-70" />
                      <span>{space.mastery}% <span className="opacity-70 font-normal">mastery</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
