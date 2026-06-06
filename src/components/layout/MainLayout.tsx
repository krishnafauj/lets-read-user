'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const pathname = usePathname()
  const isAiChat = pathname.startsWith('/ai-workspace/') || pathname.startsWith('/chat/');

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 min-h-0">
        {!isAiChat && <Header />}
        <main
          className={cn(
            'flex-1 min-h-0 overflow-x-hidden bg-background',
            isAiChat ? 'flex flex-col overflow-hidden' : 'overflow-y-auto',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
