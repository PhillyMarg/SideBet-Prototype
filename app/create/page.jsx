'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function CreateBet() {
  const router = useRouter();
  const [betType, setBetType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);

  const groups = [];
  const friends = [];

  const handleTypeSelect = (type) => {
    setBetType(type);
    setSelectedTarget(null);
    setShowDropdown(true);
  };

  const handleTargetSelect = (target) => {
    setSelectedTarget(target);
    setShowDropdown(false);
  };

  const canProceed = betType && selectedTarget;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] text-[#A1A1AA]">Step 1 of 3</span>
          <button onClick={() => router.back()}>
            <X size={20} className="text-[#A1A1AA]" />
          </button>
        </div>
        <div className="h-[3px] bg-[#444444] rounded-full">
          <div className="h-full w-1/3 bg-[#f37736] rounded-full" />
        </div>
      </div>

      <div className="flex-1 px-4">
        <h1 className="text-lg font-semibold mb-1">Who&apos;s This Bet For?</h1>
        <p className="text-sm text-[#A1A1AA] mb-6">Group Bet or Grudge Match?</p>

        <button
          onClick={() => handleTypeSelect('group')}
          className={`w-full p-4 rounded-lg border text-left mb-3 ${
            betType === 'group'
              ? 'border-[#f37736] bg-[rgba(243,119,54,0.1)]'
              : 'border-[#444444]'
          }`}
        >
          <div className="font-semibold text-sm">POST TO GROUP</div>
          <div className="text-xs text-[#A1A1AA]">Share with Group Members</div>
        </button>

        {betType === 'group' && showDropdown && (
          <div className="mb-3 border border-[#444444] rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-[#27272A]">
              <span className="text-xs font-medium text-[#A1A1AA]">GROUPS</span>
              <ChevronUp size={14} className="text-[#666666]" />
            </div>
            {groups.length === 0 ? (
              <p className="p-3 text-sm text-[#A1A1AA] italic">No groups yet. Create one first!</p>
            ) : (
              groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleTargetSelect(group)}
                  className={`w-full p-3 text-left text-sm border-t border-[rgba(255,255,255,0.05)] ${
                    selectedTarget?.id === group.id ? 'bg-[rgba(243,119,54,0.1)]' : ''
                  }`}
                >
                  {group.name}
                </button>
              ))
            )}
          </div>
        )}

        <button
          onClick={() => handleTypeSelect('h2h')}
          className={`w-full p-4 rounded-lg border text-left mb-3 ${
            betType === 'h2h'
              ? 'border-[#7b2cbf] bg-[rgba(123,44,191,0.1)]'
              : 'border-[#444444]'
          }`}
        >
          <div className="font-semibold text-sm">CHALLENGE FRIEND</div>
          <div className="text-xs text-[#A1A1AA]">Head-to-Head with a Friend</div>
        </button>

        {betType === 'h2h' && showDropdown && (
          <div className="mb-3 border border-[#444444] rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-[#27272A]">
              <span className="text-xs font-medium text-[#A1A1AA]">FRIENDS</span>
              <ChevronUp size={14} className="text-[#666666]" />
            </div>
            {friends.length === 0 ? (
              <p className="p-3 text-sm text-[#A1A1AA] italic">No friends yet. Add some first!</p>
            ) : (
              friends.map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => handleTargetSelect(friend)}
                  className={`w-full p-3 text-left text-sm border-t border-[rgba(255,255,255,0.05)] ${
                    selectedTarget?.id === friend.id ? 'bg-[rgba(123,44,191,0.1)]' : ''
                  }`}
                >
                  {friend.name}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <button
          disabled={!canProceed}
          className={`w-full py-4 rounded-lg font-semibold ${
            canProceed
              ? 'bg-[#f37736] text-white'
              : 'bg-[#444444] text-[#666666]'
          }`}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
