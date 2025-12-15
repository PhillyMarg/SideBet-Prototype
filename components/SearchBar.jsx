export default function SearchBar({
  placeholder = 'Search...',
  value = '',
  onChange
}) {
  return (
    <div className="px-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(255,255,255,0.05)] rounded-lg">
        <svg
          className="w-4 h-4 text-[#f37736] flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white placeholder-[#666666] focus:outline-none"
        />
      </div>
    </div>
  );
}
