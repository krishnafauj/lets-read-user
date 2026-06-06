"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Book, Heart, MessageSquare, MapPin, Bookmark } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

export function AuthorProfile({ authorId }: { authorId: string }) {
  const router = useRouter();

  // Mock data for the author based on the screenshot and requirements
  const author = {
    name: "Cal Newport",
    birth: "1982",
    birthplace: "United States",
    bio: "Cal Newport is a computer science professor at Georgetown University and a bestselling author. He writes about the intersection of digital technology and culture. He is the author of seven books, including Deep Work, Digital Minimalism, and So Good They Can't Ignore You.\n\nHe is known for coining the term 'Deep Work', which is the ability to focus without distraction on a cognitively demanding task. He argues that deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy. As a consequence, the few who cultivate this skill, and then make it the core of their working life, will thrive.",
    image: "https://i.pravatar.cc/500?img=11", // Placeholder image
  };

  const books = [
    { title: "Deep Work", coverColor: "bg-teal-500", year: "2016" },
    { title: "Digital Minimalism", coverColor: "bg-orange-500", year: "2019" },
    { title: "A World Without Email", coverColor: "bg-blue-600", year: "2021" },
    { title: "Slow Productivity", coverColor: "bg-red-500", year: "2024" },
  ];

  const posts = [
    { title: "The Rise of the Pseudo-Depth", date: "Oct 12, 2025", likes: 342, comments: 45 },
    { title: "Why I don't use social media", date: "Sep 04, 2025", likes: 1024, comments: 211 },
    { title: "Rethinking the inbox", date: "Aug 15, 2025", likes: 89, comments: 12 },
  ];

  const recentActivity = [
    { action: "Liked a book", target: "Thinking, Fast and Slow", time: "2 days ago" },
    { action: "Published a new post", target: "The Rise of the Pseudo-Depth", time: "1 week ago" },
    { action: "Added a highlight", target: "Essentialism", time: "2 weeks ago" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background min-h-0">
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          
          {/* Left: Author Image */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="relative aspect-square rounded-sm overflow-hidden shadow-md bg-surface border border-border group">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Star className="w-5 h-5 text-primary fill-primary/20" />
              </button>
            </div>
          </div>

          {/* Right: Author Bio */}
          <div className="flex-1 flex flex-col pt-2">
            <h1 className="text-4xl font-semibold text-foreground/90 mb-4">{author.name}</h1>
            
            <div className="prose prose-sm text-[15px] leading-relaxed text-text-muted max-w-3xl whitespace-pre-wrap mb-6 font-light">
              {author.bio}
            </div>

            <div className="flex items-center gap-2 text-[13px] text-text-muted mt-auto pt-4 border-t border-border/50 font-medium">
              <span className="font-semibold text-foreground/80">Origin:</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {author.birthplace}</span>
            </div>
          </div>
        </div>

        {/* Tabbed Content Section */}
        <Tabs.Root defaultValue="books" className="w-full mt-10">
          <Tabs.List className="flex gap-8 border-b border-border mb-8">
            <Tabs.Trigger value="books" className="pb-3 text-[16px] font-medium text-text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all outline-none">
              Books by the Author
            </Tabs.Trigger>
            <Tabs.Trigger value="posts" className="pb-3 text-[16px] font-medium text-text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all outline-none">
              Posts & Articles
            </Tabs.Trigger>
            <Tabs.Trigger value="activity" className="pb-3 text-[16px] font-medium text-text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all outline-none">
              Recent Activity
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="books" className="outline-none">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book, i) => (
                <div key={i} className="group cursor-pointer flex flex-col">
                  <div className={`aspect-[2/3] w-full rounded-sm ${book.coverColor} mb-3 shadow-sm border border-border/10 flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                    
                    {/* Bookmark Button */}
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 z-10">
                      <Bookmark className="w-4 h-4 text-white" />
                    </button>

                    <Book className="w-10 h-10 text-white/40" />
                    <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-[10px] font-medium uppercase tracking-wider">{author.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-[14px] font-semibold text-foreground/90 group-hover:text-primary transition-colors line-clamp-1 mb-0.5">{book.title}</h3>
                    <p className="text-[12px] text-text-muted font-medium mb-3">{book.year}</p>
                  </div>

                  {/* Get Button */}
                  <button className="w-full py-1.5 bg-surface border border-border hover:bg-surface-hover rounded text-[12px] font-semibold text-text-muted hover:text-foreground transition-colors">
                    Get Book
                  </button>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="posts" className="outline-none">
            <div className="max-w-3xl flex flex-col gap-4">
              {posts.map((post, i) => (
                <div key={i} className="p-6 rounded-sm bg-surface border border-border hover:border-primary/30 transition-all shadow-sm cursor-pointer group">
                  <h3 className="text-lg font-semibold text-foreground/90 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-[13px] text-text-muted font-medium mb-4">{post.date}</p>
                  
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/50 text-[13px] text-text-muted font-medium">
                    <span className="flex items-center gap-1.5 hover:text-primary transition-colors"><Heart className="w-4 h-4" /> {post.likes} Likes</span>
                    <span className="flex items-center gap-1.5 hover:text-primary transition-colors"><MessageSquare className="w-4 h-4" /> {post.comments} Comments</span>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="activity" className="outline-none">
            <div className="max-w-3xl flex flex-col gap-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-sm bg-surface border border-border shadow-sm">
                  <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {activity.action.includes("Like") ? <Heart className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-[14px] text-foreground font-medium mb-1">
                      <span className="font-medium">{author.name}</span> {activity.action.toLowerCase()}: <span className="font-semibold text-foreground/90 hover:text-primary cursor-pointer transition-colors">{activity.target}</span>
                    </p>
                    <p className="text-[12px] text-text-muted">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

        </Tabs.Root>

      </div>
    </div>
  );
}
