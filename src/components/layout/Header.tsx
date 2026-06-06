import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between h-[60px] px-6 shrink-0 bg-background text-foreground border-b border-border">
      {/* Left side: Empty / Spacer */}
      <div></div>

      {/* Right side: Modern Search bar */}
      <div className="relative group flex items-center">
        {/* Gradient shadow/glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
        
        {/* Input Container */}
        <div className="relative flex items-center bg-background rounded-full border border-border shadow-sm overflow-hidden">
          <Search className="absolute left-3.5 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-64 focus:w-72 h-9 pl-10 pr-4 text-sm bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0 text-foreground placeholder:text-text-muted transition-all duration-300 ease-out"
          />
        </div>
      </div>
    </header>
  )
}
