"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { networkActivities } from './NetworkFeed';

interface NetworkSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NetworkSidebar({ isOpen, onClose }: NetworkSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredActivities = networkActivities.filter(act => 
    act.user.toLowerCase().includes(search.toLowerCase()) || 
    act.content.toLowerCase().includes(search.toLowerCase()) ||
    act.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-4 bottom-4 right-4 w-[400px] bg-surface text-foreground flex flex-col rounded-3xl shadow-2xl z-50 overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-border bg-surface sticky top-0 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-normal">All Activity</h2>
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-surface-hover text-text-muted hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search comments, users..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-surface-hover text-sm rounded-xl pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/30 transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-normal text-sm shrink-0 shadow-sm ${act.color}`}>
                      {act.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-normal text-sm">{act.user}</span>
                        <span className="flex items-center gap-1 text-[10px] font-normal text-text-muted uppercase tracking-wider">
                          {act.icon} {act.action}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted italic bg-surface-hover p-3 rounded-lg rounded-tl-none leading-relaxed">
                        {act.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-text-muted">
                  <Search size={32} className="mb-2 opacity-20" />
                  <p className="text-sm font-normal">No activity found</p>
                  <p className="text-xs opacity-70">Try a different search term</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
