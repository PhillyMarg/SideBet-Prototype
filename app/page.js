'use client';

import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import FilterPills from '@/components/FilterPills';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main>
      <AppHeader username="Phil Margevicius" notificationCount={3} />

      <div className="space-y-4">
        <FilterPills
          onFilterChange={setActiveFilter}
          defaultFilter="all"
        />

        <SearchBar
          placeholder="Search Bets..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Placeholder for bet cards */}
        <div className="px-4 pt-4">
          <p className="text-[#A1A1AA] text-sm italic text-center py-8">
            No Active Bets. Create One, Chump!
          </p>
        </div>
      </div>
    </main>
  );
}
