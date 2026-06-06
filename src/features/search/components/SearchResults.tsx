"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Plus, Bookmark } from "lucide-react";
import { fadeUp, containerStagger, hoverScale } from "@/features/discover/utils/animations";

interface SearchResultsProps {
  activeTab: string;
}

export const SearchResults = ({ activeTab }: SearchResultsProps) => {
  return (
    <motion.div 
      key={activeTab}
      variants={containerStagger}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {activeTab === "books" && <BooksResults />}
      {activeTab === "authors" && <AuthorsResults />}
      {activeTab === "genres" && <CollectionsResults />}
    </motion.div>
  );
};

const BooksResults = () => {
  const books = [
    { title: "Dune", author: "Frank Herbert", rating: 4.8, img: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=400&fit=crop" },
    { title: "Project Hail Mary", author: "Andy Weir", rating: 4.9, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&fit=crop" },
    { title: "Dark Matter", author: "Blake Crouch", rating: 4.7, img: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=400&fit=crop" },
    { title: "1984", author: "George Orwell", rating: 4.8, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&fit=crop" },
    { title: "The Midnight Library", author: "Matt Haig", rating: 4.5, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&fit=crop" },
    { title: "Neuromancer", author: "William Gibson", rating: 4.3, img: "https://images.unsplash.com/photo-1629196914225-83e851a7fb85?q=80&w=400&fit=crop" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book, i) => (
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
  );
};

const AuthorsResults = () => {
  const authors = [
    { name: "George R.R. Martin", role: "Epic Fantasy", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop" },
    { name: "J.K. Rowling", role: "Fantasy Master", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&fit=crop" },
    { name: "Stephen King", role: "Horror Legend", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop" },
    { name: "Agatha Christie", role: "Mystery Queen", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {authors.map((author, i) => (
        <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-sm bg-surface border border-border hover:border-primary/30 transition-colors group cursor-pointer shadow-sm hover:shadow-md">
          <div className="relative w-20 h-20 rounded-sm overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
            <Image src={author.img} alt={author.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{author.name}</h3>
            <p className="text-sm text-text-muted mb-2">{author.role}</p>
            <button className="text-xs font-semibold px-4 py-1.5 rounded-sm bg-surface-hover text-foreground border border-border group-hover:bg-primary group-hover:text-white transition-colors">
              Follow Author
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const CollectionsResults = () => {
  const collections = [
    { title: "Dystopian Worlds", books: 12 },
    { title: "Hard Sci-Fi Masterpieces", books: 8 },
    { title: "Award Winning Fantasy", books: 24 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {collections.map((col, i) => (
        <motion.div key={i} variants={fadeUp} className="p-6 rounded-sm bg-gradient-to-br from-surface to-surface-hover border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <Bookmark size={20} />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{col.title}</h3>
          <p className="text-sm text-text-muted">{col.books} Books in collection</p>
        </motion.div>
      ))}
    </div>
  );
};
