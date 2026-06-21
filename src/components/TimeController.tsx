import { Play, Pause, SkipBack, SkipForward, RotateCcw, Gauge } from 'lucide-react';
import { getEraName, getWarImpact, getCurrentWar, warEvents } from '@/data/networkSimulation';

interface TimeControllerProps {
  currentYear: number;
  minYear: number;
  maxYear: number;
  isPlaying: boolean;
  speed: number;
  onYearChange: (year: number) => void;
  onPlayToggle: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
}

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5x' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 5, label: '5x' },
];

export default function TimeController({
  currentYear,
  minYear,
  maxYear,
  isPlaying,
  speed,
  onYearChange,
  onPlayToggle,
  onSpeedChange,
  onReset,
}: TimeControllerProps) {
  const eraName = getEraName(currentYear);
  const warImpact = getWarImpact(currentYear);
  const currentWar = getCurrentWar(currentYear);
  const progress = ((currentYear - minYear) / (maxYear - minYear)) * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    onYearChange(year);
  };

  const skipBackward = () => {
    const newYear = Math.max(minYear, currentYear - 5);
    onYearChange(newYear);
  };

  const skipForward = () => {
    const newYear = Math.min(maxYear, currentYear + 5);
    onYearChange(newYear);
  };

  return (
    <div className="bg-paper-100/90 backdrop-blur-sm rounded-sm border border-paper-300/60 shadow-paper p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="font-serif text-2xl text-ink-700 font-bold tabular-nums">
            {currentYear}
          </div>
          <div
            className="px-2 py-1 rounded-sm text-xs font-body"
            style={{
              backgroundColor: currentWar ? 'rgba(139, 0, 0, 0.15)' : 'rgba(184, 134, 11, 0.15)',
              color: currentWar ? '#8b0000' : '#b8860b',
            }}
          >
            {eraName}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-2 rounded-sm border border-paper-300/40 text-paper-600 hover:bg-paper-200/50 transition-colors"
            title="重置"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={currentYear}
          onChange={handleSliderChange}
          className="w-full h-2 appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #b8860b 0%, #b8860b ${progress}%, #e5d9c3 ${progress}%, #e5d9c3 100%)`,
            borderRadius: '2px',
          }}
        />

        <div className="flex justify-between mt-2">
          {warEvents.map((war) => {
            const leftPos = ((war.startYear - minYear) / (maxYear - minYear)) * 100;
            const width = ((war.endYear - war.startYear) / (maxYear - minYear)) * 100;
            return (
              <div
                key={war.id}
                className="absolute top-0 h-2 pointer-events-none"
                style={{
                  left: `${leftPos}%`,
                  width: `${width}%`,
                  backgroundColor: 'rgba(139, 0, 0, 0.4)',
                  borderRadius: '1px',
                }}
                title={war.name}
              />
            );
          })}
        </div>

        <div className="flex justify-between mt-1 text-[10px] font-body text-paper-500 tabular-nums">
          <span>{minYear}</span>
          <span>1900</span>
          <span>1914</span>
          <span>1939</span>
          <span>{maxYear}</span>
        </div>
      </div>

      {currentWar && (
        <div className="mb-4 p-3 rounded-sm bg-red-900/10 border border-red-900/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-800 font-body text-sm font-semibold">⚔ {currentWar.name}</span>
          </div>
          <p className="font-body text-xs text-paper-600 leading-relaxed">
            {currentWar.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-body text-[10px] text-paper-500">破坏程度：</span>
            <div className="flex-1 h-1.5 bg-paper-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-700 rounded-full transition-all duration-500"
                style={{ width: `${warImpact * 100}%` }}
              />
            </div>
            <span className="font-body text-[10px] text-red-700 tabular-nums">
              {Math.round(warImpact * 100)}%
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={skipBackward}
            className="p-2 rounded-sm border border-paper-300/40 text-paper-600 hover:bg-paper-200/50 transition-colors"
            title="后退5年"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={onPlayToggle}
            className="p-3 rounded-sm border border-gold-500/40 bg-gold-500/10 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300"
            title={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            onClick={skipForward}
            className="p-2 rounded-sm border border-paper-300/40 text-paper-600 hover:bg-paper-200/50 transition-colors"
            title="前进5年"
          >
            <SkipForward size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Gauge size={14} className="text-paper-500" />
          <div className="flex items-center gap-1">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSpeedChange(opt.value)}
                className={`px-2 py-1 text-[10px] font-body rounded-sm transition-colors ${
                  speed === opt.value
                    ? 'bg-gold-500 text-paper-100'
                    : 'bg-paper-200/50 text-paper-600 hover:bg-paper-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
