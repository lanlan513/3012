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
        perspectiveOrigin: '50% 50%',
        width: '100%',
        maxWidth: '600px',
        height: '800px',
      }}
    >
      <div
        className="relative w-full h-full transition-transform ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isOpen ? 'rotateY(-10deg)' : 'rotateY(0deg)',
          transitionDuration: '2000ms',
        }}
      >
        {/* Back cover */}
        <div
          className="absolute inset-0 rounded-r-md"
          style={{
            background: 'linear-gradient(90deg, #473218 0%, #5f4521 5%, #7d5a2e 15%, #7d5a2e 100%)',
            transform: 'translateZ(-50px)',
            boxShadow:
              '0 0 0 1px rgba(60, 42, 6, 0.1), 2px 2px 0 rgba(60, 42, 6, 0.05), 5px 5px 20px rgba(60, 42, 6, 0.15), 20px 30px 60px rgba(60, 42, 6, 0.25)',
          }}
        >
          <div
            className="absolute inset-0 rounded-r-md"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>

        {/* Book pages stack */}
        <div
          className="absolute inset-0 bg-paper-100 rounded-r-sm"
          style={{
            transform: 'translateZ(-45px)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)',
          }}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-b border-paper-200"
              style={{
                top: `${i * 6 + 8}%`,
                opacity: 0.25 - i * 0.01,
              }}
            />
          ))}
        </div>

        {/* Pages (middle) */}
        <div
          className="absolute inset-0 bg-paper-100 rounded-r-sm overflow-hidden"
          style={{
            transform: 'translateZ(-2px)',
            boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.05)',
          }}
        >
          <div className="absolute inset-0 paper-bg" />

          <div className="relative h-full p-10 md:p-8 sm:p-6 flex flex-col">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-px bg-paper-400/40" />
                <div className="text-paper-500/60 text-sm">❦</div>
                <div className="w-16 h-px bg-paper-400/40" />
              </div>
            </div>

            <div
              className="flex-1 flex flex-col items-center justify-center transition-opacity ease-out"
              style={{
                opacity: showTitle ? 1 : 0,
                transform: showTitle ? 'translateY(0)' : 'translateY(20px)',
                transitionDuration: '1000ms',
                transitionDelay: showTitle ? '200ms' : '0ms',
              }}
            >
              <div className="text-center w-full">
                <p className="font-decorative text-paper-700 text-sm tracking-widest mb-6">
                  — 题记 —
                </p>
                <blockquote className="font-serif text-ink-600 text-xl md:text-lg italic leading-relaxed max-w-sm mx-auto">
                  "我知道，只有那些亲身经历过那个自由世界的人，
                  <br className="hidden sm:block" />
                  才会有我这样的感受：
                  <br className="hidden sm:block" />
                  我们是在最好的时代里长大的。"
                </blockquote>
                <p className="font-body text-paper-600 text-right mt-6 text-sm pr-4">
                  —— 斯蒂芬·茨威格
                </p>
              </div>

              <button
                onClick={handleEnter}
                className="group relative mt-14 px-10 py-3 font-decorative text-paper-800 tracking-widest transition-all ease-out cursor-pointer"
                style={{
                  opacity: showTitle ? 1 : 0,
                  transform: showTitle ? 'translateY(0)' : 'translateY(16px)',
                  transitionDuration: '800ms',
                  transitionDelay: showTitle ? '700ms' : '0ms',
                }}
              >
                <span
                  className="relative z-10 transition-all duration-500"
                  style={{
                    letterSpacing: '0.2em',
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
                <div className="absolute inset-1 border border-paper-400/30 rounded-sm transition-colors duration-500 group-hover:border-gold-400/50" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(212, 160, 23, 0.12) 50%, transparent 100%)',
                  }}
                />
              </button>
            </div>

            <div className="text-center font-serif text-paper-500 text-sm">
              I
            </div>
          </div>
        </div>

        {/* Front cover (opening) */}
        <div
          className="absolute inset-0 rounded-r-md transition-transform ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isOpen ? 'rotateY(-160deg)' : 'rotateY(0deg)',
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

            <div
              className="absolute inset-8 border-2 rounded-sm"
              style={{
                borderColor: 'rgba(212, 160, 23, 0.55)',
                boxShadow: 'inset 0 0 0 1px rgba(212, 160, 23, 0.25)',
              }}
            />
            <div
              className="absolute inset-10 border rounded-sm"
              style={{
                borderColor: 'rgba(255, 216, 122, 0.25)',
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center">
                <div
                  className="text-sm tracking-[0.3em] mb-5"
                  style={{
                    fontFamily: 'Cinzel, Georgia, serif',
                    color: 'rgba(255, 216, 122, 0.75)',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  STEFAN ZWEIG
                </div>
                <h1
                  className="text-4xl md:text-3xl font-bold tracking-wide"
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
                  className="text-base mt-4 italic"
                  style={{
                    fontFamily: 'Crimson Pro, Georgia, serif',
                    color: 'rgba(255, 216, 122, 0.7)',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  Die Welt von Gestern
                </div>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div
                  className="w-12 h-px"
                  style={{ background: 'rgba(212, 160, 23, 0.45)' }}
                />
                <div
                  className="text-xl"
                  style={{ color: 'rgba(255, 192, 77, 0.8)' }}
                >
                  ❦
                </div>
                <div
                  className="w-12 h-px"
                  style={{ background: 'rgba(212, 160, 23, 0.45)' }}
                />
              </div>
            </div>

            <div
              className="absolute left-0 top-0 bottom-0 w-8"
              style={{
                background: 'linear-gradient(90deg, #3a2a06 0%, #473218 100%)',
                boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.25)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-7">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-px"
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
              className="absolute inset-6 border rounded-sm"
              style={{ borderColor: 'rgba(184, 151, 82, 0.45)' }}
            />
          </div>
        </div>
      </div>

      {/* Ambient light */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(255, 248, 225, 0.35) 0%, transparent 70%)',
          opacity: 0.4,
        }}
      />
    </div>
  );
}
