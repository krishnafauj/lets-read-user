"use client";

import React from 'react';
import { Plus, Search, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AISidebar({ isOpen }: { isOpen: boolean }) {
  const history = [
    {
      group: "TODAY",
      items: [
        { title: "Explain the concept of deep work", desc: "Deep work refers to professional...", time: "30m ago", active: true },
        { title: "What are the key takeaways from chapter 3?", desc: "Chapter 3 focuses on the rules for...", time: "2h ago", active: false }
      ]
    },
    {
      group: "YESTERDAY",
      items: [
        { title: "How does this relate to Cal Newport's...", desc: "Cal Newport argues that the abil...", time: "6/5/2026", active: false }
      ]
    },
    {
      group: "THIS WEEK",
      items: [
        { title: "Difference between shallow and deep work", desc: "Shallow work consists of non-co...", time: "6/4/2026", active: false },
        { title: "Newport's 4 rules summarized", desc: "The four rules are: Work Deeply, ...", time: "6/3/2026", active: false },
        { title: "Strategies for minimizing distraction", desc: "Newport recommends scheduli...", time: "6/2/2026", active: false }
      ]
    }
  ];

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="shrink-0 bg-surface border-r border-border flex flex-col h-full text-foreground overflow-hidden"
        >
          <div className="w-[320px] h-full flex flex-col shrink-0">
            {/* Header */}
      <div className="p-5 pb-4">
        <h2 className="text-foreground font-semibold text-lg mb-6 flex items-center gap-2">
          <MessageSquare size={18} className="text-primary" />
          AI Workspace
        </h2>
        
        <button className="w-full bg-primary hover:opacity-90 text-white rounded-sm py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 transition-opacity mb-4 shadow-lg shadow-primary/20">
          <Plus size={16} /> New Conversation
        </button>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-surface-hover text-foreground text-sm rounded-sm pl-9 pr-4 py-2.5 outline-none focus:ring-1 focus:ring-primary/50 border border-border placeholder:text-text-muted transition-all"
          />
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-3 pb-6 scrollbar-hide">
        {history.map((group, i) => (
          <div key={i} className="mb-6">
            <h3 className="px-3 text-[10px] font-semibold text-text-muted mb-2 flex items-center gap-1 uppercase tracking-wider">
              <Clock size={10} /> {group.group}
            </h3>
            <div className="flex flex-col gap-1">
              {group.items.map((item, j) => (
                <button 
                  key={j}
                  className={`text-left p-3 rounded-sm transition-colors ${
                    item.active 
                      ? 'bg-primary/10 border border-primary/20 text-primary' 
                      : 'hover:bg-surface-hover text-foreground border border-transparent'
                  }`}
                >
                  <p className="text-sm font-semibold truncate mb-1">{item.title}</p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <p className="truncate mr-2 flex-1">{item.desc}</p>
                    <span className="shrink-0">{item.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
