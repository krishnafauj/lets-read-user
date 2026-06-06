import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, MessageSquare, Check, Circle } from 'lucide-react';
import Link from 'next/link';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: "New Course Available",
    description: "Advanced React Patterns just dropped in your library.",
    time: "2 hours ago",
    unread: true,
    icon: <Bell className="text-primary w-5 h-5" />
  },
  {
    id: 2,
    title: "AI Workspace Update",
    description: "Your document analysis is complete.",
    time: "5 hours ago",
    unread: true,
    icon: <Check className="text-emerald-500 w-5 h-5" />
  },
  {
    id: 3,
    title: "Message from Instructor",
    description: "Please check the latest assignment feedback.",
    time: "1 day ago",
    unread: false,
    icon: <MessageSquare className="text-indigo-500 w-5 h-5" />
  }
];

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-surface border-l border-border z-[101] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Bell size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground">Notifications</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-hover text-text-muted transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={`p-4 rounded-2xl flex gap-4 cursor-pointer transition-all ${notif.unread ? 'bg-surface-hover/80 hover:bg-surface-hover' : 'hover:bg-surface-hover/50'}`}
                >
                  <div className="mt-1 shrink-0">
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-foreground truncate">{notif.title}</h4>
                      {notif.unread && <Circle size={8} className="fill-primary text-primary mt-1.5 shrink-0" />}
                    </div>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{notif.description}</p>
                    <span className="text-[10px] font-medium text-text-muted/60 mt-2 block uppercase tracking-wider">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border/40 bg-surface/50">
              <Link href="/inbox" onClick={onClose} className="w-full block text-center py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors shadow-sm">
                View All in Inbox
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
