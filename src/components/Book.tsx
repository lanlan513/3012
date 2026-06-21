import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(true), 500);
    const timer2 = setTimeout(() => setShowTitle(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleEnter = () => {
    navigate('/timeline');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
      <div
        className={`relative transition-transform duration-[2000ms] ease-out ${
          isOpen ? 'rotate-y-[-15deg]' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Book spine / back cover */}
        <div className="relative w-[600px] h-[800px] md:w-[500px] md:h-[700px] sm:w-[340px] sm:h-[480px]">
          {/* Back cover */}
          <div
            className="absolute inset-0 rounded-r-md book-shadow"
            style={{
              background: 'linear-gradient(90deg, #5f4521 0%, #7d5a2e 10%, #7d5a2e 100%)',
              transform: 'translateZ(-50px)',
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

          {/* Book pages (stack effect) */}
          <div
            className="absolute inset-0 bg-paper-100 rounded-r-sm"
            style={{
              transform: 'translateZ(-48px)',
              boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.05)',
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-paper-200"
                style={{
                  top: `${i * 5 + 10}%`,
                  opacity: 0.3 - i * 0.01,
                }}
              />
            ))}
          </div>

          {/* Front cover (opening) */}
          <div
            className={`absolute inset-0 rounded-r-md transition-transform duration-[2000ms] ease-out origin-left ${
              isOpen ? 'rotate-y-[-160deg]' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              zIndex: 10,
            }}
          >
            {/* Cover front */}
            <div
              className="absolute inset-0 rounded-r-md overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #5f4521 0%, #7d5a2e 50%, #5f4521 100%)',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Leather texture pattern */}
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
                className="absolute inset-8 border-2 border-gold-500/60 rounded-sm"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(212, 160, 23, 0.3)',
                }}
              />
              <div
                className="absolute inset-10 border border-gold-400/30 rounded-sm"
              />

              {/* Title on cover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-gold-300/80 font-decorative text-sm tracking-[0.3em] mb-4"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    STEFAN ZWEIG
                  </div>
                  <h1
                    className="text-gold-200 font-serif text-4xl md:text-3xl font-bold tracking-wide"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                      lineHeight: 1.2,
                    }}
                  >
                    昨日的世界
                  </h1>
                  <div
                    className="text-gold-300/70 font-body text-base mt-4 italic"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    Die Welt von Gestern
                  </div>
                </div>

                {/* Decorative element */}
                <div className="mt-12 flex items-center gap-4">
                  <div className="w-12 h-px bg-gold-500/50" />
                  <div className="text-gold-400 text-xl">❦</div>
                  <div className="w-12 h-px bg-gold-500/50" />
                </div>
              </div>

              {/* Spine decoration */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8"
                style={{
                  background: 'linear-gradient(90deg, #473218 0%, #5f4521 100%)',
                  boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.2)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-px bg-gold-600/40"
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
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="absolute inset-6 border border-paper-300/50" />
            </div>
          </div>

          {/* Right page (content) */}
          <div
            className="absolute inset-0 bg-paper-100 rounded-r-sm overflow-hidden"
            style={{
              transform: 'translateZ(-1px)',
              boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.05)',
            }}
          >
            {/* Paper texture */}
            <div className="absolute inset-0 paper-bg" />

            {/* Content */}
            <div className="relative h-full p-12 md:p-10 sm:p-8 flex flex-col">
              {/* Page header decoration */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-px bg-paper-500/30" />
                  <div className="text-paper-600/50 text-sm">❦</div>
                  <div className="w-16 h-px bg-paper-500/30" />
                </div>
              </div>

              {/* Title */}
              <div className={`flex-1 flex flex-col items-center justify-center transition-opacity duration-1000 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center">
                  <p className="font-decorative text-paper-700 text-sm tracking-widest mb-6">
                    — 题记 —
                  </p>
                  <blockquote className="font-serif text-ink-600 text-xl md:text-lg italic leading-relaxed max-w-md mx-auto">
                    "我知道，只有那些亲身经历过那个自由世界的人，
                    <br />
                    才会有我这样的感受：
                    <br />
                    我们是在最好的时代里长大的。"
                  </blockquote>
                  <p className="font-body text-paper-600 text-right mt-6 text-sm">
                    —— 斯蒂芬·茨威格
                  </p>
                </div>

                {/* Enter button */}
                <button
                  onClick={handleEnter}
                  className={`mt-16 group relative px-10 py-3 font-decorative text-paper-800 tracking-widest transition-all duration-500 hover:tracking-[0.3em] ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{
                    transitionDelay: showTitle ? '500ms' : '0ms',
                  }}
                >
                  <span className="relative z-10">翻 开 时 光</span>
                  <div className="absolute inset-0 border border-paper-500/50 rounded-sm group-hover:border-gold-500/70 transition-colors duration-500" />
                  <div className="absolute inset-1 border border-paper-400/30 rounded-sm group-hover:border-gold-400/50 transition-colors duration-500" />
                  {/* Gold shimmer effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(212, 160, 23, 0.1) 50%, transparent 100%)',
                    }}
                  />
                </button>
              </div>

              {/* Page number */}
              <div className="text-center font-serif text-paper-500 text-sm mt-8">
                I
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient light effect */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(255, 248, 225, 0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
