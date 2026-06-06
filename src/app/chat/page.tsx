"use client";

import React from 'react';
import { ChatLayout } from '@/features/chat/components/ChatLayout';
import { EmptyChatInput } from '@/features/chat/components/EmptyChatInput';
import { BookOpen, Search, Edit3 } from 'lucide-react';

function EmptyChatArea() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-w-0 min-h-0 bg-transparent px-8 pb-[10vh]">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">What's on your mind today?</h1>
        
        <div className="w-full relative">
          <EmptyChatInput />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface-hover text-sm font-medium text-text-muted hover:text-foreground transition-colors shadow-sm">
            <BookOpen size={16} />
            Select books
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface-hover text-sm font-medium text-text-muted hover:text-foreground transition-colors shadow-sm">
            <Edit3 size={16} />
            Write or edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface-hover text-sm font-medium text-text-muted hover:text-foreground transition-colors shadow-sm">
            <Search size={16} />
            Look something up
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewChatPage() {
  return (
    <ChatLayout>
      <EmptyChatArea />
    </ChatLayout>
  );
}
