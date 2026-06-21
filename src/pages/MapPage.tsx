import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Filter } from 'lucide-react';
import EuropeMap from '@/components/EuropeMap';
import PlaceDetailPanel from '@/components/PlaceDetailPanel';
import { getPlaceById } from '@/data/places';
import { chapters } from '@/data/chapters';

export default function MapPage() {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [eraFilter, setEraFilter] = useState<string | null>(null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  const selectedPlace = selectedPlaceId ? getPlaceById(selectedPlaceId) : null;

  useEffect(() => {
    if (selectedPlace) {
      setMobilePanelOpen(true);
    } else {
      setMobilePanelOpen(false);
    }
  }, [selectedPlace]);

  const handleNavigateToPlace = (placeId: string) => {
    setSelectedPlaceId(placeId);
    setMobilePanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 paper-bg opacity-40" />

      {/* Header */}
      <header className="relative z-20 pt-6 pb-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Back link */}
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">返回时间线</span>
            </Link>

            {/* Title */}
            <div className="text-center">
              <h1 className="font-serif text-2xl md:text-3xl text-ink-700 font-semibold tracking-wide">
                昨 日 地 图
              </h1>
              <p className="font-body text-paper-500 text-xs md:text-sm mt-1 italic">
                Mappa Memoriae · 欧洲文化地理
              </p>
            </div>

            {/* Map switcher */}
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em]"
            >
              <MapPin size={14} />
              <span className="hidden sm:inline">时 间 线</span>
            </Link>
          </div>

          {/* Decorative divider */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-lg">❦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>
      </header>

      {/* Era Filter Bar */}
      <div className="relative z-20 mb-4 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-3 px-4 md:py-4 md:px-6 rounded-sm bg-paper-100/70 backdrop-blur-sm border border-gold-500/25 shadow-paper">
            <div className="flex items-center gap-2 text-gold-700 mr-2">
              <Filter size={14} />
              <span className="font-decorative text-[10px] md:text-xs tracking-[0.15em]">
                时 代 筛 选
              </span>
            </div>

            <button
              onClick={() => setEraFilter(null)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-sm border font-decorative text-[10px] md:text-xs tracking-wider transition-all duration-300 ${
                eraFilter === null
                  ? 'bg-ink-700 border-ink-800 text-paper-50 shadow-md'
                  : 'bg-paper-50 border-paper-400/60 text-ink-600 hover:border-ink-600/50 hover:text-ink-700'
              }`}
            >
              全 部 时 代
            </button>

            {chapters.map((chapter) => {
              const active = eraFilter === chapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => setEraFilter(active ? null : chapter.id)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-sm border font-decorative text-[10px] md:text-xs tracking-wider transition-all duration-300 ${
                    active
                      ? 'bg-gold-500 border-gold-600 text-paper-100 shadow-md'
                      : 'bg-paper-50 border-paper-400/60 text-ink-600 hover:border-gold-500/60 hover:text-gold-700'
                  }`}
                  title={`${chapter.yearStart}-${chapter.yearEnd}`}
                >
                  <span className="whitespace-nowrap">{chapter.era}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Intro text */}
      {!selectedPlace && (
        <div className="relative z-10 text-center px-4 mb-4 md:mb-6"
          style={{ animation: 'fadeInDown 0.8s ease-out 200ms both' }}
        >
          <p className="font-serif text-paper-700 text-sm md:text-base italic max-w-2xl mx-auto leading-relaxed">
            "那些城市之间流动的不仅是旅人，更是思想、艺术与精神的火种。
            <br className="hidden md:block" />
            沿着这些连接线，我们重走昨日的欧洲。"
          </p>
        </div>
      )}

      {/* Map + Detail Panel Layout */}
      <main className="relative z-10 container mx-auto px-2 md:px-6 pb-16">
        <div
          className={`relative rounded-sm overflow-hidden transition-all duration-500 ${
            selectedPlace ? 'lg:mr-0' : ''
          }`}
          style={{
            border: '2px solid rgba(184, 151, 82, 0.4)',
            boxShadow:
              '0 0 0 1px rgba(60, 42, 6, 0.05), 0 20px 60px rgba(60, 42, 6, 0.2)',
          }}
        >
          {/* Inner decorative border */}
          <div
            className="absolute inset-2 rounded-sm pointer-events-none z-20"
            style={{
              border: '1px solid rgba(184, 151, 82, 0.25)',
            }}
          />

          <div className="relative bg-paper-100/50" style={{ minHeight: '560px' }}>
            {/* Map */}
            <div
              className={`transition-all duration-500 ${
                selectedPlace && window.innerWidth >= 768
                  ? 'md:mr-[460px] lg:mr-[520px]'
                  : ''
              } ${mobilePanelOpen ? 'hidden md:block' : ''}`}
            >
              <EuropeMap
                selectedPlaceId={selectedPlaceId}
                onPlaceSelect={setSelectedPlaceId}
                eraFilter={eraFilter}
              />
            </div>

            {/* Desktop Place Detail Panel */}
            {selectedPlace && (
              <div className="hidden md:block">
                <PlaceDetailPanel
                  place={selectedPlace}
                  onClose={() => setSelectedPlaceId(null)}
                  onNavigateToPlace={handleNavigateToPlace}
                />
              </div>
            )}

            {/* Mobile Place Detail Overlay */}
            {selectedPlace && mobilePanelOpen && (
              <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-end">
                  <div
                    className="w-full max-h-[90vh] bg-paper-100 rounded-t-2xl overflow-hidden"
                    style={{
                      animation: 'slideUp 0.35s ease-out both',
                      boxShadow: '0 -10px 40px rgba(0,0,0,0.25)',
                    }}
                  >
                    {/* Drag indicator */}
                    <div className="flex justify-center pt-3 pb-2">
                      <div
                        className="w-12 h-1 rounded-full"
                        style={{ backgroundColor: 'rgba(184, 151, 82, 0.5)' }}
                      />
                    </div>
                    <PlaceDetailPanel
                      place={selectedPlace}
                      onClose={() => {
                        setMobilePanelOpen(false);
                        setTimeout(() => setSelectedPlaceId(null), 300);
                      }}
                      onNavigateToPlace={handleNavigateToPlace}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Empty state hint when no selection */}
            {!selectedPlace && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
                style={{ animation: 'floatHint 4s ease-in-out infinite' }}
              >
                <div className="px-4 py-2 rounded-full bg-paper-100/90 backdrop-blur-sm border border-gold-500/30 shadow-md">
                  <p className="font-body text-xs text-ink-500 italic">
                    ✦ 点击地图上的城市，探索不同时代的文化记忆 ✦
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <span className="text-gold-500/60 text-sm">✦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>
          <p className="font-body text-paper-500 text-sm">
            昨日的世界 · 一个欧洲人的回忆
          </p>
          <p className="font-decorative text-[10px] tracking-[0.3em] text-paper-400 mt-2">
            STEFAN ZWEIG · DIE WELT VON GESTERN
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatHint {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -6px); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
