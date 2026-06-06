"use client";

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isContextOpen: boolean;
  onToggleContext: () => void;
  bookId: string;
}

export function ChatHeader({ isSidebarOpen, onToggleSidebar, isContextOpen, onToggleContext, bookId }: ChatHeaderProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeBook, setActiveBook] = useState("Deep Work — Cal Newport"); // In reality, this would be derived from bookId

  return (
    <div className="h-20 shrink-0 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-md z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface border border-border text-text-muted hover:text-foreground transition-colors"
          title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>

        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner">
          <BookOpen size={16} />
        </div>
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="text-foreground font-bold flex items-center gap-2 hover:text-primary transition-colors text-left"
          >
            {activeBook}
            <ChevronDown size={16} className={`text-text-muted transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <p className="text-xs text-text-muted font-medium mt-0.5">Powered by AI • 847 pages indexed</p>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-3 w-64 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden py-1 z-50"
              >
                {["Deep Work — Cal Newport", "The Psychology of Money", "Company of One"].map(book => (
                  <button 
                    key={book}
                    onClick={() => { setActiveBook(book); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${activeBook === book ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-surface-hover hover:text-primary'}`}
                  >
                    {book}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button 
        onClick={onToggleContext}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors border ${isContextOpen ? 'bg-surface-hover text-foreground border-border' : 'bg-surface hover:bg-surface-hover text-text-muted hover:text-foreground border-border'}`}
      >
        {isContextOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />} Context
      </button>
    </div>
  );
}
