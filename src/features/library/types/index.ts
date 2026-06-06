export type Tab = "all" | "books" | "favorites" | "owned" | "rented" | "ai-workspace" | "wishlist" | "notes" | "highlights" | "downloads";
export type ViewMode = "grid" | "list";

export interface LibraryItem {
  id: number;
  type: "book" | "note" | "highlight" | "download" | "ai-workspace";
  title: string;
  author?: string;
  space: string;
  spaceColor: string;
  date: string;
  progress?: number;
  starred: boolean;
  emoji: string;
  coverImage?: string;
  excerpt?: string;
  readTime?: string;
  ownership?: "owned" | "rented" | "wishlist";
}
