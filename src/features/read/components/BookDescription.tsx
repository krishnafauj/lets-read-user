"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BookDescriptionProps {
  text: string;
}

export function BookDescription({ text }: BookDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="py-8">
      <div className={`relative ${!expanded ? 'max-h-[100px] overflow-hidden' : ''}`}>
        <p className="text-sm text-text-muted leading-relaxed">
          {text}
        </p>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
      
      <button 
        onClick={() => setExpanded(!expanded)}
        className="text-primary text-sm font-normal mt-2 hover:underline flex items-center gap-1"
      >
        {expanded ? (
          <>Show less <ChevronUp size={14} /></>
        ) : (
          <>Show full description <ChevronDown size={14} /></>
        )}
      </button>
    </div>
  );
}
