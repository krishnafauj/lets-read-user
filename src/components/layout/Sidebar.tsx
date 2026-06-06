'use client'

import React, { useState, useEffect } from 'react'
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
  ChevronDown,
  ChevronRight,
  MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SmallLogo } from '@/components/ui/SmallLogo'
import Image from 'next/image'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'AI Workspace', href: '/ai-workspace', icon: Brain },
  { label: 'For You', href: '/for-you', icon: Sparkles },
  { label: 'Library', href: '/library', icon: Library },
  { label: 'Inbox', href: '/inbox', icon: Bell, badge: 3 },
]

const aiBooks = [
  {
    id: "deep-work",
    title: "Deep Work — Cal Newport",
    chats: [
      "Explain the concept of deep work",
      "What are the key takeaways from chapter 3?",
      "How does this relate to Cal Newport's...",
      "Difference between shallow and deep work",
      "Newport's 4 rules summarized",
      "Strategies for minimizing distraction"
    ]
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    chats: [
      "Explain confounding compounding",
      "Summary of chapter 4"
    ]
  }
];

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null)
  const [aiWorkspaceExpanded, setAiWorkspaceExpanded] = useState(true)
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
      <div className={cn("flex items-center h-[60px] shrink-0", collapsed ? "justify-center" : "justify-between px-3")}>
        <button 
          onClick={() => collapsed && setCollapsed(false)}
          className={cn(
            "flex items-center min-w-0 transition-opacity outline-none group", 
            collapsed ? "cursor-pointer justify-center" : "cursor-default"
          )}
          title={collapsed ? "Expand sidebar" : undefined}
        >
          {collapsed ? (
             <div className="flex items-center justify-center w-10 h-10">
               <SmallLogo />
             </div>
          ) : (
             <div className="relative w-[160px] h-[40px] flex items-center ml-2 overflow-visible">
               <Image 
                 src="/fulllogo.svg" 
                 alt="Let'sRead Logo" 
                 fill
                 className="object-contain object-left scale-[3] origin-left pointer-events-none"
                 priority
               />
             </div>
          )}
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
          <React.Fragment key={item.href}>
            <Link href={item.href} title={collapsed ? item.label : undefined}>
              <div
                className={cn(
                  'relative flex items-center cursor-pointer transition-colors duration-200 rounded-xl group select-none',
                  collapsed ? 'justify-center w-10 h-10 mx-auto' : 'gap-3 px-3 py-2.5 mx-2',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-surface-hover font-medium'
                )}
              >
                {/* Icon */}
                <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
                  <Icon
                    className={cn(
                      'w-[18px] h-[18px] transition-colors duration-200',
                      isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
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
                      className="relative text-sm whitespace-nowrap overflow-hidden flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* AI Workspace Toggle */}
                <AnimatePresence initial={false}>
                  {!collapsed && item.label === 'AI Workspace' && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setAiWorkspaceExpanded(!aiWorkspaceExpanded);
                      }}
                      className="ml-auto p-1 hover:bg-surface-hover rounded-md transition-colors text-text-muted hover:text-foreground"
                    >
                      {aiWorkspaceExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </motion.button>
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
            
            {/* AI Workspace Nested Accordion */}
            {!collapsed && item.label === 'AI Workspace' && aiWorkspaceExpanded && (
              <AnimatePresence>
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="pl-9 pr-2 mt-1 mb-2 flex flex-col gap-1 overflow-y-auto max-h-[240px] scrollbar-hide"
                >
                  {aiBooks.map(book => (
                    <div key={book.id} className="flex flex-col">
                      <div 
                        className={cn(
                          "flex items-center justify-between text-xs rounded-lg transition-colors text-left group",
                          expandedBookId === book.id ? "bg-surface-hover text-foreground font-semibold" : "text-text-muted hover:bg-surface-hover/50"
                        )}
                      >
                        <Link 
                          href={`/ai-workspace/${book.id}`}
                          className="truncate py-1.5 px-2 flex-1 hover:text-foreground transition-colors"
                        >
                          {book.title}
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpandedBookId(expandedBookId === book.id ? null : book.id);
                          }}
                          className="shrink-0 p-1.5 hover:text-foreground transition-colors"
                        >
                          {expandedBookId === book.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {expandedBookId === book.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col gap-1 pl-2 mt-1 overflow-y-auto max-h-[160px] scrollbar-hide"
                          >
                            {book.chats.map((chat, idx) => (
                              <Link 
                                key={idx} 
                                href={`/ai-workspace/${book.id}/chat-${idx}`}
                                className="flex items-start gap-1.5 text-[11px] text-text-muted hover:text-primary transition-colors text-left py-1 pr-1"
                              >
                                <MessageSquare size={12} className="shrink-0 mt-0.5 opacity-60" />
                                <span className="truncate">{chat}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </React.Fragment>
          )
        })}
      </nav>

      {/* Footer Section */}
      <div className="shrink-0 p-2 border-t border-border flex flex-col space-y-[2px]">
        
        {/* Theme Toggle */}
        {mounted && (
          <div
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              "flex items-center cursor-pointer group hover:bg-surface-hover transition-colors duration-150 text-foreground rounded-xl",
              collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5 mx-2"
            )}
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
          <div className={cn(
            "flex items-center cursor-pointer group hover:bg-surface-hover transition-colors duration-150 rounded-xl",
            collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5 mx-2"
          )}>
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
