'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Brain,
  BookOpen,
  Target,
  Search,
  Library,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
  { label: 'Profile', href: '/profile', icon: User },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

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
      {/* Logo */}
      <div className="flex items-center h-[60px] px-4 shrink-0 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 shrink-0 bg-primary text-background">
            <Sparkles className="w-4 h-4" />
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
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}>
              <div
                className={cn(
                  'relative flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors duration-150',
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
                      'w-5 h-5 transition-colors duration-150',
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
                        className="absolute top-2 right-2 w-2 h-2 rounded-none bg-primary shrink-0"
                      />
                    ) : (
                      <motion.span
                        key="count"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative ml-auto text-xs px-2 py-0.5 bg-border text-foreground shrink-0"
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

      {/* User section */}
      <div className="shrink-0 p-3 border-t border-border">
        <Link href="/profile">
          <div className="flex items-center gap-3 px-3 py-3 cursor-pointer group hover:bg-surface-hover transition-colors duration-150">
            <div className="w-8 h-8 shrink-0 flex items-center justify-center text-sm font-semibold bg-primary text-background">
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

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-[18px] -right-3 z-10 flex items-center justify-center w-6 h-6 bg-surface border border-border text-text-muted hover:text-foreground transition-colors duration-150"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </motion.aside>
  )
}
