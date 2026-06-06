export interface LearningCard {
  id: number;
  title: string;
  author: string;
  progress: number;
  gradient: string;
  lastSession: string;
  emoji: string;
}

export interface SpaceCard {
  id: number;
  title: string;
  creator: string;
  conversations: number;
  mastery: number;
  emoji: string;
  borderGradient: string;
  tags: string[];
  isActive: boolean;
}

export interface Recommendation {
  id: number;
  title: string;
  author: string;
  reason: string;
  emoji: string;
  gradient: string;
  rating: number;
  tags: string[];
}

export interface StatCard {
  id: number;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  color: string;
}

export interface RecentChat {
  id: number;
  space: string;
  question: string;
  timestamp: string;
  emoji: string;
}
