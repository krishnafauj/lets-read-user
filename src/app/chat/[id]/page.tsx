import { use } from 'react';
import { ChatLayout } from '@/features/chat/components/ChatLayout';
import { ChatArea } from '@/features/chat/components/ChatArea';

export default function GlobalChatPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <ChatLayout>
      <ChatArea />
    </ChatLayout>
  );
}
