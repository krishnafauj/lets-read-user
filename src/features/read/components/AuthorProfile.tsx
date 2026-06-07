import React from 'react';

interface AuthorProfileProps {
  name: string;
  bio: string;
  initials: string;
}

export function AuthorProfile({ name, bio, initials }: AuthorProfileProps) {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-normal text-lg text-foreground">About the author</h3>
        <button className="text-xs font-normal text-primary hover:underline">View profile →</button>
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 rounded-full bg-[#4B3B2B] flex items-center justify-center text-white font-normal text-lg shrink-0 shadow-sm">
          {initials}
        </div>
        <div>
          <h4 className="font-normal text-foreground mb-1">{name}</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            {bio}
          </p>
          <button className="mt-3 text-xs font-normal px-4 py-1.5 rounded-full border border-border text-foreground hover:bg-surface-hover transition-colors">
            Follow Author
          </button>
        </div>
      </div>
    </div>
  );
}
