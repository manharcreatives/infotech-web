/**
 * Line-art illustration for the featured service card: candidate signals
 * flow through the program core into a company node. Dashes drift
 * continuously; the core ring spins slowly.
 * Colors: official Brand Color System (purple) — no blue.
 */
export function MatchGraph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 260"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="mg-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#D56CFF" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#D56CFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#B14EFF" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="mg-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#B14EFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#B14EFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* candidate nodes */}
      {[
        { cy: 46, label: 'Resume' },
        { cy: 106, label: 'LinkedIn' },
        { cy: 166, label: 'Marketing' },
        { cy: 226, label: 'Interview' },
      ].map((n) => (
        <g key={n.label}>
          <circle cx="36" cy={n.cy} r="5" fill="#1A1027" stroke="#D56CFF" strokeWidth="1.4" />
          <circle cx="36" cy={n.cy} r="11" stroke="#37204D" strokeWidth="1" />
          <text x="56" y={n.cy + 4} fill="#8C859C" fontSize="12" letterSpacing="0.12em">
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* flowing connectors into the core */}
      {[46, 106, 166, 226].map((y) => (
        <path
          key={y}
          d={`M 47 ${y} C 150 ${y}, 180 136, 246 136`}
          stroke="url(#mg-flow)"
          strokeWidth="1.2"
          strokeDasharray="5 7"
          className="mg-dash"
        />
      ))}

      {/* program core */}
      <circle cx="278" cy="136" r="58" fill="url(#mg-core)" />
      <circle cx="278" cy="136" r="32" stroke="#D56CFF" strokeWidth="1.2" />
      <g className="origin-[278px_136px] animate-spin-slow">
        <circle
          cx="278"
          cy="136"
          r="44"
          stroke="#6F28B9"
          strokeWidth="1"
          strokeDasharray="10 14"
          opacity="0.8"
        />
      </g>
      <text x="278" y="132" textAnchor="middle" fill="#CFC8DD" fontSize="11" letterSpacing="0.2em">
        24/7
      </text>
      <text x="278" y="148" textAnchor="middle" fill="#8C859C" fontSize="9" letterSpacing="0.2em">
        TRACKED
      </text>

      {/* connector out to the company node */}
      <path
        d="M 322 136 C 380 136, 390 136, 430 136"
        stroke="url(#mg-flow)"
        strokeWidth="1.6"
        strokeDasharray="5 7"
        className="mg-dash"
      />

      {/* company node */}
      <rect x="430" y="112" width="48" height="48" rx="12" stroke="#D56CFF" strokeWidth="1.4" fill="#1A1027" />
      <path d="M 446 144 v-10 h6 v10 M 456 144 v-16 h6 v16" stroke="#B14EFF" strokeWidth="1.6" />
      <text x="454" y="176" textAnchor="middle" fill="#8C859C" fontSize="10" letterSpacing="0.16em">
        OFFER
      </text>
    </svg>
  )
}
