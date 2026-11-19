export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-mm-cyan"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#9D00FF" />
            <stop offset="100%" stopColor="#FF007A" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" stroke="url(#logo-grad)" strokeWidth="2" strokeDasharray="8 4" />
        <path d="M12 24h24M24 12v24" stroke="#0F111A" strokeWidth="3" />
        <polygon points="20,20 28,20 24,28" fill="#FFE600" />
      </svg>
      {/* Hidden for layout compatibility */}
    </div>
  );
}