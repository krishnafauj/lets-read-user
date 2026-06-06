"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { fadeUp, hoverScale } from "../utils/animations";

const AUTHORS = [
  { name: "J.K. Rowling", followers: "12.4M", role: "Fantasy Master", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  { name: "George R.R. Martin", followers: "8.1M", role: "Epic Fantasy", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
  { name: "Agatha Christie", followers: "5.2M", role: "Mystery Queen", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" },
  { name: "Stephen King", followers: "15M", role: "Horror Legend", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
  { name: "Jane Austen", followers: "3M", role: "Classic Romance", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" },
];

export const AuthorSpotlight = () => {
  return (
    <motion.section variants={fadeUp} className="mb-16 w-full">
      <div className="flex items-end justify-between mb-8 px-2">
        <h2 className="text-2xl font-semibold text-foreground">Author Spotlight</h2>
        <button className="flex items-center gap-1 text-sm font-semibold text-text-muted hover:text-primary transition-colors">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex overflow-x-auto gap-8 pb-8 pt-4 px-2 -mx-2 snap-x snap-mandatory scrollbar-hide">
        {AUTHORS.map((author, idx) => (
          <motion.div 
            key={idx}
            variants={hoverScale}
            initial="rest"
            whileHover="hover"
            className="flex flex-col items-center gap-4 group cursor-pointer snap-start shrink-0"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-sm p-1 bg-gradient-to-tr from-surface via-surface-hover to-border group-hover:from-primary group-hover:via-secondary group-hover:to-warning transition-colors duration-500 shadow-md">
              <div className="relative w-full h-full rounded-sm overflow-hidden border-4 border-background">
                <Image 
                  src={author.img} 
                  alt={author.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0" 
                />
              </div>
              
              {/* Follow button pill that appears on hover */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Follow
              </div>
            </div>
            
            <div className="text-center mt-2">
              <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{author.name}</h3>
              <p className="text-xs font-semibold text-text-muted">{author.role}</p>
              <p className="text-[10px] text-text-muted/70 mt-1">{author.followers} Followers</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
