import React from 'react';
import { Bell, TrendingDown, Sparkles, Check, ExternalLink } from 'lucide-react';

export default function NotificationsDropdown({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onNotificationClick
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Invisible backdrop to dismiss */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-4 text-white animate-in fade-in zoom-in-95 duration-150 space-y-3">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">Notifications</span>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] text-neutral-400 hover:text-white transition-colors"
          >
            Mark all read
          </button>
        </div>

        {/* List */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              No recent notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  notif.unread
                    ? 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    : 'bg-neutral-900/50 border-transparent hover:bg-neutral-800/40 text-neutral-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-white text-xs">{notif.title}</div>
                  <span className="text-[10px] text-neutral-500 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                  {notif.message}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}
