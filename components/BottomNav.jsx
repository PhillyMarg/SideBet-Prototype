'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, UserPlus, DollarSign, Plus } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/groups', icon: Users, label: 'Groups' },
    { href: '/friends', icon: UserPlus, label: 'Friends' },
    { href: '/settle', icon: DollarSign, label: 'Settle' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* SVG Background with curved notch */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[68px]"
        viewBox="0 0 393 68"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12C0 5.37258 5.37258 0 12 0H156C162.627 0 168 5.37258 168 12V12C168 26.3594 179.641 38 194 38H199C213.359 38 225 26.3594 225 12V12C225 5.37258 230.373 0 237 0H381C387.627 0 393 5.37258 393 12V68H0V12Z"
          fill="#3D2314"
        />
      </svg>

      {/* FAB Button - centered and raised */}
      <Link
        href="/create"
        className="absolute left-1/2 -translate-x-1/2 -top-4 z-10 w-14 h-14 bg-sb-orange rounded-full flex items-center justify-center shadow-lg border-4 border-[#3D2314]"
      >
        <Plus className="w-7 h-7 text-white" strokeWidth={3} />
      </Link>

      {/* Nav Items */}
      <div className="relative flex justify-around items-end h-[68px] px-4 pb-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          // Add spacing around center for FAB
          const marginClass = index === 1 ? 'mr-8' : index === 2 ? 'ml-8' : '';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 ${marginClass}`}
            >
              <Icon
                className={`w-6 h-6 ${isActive ? 'text-sb-orange' : 'text-white'}`}
                strokeWidth={2}
              />
              <span
                className={`text-[8px] font-semibold font-montserrat ${
                  isActive ? 'text-sb-orange' : 'text-white'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
