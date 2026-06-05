"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Palette,
  Shield,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Moon,
  Sun,
  Monitor,
  Trash2,
  LogOut,
  Camera,
  Mail,
  Lock,
  Globe,
  Eye,
  EyeOff,
  Crown,
  Check,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "account" | "notifications" | "appearance" | "privacy" | "subscription";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-[var(--color-primary)]" : "bg-white/10"}`}
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

function SettingRow({
  icon,
  label,
  description,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-[var(--color-border)] last:border-0">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-[var(--color-text-muted)]">
            {icon}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">{label}</p>
          {description && (
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={itemVariants}
      className="p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)]"
    >
      <h3 className="text-base font-bold text-[var(--color-text)] mb-1">{title}</h3>
      <div>{children}</div>
    </motion.div>
  );
}

// ─── Section Content Components ───────────────────────────────────────────────

function AccountSection() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Profile Information">
        {/* Avatar */}
        <div className="flex items-center gap-4 py-4 border-b border-[var(--color-border)]">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#8B5CF6] flex items-center justify-center text-2xl font-bold text-white">
              AK
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <Camera size={11} className="text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)]">Alex Kim</p>
            <p className="text-xs text-[var(--color-text-muted)]">Click the camera to update</p>
          </div>
        </div>

        {/* Fields */}
        {[
          { label: "Full Name", value: "Alex Kim", type: "text" },
          { label: "Username", value: "@alexkim", type: "text" },
          { label: "Bio", value: "Lifelong learner. Passionate about psychology...", type: "textarea" },
        ].map((field) => (
          <div key={field.label} className="py-3 border-b border-[var(--color-border)] last:border-0">
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                defaultValue={field.value}
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors resize-none"
              />
            ) : (
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
              />
            )}
          </div>
        ))}

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Save Changes
          </motion.button>
        </div>
      </SectionCard>

      <SectionCard title="Account Security">
        <SettingRow icon={<Mail size={14} />} label="Email Address" description="alex.kim@example.com">
          <button className="text-xs text-[var(--color-primary)] font-medium hover:underline">Change</button>
        </SettingRow>
        <SettingRow icon={<Lock size={14} />} label="Password" description="Last changed 3 months ago">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                defaultValue="••••••••"
                className="pr-8 pl-3 py-1.5 w-32 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              >
                {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
            </div>
            <button className="text-xs text-[var(--color-primary)] font-medium hover:underline">Update</button>
          </div>
        </SettingRow>
        <SettingRow icon={<Globe size={14} />} label="Two-Factor Authentication" description="Add an extra layer of security">
          <button className="px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-xs font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-colors">
            Enable 2FA
          </button>
        </SettingRow>
      </SectionCard>
    </div>
  );
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    streakReminders: true,
    weeklyReport: true,
    newContent: true,
    achievements: true,
    aiAnswers: true,
    marketing: false,
    email: true,
    push: true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Learning Notifications">
        <SettingRow icon={<Bell size={14} />} label="Streak Reminders" description="Daily reminder to maintain your streak">
          <Toggle checked={settings.streakReminders} onChange={() => toggle("streakReminders")} />
        </SettingRow>
        <SettingRow icon={<Bell size={14} />} label="Weekly Report" description="Summary of your weekly learning progress">
          <Toggle checked={settings.weeklyReport} onChange={() => toggle("weeklyReport")} />
        </SettingRow>
        <SettingRow icon={<Bell size={14} />} label="New Content Alerts" description="When new books or content are added to your spaces">
          <Toggle checked={settings.newContent} onChange={() => toggle("newContent")} />
        </SettingRow>
        <SettingRow icon={<Bell size={14} />} label="Achievement Unlocked" description="Celebrate when you earn a new badge">
          <Toggle checked={settings.achievements} onChange={() => toggle("achievements")} />
        </SettingRow>
        <SettingRow icon={<Bell size={14} />} label="AI Tutor Answers" description="When the AI responds to your questions">
          <Toggle checked={settings.aiAnswers} onChange={() => toggle("aiAnswers")} />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Delivery Channels">
        <SettingRow icon={<Mail size={14} />} label="Email Notifications" description="Receive updates to your inbox">
          <Toggle checked={settings.email} onChange={() => toggle("email")} />
        </SettingRow>
        <SettingRow icon={<Bell size={14} />} label="Push Notifications" description="Browser and mobile push notifications">
          <Toggle checked={settings.push} onChange={() => toggle("push")} />
        </SettingRow>
        <SettingRow icon={<Mail size={14} />} label="Marketing Emails" description="Tips, features, and LetsRead updates">
          <Toggle checked={settings.marketing} onChange={() => toggle("marketing")} />
        </SettingRow>
      </SectionCard>
    </div>
  );
}

function AppearanceSection() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [accentColor, setAccentColor] = useState("#6366F1");

  const themes = [
    { key: "dark" as const, label: "Dark", icon: <Moon size={16} /> },
    { key: "light" as const, label: "Light", icon: <Sun size={16} /> },
    { key: "system" as const, label: "System", icon: <Monitor size={16} /> },
  ];

  const accents = ["#6366F1", "#8B5CF6", "#EC4899", "#22C55E", "#F59E0B", "#0EA5E9"];

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Theme">
        <div className="py-4">
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border text-sm font-medium transition-all ${
                  theme === t.key
                    ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/40 text-[var(--color-primary)]"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border)]/80"
                }`}
              >
                {t.icon}
                {t.label}
                {theme === t.key && <Check size={12} className="text-[var(--color-primary)]" />}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Accent Color">
        <div className="py-4">
          <div className="flex gap-3">
            {accents.map((color) => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                className="relative w-9 h-9 rounded-full transition-transform hover:scale-110"
                style={{ background: color }}
              >
                {accentColor === color && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check size={14} className="text-white" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Reading Preferences">
        <SettingRow label="Font Size" description="Adjust text size for reading">
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]/50"
          >
            {["small", "medium", "large", "x-large"].map((s) => (
              <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </SettingRow>
        <SettingRow label="Compact Mode" description="Denser layout for more content">
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>
        <SettingRow label="Reduce Motion" description="Minimize animations and transitions">
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>
      </SectionCard>
    </div>
  );
}

function PrivacySection() {
  const [settings, setSettings] = useState({
    publicProfile: true,
    showStreak: true,
    showLibrary: false,
    analyticsOpt: true,
    dataSharing: false,
  });
  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Profile Visibility">
        <SettingRow icon={<Eye size={14} />} label="Public Profile" description="Allow others to find and view your profile">
          <Toggle checked={settings.publicProfile} onChange={() => toggle("publicProfile")} />
        </SettingRow>
        <SettingRow icon={<Eye size={14} />} label="Show Streak" description="Display your learning streak on your profile">
          <Toggle checked={settings.showStreak} onChange={() => toggle("showStreak")} />
        </SettingRow>
        <SettingRow icon={<Eye size={14} />} label="Show Library" description="Let others see your saved books and highlights">
          <Toggle checked={settings.showLibrary} onChange={() => toggle("showLibrary")} />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Data & Analytics">
        <SettingRow icon={<Shield size={14} />} label="Usage Analytics" description="Help us improve by sharing anonymous usage data">
          <Toggle checked={settings.analyticsOpt} onChange={() => toggle("analyticsOpt")} />
        </SettingRow>
        <SettingRow icon={<Shield size={14} />} label="Personalization Data" description="Share reading data to improve recommendations">
          <Toggle checked={settings.dataSharing} onChange={() => toggle("dataSharing")} />
        </SettingRow>
        <SettingRow icon={<Shield size={14} />} label="Download My Data" description="Request an export of all your data">
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border)]/80 transition-colors">
            Request Export
          </button>
        </SettingRow>
      </SectionCard>
    </div>
  );
}

function SubscriptionSection() {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Current Plan">
        <div className="py-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)]/10 to-[#8B5CF6]/10 border border-[var(--color-primary)]/30 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center">
                <Crown size={18} className="text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-text)]">Pro Plan</p>
                <p className="text-xs text-[var(--color-text-muted)]">Member since Jan 2025</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[var(--color-text)]">$12<span className="text-sm font-normal text-[var(--color-text-muted)]">/mo</span></p>
              <p className="text-xs text-[var(--color-success)]">Active</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              "Unlimited books & spaces",
              "AI tutor (unlimited)",
              "Offline downloads",
              "Advanced analytics",
              "Priority support",
              "Early access features",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-[var(--color-text-subtle)]">
                <Check size={12} className="text-[var(--color-success)] shrink-0" />
                {feature}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Manage Subscription
            </motion.button>
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              View Invoices
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Billing">
        <SettingRow icon={<CreditCard size={14} />} label="Payment Method" description="Visa ending in 4242">
          <button className="text-xs text-[var(--color-primary)] font-medium hover:underline">Update</button>
        </SettingRow>
        <SettingRow icon={<CreditCard size={14} />} label="Next Billing Date" description="July 1, 2026">
          <span className="text-xs text-[var(--color-text-muted)]">$12.00</span>
        </SettingRow>
      </SectionCard>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTIONS: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: "account", label: "Account", icon: <User size={15} /> },
  { key: "notifications", label: "Notifications", icon: <Bell size={15} /> },
  { key: "appearance", label: "Appearance", icon: <Palette size={15} /> },
  { key: "privacy", label: "Privacy", icon: <Shield size={15} /> },
  { key: "subscription", label: "Subscription", icon: <CreditCard size={15} /> },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("account");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const sectionContent: Record<Section, React.ReactNode> = {
    account: <AccountSection />,
    notifications: <NotificationsSection />,
    appearance: <AppearanceSection />,
    privacy: <PrivacySection />,
    subscription: <SubscriptionSection />,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <Link href="/profile" className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-4 w-fit">
          <ChevronLeft size={14} />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Settings</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Manage your account and preferences</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <motion.nav
          variants={itemVariants}
          className="lg:w-56 shrink-0 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0"
        >
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === section.key
                  ? "text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/5"
              }`}
            >
              {activeSection === section.key && (
                <motion.div
                  layoutId="activeSettingsSection"
                  className="absolute inset-0 rounded-xl bg-[var(--color-primary)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2.5">
                {section.icon}
                {section.label}
              </span>
            </button>
          ))}

          {/* Divider + danger actions */}
          <div className="hidden lg:block mt-4 pt-4 border-t border-[var(--color-border)]">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/5 transition-all w-full">
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </motion.nav>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              {sectionContent[activeSection]}

              {/* Danger Zone */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20"
              >
                <h3 className="text-base font-bold text-red-400 flex items-center gap-2 mb-4">
                  <AlertTriangle size={16} />
                  Danger Zone
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">Delete Account</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      Permanently delete your account and all data. This action cannot be undone.
                    </p>
                  </div>
                  {!showDeleteConfirm ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                      Delete Account
                    </motion.button>
                  ) : (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xs text-red-400 font-medium">Are you sure?</span>
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                          Cancel
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-red-500 text-xs font-semibold text-white hover:bg-red-600 transition-colors">
                          Yes, Delete
                        </button>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
