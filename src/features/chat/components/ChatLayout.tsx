"use client";

import React from 'react';

export function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full overflow-hidden w-full bg-background font-sans">
      <div className="flex-1 flex flex-col bg-background min-w-0 min-h-0 relative">
        {children}
      </div>
    </div>
  );
}
