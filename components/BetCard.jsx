'use client';

import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, User, Share2 } from 'lucide-react';

export default function BetCard({
  // Core data
  groupName = 'Test Group 1',
  title = 'Will TG Beat Phil in 8Ball Pool?',
  description = 'Bet Description',
  
  // Bet details
  betType = 'YES_NO', // 'YES_NO' or 'OVER_UNDER'
  line = null, // For OVER_UNDER bets (e.g., "52.5")
  wager = '$5.00',
  payout = '$40.00',
  pot = '$40.00',
  players = '8 Players',
  
  // Time/Status
  closesAt = 'MM/DD/YYYY',
  status = null, // 'URGENT', 'PENDING', 'WON', 'LOST', 'JUDGE', 'CLOSED', 'VOID'
  
  // Voting
  yesPercent = 50,
  noPercent = 50,
  yourPick = null, // 'YES', 'NO', 'OVER', 'UNDER'
  hasVoted = false,
  
  // Card type
  isH2H = false,
  h2hOpponent = null, // For H2H: "Phil Marg v. Joe Smith"
  
  // H2H specific states
  isPendingAccept = false, // Waiting for opponent to accept
  isAwaitingAccept = false, // You need to accept/decline
  
  // Callbacks
  onVote = null,
  onShare = null,
  onAccept = null,
  onDecline = null,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Border color based on bet type
  const borderClass = isH2H 
    ? 'border-l-4 border-l-sb-purple border-t-0 border-r-0 border-b-0' 
    : 'border-l-4 border-l-sb-orange border-t-0 border-r-0 border-b-0';
  
  // Accent color for text
  const accentColor = isH2H ? 'text-sb-purple' : 'text-sb-orange';
  
  // Status badge styling
  const getStatusStyle = () => {
    switch (status) {
      case 'URGENT':
        return 'text-sb-orange';
      case 'PENDING':
        return 'text-yellow-500';
      case 'WON':
        return 'text-green-500';
      case 'LOST':
        return 'text-red-500';
      case 'JUDGE':
        return 'text-sb-orange';
      case 'CLOSED':
        return 'text-gray-400';
      case 'VOID':
        return 'text-gray-400';
      default:
        return accentColor;
    }
  };

  // Display text for status/time area
  const getTimeDisplay = () => {
    if (status) {
      if (status === 'VOID') return 'VOID | NO VOTES';
      return status;
    }
    return `Closes: ${closesAt}`;
  };

  // Get button labels based on bet type
  const getOptionLabels = () => {
    if (betType === 'OVER_UNDER') {
      return { negative: 'UNDER', positive: 'OVER' };
    }
    return { negative: 'NO', positive: 'YES' };
  };

  const optionLabels = getOptionLabels();

  // Handle vote click
  const handleVote = (choice) => {
    if (onVote) {
      onVote(choice);
    }
  };

  return (
    <div
      className={`bg-[rgba(24,24,27,0.4)] rounded-[6px] ${borderClass} overflow-hidden cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* ===== COLLAPSED VIEW ===== */}
      <div className="p-3 flex flex-col gap-1">
        {/* Top Row: Group Name + Time/Status */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold ${accentColor} font-montserrat`}
            style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
          >
            {isH2H && h2hOpponent ? h2hOpponent : groupName}
          </span>
          <div className="flex items-center gap-1">
            {!status && <Clock className={`w-3 h-3 ${accentColor}`} />}
            <span
              className={`text-[8px] font-semibold font-montserrat ${getStatusStyle()}`}
              style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
            >
              {getTimeDisplay()}
            </span>
          </div>
        </div>

        {/* Bet Title */}
        <p
          className="text-[12px] font-semibold text-white font-montserrat"
          style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
        >
          {title}
        </p>

        {/* Bottom Row: Pot/Players + Chevron */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold ${accentColor} font-montserrat`}
            style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
          >
            Pot: {pot} | {players}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-white" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-white" />
          )}
        </div>
      </div>

      {/* ===== EXPANDED VIEW ===== */}
      {isExpanded && (
        <div 
          className="px-3 pb-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Row with Share */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-semibold ${accentColor} font-montserrat`}>
              {isH2H && h2hOpponent ? h2hOpponent : groupName}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[8px] font-semibold ${getStatusStyle()} font-montserrat`}>
                {getTimeDisplay()}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.();
                }}
                className="p-1"
              >
                <Share2 className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>

          {/* Bet Title */}
          <p className="text-[14px] font-semibold text-white font-montserrat mb-1">
            {title}
          </p>

          {/* Description */}
          <p className="text-[10px] text-gray-400 font-montserrat">
            {description}
          </p>

          {/* Bet Type */}
          <p className="text-[10px] text-gray-400 font-montserrat">
            {betType === 'YES_NO' ? 'Yes/No' : 'Over/Under'}
          </p>

          {/* Line (for Over/Under only) */}
          {betType === 'OVER_UNDER' && line && (
            <p className={`text-[10px] ${accentColor} font-montserrat`}>
              Line: {line}
            </p>
          )}

          {/* Spacer */}
          <div className="h-2" />

          {/* Wager */}
          <p className={`text-[10px] ${accentColor} font-montserrat`}>
            Wager: {wager}
          </p>

          {/* Payout */}
          <p className={`text-[10px] ${accentColor} font-montserrat`}>
            Payout: {payout}
          </p>

          {/* Players */}
          <div className="flex items-center gap-1">
            <User className={`w-3 h-3 ${accentColor}`} />
            <span className={`text-[10px] ${accentColor} font-montserrat`}>
              {players}
            </span>
          </div>

          {/* Spacer */}
          <div className="h-3" />

          {/* ===== VOTING BUTTONS ===== */}
          {!isAwaitingAccept && !isPendingAccept && (
            <div className="flex gap-2">
              {/* NO / UNDER Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(optionLabels.negative);
                }}
                className={`flex-1 py-3 rounded-[4px] border transition-colors ${
                  yourPick === optionLabels.negative
                    ? 'bg-white/20 border-white'
                    : 'bg-transparent border-white/30 hover:bg-white/10'
                }`}
              >
                <span className="text-[10px] font-semibold text-white font-montserrat">
                  {optionLabels.negative} {noPercent}%
                </span>
              </button>

              {/* YES / OVER Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(optionLabels.positive);
                }}
                className={`flex-1 py-3 rounded-[4px] transition-colors ${
                  yourPick === optionLabels.positive
                    ? isH2H ? 'bg-sb-purple' : 'bg-sb-orange'
                    : isH2H 
                      ? 'bg-sb-purple/80 hover:bg-sb-purple' 
                      : 'bg-sb-orange/80 hover:bg-sb-orange'
                }`}
              >
                <span className="text-[10px] font-semibold text-white font-montserrat">
                  {optionLabels.positive} {yesPercent}%
                </span>
              </button>
            </div>
          )}

          {/* ===== H2H ACCEPT/DECLINE BUTTONS ===== */}
          {isAwaitingAccept && (
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDecline?.();
                }}
                className="flex-1 py-3 rounded-[4px] border border-white/30 bg-transparent hover:bg-white/10 transition-colors"
              >
                <span className="text-[10px] font-semibold text-white font-montserrat">
                  DECLINE
                </span>
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.();
                }}
                className="flex-1 py-3 rounded-[4px] bg-sb-purple hover:bg-sb-purple/90 transition-colors"
              >
                <span className="text-[10px] font-semibold text-white font-montserrat">
                  ACCEPT ({optionLabels.negative})
                </span>
              </button>
            </div>
          )}

          {/* ===== H2H WAITING STATE ===== */}
          {isPendingAccept && (
            <div className="flex">
              <div className="flex-1 py-3 rounded-[4px] border border-white/30 bg-transparent text-center">
                <span className="text-[10px] font-semibold text-white font-montserrat">
                  Waiting for Opponent
                </span>
              </div>
            </div>
          )}

          {/* Your Pick Display */}
          {yourPick && !isAwaitingAccept && (
            <div className="flex items-center justify-between mt-2">
              <span className={`text-[10px] ${accentColor} font-montserrat`}>
                Your Pick: {yourPick}
              </span>
              <ChevronUp className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
