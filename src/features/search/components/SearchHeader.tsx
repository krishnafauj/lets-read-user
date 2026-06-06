"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { GlobalSearchBox } from "@/components/layout/GlobalSearchBox";

export const SearchHeader = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  return (
    <div className="w-full mb-6 mt-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search Results
        </h1>
        <p className="text-sm text-text-muted">
          Showing results for <span className="text-primary font-semibold">"{queryParam}"</span>
        </p>
      </div>
    </div>
  );
};
