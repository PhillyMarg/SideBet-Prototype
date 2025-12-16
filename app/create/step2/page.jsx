'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

export default function CreateBetStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const betType = searchParams.get('type') || 'group';
  const isH2H = betType === 'h2h';

  const [betFormat, setBetFormat] = useState('yes-no');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [line, setLine] = useState('');

  const accentColor = isH2H ? '#7b2cbf' : '#f37736';
  const canProceed = title.trim() !== '' && (betFormat === 'yes-no' || line.trim() !== '');

  const handleNext = () => {
    const params = new URLSearchParams({
      type: betType,
      format: betFormat,
      title: title,
      description: description,
      ...(betFormat === 'over-under' && { line: line }),
    });
    router.push(`/create/step3?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] text-[#A1A1AA]">Step 2 of 3</span>
          <button onClick={() => router.push('/')}>
            <X size={20} className="text-[#A1A1AA]" />
          </button>
        </div>
        <div className="h-[3px] bg-[#444444] rounded-full">
          <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
      </div>

      <div className="flex-1 px-4 overflow-y-auto">
        <h1 className="text-lg font-semibold mb-1">What's The Bet?</h1>
        <p className="text-sm text-[#A1A1AA] mb-6">Set up the details</p>

        <div className="mb-4">
          <label className="text-[11px] text-[#A1A1AA] uppercase tracking-wide mb-2 block">
            Bet Type
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setBetFormat('yes-no')}
              style={{
                backgroundColor: betFormat === 'yes-no' ? accentColor : 'transparent',
                borderColor: accentColor,
              }}
              className="flex-1 py-3 rounded-lg text-sm font-semibold border"
            >
              YES / NO
            </button>
            <button
              onClick={() => setBetFormat('over-under')}
              style={{
                backgroundColor: betFormat === 'over-under' ? accentColor : 'transparent',
                borderColor: accentColor,
              }}
              className="flex-1 py-3 rounded-lg text-sm font-semibold border"
            >
              OVER / UNDER
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-[11px] text-[#A1A1AA] uppercase tracking-wide mb-2 block">
            Bet Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Will Josh finish his drink?"
            className="w-full p-4 rounded-lg border border-[#444444] bg-transparent text-white placeholder-[#666666] focus:outline-none focus:border-[#f37736]"
          />
        </div>

        <div className="mb-4">
          <label className="text-[11px] text-[#A1A1AA] uppercase tracking-wide mb-2 block">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="w-full p-4 rounded-lg border border-[#444444] bg-transparent text-white placeholder-[#666666] focus:outline-none focus:border-[#f37736] resize-none"
          />
        </div>

        {betFormat === 'over-under' && (
          <div className="mb-4">
            <label className="text-[11px] text-[#A1A1AA] uppercase tracking-wide mb-2 block">
              The Line
            </label>
            <input
              type="text"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder="e.g., 10.5 points"
              className="w-full p-4 rounded-lg border border-[#444444] bg-transparent text-white placeholder-[#666666] focus:outline-none focus:border-[#f37736]"
            />
          </div>
        )}
      </div>

      <div className="p-4 flex gap-3">
        <button
          onClick={() => router.back()}
          className="flex-1 py-4 rounded-lg font-semibold border border-[#444444] text-white"
        >
          BACK
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          style={{ backgroundColor: canProceed ? accentColor : '#444444' }}
          className={`flex-1 py-4 rounded-lg font-semibold ${canProceed ? 'text-white' : 'text-[#666666]'}`}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
