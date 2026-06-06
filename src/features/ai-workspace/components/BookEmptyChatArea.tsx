"use client";

import React from 'react';
import { ChatInput } from './ChatInput';

export function BookEmptyChatArea() {
  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-transparent h-full">
      {/* Empty Messages Feed */}
      <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-hover flex items-center justify-center mb-6 shadow-sm border border-border">
          <span className="text-3xl text-primary">✧</span>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2 text-center">Ask anything about the book</h2>
        <p className="text-text-muted text-[15px] mb-8 text-center max-w-md">
          I can help you find specific concepts, summarize chapters, or explore ideas from this book.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
          <button className="text-left px-4 py-3 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors shadow-sm">
            <p className="text-[13px] font-medium text-foreground mb-1">Summarize the core concept</p>
            <p className="text-[12px] text-text-muted">What is the main argument of this book?</p>
          </button>
          <button className="text-left px-4 py-3 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors shadow-sm">
            <p className="text-[13px] font-medium text-foreground mb-1">Find actionable advice</p>
            <p className="text-[12px] text-text-muted">Give me 3 practical takeaways to apply.</p>
          </button>
          <button className="text-left px-4 py-3 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors shadow-sm">
            <p className="text-[13px] font-medium text-foreground mb-1">Explain a specific chapter</p>
            <p className="text-[12px] text-text-muted">Break down chapter 1 in simple terms.</p>
          </button>
          <button className="text-left px-4 py-3 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors shadow-sm">
            <p className="text-[13px] font-medium text-foreground mb-1">Look up a quote</p>
            <p className="text-[12px] text-text-muted">Find where the author talks about focus.</p>
          </button>
        </div>
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}
