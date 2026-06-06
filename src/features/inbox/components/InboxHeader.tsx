import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCheck, Settings } from "lucide-react";
import { itemVariants } from "../utils/animations";

interface InboxHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export function InboxHeader({ unreadCount, onMarkAllRead }: InboxHeaderProps) {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bell className="text-primary" size={28} />
            Inbox
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-0.5 text-sm font-semibold rounded-full bg-primary text-white"
              >
                {unreadCount}
              </motion.span>
            )}
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Stay up to date with your learning journey
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onMarkAllRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-sm font-medium text-text-muted hover:text-foreground hover:border-primary/30 transition-colors"
            >
              <CheckCheck size={14} />
              Mark all read
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-surface border border-border text-text-muted hover:text-foreground transition-colors"
          >
            <Settings size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
