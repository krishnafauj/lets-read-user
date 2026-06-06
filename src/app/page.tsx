"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ChevronRight, Bookmark, BookOpen, Settings2, Info } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Mock Data ─────────────────────────────────────────────────────────────

const recommendedBooks = [
  { 
    id: 1, 
    title: "The Psychology of Money", 
    author: "Morgan Housel", 
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop", 
    color: "bg-emerald-800/90",
    rating: 4.8
  },
  { 
    id: 2, 
    title: "How Innovation Works", 
    author: "Matt Ridley", 
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop", 
    color: "bg-[#FFDE68]",
    rating: 4.5
  },
  { 
    id: 3, 
    title: "Company of One", 
    author: "Paul Jarvis", 
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop", 
    color: "bg-[#F4F4F4]",
    rating: 4.8
  },
  { 
    id: 4, 
    title: "Stupore E Tremori", 
    author: "Amelie Nothomb", 
    cover: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80&w=400&auto=format&fit=crop", 
    color: "bg-orange-900/90",
    rating: 4.2
  },
  { 
    id: 5, 
    title: "Deep Work", 
    author: "Cal Newport", 
    cover: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=400&auto=format&fit=crop", 
    color: "bg-blue-800/90",
    rating: 4.7
  },
  { 
    id: 6, 
    title: "Atomic Habits", 
    author: "James Clear", 
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop", 
    color: "bg-yellow-600/90",
    rating: 4.9
  },
  { 
    id: 7, 
    title: "The Lean Startup", 
    author: "Eric Ries", 
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop", 
    color: "bg-cyan-800/90",
    rating: 4.6
  },
  { 
    id: 8, 
    title: "Zero to One", 
    author: "Peter Thiel", 
    cover: "https://images.unsplash.com/photo-1629196914225-83e851a7fb85?q=80&w=400&auto=format&fit=crop", 
    color: "bg-red-800/90",
    rating: 4.7
  }
];

const continueStudyingData = {
  id: 999,
  title: "The Psychology of Money",
  author: "Morgan Housel",
  chapter: "Chapter 4: Confounding Compounding",
  progress: 68,
  cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
  color: "bg-emerald-800/90",
  rating: 4.8
};

const categories = ["All", "Sci-Fi", "Fantasy", "Drama", "Business", "Education", "Geography"];

const categoryBooks = [
  { 
    id: 101, 
    title: "The Bees", 
    author: "Laline Paull", 
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop", 
    rating: 4.5,
    featured: false
  },
  { 
    id: 102, 
    title: "Real Help", 
    author: "Ayodeji Awosika", 
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400&auto=format&fit=crop", 
    rating: 4.2,
    featured: false
  },
  { 
    id: 103, 
    title: "The Fact of a Body", 
    author: "A. Marzano-Lesnevich", 
    cover: "https://images.unsplash.com/photo-1629196914225-83e851a7fb85?q=80&w=400&auto=format&fit=crop", 
    rating: 4.8,
    featured: true
  },
  { 
    id: 104, 
    title: "The Room", 
    author: "Jonas Karlsson", 
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=400&auto=format&fit=crop", 
    rating: 4.1,
    featured: false
  },
  { 
    id: 105, 
    title: "Through the Breaking", 
    author: "Cate Emond", 
    cover: "https://images.unsplash.com/photo-1507738978512-35584566f120?q=80&w=400&auto=format&fit=crop", 
    rating: 4.6,
    featured: false
  }
];

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  
  // By default, no book is selected. The panel is hidden.
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const handleOpenBook = (book: any) => {
    setSelectedBook(book);
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
  };

  return (
    <div className="relative flex h-[calc(100vh-80px)] overflow-hidden bg-background w-full">
      
      {/* ─── LEFT MAIN CONTENT ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col px-8 py-6 h-full overflow-y-auto w-full transition-all duration-300 scrollbar-hide">
        
        {/* Continue Studying Section */}
        <section className="flex flex-col shrink-0 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            Continue Studying
          </h2>
          <div 
            className="relative flex items-center gap-6 bg-gradient-to-r from-surface to-surface-hover/30 border border-border p-5 rounded-3xl cursor-pointer group hover:shadow-xl hover:border-primary/30 transition-all duration-500 overflow-hidden" 
            onClick={() => router.push(`/read/${continueStudyingData.id}`)}
          >
            {/* Background decorative glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>

            {/* Book Cover */}
            <div className={`relative w-24 h-32 rounded-xl shadow-lg shadow-black/20 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500 ${continueStudyingData.color} shrink-0`}>
              <Image src={continueStudyingData.cover} alt={continueStudyingData.title} fill className="object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 z-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">Currently Reading</span>
              </div>
              <h3 className="font-bold text-[22px] text-foreground truncate group-hover:text-primary transition-colors duration-300">
                {continueStudyingData.title}
              </h3>
              <p className="text-sm text-text-muted mt-1 truncate max-w-lg">
                {continueStudyingData.chapter}
              </p>
              
              {/* Elevated Progress Bar */}
              <div className="flex items-center gap-4 mt-5 w-full max-w-md">
                <div className="flex-1 h-2 bg-surface border border-border/50 rounded-full overflow-hidden shadow-inner relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${continueStudyingData.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full relative"
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent"></div>
                  </motion.div>
                </div>
                <span className="text-xs font-bold text-foreground bg-surface px-2.5 py-1 rounded-md border border-border shadow-sm">
                  {continueStudyingData.progress}%
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="shrink-0 z-10 mr-2 flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); handleOpenBook(continueStudyingData); }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors shadow-sm"
                title="View details"
              >
                <Info size={18} />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105">
                Resume
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </section>
        
        {/* Recommended Section */}
        <section className="flex flex-col shrink-0 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Recommended</h2>
            <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
              See All <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide shrink-0 items-center">
            {recommendedBooks.map((book) => (
              <motion.div 
                key={book.id}
                whileHover={{ y: -4 }}
                onClick={() => router.push(`/read/${book.id}`)}
                className="flex-shrink-0 w-[140px] group cursor-pointer"
              >
                <div className="relative w-full aspect-[2/3] max-h-[190px] rounded-xl overflow-hidden mb-2 shadow-sm bg-surface-hover">
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <Image src={book.cover} alt={book.title} fill className="object-cover transform group-hover:scale-[1.03] transition-transform duration-300" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleOpenBook(book); }}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                  >
                    <Info size={14} />
                  </button>
                </div>
                <h3 className="font-bold text-sm text-foreground truncate">{book.title}</h3>
                <p className="text-[11px] text-text-muted mt-0.5 truncate">{book.author}</p>
              </motion.div>
            ))}

            {/* See All Card at the end */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-[140px] h-[190px] flex flex-col items-center justify-center cursor-pointer group mb-2 ml-1 rounded-xl border-2 border-dashed border-border hover:border-primary transition-colors bg-surface-hover/30 hover:bg-primary/5 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300 shadow-sm">
                <ChevronRight className="text-text-muted group-hover:text-white transition-colors w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-foreground mt-3 group-hover:text-primary transition-colors">See All</span>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="flex flex-col mt-4">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <h2 className="text-lg font-bold text-foreground">Categories</h2>
            <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <Settings2 size={16} />
            </button>
          </div>
          
          {/* Pill filters */}
          <div className="flex gap-2.5 mb-4 overflow-x-auto scrollbar-hide pb-1 shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "bg-surface-hover text-text-muted hover:bg-border/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 pb-20">
            {categoryBooks.map((book) => (
              <motion.div 
                key={book.id} 
                whileHover={{ y: -4 }}
                onClick={() => router.push(`/read/${book.id}`)}
                className="group cursor-pointer relative"
              >
                {/* Image Container */}
                <div className={`relative w-full aspect-[2/3] max-h-[170px] rounded-xl overflow-hidden mb-2 shadow-sm ${book.featured ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
                  <Image src={book.cover} alt={book.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleOpenBook(book); }}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
                  >
                    <Info size={14} />
                  </button>

                  {book.featured && (
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> {book.rating}
                    </div>
                  )}
                  {book.featured && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full shadow-lg">
                      <Bookmark size={10} fill="currentColor" />
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <h3 className="font-bold text-sm text-foreground truncate">{book.title}</h3>
                <p className="text-[11px] text-text-muted mt-0.5 truncate">{book.author}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>

      {/* ─── OVERLAY PANEL (Featured Book) ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div 
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-4 bottom-4 right-0 w-[360px] bg-[#203233] text-white flex flex-col rounded-l-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.15)] z-50 overflow-hidden"
          >
            
            {/* Close Button */}
            <button 
              onClick={handleCloseBook}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full p-1.5 z-10 hover:bg-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <div className="p-6 pt-12 flex flex-col items-center h-full justify-between">
              
              <div className="flex flex-col items-center w-full">
                {/* Large Featured Cover */}
                <motion.div 
                  key={selectedBook.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-40 aspect-[2/3] bg-white rounded-md shadow-2xl mb-5 relative overflow-hidden"
                >
                  <img 
                    src={selectedBook.cover} 
                    alt={selectedBook.title} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Title & Author */}
                <h2 className="text-xl font-bold mb-1 text-center truncate w-full px-4">{selectedBook.title}</h2>
                <p className="text-sm text-white/60 mb-4 text-center">{selectedBook.author}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-5 text-yellow-400">
                  {[...Array(4)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  <div className="relative">
                    <Star size={16} fill="currentColor" className="opacity-40" />
                    <div className="absolute inset-0 overflow-hidden w-[80%]">
                       <Star size={16} fill="currentColor" />
                    </div>
                  </div>
                  <span className="text-white text-sm font-bold ml-2">{selectedBook.rating || "4.8"}</span>
                </div>

                {/* Stats Row */}
                <div className="flex justify-between w-full px-4 mb-5">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">320</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Pages</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">643</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Ratings</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">110</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">Reviews</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-white/60 leading-relaxed text-center max-w-[280px]">
                  {selectedBook.title} offers a refreshingly original story that's focused on a commitment to greatness. Explore the depths of imagination and meaningful pleasures in life as you dive into this incredible book.
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => router.push(`/read/${selectedBook.id}`)}
                className="w-full bg-[#00BEAA] hover:bg-[#007F78] transition-colors text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#00BEAA]/20 shrink-0 mt-3"
              >
                Read Now
                <BookOpen size={18} />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
