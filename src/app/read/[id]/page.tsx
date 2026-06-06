"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { BookHeroDetails, BookHeroCover } from '@/features/read/components/BookHero';
import { BookStats } from '@/features/read/components/BookStats';
import { BookDescription } from '@/features/read/components/BookDescription';
import { ReadingProgress } from '@/features/read/components/ReadingProgress';
import { NetworkFeed } from '@/features/read/components/NetworkFeed';
import { NetworkSidebar } from '@/features/read/components/NetworkSidebar';
import { CommentsSection } from '@/features/read/components/CommentsSection';
import { AuthorProfile } from '@/features/read/components/AuthorProfile';

export default function ReadBookPage({ params }: { params: { id: string } }) {
  const [isNetworkSidebarOpen, setNetworkSidebarOpen] = useState(false);
  
  // Mock Data
  const mockBook = {
    title: "The 360 Degree Leader",
    subtitle: "Developing Your Influence from Anywhere in the Organization",
    author: "John C. Maxwell",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    releaseDate: "September 23, 2024",
    pages: 85,
    chapters: 5,
    rating: 4.9,
    categories: ["Career", "Business", "Leadership", "Management"],
    isPremium: true,
    stats: {
      likes: 2602,
      shares: 24,
      bookmarks: 12,
      views: "229x"
    },
    description: "Is it possible to lead effectively if you are not in a top leadership position? What if your superior is an ineffective leader? The answer lies in this book! Become a 360° Leader, and you will be able to lead effectively even if you are not at the top. Become a 360° Leader, and you can still lead well even under an ineffective leader. This book explains how to overcome various challenges when you are in a mid-level position within an organization and teaches the skills needed to become a 360° Leader, such as influencing people—whether they are your superiors, peers at the same level, or subordinates.",
  };

  const mockChapters = [
    { id: 1, title: "Chapter 1", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=150&auto=format&fit=crop", locked: false },
    { id: 2, title: "Chapter 2", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=150&auto=format&fit=crop", locked: false },
    { id: 3, title: "Chapter 3", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=150&auto=format&fit=crop", locked: false },
    { id: 4, title: "Chapter 4", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=150&auto=format&fit=crop", locked: true },
    { id: 5, title: "Chapter 5", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=150&auto=format&fit=crop", locked: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 overflow-x-hidden">


        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1 min-w-0 flex flex-col">
            <BookHeroDetails book={mockBook} />
            <BookStats />
            <BookDescription text={mockBook.description} />
            <ReadingProgress progress={72} chapters={mockChapters} />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-10">
            <BookHeroCover book={mockBook} />
            <NetworkFeed onOpenSidebar={() => setNetworkSidebarOpen(true)} />
            <CommentsSection />
            <AuthorProfile 
              name="John C. Maxwell" 
              initials="JM" 
              bio="American author, speaker, and pastor who has written many books, primarily focusing on leadership. Titles include The 21 Irrefutable Laws of Leadership and The 21 Indispensable Qualities of a Leader." 
            />
          </div>
          
        </div>
      </main>

      <NetworkSidebar 
        isOpen={isNetworkSidebarOpen} 
        onClose={() => setNetworkSidebarOpen(false)} 
      />
    </div>
  );
}
