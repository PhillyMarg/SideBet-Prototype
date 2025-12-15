'use client';

import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import FilterPills from '@/components/FilterPills';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const bets = []; // Empty - will come from Firebase later

  return (
    <main>
      <AppHeader username="Phil Margevicius" notificationCount={0} />

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

        <div className="px-4 pt-4">
          {bets.length === 0 ? (
            <p className="text-[#A1A1AA] text-sm italic text-center py-8">
              No Active Bets. Create One, Chump!
            </p>
          ) : (
            <div className="space-y-3">
              {/* Bet cards will render here from Firebase */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
