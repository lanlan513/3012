import { Person } from '@/types';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <Link
      to={`/person/${person.id}`}
      className="group relative block bg-paper-100 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-paper-lg"
    >
      {/* Card border decoration */}
      <div className="absolute inset-0 border border-paper-300/60 rounded-sm pointer-events-none z-10" />
      <div className="absolute inset-1 border border-paper-200/40 rounded-sm pointer-events-none z-10" />

      {/* Paper texture */}
      <div className="absolute inset-0 paper-bg pointer-events-none" />

      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-2 z-10 border border-paper-300/50" />
        <img
          src={person.imageUrl}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.2]"
        />
        {/* Vignette effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 50%, rgba(51, 37, 21, 0.3) 100%)',
          }}
        />
        {/* Occupation badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper-100/90 backdrop-blur-sm text-paper-700 text-xs font-body border border-paper-300/60 rounded-sm">
            <User size={12} />
            {person.occupation}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Name */}
        <h3 className="font-serif text-xl text-ink-700 font-semibold mb-2 group-hover:text-gold-700 transition-colors duration-300">
          {person.name}
        </h3>

        {/* Years */}
        <p className="font-body text-paper-600 text-sm mb-4">
          {person.birthYear} — {person.deathYear}
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-paper-400/50 to-transparent" />
          <span className="text-paper-500 text-xs">❧</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-paper-400/50 to-transparent" />
        </div>

        {/* Quote */}
        <p className="font-body text-paper-700 text-sm italic line-clamp-3 leading-relaxed">
          {person.quote}
        </p>

        {/* Read more indicator */}
        <div className="mt-4 flex items-center gap-2 text-gold-600 text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>了解更多</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-500/30 z-20" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-500/30 z-20" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-500/30 z-20" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-500/30 z-20" />
    </Link>
  );
}
