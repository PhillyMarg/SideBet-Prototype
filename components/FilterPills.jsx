@'
'use client';

import { useState } from 'react';

const FILTERS = [
  { id: 'all', label: 'ALL', color: 'orange' },
  { id: 'vote', label: 'VOTE NOW', color: 'orange' },
  { id: 'my-bets', label: 'MY BETS', color: 'orange' },
  { id: 'results', label: 'RESULTS', color: 'orange' },
  { id: 'urgent', label: 'URGENT', color: 'orange' },
  { id: 'h2h', label: 'H2H', color: 'purple' },
];

export default function FilterPills({ onFilterChange, defaultFilter = 'all' }) {
  const [active, setActive] = useState(defaultFilter);

  const handleClick = (id) => {
    setActive(id);
    onFilterChange?.(id);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
      {FILTERS.map((filter) => {
        const isActive = active === filter.id;
        const isPurple = filter.color === 'purple';
        const baseColor = isPurple ? '#7b2cbf' : '#f37736';
        
        return (
          <button
            key={filter.id}
            onClick={() => handleClick(filter.id)}
            style={{
              backgroundColor: isActive ? baseColor : 'transparent',
              borderColor: baseColor,
              color: isActive ? 'white' : baseColor,
            }}
            className="px-4 py-2 rounded-md text-[11px] font-semibold whitespace-nowrap border transition-all duration-150"
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
'@ | Out-File -FilePath "C:\Users\Phil\Documents\SideBet-Prototype\components\FilterPills.jsx" -Encoding UTF8
