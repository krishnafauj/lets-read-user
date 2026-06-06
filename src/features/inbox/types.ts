export type FilterTab = "all" | "learning" | "updates" | "achievements";

export interface Notification {
  id: number;
  type: FilterTab;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
}
