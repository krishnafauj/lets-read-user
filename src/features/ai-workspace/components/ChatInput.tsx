"use client";

import React, { useRef } from 'react';
import { Send, BookOpen } from 'lucide-react';

export function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="p-6 bg-background shrink-0">
      <div className="relative max-w-4xl mx-auto flex items-end">
        {/* Ask context button */}
        <div className="absolute left-3 bottom-[9px]">
          <button className="w-8 h-8 rounded-sm bg-surface flex items-center justify-center text-text-muted hover:text-primary-foreground hover:bg-primary transition-colors shadow-sm">
            <BookOpen size={14} />
          </button>
        </div>

        <textarea 
          ref={textareaRef}
          placeholder="Ask anything about Deep Work..." 
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            const newHeight = Math.min(target.scrollHeight, 140);
            target.style.height = newHeight + 'px';
            target.style.overflowY = target.scrollHeight > 140 ? 'auto' : 'hidden';
          }}
          className="w-full bg-surface border border-border rounded-sm pl-14 pr-16 py-3.5 text-foreground text-sm outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder:text-text-muted transition-all shadow-inner resize-none overflow-hidden min-h-[50px] leading-relaxed"
        />

        {/* Send Button */}
        <div className="absolute right-3 bottom-[5px]">
          <button className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shadow-md shadow-primary/20 active:scale-95">
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
