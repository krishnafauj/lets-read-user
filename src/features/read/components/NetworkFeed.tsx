import React from 'react';
import { Check, BookOpen, BookmarkPlus } from 'lucide-react';

export const networkActivities = [
  {
    user: "Emma Lawson",
    initials: "EM",
    action: "Finished",
    icon: <Check size={12} className="text-emerald-500" />,
    color: "bg-emerald-600",
    content: '"Tris is everything I needed in a YA heroine - fierce, flawed, and unforgettable."'
  },
  {
    user: "Jordan Kane",
    initials: "JK",
    action: "Reading - p.214",
    icon: <BookOpen size={12} className="text-[#F4A261]" />,
    color: "bg-[#4B3B2B]",
    content: '"Just hit the Dauntless initiation chapter - couldn\'t put it down last night."'
  },
  {
    user: "Priya Ramesh",
    initials: "PR",
    action: "Finished",
    icon: <Check size={12} className="text-emerald-500" />,
    color: "bg-blue-600",
    content: '"Highlighted 14 passages. The faction system still lives rent-free in my head."'
  },
  {
    user: "Sam Ortega",
    initials: "SO",
    action: "Want to read",
    icon: <BookmarkPlus size={12} className="text-text-muted" />,
    color: "bg-purple-600",
    content: '"Finally adding this - three friends won\'t stop recommending it."'
  }
];

interface NetworkFeedProps {
  onOpenSidebar: () => void;
}

export function NetworkFeed({ onOpenSidebar }: NetworkFeedProps) {
  return (
    <div className="py-6 border-b border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-normal text-lg text-foreground">Your Network</h3>
        <button onClick={onOpenSidebar} className="text-xs font-normal text-primary hover:underline">See all activity →</button>
      </div>

      <div className="flex flex-col gap-6">
        {networkActivities.map((act, i) => (
          <div key={i} className="flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-normal text-sm shrink-0 shadow-sm ${act.color}`}>
              {act.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-normal text-sm text-foreground">{act.user}</span>
                <span className="flex items-center gap-1 text-[10px] font-normal text-text-muted uppercase tracking-wider">
                  {act.icon} {act.action}
                </span>
              </div>
              <p className="text-xs text-text-muted italic bg-surface-hover p-3 rounded-lg rounded-tl-none leading-relaxed">
                {act.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-text-muted mb-1">Looking for more readers?</p>
        <button className="text-xs font-normal text-primary hover:underline">Find friends or join a club →</button>
      </div>
    </div>
  );
}
