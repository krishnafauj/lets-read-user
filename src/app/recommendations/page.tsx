"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, ArrowLeft, Sparkles, BookOpen, Compass, Users } from "lucide-react";
import { fadeUp, containerStagger, hoverScale } from "@/features/discover/utils/animations";

export default function RecommendationsPage() {
  const [view, setView] = useState<"books" | "authors">("books");

  const sections = [
    {
      title: "Because you read Deep Work",
      icon: <Sparkles size={20} className="text-warning" />,
      books: [
        { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", rating: 4.8, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&fit=crop" },
        { title: "Atomic Habits", author: "James Clear", rating: 4.9, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&fit=crop" },
        { title: "The Power of Habit", author: "Charles Duhigg", rating: 4.7, img: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=400&fit=crop" },
        { title: "Flow", author: "Mihaly Csikszentmihalyi", rating: 4.6, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&fit=crop" },
      ]
    },
    {
      title: "Trending in Psychology",
      icon: <Compass size={20} className="text-primary" />,
      books: [
        { title: "The Psychology of Money", author: "Morgan Housel", rating: 4.8, img: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=400&fit=crop" },
        { title: "Quiet", author: "Susan Cain", rating: 4.5, img: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=400&fit=crop" },
        { title: "Predictably Irrational", author: "Dan Ariely", rating: 4.6, img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&fit=crop" },
        { title: "Blink", author: "Malcolm Gladwell", rating: 4.4, img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&fit=crop" },
      ]
    },
    {
      title: "Curated Masterpieces",
      icon: <BookOpen size={20} className="text-emerald-500" />,
      books: [
        { title: "Dune", author: "Frank Herbert", rating: 4.8, img: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=400&fit=crop" },
        { title: "Project Hail Mary", author: "Andy Weir", rating: 4.9, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&fit=crop" },
        { title: "Dark Matter", author: "Blake Crouch", rating: 4.7, img: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=400&fit=crop" },
        { title: "1984", author: "George Orwell", rating: 4.8, img: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=400&fit=crop" },
      ]
    }
  ];

  const authorSections = [
    {
      title: "Top Authors in Productivity",
      icon: <Sparkles size={20} className="text-warning" />,
      authors: [
        { name: "Cal Newport", role: "Productivity", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop" },
        { name: "James Clear", role: "Habit Building", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop" },
        { name: "Charles Duhigg", role: "Behavioral Psychology", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&fit=crop" },
        { name: "Nir Eyal", role: "Tech & Psychology", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop" },
      ]
    },
    {
      title: "Masters of Science Fiction",
      icon: <Compass size={20} className="text-primary" />,
      authors: [
        { name: "Andy Weir", role: "Hard Sci-Fi", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&fit=crop" },
        { name: "Frank Herbert", role: "Epic Sci-Fi", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop" },
        { name: "Isaac Asimov", role: "Classic Sci-Fi", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&fit=crop" },
        { name: "Arthur C. Clarke", role: "Visionary Sci-Fi", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&fit=crop" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-6 pb-24 px-6 md:px-10 lg:px-12 flex flex-col items-center">
      <motion.div 
        className="w-full max-w-7xl"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Modern Header & Toggle Section */}
        <div className="w-full mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative">
          {/* Subtle background glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10" />
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-5">
              <Link 
                href="/discover" 
                className="w-12 h-12 shrink-0 rounded-sm bg-surface/50 border border-border/50 hover:bg-surface hover:border-primary/30 flex items-center justify-center text-text-muted hover:text-foreground transition-all active:scale-95 shadow-sm backdrop-blur-md group"
                title="Back to Discover"
              >
                <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
              <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
                Recommended for You
              </h1>
            </div>
            <p className="text-[15px] text-text-muted max-w-xl leading-relaxed ml-[68px]">
              A highly curated feed of books and authors tailored precisely to your reading history, learning paths, and active spaces.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex gap-1.5 p-1.5 rounded-sm bg-surface/60 backdrop-blur-md border border-border/40 w-fit min-w-max shadow-sm relative z-10 ml-[68px] lg:ml-0">
            <button
              onClick={() => setView("books")}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 ${
                view === "books" ? "text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              {view === "books" && (
                <motion.div layoutId="recTab" className="absolute inset-0 rounded-sm bg-primary shadow-lg shadow-primary/20" />
              )}
              <span className="relative z-10 flex items-center gap-2"><BookOpen size={16} /> Books</span>
            </button>
            <button
              onClick={() => setView("authors")}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 ${
                view === "authors" ? "text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              {view === "authors" && (
                <motion.div layoutId="recTab" className="absolute inset-0 rounded-sm bg-primary shadow-lg shadow-primary/20" />
              )}
              <span className="relative z-10 flex items-center gap-2"><Users size={16} /> Authors</span>
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-12 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {view === "books" && (
              <motion.div 
                key="books"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-12"
              >
                {sections.map((section, idx) => (
                  <motion.section key={idx} variants={fadeUp} className="w-full">
                    <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-3">
                      {section.icon}
                      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                      {section.books.map((book, i) => (
                        <motion.div key={i} variants={hoverScale} initial="rest" whileHover="hover" className="group cursor-pointer">
                          <div className="relative aspect-[2/3] w-full rounded-sm overflow-hidden mb-3 border border-border shadow-sm group-hover:shadow-xl transition-shadow">
                            <Image src={book.img} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                              <button className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-sm shadow-lg flex items-center gap-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <Plus size={14} /> Add to Library
                              </button>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-foreground font-semibold text-sm md:text-base leading-tight mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
                            <p className="text-text-muted text-xs font-medium">{book.author}</p>
                            <div className="flex items-center gap-1 text-yellow-400 mt-1.5 text-[10px] font-semibold">
                              <Star size={10} fill="currentColor" /> {book.rating}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </motion.div>
            )}

            {view === "authors" && (
              <motion.div 
                key="authors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-12"
              >
                {authorSections.map((section, idx) => (
                  <motion.section key={idx} variants={fadeUp} className="w-full">
                    <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-3">
                      {section.icon}
                      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                      {section.authors.map((author, i) => (
                        <motion.div key={i} variants={fadeUp} className="flex flex-col items-center gap-4 p-6 rounded-sm bg-surface border border-border hover:border-primary/30 transition-colors group cursor-pointer shadow-sm hover:shadow-md text-center">
                          <div className="relative w-24 h-24 rounded-sm overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                            <Image src={author.img} alt={author.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{author.name}</h3>
                            <p className="text-sm text-text-muted mb-4">{author.role}</p>
                            <button className="text-xs font-semibold px-5 py-2 rounded-sm bg-surface-hover text-foreground border border-border group-hover:bg-primary group-hover:text-white transition-colors">
                              Follow Author
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
