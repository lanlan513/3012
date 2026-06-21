import Book from '@/components/Book';

export default function Home() {
  return (
    <div
      className="bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative overflow-hidden"
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

      {/* Top subtle fade */}
      <div className="absolute top-0 left-0 right-0 h-24 opacity-15 pointer-events-none">
        <div className="h-full bg-gradient-to-b from-leather-900 to-transparent" />
      </div>

      {/* Bottom subtle fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-15 pointer-events-none">
        <div className="h-full bg-gradient-to-t from-leather-900 to-transparent" />
      </div>

      {/* Ambient light from above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(255, 248, 225, 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 grid min-h-screen grid-rows-[auto_minmax(0,1fr)_auto] items-center px-4 py-8"
      >
        {/* Top decoration */}
        <div
          className="justify-self-center"
          style={{
            animation: 'fadeIn 1s ease-out 200ms both',
          }}
        >
          <div className="flex items-center gap-3 md:gap-5">
            <div
              className="w-16 md:w-24 h-px"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(184, 134, 11, 0.4), rgba(184, 134, 11, 0.6))',
              }}
            />
            <span className="text-gold-600 text-lg md:text-xl">❦</span>
            <div
              className="w-16 md:w-24 h-px"
              style={{
                background:
                  'linear-gradient(to left, transparent, rgba(184, 134, 11, 0.4), rgba(184, 134, 11, 0.6))',
              }}
            />
          </div>
        </div>

        {/* Book component */}
        <div
          className="my-4 w-full justify-self-center"
        >
          <Book />
        </div>

        {/* Bottom text */}
        <div
          className="text-center justify-self-center"
          style={{
            animation: 'fadeIn 1s ease-out 2800ms both',
          }}
        >
          <p className="font-serif text-paper-600 text-xs md:text-sm italic mb-1 md:mb-2">
            一个关于人、城市与时代的故事
          </p>
          <p
            className="text-paper-500 text-[10px] md:text-xs tracking-[0.3em]"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            斯蒂芬·茨威格 · 一个欧洲人的回忆
          </p>
        </div>

        {/* Entry hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          style={{
            animation: 'fadeIn 1s ease-out 3200ms both, float 6s ease-in-out 3200ms infinite',
          }}
        >
          <div className="flex flex-col items-center gap-1 text-paper-500/60">
            <span
              className="text-[10px] tracking-wider"
              style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
            >
              点击「翻开时光」进入时间线 · 或「仰望星空」探索文化宇宙
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
