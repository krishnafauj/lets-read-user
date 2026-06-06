import { use } from 'react';
import { ChatArea } from '@/features/ai-workspace/components/ChatArea';
import { ChatLayout } from '@/features/ai-workspace/components/ChatLayout';

export default function BookChatPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <ChatLayout bookId={resolvedParams.id}>
      <ChatArea />
    </ChatLayout>
  );
}
