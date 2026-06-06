import { use } from 'react';
import { BookDashboard } from '@/features/ai-workspace/components/BookDashboard';

export default function BookWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return <BookDashboard bookId={resolvedParams.id} />;
}
