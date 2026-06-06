"use client";

import React, { useRef, useState } from 'react';
import { Send, Plus, Mic } from 'lucide-react';

export function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="p-6 bg-background shrink-0 w-full max-w-4xl mx-auto">
      <div className="w-full bg-surface border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all">
        
        {/* Top Input Area */}
        <div className="relative p-4 pb-2">
          <textarea 
            ref={textareaRef}
            placeholder="Message..." 
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
            className="w-full bg-transparent border-0 border-transparent focus:border-transparent focus:ring-0 focus:ring-transparent focus:outline-none outline-none shadow-none text-foreground placeholder:text-text-muted resize-none overflow-hidden leading-relaxed text-[15px] min-h-[40px] p-0 m-0"
            style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
          />
          
          <div className="flex items-center justify-between mt-2 px-1">
            <button className="text-text-muted hover:text-foreground transition-colors p-1" title="Add attachment">
              <Plus size={20} />
            </button>
            
            {inputValue.length === 0 ? (
              <button className="text-text-muted hover:text-foreground transition-colors p-1" title="Voice input">
                <Mic size={18} />
              </button>
            ) : (
              <button 
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        <p className="text-[10px] text-text-muted font-medium">AI can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}
