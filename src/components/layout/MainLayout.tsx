'use client'

import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A0A0B' }}>
      <Sidebar />
      <main
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden',
          className
        )}
        style={{ background: '#0A0A0B' }}
      >
        {children}
      </main>
    </div>
  )
}
