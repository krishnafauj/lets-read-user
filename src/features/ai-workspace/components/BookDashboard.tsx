"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, MessageSquare, Plus, Clock, Star, Brain, Lightbulb, Target, Search, FileText, Layers, Book } from 'lucide-react';
import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';

export function BookDashboard({ bookId }: { bookId: string }) {
  const router = useRouter();

  // Mock data based on bookId
  const bookName = bookId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const recentChats = [
    { id: 'chat-1', title: 'Explain confounding compounding', time: '2h ago' },
    { id: 'chat-2', title: 'Strategies for minimizing distraction', time: 'Yesterday' },
    { id: 'chat-3', title: "Newport's 4 rules summarized", time: 'Jun 3, 2026' },
  ];

  const chapters = [
    { title: "Part 1: The Idea", topics: ["Deep vs Shallow Work", "The Knowledge Economy"] },
    { title: "Part 2: The Rules", topics: ["Work Deeply", "Embrace Boredom", "Quit Social Media", "Drain the Shallows"] },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background min-h-0 relative">
      {/* Decorative top background */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 relative z-10 flex flex-col lg:flex-row gap-10">
        
        {/* Left Column (Main Content) */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Hero Section (Text) */}
          <div className="flex flex-col mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 rounded-sm bg-primary/10 text-primary text-[11px] font-medium uppercase tracking-wider">Productivity</span>
              <span className="px-2.5 py-0.5 rounded-sm bg-surface-hover text-text-muted text-[11px] font-medium uppercase tracking-wider">Psychology</span>
              <span className="text-border ml-1">·</span>
              <span className="text-[13px] text-text-muted flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 5h 20m read</span>
              <span className="text-border">·</span>
              <span className="text-[13px] text-text-muted flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> 304 pages</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-3 tracking-tight drop-shadow-sm">{bookName}</h1>
            <p className="text-[16px] text-text-muted mb-4 font-medium">Rules for Focused Success in a Distracted World</p>
            
            <p className="text-[15px] leading-relaxed text-text-muted max-w-2xl font-light">
              Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time.
            </p>

            <div className="flex items-center gap-3 mt-8">
              <button 
                onClick={() => router.push(`/ai-workspace/${bookId}/new-chat`)}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-sm text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Start AI Conversation
              </button>
              <button className="flex items-center gap-2 bg-surface hover:bg-surface-hover border border-border text-text-muted hover:text-foreground px-5 py-2.5 rounded-sm text-sm font-medium transition-colors shadow-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                Add to Favorites
              </button>
            </div>
          </div>

          <Tabs.Root defaultValue="explore" className="w-full">
            <Tabs.List className="flex gap-8 border-b border-border mb-6">
              <Tabs.Trigger value="explore" className="pb-3 text-[15px] font-medium text-text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all outline-none">
                Explore Sections
              </Tabs.Trigger>
              <Tabs.Trigger value="actions" className="pb-3 text-[15px] font-medium text-text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all outline-none">
                Quick Actions
              </Tabs.Trigger>
              <Tabs.Trigger value="chats" className="pb-3 text-[15px] font-medium text-text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all outline-none">
                Recent Chats
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="explore" className="outline-none">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="text" placeholder="Search chapters, topics, or sections..." className="w-full pl-9 pr-4 py-2 text-[13px] rounded-sm bg-surface border border-border focus:border-primary focus:outline-none transition-all shadow-sm font-light" />
                </div>
                <div className="flex items-center gap-2 text-[13px] text-text-muted font-medium">
                  <button className="px-3 py-1.5 rounded-sm hover:bg-surface-hover transition-colors">Expand All</button>
                  <span className="text-border">|</span>
                  <button className="px-3 py-1.5 rounded-sm hover:bg-surface-hover transition-colors">Collapse All</button>
                </div>
              </div>

              <div className="flex flex-col border border-border rounded-sm bg-surface overflow-hidden shadow-sm">
                {chapters.map((chapter, i) => (
                  <div key={i} className={`p-4 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-surface-hover/30 transition-colors group ${i < chapters.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-[15px] font-semibold text-foreground/90">{chapter.title}</h3>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-background border border-border text-text-muted">12 pages</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {chapter.topics.map((topic, j) => (
                          <div key={j} className="flex items-center gap-1.5 text-[13px] text-text-muted font-light hover:text-foreground cursor-pointer transition-colors">
                            <span className="w-1 h-1 rounded-sm bg-border" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => router.push(`/ai-workspace/${bookId}/chat?topic=${encodeURIComponent(chapter.title)}`)}
                        className="text-[12px] font-medium text-text-muted hover:text-primary bg-background border border-border hover:border-primary/30 px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5"
                      >
                        <Book className="w-3.5 h-3.5" />
                        Summary
                      </button>
                      <button 
                        onClick={() => router.push(`/ai-workspace/${bookId}/chat?topic=${encodeURIComponent(chapter.title)}`)}
                        className="text-[12px] font-medium text-white bg-primary hover:bg-primary-hover px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="actions" className="outline-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "View Notes", desc: "Access all your saved notes and highlights.", icon: FileText },
                  { title: "Flashcards", desc: "Review key concepts with AI flashcards.", icon: Layers },
                  { title: "Summarize", desc: "Get a quick overview of the main thesis.", icon: Book },
                  { title: "Quiz Me", desc: "Test my knowledge on key concepts.", icon: Brain }
                ].map((action, i) => (
                  <button key={i} className="text-left p-6 rounded-sm border border-border bg-surface hover:bg-surface-hover hover:border-primary/40 transition-all shadow-sm group">
                    <action.icon className="w-6 h-6 text-primary mb-4" />
                    <p className="text-[15px] font-semibold text-foreground/90 mb-1 group-hover:text-primary transition-colors">{action.title}</p>
                    <p className="text-[13px] text-text-muted font-light">{action.desc}</p>
                  </button>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="chats" className="outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentChats.map((chat, i) => (
                  <button 
                    key={i}
                    onClick={() => router.push(`/ai-workspace/${bookId}/${chat.id}`)}
                    className="w-full text-left p-4 rounded-sm border border-border bg-surface hover:bg-surface-hover transition-colors group flex items-start gap-4 shadow-sm"
                  >
                    <div className="mt-0.5 p-2 rounded-sm bg-primary/10 text-primary">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">{chat.title}</p>
                      <p className="text-[13px] text-text-muted font-light">{chat.time}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-[280px] shrink-0 space-y-6">
          {/* Book Cover */}
          <div className="w-full aspect-square rounded-sm bg-gradient-to-br from-primary/80 to-primary shadow-lg flex items-center justify-center border border-primary/20 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <BookOpen className="w-24 h-24 text-white opacity-50" />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
              <p className="text-xs font-medium uppercase tracking-wider opacity-80">Cal Newport</p>
            </div>
          </div>

          {/* Reading Stats with Progress */}
          <section className="bg-surface border border-border rounded-sm p-6 shadow-sm">
            <h2 className="text-[15px] font-semibold text-foreground mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 text-text-muted" />
              Workspace Stats
            </h2>
            
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[13px] text-text-muted font-medium">Overall Progress</span>
                <span className="text-xl font-semibold text-foreground">67%</span>
              </div>
              <div className="w-full h-2 rounded-sm bg-surface-hover overflow-hidden">
                <div className="h-full bg-success rounded-sm" style={{ width: '67%' }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-[13px] text-text-muted">Pages Indexed</span>
                <span className="text-[13px] font-semibold text-foreground">847</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-[13px] text-text-muted">Total Chats</span>
                <span className="text-[13px] font-semibold text-foreground">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-text-muted">Highlights Extracted</span>
                <span className="text-[13px] font-semibold text-foreground">34</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
