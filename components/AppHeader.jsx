
'use client';

import { Bell } from 'lucide-react';
import { useState } from 'react';

export default function AppHeader({ username = 'User', notificationCount = 0 }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[#f37736] rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="font-bold text-sm tracking-wide">SIDEBET</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[#A1A1AA] text-xs">{username}</span>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative"
        >
          <Bell size={20} className="text-[#A1A1AA]" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#f37736] rounded-full text-[10px] font-bold flex items-center justify-center px-1">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
