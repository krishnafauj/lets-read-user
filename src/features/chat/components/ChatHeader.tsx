"use client";

import React from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ChatHeader() {
  const router = useRouter();

  return (
    <div className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => router.push('/chat')}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-surface-hover text-text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        
        <div className="flex flex-col">
          <button className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors text-sm">
            Deep Work — Cal Newport
            <ChevronDown size={14} className="text-text-muted" />
          </button>
          <span className="text-[11px] text-text-muted font-medium">Powered by AI • 847 pages indexed</span>
        </div>
      </div>
    </div>
  );
}
