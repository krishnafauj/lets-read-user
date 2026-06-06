"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export const SearchHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(queryParam);

  // Sync state with URL if it changes externally
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="w-full mb-10 mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search Results
        </h1>
        <p className="text-sm text-text-muted">
          Showing results for <span className="text-primary font-semibold">"{queryParam}"</span>
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full md:max-w-md relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-10 group-hover:opacity-30 transition duration-500" />
        <div className="relative flex items-center bg-surface border border-border hover:border-primary/50 transition-colors rounded-full px-4 py-2.5 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <Search className="text-text-muted mr-3" size={18} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search again..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-text-muted p-0 focus:outline-none"
            style={{ outline: "none", border: "none", boxShadow: "none" }}
          />
          {query && (
            <button 
              type="button" 
              onClick={clearSearch} 
              className="text-text-muted hover:text-foreground ml-2 p-1 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
