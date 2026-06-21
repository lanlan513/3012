import Book from '@/components/Book';

export default function Home() {
  return (
    <div
      className="bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative overflow-hidden"
      style={{ minHeight: '100vh', height: '100vh' }}
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

      {/* Main content - 高度限制为视口高度，居中布局 */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-4"
        style={{ minHeight: '100vh', height: '100vh' }}
      >
        {/* Top decoration - 更紧凑 */}
        <div
          className="mb-4 md:mb-6"
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

        {/* Book component - 更紧凑的高度，确保内容在首屏 */}
        <div
          className="flex-shrink-0 w-full max-w-[560px] mb-3 md:mb-5"
          style={{ height: 'clamp(400px, 72vh, 640px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="origin-center"
              style={{
                transform: 'scale(clamp(0.65, 1vw, 1))',
              }}
            >
              <Book />
            </div>
          </div>
        </div>

        {/* Bottom text - 更紧凑，整合在首屏 */}
        <div
          className="text-center"
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

        {/* 向下提示 - 更低调 */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          style={{
            animation: 'fadeIn 1s ease-out 3200ms both, float 6s ease-in-out 3200ms infinite',
          }}
        >
          <div className="flex flex-col items-center gap-1 text-paper-500/60">
            <span
              className="text-[10px] tracking-wider"
              style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
            >
              点击「翻开时光」进入
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
