// Inline SVG recreation of the East Projects logo:
// arrow icon → vertical bar → "EAST PROJECTS" bold text

function EastProjectsLogo({ className = 'h-10 w-auto', dark = false }) {
  const textColor = dark ? '#ffffff' : '#0a1628'
  const accentColor = '#F05A28'

  return (
    <svg
      viewBox="0 0 260 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="East Projects"
    >
      {/* Arrow icon */}
      <g>
        {/* Main arrow body */}
        <polygon
          points="0,18 32,18 32,10 52,24 32,38 32,30 0,30"
          fill={accentColor}
        />
        {/* Inner cutout / speed lines */}
        <polygon
          points="4,22 28,22 28,19 44,24 28,29 28,26 4,26"
          fill="white"
          opacity="0.35"
        />
      </g>

      {/* Vertical divider */}
      <rect x="60" y="4" width="3" height="40" fill={textColor} rx="1.5" />

      {/* EAST text */}
      <text
        x="72"
        y="20"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="18"
        fill={textColor}
        letterSpacing="1"
      >
        EAST
      </text>

      {/* PROJECTS text */}
      <text
        x="72"
        y="41"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="18"
        fill={textColor}
        letterSpacing="1"
      >
        PROJECTS
      </text>
    </svg>
  )
}

export default EastProjectsLogo
