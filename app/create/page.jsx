'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function CreateBet() {
  const router = useRouter();
  const [betType, setBetType] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[340px] bg-[#1a1a1a] border border-[#333] rounded-xl p-5 relative">
        {/* Progress bar */}
        <div className="h-[3px] bg-[#333] rounded-full mb-4">
          <div className="h-full w-1/3 bg-[#f37736] rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-[#666]"
        >
          <X size={18} />
        </button>

        <h1 className="text-lg font-semibold mb-1">Who's This Bet For?</h1>
        <p className="text-sm text-[#888] mb-5">Group Bet or Grudge Match?</p>

        <button
          onClick={() => setBetType('group')}
          className={`w-full p-4 rounded-lg border text-center mb-3 transition-all ${
            betType === 'group'
              ? 'border-[#f37736] bg-[rgba(243,119,54,0.15)]'
              : 'border-[#444]'
          }`}
        >
          <div className="font-semibold text-sm">POST TO GROUP</div>
          <div className="text-xs text-[#888]">Share with Group Members</div>
        </button>

        <button
          onClick={() => setBetType('h2h')}
          className={`w-full p-4 rounded-lg border text-center mb-5 transition-all ${
            betType === 'h2h'
              ? 'border-[#7b2cbf] bg-[rgba(123,44,191,0.15)]'
              : 'border-[#444]'
          }`}
        >
          <div className="font-semibold text-sm">CHALLENGE FRIEND</div>
          <div className="text-xs text-[#888]">Head-to-Head with a Friend</div>
        </button>

        <button
          onClick={() => {
            if (betType) {
              router.push(`/create/step2?type=${betType}`);
            }
          }}
          disabled={!betType}
          className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
            betType === 'h2h'
              ? 'bg-[#7b2cbf] text-white'
              : betType === 'group'
              ? 'bg-[#f37736] text-white'
              : 'bg-[#333] text-[#666]'
          }`}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
