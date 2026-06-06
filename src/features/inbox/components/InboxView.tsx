import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InboxHeader } from "./InboxHeader";
import { InboxTabs } from "./InboxTabs";
import { NotificationItem } from "./NotificationItem";
import { EmptyState } from "./EmptyState";
import { containerVariants, itemVariants } from "../utils/animations";
import { FilterTab, Notification } from "../types";
import { mockNotifications } from "../data/mockData";

export function InboxView() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [items, setItems] = useState<Notification[]>(mockNotifications);

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
      className="min-h-[calc(100vh-80px)] p-6 lg:p-8 max-w-3xl mx-auto"
    >
      <InboxHeader unreadCount={unreadCount} onMarkAllRead={markAllRead} />
      
      <InboxTabs activeTab={activeTab} setActiveTab={setActiveTab} items={items} />

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
                <motion.p variants={itemVariants} className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1">
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
                <motion.p variants={itemVariants} className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1 mt-2">
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
