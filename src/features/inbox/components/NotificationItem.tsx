import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Notification } from "../types";
import { itemVariants } from "../utils/animations";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
}

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      layout
      className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
        notification.unread
          ? "bg-primary/5 border-primary/20 hover:border-primary/40"
          : "bg-surface border-border hover:border-border/80 hover:bg-surface-hover"
      }`}
      onClick={() => onRead(notification.id)}
    >
      {/* Unread dot */}
      {notification.unread && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 top-4 w-2 h-2 rounded-full bg-primary"
        />
      )}

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: notification.iconBg }}
      >
        {notification.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4">
        <h3
          className={`text-sm font-semibold leading-snug ${
            notification.unread ? "text-foreground" : "text-text-muted"
          }`}
        >
          {notification.title}
        </h3>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">
          {notification.description}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Clock size={10} /> {notification.time}
          </span>
          {notification.actionLabel && (
            <button className="text-xs font-semibold text-primary hover:underline transition-all">
              {notification.actionLabel}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
