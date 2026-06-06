"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreHorizontal, Plus, ChevronRight } from "lucide-react";
import Image from "next/image";

export const SidebarWidgetContainer = ({ children, title, action }: { children: React.ReactNode, title: string, action?: React.ReactNode }) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="bg-surface-hover rounded-3xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4 relative h-6">
        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.div 
              key="header"
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between w-full"
            >
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsSearching(true)} className="text-text-muted hover:text-foreground transition-colors"><Search size={14} /></button>
                {action || <button className="text-text-muted hover:text-foreground transition-colors"><MoreHorizontal size={16} /></button>}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute -inset-1 px-3 flex items-center gap-2 bg-surface-hover/90 backdrop-blur-md rounded-full z-10 shadow-sm"
            >
              <Search size={14} className="text-text-muted shrink-0" />
              <input 
                autoFocus
                type="text" 
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-text-muted/70 p-0"
                style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
              />
              <button onClick={() => setIsSearching(false)} className="text-text-muted hover:text-foreground shrink-0 transition-transform hover:scale-110">
                <Plus size={16} className="rotate-45" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
};

export const BrowseAuthorsWidget = () => (
  <SidebarWidgetContainer title="Browse Authors">
    <div className="flex justify-between mb-6 px-2">
      {[
        { name: "J.K Rowling", books: "15 books", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
        { name: "Dan Brown", books: "7 books", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
        { name: "R.L Stine", books: "400 books", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      ].map((author, i) => (
        <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-14 h-14 rounded-full overflow-hidden transition-transform group-hover:scale-110 shadow-sm border border-border">
            <Image src={author.img} alt={author.name} width={56} height={56} className="object-cover w-full h-full" />
          </div>
          <div className="text-center">
            <p className="text-[11px] font-semibold text-foreground">{author.name}</p>
            <p className="text-[9px] text-text-muted">{author.books}</p>
          </div>
        </div>
      ))}
    </div>
    <button className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors">
      Explore All Authors
    </button>
  </SidebarWidgetContainer>
);

export const RecentSearchWidget = () => (
  <SidebarWidgetContainer title="Recent Search" action={<button className="text-[10px] text-text-muted hover:text-foreground">Clear All</button>}>
    <div className="flex flex-wrap gap-2">
      {["Da Vinci Code", "J.K Rowling", "Plot Twist", "Halloween", "Scary", "Biography in Industry", "Weekly Picks"].map((tag, i) => (
        <span key={i} className="text-[11px] font-medium text-text-muted bg-background hover:bg-border/50 hover:text-foreground cursor-pointer transition-colors px-3 py-1.5 rounded-full border border-border">
          {tag}
        </span>
      ))}
      {/* Highlighted tags using primary color */}
      <span className="text-[11px] font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 cursor-pointer">Da Vinci Code</span>
      <span className="text-[11px] font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 cursor-pointer">J.K Rowling</span>
    </div>
  </SidebarWidgetContainer>
);

export const CategoriesWidget = () => (
  <SidebarWidgetContainer title="Categories">
    <div className="flex flex-wrap gap-2">
      {[
        { name: "Maths", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
        { name: "Research", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
        { name: "Science", color: "bg-green-500/10 text-green-500 border-green-500/20" },
        { name: "History", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
        { name: "Fiction", color: "bg-pink-500/10 text-pink-500 border-pink-500/20" },
        { name: "Philosophy", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
        { name: "Technology", color: "bg-teal-500/10 text-teal-500 border-teal-500/20" },
        { name: "Art", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
        { name: "Business", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
      ].map((cat, i) => (
        <span 
          key={i} 
          className={`text-[11px] font-semibold cursor-pointer transition-all hover:scale-105 px-3 py-1.5 rounded-full border ${cat.color}`}
        >
          {cat.name}
        </span>
      ))}
    </div>
  </SidebarWidgetContainer>
);

export const MenuWidget = () => (
  <SidebarWidgetContainer title="Menu">
    <div className="flex flex-col gap-1">
      {[
        { title: "Books Collections", sub: "Curated books across genres", icon: "📚", color: "bg-primary" },
        { title: "Browse Authors", sub: "Explore writers and their works", icon: "👤", color: "bg-secondary" },
        { title: "Downloaded Books", sub: "Your saved offline books", icon: "⬇️", color: "bg-warning" },
        { title: "Your Dashboard", sub: "Track progress and activity", icon: "🏠", color: "bg-dark-forest" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-background cursor-pointer transition-colors group">
          <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-xs shadow-sm`}>
            <div className="w-full h-full rounded-full bg-black/10 flex items-center justify-center mix-blend-overlay" />
          </div>
          <div className="flex-1">
            <h4 className="text-[13px] font-medium text-foreground">{item.title}</h4>
            <p className="text-[10px] text-text-muted">{item.sub}</p>
          </div>
          <ChevronRight size={14} className="text-text-muted group-hover:text-primary transition-colors" />
        </div>
      ))}
    </div>
  </SidebarWidgetContainer>
);
