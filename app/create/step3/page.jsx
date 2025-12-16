'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

const WAGER_PRESETS = [1, 5, 10, 20, 50];
const TIME_PRESETS = [
  { label: '30m', value: 30 },
  { label: '1h', value: 60 },
  { label: '6h', value: 360 },
  { label: '24h', value: 1440 },
  { label: '1w', value: 10080 },
];

export default function CreateBetStep3() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const betType = searchParams.get('type') || 'group';
  const betFormat = searchParams.get('format') || 'yes-no';
  const title = searchParams.get('title') || '';

  const isH2H = betType === 'h2h';
  const accentColor = isH2H ? '#7b2cbf' : '#f37736';

  const [wager, setWager] = useState(5);
  const [customWager, setCustomWager] = useState('');
  const [showCustomWager, setShowCustomWager] = useState(false);
  const [timePreset, setTimePreset] = useState(60);
  const [showCustomTime, setShowCustomTime] = useState(false);

  const finalWager = showCustomWager ? Number(customWager) || 0 : wager;
  const canProceed = finalWager > 0;

  const handleWagerSelect = (amount) => {
    setWager(amount);
    setShowCustomWager(false);
  };

  const handlePlaceBet = () => {
    alert('Bet created! (Firebase integration coming)');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[340px] bg-[#1a1a1a] border border-[#333] rounded-xl p-5 relative">
        {/* Progress bar */}
        <div className="h-[3px] bg-[#333] rounded-full mb-4">
          <div className="h-full w-full rounded-full" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Close button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-[#666]"
        >
          <X size={18} />
        </button>

        <h1 className="text-lg font-semibold mb-1">Set the Stakes!</h1>
        <p className="text-sm text-[#888] mb-4">Wager Amount*</p>

        {/* Wager Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {WAGER_PRESETS.map((amount) => (
            <button
              key={amount}
              onClick={() => handleWagerSelect(amount)}
              style={{
                backgroundColor: wager === amount && !showCustomWager ? accentColor : 'transparent',
                borderColor: accentColor,
              }}
              className="py-2 rounded-lg text-sm font-semibold border"
            >
              ${amount}
            </button>
          ))}
          <button
            onClick={() => { setShowCustomWager(true); setWager(0); }}
            style={{
              backgroundColor: showCustomWager ? accentColor : 'transparent',
              borderColor: accentColor,
            }}
            className="py-2 rounded-lg text-sm font-semibold border"
          >
            Custom
          </button>
        </div>

        {showCustomWager && (
          <input
            type="number"
            value={customWager}
            onChange={(e) => setCustomWager(e.target.value)}
            placeholder="$12.00"
            className="w-full p-3 rounded-lg border border-[#444] bg-transparent text-white placeholder-[#666] focus:outline-none text-sm mb-4"
          />
        )}

        <p className="text-sm text-[#888] mb-3 mt-4">Bet Closes*</p>

        {/* Time Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {TIME_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => { setTimePreset(preset.value); setShowCustomTime(false); }}
              style={{
                backgroundColor: timePreset === preset.value && !showCustomTime ? accentColor : 'transparent',
                borderColor: accentColor,
              }}
              className="py-2 rounded-lg text-sm font-semibold border"
            >
              {preset.label}
            </button>
          ))}
          <button
            onClick={() => setShowCustomTime(true)}
            style={{
              backgroundColor: showCustomTime ? accentColor : 'transparent',
              borderColor: accentColor,
            }}
            className="py-2 rounded-lg text-sm font-semibold border"
          >
            Custom
          </button>
        </div>

        {/* Preview */}
        <p className="text-xs text-[#666] text-center mb-2">PREVIEW</p>
        <div className="p-3 rounded-lg border border-[#333] bg-[#111] mb-4 text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-[#666]">Group</span>
            <span className="text-[#888]">Test Group 1</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-[#666]">Bet</span>
            <span className="text-[#888]">{title || 'Bet Title'}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-[#666]">Type</span>
            <span className="text-[#888]">{betFormat === 'yes-no' ? 'YES/NO' : 'OVER/UNDER'}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-[#666]">Wager</span>
            <span className="text-[#888]">${finalWager.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666]">Closes</span>
            <span className="text-[#888]">{TIME_PRESETS.find(t => t.value === timePreset)?.label || 'Custom'}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-lg font-semibold text-sm border border-[#444] text-white"
          >
            BACK
          </button>
          <button
            onClick={handlePlaceBet}
            disabled={!canProceed}
            style={{ backgroundColor: canProceed ? accentColor : '#333' }}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm ${canProceed ? 'text-white' : 'text-[#666]'}`}
          >
            PLACE BET
          </button>
        </div>
      </div>
    </div>
  );
}
