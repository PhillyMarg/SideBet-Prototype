'use client';

import { useState, Suspense } from 'react';
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

function CreateBetStep3Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const betType = searchParams.get('type') || 'group';
  const betFormat = searchParams.get('format') || 'yes-no';
  const title = searchParams.get('title') || '';
  const description = searchParams.get('description') || '';
  const line = searchParams.get('line') || '';

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
    setCustomWager('');
  };

  const handleCustomWager = () => {
    setShowCustomWager(true);
    setWager(0);
  };

  const handleTimeSelect = (minutes) => {
    setTimePreset(minutes);
    setShowCustomTime(false);
  };

  const handlePlaceBet = () => {
    alert('Bet would be created! (Firebase integration coming)');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] text-[#A1A1AA]">Step 3 of 3</span>
          <button onClick={() => router.push('/')}>
            <X size={20} className="text-[#A1A1AA]" />
          </button>
        </div>
        <div className="h-[3px] bg-[#444444] rounded-full">
          <div className="h-full w-full rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
      </div>

      <div className="flex-1 px-4 overflow-y-auto">
        <h1 className="text-lg font-semibold mb-1">Set the Stakes!</h1>
        <p className="text-sm text-[#A1A1AA] mb-6">How much and how long?</p>

        <div className="mb-6">
          <label className="text-[11px] text-[#A1A1AA] uppercase tracking-wide mb-2 block">
            Wager Amount
          </label>
          <div className="flex flex-wrap gap-2">
            {WAGER_PRESETS.map((amount) => (
              <button
                key={amount}
                onClick={() => handleWagerSelect(amount)}
                style={{
                  backgroundColor: wager === amount && !showCustomWager ? accentColor : 'transparent',
                  borderColor: accentColor,
                }}
                className="px-4 py-2 rounded-lg text-sm font-semibold border min-w-[60px]"
              >
                ${amount}
              </button>
            ))}
            <button
              onClick={handleCustomWager}
              style={{
                backgroundColor: showCustomWager ? accentColor : 'transparent',
                borderColor: accentColor,
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold border"
            >
              Custom
            </button>
          </div>
          {showCustomWager && (
            <input
              type="number"
              value={customWager}
              onChange={(e) => setCustomWager(e.target.value)}
              placeholder="Enter amount"
              className="w-full mt-3 p-4 rounded-lg border border-[#444444] bg-transparent text-white placeholder-[#666666] focus:outline-none"
              style={{ borderColor: accentColor }}
            />
          )}
        </div>

        <div className="mb-6">
          <label className="text-[11px] text-[#A1A1AA] uppercase tracking-wide mb-2 block">
            Voting Window
          </label>
          <div className="flex flex-wrap gap-2">
            {TIME_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleTimeSelect(preset.value)}
                style={{
                  backgroundColor: timePreset === preset.value && !showCustomTime ? accentColor : 'transparent',
                  borderColor: accentColor,
                }}
                className="px-4 py-2 rounded-lg text-sm font-semibold border min-w-[60px]"
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
              className="px-4 py-2 rounded-lg text-sm font-semibold border"
            >
              Custom
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-[11px] text-[#A1A1AA] uppercase tracking-wide mb-2 block">
            Preview
          </label>
          <div
            className="p-4 rounded-lg border"
            style={{ borderColor: accentColor, backgroundColor: `${accentColor}10` }}
          >
            <div className="text-xs mb-1" style={{ color: accentColor }}>
              {isH2H ? 'H2H Challenge' : 'Group Bet'}
            </div>
            <div className="text-sm font-medium text-white mb-2">{title || 'Bet Title'}</div>
            {description && (
              <div className="text-xs text-[#A1A1AA] mb-2 italic">{description}</div>
            )}
            {betFormat === 'over-under' && line && (
              <div className="text-xs text-[#A1A1AA] mb-2">Line: {line}</div>
            )}
            <div className="text-xs" style={{ color: accentColor }}>
              Wager: ${finalWager.toFixed(2)} | {TIME_PRESETS.find(t => t.value === timePreset)?.label || 'Custom'}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex gap-3">
        <button
          onClick={() => router.back()}
          className="flex-1 py-4 rounded-lg font-semibold border border-[#444444] text-white"
        >
          BACK
        </button>
        <button
          onClick={handlePlaceBet}
          disabled={!canProceed}
          style={{ backgroundColor: canProceed ? accentColor : '#444444' }}
          className={`flex-1 py-4 rounded-lg font-semibold ${canProceed ? 'text-white' : 'text-[#666666]'}`}
        >
          PLACE BET
        </button>
      </div>
    </div>
  );
}

export default function CreateBetStep3() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CreateBetStep3Content />
    </Suspense>
  );
}
