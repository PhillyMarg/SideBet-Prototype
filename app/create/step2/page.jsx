'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

export default function CreateBetStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const betType = searchParams.get('type') || 'group';
  const isH2H = betType === 'h2h';
  const accentColor = isH2H ? '#7b2cbf' : '#f37736';

  const [betFormat, setBetFormat] = useState('yes-no');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [line, setLine] = useState('');

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[340px] bg-[#1a1a1a] border border-[#333] rounded-xl p-5 relative">
        {/* Progress bar */}
        <div className="h-[3px] bg-[#333] rounded-full mb-4">
          <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>

        {/* Close button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-[#666]"
        >
          <X size={18} />
        </button>

        <h1 className="text-lg font-semibold mb-1">What's The Bet?</h1>
        <p className="text-sm text-[#888] mb-5">Choose Your Bet Type</p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setBetFormat('yes-no')}
            style={{
              backgroundColor: betFormat === 'yes-no' ? accentColor : 'transparent',
              borderColor: accentColor,
            }}
            className="flex-1 py-3 rounded-lg text-sm font-semibold border text-center"
          >
            <div>YES/NO</div>
            <div className="text-xs font-normal opacity-70">Simple Outcome</div>
          </button>
          <button
            onClick={() => setBetFormat('over-under')}
            style={{
              backgroundColor: betFormat === 'over-under' ? accentColor : 'transparent',
              borderColor: accentColor,
            }}
            className="flex-1 py-3 rounded-lg text-sm font-semibold border text-center"
          >
            <div>OVER/UNDER</div>
            <div className="text-xs font-normal opacity-70">Set a Line</div>
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm text-white mb-2 block">Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Will the Browns Lose?"
            className="w-full p-3 rounded-lg border border-[#444] bg-transparent text-white placeholder-[#666] focus:outline-none text-sm"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm text-white mb-2 block">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Game v. Ravens on Saturday"
            className="w-full p-3 rounded-lg border border-[#444] bg-transparent text-white placeholder-[#666] focus:outline-none text-sm"
          />
        </div>

        {betFormat === 'over-under' && (
          <div className="mb-5">
            <label className="text-sm text-white mb-2 block">The Line*</label>
            <input
              type="text"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder="10.5 points"
              className="w-full p-3 rounded-lg border border-[#444] bg-transparent text-white placeholder-[#666] focus:outline-none text-sm"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 py-3 rounded-lg font-semibold text-sm border border-[#444] text-white"
          >
            BACK
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            style={{ backgroundColor: canProceed ? accentColor : '#333' }}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm ${canProceed ? 'text-white' : 'text-[#666]'}`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
