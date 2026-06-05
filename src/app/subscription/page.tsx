"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  Download,
  ChevronRight,
  Zap,
  Users,
  Shield,
  Sparkles,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  current?: boolean;
  features: string[];
  cta: string;
  gradient: string;
  icon: React.ReactNode;
}

interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "paid" | "pending";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with the basics",
    features: [
      "Basic access to spaces",
      "Up to 2 spaces",
      "Community discussions",
      "Limited reading history",
    ],
    cta: "Downgrade to Free",
    gradient: "from-zinc-700 to-zinc-600",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For serious learners",
    badge: "Current Plan",
    current: true,
    features: [
      "Unlimited spaces",
      "Full AI chat & conversations",
      "Visual summaries & flashcards",
      "Advanced learning analytics",
      "Offline reading",
      "Priority support",
    ],
    cta: "Manage Plan",
    gradient: "from-indigo-500 to-violet-600",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: "team",
    name: "Team",
    price: "$29",
    period: "per month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Up to 10 members",
      "Advanced team analytics",
      "Custom space creation",
      "Admin dashboard",
      "SSO & security controls",
      "Dedicated account manager",
    ],
    cta: "Upgrade to Team",
    gradient: "from-amber-500 to-orange-500",
    icon: <Users className="w-5 h-5" />,
  },
];

const featureRows = [
  { label: "Access to spaces", free: "2 spaces", pro: "Unlimited", team: "Unlimited" },
  { label: "AI conversations", free: false, pro: true, team: true },
  { label: "Visual summaries", free: false, pro: true, team: true },
  { label: "Flashcards & quizzes", free: false, pro: true, team: true },
  { label: "Learning analytics", free: "Basic", pro: "Advanced", team: "Advanced +" },
  { label: "Offline reading", free: false, pro: true, team: true },
  { label: "Team management", free: false, pro: false, team: true },
  { label: "Custom spaces", free: false, pro: false, team: true },
  { label: "Priority support", free: false, pro: true, team: "Dedicated" },
];

const billingHistory: BillingRecord[] = [
  { id: "inv-006", date: "Jun 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00", status: "paid" },
  { id: "inv-005", date: "May 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00", status: "paid" },
  { id: "inv-004", date: "Apr 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00", status: "paid" },
  { id: "inv-003", date: "Mar 1, 2026", description: "Pro Plan — Monthly", amount: "$12.00", status: "paid" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
          <Check className="w-3 h-3 text-indigo-400" strokeWidth={3} />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X className="w-4 h-4 text-zinc-700" />
      </div>
    );
  }
  return <span className="text-xs text-zinc-400 text-center block">{value}</span>;
}

function CancelModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full"
      >
        <h3 className="text-lg font-bold text-white mb-2">Cancel subscription?</h3>
        <p className="text-sm text-zinc-400 mb-6">
          You&apos;ll lose access to AI conversations, unlimited spaces, and all Pro features at the end of your billing period on <strong className="text-white">Jul 1, 2026</strong>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            Keep Pro
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/20 transition-colors"
          >
            Cancel Anyway
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SubscriptionPage() {
  const [showCancel, setShowCancel] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-indigo-600/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-12"
        >
          {/* ── Hero ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-white">Your Plan</h1>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Pro
              </span>
            </div>
            <p className="text-zinc-400">Manage your subscription and billing details</p>
          </motion.div>

          {/* ── Plan Cards ── */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className={`relative flex flex-col gap-5 p-6 rounded-2xl border transition-all ${
                  plan.current
                    ? "bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                    : "bg-zinc-900/60 border-zinc-800"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-semibold shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex flex-col gap-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-md`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                    <p className="text-zinc-400 text-sm">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">/{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    plan.current
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30"
                      : plan.id === "team"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-amber-500/30"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {plan.cta}
                  {plan.id === "team" && <ChevronRight className="w-4 h-4" />}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Feature Comparison Table ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Feature Comparison</h2>
            <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
              {/* Header row */}
              <div className="grid grid-cols-4 bg-zinc-900/80 border-b border-zinc-800">
                <div className="px-4 py-3 text-sm font-medium text-zinc-400">Feature</div>
                <div className="px-4 py-3 text-sm font-medium text-zinc-400 text-center">Free</div>
                <div className="px-4 py-3 text-sm font-medium text-indigo-400 text-center flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Pro
                </div>
                <div className="px-4 py-3 text-sm font-medium text-amber-400 text-center flex items-center justify-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  Team
                </div>
              </div>
              {featureRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-4 border-b border-zinc-800/50 last:border-0 ${
                    i % 2 === 0 ? "bg-transparent" : "bg-zinc-900/30"
                  }`}
                >
                  <div className="px-4 py-3 text-sm text-zinc-300">{row.label}</div>
                  <div className="px-4 py-3 flex items-center justify-center">
                    <FeatureCell value={row.free} />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-center">
                    <FeatureCell value={row.pro} />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-center">
                    <FeatureCell value={row.team} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Payment Method ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Payment Method</h2>
            <div className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                  <p className="text-xs text-zinc-500">Expires 08 / 28</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                Update
              </motion.button>
            </div>
          </motion.div>

          {/* ── Billing History ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Billing History</h2>
            <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
              <div className="grid grid-cols-4 bg-zinc-900/80 border-b border-zinc-800">
                {["Date", "Description", "Amount", "Invoice"].map((h) => (
                  <div key={h} className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    {h}
                  </div>
                ))}
              </div>
              {billingHistory.map((record, i) => (
                <div
                  key={record.id}
                  className={`grid grid-cols-4 items-center border-b border-zinc-800/50 last:border-0 ${
                    i % 2 === 0 ? "bg-transparent" : "bg-zinc-900/30"
                  }`}
                >
                  <div className="px-4 py-3 text-sm text-zinc-400">{record.date}</div>
                  <div className="px-4 py-3 text-sm text-zinc-300">{record.description}</div>
                  <div className="px-4 py-3">
                    <span className="text-sm font-medium text-white">{record.amount}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      record.status === "paid"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  <div className="px-4 py-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 text-xs font-medium transition-colors border border-zinc-700"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Cancel Subscription ── */}
          <motion.div variants={itemVariants} className="flex justify-center pb-8">
            <button
              onClick={() => setShowCancel(true)}
              className="text-sm text-zinc-600 hover:text-red-400 transition-colors underline underline-offset-4"
            >
              Cancel subscription
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Cancel Modal */}
      {showCancel && <CancelModal onClose={() => setShowCancel(false)} />}
    </div>
  );
}
