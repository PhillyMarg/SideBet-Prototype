'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const STATUS_CONFIG = {
  open: { border: 'border-[#f37736]', badge: null },
  urgent: { border: 'border-[#f37736]', badge: { text: 'URGENT', bg: 'bg-[#f37736]' } },
  pending: { border: 'border-[#f37736]', badge: { text: 'PENDING', bg: 'bg-[#666666]' } },
  won: { border: 'border-[#63ba47]', badge: { text: 'YOU WON!', bg: 'bg-[#63ba47]' } },
  lost: { border: 'border-[#982E2E]', badge: { text: 'YOU LOST', bg: 'bg-[#982E2E]' } },
  judge: { border: 'border-[#f37736]', badge: { text: 'JUDGE BET!', bg: 'bg-[#f37736]' } },
};

export default function BetCard({
  bet,
  type = 'group',
  status = 'open',
}) {
  const [expanded, setExpanded] = useState(false);

  const isH2H = type === 'h2h';
  const config = STATUS_CONFIG[status];
  const borderColor = isH2H && status === 'open' ? 'border-[#7b2cbf]' : config.border;
  const accentColor = isH2H ? 'text-[#7b2cbf]' : 'text-[#f37736]';

  return (
    <div className={`border ${borderColor} rounded-lg bg-[rgba(255,255,255,0.03)] overflow-hidden mx-4`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium ${accentColor}`}>
                {bet.groupName || bet.opponentName}
              </span>
              {config.badge && (
                <span className={`${config.badge.bg} text-white text-[10px] font-semibold px-2 py-0.5 rounded`}>
                  {config.badge.text}
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-white mb-2">
              {bet.title}
            </h3>
            <div className={`text-xs ${accentColor}`}>
              Pot: ${bet.pot?.toFixed(2)} | {bet.playerCount} Players
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A1A1AA]">
              {bet.timeLeft}
            </span>
            {expanded ? (
              <ChevronUp size={16} className="text-[#666666]" />
            ) : (
              <ChevronDown size={16} className="text-[#666666]" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-[rgba(255,255,255,0.1)]">
          <p className="text-xs text-[#A1A1AA] italic py-4">
            Expanded content coming soon...
          </p>
        </div>
      )}
    </div>
  );
}
