"use client";

import React from 'react';
import { Send, BookOpen } from 'lucide-react';

export function ChatInput() {
  return (
    <div className="p-6 bg-background border-t border-border shrink-0">
      <div className="relative max-w-4xl mx-auto flex items-center">
        {/* Ask context button */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <button className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-primary-foreground hover:bg-primary transition-colors shadow-sm">
            <BookOpen size={14} />
          </button>
        </div>

        <input 
          type="text" 
          placeholder="Ask anything about Deep Work..." 
          className="w-full bg-surface border border-border rounded-2xl pl-14 pr-16 py-4 text-foreground text-sm outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder:text-text-muted transition-all shadow-inner"
        />

        {/* Send Button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shadow-md shadow-primary/20 active:scale-95">
            <Send size={16} className="ml-1" />
          </button>
        </div>
      </div>
      <div className="text-center mt-3">
        <p className="text-[10px] text-text-muted font-medium">AI can make mistakes. Verify important information from the book.</p>
      </div>
    </div>
  );
}
