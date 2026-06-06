import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Palette, Check, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

const THEMES = [
  { id: 'dark', name: 'Dark Mode', color: '#000000', icon: Moon },
  { id: 'light', name: 'Default Light', color: '#f8fafc', border: '#e2e8f0' },
  { id: 'light-rose', name: 'Warm Rose', color: '#fffafa', border: '#fce7e7' },
  { id: 'light-ocean', name: 'Ocean Breeze', color: '#f8fafc', border: '#e2e8f0' },
  { id: 'light-amber', name: 'Amber Glow', color: '#fffbeb', border: '#fde68a' },
  { id: 'light-sage', name: 'Sage Nature', color: '#f4f5f4', border: '#d3d9d5' },
  { id: 'light-lavender', name: 'Soft Lavender', color: '#fcfaff', border: '#e9d5ff' },
]

export function ThemePicker({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // When collapsed, just toggle dark/light like before
  if (collapsed) {
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex items-center justify-center w-10 h-10 mx-auto cursor-pointer group hover:bg-surface-hover transition-colors duration-150 text-foreground rounded-xl"
        title="Toggle theme"
      >
        <Palette className="w-4 h-4 text-text-muted group-hover:text-foreground transition-colors duration-150" />
      </button>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-3 py-2.5 mx-2 cursor-pointer group hover:bg-surface-hover transition-colors duration-150 text-foreground rounded-xl"
      >
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
            <Palette className="w-4 h-4 text-text-muted group-hover:text-foreground transition-colors duration-150" />
          </div>
          <span className="text-sm whitespace-nowrap overflow-hidden">
            Appearance
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mx-2"
          >
            <div className="pt-1 pb-2 px-1 flex flex-col gap-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex items-center gap-3 px-2 py-1.5 rounded-lg text-xs transition-colors",
                    theme === t.id ? "bg-primary/10 text-primary font-medium" : "text-text-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm flex items-center justify-center shrink-0" 
                    style={{ background: t.color, border: t.border ? `1px solid ${t.border}` : '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {t.id === 'dark' && <Moon size={8} className="text-white" />}
                  </div>
                  <span className="flex-1 text-left">{t.name}</span>
                  {theme === t.id && <Check size={12} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
