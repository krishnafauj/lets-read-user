'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Home,
  Brain,
  BookOpen,
  Target,
  Search,
  Library,
  Bell,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'AI Workspace', href: '/ai-workspace', icon: Brain },
  { label: 'Knowledge Spaces', href: '/knowledge-spaces', icon: BookOpen },
  { label: 'Learning Center', href: '/learning-center', icon: Target },
  { label: 'Discover', href: '/discover', icon: Search },
  { label: 'Library', href: '/library', icon: Library },
  { label: 'Inbox', href: '/inbox', icon: Bell, badge: 3 },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 60 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'relative flex flex-col h-full shrink-0 overflow-hidden',
        'bg-surface border-r border-border',
        className
      )}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between h-[60px] px-3 shrink-0">
        <button 
          onClick={() => collapsed && setCollapsed(false)}
          className={cn(
            "flex items-center gap-3 min-w-0 transition-opacity outline-none group", 
            collapsed ? "cursor-pointer" : "cursor-default"
          )}
          title={collapsed ? "Expand sidebar" : undefined}
        >
          <div className="flex items-center justify-center w-8 h-8 shrink-0 bg-primary text-background rounded-md">
            {collapsed ? (
              <>
                <Sparkles className="w-4 h-4 group-hover:hidden" />
                <PanelLeftOpen className="w-4 h-4 hidden group-hover:block" />
              </>
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-base whitespace-nowrap overflow-hidden text-foreground"
              >
                Let&apos;sRead
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="flex items-center justify-center w-8 h-8 text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors duration-150 outline-none"
            title="Close sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 px-2 space-y-[2px] overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}>
              <div
                className={cn(
                  'relative flex items-center gap-2 px-2 py-2 cursor-pointer transition-colors duration-150 rounded-md',
                  'group select-none',
                  isActive
                    ? 'bg-surface-hover text-foreground font-semibold'
                    : 'text-foreground hover:bg-surface-hover'
                )}
              >
                {/* Icon */}
                <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors duration-150',
                      isActive ? 'text-foreground' : 'text-text-muted group-hover:text-foreground'
                    )}
                  />
                </div>

                {/* Label */}
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Badge */}
                {item.badge !== undefined && item.badge > 0 && (
                  <AnimatePresence initial={false}>
                    {collapsed ? (
                      <motion.div
                        key="dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                      />
                    ) : (
                      <motion.span
                        key="count"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative ml-auto text-[10px] px-1.5 py-0.5 rounded-sm bg-border text-foreground shrink-0"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer Section */}
      <div className="shrink-0 p-2 border-t border-border flex flex-col space-y-[2px]">
        
        {/* Theme Toggle */}
        {mounted && (
          <div
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 px-2 py-2 cursor-pointer group hover:bg-surface-hover transition-colors duration-150 text-foreground rounded-md"
            title="Toggle theme"
          >
            <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-text-muted group-hover:text-foreground transition-colors duration-150" />
              ) : (
                <Moon className="w-4 h-4 text-text-muted group-hover:text-foreground transition-colors duration-150" />
              )}
            </div>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative text-sm whitespace-nowrap overflow-hidden"
                >
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Profile */}
        <Link href="/profile">
          <div className="flex items-center gap-2 px-2 py-2 cursor-pointer group hover:bg-surface-hover transition-colors duration-150 rounded-md">
            <div className="w-7 h-7 shrink-0 flex items-center justify-center text-xs font-semibold bg-primary text-background rounded-sm">
              U
            </div>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-semibold text-foreground whitespace-nowrap">User</p>
                  <p className="text-xs text-text-muted whitespace-nowrap">user@letsread.ai</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
      </div>

    </motion.aside>
  )
}
