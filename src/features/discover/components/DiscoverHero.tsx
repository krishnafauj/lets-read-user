"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { heroAnimation } from "../utils/animations";

export const DiscoverHero = () => {
  return (
    <motion.section 
      variants={heroAnimation}
      className="relative w-full overflow-hidden rounded-[40px] bg-surface border border-border p-8 md:p-16 mb-12 flex flex-col items-center justify-center text-center shadow-2xl min-h-[400px]"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-primary/10 blur-[120px] rounded-full rotate-12" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[120%] bg-secondary/10 blur-[100px] rounded-full -rotate-12" />
      </div>

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20 shadow-sm">
          <Sparkles size={16} />
          <span>The Universal Library</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
          What world will you <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">explore today?</span>
        </h1>
        
        <p className="text-text-muted text-base md:text-lg mb-10 max-w-lg">
          Dive into millions of books, discover hidden gems, and explore curated collections tailored just for you.
        </p>

        {/* Massive Interactive Search */}
        <div className="relative w-full max-w-xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-warning rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex items-center bg-background/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-xl">
            <Search className="text-text-muted mr-4" size={24} />
            <input 
              type="text" 
              placeholder="Search books, authors, genres, or ISBN..."
              className="w-full bg-transparent text-foreground placeholder:text-text-muted text-lg outline-none border-none p-0 focus:ring-0"
              style={{ outline: "none", boxShadow: "none" }}
            />
            <button className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 ml-2 shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
