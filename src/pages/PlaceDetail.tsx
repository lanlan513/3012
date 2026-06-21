import { useParams, Link } from 'react-router-dom';
import { getPlaceById } from '@/data/places';
import { getChapterById } from '@/data/chapters';
import { ArrowLeft, MapPin } from 'lucide-react';

export default function PlaceDetail() {
  const { id } = useParams<{ id: string }>();
  const place = getPlaceById(id || '');

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-100">
        <div className="text-center">
          <p className="font-serif text-2xl text-ink-600">地点未找到</p>
          <Link to="/timeline" className="mt-4 inline-block text-gold-600 hover:text-gold-700">
            返回时间线
          </Link>
        </div>
      </div>
    );
  }

  const relatedChapters = place.chapterIds
    .map((id) => getChapterById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative">
      <div className="absolute inset-0 paper-bg opacity-40" />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <Link
            to="/timeline"
            className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
          >
            <ArrowLeft size={16} />
            <span>返回时间线</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Hero image */}
          <div className="relative mb-12">
            <div className="relative bg-paper-100 rounded-sm p-4 shadow-paper-lg">
              <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none" />
              <div className="absolute inset-0 border border-paper-300/60 rounded-sm pointer-events-none" />
              <div className="absolute inset-2 border border-paper-200/40 rounded-sm pointer-events-none" />

              <div className="relative">
                <div className="relative overflow-hidden rounded-sm">
                  <div className="absolute inset-0 border border-paper-400/40 m-1 z-10" />
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full aspect-[16/9] object-cover sepia-[0.15]"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 50%, rgba(51, 37, 21, 0.3) 100%)',
                    }}
                  />
                </div>

                {/* Info overlay at bottom */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-gold-600 mb-3">
                    <MapPin size={16} />
                    <span className="font-decorative text-sm tracking-wider">
                      {place.country.toUpperCase()}
                    </span>
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl text-ink-700 font-bold mb-3">
                    {place.name}
                  </h1>

                  <div className="flex items-center justify-center gap-4 mt-6 mb-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
                    <span className="text-gold-500 text-lg">❦</span>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
                  </div>

                  <blockquote className="font-serif text-xl text-ink-600 italic leading-relaxed max-w-2xl mx-auto">
                    {place.quote}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="mb-12">
            <SectionTitle title="城市印象" />
            <div className="bg-paper-100/80 rounded-sm p-8 shadow-paper relative">
              <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-50" />
              <div className="relative font-body text-paper-800 leading-relaxed text-lg ink-drop-cap">
                {place.description}
              </div>
            </div>
          </section>

          {/* Related chapters */}
          {relatedChapters.length > 0 && (
            <section>
              <SectionTitle title="相关章节" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {relatedChapters.map((chapter) => (
                  chapter && (
                    <Link
                      key={chapter.id}
                      to={`/chapter/${chapter.id}`}
                      className="group block bg-paper-100/80 rounded-sm p-6 shadow-paper hover:shadow-paper-lg transition-all duration-300 hover:-translate-y-1 relative"
                    >
                      <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-50" />
                      <div className="relative">
                        <div className="font-decorative text-gold-600 text-xs tracking-wider mb-1">
                          {chapter.era}
                        </div>
                        <h3 className="font-serif text-lg text-ink-700 font-semibold group-hover:text-gold-700 transition-colors">
                          {chapter.title}
                        </h3>
                        <p className="font-body text-paper-600 text-sm mt-2">
                          {chapter.yearStart} — {chapter.yearEnd}
                        </p>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-paper-300/50">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <span className="text-gold-500/60 text-sm">✦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>
          <p className="font-body text-paper-500 text-sm">
            昨日的世界 · 一个欧洲人的回忆
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="font-serif text-2xl text-ink-700 font-semibold whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
    </div>
  );
}
