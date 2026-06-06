"use client";

import { use } from 'react';
import { ChatArea } from '@/features/ai-workspace/components/ChatArea';
import { BookEmptyChatArea } from '@/features/ai-workspace/components/BookEmptyChatArea';
import { ChatLayout } from '@/features/ai-workspace/components/ChatLayout';

export default function AIChatPage({ params }: { params: Promise<{ id: string, chatId: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <ChatLayout bookId={resolvedParams.id}>
      {resolvedParams.chatId === 'new-chat' ? <BookEmptyChatArea /> : <ChatArea />}
    </ChatLayout>
  );
}
