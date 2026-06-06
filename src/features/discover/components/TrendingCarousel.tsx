"use client";

import { motion } from "framer-motion";
import { Star, ChevronRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import { fadeUp, hoverScale } from "../utils/animations";

const TRENDING_BOOKS = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    color: "from-blue-900 to-indigo-900"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=400&auto=format&fit=crop",
    color: "from-amber-900 to-orange-900"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop",
    color: "from-zinc-900 to-stone-900"
  },
  {
    title: "Dark Matter",
    author: "Blake Crouch",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=400&auto=format&fit=crop",
    color: "from-emerald-900 to-teal-900"
  },
  {
    title: "1984",
    author: "George Orwell",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
    color: "from-red-900 to-rose-900"
  }
];

export const TrendingCarousel = () => {
  return (
    <motion.section variants={fadeUp} className="mb-16 w-full">
      <div className="flex items-end justify-between mb-8 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <TrendingUp size={20} />
            <span className="uppercase tracking-wider text-xs">Trending Now</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Readers' Top Picks</h2>
        </div>
        <button className="hidden sm:flex items-center gap-1 text-sm font-semibold text-text-muted hover:text-primary transition-colors">
          View all <ChevronRight size={16} />
        </button>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="flex overflow-x-auto gap-6 pb-8 pt-4 px-2 -mx-2 snap-x snap-mandatory scrollbar-hide">
        {TRENDING_BOOKS.map((book, idx) => (
          <motion.div 
            key={idx}
            variants={hoverScale}
            initial="rest"
            whileHover="hover"
            className="relative min-w-[240px] md:min-w-[280px] h-[400px] rounded-3xl overflow-hidden group snap-start shrink-0 cursor-pointer shadow-lg border border-border"
          >
            {/* Background Gradient Fallback */}
            <div className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-80`} />
            
            <Image 
              src={book.img} 
              alt={book.title} 
              fill 
              className="object-cover opacity-60 mix-blend-overlay group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="self-end bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 text-yellow-400 text-xs font-bold shadow-xl transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Star size={12} fill="currentColor" /> {book.rating}
              </div>
              
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{book.title}</h3>
                <p className="text-sm font-medium text-white/60 mb-4">{book.author}</p>
                <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-primary text-white text-sm font-bold backdrop-blur-md border border-white/20 transition-colors opacity-0 group-hover:opacity-100 duration-300">
                  Read Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
