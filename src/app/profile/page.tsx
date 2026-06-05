"use client";

import { motion } from "framer-motion";
import {
  Edit3,
  Flame,
  BookOpen,
  Clock,
  Brain,
  Settings,
  Trophy,
  Star,
  Zap,
  Target,
  Lock,
  Crown,
  ChevronRight,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const activityData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 80 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 110 },
  { day: "Fri", minutes: 95 },
  { day: "Sat", minutes: 60 },
  { day: "Sun", minutes: 75 },
  { day: "Mon", minutes: 50 },
  { day: "Tue", minutes: 90 },
  { day: "Wed", minutes: 120 },
  { day: "Thu", minutes: 85 },
  { day: "Fri", minutes: 100 },
  { day: "Sat", minutes: 40 },
  { day: "Sun", minutes: 70 },
];

const stats = [
  { label: "Day Streak", value: "47", icon: <Flame size={20} />, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  { label: "Spaces", value: "12", icon: <BookOpen size={20} />, color: "#6366F1", bg: "rgba(99,102,241,0.12)" },
  { label: "Hours Read", value: "847", icon: <Clock size={20} />, color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  { label: "Avg Mastery", value: "89%", icon: <Brain size={20} />, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
];

const achievements = [
  { id: 1, emoji: "🔥", name: "Streak Master", desc: "30 Day Streak", unlocked: true, color: "#F59E0B" },
  { id: 2, emoji: "📚", name: "Bookworm", desc: "Read 50 books", unlocked: true, color: "#6366F1" },
  { id: 3, emoji: "🧠", name: "Knowledge Seeker", desc: "1000 flash cards", unlocked: true, color: "#8B5CF6" },
  { id: 4, emoji: "⚡", name: "Speed Reader", desc: "Book in 3 days", unlocked: true, color: "#22C55E" },
  { id: 5, emoji: "🎯", name: "Perfect Week", desc: "7/7 daily goals", unlocked: true, color: "#EC4899" },
  { id: 6, emoji: "🏆", name: "Top Learner", desc: "Top 1% this month", unlocked: false, color: "#F59E0B" },
  { id: 7, emoji: "🌟", name: "Grand Master", desc: "90% mastery avg", unlocked: false, color: "#6366F1" },
  { id: 8, emoji: "🦉", name: "Night Owl", desc: "100 late sessions", unlocked: false, color: "#8B5CF6" },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-xl">
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        <p className="text-sm font-bold text-[var(--color-primary)]">{payload[0].value} min</p>
      </div>
    );
  }
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto"
    >
      {/* Hero */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-[var(--color-card)] border border-[var(--color-border)] p-8 mb-6"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[#8B5CF6]/10 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#8B5CF6] flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-[var(--color-primary)]/30"
            >
              AK
            </motion.div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--color-success)] border-2 border-[var(--color-card)] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[var(--color-text)]">Alex Kim</h1>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs font-semibold text-[#F59E0B]">
                <Crown size={11} /> Pro Member
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm mt-0.5">@alexkim</p>
            <p className="text-[var(--color-text-subtle)] text-sm mt-2 max-w-md leading-relaxed">
              Lifelong learner. Passionate about psychology, productivity & building better habits. Reading my way through the world's best ideas.
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-2 flex items-center gap-1">
              <Calendar size={11} /> Pro Member since Jan 2025
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-colors shadow-lg shadow-[var(--color-primary)]/20"
            >
              <Edit3 size={14} />
              Edit Profile
            </motion.button>
            <Link href="/profile/settings">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-white/5 border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border)]/80 transition-colors cursor-pointer"
              >
                <Settings size={16} />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.3 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.bg, color: stat.color }}>
                {stat.icon}
              </div>
              <TrendingUp size={12} className="text-[var(--color-success)]" />
            </div>
            <p className="text-2xl font-bold text-[var(--color-text)]">{stat.value}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievements */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)]"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
              <Trophy size={18} className="text-[#F59E0B]" />
              Achievements
            </h2>
            <span className="text-sm text-[var(--color-text-muted)]">
              {achievements.filter((a) => a.unlocked).length}/{achievements.length} unlocked
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.4 }}
                whileHover={badge.unlocked ? { y: -4, transition: { duration: 0.2 } } : {}}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                  badge.unlocked
                    ? "bg-white/5 border-white/10 hover:border-white/20 cursor-pointer"
                    : "bg-white/2 border-white/5 opacity-40"
                }`}
              >
                {!badge.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={10} className="text-[var(--color-text-muted)]" />
                  </div>
                )}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: badge.unlocked ? badge.color + "20" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${badge.unlocked ? badge.color + "40" : "transparent"}`,
                    filter: badge.unlocked ? "none" : "grayscale(1)",
                  }}
                >
                  {badge.emoji}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text)] leading-tight">{badge.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{badge.desc}</p>
                </div>
                {badge.unlocked && (
                  <div className="w-5 h-5 rounded-full bg-[var(--color-success)]/20 border border-[var(--color-success)]/40 flex items-center justify-center">
                    <Star size={9} className="text-[var(--color-success)] fill-[var(--color-success)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick stats sidebar */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)]">
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
              <Zap size={14} className="text-[#F59E0B]" />
              Current Streak
            </h3>
            <div className="flex items-end gap-1.5 mb-4">
              <span className="text-5xl font-black text-[var(--color-text)]">47</span>
              <div className="mb-1">
                <span className="text-2xl">🔥</span>
                <p className="text-xs text-[var(--color-text-muted)]">days</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.03 + 0.5 }}
                  className="flex-1 h-6 rounded-sm"
                  style={{
                    background: i < 11 ? "var(--color-primary)" : "rgba(99,102,241,0.15)",
                    opacity: i < 11 ? 0.6 + (i / 11) * 0.4 : 1,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">Last 14 days active</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)]">
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
              <Target size={14} className="text-[var(--color-primary)]" />
              This Week
            </h3>
            {[
              { label: "Books Read", value: "3", max: 5 },
              { label: "Flash Cards", value: "47", max: 100 },
              { label: "Hours", value: "6.2", max: 10 },
            ].map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[var(--color-text-muted)]">{item.label}</span>
                  <span className="text-xs font-bold text-[var(--color-text)]">{item.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[var(--color-primary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(parseFloat(item.value) / item.max) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link href="/profile/settings">
            <motion.div
              whileHover={{ x: 3 }}
              className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Settings size={16} className="text-[var(--color-text-muted)]" />
                <span className="text-sm font-medium text-[var(--color-text-subtle)]">Account Settings</span>
              </div>
              <ChevronRight size={14} className="text-[var(--color-text-muted)]" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Activity chart */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <TrendingUp size={18} className="text-[var(--color-primary)]" />
            Learning Activity
          </h2>
          <span className="text-xs text-[var(--color-text-muted)] px-3 py-1 rounded-full bg-white/5 border border-[var(--color-border)]">
            Last 14 days
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={activityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fill: "var(--color-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#activityGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#6366F1", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
