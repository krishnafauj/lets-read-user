"use client";

import { motion } from "framer-motion";
import { fadeUp, hoverScale } from "../utils/animations";

import { useRouter } from "next/navigation";

const GENRES = [
  { name: "Science Fiction", count: "12K+", color: "bg-blue-500", icon: "🌌" },
  { name: "Fantasy & Magic", count: "8.5K+", color: "bg-purple-500", icon: "🔮" },
  { name: "Mystery & Thriller", count: "15K+", color: "bg-rose-500", icon: "🕵️‍♂️" },
  { name: "Romance", count: "20K+", color: "bg-pink-500", icon: "❤️" },
  { name: "Historical Fiction", count: "5K+", color: "bg-amber-600", icon: "🏛️" },
  { name: "Biography", count: "3.2K+", color: "bg-emerald-500", icon: "👤" },
  { name: "Philosophy", count: "1.8K+", color: "bg-indigo-500", icon: "🧠" },
  { name: "Self Development", count: "9K+", color: "bg-teal-500", icon: "🌱" },
];

export const GenreGrid = () => {
  const router = useRouter();

  return (
    <motion.section variants={fadeUp} className="mb-16 w-full">
      <h2 className="text-2xl font-semibold text-foreground mb-8">Explore by Genre</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {GENRES.map((genre, idx) => (
          <motion.div
            key={idx}
            variants={hoverScale}
            initial="rest"
            whileHover="hover"
            onClick={() => router.push(`/search?tab=books&genre=${encodeURIComponent(genre.name)}`)}
            className="relative overflow-hidden rounded-sm cursor-pointer group aspect-[4/3] border border-border shadow-sm"
          >
            {/* Colored Base */}
            <div className={`absolute inset-0 ${genre.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-hover/50" />
            
            {/* Content */}
            <div className="relative h-full p-5 flex flex-col justify-between z-10">
              <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110 origin-top-left">
                {genre.icon}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 leading-tight">{genre.name}</h3>
                <p className="text-xs font-semibold text-text-muted">{genre.count} books</p>
              </div>
            </div>
            
            {/* Decorative colored glow on hover */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${genre.color} rounded-full blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
