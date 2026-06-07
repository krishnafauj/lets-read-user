import React from 'react';
import Image from 'next/image';
import { ThumbsUp, Reply } from 'lucide-react';

export function CommentsSection() {
  const comments = [
    {
      user: "@kafiraun",
      time: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
      text: "Figma ipsum component variant main layer. Select mask prototype group boolean figma component connection.",
      likes: 8
    },
    {
      user: "@harahara",
      time: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      text: "This chapter completely changed my perspective on leadership styles.",
      likes: 8
    }
  ];

  return (
    <div className="bg-surface-hover/50 p-6 rounded-2xl border border-border">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-normal text-lg text-foreground">Comments</h3>
        <span className="bg-white/50 text-foreground text-xs font-normal px-2 py-0.5 rounded-full shadow-sm">30</span>
      </div>

      {/* Input Box */}
      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm mb-6">
        <textarea 
          placeholder="What do you think about this book...?"
          className="w-full bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-text-muted/60 min-h-[60px]"
        />
        <div className="flex justify-end mt-2">
          <button className="bg-[#F4A261] hover:bg-[#E76F51] text-white text-xs font-normal px-5 py-2 rounded-lg transition-colors shadow-sm">
            Send
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
        {comments.map((comment, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
              <Image src={comment.avatar} alt={comment.user} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-normal text-xs text-foreground">{comment.user}</span>
                <span className="text-[10px] text-text-muted">• {comment.time}</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed mb-2">
                {comment.text}
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-[10px] font-normal text-text-muted hover:text-foreground transition-colors">
                  <Reply size={12} /> Reply
                </button>
                <button className="flex items-center gap-1 text-[10px] font-normal text-text-muted hover:text-primary transition-colors">
                  <ThumbsUp size={12} /> {comment.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
