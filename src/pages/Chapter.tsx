import { useParams, Link } from 'react-router-dom';
import { getChapterById } from '@/data/chapters';
import { getPersonsByChapterId } from '@/data/persons';
import { getPlacesByChapterId } from '@/data/places';
import { getEventsByChapterId } from '@/data/events';
import PersonCard from '@/components/PersonCard';
import PlaceCard from '@/components/PlaceCard';
import EventCard from '@/components/EventCard';
import { ArrowLeft, Users, MapPin, Calendar } from 'lucide-react';

export default function Chapter() {
  const { id } = useParams<{ id: string }>();
  const chapter = getChapterById(id || '');
  const persons = getPersonsByChapterId(id || '');
  const places = getPlacesByChapterId(id || '');
  const events = getEventsByChapterId(id || '');

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-100">
        <div className="text-center">
          <p className="font-serif text-2xl text-ink-600">章节未找到</p>
          <Link to="/timeline" className="mt-4 inline-block text-gold-600 hover:text-gold-700">
            返回时间线
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative">
      <div className="absolute inset-0 paper-bg opacity-40" />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
            >
              <ArrowLeft size={16} />
              <span>返回时间线</span>
            </Link>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Chapter hero */}
      <section className="relative z-10 pb-12">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          {/* Era badge */}
          <div className="font-decorative text-gold-600 text-sm tracking-[0.3em] mb-4">
            {chapter.era.toUpperCase()}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-ink-700 font-bold mb-4">
            {chapter.title}
          </h1>

          {/* Years */}
          <div className="font-serif text-paper-600 text-lg mb-6">
            {chapter.yearStart} — {chapter.yearEnd}
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-xl">❦</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>

          {/* Quote */}
          <blockquote className="font-serif text-ink-600 text-xl italic leading-relaxed max-w-2xl mx-auto">
            {chapter.quote}
          </blockquote>

          {/* Description */}
          <p className="font-body text-paper-700 mt-8 leading-relaxed max-w-2xl mx-auto text-left ink-drop-cap">
            {chapter.description}
          </p>
        </div>
      </section>

      {/* Content sections */}
      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Persons section */}
          {persons.length > 0 && (
            <section className="mb-16">
              <SectionTitle icon={<Users size={20} />} title="人物" subtitle="Person" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {persons.map((person, index) => (
                  <div
                    key={person.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <PersonCard person={person} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Places section */}
          {places.length > 0 && (
            <section className="mb-16">
              <SectionTitle icon={<MapPin size={20} />} title="地点" subtitle="Place" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {places.map((place, index) => (
                  <div
                    key={place.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <PlaceCard place={place} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Events section */}
          {events.length > 0 && (
            <section>
              <SectionTitle icon={<Calendar size={20} />} title="事件" subtitle="Event" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <EventCard event={event} />
                  </div>
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

interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function SectionTitle({ icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-paper-200/60 text-gold-600">
        {icon}
      </div>
      <div>
        <h2 className="font-serif text-2xl text-ink-700 font-semibold">
          {title}
        </h2>
        <p className="font-body text-paper-500 text-sm tracking-wider uppercase">
          {subtitle}
        </p>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent ml-4" />
    </div>
  );
}
