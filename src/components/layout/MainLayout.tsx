'use client'

import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main
          className={cn(
            'flex-1 overflow-y-auto overflow-x-hidden bg-background',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
