"use client";

import { motion } from "framer-motion";
import { MessageSquare, ChevronRight, ArrowUpRight } from "lucide-react";
import { recentChats } from "../apis/mockData";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function RecentConversations() {
  return (
    <motion.section variants={itemVariants} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare size={20} className="text-primary" />
          Recent AI Conversations
        </h2>
        <button className="text-sm flex items-center gap-1 font-medium text-text-muted hover:text-foreground transition-colors">
          View all <ChevronRight size={14} />
        </button>
      </div>

      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        {recentChats.map((chat, i) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
            className={`flex items-center justify-between px-6 py-5 group cursor-pointer hover:bg-background/50 transition-colors ${
              i < recentChats.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex items-center gap-5 min-w-0">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-background border border-border shadow-inner group-hover:scale-105 transition-transform">
                {chat.emoji}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold mb-1 text-primary uppercase tracking-wider">
                  {chat.space}
                </p>
                <p className="text-base truncate font-medium text-foreground group-hover:text-primary transition-colors">
                  {chat.question}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 flex-shrink-0 ml-4">
              <span className="text-sm hidden sm:block text-text-muted font-medium">
                {chat.timestamp}
              </span>
              <button className="text-sm font-bold flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
