"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { containerVariants, itemVariants } from "@/features/for-you/utils/animations";
import { 
  Card1Monsters, Card2SciFi, Card3Quote, Card4Banner, 
  Card5Fantasy, Card6Goosebumps, Card7HarryPotter, Card8Author 
} from "@/features/for-you/components/ForYouCards";
import { 
  BrowseAuthorsWidget, CategoriesWidget, RecentSearchWidget, MenuWidget 
} from "@/features/for-you/components/ForYouSidebar";

export default function ForYouPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background pt-6 pb-20 px-4 md:px-8 flex justify-center selection:bg-primary/30">
      <motion.div 
        className="w-full max-w-[1200px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main CSS Grid layout mimicking the provided masonry bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
          
          {/* Column 1 */}
          <motion.div variants={itemVariants} className="md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2 min-h-[320px]">
            <Card1Monsters />
          </motion.div>
          
          {/* Columns 2 & 3 - Banner */}
          <motion.div variants={itemVariants} className="md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-1 min-h-[150px]">
            <Card4Banner />
          </motion.div>
          
          {/* Column 4 - Sidebar wrapper */}
          <motion.div variants={itemVariants} className="md:col-start-4 md:col-span-1 md:row-start-1 md:row-span-5 flex flex-col gap-4">
            {/* Search Bar Widget */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search authors, books..."
                className="w-full bg-surface-hover border border-border rounded-full py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground placeholder:text-text-muted shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            </div>

            <BrowseAuthorsWidget />
            <CategoriesWidget />
            <RecentSearchWidget />
            <MenuWidget />
          </motion.div>

          {/* Column 2 - Fantasy */}
          <motion.div variants={itemVariants} className="md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-1 min-h-[150px]">
            <Card5Fantasy />
          </motion.div>

          {/* Column 3 - Goosebumps */}
          <motion.div variants={itemVariants} className="md:col-start-3 md:col-span-1 md:row-start-2 md:row-span-2 min-h-[320px]">
            <Card6Goosebumps />
          </motion.div>

          {/* Column 1 - Sci Fi */}
          <motion.div variants={itemVariants} className="md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-1 min-h-[150px]">
            <Card2SciFi />
          </motion.div>

          {/* Column 2 - Harry Potter */}
          <motion.div variants={itemVariants} className="md:col-start-2 md:col-span-1 md:row-start-3 md:row-span-2 min-h-[320px]">
            <Card7HarryPotter />
          </motion.div>

          {/* Column 1 - Quote */}
          <motion.div variants={itemVariants} className="md:col-start-1 md:col-span-1 md:row-start-4 md:row-span-1 min-h-[150px]">
            <Card3Quote />
          </motion.div>

          {/* Column 3 - Author Karen William */}
          <motion.div variants={itemVariants} className="md:col-start-3 md:col-span-1 md:row-start-4 md:row-span-1 min-h-[150px]">
            <Card8Author />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
