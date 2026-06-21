import { useState, useRef, useCallback, useEffect } from 'react';
import { ComparisonItem, ComparisonStatus } from '@/types';
import { STATUS_LABELS, STATUS_ICONS } from '@/data/dualTimeline';
import { Info, ArrowLeftRight } from 'lucide-react';

interface ComparisonSliderProps {
  item: ComparisonItem;
}

export default function ComparisonSlider({ item }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const statusInfo = STATUS_LABELS[item.status];
  const statusIcon = STATUS_ICONS[item.status];

  const handleSliderMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  }, [handleSliderMove]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleSliderMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
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
  }, [isDragging, handleSliderMove]);

  return (
    <div className={`group relative bg-paper-100/80 rounded-sm overflow-hidden shadow-paper border ${statusInfo.borderColor} transition-all duration-500 hover:shadow-paper-lg`}>
      <div className="absolute inset-0 paper-bg pointer-events-none opacity-40" />
      <div className="absolute inset-0 border border-paper-300/30 rounded-sm pointer-events-none" />
      <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-gold-500/30 z-20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-gold-500/30 z-20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-gold-500/30 z-20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-gold-500/30 z-20 pointer-events-none" />

      <div className="relative">
        <div
          ref={containerRef}
          className="relative aspect-[4/3] overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <img
            src={item.postWar.imageUrl}
            alt={`${item.name} - 战后`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 mix-blend-multiply bg-gray-200/20" />
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-gray-900/70 text-white text-xs font-decorative tracking-wider backdrop-blur-sm rounded-sm">
            {item.postWar.year} · 战后
          </div>

          <div
            className="absolute top-0 left-0 bottom-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={item.preWar.imageUrl}
              alt={`${item.name} - 战前`}
              className="absolute top-0 left-0 h-full object-cover"
              style={{ minWidth: '100%', width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
              draggable={false}
            />
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-amber-900/70 text-amber-50 text-xs font-decorative tracking-wider backdrop-blur-sm rounded-sm">
              {item.preWar.year} · 战前
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gold-400">
              <ArrowLeftRight size={16} className="text-gold-600" />
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent opacity-60" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>

        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h3 className="font-serif text-xl text-ink-800 font-semibold">
            {item.name}
          </h3>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-decorative tracking-wider ${statusInfo.bgColor} ${statusInfo.color} border ${statusInfo.borderColor}`}>
            <span>{statusIcon}</span>
            <span>{statusInfo.label}</span>
          </span>
        </div>

        <div className="px-5 pb-3">
          <p className="font-body text-sm text-paper-600 leading-relaxed">
            {item.changeDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-0 border-t border-paper-200/60">
          <div className="p-4 border-r border-paper-200/60 bg-amber-50/40">
            <div className="font-decorative text-xs text-amber-800/70 tracking-wider mb-2">
              {item.preWar.year} · 战前
            </div>
            <p className="font-body text-xs text-amber-900/80 leading-relaxed line-clamp-4">
              {item.preWar.description}
            </p>
            {item.preWar.notableFigures && item.preWar.notableFigures.length > 0 && (
              <div className="mt-2 pt-2 border-t border-amber-200/40">
                <div className="text-[10px] text-amber-700/60 font-decorative tracking-wider mb-1">
                  代表人物
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.preWar.notableFigures.slice(0, 3).map((figure, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-amber-100/60 text-amber-800 rounded-sm">
                      {figure}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50/40">
            <div className="font-decorative text-xs text-gray-700/70 tracking-wider mb-2">
              {item.postWar.year} · 战后
            </div>
            <p className="font-body text-xs text-gray-800/80 leading-relaxed line-clamp-4">
              {item.postWar.description}
            </p>
            {item.postWar.notableFigures && item.postWar.notableFigures.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200/40">
                <div className="text-[10px] text-gray-600/60 font-decorative tracking-wider mb-1">
                  代表人物
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.postWar.notableFigures.slice(0, 3).map((figure, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-200/60 text-gray-700 rounded-sm">
                      {figure}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-paper-50/60 border-t border-paper-200/60">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-gold-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-paper-500 font-decorative tracking-wider mb-1">
                历史意义
              </div>
              <p className="font-body text-xs text-paper-700 leading-relaxed italic">
                {item.historicalSignificance}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
