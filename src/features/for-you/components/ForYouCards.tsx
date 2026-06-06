"use client";

import { motion } from "framer-motion";
import { Star, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { cardHover } from "../utils/animations";

export const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white/90 border border-white/10 ${className}`}>
    {children}
  </span>
);

export const AddButton = () => (
  <button className="flex items-center gap-1 bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg shadow-black/20">
    <Plus size={14} /> Add
  </button>
);

export const Card1Monsters = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl overflow-hidden group">
    <div className="absolute inset-0 bg-[#3E3120] mix-blend-multiply" />
    <Image 
      src="https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=600&auto=format&fit=crop" 
      alt="Monsters background" 
      fill 
      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#251A0F] via-[#251A0F]/60 to-transparent" />
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <Badge className="mb-4 w-fit bg-white/10 text-white/80">Recommendation</Badge>
      <h2 className="text-2xl font-bold text-white mb-2 leading-tight">The Monsters and Creatures Compendium</h2>
      <p className="text-sm text-white/60">Discover the terrifying monsters and fascinating beasts of Dungeons & Dragons.</p>
    </div>
  </motion.div>
);

export const Card2SciFi = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl overflow-hidden group">
    <Image 
      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" 
      alt="Science Fiction" 
      fill 
      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#151714] via-[#151714]/40 to-transparent" />
    <div className="absolute inset-0 p-5 flex flex-col justify-between">
      <div className="flex justify-start">
        <Badge className="bg-black/40 border-none text-white/80">Genre</Badge>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Science Fiction</h3>
        <div className="flex items-end justify-between gap-2">
          <p className="text-xs text-white/60 flex-1">Explores futuristic worlds shaped by science and imagination.</p>
          <AddButton />
        </div>
      </div>
    </div>
  </motion.div>
);

export const Card3Quote = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center overflow-hidden bg-primary bg-gradient-to-br from-primary to-[#007F78] shadow-lg">
    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4 border border-white/10 shadow-sm">
      <span className="text-2xl font-serif text-white -mt-2">"</span>
    </div>
    <p className="text-sm font-medium text-white/90 leading-relaxed mb-4 font-serif italic">
      "A compelling book that stays with you long after the last page. Clear writing, strong message, and deeply enjoyable."
    </p>
    <div className="flex gap-1 text-yellow-400">
      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
    </div>
  </motion.div>
);

export const Card4Banner = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl overflow-hidden bg-surface-hover p-6 md:p-8 flex items-center justify-between group shadow-sm border border-border">
    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
    <div className="relative z-10 max-w-[60%]">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight tracking-tight">Best of crime and mystery books.</h2>
      <p className="text-sm text-text-muted mb-6 max-w-sm">A gripping collection of the finest crime and mystery stories, filled with twists.</p>
      <button className="flex items-center gap-3 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors shadow-md shadow-primary/20">
        Explore Books
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
          <ChevronRight size={14} />
        </div>
      </button>
    </div>
    {/* Decorative abstract books on the right */}
    <div className="absolute right-[-5%] top-[10%] bottom-[10%] w-[45%] flex items-center justify-center gap-2 transform group-hover:scale-105 transition-transform duration-700">
      <div className="w-1/3 h-[90%] bg-zinc-800 rounded-md shadow-2xl rotate-[-10deg] overflow-hidden border border-white/10 relative">
        <Image src="https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80&w=200&auto=format&fit=crop" fill className="object-cover opacity-70" alt="book cover" />
      </div>
      <div className="w-1/3 h-[100%] bg-zinc-700 rounded-md shadow-2xl z-10 overflow-hidden border border-white/10 relative">
        <Image src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop" fill className="object-cover opacity-80" alt="book cover" />
        <div className="absolute inset-0 bg-yellow-500/20 mix-blend-overlay" />
      </div>
      <div className="w-1/3 h-[90%] bg-zinc-800 rounded-md shadow-2xl rotate-[10deg] overflow-hidden border border-white/10 relative">
        <Image src="https://images.unsplash.com/photo-1629196914225-83e851a7fb85?q=80&w=200&auto=format&fit=crop" fill className="object-cover opacity-70" alt="book cover" />
        <div className="absolute inset-0 bg-red-600/30 mix-blend-overlay" />
      </div>
    </div>
  </motion.div>
);

export const Card5Fantasy = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl overflow-hidden group">
    <Image 
      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop" 
      alt="Fantasy" 
      fill 
      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#131A26] via-[#131A26]/40 to-transparent" />
    <div className="absolute inset-0 p-5 flex flex-col justify-between">
      <div className="flex justify-start">
        <Badge className="bg-black/30 border-none text-white/80">Genre</Badge>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Fantasy</h3>
        <div className="flex items-end justify-between gap-2">
          <p className="text-xs text-white/60 flex-1">Explores magical worlds, mythical creatures, and adventures.</p>
          <AddButton />
        </div>
      </div>
    </div>
  </motion.div>
);

export const Card6Goosebumps = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl overflow-hidden group bg-[#2A3129]">
    <div className="absolute inset-0 h-2/3">
      <Image 
        src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=600&auto=format&fit=crop" 
        alt="Goosebumps" 
        fill 
        className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A3129] via-transparent to-transparent" />
    </div>
    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end bg-gradient-to-t from-[#2A3129] via-[#2A3129] to-transparent pt-20">
      <Badge className="mb-3 w-fit bg-white/5 border-white/10 text-white/70">Halloween Pick</Badge>
      <h3 className="text-2xl font-bold text-white mb-1 leading-tight">Goosebumps: The Werewolf of fever swamp</h3>
      <p className="text-xs font-semibold text-white/50 mb-3 tracking-wider uppercase">R.L Stine</p>
      <p className="text-xs text-white/50 leading-relaxed">A creepy and fun adventure with just the right amount of mystery and chills. Classic Goosebumps at its best.</p>
    </div>
  </motion.div>
);

export const Card7HarryPotter = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl overflow-hidden group bg-[#112328]">
    <div className="absolute inset-0 h-[70%]">
      <Image 
        src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop" 
        alt="Harry Potter" 
        fill 
        className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#112328] via-transparent to-transparent" />
    </div>
    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end bg-gradient-to-t from-[#112328] via-[#112328] to-transparent pt-24">
      <Badge className="mb-3 w-fit bg-white/5 border-white/10 text-white/70">Recommendation</Badge>
      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Harry Potter and the Prisoner of Azkaban</h3>
      <p className="text-xs text-white/50 leading-relaxed">Follows Harry's third year at Hogwarts, where he uncovers the truth about Sirius Black.</p>
    </div>
  </motion.div>
);

export const Card8Author = () => (
  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative w-full h-full rounded-3xl overflow-hidden group">
    <Image 
      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" 
      alt="Karen William" 
      fill 
      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#362111] via-[#362111]/40 to-transparent" />
    <div className="absolute inset-0 p-5 flex flex-col justify-end">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Karen William</h3>
          <p className="text-xs text-white/60">450 Books</p>
        </div>
        <AddButton />
      </div>
    </div>
  </motion.div>
);
