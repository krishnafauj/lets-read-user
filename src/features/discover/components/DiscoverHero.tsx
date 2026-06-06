"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, BookOpen, User } from "lucide-react";
import { heroAnimation } from "../utils/animations";

export const DiscoverHero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.section 
      layout
      variants={heroAnimation}
      transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.1 } }}
      className={`relative z-50 w-full rounded-[40px] bg-surface border border-border px-8 md:px-16 mb-12 flex flex-col items-center justify-center text-center shadow-2xl ${query ? 'min-h-[160px] py-10' : 'min-h-[400px] py-16'}`}
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[40px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-primary/10 blur-[120px] rounded-full rotate-12" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[120%] bg-secondary/10 blur-[100px] rounded-full -rotate-12" />
      </div>

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center w-full">
        <AnimatePresence>
          {!query && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center overflow-hidden w-full"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20 shadow-sm">
                <Sparkles size={16} />
                <span>The Universal Library</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                What world will you <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">explore today?</span>
              </h1>
              
              <p className="text-text-muted text-base md:text-lg mb-10 max-w-lg mx-auto">
                Dive into millions of books, discover hidden gems, and explore curated collections tailored just for you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Massive Interactive Search */}
        <motion.div layout className="relative w-full max-w-xl group z-50 text-left">
          <form onSubmit={handleSearch} className="relative w-full">
            <div className={`absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-warning blur opacity-20 transition duration-1000 ${isFocused ? 'opacity-40 rounded-3xl' : 'group-hover:opacity-40 rounded-full'}`} />
            <div className={`relative flex items-center bg-background/90 backdrop-blur-2xl border border-white/10 ${isFocused && query ? 'rounded-t-3xl rounded-b-none border-b-0' : 'rounded-full'} px-6 py-4 shadow-xl transition-all duration-300`}>
              <Search className="text-text-muted mr-4" size={24} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  setIsFocused(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Search books, authors, genres, or ISBN..."
                className="w-full bg-transparent text-foreground placeholder:text-text-muted text-lg outline-none border-none p-0 focus:ring-0"
                style={{ outline: "none", boxShadow: "none" }}
              />
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 ml-2 shrink-0">
                Search
              </button>
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {isFocused && query && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full bg-background/90 backdrop-blur-2xl border border-white/10 border-t-0 rounded-b-3xl shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="p-4 grid grid-cols-2 gap-4">
                  {/* Books Column */}
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2 flex items-center gap-2"><BookOpen size={12}/> Books</h4>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=1984')}>
                        <div className="w-8 h-12 bg-surface rounded shadow-sm border border-border overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="1984" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">1984</p>
                          <p className="text-xs text-text-muted">George Orwell</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=Dune')}>
                        <div className="w-8 h-12 bg-surface rounded shadow-sm border border-border overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="Dune" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">Dune</p>
                          <p className="text-xs text-text-muted">Frank Herbert</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Authors Column */}
                  <div>
                    <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2 flex items-center gap-2"><User size={12}/> Authors</h4>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=George R.R. Martin&tab=authors')}>
                        <div className="w-10 h-10 bg-surface rounded-full shadow-sm border border-border overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&fit=crop" className="w-full h-full object-cover" alt="George R.R. Martin" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">George R.R. Martin</p>
                          <p className="text-xs text-text-muted">Epic Fantasy</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=J.K. Rowling&tab=authors')}>
                        <div className="w-10 h-10 bg-surface rounded-full shadow-sm border border-border overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop" className="w-full h-full object-cover" alt="J.K. Rowling" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">J.K. Rowling</p>
                          <p className="text-xs text-text-muted">Fantasy Master</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-surface border-t border-white/10 text-center">
                  <button onClick={handleSearch} className="text-sm font-semibold text-primary hover:text-primary-light transition-colors">
                    See all results for "{query}" &rarr;
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};
