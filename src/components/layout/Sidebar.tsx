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
  MessageSquare,
  SquarePen,
  MoreHorizontal,
  PenLine,
  Share2,
  Trash2
} from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'
import { SmallLogo } from '@/components/ui/SmallLogo'
import Image from 'next/image'
import { ThemePicker } from './ThemePicker'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Discover', href: '/discover', icon: Search },
  { label: 'AI Workspace', href: '/ai-workspace', icon: Brain },
  { label: 'Learning Center', href: '/learning-center', icon: Target },
  { label: 'For You', href: '/for-you', icon: Sparkles },
  { label: 'Library', href: '/library', icon: Library },
]

const recentItems = [
  { label: 'Explain confounding compounding', href: '/chat/uuid-1' },
  { label: 'Strategies for minimizing distraction', href: '/chat/uuid-2' },
  { label: 'Newport\'s 4 rules summarized', href: '/chat/uuid-3' },
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
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null)
  const [aiWorkspaceExpanded, setAiWorkspaceExpanded] = useState(() => pathname.startsWith('/ai-workspace'))
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-collapse sidebar when entering an AI workspace chat
  useEffect(() => {
    if (pathname.match(/^\/ai-workspace\/[^\/]+\/[^\/]+$/)) {
      setCollapsed(true)
    }
  }, [pathname])

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
            <Link 
              href={item.href} 
              title={collapsed ? item.label : undefined}
              onClick={(e) => {
                if (item.label === 'AI Workspace') {
                  setAiWorkspaceExpanded(!aiWorkspaceExpanded);
                } else {
                  setAiWorkspaceExpanded(false);
                  setExpandedBookId(null);
                }
              }}
            >
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
                          onClick={() => {
                            setExpandedBookId(expandedBookId === book.id ? null : book.id);
                          }}
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

        {/* Chat History Section */}
        {!collapsed && recentItems.length > 0 && (
          <div className="mt-1 mb-2">
            <div className="flex flex-col gap-0.5 mb-6">
              <Link 
                href={`/chat`}
                className={cn(
                  "relative flex items-center cursor-pointer transition-colors duration-200 rounded-xl group select-none",
                  collapsed ? 'justify-center w-10 h-10 mx-auto' : 'gap-3 px-3 py-2 mx-2',
                  "text-foreground hover:bg-surface-hover font-medium"
                )}
              >
                <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
                  <SquarePen className="w-[18px] h-[18px] opacity-90 transition-opacity" />
                </div>
                {!collapsed && (
                  <span className="text-[13px] font-medium flex-1 truncate">New chat</span>
                )}
              </Link>
            </div>
            <h4 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-4 mb-2">Chat History</h4>
            <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[160px] scrollbar-hide pb-2">
              {recentItems.map((item, idx) => (
                <div key={idx} className="relative group/item flex items-center mx-2 rounded-lg hover:bg-surface-hover">
                  <Link 
                    href={item.href} 
                    title={item.label}
                    onClick={() => setAiWorkspaceExpanded(false)}
                    className="flex-1 flex items-center px-4 py-1.5 text-text-muted hover:text-foreground font-medium transition-colors duration-200 select-none min-w-0"
                  >
                    <span className="text-[12px] font-light truncate">{item.label}</span>
                  </Link>
                  
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-1 p-1 rounded-md text-text-muted hover:text-foreground transition-all duration-200 opacity-0 group-hover/item:opacity-100 hover:bg-surface data-[state=open]:opacity-100 data-[state=open]:bg-surface data-[state=open]:border data-[state=open]:border-border"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </DropdownMenu.Trigger>
                    
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content 
                        align="end" 
                        sideOffset={4}
                        className="w-32 bg-surface border border-border rounded-xl shadow-lg z-50 py-1 overflow-hidden animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                      >
                        <DropdownMenu.Item className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-text-muted hover:text-foreground hover:bg-surface-hover data-[highlighted]:text-foreground data-[highlighted]:bg-surface-hover transition-colors outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 cursor-pointer">
                          <PenLine size={12} /> Rename
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-text-muted hover:text-foreground hover:bg-surface-hover data-[highlighted]:text-foreground data-[highlighted]:bg-surface-hover transition-colors outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 cursor-pointer">
                          <Share2 size={12} /> Share
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="h-[1px] bg-border my-1 w-full" />
                        <DropdownMenu.Item className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-500/10 data-[highlighted]:bg-red-500/10 transition-colors outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 cursor-pointer">
                          <Trash2 size={12} /> Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Footer Section */}
      <div className="shrink-0 p-2 border-t border-border flex flex-col space-y-[2px]">
        
        {/* Theme Toggle */}
        {mounted && <ThemePicker collapsed={collapsed} />}

      </div>

    </motion.aside>
  )
}
