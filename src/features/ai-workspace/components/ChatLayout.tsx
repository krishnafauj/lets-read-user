"use client";

import React, { useState } from 'react';
import { AISidebar } from '@/features/ai-workspace/components/AISidebar';
import { ChatHeader } from '@/features/ai-workspace/components/ChatHeader';
import { ContextSidebar } from '@/features/ai-workspace/components/ContextSidebar';
export function ChatLayout({ children, bookId, hideAISidebar = false, hideHeader = false }: { children: React.ReactNode, bookId: string, hideAISidebar?: boolean, hideHeader?: boolean }) {
  const [isSidebarOpen, setSidebarOpen] = useState(!hideAISidebar);
  const [isContextOpen, setContextOpen] = useState(false);

  const handleToggleContext = () => {
    if (!isContextOpen && isSidebarOpen && !hideAISidebar) {
      setSidebarOpen(false); // Auto-close left sidebar if opening right sidebar
    }
    setContextOpen(!isContextOpen);
  };  

  const handleToggleSidebar = () => {
    if (hideAISidebar) return;
    if (!isSidebarOpen && isContextOpen) {
      setContextOpen(false); // Auto-close right sidebar if opening left sidebar
    }
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full overflow-hidden w-full bg-background font-sans">
      {!hideAISidebar && <AISidebar isOpen={isSidebarOpen} />}
      <div className="flex-1 flex flex-col bg-background min-w-0 min-h-0">
        {!hideHeader && (
          <ChatHeader 
            isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={handleToggleSidebar} 
            isContextOpen={isContextOpen}
            onToggleContext={handleToggleContext}
            bookId={bookId}
            hideSidebarToggle={hideAISidebar}
          />
        )}
        {children}
      </div>
      <ContextSidebar isOpen={isContextOpen} onClose={() => setContextOpen(false)} />
    </div>
  );
}
