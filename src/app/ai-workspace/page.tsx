"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  ChevronDown,
  Send,
  Paperclip,
  Target,
  FileText,
  Lightbulb,
  Bookmark,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Brain,
  Layers,
  Zap,
  X,
  Check,
  MessageSquare,
  Clock,
  Hash,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Citation {
  chapter: string;
  page: number;
  quote: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  citations?: Citation[];
  isTyping?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_CONVERSATIONS: { group: string; items: Conversation[] }[] = [
  {
    group: "Today",
    items: [
      {
        id: "1",
        title: "Explain the concept of deep work",
        lastMessage: "Deep work refers to professional activities performed...",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        messageCount: 8,
      },
      {
        id: "2",
        title: "What are the key takeaways from chapter 3?",
        lastMessage: "Chapter 3 focuses on the rules for deep work...",
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        messageCount: 5,
      },
    ],
  },
  {
    group: "Yesterday",
    items: [
      {
        id: "3",
        title: "How does this relate to Cal Newport's...",
        lastMessage: "Cal Newport argues that the ability to focus...",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
        messageCount: 12,
      },
    ],
  },
  {
    group: "This Week",
    items: [
      {
        id: "4",
        title: "Difference between shallow and deep work",
        lastMessage: "Shallow work consists of non-cognitively demanding...",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        messageCount: 6,
      },
      {
        id: "5",
        title: "Newport's 4 rules summarized",
        lastMessage: "The four rules are: Work Deeply, Embrace Boredom...",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        messageCount: 9,
      },
      {
        id: "6",
        title: "Strategies for minimizing distraction",
        lastMessage: "Newport recommends scheduling every minute of your day...",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
        messageCount: 7,
      },
    ],
  },
];

const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "Explain the concept of deep work",
    timestamp: new Date(Date.now() - 1000 * 60 * 28),
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "Deep work is the ability to focus without distraction on a cognitively demanding task. Cal Newport defines it as professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. These efforts create new value, improve your skill, and are hard to replicate.\n\nNewport contrasts this with \"shallow work\" — logistical-style tasks that can be performed while distracted and don't create much new value. The core argument is that deep work is becoming increasingly rare (due to our distracted world) and increasingly valuable (due to the knowledge economy).",
    timestamp: new Date(Date.now() - 1000 * 60 * 27),
    citations: [
      {
        chapter: "Introduction",
        page: 3,
        quote:
          "Deep Work: Professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit.",
      },
      {
        chapter: "Chapter 1",
        page: 14,
        quote:
          "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.",
      },
    ],
  },
  {
    id: "m3",
    role: "user",
    content: "What are the key takeaways from chapter 3?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
];

const SUGGESTION_CARDS = [
  { icon: BookOpen, label: "Explain the main themes", color: "text-indigo-400" },
  { icon: Target, label: "Quiz me on chapter 1", color: "text-emerald-400" },
  { icon: Layers, label: "Create flashcards", color: "text-violet-400" },
  { icon: FileText, label: "Summarize key points", color: "text-amber-400" },
];

const RELATED_CONCEPTS = [
  "Flow State",
  "Attention Residue",
  "Deliberate Practice",
  "Digital Minimalism",
  "Pomodoro Technique",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-indigo-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function CitationChip({
  citation,
}: {
  citation: Citation;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-full px-3 py-1 hover:bg-indigo-500/30 transition-colors"
      >
        <BookOpen size={11} />
        Cited from: {citation.chapter}, Page {citation.page}
        <ChevronRight
          size={11}
          className={cn("transition-transform", open && "rotate-90")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-xs text-slate-400 italic border-l-2 border-indigo-500/40 pl-3 py-1 bg-slate-800/50 rounded-r">
              &ldquo;{citation.quote}&rdquo;
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AIMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [hovering, setHovering] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-1">
        <Brain size={14} className="text-white" />
      </div>

      <div className="flex-1 max-w-[85%]">
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
          {message.isTyping ? (
            <TypingIndicator />
          ) : (
            <>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              {message.citations?.map((c, i) => (
                <CitationChip
                  key={i}
                  citation={c}
                  expanded={false}
                  onToggle={() => {}}
                />
              ))}
            </>
          )}
        </div>

        {/* Actions row */}
        <AnimatePresence>
          {hovering && !message.isTyping && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-1 mt-1.5 ml-1"
            >
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 px-2 py-1 rounded-md hover:bg-slate-800 transition-colors"
              >
                {copied ? (
                  <Check size={12} className="text-emerald-400" />
                ) : (
                  <Copy size={12} />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={() => setFeedback("up")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  feedback === "up"
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                )}
              >
                <ThumbsUp size={12} />
              </button>
              <button
                onClick={() => setFeedback("down")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  feedback === "down"
                    ? "text-red-400 bg-red-400/10"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                )}
              >
                <ThumbsDown size={12} />
              </button>
              <span className="text-xs text-slate-600 ml-1">
                {formatTimestamp(message.timestamp)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function UserMessage({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 justify-end"
    >
      <div className="max-w-[75%]">
        <div className="bg-indigo-600 rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-white text-sm leading-relaxed">{message.content}</p>
        </div>
        <p className="text-xs text-slate-600 text-right mt-1 mr-1">
          {formatTimestamp(message.timestamp)}
        </p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 mt-1 border border-slate-600">
        <span className="text-xs font-semibold text-slate-300">Y</span>
      </div>
    </motion.div>
  );
}

// ─── Context Panel ─────────────────────────────────────────────────────────────

function ContextPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 200 }}
          className="w-72 flex-shrink-0 bg-slate-900 border-l border-slate-700/50 flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
            <span className="text-sm font-semibold text-slate-200">Context</span>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Current chapter */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Current Chapter
              </p>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={13} className="text-indigo-400" />
                  <span className="text-xs font-medium text-slate-300">
                    Chapter 3
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rule #2: Embrace Boredom — discusses strategies for
                  strengthening your ability to concentrate deeply.
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex-1 bg-slate-700 rounded-full h-1">
                    <div
                      className="bg-indigo-500 h-1 rounded-full"
                      style={{ width: "62%" }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">62%</span>
                </div>
              </div>
            </div>

            {/* Related concepts */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Related Concepts
              </p>
              <div className="flex flex-wrap gap-1.5">
                {RELATED_CONCEPTS.map((c) => (
                  <button
                    key={c}
                    className="text-xs bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 px-2.5 py-1 rounded-full transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Quick Actions
              </p>
              <div className="space-y-1.5">
                {[
                  { icon: Target, label: "Quiz on this chapter" },
                  { icon: Layers, label: "Generate flashcards" },
                  { icon: Hash, label: "Key vocabulary" },
                  { icon: Zap, label: "Mind map concepts" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-2.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 rounded-lg px-3 py-2 transition-colors text-left"
                  >
                    <Icon size={13} className="text-indigo-400 flex-shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Space Stats
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Pages", value: "847" },
                  { label: "Chapters", value: "18" },
                  { label: "Chats", value: "24" },
                  { label: "Saved", value: "12" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-slate-800/60 rounded-lg p-2.5 border border-slate-700/40 text-center"
                  >
                    <p className="text-base font-bold text-slate-200">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 select-none">
      {/* Animated brain icon */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-indigo-500/30 flex items-center justify-center mb-6"
      >
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Brain size={36} className="text-indigo-400" />
        </motion.div>
      </motion.div>

      <h3 className="text-xl font-semibold text-slate-200 mb-2">
        Start a conversation
      </h3>
      <p className="text-sm text-slate-500 mb-8 text-center max-w-xs">
        Ask anything about your reading material. The AI has indexed all 847
        pages.
      </p>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {SUGGESTION_CARDS.map(({ icon: Icon, label, color }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestion(label)}
            className="flex flex-col items-start gap-2.5 bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/40 rounded-xl p-4 text-left transition-colors group"
          >
            <Icon size={18} className={color} />
            <span className="text-xs font-medium text-slate-300 group-hover:text-slate-100 transition-colors leading-snug">
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AIWorkspacePage() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("1");
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [contextPanelOpen, setContextPanelOpen] = useState(false);
  const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredConversations = MOCK_CONVERSATIONS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((g) => g.items.length > 0);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isGenerating) return;

    const userMsg: Message = {
      id: `m${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const typingMsg: Message = {
      id: `typing-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    };

    if (!selectedConversation) setSelectedConversation("new");
    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setInputValue("");
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => !m.isTyping);
        return [
          ...withoutTyping,
          {
            id: `m${Date.now()}`,
            role: "assistant",
            content:
              "That's a great question about \"" +
              text +
              "\". Based on the material in your Deep Work space, here is what I found:\n\nCal Newport emphasizes that this concept is central to developing the ability to produce at an elite level. The key insight is that by deliberately practicing focused attention, you strengthen the neural circuits associated with concentration — much like how physical exercise builds muscle.",
            timestamp: new Date(),
            citations: [
              {
                chapter: "Chapter 3",
                page: 47,
                quote:
                  "Efforts to deepen your focus will struggle if you don't simultaneously wean your mind from a dependence on distraction.",
              },
            ],
          },
        ];
      });
      setIsGenerating(false);
    }, 2200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  };

  const featureButtons = [
    { icon: Paperclip, label: "Upload" },
    { icon: Target, label: "Quiz Me" },
    { icon: FileText, label: "Summarize" },
    { icon: Lightbulb, label: "Key Insights" },
    { icon: Bookmark, label: "Save" },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* ── LEFT SIDEBAR ──────────────────────────────────────────────────── */}
      <aside className="w-[280px] flex-shrink-0 bg-slate-900 border-r border-slate-700/50 flex flex-col">
        {/* Heading + New button */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-400" />
              <h1 className="text-sm font-bold text-slate-100 tracking-tight">
                AI Workspace
              </h1>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedConversation(null);
              setMessages([]);
            }}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors"
          >
            <Plus size={15} />
            New Conversation
          </motion.button>
        </div>

        {/* Search */}
        <div className="px-3 pb-3">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/70 border border-slate-700/50 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-4">
          {filteredConversations.map((group) => (
            <div key={group.group}>
              <div className="flex items-center gap-1.5 px-2 mb-1.5">
                <Clock size={10} className="text-slate-600" />
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {group.group}
                </p>
              </div>
              <div className="space-y-0.5">
                {group.items.map((conv) => (
                  <motion.button
                    key={conv.id}
                    whileHover={{ x: 2 }}
                    onClick={() => {
                      setSelectedConversation(conv.id);
                      setMessages(MOCK_MESSAGES);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-lg transition-colors group",
                      selectedConversation === conv.id
                        ? "bg-indigo-600/20 border border-indigo-500/30"
                        : "hover:bg-slate-800/60 border border-transparent"
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs font-medium truncate leading-snug",
                        selectedConversation === conv.id
                          ? "text-indigo-300"
                          : "text-slate-300 group-hover:text-slate-100"
                      )}
                    >
                      {conv.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-600 truncate flex-1 pr-2">
                        {conv.lastMessage}
                      </p>
                      <span className="text-xs text-slate-600 flex-shrink-0">
                        {formatTimestamp(conv.timestamp)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN AREA ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm flex-shrink-0">
          {/* Space selector */}
          <div className="relative">
            <button
              onClick={() => setSpaceDropdownOpen((v) => !v)}
              className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/40 rounded-xl px-3.5 py-2 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <BookOpen size={13} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-200 leading-none mb-0.5">
                  Deep Work — Cal Newport
                </p>
                <p className="text-xs text-slate-500">
                  Powered by AI · 847 pages indexed
                </p>
              </div>
              <ChevronDown
                size={14}
                className={cn(
                  "text-slate-500 transition-transform ml-1",
                  spaceDropdownOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {spaceDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-slate-800 border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  {[
                    {
                      name: "Deep Work — Cal Newport",
                      pages: 847,
                      color: "from-indigo-500 to-violet-600",
                    },
                    {
                      name: "Atomic Habits — James Clear",
                      pages: 319,
                      color: "from-emerald-500 to-teal-600",
                    },
                    {
                      name: "Thinking Fast and Slow",
                      pages: 512,
                      color: "from-amber-500 to-orange-600",
                    },
                  ].map((space) => (
                    <button
                      key={space.name}
                      onClick={() => setSpaceDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/60 transition-colors text-left"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${space.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <BookOpen size={12} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-200">{space.name}</p>
                        <p className="text-xs text-slate-500">
                          {space.pages} pages
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setContextPanelOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors",
                contextPanelOpen
                  ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
                  : "border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              )}
            >
              {contextPanelOpen ? (
                <ChevronRight size={13} />
              ) : (
                <ChevronLeft size={13} />
              )}
              Context
            </button>
          </div>
        </header>

        {/* Chat body + context panel wrapper */}
        <div className="flex flex-1 min-h-0">
          {/* Chat column */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {selectedConversation && messages.length > 0 ? (
                <div className="max-w-3xl mx-auto space-y-6">
                  {messages.map((msg) =>
                    msg.role === "assistant" ? (
                      <AIMessage key={msg.id} message={msg} />
                    ) : (
                      <UserMessage key={msg.id} message={msg} />
                    )
                  )}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <EmptyState
                  onSuggestion={(text) => {
                    setSelectedConversation("new");
                    setInputValue(text);
                    setTimeout(() => textareaRef.current?.focus(), 50);
                  }}
                />
              )}
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 px-6 pb-5 pt-3 border-t border-slate-700/40 bg-slate-950">
              <div className="max-w-3xl mx-auto">
                <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden focus-within:border-indigo-500/50 transition-colors shadow-lg">
                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Deep Work..."
                    rows={1}
                    className="w-full bg-transparent px-4 pt-4 pb-2 text-sm text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none leading-relaxed"
                    style={{ maxHeight: "180px" }}
                  />

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between px-3 pb-3 pt-1">
                    {/* Feature buttons */}
                    <div className="flex items-center gap-0.5 flex-wrap">
                      {featureButtons.map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <Icon size={12} />
                          <span className="hidden sm:inline">{label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Char count */}
                      <span
                        className={cn(
                          "text-xs tabular-nums",
                          inputValue.length > 900
                            ? "text-red-400"
                            : "text-slate-600"
                        )}
                      >
                        {inputValue.length}/1000
                      </span>

                      {/* Send */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isGenerating}
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-xl transition-colors",
                          inputValue.trim() && !isGenerating
                            ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                            : "bg-slate-800 text-slate-600 cursor-not-allowed"
                        )}
                      >
                        {isGenerating ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Zap size={14} />
                          </motion.div>
                        ) : (
                          <Send size={13} />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-slate-700 mt-2.5">
                  AI may make mistakes. Verify important information.
                </p>
              </div>
            </div>
          </div>

          {/* Context panel */}
          <ContextPanel
            open={contextPanelOpen}
            onClose={() => setContextPanelOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
