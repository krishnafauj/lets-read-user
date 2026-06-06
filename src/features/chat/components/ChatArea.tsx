"use client";

import React, { useRef, useEffect } from 'react';
import { ChatBubble } from '@/features/ai-workspace/components/ChatBubble'; // We can reuse ChatBubble as it's generic UI
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';

export function ChatArea() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = [
    {
      role: 'user' as const,
      content: "Explain the concept of deep work",
      time: "28m ago"
    },
    {
      role: 'ai' as const,
      content: "Deep work is the ability to focus without distraction on a cognitively demanding task. Cal Newport defines it as professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. These efforts create new value, improve your skill, and are hard to replicate.\n\nNewport contrasts this with \"shallow work\" — logistical-style tasks that can be performed while distracted and don't create much new value. The core argument is that deep work is becoming increasingly rare (due to our distracted world) and increasingly valuable (due to the knowledge economy).",
      time: "28m ago",
      citations: [
        { title: "Introduction", page: "3" },
        { title: "Chapter 1", page: "14" }
      ]
    },
    {
      role: 'user' as const,
      content: "What are the key takeaways from chapter 3?",
      time: "15m ago"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-transparent h-full">
      <ChatHeader />

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col w-full">
          {messages.map((msg, i) => (
            <ChatBubble 
              key={i}
              role={msg.role}
              content={msg.content}
              time={msg.time}
              citations={msg.citations}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
}
