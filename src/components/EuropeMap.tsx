import { useMemo, useState } from 'react';
import { CulturalConnection } from '@/types';
import { places, culturalConnections, getPlaceById } from '@/data/places';

interface EuropeMapProps {
  selectedPlaceId: string | null;
  onPlaceSelect: (id: string | null) => void;
  eraFilter: string | null;
}

const connectionTypeColors: Record<CulturalConnection['type'], string> = {
  literary: '#6b5639',
  artistic: '#8b6914',
  musical: '#a67d4d',
  philosophical: '#5f4521',
  historical: '#d4a017',
};

const connectionTypeLabels: Record<CulturalConnection['type'], string> = {
  literary: '文学',
  artistic: '艺术',
  musical: '音乐',
  philosophical: '哲学',
  historical: '历史',
};

export default function EuropeMap({
  selectedPlaceId,
  onPlaceSelect,
  eraFilter,
}: EuropeMapProps) {
  const [hoveredConnectionId, setHoveredConnectionId] = useState<string | null>(null);

  const visibleConnections = useMemo(() => {
    if (!eraFilter) return culturalConnections;
    return culturalConnections.filter((c) =>
      c.chapterIds.includes(eraFilter)
    );
  }, [eraFilter]);

  const visiblePlaceIds = useMemo(() => {
    const ids = new Set<string>();
    visibleConnections.forEach((c) => {
      ids.add(c.from);
      ids.add(c.to);
    });
    if (selectedPlaceId) ids.add(selectedPlaceId);
    places.forEach((p) => {
      if (!eraFilter || p.chapterIds.includes(eraFilter)) {
        ids.add(p.id);
      }
    });
    return ids;
  }, [visibleConnections, selectedPlaceId, eraFilter]);

  const selectedConnections = useMemo(() => {
    if (!selectedPlaceId) return [];
    return visibleConnections.filter(
      (c) => c.from === selectedPlaceId || c.to === selectedPlaceId
    );
  }, [selectedPlaceId, visibleConnections]);

  const isConnectionHighlighted = (connId: string) => {
    if (hoveredConnectionId === connId) return true;
    if (!selectedPlaceId) return false;
    return selectedConnections.some((c) => c.id === connId);
  };

  const isPlaceHighlighted = (placeId: string) => {
    if (placeId === selectedPlaceId) return true;
    if (!selectedPlaceId) return false;
    return selectedConnections.some(
      (c) => c.from === placeId || c.to === placeId
    );
  };

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 -100 1000 1000"
        className="w-full h-full"
        style={{ maxHeight: '75vh' }}
      >
        <defs>
          <filter id="paperTexture" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="5"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.60
                      0 0 0 0 0.46
                      0 0 0 0 0.22
                      0 0 0 0.08 0"
              result="coloredNoise"
            />
          </filter>

          <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8dcc0" />
            <stop offset="50%" stopColor="#e0d2b0" />
            <stop offset="100%" stopColor="#d4c498" />
          </linearGradient>

          <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5ead0" />
            <stop offset="50%" stopColor="#eadfbf" />
            <stop offset="100%" stopColor="#dccfa8" />
          </linearGradient>

          <filter id="landShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation="6"
              floodColor="#3a2a06"
              floodOpacity="0.15"
            />
          </filter>

          <radialGradient id="placeHighlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4a017" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
          </radialGradient>

          <pattern
            id="compassRose"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          />

          {Object.entries(connectionTypeColors).map(([type, color]) => (
            <linearGradient
              key={type}
              id={`conn-gradient-${type}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="50%" stopColor={color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={color} stopOpacity="0.2" />
            </linearGradient>
          ))}
        </defs>

        {/* Sea / Background */}
        <rect x="-100" y="-100" width="1200" height="1100" fill="url(#seaGradient)" />
        <rect
          x="-100"
          y="-100"
          width="1200"
          height="1100"
          filter="url(#paperTexture)"
          opacity="0.6"
        />

        {/* Decorative vintage border lines */}
        <g stroke="#b89752" strokeWidth="1" opacity="0.3" fill="none">
          <rect x="20" y="-80" width="960" height="960" rx="4" />
          <rect x="30" y="-70" width="940" height="940" rx="2" opacity="0.5" />
        </g>

        {/* Simplified Europe landmass - stylized vintage map look */}
        <g filter="url(#landShadow)">
          {/* British Isles */}
          <path
            d="M150,150 Q180,120 250,130 Q290,140 295,190 Q300,240 270,280 Q250,310 210,305 Q170,300 155,260 Q135,220 150,150 Z
               M180,300 Q200,280 230,310 Q250,350 220,390 Q190,410 170,380 Q155,350 180,300 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* France / Benelux / Western Europe */}
          <path
            d="M290,250 Q320,230 370,240 Q430,245 450,270 Q470,300 480,340
               Q485,380 460,420 Q430,470 390,480 Q340,490 310,460
               Q280,430 275,380 Q270,330 290,250 Z
               M340,180 Q370,170 400,190 Q430,210 430,240
               Q400,240 370,240 Q340,235 340,180 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Iberian Peninsula */}
          <path
            d="M180,420 Q220,410 270,430 Q310,450 320,490
               Q325,530 290,560 Q250,580 200,570
               Q160,555 150,515 Q145,470 180,420 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Germany / Central Europe */}
          <path
            d="M430,160 Q490,150 550,165 Q610,185 625,225
               Q640,270 620,310 Q595,345 550,355
               Q500,365 475,340 Q455,310 450,275
               Q445,235 430,160 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Poland / Eastern Europe */}
          <path
            d="M620,190 Q680,180 740,200 Q790,220 800,270
               Q810,320 770,350 Q720,370 670,360
               Q630,350 620,310 Q615,260 620,190 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Austria / Hungary / Balkans */}
          <path
            d="M550,330 Q620,340 680,365 Q730,395 720,440
               Q710,485 660,505 Q600,520 555,500
               Q510,480 500,440 Q490,400 500,365
               Q515,345 550,330 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Italian Peninsula */}
          <path
            d="M450,380 Q500,370 520,400 Q540,440 530,490
               Q520,540 490,580 Q465,605 445,580
               Q430,540 430,490 Q425,440 440,400 Q445,385 450,380 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Scandinavia */}
          <path
            d="M350,30 Q420,20 480,50 Q540,90 530,150
               Q520,200 475,205 Q430,210 400,180
               Q370,150 360,110 Q350,70 350,30 Z
               M250,50 Q320,40 360,80 Q380,120 360,170
               Q340,210 300,215 Q260,220 245,180
               Q230,140 240,95 Q245,70 250,50 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* European Russia (west) */}
          <path
            d="M740,80 Q850,60 920,120 Q980,190 970,280
               Q960,370 900,420 Q830,460 770,420
               Q730,390 740,340 Q750,280 750,210
               Q750,140 740,80 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity="0.7"
          />

          {/* Greece / Mediterranean */}
          <path
            d="M580,500 Q630,490 660,520 Q680,555 660,590
               Q635,620 595,615 Q560,605 555,570
               Q550,535 570,510 Q575,503 580,500 Z"
            fill="url(#landGradient)"
            stroke="#8b6914"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>

        {/* Vintage mountain decorations */}
        <g fill="#8b6914" opacity="0.15">
          <path d="M700,150 l20,-35 l20,35 Z M745,155 l15,-28 l15,28 Z" />
          <path d="M820,200 l25,-40 l25,40 Z" />
          <path d="M380,110 l15,-25 l15,25 Z M415,115 l12,-20 l12,20 Z" />
          <path d="M560,480 l30,-45 l30,45 Z" />
        </g>

        {/* Vintage river decorations */}
        <g
          stroke="#5c440c"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        >
          <path d="M500,180 Q510,230 520,280 Q530,330 540,380" strokeDasharray="4 2" />
          <path d="M350,280 Q370,330 400,370 Q430,410 460,450" strokeDasharray="4 2" />
          <path d="M280,200 Q260,260 240,310 Q220,360 200,400" strokeDasharray="4 2" />
        </g>

        {/* Cultural Connections - Curved lines */}
        <g>
          {visibleConnections.map((conn) => {
            const from = getPlaceById(conn.from);
            const to = getPlaceById(conn.to);
            if (!from || !to) return null;

            const highlighted = isConnectionHighlighted(conn.id);
            const midX = (from.coordinates.x + to.coordinates.x) / 2;
            const midY = (from.coordinates.y + to.coordinates.y) / 2 - 40;
            const curveOpacity = highlighted ? 0.95 : 0.55;
            const strokeWidth = highlighted ? 2.5 : 1.5;

            return (
              <g key={conn.id}>
                {/* Glow line */}
                {highlighted && (
                  <path
                    d={`M ${from.coordinates.x} ${from.coordinates.y}
                        Q ${midX} ${midY} ${to.coordinates.x} ${to.coordinates.y}`}
                    stroke={connectionTypeColors[conn.type]}
                    strokeWidth={strokeWidth + 6}
                    fill="none"
                    opacity="0.2"
                    strokeLinecap="round"
                  />
                )}
                {/* Main connection line */}
                <path
                  d={`M ${from.coordinates.x} ${from.coordinates.y}
                      Q ${midX} ${midY} ${to.coordinates.x} ${to.coordinates.y}`}
                  stroke={`url(#conn-gradient-${conn.type})`}
                  strokeWidth={strokeWidth}
                  fill="none"
                  opacity={curveOpacity}
                  strokeLinecap="round"
                  strokeDasharray={conn.type === 'historical' ? '8 4' : 'none'}
                  onMouseEnter={() => setHoveredConnectionId(conn.id)}
                  onMouseLeave={() => setHoveredConnectionId(null)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                />
                {/* Animated flow dot on highlighted connections */}
                {highlighted && (
                  <circle r="4" fill={connectionTypeColors[conn.type]}>
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      path={`M ${from.coordinates.x} ${from.coordinates.y}
                             Q ${midX} ${midY} ${to.coordinates.x} ${to.coordinates.y}`}
                    />
                  </circle>
                )}
                {/* Hover tooltip for connection */}
                {hoveredConnectionId === conn.id && (
                  <g>
                    <rect
                      x={midX - 90}
                      y={midY - 32}
                      width="180"
                      height="44"
                      rx="4"
                      fill="#fef6e6"
                      stroke="#b89752"
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    <text
                      x={midX}
                      y={midY - 16}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill="#4a3823"
                      fontFamily="Cinzel, Georgia, serif"
                    >
                      {connectionTypeLabels[conn.type]} · {conn.era}
                    </text>
                    <text
                      x={midX}
                      y={midY - 3}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#5c440c"
                      fontFamily="Crimson Pro, Georgia, serif"
                    >
                      {from.name} ↔ {to.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* City markers */}
        <g>
          {places.map((place) => {
            const isVisible = visiblePlaceIds.has(place.id);
            const isEuropean = place.id !== 'place-brooklyn' && place.id !== 'place-rio';
            if (!isVisible) return null;

            const highlighted = isPlaceHighlighted(place.id);
            const isSelected = place.id === selectedPlaceId;
            const { x, y } = place.coordinates;

            return (
              <g
                key={place.id}
                onClick={() => onPlaceSelect(isSelected ? null : place.id)}
                style={{
                  cursor: 'pointer',
                  opacity: eraFilter && !place.chapterIds.includes(eraFilter) ? 0.4 : 1,
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Highlight halo for selected/highlighted */}
                {(highlighted || isSelected) && (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r="30"
                      fill="url(#placeHighlight)"
                    >
                      <animate
                        attributeName="r"
                        values="22;34;22"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0.2;0.5"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}

                {/* Outer ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 14 : 11}
                  fill="#fef6e6"
                  stroke={isSelected ? '#d4a017' : '#8b6914'}
                  strokeWidth={isSelected ? 3 : 2}
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Inner dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 7 : 5}
                  fill={isSelected ? '#d4a017' : '#5f4521'}
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Star symbol in selected */}
                {isSelected && (
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="9"
                    fill="#fef6e6"
                    fontWeight="bold"
                  >
                    ✦
                  </text>
                )}

                {/* City label */}
                <g transform={`translate(${x}, ${y + 22})`}>
                  <rect
                    x="-42"
                    y="-10"
                    width="84"
                    height="20"
                    rx="3"
                    fill={isSelected ? '#d4a017' : '#fef6e6'}
                    opacity="0.92"
                    stroke={isSelected ? '#8b6914' : '#b89752'}
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={isSelected ? 600 : 500}
                    fill={isSelected ? '#fef6e6' : '#3a2a06'}
                    fontFamily="Cinzel, Georgia, serif"
                    letterSpacing="0.05em"
                  >
                    {place.name}
                  </text>
                </g>

                {/* Non-European indicator line */}
                {!isEuropean && (
                  <line
                    x1={x}
                    y1={y + 36}
                    x2={x}
                    y2={y + 60}
                    stroke="#8b6914"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.5"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Compass Rose */}
        <g transform="translate(900, -20)">
          <circle r="28" fill="#fef6e6" stroke="#8b6914" strokeWidth="1" opacity="0.8" />
          <circle r="22" fill="none" stroke="#b89752" strokeWidth="0.5" opacity="0.6" />
          <polygon points="0,-22 5,-5 0,-10 -5,-5" fill="#8b6914" />
          <polygon points="0,22 5,5 0,10 -5,5" fill="#b89752" />
          <polygon points="-22,0 -5,5 -10,0 -5,-5" fill="#b89752" />
          <polygon points="22,0 5,5 10,0 5,-5" fill="#b89752" />
          <text y="-12" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#5f4521" fontFamily="Cinzel, serif">
            N
          </text>
          <text y="18" textAnchor="middle" fontSize="7" fill="#5f4521" fontFamily="Cinzel, serif">
            S
          </text>
          <text x="14" y="3" textAnchor="middle" fontSize="7" fill="#5f4521" fontFamily="Cinzel, serif">
            E
          </text>
          <text x="-14" y="3" textAnchor="middle" fontSize="7" fill="#5f4521" fontFamily="Cinzel, serif">
            W
          </text>
        </g>

        {/* Title Cartouche */}
        <g transform="translate(60, -50)">
          <rect
            x="0"
            y="0"
            width="280"
            height="60"
            rx="4"
            fill="#fef6e6"
            stroke="#8b6914"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <rect
            x="5"
            y="5"
            width="270"
            height="50"
            rx="2"
            fill="none"
            stroke="#b89752"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <text
            x="140"
            y="24"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#3a2a06"
            fontFamily="Cinzel, Georgia, serif"
            letterSpacing="0.15em"
          >
            昨 日 地 图
          </text>
          <text
            x="140"
            y="42"
            textAnchor="middle"
            fontSize="9"
            fill="#5f4521"
            fontFamily="Crimson Pro, Georgia, serif"
            fontStyle="italic"
          >
            Europa · Mappa Memoriae · 1881 — 1942
          </text>
        </g>

        {/* Legend */}
        <g transform="translate(40, 820)">
          <rect
            x="0"
            y="0"
            width="220"
            height="92"
            rx="4"
            fill="#fef6e6"
            stroke="#8b6914"
            strokeWidth="1"
            opacity="0.9"
          />
          <text
            x="110"
            y="18"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#3a2a06"
            fontFamily="Cinzel, Georgia, serif"
            letterSpacing="0.1em"
          >
            文 化 连 接
          </text>
          {Object.entries(connectionTypeLabels).map(([type, label], i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const x = 15 + col * 105;
            const y = 34 + row * 20;
            return (
              <g key={type}>
                <line
                  x1={x}
                  y1={y}
                  x2={x + 18}
                  y2={y}
                  stroke={connectionTypeColors[type as CulturalConnection['type']]}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={type === 'historical' ? '5 3' : 'none'}
                />
                <text
                  x={x + 24}
                  y={y + 3}
                  fontSize="9"
                  fill="#4a3823"
                  fontFamily="Crimson Pro, Georgia, serif"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
