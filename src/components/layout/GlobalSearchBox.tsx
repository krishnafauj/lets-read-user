"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, BookOpen, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const GlobalSearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Sync state with URL if it changes externally
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      // Blur the input to hide dropdown
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  return (
    <div className="relative w-full z-50">
      <form onSubmit={handleSearch} className={`relative flex items-center bg-surface-hover overflow-hidden transition-all duration-300 border ${isFocused && query ? 'border-primary/30 rounded-t-xl rounded-b-none border-b-0 shadow-lg' : 'border-transparent rounded-xl hover:border-border focus-within:ring-2 focus-within:ring-primary/20'}`}>
        <Search className="absolute left-4 w-5 h-5 text-foreground/80" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search your favourite books..."
          className="w-full h-11 pl-12 pr-4 text-sm bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-foreground placeholder:text-foreground/60 font-medium"
        />
        <button type="submit" className="hidden">Search</button>
      </form>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {isFocused && query && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border border-primary/30 border-t-0 rounded-b-xl shadow-2xl overflow-hidden flex flex-col z-[100]"
          >
            <div className="p-3 grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
              {/* Books Column */}
              <div>
                <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5"><BookOpen size={10}/> Books</h4>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=1984')}>
                    <div className="w-6 h-9 bg-surface rounded shadow-sm border border-border overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="1984" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-foreground truncate">1984</p>
                      <p className="text-[10px] text-text-muted truncate">George Orwell</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=Dune')}>
                    <div className="w-6 h-9 bg-surface rounded shadow-sm border border-border overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="Dune" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-foreground truncate">Dune</p>
                      <p className="text-[10px] text-text-muted truncate">Frank Herbert</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Authors Column */}
              <div>
                <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5"><User size={10}/> Authors</h4>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=George R.R. Martin&tab=authors')}>
                    <div className="w-8 h-8 bg-surface rounded-full shadow-sm border border-border overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&fit=crop" className="w-full h-full object-cover" alt="George R.R. Martin" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-foreground truncate">George R.R. Martin</p>
                      <p className="text-[10px] text-text-muted truncate">Epic Fantasy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => router.push('/search?q=J.K. Rowling&tab=authors')}>
                    <div className="w-8 h-8 bg-surface rounded-full shadow-sm border border-border overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop" className="w-full h-full object-cover" alt="J.K. Rowling" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-foreground truncate">J.K. Rowling</p>
                      <p className="text-[10px] text-text-muted truncate">Fantasy Master</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-2 bg-surface-hover border-t border-white/5 text-center">
              <button onClick={() => handleSearch()} className="text-[11px] font-bold text-primary hover:text-primary-light transition-colors">
                See all results for "{query}" &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
