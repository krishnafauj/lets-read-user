"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ArrowLeft } from "lucide-react";
import { GlobalSearchBox } from "@/components/layout/GlobalSearchBox";
import Link from "next/link";

export const SearchHeader = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  return (
    <div className="w-full mb-6 mt-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <Link 
            href="/discover" 
            className="w-10 h-10 rounded-sm bg-surface-hover/50 hover:bg-surface-hover flex items-center justify-center text-text-muted hover:text-foreground transition-all active:scale-95"
            title="Back to Discover"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-semibold text-foreground">
            Search Results
          </h1>
        </div>
        <p className="text-sm text-text-muted">
          Showing results for <span className="text-primary font-semibold">"{queryParam}"</span>
        </p>
      </div>
    </div>
  );
};
