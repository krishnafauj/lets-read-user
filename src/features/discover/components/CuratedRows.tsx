"use client";

import { motion } from "framer-motion";
import { ChevronRight, Bookmark } from "lucide-react";
import Image from "next/image";
import { fadeUp, hoverScale } from "../utils/animations";

const COLLECTIONS = [
  {
    title: "Award Winners 2026",
    subtitle: "Critically acclaimed masterpieces",
    books: [
      "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-ba773f089eca?q=80&w=200&auto=format&fit=crop"
    ]
  },
  {
    title: "Because you read 1984",
    subtitle: "Dystopian worlds & political thrillers",
    books: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=200&auto=format&fit=crop"
    ]
  }
];

export const CuratedRows = () => {
  return (
    <div className="flex flex-col gap-12 w-full mb-16">
      {COLLECTIONS.map((collection, idx) => (
        <motion.section key={idx} variants={fadeUp} className="w-full">
          <div className="flex items-end justify-between mb-6 px-2">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">{collection.title}</h2>
              <p className="text-sm text-text-muted">{collection.subtitle}</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-text-muted hover:text-primary transition-colors">
              Explore <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              variants={hoverScale}
              initial="rest"
              whileHover="hover"
              className="bg-surface-hover rounded-sm p-6 flex items-center justify-between group cursor-pointer border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex -space-x-6 group-hover:-space-x-2 transition-all duration-300 pl-2">
                {collection.books.map((img, i) => (
                  <div 
                    key={i} 
                    className="relative w-20 h-28 md:w-24 md:h-36 rounded-sm overflow-hidden border-2 border-surface-hover shadow-lg transform group-hover:-translate-y-2 hover:!translate-y-[-1rem] hover:!scale-110 hover:!z-50 hover:shadow-xl transition-all duration-300" 
                    style={{ transitionDelay: `${i * 30}ms`, zIndex: 10 - i }}
                  >
                    <Image src={img} alt="Book cover" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="w-10 h-10 rounded-sm bg-background flex items-center justify-center text-text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors shadow-sm border border-border">
                  <Bookmark size={16} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">View Collection</p>
                  <p className="text-xs text-text-muted">12 Books</p>
                </div>
              </div>
            </motion.div>

            {/* Placeholder for second collection item or promotional banner */}
            <motion.div 
              variants={hoverScale}
              initial="rest"
              whileHover="hover"
              className="bg-gradient-to-br from-primary/10 to-transparent rounded-sm p-6 flex flex-col justify-center items-center text-center group cursor-pointer border border-primary/20 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">Curate Your Own</h3>
              <p className="text-sm text-text-muted max-w-xs mb-4">Create public reading lists and share your favorite worlds with the community.</p>
              <button className="bg-background text-foreground text-sm font-semibold px-6 py-2 rounded-sm border border-border shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                Create List
              </button>
            </motion.div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};
