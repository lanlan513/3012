import Book from '@/components/Book';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 paper-bg opacity-50" />

      {/* Library background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(255, 248, 225, 0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(184, 151, 82, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Top bookshelf decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 opacity-20 pointer-events-none">
        <div className="h-full bg-gradient-to-b from-leather-900 via-leather-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-700/30" />
      </div>

      {/* Bottom bookshelf decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20 pointer-events-none">
        <div className="h-full bg-gradient-to-t from-leather-900 via-leather-800 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-700/30" />
      </div>

      {/* Ambient light from above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(255, 248, 225, 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center py-12 px-4"
        style={{ minHeight: '100vh' }}
      >
        {/* Top decoration */}
        <div
          className="mb-6 md:mb-8"
          style={{
            animation: 'fadeIn 1s ease-out 200ms both',
          }}
        >
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className="w-20 md:w-28 h-px"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(184, 134, 11, 0.4), rgba(184, 134, 11, 0.6))',
              }}
            />
            <span className="text-gold-600 text-xl md:text-2xl">❦</span>
            <div
              className="w-20 md:w-28 h-px"
              style={{
                background:
                  'linear-gradient(to left, transparent, rgba(184, 134, 11, 0.4), rgba(184, 134, 11, 0.6))',
              }}
            />
          </div>
        </div>

        {/* Book component - responsive sizing */}
        <div className="flex-shrink-0 mb-6 md:mb-10 w-full max-w-[600px]" style={{ height: 'clamp(480px, 85vh, 800px)' }}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="scale-[clamp(0.55,1vw,1)] origin-center">
              <Book />
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          className="text-center"
          style={{
            animation: 'fadeIn 1s ease-out 2800ms both',
          }}
        >
          <p className="font-serif text-paper-600 text-sm md:text-base italic mb-2 md:mb-3">
            一个关于人、城市与时代的故事
          </p>
          <p
            className="text-paper-500 text-xs tracking-[0.3em]"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            斯蒂芬·茨威格 · 一个欧洲人的回忆
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2"
          style={{
            animation: 'fadeIn 1s ease-out 3200ms both, float 6s ease-in-out 3200ms infinite',
          }}
        >
          <div className="flex flex-col items-center gap-2 text-paper-500/80">
            <span
              className="text-xs tracking-wider"
              style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
            >
              翻阅时光
            </span>
            <span
              className="text-lg"
              style={{
                animation: 'bounce 2s infinite',
              }}
            >
              ↓
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
