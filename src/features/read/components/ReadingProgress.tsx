import React from 'react';
import Image from 'next/image';
import { Lock } from 'lucide-react';

interface ReadingProgressProps {
  progress: number;
  chapters: { id: number; title: string; image: string; locked: boolean }[];
}

export function ReadingProgress({ progress, chapters }: ReadingProgressProps) {
  return (
    <div className="py-8">
      {/* Progress Bar */}
      <div className="bg-surface-hover p-6 rounded-2xl mb-8 flex items-center gap-6 relative overflow-hidden">
        <div className="flex-1 z-10">
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-sm text-foreground">Reading progress</span>
            <span className="text-xs font-semibold text-text-muted">{progress}% complete</span>
          </div>
          <div className="h-2.5 bg-background rounded-full overflow-hidden w-full">
            <div 
              className="h-full bg-[#4B3B2B] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {/* Decorative graphic on the right */}
        <div className="absolute right-0 -bottom-6 opacity-40 select-none pointer-events-none">
           <div className="text-[100px] font-black tracking-tighter text-[#F4A261] rotate-12">{"{ }"}</div>
        </div>
      </div>

      {/* Chapters */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-bold text-foreground">Chapters</h3>
          <span className="bg-surface-hover text-text-muted text-xs font-bold px-2 py-0.5 rounded-full">{chapters.length}</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {chapters.map((chapter, idx) => (
            <div key={chapter.id} className="w-[120px] shrink-0 group cursor-pointer relative">
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-2 relative">
                <Image src={chapter.image} alt={chapter.title} fill className={`object-cover transition-transform duration-500 ${!chapter.locked ? 'group-hover:scale-105' : 'opacity-70 grayscale'}`} />
                {chapter.locked && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                    <Lock size={20} className="text-white mb-2" />
                    <span className="text-[10px] font-bold text-black bg-white/90 px-2 py-1 rounded-full">Coming soon</span>
                  </div>
                )}
              </div>
              <p className="text-xs font-bold text-foreground text-center truncate">{chapter.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
