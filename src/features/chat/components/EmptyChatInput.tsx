"use client";

import React, { useRef, useState } from 'react';
import { Send, BookOpen, Plus, Mic, ChevronDown } from 'lucide-react';

export function EmptyChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="p-6 bg-background shrink-0 w-full max-w-4xl mx-auto">
      <div className="w-full bg-surface border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all">
        
        {/* Top Input Area */}
        <div className="relative p-4 pb-2">
          <textarea 
            ref={textareaRef}
            placeholder="How can I help you today?" 
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              const newHeight = Math.min(target.scrollHeight, 200);
              target.style.height = newHeight + 'px';
              target.style.overflowY = target.scrollHeight > 200 ? 'auto' : 'hidden';
            }}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-foreground placeholder:text-text-muted resize-none overflow-hidden leading-relaxed text-[15px] min-h-[40px] p-0 m-0"
          />
          
          <div className="flex items-center justify-between mt-2 px-1">
            <button className="text-text-muted hover:text-foreground transition-colors p-1" title="Add attachment">
              <Plus size={20} />
            </button>
            
            {inputValue.length === 0 && (
              <button className="text-text-muted hover:text-foreground transition-colors p-1" title="Voice input">
                <Mic size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="h-[1px] bg-border mx-2" />

        {/* Bottom Toolbar */}
        <div className="px-4 py-2.5 flex items-center justify-between">
          <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-surface-hover text-[13px] text-text-muted hover:text-foreground font-medium transition-colors">
            <BookOpen size={15} />
            <span>Select a book</span>
            <ChevronDown size={14} className="ml-1 opacity-70" />
          </button>

          <button 
            disabled={inputValue.trim().length === 0}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>

      <div className="text-center mt-3">
        <p className="text-[10px] text-text-muted font-medium">AI can make mistakes. Verify important information from the book.</p>
      </div>
    </div>
  );
}
