import React from "react";
import { motion } from "framer-motion";
import { FilterTab, Notification } from "../types";
import { INBOX_TABS } from "../data/mockData";
import { itemVariants } from "../utils/animations";

interface InboxTabsProps {
  activeTab: FilterTab;
  setActiveTab: (tab: FilterTab) => void;
  items: Notification[];
}

export function InboxTabs({ activeTab, setActiveTab, items }: InboxTabsProps) {
  return (
    <motion.div variants={itemVariants} className="flex gap-1 p-1 bg-surface rounded-xl border border-border w-fit mb-6">
      {INBOX_TABS.map((tab) => {
        const tabCount =
          tab.key === "all"
            ? items.filter((n) => n.unread).length
            : items.filter((n) => n.type === tab.key && n.unread).length;
        
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key ? "text-white" : "text-text-muted hover:text-foreground"
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="activeInboxTab"
                className="absolute inset-0 rounded-lg bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.label}
              {tabCount > 0 && (
                <span className={`text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold ${activeTab === tab.key ? "bg-white/25" : "bg-primary/30 text-primary"}`}>
                  {tabCount}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}
