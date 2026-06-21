import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(true), 500);
    const timer2 = setTimeout(() => setShowTitle(true), 2200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleEnter = () => {
    navigate('/timeline');
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        perspective: '2000px',
        perspectiveOrigin: '50% 40%',
        width: '100%',
        maxWidth: '560px',
        height: '70vh',
        maxHeight: '680px',
      }}
    >
      <div
        className="relative w-full h-full transition-transform ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isOpen ? 'rotateY(-8deg)' : 'rotateY(0deg)',
          transitionDuration: '2000ms',
        }}
      >
        {/* Back cover */}
        <div
          className="absolute inset-0 rounded-r-md"
          style={{
            background: 'linear-gradient(90deg, #473218 0%, #5f4521 5%, #7d5a2e 15%, #7d5a2e 100%)',
            transform: 'translateZ(-40px)',
            boxShadow:
              '0 0 0 1px rgba(60, 42, 6, 0.1), 2px 2px 0 rgba(60, 42, 6, 0.05), 5px 5px 15px rgba(60, 42, 6, 0.15), 15px 25px 50px rgba(60, 42, 6, 0.25)',
          }}
        >
          <div
            className="absolute inset-0 rounded-r-md"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.15) 100%',
            }}
          />
        </div>

        {/* Book pages stack */}
        <div
          className="absolute inset-0 bg-paper-100 rounded-r-sm"
          style={{
            transform: 'translateZ(-36px)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)',
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-b border-paper-200"
              style={{
                top: `${i * 7 + 8}%`,
                opacity: 0.25 - i * 0.01,
              }}
            />
          ))}
        </div>

        {/* Pages (middle) - 翻开后显示的内页 */}
        <div
          className="absolute inset-0 bg-paper-100 rounded-r-sm overflow-hidden"
          style={{
            transform: 'translateZ(-2px)',
            boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.05)',
          }}
        >
          <div className="absolute inset-0 paper-bg" />

          <div className="relative h-full p-8 md:p-6 sm:p-5 flex flex-col">
            {/* Page header decoration - 更紧凑 */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-px bg-paper-400/40" />
                <div className="text-paper-500/60 text-xs">❦</div>
                <div className="w-12 h-px bg-paper-400/40" />
              </div>
            </div>

            {/* 内容区域 - 居中显示题记和按钮 */}
            <div
              className="flex-1 flex flex-col items-center justify-center transition-opacity ease-out"
              style={{
                opacity: showTitle ? 1 : 0,
                transform: showTitle ? 'translateY(0)' : 'translateY(12px)',
                transitionDuration: '1000ms',
                transitionDelay: showTitle ? '200ms' : '0ms',
              }}
            >
              <div className="text-center w-full px-2">
                <p
                  className="font-decorative text-paper-700 text-xs tracking-widest mb-4"
                >
                  — 题记 —
                </p>
                <blockquote
                  className="font-serif text-ink-600 text-lg md:text-base italic leading-relaxed max-w-xs mx-auto"
                >
                  "我知道，只有那些亲身经历过那个自由世界的人，
                  <br className="hidden sm:block" />
                  才会有我这样的感受：
                  <br className="hidden sm:block" />
                  我们是在最好的时代里长大的。"
                </blockquote>
                <p className="font-body text-paper-600 text-right mt-4 text-xs pr-2">
                  —— 斯蒂芬·茨威格
                </p>
              </div>

              {/* 按钮 - 位置上移，缩小间距 */}
              <button
                onClick={handleEnter}
                className="group relative mt-8 md:mt-10 px-8 py-2.5 font-decorative text-paper-800 cursor-pointer"
                style={{
                  opacity: showTitle ? 1 : 0,
                  transform: showTitle ? 'translateY(0)' : 'translateY(12px)',
                  transitionDuration: '800ms',
                  transitionDelay: showTitle ? '600ms' : '0ms',
                }}
              >
                <span
                  className="relative z-10 transition-all duration-500"
                  style={{
                    letterSpacing: '0.2em',
                    fontSize: '0.875rem',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.letterSpacing = '0.35em';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.letterSpacing = '0.2em';
                  }}
                >
                  翻 开 时 光
                </span>
                <div className="absolute inset-0 border border-paper-500/50 rounded-sm transition-colors duration-500 group-hover:border-gold-500/70" />
                <div className="absolute inset-0.5 border border-paper-400/30 rounded-sm transition-colors duration-500 group-hover:border-gold-400/50" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(212, 160, 23, 0.12) 50%, transparent 100%',
                  }}
                />
              </button>
            </div>

            {/* Page number */}
            <div className="text-center font-serif text-paper-500 text-xs mt-3">
              I
            </div>
          </div>
        </div>

        {/* Front cover (opening) */}
        <div
          className="absolute inset-0 rounded-r-md transition-transform ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isOpen ? 'rotateY(-165deg)' : 'rotateY(0deg)',
            transformOrigin: 'left center',
            transitionDuration: '2500ms',
            zIndex: 10,
          }}
        >
          {/* Cover front */}
          <div
            className="absolute inset-0 rounded-r-md overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #5f4521 0%, #7d5a2e 40%, #6b4e26 70%, #5f4521 100%)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.03) 2px,
                  rgba(0,0,0,0.03) 4px
                )`,
              }}
            />

            {/* Gold decorative border */}
            <div
              className="absolute inset-6 md:inset-7 border-2 rounded-sm"
              style={{
                borderColor: 'rgba(212, 160, 23, 0.55)',
                boxShadow: 'inset 0 0 0 1px rgba(212, 160, 23, 0.25)',
              }}
            />
            <div
              className="absolute inset-8 md:inset-9 border rounded-sm"
              style={{
                borderColor: 'rgba(255, 216, 122, 0.25)',
              }}
            />

            {/* Title on cover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center px-4">
                <div
                  className="text-xs tracking-[0.3em] mb-4"
                  style={{
                    fontFamily: 'Cinzel, Georgia, serif',
                    color: 'rgba(255, 216, 122, 0.75)',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  STEFAN ZWEIG
                </div>
                <h1
                  className="text-3xl md:text-2xl font-bold tracking-wide"
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    color: '#fff8e1',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                    lineHeight: 1.2,
                  }}
                >
                  昨日的世界
                </h1>
                <div
                  className="text-sm mt-3 italic"
                  style={{
                    fontFamily: 'Crimson Pro, Georgia, serif',
                    color: 'rgba(255, 216, 122, 0.7)',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  Die Welt von Gestern
                </div>
              </div>

              <div className="mt-8 md:mt-10 flex items-center gap-3">
                <div
                  className="w-10 h-px"
                  style={{ background: 'rgba(212, 160, 23, 0.45)' }}
                />
                <div
                  className="text-lg"
                  style={{ color: 'rgba(255, 192, 77, 0.8)' }}
                >
                  ❦
                </div>
                <div
                  className="w-10 h-px"
                  style={{ background: 'rgba(212, 160, 23, 0.45)' }}
                />
              </div>
            </div>

            {/* Spine */}
            <div
              className="absolute left-0 top-0 bottom-0 w-7"
              style={{
                background: 'linear-gradient(90deg, #3a2a06 0%, #473218 100%)',
                boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.25)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-px"
                    style={{ background: 'rgba(184, 134, 11, 0.35)' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cover back (inside) */}
          <div
            className="absolute inset-0 rounded-r-md paper-bg"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div
              className="absolute inset-5 border rounded-sm"
              style={{ borderColor: 'rgba(184, 151, 82, 0.45)' }}
            />
          </div>
        </div>
      </div>

      {/* Ambient light */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(255, 248, 225, 0.35) 0%, transparent 70%)',
          opacity: 0.4,
        }}
      />
    </div>
  );
}
