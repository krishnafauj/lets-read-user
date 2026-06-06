"use client";

import React from 'react';
import { Sparkles, FileText, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ChatBubbleProps {
  role: 'user' | 'ai';
  content: string;
  time: string;
  citations?: { title: string, page: string }[];
}

export function ChatBubble({ role, content, time, citations }: ChatBubbleProps) {
  const isAI = role === 'ai';

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-8`}>
      <div className={`flex max-w-[85%] gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className="shrink-0 mt-1">
          {isAI ? (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Sparkles size={14} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-foreground font-bold text-xs shadow-md">
              Y
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="flex flex-col">
          <div 
            className={`p-5 rounded-2xl ${
              isAI 
                ? 'bg-surface text-foreground border border-border rounded-tl-sm shadow-md' 
                : 'bg-primary text-primary-foreground rounded-tr-sm shadow-lg shadow-primary/10'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>

            {/* Citations (Only for AI) */}
            {isAI && citations && citations.length > 0 && (
              <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                {citations.map((cite, idx) => (
                  <button 
                    key={idx}
                    className="flex items-center gap-2 bg-background hover:bg-surface-hover border border-border text-xs text-foreground px-3 py-2 rounded-lg transition-colors w-max group"
                  >
                    <FileText size={12} className="text-primary" />
                    Cited from: {cite.title}, Page {cite.page}
                    <ChevronRight size={12} className="text-text-muted group-hover:text-foreground transition-colors ml-1" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Timestamp */}
          <div className={`text-[10px] text-text-muted mt-2 font-semibold ${isAI ? 'text-left ml-1' : 'text-right mr-1'}`}>
            {time}
          </div>
        </div>

      </div>
    </div>
  );
}
