import Book from '@/components/Book';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative overflow-hidden">
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
        {/* Bookshelf lines */}
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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-16 px-4">
        {/* Top decoration */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <div className="flex items-center gap-6">
            <div className="w-28 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-gold-500/60" />
            <span className="text-gold-600 text-2xl">❦</span>
            <div className="w-28 h-px bg-gradient-to-l from-transparent via-gold-500/40 to-gold-500/60" />
          </div>
        </div>

        {/* Book component */}
        <div className="flex-shrink-0 mb-10">
          <Book />
        </div>

        {/* Bottom text */}
        <div
          className="text-center animate-fade-in"
          style={{ animationDelay: '2800ms', animationFillMode: 'both' }}
        >
          <p className="font-serif text-paper-600 text-base italic mb-3">
            一个关于人、城市与时代的故事
          </p>
          <p className="font-decorative text-paper-500 text-xs tracking-[0.3em]">
            斯蒂芬·茨威格 · 一个欧洲人的回忆
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-float"
          style={{ animationDelay: '3200ms', animationFillMode: 'both' }}
        >
          <div className="flex flex-col items-center gap-2 text-paper-500/80">
            <span className="text-xs font-body tracking-wider">翻阅时光</span>
            <span className="text-lg animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
