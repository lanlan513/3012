import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const openTimer = window.setTimeout(() => setIsOpen(true), 450);
    const contentTimer = window.setTimeout(() => setShowContent(true), 1500);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[760px]"
      style={{
        height: 'min(68vh, 560px)',
        minHeight: '420px',
        perspective: '1800px',
      }}
    >
      <div className="absolute inset-0 book-shadow rounded-md" />

      {/* Left opened cover */}
      <div
        className="absolute left-1/2 top-0 z-20 h-full w-1/2 origin-left rounded-l-md overflow-hidden transition-transform ease-out"
        style={{
          transform: isOpen
            ? 'translateX(-100%) rotateY(18deg)'
            : 'translateX(-100%) rotateY(90deg)',
          transformStyle: 'preserve-3d',
          transitionDuration: '1800ms',
          background:
            'linear-gradient(135deg, #3a2a06 0%, #5f4521 42%, #7d5a2e 100%)',
          boxShadow: 'inset -12px 0 28px rgba(0,0,0,0.26), -18px 22px 40px rgba(60,42,6,0.18)',
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_35%_25%,rgba(255,237,179,0.35),transparent_38%)]" />
        <div className="absolute inset-6 border-2 border-gold-500/50 rounded-sm" />
        <div className="absolute inset-9 border border-gold-300/25 rounded-sm" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <p className="font-decorative text-xs tracking-[0.32em] text-gold-300/80 mb-4">
            STEFAN ZWEIG
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-gold-100 drop-shadow">
            昨日的世界
          </h1>
          <p className="font-body mt-3 text-sm italic text-gold-300/75">
            Die Welt von Gestern
          </p>
          <div className="mt-9 flex items-center gap-3 text-gold-400/80">
            <span className="h-px w-10 bg-gold-500/50" />
            <span className="text-lg">❦</span>
            <span className="h-px w-10 bg-gold-500/50" />
          </div>
        </div>
      </div>

      {/* Right page */}
      <div
        className="absolute left-1/2 top-0 z-10 h-full w-1/2 overflow-hidden rounded-r-md bg-paper-100"
        style={{
          boxShadow: 'inset 12px 0 24px rgba(60,42,6,0.12), 16px 20px 42px rgba(60,42,6,0.18)',
        }}
      >
        <div className="absolute inset-0 paper-bg" />
        <div className="absolute inset-y-0 left-0 w-px bg-paper-400/50" />
        <div className="absolute inset-5 border border-paper-300/70 rounded-sm" />
        <div className="absolute inset-7 border border-paper-200/70 rounded-sm" />

        <div
          className="relative z-10 flex h-full flex-col px-8 py-9 text-center"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
          }}
        >
          <div className="flex items-center justify-center gap-3 text-paper-500/70">
            <span className="h-px w-12 bg-paper-400/50" />
            <span className="text-xs">❦</span>
            <span className="h-px w-12 bg-paper-400/50" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
            <p className="font-decorative text-xs tracking-[0.22em] text-paper-700">
              题记
            </p>
            <blockquote className="mt-5 max-w-[260px] font-serif text-base italic leading-7 text-ink-600">
              "我知道，只有那些亲身经历过那个自由世界的人，才会有我这样的感受：我们是在最好的时代里长大的。"
            </blockquote>
            <p className="mt-4 w-full max-w-[260px] text-right font-body text-xs text-paper-600">
              —— 斯蒂芬·茨威格
            </p>

            <button
              type="button"
              onClick={() => navigate('/timeline')}
              className="group relative mt-8 inline-flex min-h-[44px] items-center justify-center px-7 py-2 font-decorative text-sm tracking-[0.18em] text-paper-800 transition-colors hover:text-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              aria-label="翻开时光，进入时间线"
            >
              <span className="relative z-10">翻 开 时 光</span>
              <span className="absolute inset-0 rounded-sm border border-paper-500/60 transition-colors group-hover:border-gold-500/70" />
              <span className="absolute inset-1 rounded-sm border border-paper-400/35 transition-colors group-hover:border-gold-400/55" />
            </button>
          </div>

          <div className="font-serif text-xs text-paper-500">I</div>
        </div>
      </div>

      {/* Page stack edge */}
      <div className="absolute left-1/2 top-0 z-0 h-full w-1/2 translate-x-2 rounded-r-md bg-paper-200 shadow-paper" />
    </div>
  );
}
