"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User, Bell, Palette, Shield, CreditCard, ChevronLeft,
  Moon, Sun, Monitor, Trash2, LogOut, Camera, Mail, Lock,
  Globe, Eye, EyeOff, Crown, Check, AlertTriangle, ChevronRight,
  Flame
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Animation Variants ───────────────────────────────────────────────────────
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = "account" | "notifications" | "appearance" | "privacy" | "subscription";

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
        checked ? "bg-primary border-primary" : "bg-white/5 border-white/10 hover:bg-white/10"
      }`}
    >
      <motion.div
        animate={{ x: checked ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 600, damping: 25 }}
        className={`absolute top-[1px] w-5 h-5 rounded-full shadow-md ${
          checked ? "bg-white" : "bg-text-muted"
        }`}
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
    <motion.div variants={itemVariants} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-border/50 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-surface border border-white/5 shadow-sm flex items-center justify-center shrink-0 text-primary group-hover:scale-105 transition-transform duration-300">
            {icon}
          </div>
        )}
        <div className="flex flex-col justify-center min-h-[40px]">
          <p className="text-[15px] font-medium text-foreground">{label}</p>
          {description && (
            <p className="text-sm text-text-muted mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="shrink-0 flex items-center">{children}</div>}
    </motion.div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={itemVariants}
      className="p-6 md:p-8 rounded-3xl bg-surface/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">{title}</h3>
      <div className="flex flex-col">{children}</div>
    </motion.div>
  );
}

// ─── Section Content Components ───────────────────────────────────────────────

function AccountSection() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Profile Information">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-4 border-b border-border/50 mb-4">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-3xl font-medium text-white shadow-xl shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
              AK
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-surface border border-white/10 shadow-lg flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
              <Camera size={14} />
            </div>
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">Alex Kim</p>
            <p className="text-sm text-text-muted mt-1">Upload a new avatar. Larger image will be resized automatically.</p>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { label: "Full Name", value: "Alex Kim", type: "text" },
            { label: "Username", value: "@alexkim", type: "text" },
            { label: "Bio", value: "Lifelong learner. Passionate about psychology and behavioral economics.", type: "textarea" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-sm font-medium text-text-muted block mb-2">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  defaultValue={field.value}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-white/10 focus:bg-surface focus:border-primary/50 text-[15px] text-foreground placeholder:text-text-muted focus:outline-none transition-all resize-none shadow-inner"
                />
              ) : (
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-white/10 focus:bg-surface focus:border-primary/50 text-[15px] text-foreground focus:outline-none transition-all shadow-inner"
                />
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 mt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-[15px] font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            Save Changes
          </motion.button>
        </div>
      </SectionCard>

      <SectionCard title="Account Security">
        <SettingRow icon={<Mail size={18} />} label="Email Address" description="alex.kim@example.com">
          <button className="text-sm text-primary font-medium hover:underline px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">Change</button>
        </SettingRow>
        <SettingRow icon={<Lock size={18} />} label="Password" description="Last changed 3 months ago">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                defaultValue="secretpassword123"
                readOnly
                className="pr-10 pl-4 py-2 w-40 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent text-[15px] text-foreground focus:outline-none"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button className="text-sm text-primary font-medium hover:underline px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">Update</button>
          </div>
        </SettingRow>
        <SettingRow icon={<Globe size={18} />} label="Two-Factor Authentication" description="Add an extra layer of security to your account">
          <button className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 hover:border-primary/30 transition-all shadow-sm">
            Enable 2FA
          </button>
        </SettingRow>
      </SectionCard>
    </div>
  );
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    streakReminders: true, weeklyReport: true, newContent: true,
    achievements: true, aiAnswers: true, marketing: false,
    email: true, push: true,
  });

  const toggle = (key: keyof typeof settings) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Learning Notifications">
        <SettingRow icon={<Bell size={18} />} label="Streak Reminders" description="Daily reminder to maintain your streak">
          <Toggle checked={settings.streakReminders} onChange={() => toggle("streakReminders")} />
        </SettingRow>
        <SettingRow icon={<Bell size={18} />} label="Weekly Report" description="Summary of your weekly learning progress">
          <Toggle checked={settings.weeklyReport} onChange={() => toggle("weeklyReport")} />
        </SettingRow>
        <SettingRow icon={<Bell size={18} />} label="New Content Alerts" description="When new books or content are added to your spaces">
          <Toggle checked={settings.newContent} onChange={() => toggle("newContent")} />
        </SettingRow>
        <SettingRow icon={<Crown size={18} />} label="Achievement Unlocked" description="Celebrate when you earn a new badge">
          <Toggle checked={settings.achievements} onChange={() => toggle("achievements")} />
        </SettingRow>
        <SettingRow icon={<Bell size={18} />} label="AI Tutor Answers" description="When the AI responds to your questions">
          <Toggle checked={settings.aiAnswers} onChange={() => toggle("aiAnswers")} />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Delivery Channels">
        <SettingRow icon={<Mail size={18} />} label="Email Notifications" description="Receive updates to your inbox">
          <Toggle checked={settings.email} onChange={() => toggle("email")} />
        </SettingRow>
        <SettingRow icon={<Monitor size={18} />} label="Push Notifications" description="Browser and mobile push notifications">
          <Toggle checked={settings.push} onChange={() => toggle("push")} />
        </SettingRow>
        <SettingRow icon={<Mail size={18} />} label="Marketing Emails" description="Tips, features, and LetsRead updates">
          <Toggle checked={settings.marketing} onChange={() => toggle("marketing")} />
        </SettingRow>
      </SectionCard>
    </div>
  );
}

function AppearanceSection() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [accentColor, setAccentColor] = useState("#00BEAA");

  const themes = [
    { key: "dark" as const, label: "Dark", icon: <Moon size={18} /> },
    { key: "light" as const, label: "Light", icon: <Sun size={18} /> },
    { key: "system" as const, label: "System", icon: <Monitor size={18} /> },
  ];

  const accents = ["#00BEAA", "#8B5CF6", "#EC4899", "#22C55E", "#F59E0B", "#0EA5E9"];

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Theme Preference">
        <div className="py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  theme === t.key
                    ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(0,190,170,0.15)]"
                    : "bg-surface/50 border-white/5 hover:bg-surface hover:border-white/20"
                }`}
              >
                {theme === t.key && (
                  <div className="absolute top-3 right-3 text-primary">
                    <Check size={16} />
                  </div>
                )}
                <div className={`p-3 rounded-full transition-colors ${theme === t.key ? "bg-primary/20 text-primary" : "bg-white/5 text-text-muted"}`}>
                  {t.icon}
                </div>
                <span className={`text-[15px] font-medium transition-colors ${theme === t.key ? "text-primary" : "text-foreground"}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Accent Color">
        <div className="py-2">
          <div className="flex flex-wrap gap-4">
            {accents.map((color) => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                className="relative w-12 h-12 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
                style={{ background: color, boxShadow: accentColor === color ? `0 0 20px ${color}60` : undefined }}
              >
                {accentColor === color && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check size={20} className="text-white drop-shadow-md" />
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
            className="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-white/10 text-[15px] text-foreground focus:outline-none focus:bg-surface focus:border-primary/50 cursor-pointer appearance-none pr-10 relative"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
          >
            {["small", "medium", "large", "x-large"].map((s) => (
              <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </SettingRow>
        <SettingRow label="Compact Mode" description="Denser layout for more content on screen">
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
    publicProfile: true, showStreak: true, showLibrary: false,
    analyticsOpt: true, dataSharing: false,
  });
  const toggle = (key: keyof typeof settings) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Profile Visibility">
        <SettingRow icon={<Eye size={18} />} label="Public Profile" description="Allow others to find and view your profile">
          <Toggle checked={settings.publicProfile} onChange={() => toggle("publicProfile")} />
        </SettingRow>
        <SettingRow icon={<Flame size={18} />} label="Show Streak" description="Display your learning streak on your profile">
          <Toggle checked={settings.showStreak} onChange={() => toggle("showStreak")} />
        </SettingRow>
        <SettingRow icon={<Globe size={18} />} label="Show Library" description="Let others see your saved books and highlights">
          <Toggle checked={settings.showLibrary} onChange={() => toggle("showLibrary")} />
        </SettingRow>
      </SectionCard>

      <SectionCard title="Data & Analytics">
        <SettingRow icon={<Shield size={18} />} label="Usage Analytics" description="Help us improve by sharing anonymous usage data">
          <Toggle checked={settings.analyticsOpt} onChange={() => toggle("analyticsOpt")} />
        </SettingRow>
        <SettingRow icon={<Shield size={18} />} label="Personalization Data" description="Share reading data to improve recommendations">
          <Toggle checked={settings.dataSharing} onChange={() => toggle("dataSharing")} />
        </SettingRow>
        <SettingRow icon={<Shield size={18} />} label="Download My Data" description="Request an export of all your data">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[15px] font-medium text-foreground hover:bg-white/10 hover:border-white/20 transition-all shadow-sm">
            Request Export
          </button>
        </SettingRow>
      </SectionCard>
    </div>
  );
}

function SubscriptionSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Current Plan">
        <div className="py-2">
          <div className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 mb-6">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-[1px] shadow-lg shadow-[#F59E0B]/20">
                <div className="w-full h-full bg-surface/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Crown size={24} className="text-[#F59E0B]" />
                </div>
              </div>
              <div>
                <p className="text-xl font-medium text-foreground flex items-center gap-2">
                  Pro Plan <span className="px-2 py-0.5 rounded-md bg-success/20 text-success text-xs uppercase tracking-wider font-semibold">Active</span>
                </p>
                <p className="text-sm text-text-muted mt-0.5">Member since Jan 2025</p>
              </div>
            </div>
            <div className="sm:text-right mt-4 sm:mt-0 relative z-10">
              <p className="text-3xl font-medium text-foreground">$12<span className="text-base text-text-muted">/mo</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
            {[
              "Unlimited books & spaces", "AI tutor (unlimited)", "Offline downloads",
              "Advanced analytics", "Priority support", "Early access features",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-[15px] text-text-muted">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-success" />
                </div>
                {feature}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-[15px] font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              Manage Subscription
            </motion.button>
            <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[15px] font-medium text-foreground hover:bg-white/10 hover:border-white/20 transition-all shadow-sm">
              View Invoices
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Billing Details">
        <SettingRow icon={<CreditCard size={18} />} label="Payment Method" description="Visa ending in 4242">
          <button className="text-sm text-primary font-medium hover:underline px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">Update</button>
        </SettingRow>
        <SettingRow icon={<CreditCard size={18} />} label="Next Billing Date" description="July 1, 2026">
          <span className="text-[15px] font-medium text-text-muted bg-white/5 px-3 py-1 rounded-lg">$12.00</span>
        </SettingRow>
      </SectionCard>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTIONS: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: "account", label: "Account", icon: <User size={18} /> },
  { key: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { key: "appearance", label: "Appearance", icon: <Palette size={18} /> },
  { key: "privacy", label: "Privacy", icon: <Shield size={18} /> },
  { key: "subscription", label: "Subscription", icon: <CreditCard size={18} /> },
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
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-6 lg:p-8 lg:pt-10 w-full max-w-[1400px] relative z-0"
    >
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/profile" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 hover:-translate-x-1 transition-all group" title="Back to Profile">
            <ChevronLeft size={20} className="text-text-muted group-hover:text-foreground transition-colors" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">Settings</h1>
        </div>
        <p className="text-text-muted text-sm mt-1 max-w-xl leading-relaxed sm:ml-14">Manage your account details, appearance, and subscription preferences.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Sidebar Nav */}
        <motion.nav
          variants={itemVariants}
          className="lg:w-56 shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide relative z-10 lg:sticky lg:top-8"
        >
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-300 whitespace-nowrap overflow-hidden group ${
                activeSection === section.key
                  ? "text-primary shadow-[0_4px_20px_rgb(0,0,0,0.1)]"
                  : "text-text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              {activeSection === section.key && (
                <motion.div
                  layoutId="activeSettingsNav"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <span className={`transition-colors duration-300 ${activeSection === section.key ? "text-primary" : "text-text-muted group-hover:text-foreground"}`}>
                  {section.icon}
                </span>
                {section.label}
              </span>
            </button>
          ))}

          {/* Divider + Danger Actions */}
          <div className="hidden lg:block mt-4 pt-4 border-t border-border/50">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all w-full group">
              <LogOut size={16} className="transition-colors" />
              Sign Out
            </button>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="flex-1 min-w-0 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-8"
            >
              {sectionContent[activeSection]}

              {/* Danger Zone */}
              <motion.div
                variants={itemVariants}
                className="p-6 md:p-8 rounded-3xl bg-red-500/[0.03] border border-red-500/10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-5">
                  <AlertTriangle size={18} />
                  Danger Zone
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex-1">
                    <p className="text-[15px] font-medium text-foreground">Delete Account</p>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed max-w-lg">
                      Permanently delete your account, learning data, and active subscription. This action cannot be undone.
                    </p>
                  </div>
                  {!showDeleteConfirm ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[15px] font-medium text-red-400 hover:bg-red-500 hover:text-white hover:border-transparent transition-all shadow-sm shrink-0"
                    >
                      <Trash2 size={16} />
                      Delete Account
                    </motion.button>
                  ) : (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 shrink-0"
                      >
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[15px] font-medium text-text-muted hover:text-foreground hover:bg-white/10 transition-all shadow-sm"
                        >
                          Cancel
                        </button>
                        <button className="px-5 py-2 rounded-xl bg-red-500 text-[15px] font-medium text-white shadow-lg shadow-red-500/20 hover:bg-red-600 hover:shadow-red-500/30 transition-all">
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
