'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, UserPlus, DollarSign } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/groups', icon: Users, label: 'Groups' },
    { href: '/friends', icon: UserPlus, label: 'Friends' },
    { href: '/settle', icon: DollarSign, label: 'Settle' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#18181B] z-40">
      <div className="flex items-center justify-around py-3 pb-6 max-w-md mx-auto relative">
        {/* First two tabs */}
        {tabs.slice(0, 2).map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-1 ${
              pathname === tab.href ? 'text-white' : 'text-[#666666]'
            }`}
          >
            <tab.icon size={22} />
            <span className="text-[10px]">{tab.label}</span>
          </Link>
        ))}

        {/* Center FAB */}
        <Link
          href="/create"
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-[56px] h-[56px] bg-[#f37736] rounded-full flex items-center justify-center text-white text-3xl shadow-[0_4px_12px_rgba(243,119,54,0.4)]"
        >
          +
        </Link>

        {/* Spacer for FAB */}
        <div className="w-[56px]" />

        {/* Last two tabs */}
        {tabs.slice(2).map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-1 ${
              pathname === tab.href ? 'text-white' : 'text-[#666666]'
            }`}
          >
            <tab.icon size={22} />
            <span className="text-[10px]">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
