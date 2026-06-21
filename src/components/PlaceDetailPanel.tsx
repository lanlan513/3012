import { useState } from 'react';
import { Place, CulturalConnection } from '@/types';
import { getConnectionsByPlaceId, getPlaceById } from '@/data/places';
import { X, BookOpen, Palette, Users, Quote, ArrowRight } from 'lucide-react';

interface PlaceDetailPanelProps {
  place: Place;
  onClose: () => void;
  onNavigateToPlace: (placeId: string) => void;
}

const connectionTypeLabels: Record<CulturalConnection['type'], string> = {
  literary: '文学',
  artistic: '艺术',
  musical: '音乐',
  philosophical: '哲学',
  historical: '历史',
};

const connectionTypeColors: Record<CulturalConnection['type'], string> = {
  literary: '#6b5639',
  artistic: '#8b6914',
  musical: '#a67d4d',
  philosophical: '#5f4521',
  historical: '#d4a017',
};

export default function PlaceDetailPanel({
  place,
  onClose,
  onNavigateToPlace,
}: PlaceDetailPanelProps) {
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const connections = getConnectionsByPlaceId(place.id);

  const currentEra = place.eraContexts[activeEraIndex];

  return (
    <div
      className="absolute right-0 top-0 bottom-0 w-full md:w-[460px] lg:w-[520px] z-30 h-full"
      style={{
        animation: 'slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      }}
    >
      <div
        className="h-full bg-paper-100 border-l-2 border-gold-500/40 shadow-2xl overflow-y-auto"
        style={{ boxShadow: '-12px 0 40px rgba(60, 42, 6, 0.25)' }}
      >
        {/* Paper texture background */}
        <div className="absolute inset-0 paper-bg opacity-50 pointer-events-none" />

        <div className="relative z-10">
          {/* Header with image */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={place.imageUrl}
              alt={place.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(58, 42, 6, 0.1) 0%, rgba(58, 42, 6, 0.4) 50%, rgba(254, 246, 230, 1) 100%)',
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paper-100/90 backdrop-blur-sm border border-gold-500/40 flex items-center justify-center text-ink-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 shadow-lg"
              aria-label="关闭"
            >
              <X size={16} />
            </button>

            {/* City name overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gold-400 text-sm">❧</span>
                <span
                  className="font-decorative text-xs tracking-[0.2em] text-gold-300"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  {place.country}
                </span>
              </div>
              <h2
                className="font-serif text-3xl font-bold text-paper-50"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              >
                {place.name}
              </h2>
            </div>
          </div>

          {/* Quote section */}
          <div className="px-6 py-5">
            <blockquote className="relative pl-6 border-l-2 border-gold-500/60">
              <Quote
                size={18}
                className="absolute -top-1 -left-2 text-gold-500/50"
              />
              <p className="font-serif italic text-ink-600 text-sm leading-relaxed">
                {place.quote}
              </p>
            </blockquote>
          </div>

          {/* Era tabs */}
          <div className="px-6 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px flex-1 bg-gold-500/30" />
              <span className="font-decorative text-xs tracking-[0.18em] text-gold-700">
                时 代 背 景
              </span>
              <span className="h-px flex-1 bg-gold-500/30" />
            </div>

            <div className="flex flex-wrap gap-2">
              {place.eraContexts.map((era, index) => (
                <button
                  key={era.chapterId}
                  onClick={() => setActiveEraIndex(index)}
                  className={`px-3 py-1.5 rounded-sm border transition-all duration-300 ${
                    activeEraIndex === index
                      ? 'bg-gold-500 border-gold-600 text-paper-100 shadow-md'
                      : 'bg-paper-50 border-paper-400/60 text-ink-600 hover:border-gold-500/60 hover:text-gold-700'
                  }`}
                >
                  <span
                    className="font-decorative text-xs tracking-wider"
                  >
                    {era.era}
                  </span>
                  <span
                    className={`ml-2 text-[10px] ${
                      activeEraIndex === index
                        ? 'text-gold-100/80'
                        : 'text-paper-500'
                    }`}
                  >
                    {era.yearRange}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current era details */}
          {currentEra && (
            <div
              className="px-6 pb-5"
              style={{
                animation: 'fadeIn 0.4s ease-out both',
              }}
              key={currentEra.chapterId}
            >
              {/* Culture section */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(139, 105, 20, 0.12)' }}
                  >
                    <BookOpen size={14} className="text-gold-700" />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-ink-700 tracking-wide">
                    文 化 氛 围
                  </h3>
                </div>
                <div className="ml-9 pl-4 border-l border-gold-500/20">
                  <p className="font-body text-sm text-ink-600 leading-7">
                    {currentEra.culture}
                  </p>
                </div>
              </div>

              {/* Art section */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(166, 125, 77, 0.12)' }}
                  >
                    <Palette size={14} className="text-leather-600" />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-ink-700 tracking-wide">
                    艺 术 繁 盛
                  </h3>
                </div>
                <div className="ml-9 pl-4 border-l border-leather-500/20">
                  <p className="font-body text-sm text-ink-600 leading-7">
                    {currentEra.art}
                  </p>
                </div>
              </div>

              {/* Society section */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(107, 86, 57, 0.12)' }}
                  >
                    <Users size={14} className="text-ink-600" />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-ink-700 tracking-wide">
                    社 会 风 貌
                  </h3>
                </div>
                <div className="ml-9 pl-4 border-l border-ink-500/20">
                  <p className="font-body text-sm text-ink-600 leading-7">
                    {currentEra.society}
                  </p>
                </div>
              </div>

              {/* Notable figures */}
              {currentEra.notableFigures &&
                currentEra.notableFigures.length > 0 && (
                  <div
                    className="p-4 rounded-sm border border-gold-500/30"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255, 248, 225, 0.6) 0%, rgba(240, 223, 176, 0.4) 100%)',
                    }}
                  >
                    <p className="font-decorative text-[10px] tracking-[0.18em] text-gold-700 mb-2">
                      ✦ 代 表 人 物
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentEra.notableFigures.map((name) => (
                        <span
                          key={name}
                          className="px-2.5 py-1 bg-paper-100/80 border border-gold-500/30 rounded-sm font-body text-xs text-ink-600"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Cultural Connections */}
          {connections.length > 0 && (
            <div className="px-6 pb-6">
              <div className="flex items-center gap-2 mb-4 pt-3 border-t border-gold-500/20">
                <span className="h-px flex-1 bg-gold-500/30" />
                <span className="font-decorative text-xs tracking-[0.18em] text-gold-700">
                  文 化 连 接 线
                </span>
                <span className="h-px flex-1 bg-gold-500/30" />
              </div>

              <div className="space-y-3">
                {connections.map((conn) => {
                  const otherPlaceId =
                    conn.from === place.id ? conn.to : conn.from;
                  const otherPlace = getPlaceById(otherPlaceId);
                  if (!otherPlace) return null;

                  return (
                    <button
                      key={conn.id}
                      onClick={() => onNavigateToPlace(otherPlaceId)}
                      className="w-full text-left p-3 rounded-sm bg-paper-50/80 border border-paper-400/40 hover:border-gold-500/60 hover:bg-gold-50/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className="inline-block w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  connectionTypeColors[conn.type],
                              }}
                            />
                            <span className="font-decorative text-[10px] tracking-[0.15em] text-ink-500 uppercase">
                              {connectionTypeLabels[conn.type]}
                            </span>
                            <span className="text-paper-400 text-[10px]">
                              ·
                            </span>
                            <span className="font-body text-[11px] text-paper-500 italic">
                              {conn.era}
                            </span>
                          </div>
                          <p className="font-body text-sm text-ink-700 leading-relaxed mb-2 line-clamp-2">
                            {conn.description}
                          </p>
                          <div className="flex items-center gap-1 text-gold-700 font-serif text-sm font-medium group-hover:text-gold-600 transition-colors">
                            <span>前往 {otherPlace.name}</span>
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer spacer */}
          <div className="h-8" />
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
