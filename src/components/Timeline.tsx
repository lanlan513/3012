import { chapters } from '@/data/chapters';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative py-16">
      {/* Timeline axis */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-paper-400/60 to-transparent" />

      {/* Decorative top */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0">
        <div className="w-3 h-3 rounded-full bg-gold-500 shadow-gold" />
      </div>

      {/* Decorative bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
        <div className="w-3 h-3 rounded-full bg-gold-500 shadow-gold" />
      </div>

      <div className="space-y-24">
        {chapters.map((chapter, index) => {
          const isVisible = visibleItems.has(chapter.id);
          const isLeft = index % 2 === 0;

          return (
            <div
              key={chapter.id}
              id={chapter.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`relative flex items-center transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Left side content */}
              <div className={`flex-1 ${isLeft ? 'pr-12 text-right' : 'pl-12'}`}>
                {isLeft && (
                  <TimelineCard chapter={chapter} side="left" />
                )}
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <div
                  className={`w-6 h-6 rounded-full border-2 border-gold-500 bg-paper-100 transition-all duration-500 ${
                    isVisible ? 'scale-100' : 'scale-0'
                  }`}
                  style={{
                    boxShadow: isVisible
                      ? '0 0 0 4px rgba(212, 160, 23, 0.2), 0 0 20px rgba(212, 160, 23, 0.3)'
                      : 'none',
                    transitionDelay: `${index * 150 + 300}ms`,
                  }}
                >
                  <div className="absolute inset-1 rounded-full bg-gold-400" />
                </div>
              </div>

              {/* Right side content */}
              <div className={`flex-1 ${isLeft ? 'pl-12' : 'pr-12 text-left'}`}>
                {!isLeft && (
                  <TimelineCard chapter={chapter} side="right" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface TimelineCardProps {
  chapter: (typeof chapters)[0];
  side: 'left' | 'right';
}

function TimelineCard({ chapter, side }: TimelineCardProps) {
  return (
    <Link
      to={`/chapter/${chapter.id}`}
      className="group inline-block"
    >
      <div className="relative bg-paper-100 p-6 rounded-sm shadow-paper hover:shadow-paper-lg transition-all duration-500 hover:-translate-y-1 group-hover:border-gold-400/60">
        {/* Paper texture */}
        <div className="absolute inset-0 paper-bg pointer-events-none" />

        {/* Border decoration */}
        <div className="absolute inset-0 border border-paper-300/60 rounded-sm pointer-events-none" />
        <div className="absolute inset-1 border border-paper-200/40 rounded-sm pointer-events-none" />

        {/* Arrow pointing to timeline */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 ${
            side === 'left'
              ? 'right-0 translate-x-full border-l-paper-100 border-y-4 border-y-transparent border-l-8'
              : 'left-0 -translate-x-full border-r-paper-100 border-y-4 border-y-transparent border-r-8'
          }`}
          style={{
            filter: 'drop-shadow(1px 0 1px rgba(0,0,0,0.05))',
          }}
        />

        <div className="relative">
          {/* Era label */}
          <div className="font-decorative text-gold-600 text-xs tracking-widest mb-2">
            {chapter.era}
          </div>

          {/* Years */}
          <div className="font-serif text-ink-500 text-sm mb-3">
            {chapter.yearStart} — {chapter.yearEnd}
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl text-ink-700 font-semibold mb-3 group-hover:text-gold-700 transition-colors duration-300">
            {chapter.title}
          </h3>

          {/* Quote */}
          <p className="font-body text-paper-600 text-sm italic line-clamp-2 leading-relaxed">
            {chapter.quote}
          </p>

          {/* Enter indicator */}
          <div className={`mt-4 flex items-center gap-2 text-gold-600 text-sm font-body ${side === 'left' ? 'justify-end' : 'justify-start'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {side === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
            <span>进入章节</span>
            {side === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>}
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-500/30" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-500/30" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-500/30" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-500/30" />
      </div>
    </Link>
  );
}
