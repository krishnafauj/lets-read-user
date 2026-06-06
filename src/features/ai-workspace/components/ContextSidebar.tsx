"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface ContextSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextSidebar({ isOpen, onClose }: ContextSidebarProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 340, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="shrink-0 bg-surface border-l border-border flex flex-col h-full text-foreground overflow-hidden"
        >
          <div className="w-[340px] h-full flex flex-col shrink-0">
            {/* Header */}
            <div className="p-5 pb-4 border-b border-border flex items-center justify-between">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                Book Context
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover text-text-muted hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Placeholder */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Book Cover Placeholder */}
              <div className="w-full aspect-[2/3] bg-surface-hover rounded-xl border border-border flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                 <BookOpen size={48} className="text-primary/20" />
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2">Deep Work</h3>
                <p className="text-sm text-text-muted font-medium mb-4">Cal Newport</p>
                <p className="text-sm leading-relaxed">
                  Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time.
                </p>
              </div>

              <div className="border-t border-border pt-6">
                 <h4 className="font-bold text-sm mb-4">Indexed Chapters</h4>
                 <div className="flex flex-col gap-2">
                   {[1, 2, 3, 4, 5].map(chapter => (
                     <div key={chapter} className="flex items-center justify-between p-3 rounded-lg bg-surface-hover border border-border">
                       <span className="text-sm font-medium">Chapter {chapter}</span>
                       <span className="text-xs text-text-muted">Indexed</span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
