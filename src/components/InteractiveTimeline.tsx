import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { TimelineEntry, WarEra } from '@/types';
import { getWarEra } from '@/data/timelineEntries';

interface InteractiveTimelineProps {
  entries: TimelineEntry[];
  birthYear: number;
  deathYear: number;
  onEraChange: (era: WarEra, year: number) => void;
  onYearChange?: (year: number) => void;
}

const ERA_LABELS: Record<WarEra, string> = {
  'pre-war': '太平盛世',
  'war': '一战烽火',
  'interwar': '短暂和平',
  'wwii': '黑暗深渊',
};

const ERA_SUBLABELS: Record<WarEra, string> = {
  'pre-war': '欧洲的黄金时代，人们对进步与理性充满信心',
  'war': '战争摧毁了旧世界，理性在炮火面前不堪一击',
  'interwar': '在废墟上重建文明，但新的危机已在暗处酝酿',
  'wwii': '欧洲文明最后的崩塌，昨日的世界从此消逝',
};

const ERA_COLORS: Record<WarEra, {
  bg: string;
  border: string;
  text: string;
  glow: string;
  track: string;
  dot: string;
  accent: string;
}> = {
  'pre-war': {
    bg: 'from-paper-50 via-amber-50/40 to-paper-100',
    border: 'border-gold-400/60',
    text: 'text-gold-700',
    glow: 'shadow-[0_0_60px_rgba(212,160,23,0.2),0_20px_60px_rgba(212,160,23,0.1)]',
    track: 'bg-gradient-to-r from-gold-400/40 via-gold-500/50 to-gold-400/40',
    dot: 'bg-gold-500',
    accent: 'bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400',
  },
  'war': {
    bg: 'from-red-50/60 via-paper-100 to-red-50/40',
    border: 'border-red-500/50',
    text: 'text-red-800',
    glow: 'shadow-[0_0_60px_rgba(220,38,38,0.2),0_20px_60px_rgba(220,38,38,0.1)]',
    track: 'bg-gradient-to-r from-red-400/40 via-red-600/50 to-red-400/40',
    dot: 'bg-red-600',
    accent: 'bg-gradient-to-r from-red-500 via-red-700 to-red-500',
  },
  'interwar': {
    bg: 'from-paper-50 via-blue-50/30 to-paper-100',
    border: 'border-blue-400/40',
    text: 'text-blue-800',
    glow: 'shadow-[0_0_60px_rgba(59,130,246,0.15),0_20px_60px_rgba(59,130,246,0.08)]',
    track: 'bg-gradient-to-r from-blue-400/35 via-blue-500/45 to-blue-400/35',
    dot: 'bg-blue-600',
    accent: 'bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400',
  },
  'wwii': {
    bg: 'from-gray-100/80 via-gray-200/60 to-gray-100/80',
    border: 'border-gray-600/50',
    text: 'text-gray-800',
    glow: 'shadow-[0_0_60px_rgba(0,0,0,0.25),0_20px_60px_rgba(0,0,0,0.15)]',
    track: 'bg-gradient-to-r from-gray-500/40 via-gray-700/50 to-gray-500/40',
    dot: 'bg-gray-800',
    accent: 'bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600',
  },
};

const TRACK_CONFIG = {
  personal: {
    label: '人生轨迹',
    icon: '✦',
    color: 'bg-amber-600',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-500/40',
    cardBg: 'bg-amber-50/60',
  },
  historical: {
    label: '历史风云',
    icon: '⚔',
    color: 'bg-rose-600',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-500/40',
    cardBg: 'bg-rose-50/60',
  },
  cultural: {
    label: '文化脉搏',
    icon: '❧',
    color: 'bg-sky-600',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-500/40',
    cardBg: 'bg-sky-50/60',
  },
};

const ERA_ICONS: Record<WarEra, string> = {
  'pre-war': '✦',
  'war': '⚔',
  'interwar': '❧',
  'wwii': '✝',
};

export default function InteractiveTimeline({
  entries,
  birthYear,
  deathYear,
  onEraChange,
  onYearChange,
}: InteractiveTimelineProps) {
  const [activeYear, setActiveYear] = useState(birthYear);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredEntry, setHoveredEntry] = useState<TimelineEntry | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const yearRange = useMemo(
    () => ({
      start: Math.min(birthYear, ...entries.map((e) => e.year)) - 3,
      end: Math.max(deathYear, ...entries.map((e) => e.year)) + 3,
    }),
    [birthYear, deathYear, entries]
  );

  const currentEra = getWarEra(activeYear);

  const getYearFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return activeYear;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(yearRange.start + ratio * (yearRange.end - yearRange.start));
    },
    [yearRange, activeYear]
  );

  const handleMove = useCallback(
    (clientX: number) => {
      const year = getYearFromPosition(clientX);
      setActiveYear(year);
      onEraChange(getWarEra(year), year);
      onYearChange?.(year);
    },
    [getYearFromPosition, onEraChange, onYearChange]
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => setIsDragging(false);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => setIsDragging(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const newYear = Math.max(yearRange.start, activeYear - 1);
        setActiveYear(newYear);
        onEraChange(getWarEra(newYear), newYear);
        onYearChange?.(newYear);
      } else if (e.key === 'ArrowRight') {
        const newYear = Math.min(yearRange.end, activeYear + 1);
        setActiveYear(newYear);
        onEraChange(getWarEra(newYear), newYear);
        onYearChange?.(newYear);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isDragging, handleMove, activeYear, yearRange, onEraChange, onYearChange]);

  useEffect(() => {
    onEraChange(currentEra, activeYear);
    onYearChange?.(activeYear);
  }, []);

  const scrubberPosition = ((activeYear - yearRange.start) / (yearRange.end - yearRange.start)) * 100;

  const sortedEntries = useMemo(() => [...entries].sort((a, b) => a.year - b.year), [entries]);

  const filteredEntries = useMemo(() => {
    return sortedEntries.filter((e) => Math.abs(e.year - activeYear) <= 5);
  }, [sortedEntries, activeYear]);

  const eraColors = ERA_COLORS[currentEra];

  const warZones = useMemo(
    () => [
      { start: 1914, end: 1918, era: 'war' as WarEra, label: '一战' },
      { start: 1939, end: 1945, era: 'wwii' as WarEra, label: '二战' },
    ],
    []
  );

  const decadeMarkers = useMemo(() => {
    const markers: number[] = [];
    const startDecade = Math.floor(yearRange.start / 10) * 10;
    const endDecade = Math.ceil(yearRange.end / 10) * 10;
    for (let y = startDecade; y <= endDecade; y += 10) {
      if (y >= yearRange.start && y <= yearRange.end) {
        markers.push(y);
      }
    }
    return markers;
  }, [yearRange]);

  const birthDeathMarkers = useMemo(
    () => [
      { year: birthYear, label: '出生', type: 'birth' as const },
      { year: deathYear, label: '逝世', type: 'death' as const },
    ],
    [birthYear, deathYear]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1 : -1;
      const newYear = Math.max(yearRange.start, Math.min(yearRange.end, activeYear + delta));
      setActiveYear(newYear);
      onEraChange(getWarEra(newYear), newYear);
      onYearChange?.(newYear);
    },
    [activeYear, yearRange, onEraChange, onYearChange]
  );

  const yearColors = ERA_COLORS[currentEra];

  const lifeStageText =
    activeYear < birthYear
      ? '降生前'
      : activeYear > deathYear
      ? '逝世后'
      : `${activeYear - birthYear} 岁 · 人生的第 ${Math.round(
          ((activeYear - birthYear) / (deathYear - birthYear)) * 100
        )}% 旅程`;

  const lifePct = ((1914 - yearRange.start) / (yearRange.end - yearRange.start)) * 100;
  const wwiPct = ((1918 - 1914) / (yearRange.end - yearRange.start)) * 100;
  const interwarPct = ((1939 - 1918) / (yearRange.end - yearRange.start)) * 100;
  const wwiiPct = ((yearRange.end - 1939) / (yearRange.end - yearRange.start)) * 100;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-sm border-2 ${eraColors.border} ${eraColors.glow} overflow-hidden transition-all duration-1000`}
      tabIndex={0}
      onWheel={handleWheel}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${eraColors.bg} transition-all duration-1000`} />
      <div className="absolute inset-0 paper-bg pointer-events-none opacity-25" />

      {currentEra === 'war' && (
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04] animate-pulse"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(127,29,29,0.4) 3px, rgba(127,29,29,0.4) 4px)',
          }}
        />
      )}
      {currentEra === 'wwii' && (
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.05]"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.025) 4px, rgba(0,0,0,0.025) 5px)',
          }}
        />
      )}

      <div className="relative p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-[2px] ${yearColors.accent}`} />
              <h3 className="font-serif text-2xl md:text-3xl text-ink-700 font-semibold">时 间 长 河</h3>
              <div className={`w-12 h-[2px] ${yearColors.accent}`} />
            </div>
            <p className="font-body text-paper-600 text-sm md:text-base italic">
              拖动滑块 · 滚动滚轮 · 或使用方向键 穿梭于百年岁月
            </p>
          </div>
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-sm border ${eraColors.border} bg-white/60 backdrop-blur-sm transition-all duration-700`}
          >
            <span className={`text-2xl ${eraColors.text}`}>{ERA_ICONS[currentEra]}</span>
            <div>
              <div className={`font-decorative text-lg tracking-[0.15em] ${eraColors.text}`}>
                {ERA_LABELS[currentEra]}
              </div>
              <div className="font-body text-xs text-paper-500 max-w-[200px] leading-tight">
                {ERA_SUBLABELS[currentEra]}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="absolute -inset-8 pointer-events-none">
              <div
                className={`absolute top-1/2 left-0 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-transparent ${yearColors.accent} opacity-60`}
              />
              <div
                className={`absolute top-1/2 right-0 -translate-y-1/2 w-16 h-px bg-gradient-to-l from-transparent ${yearColors.accent} opacity-60`}
              />
            </div>
            <div
              className={`font-serif text-7xl md:text-9xl font-bold tabular-nums transition-all duration-500 ${
                currentEra === 'war'
                  ? 'text-red-900'
                  : currentEra === 'wwii'
                  ? 'text-gray-900'
                  : 'text-ink-800'
              }`}
            >
              {activeYear}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className={`inline-block w-2 h-2 rounded-full ${eraColors.dot} animate-pulse`} />
            <div className="font-body text-paper-600 text-base md:text-lg">{lifeStageText}</div>
            <span className={`inline-block w-2 h-2 rounded-full ${eraColors.dot} animate-pulse`} />
          </div>
        </div>

        <div className="mb-12">
          <div
            ref={trackRef}
            className={`relative h-28 md:h-36 cursor-grab active:cursor-grabbing select-none touch-none rounded-lg md:rounded-xl ${
              isDragging ? 'scale-[1.005]' : ''
            } transition-transform duration-200`}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 md:h-28 rounded-full overflow-hidden border border-paper-300/60 shadow-inner-paper bg-paper-200/30">
              <div className="absolute inset-0 flex">
                <div
                  className="h-full bg-gradient-to-r from-amber-200/60 via-amber-300/50 to-amber-200/60"
                  style={{ width: `${lifePct}%` }}
                />
                <div className="h-full relative overflow-hidden" style={{ width: `${wwiPct}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-300/70 via-red-500/50 to-red-300/70" />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(127,29,29,0.3) 8px, rgba(127,29,29,0.3) 16px)',
                    }}
                  />
                </div>
                <div
                  className="h-full bg-gradient-to-r from-blue-200/50 via-blue-300/40 to-blue-200/50"
                  style={{ width: `${interwarPct}%` }}
                />
                <div className="h-full relative overflow-hidden" style={{ width: `${wwiiPct}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400/60 via-gray-600/50 to-gray-400/60" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.25) 8px, rgba(0,0,0,0.25) 16px)',
                    }}
                  />
                </div>
              </div>

              <div
                className={`absolute inset-y-0 left-0 ${eraColors.track} opacity-80 transition-all duration-300 rounded-l-full`}
                style={{ width: `${scrubberPosition}%` }}
              />
            </div>

            {decadeMarkers.map((year) => {
              const pos = ((year - yearRange.start) / (yearRange.end - yearRange.start)) * 100;
              return (
                <div
                  key={year}
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{ left: `${pos}%` }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 md:h-6 bg-ink-400/50" />
                  <div className="absolute -bottom-7 md:-bottom-8 left-1/2 -translate-x-1/2 font-serif text-[10px] md:text-xs text-paper-500 tabular-nums font-medium">
                    {year}
                  </div>
                </div>
              );
            })}

            {birthDeathMarkers.map((marker) => {
              const pos = ((marker.year - yearRange.start) / (yearRange.end - yearRange.start)) * 100;
              if (pos < 0 || pos > 100) return null;
              const bgClass =
                marker.type === 'birth' ? 'bg-emerald-500/90 text-white' : 'bg-gray-600/90 text-white';
              const lineClass = marker.type === 'birth' ? 'bg-emerald-400' : 'bg-gray-400';
              return (
                <div
                  key={marker.type}
                  className="absolute top-0 bottom-0 pointer-events-none z-10"
                  style={{ left: `${pos}%` }}
                >
                  <div
                    className={`absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-sm text-[10px] font-decorative tracking-wider ${bgClass}`}
                  >
                    {marker.label}
                  </div>
                  <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-4 ${lineClass}`} />
                </div>
              );
            })}

            {warZones.map((zone) => {
              const left = ((zone.start - yearRange.start) / (yearRange.end - yearRange.start)) * 100;
              const width = ((zone.end - zone.start) / (yearRange.end - yearRange.start)) * 100;
              const zoneBg = zone.era === 'war' ? 'bg-red-600/90 text-white' : 'bg-gray-700/90 text-white';
              return (
                <div
                  key={zone.era + zone.start}
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{ left: `${left}%`, width: `${width}%` }}
                >
                  <div
                    className={`absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-sm text-[10px] md:text-xs font-decorative tracking-[0.2em] ${zoneBg} shadow-md whitespace-nowrap`}
                  >
                    {zone.label} {zone.start}—{zone.end}
                  </div>
                </div>
              );
            })}

            {sortedEntries.map((entry, i) => {
              const pos = ((entry.year - yearRange.start) / (yearRange.end - yearRange.start)) * 100;
              const isNearActive = Math.abs(entry.year - activeYear) <= 2;
              const isExact = entry.year === activeYear;
              const trackOffset =
                entry.track === 'personal' ? -28 : entry.track === 'historical' ? 0 : 28;
              const ringClass = isExact ? `ring-2 ring-offset-1 ${TRACK_CONFIG[entry.track].borderColor}` : '';
              const scaleClass = isExact
                ? 'scale-150'
                : isNearActive
                ? 'scale-110'
                : 'scale-90 opacity-60 hover:scale-100 hover:opacity-100';
              return (
                <div
                  key={`${entry.year}-${entry.track}-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-400 z-10 cursor-pointer"
                  style={{
                    left: `${pos}%`,
                    transform: `translate(-50%, calc(-50% + ${trackOffset}px))`,
                  }}
                  onMouseEnter={() => setHoveredEntry(entry)}
                  onMouseLeave={() => setHoveredEntry(null)}
                  onClick={() => {
                    setActiveYear(entry.year);
                    onEraChange(getWarEra(entry.year), entry.year);
                    onYearChange?.(entry.year);
                  }}
                >
                  <div className={`transition-all duration-300 ${scaleClass}`}>
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${TRACK_CONFIG[entry.track].color} shadow-md border-2 border-paper-100 ${ringClass} transition-all duration-300`}
                    />
                  </div>
                </div>
              );
            })}

            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-100 ${
                isDragging ? 'scale-110' : ''
              }`}
              style={{ left: `${scrubberPosition}%` }}
            >
              <div className="relative">
                <div
                  className={`absolute -inset-4 ${eraColors.text} opacity-20 animate-ping rounded-full`}
                  style={{ width: '32px', height: '32px' }}
                />
                <div
                  className={`relative w-7 h-7 md:w-8 md:h-8 rounded-full shadow-xl border-[3px] border-paper-100 ${eraColors.dot} flex items-center justify-center`}
                >
                  <div className="w-2 h-2 rounded-full bg-paper-100" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 font-serif text-sm md:text-base font-bold text-ink-700 tabular-nums bg-white/90 px-2 py-0.5 rounded shadow-md shadow-ink-900/10 border border-paper-200 whitespace-nowrap">
                  {activeYear}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs md:text-sm font-serif text-paper-500 mt-12 md:mt-14 px-1">
            <span className="font-medium tabular-nums">{yearRange.start}</span>
            <span className="font-medium tabular-nums">{yearRange.end}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          {(Object.entries(TRACK_CONFIG) as [keyof typeof TRACK_CONFIG, (typeof TRACK_CONFIG)['personal']][]).map(
            ([key, config]) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full shadow-sm ${config.color} border-2 border-paper-100`}
                />
                <span className="font-decorative text-sm md:text-base text-ink-600 tracking-wider">
                  {config.icon} {config.label}
                </span>
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 min-h-[280px]">
          {(['personal', 'historical', 'cultural'] as const).map((track) => {
            const trackEntries = filteredEntries.filter((e) => e.track === track);
            const config = TRACK_CONFIG[track];
            return (
              <div key={track} className="space-y-4">
                <div className={`flex items-center gap-3 pb-3 border-b ${config.borderColor} border-opacity-40`}>
                  <span className={`text-2xl md:text-3xl ${config.textColor}`}>{config.icon}</span>
                  <div>
                    <span className={`font-decorative text-sm md:text-base tracking-[0.15em] ${config.textColor}`}>
                      {config.label}
                    </span>
                    <div className="text-[10px] md:text-xs text-paper-400">{trackEntries.length} 条记录</div>
                  </div>
                </div>
                {trackEntries.length === 0 ? (
                  <div
                    className={`${config.cardBg} rounded-sm p-6 text-center border ${config.borderColor} border-opacity-30 min-h-[160px] flex flex-col items-center justify-center`}
                  >
                    <span className="text-4xl mb-3 opacity-30">{config.icon}</span>
                    <span className="font-serif text-paper-400 text-sm md:text-base italic">
                      此年代暂无{config.label.slice(0, 2)}记录
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {trackEntries.map((entry, i) => {
                      const distance = Math.abs(entry.year - activeYear);
                      const isActive = entry.year === activeYear;
                      const hoverClass =
                        hoveredEntry === entry
                          ? `shadow-paper-lg -translate-y-1 ${config.borderColor} border-opacity-60 ring-1`
                          : `hover:-translate-y-0.5 hover:shadow-paper border-opacity-50`;
                      const ageText =
                        entry.year < birthYear
                          ? `降生前 ${birthYear - entry.year} 年`
                          : entry.year > deathYear
                          ? `逝世后 ${entry.year - deathYear} 年`
                          : `${entry.year - birthYear} 岁`;
                      return (
                        <div
                          key={`${entry.year}-${i}`}
                          className={`relative rounded-sm p-4 md:p-5 border transition-all duration-500 cursor-pointer ${config.cardBg} ${config.borderColor} ${hoverClass}`}
                          onMouseEnter={() => setHoveredEntry(entry)}
                          onMouseLeave={() => setHoveredEntry(null)}
                          onClick={() => {
                            setActiveYear(entry.year);
                            onEraChange(getWarEra(entry.year), entry.year);
                            onYearChange?.(entry.year);
                          }}
                          style={{ opacity: 1 - distance * 0.12 }}
                        >
                          {isActive && (
                            <div
                              className={`absolute -top-2 left-4 px-2 py-0.5 rounded-sm text-[10px] font-decorative tracking-wider bg-ink-100 ${config.textColor} border ${config.borderColor}`}
                            >
                              当前年代
                            </div>
                          )}
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`font-decorative text-xs md:text-sm tracking-wider ${config.textColor}`}>
                              {entry.year}
                            </span>
                            <span className="text-paper-300">·</span>
                            <span className="text-xs text-paper-400">{ageText}</span>
                          </div>
                          <h4 className="font-serif text-base md:text-lg text-ink-800 font-semibold mb-2 leading-snug">
                            {entry.title}
                          </h4>
                          <p className="font-body text-sm md:text-base text-paper-700 leading-relaxed">
                            {entry.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-paper-300/50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {(['pre-war', 'war', 'interwar', 'wwii'] as WarEra[]).map((era) => {
                const ec = ERA_COLORS[era];
                const activeClass =
                  currentEra === era
                    ? `${ec.border} ${ec.text} bg-white/80 shadow-paper`
                    : 'border-paper-300/50 text-paper-500 hover:bg-white/50 hover:text-ink-600';
                const targetYear = era === 'pre-war' ? 1910 : era === 'war' ? 1916 : era === 'interwar' ? 1928 : 1942;
                return (
                  <button
                    key={era}
                    onClick={() => {
                      const clampedYear = Math.max(yearRange.start, Math.min(yearRange.end, targetYear));
                      setActiveYear(clampedYear);
                      onEraChange(era, clampedYear);
                      onYearChange?.(clampedYear);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all duration-300 ${activeClass}`}
                  >
                    <span>{ERA_ICONS[era]}</span>
                    <span className="font-decorative text-xs md:text-sm tracking-wider">{ERA_LABELS[era]}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap text-center">
            <div className="flex items-center gap-2 text-xs md:text-sm text-paper-500 font-body">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-paper-200/50 border border-paper-300/50">
                <kbd className="font-mono">←</kbd>
                <kbd className="font-mono">→</kbd>
              </span>
              <span>方向键切换年代</span>
            </div>
            <span className="text-paper-300">|</span>
            <div className="flex items-center gap-2 text-xs md:text-sm text-paper-500 font-body">
              <span>🖱 滚轮滚动</span>
              <span>快速浏览</span>
            </div>
            <span className="text-paper-300">|</span>
            <div className="flex items-center gap-2 text-xs md:text-sm text-paper-500 font-body">
              <span>✋ 拖拽滑块</span>
              <span>精确跳转</span>
            </div>
          </div>
        </div>
      </div>

      {currentEra === 'war' && (
        <div className="absolute inset-0 pointer-events-none border-4 border-red-500/10 rounded-sm animate-pulse duration-2000" />
      )}
      {currentEra === 'wwii' && (
        <div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2)' }}
        />
      )}
    </div>
  );
}
