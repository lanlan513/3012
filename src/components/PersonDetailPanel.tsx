import { X, BookOpen, Music, Brain, Palette, Link2 } from 'lucide-react';
import { getPersonById, persons } from '@/data/persons';
import { getRelationsByPersonId, getRelationTypeLabel, RelationType } from '@/data/relations';
import { getPersonActivity, getRelationStrength, CATEGORY_COLORS, RELATION_COLORS } from '@/data/networkSimulation';
import { PersonCategory } from '@/types';

const CATEGORY_CONFIG: Record<PersonCategory, { label: string; icon: React.ReactNode; color: string }> = {
  literature: {
    label: '文学',
    icon: <BookOpen size={14} />,
    color: '#b8860b',
  },
  music: {
    label: '音乐',
    icon: <Music size={14} />,
    color: '#8b4513',
  },
  philosophy: {
    label: '哲学',
    icon: <Brain size={14} />,
    color: '#5c440c',
  },
  art: {
    label: '艺术',
    icon: <Palette size={14} />,
    color: '#a67d4d',
  },
};

interface PersonDetailPanelProps {
  personId: string;
  currentYear: number;
  onClose: () => void;
  onSelectPerson: (id: string) => void;
}

export default function PersonDetailPanel({
  personId,
  currentYear,
  onClose,
  onSelectPerson,
}: PersonDetailPanelProps) {
  const person = getPersonById(personId);
  const relations = getRelationsByPersonId(personId);

  if (!person) return null;

  const activity = getPersonActivity(
    {
      id: person.id,
      person,
      appearYear: person.birthYear + 20,
      peakYear: person.birthYear + 40,
      fadeYear: person.deathYear,
      active: false,
    },
    currentYear
  );

  const activeRelations = relations.filter((rel) => {
    const simRel = {
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: rel.type as RelationType,
      description: rel.description,
      startYear: 1900,
      peakYear: 1920,
      endYear: null as number | null,
      strength: 0.5,
    };
    return getRelationStrength(simRel, currentYear) > 0.1;
  });

  const statusLabel = activity > 0.7 ? '活跃期' : activity > 0.3 ? '过渡期' : activity > 0 ? '淡出中' : '已离开';
  const statusColor = activity > 0.7 ? '#2e7d32' : activity > 0.3 ? '#f57c00' : '#c62828';

  return (
    <div className="bg-paper-100/95 backdrop-blur-sm rounded-sm border border-paper-300/60 shadow-paper-lg">
      <div className="p-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-paper-500 hover:text-ink-700 transition-colors z-10"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <img
            src={person.imageUrl}
            alt={person.name}
            className="w-20 h-24 object-cover rounded-sm sepia-[0.15] border border-paper-300/60 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-paper-100 text-[10px] font-body mb-1"
              style={{ backgroundColor: CATEGORY_CONFIG[person.category].color }}
            >
              {CATEGORY_CONFIG[person.category].icon}
              {CATEGORY_CONFIG[person.category].label}
            </div>
            <h3 className="font-serif text-xl text-ink-700 font-semibold leading-tight">
              {person.name}
            </h3>
            <p className="font-body text-paper-600 text-xs mt-1">
              {person.birthYear} — {person.deathYear}
            </p>
            <p className="font-body text-paper-500 text-[11px] mt-0.5">
              {person.occupation}
            </p>
          </div>
        </div>

        <div className="mb-4 p-3 bg-paper-50/80 rounded-sm border border-paper-200/60">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-xs text-paper-600">当前状态（{currentYear}年）</span>
            <span
              className="font-body text-xs font-semibold"
              style={{ color: statusColor }}
            >
              {statusLabel}
            </span>
          </div>
          <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${activity * 100}%`,
                backgroundColor: statusColor,
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="text-gold-500 text-sm">❧</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>

        <blockquote className="font-serif text-paper-700 text-sm italic leading-relaxed mb-4">
          {person.quote}
        </blockquote>

        <p className="font-body text-paper-700 text-sm leading-relaxed mb-5">
          {person.description}
        </p>

        {relations.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Link2 size={14} className="text-gold-600" />
              <h4 className="font-serif text-base text-ink-700 font-semibold">
                关联人物
              </h4>
              <span className="font-body text-xs text-paper-500">
                ({activeRelations.length}/{relations.length})
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
            </div>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {relations.map((rel) => {
                const otherId = rel.source === personId ? rel.target : rel.source;
                const otherPerson = persons.find((p) => p.id === otherId);
                if (!otherPerson) return null;

                const isActive = activeRelations.some((r) => r.id === rel.id);

                return (
                  <button
                    key={rel.id}
                    onClick={() => onSelectPerson(otherId)}
                    className={`w-full text-left rounded-sm p-2.5 border transition-all duration-200 group ${
                      isActive
                        ? 'bg-paper-50/80 border-paper-200/60 hover:border-gold-300/50'
                        : 'bg-paper-50/30 border-paper-100/40 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-block px-1.5 py-0.5 rounded-sm text-paper-100 text-[9px] font-body"
                        style={{
                          backgroundColor: RELATION_COLORS[rel.type as RelationType],
                        }}
                      >
                        {getRelationTypeLabel(rel.type as RelationType)}
                      </span>
                      <span className="font-body text-[10px] text-paper-500">
                        {rel.era}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: CATEGORY_COLORS[otherPerson.category],
                        }}
                      />
                      <span className="font-serif text-ink-700 text-sm font-semibold group-hover:text-gold-700 transition-colors">
                        {otherPerson.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
