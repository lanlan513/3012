import { useState, useRef, useEffect, useMemo } from 'react';
import { TimelineEntry, WarEra } from '@/types';

const ERA_RANGES: { era: WarEra; start: number; end: number; color: string; label: string }[] = [
  { era: 'pre-war', start: 1881, end: 1914, color: 'from-gold-400 to-amber-500', label: '太平盛世' },
  { era: 'war', start: 1914, end: 1918, color: 'from-red-400 to-red-600', label: '一战烽火' },
  { era: 'interwar', start: 1918, end: 1933, color: 'from-blue-400 to-blue-600', label: '短暂和平' },
  { era: 'wwii', start: 1933, end: 1945, color: 'from-gray-500 to-gray-700', label: '黑暗深渊' },
];

const TRACK_COLORS: Record<string, { bg: string; border: string; text: string; dot: string; label: string }> = {
  personal: {
    bg: 'bg-amber-50/60',
    border: 'border-amber-400/40',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
    label: '人生',
  },
  historical: {
    bg: 'bg-rose-50/60',
    border: 'border-rose-400/40',
    text: 'text-rose-800',
    dot: 'bg-rose-500',
    label: '历史',
  },
  cultural: {
    bg: 'bg-sky-50/60',
    border: 'border-sky-400/40',
    text: 'text-sky-800',
    dot: 'bg-sky-500',
    label: '文化',
  },
};

interface InteractiveTimelineProps {
  entries: TimelineEntry[];
  birthYear: number;
  deathYear: number;
  onEraChange: (era: WarEra, year: number) => void;
  onYearChange: (year: number) => void;
}

export default function InteractiveTimeline({
  entries,
  birthYear,
  deathYear,
  onEraChange,
  onYearChange,
}: InteractiveTimelineProps) {
  const [selectedYear, setSelectedYear] = useState<number>(Math.max(birthYear, 1895));
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredEntry, setHoveredEntry] = useState<number | null>(null);

  const minYear = 1881;
  const maxYear = 1945;
  const totalYears = maxYear - minYear;

  useEffect(() => {
    const year = Math.max(Math.min(selectedYear, deathYear), birthYear);
    onYearChange(year);

    const matchedEra = ERA_RANGES.find(
      (e) => year >= e.start && year < e.end
    ) || ERA_RANGES[ERA_RANGES.length - 1];
    onEraChange(matchedEra.era, year);
  }, [selectedYear, birthYear, deathYear, onEraChange, onYearChange]);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => a.year - b.year),
    [entries]
  );

  const yearToPercent = (year: number) => {
    return ((year - minYear) / totalYears) * 100;
  };

  const percentToYear = (percent: number) => {
    return Math.round(minYear + (percent / 100) * totalYears);
  };

  const handleTrackInteraction = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSelectedYear(percentToYear(percent));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleTrackInteraction(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      handleTrackInteraction(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleTrackInteraction(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleTrackInteraction(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const birthPercent = yearToPercent(birthYear);
  const deathPercent = yearToPercent(deathYear);
  const selectedPercent = yearToPercent(selectedYear);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
        <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
          人 生 时 光 轴
        </h3>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
      </div>

      <div className="mb-4 flex items-center justify-end gap-4 flex-wrap">
        {Object.entries(TRACK_COLORS).map(([key, colors]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
            <span className="text-xs font-body text-paper-600">{colors.label}</span>
          </div>
        ))}
      </div>

      <div className="relative px-2 md:px-4 mb-6">
        <div className="flex justify-between mb-2">
          {ERA_RANGES.map((e, idx) => (
            <div
              key={idx}
              className="flex-1 text-center border-l first:border-l-0 border-paper-300/40 px-1"
            >
              <span className="text-[10px] font-decorative tracking-wider text-paper-500">
                {e.label}
              </span>
            </div>
          ))}
        </div>

        <div
          ref={trackRef}
          className="relative h-28 md:h-32 cursor-pointer select-none touch-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute inset-x-0 top-12 md:top-14 h-2 bg-paper-300/40 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${
                ERA_RANGES[0].color
              }`}
              style={{ width: `${yearToPercent(1914)}%` }}
            />
            <div
              className={`absolute top-0 h-full bg-gradient-to-r ${ERA_RANGES[1].color}`}
              style={{
                left: `${yearToPercent(1914)}%`,
                width: `${yearToPercent(1918) - yearToPercent(1914)}%`,
              }}
            />
            <div
              className={`absolute top-0 h-full bg-gradient-to-r ${ERA_RANGES[2].color}`}
              style={{
                left: `${yearToPercent(1918)}%`,
                width: `${yearToPercent(1933) - yearToPercent(1918)}%`,
              }}
            />
            <div
              className={`absolute top-0 h-full bg-gradient-to-r ${ERA_RANGES[3].color}`}
              style={{
                left: `${yearToPercent(1933)}%`,
                width: `${100 - yearToPercent(1933)}%`,
              }}
            />

            <div
              className="absolute top-0 h-full bg-white/25"
              style={{
                left: `${birthPercent}%`,
                width: `${deathPercent - birthPercent}%`,
              }}
            />
          </div>

          <div
            className="absolute top-12 md:top-14 -translate-x-1/2 w-1 h-6 bg-ink-400/50 z-10"
            style={{ left: `${birthPercent}%` }}
          >
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-serif tabular-nums text-paper-500 whitespace-nowrap">
              生 {birthYear}
            </div>
          </div>
          <div
            className="absolute top-12 md:top-14 -translate-x-1/2 w-1 h-6 bg-ink-400/50 z-10"
            style={{ left: `${deathPercent}%` }}
          >
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-serif tabular-nums text-paper-500 whitespace-nowrap">
              殁 {deathYear}
            </div>
          </div>

          {sortedEntries.map((entry, idx) => {
            const colors = TRACK_COLORS[entry.track];
            const percent = yearToPercent(entry.year);
            const row = idx % 3;
            const topPos =
              entry.track === 'personal'
                ? 8
                : entry.track === 'historical'
                  ? 28
                  : 48;
            const isHovered = hoveredEntry === idx;
            return (
              <div
                key={idx}
                className="absolute -translate-x-1/2 z-20"
                style={{ left: `${percent}%`, top: `${topPos}px` }}
                onMouseEnter={() => setHoveredEntry(idx)}
                onMouseLeave={() => setHoveredEntry(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedYear(entry.year);
                }}
              >
                <button
                  type="button"
                  className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full ${colors.dot} border-2 border-paper-100 shadow-paper transition-all duration-200 hover:scale-150 ${
                    selectedYear === entry.year ? 'scale-150 ring-2 ring-offset-1 ring-offset-paper-100 ring-white/50' : ''
                  }`}
                  title={`${entry.year}: ${entry.title}`}
                />
                {isHovered && (
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 md:w-56 p-3 rounded-sm shadow-paper-lg border ${colors.bg} ${colors.border} z-50 pointer-events-none`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`font-serif text-xs tabular-nums font-bold ${colors.text}`}>
                        {entry.year}
                      </span>
                      <span className="text-paper-300 text-xs">·</span>
                      <span className={`text-[10px] font-decorative tracking-wider ${colors.text}`}>
                        {colors.label}
                      </span>
                    </div>
                    <div className={`font-serif text-sm leading-snug ${colors.text}`}>
                      {entry.title}
                    </div>
                    <div className="mt-1.5 font-body text-[11px] text-paper-600 leading-relaxed line-clamp-2">
                      {entry.description}
                    </div>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 border-r border-b ${colors.border} ${colors.bg}`}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div
            className="absolute top-0 bottom-0 -translate-x-1/2 z-30 pointer-events-none"
            style={{ left: `${selectedPercent}%` }}
          >
            <div className="absolute top-12 md:top-14 -translate-y-1/2 -translate-x-1/2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-ink-800 border-2 border-white shadow-paper-lg flex items-center justify-center">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gold-400 animate-pulse" />
            </div>
            <div
              className="absolute top-12 md:top-14 left-1/2 -translate-x-1/2 w-px"
              style={{
                height: '80px',
                background:
                  'linear-gradient(180deg, rgba(51, 37, 21, 0.3) 0%, rgba(51, 37, 21, 0.1) 100%)',
              }}
            />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-sm bg-ink-800 text-paper-100 text-xs font-serif tabular-nums shadow-paper whitespace-nowrap">
              {selectedYear}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 md:mt-8">
          {Array.from({ length: 7 }, (_, i) => {
            const year = minYear + i * Math.floor(totalYears / 6);
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`text-[10px] md:text-xs font-serif tabular-nums transition-colors duration-200 ${
                  selectedYear === year
                    ? 'text-gold-700 font-bold'
                    : 'text-paper-500 hover:text-paper-700'
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

      {sortedEntries.length > 0 && (
        <div className="bg-paper-100/70 rounded-sm p-4 md:p-5 border border-paper-300/40 shadow-paper relative">
          <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-30" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gold-600 text-sm">❦</span>
              <h4 className="font-serif text-base md:text-lg font-semibold text-ink-800">
                {selectedYear} 年 · 时间的印记
              </h4>
            </div>
            {(() => {
              const nearEntries = sortedEntries
                .filter((e) => Math.abs(e.year - selectedYear) <= 5)
                .slice(0, 3);
              if (nearEntries.length === 0) {
                return (
                  <p className="font-body text-sm text-paper-600 italic">
                    这一年，{selectedYear - birthYear} 岁的人生平静地流淌...
                  </p>
                );
              }
              return (
                <div className="space-y-2.5">
                  {nearEntries.map((entry, idx) => {
                    const colors = TRACK_COLORS[entry.track];
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-sm border ${colors.bg} ${colors.border} transition-all duration-200 hover:-translate-x-0.5`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 w-7 h-7 rounded-full ${colors.dot} bg-opacity-20 flex items-center justify-center border ${colors.border}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-serif text-sm font-bold ${colors.text}`}>
                                {entry.year}
                              </span>
                              <span className="text-[10px] font-decorative tracking-wider text-paper-500">
                                {colors.label}
                              </span>
                            </div>
                            <div className={`font-serif text-sm md:text-base ${colors.text} mb-1 font-semibold`}>
                              {entry.title}
                            </div>
                            <p className="font-body text-xs md:text-sm text-paper-600 leading-relaxed">
                              {entry.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-[11px] font-body text-paper-500">
        拖动上方时间轴上的金色指针，或点击标记点，探索不同年代的世界
      </p>
    </div>
  );
}
