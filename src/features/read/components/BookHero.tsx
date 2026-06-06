"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  FileText, 
  Star, 
  Volume2, 
  Heart, 
  Share2, 
  Bookmark, 
  Eye,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface BookHeroProps {
  book: {
    title: string;
    subtitle: string;
    author: string;
    authorAvatar: string;
    cover: string;
    releaseDate: string;
    pages: number;
    chapters: number;
    rating: number;
    categories: string[];
    isPremium?: boolean;
    stats: {
      likes: number;
      shares: number;
      bookmarks: number;
      views: string;
    }
  };
}

export function BookHeroDetails({ book }: BookHeroProps) {
  return (
    <div className="mb-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-foreground transition-colors mb-6 group bg-surface-hover/50 px-3 py-1.5 rounded-full border border-border">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> 
          Back to Home
        </Link>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full overflow-hidden relative">
            <Image src={book.authorAvatar} alt={book.author} fill className="object-cover" />
          </div>
          <span className="font-semibold text-foreground text-lg">{book.author}</span>
          <button className="text-xs font-semibold px-3 py-1 rounded-full border border-border text-foreground hover:bg-surface-hover transition-colors">
            A+ Follow
          </button>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">
          {book.title}
        </h1>
        <p className="text-xl text-text-muted mb-8 leading-relaxed">
          {book.subtitle}
        </p>

        {/* Meta Info Grid */}
        <div className="flex flex-wrap gap-8 mb-8 border-y border-border py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center text-text-muted">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Release Date</p>
              <p className="font-semibold text-sm text-foreground">{book.releaseDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center text-text-muted">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Pages</p>
              <p className="font-semibold text-sm text-foreground">{book.chapters} Chapters, {book.pages} pages</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center text-text-muted">
              <Star size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Review</p>
              <p className="font-semibold text-sm text-foreground">{book.rating}</p>
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="flex items-center gap-4 mb-8">
          <button className="bg-[#4B3B2B] hover:bg-[#3A2D20] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:shadow-lg active:scale-95 flex-1 max-w-[280px]">
            Continue Reading (Chapter 2)
          </button>
          <button className="w-12 h-12 rounded-xl bg-[#F4A261] text-white flex items-center justify-center hover:bg-[#E76F51] transition-colors shadow-md active:scale-95">
            <Volume2 size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {book.categories.map((cat, i) => (
            <span key={i} className="px-4 py-1.5 rounded-full bg-surface-hover border border-border text-xs font-semibold text-text-muted hover:text-foreground transition-colors cursor-pointer">
              {cat}
            </span>
          ))}
        </div>
      </div>
  );
}

export function BookHeroCover({ book }: BookHeroProps) {
  return (
    <div className="w-full shrink-0 flex flex-col items-center">
        {/* Large Cover */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full aspect-[2/3] relative rounded-2xl shadow-2xl overflow-hidden mb-6"
        >
          <Image src={book.cover} alt={book.title} fill className="object-cover" />
          {book.isPremium && (
            <div className="absolute top-4 right-0 bg-[#F4A261] text-black font-bold text-xs px-4 py-2 rounded-l-lg shadow-md flex items-center gap-1">
              <Star size={12} fill="currentColor" /> Premium
            </div>
          )}
        </motion.div>

        {/* Action Row */}
        <div className="flex justify-between items-center w-full px-6 py-4 bg-surface rounded-2xl border border-border shadow-sm">
          <button className="flex flex-col items-center gap-1 text-text-muted hover:text-red-500 transition-colors group">
            <Heart size={20} className="group-hover:fill-red-500" />
            <span className="text-xs font-bold text-foreground">{book.stats.likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-text-muted hover:text-primary transition-colors">
            <Share2 size={20} />
            <span className="text-xs font-bold text-foreground">{book.stats.shares}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-text-muted hover:text-primary transition-colors group">
            <Bookmark size={20} className="group-hover:fill-primary" />
            <span className="text-xs font-bold text-foreground">{book.stats.bookmarks}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-text-muted hover:text-primary transition-colors">
            <Eye size={20} />
            <span className="text-xs font-bold text-foreground">{book.stats.views}</span>
          </button>
        </div>
      </div>
  );
}
