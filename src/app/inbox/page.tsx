"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Trophy,
  Brain,
  MessageSquare,
  BarChart3,
  BookOpen,
  Zap,
  CheckCheck,
  Dot,
  Clock,
  Settings,
} from "lucide-react";
import { useState } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = "all" | "learning" | "updates" | "achievements";

interface Notification {
  id: number;
  type: FilterTab;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const notifications: Notification[] = [
  {
    id: 1,
    type: "achievements",
    icon: <Trophy size={18} className="text-[#F59E0B]" />,
    iconBg: "rgba(245,158,11,0.15)",
    title: "Achievement Unlocked: 7 Day Streak!",
    description: "You've maintained a 7-day learning streak. Keep going to unlock the 30-day badge!",
    time: "Just now",
    unread: true,
    actionLabel: "View Achievement",
  },
  {
    id: 2,
    type: "updates",
    icon: <Brain size={18} className="text-[#6366F1]" />,
    iconBg: "rgba(99,102,241,0.15)",
    title: "New content added to Deep Work",
    description: "3 new chapters and 12 flash cards have been added to your Deep Work space.",
    time: "2 hours ago",
    unread: true,
    actionLabel: "Explore Now",
  },
  {
    id: 3,
    type: "learning",
    icon: <MessageSquare size={18} className="text-[#22C55E]" />,
    iconBg: "rgba(34,197,94,0.15)",
    title: "Your question was answered",
    description: "An AI tutor has responded to your question about flow states in the Psychology space.",
    time: "5 hours ago",
    unread: true,
    actionLabel: "Read Answer",
  },
  {
    id: 4,
    type: "learning",
    icon: <BarChart3 size={18} className="text-[#8B5CF6]" />,
    iconBg: "rgba(139,92,246,0.15)",
    title: "Weekly learning report ready",
    description: "You read 3 books, completed 47 flash cards, and spent 6.2 hours learning this week.",
    time: "Yesterday",
    unread: false,
    actionLabel: "View Report",
  },
  {
    id: 5,
    type: "updates",
    icon: <BookOpen size={18} className="text-[#EC4899]" />,
    iconBg: "rgba(236,72,153,0.15)",
    title: "Recommended: Thinking, Fast and Slow",
    description: "Based on your reading history, we think you'll love this classic by Daniel Kahneman.",
    time: "2 days ago",
    unread: false,
    actionLabel: "View Book",
  },
  {
    id: 6,
    type: "achievements",
    icon: <Zap size={18} className="text-[#F59E0B]" />,
    iconBg: "rgba(245,158,11,0.15)",
    title: "Achievement Unlocked: Speed Reader",
    description: "You completed a book in under 3 days. Your reading speed has improved by 18%!",
    time: "3 days ago",
    unread: false,
    actionLabel: "View Badge",
  },
  {
    id: 7,
    type: "learning",
    icon: <Brain size={18} className="text-[#6366F1]" />,
    iconBg: "rgba(99,102,241,0.15)",
    title: "Daily review reminder",
    description: "You have 18 flash cards due for review in the Atomic Habits space.",
    time: "3 days ago",
    unread: false,
    actionLabel: "Start Review",
  },
];

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "learning", label: "Learning" },
  { key: "updates", label: "Updates" },
  { key: "achievements", label: "Achievements" },
];

// ─── Notification Item ────────────────────────────────────────────────────────

function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: number) => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      layout
      className={`group relative flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
        notification.unread
          ? "bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40"
          : "bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-border)]/80 hover:bg-[var(--color-card)]/80"
      }`}
      onClick={() => onRead(notification.id)}
    >
      {/* Unread dot */}
      {notification.unread && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 top-4 w-2 h-2 rounded-full bg-[var(--color-primary)]"
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
            notification.unread ? "text-[var(--color-text)]" : "text-[var(--color-text-subtle)]"
          }`}
        >
          {notification.title}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">
          {notification.description}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
            <Clock size={10} /> {notification.time}
          </span>
          {notification.actionLabel && (
            <button className="text-xs font-semibold text-[var(--color-primary)] hover:underline transition-all">
              {notification.actionLabel}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ tab }: { tab: FilterTab }) {
  const labels: Record<FilterTab, string> = {
    all: "No notifications yet",
    learning: "No learning updates",
    updates: "No content updates",
    achievements: "No achievements yet",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mb-5">
        <Bell size={30} className="text-[var(--color-primary)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{labels[tab]}</h3>
      <p className="text-[var(--color-text-muted)] text-sm max-w-xs">
        When you earn achievements, get updates, or receive answers — they&apos;ll appear here.
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [items, setItems] = useState<Notification[]>(notifications);

  const filtered = items.filter(
    (n) => activeTab === "all" || n.type === activeTab
  );

  const unreadCount = items.filter((n) => n.unread).length;

  const markRead = (id: number) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-6 lg:p-8 max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] flex items-center gap-3">
              <Bell className="text-[var(--color-primary)]" size={28} />
              Inbox
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-0.5 text-sm font-semibold rounded-full bg-[var(--color-primary)] text-white"
                >
                  {unreadCount}
                </motion.span>
              )}
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm mt-1">
              Stay up to date with your learning journey
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={markAllRead}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)]/30 transition-colors"
              >
                <CheckCheck size={14} />
                Mark all read
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Settings size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-1 p-1 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] w-fit mb-6">
        {TABS.map((tab) => {
          const tabCount =
            tab.key === "all"
              ? items.filter((n) => n.unread).length
              : items.filter((n) => n.type === tab.key && n.unread).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key ? "text-white" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeInboxTab"
                  className="absolute inset-0 rounded-lg bg-[var(--color-primary)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.label}
                {tabCount > 0 && (
                  <span className={`text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold ${activeTab === tab.key ? "bg-white/25" : "bg-[var(--color-primary)]/30 text-[var(--color-primary)]"}`}>
                    {tabCount}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Notifications list */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <EmptyState key="empty" tab={activeTab} />
        ) : (
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {/* Unread section */}
            {filtered.some((n) => n.unread) && (
              <>
                <motion.p variants={itemVariants} className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-1">
                  New
                </motion.p>
                {filtered
                  .filter((n) => n.unread)
                  .map((n) => (
                    <NotificationItem key={n.id} notification={n} onRead={markRead} />
                  ))}
              </>
            )}

            {/* Read section */}
            {filtered.some((n) => !n.unread) && (
              <>
                <motion.p variants={itemVariants} className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-1 mt-2">
                  Earlier
                </motion.p>
                {filtered
                  .filter((n) => !n.unread)
                  .map((n) => (
                    <NotificationItem key={n.id} notification={n} onRead={markRead} />
                  ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
