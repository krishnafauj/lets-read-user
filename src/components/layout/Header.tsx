"use client";

import { Search, Bell, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname();
  const isDiscover = pathname === '/discover';

  return (
    <header className="flex items-center justify-between h-[80px] px-8 shrink-0 bg-background text-foreground">
      {/* Left side: Modern Search bar matching image */}
      <div className="flex-1 max-w-xl">
        {!isDiscover && (
          <div className="relative flex items-center bg-surface-hover rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 border border-transparent hover:border-border">
            <Search className="absolute left-4 w-5 h-5 text-foreground/80" />
            <input
              type="text"
              placeholder="Search your favourite books"
              className="w-full h-11 pl-12 pr-4 text-sm bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-foreground placeholder:text-foreground/60 font-medium"
            />
          </div>
        )}
      </div>

      {/* Right side: Bell & Profile matching image */}
      <div className="flex items-center gap-6 ml-4">
        <button className="relative p-2 text-foreground hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-hover border border-border">
            <Image 
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=100&auto=format&fit=crop" 
              alt="User" 
              width={36} 
              height={36} 
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm font-semibold text-foreground hidden sm:block">Balogun</span>
          <ChevronDown className="w-4 h-4 text-foreground group-hover:text-primary transition-colors hidden sm:block" />
        </div>
      </div>
    </header>
  )
}
