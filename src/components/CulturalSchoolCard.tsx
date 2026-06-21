import { CulturalSchool, CulturalCategory } from '@/types';
import { CULTURAL_CATEGORY_COLORS, CULTURAL_CATEGORY_ICONS, getCulturalSchoolById } from '@/data/culturalSchools';
import { ChevronDown, ChevronUp, Users, BookOpen, Lightbulb, MapPin, Calendar, ArrowRight, Link2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  school: CulturalSchool;
  onToggle?: () => void;
  isExpanded?: boolean;
  hasChildren?: boolean;
  depth?: number;
}

export default function CulturalSchoolCard({ school, onToggle, isExpanded = true, hasChildren = false, depth = 0 }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const colors = CULTURAL_CATEGORY_COLORS[school.category];
  const categoryIcon = CULTURAL_CATEGORY_ICONS[school.category];

  const influencedSchools = school.influencedSchoolIds
    .map(id => getCulturalSchoolById(id))
    .filter(Boolean) as CulturalSchool[];

  return (
    <div className="relative">
      <div
        className={`relative group rounded-sm border transition-all duration-500 overflow-hidden ${colors.border} bg-white/80 backdrop-blur-sm hover:shadow-paper-lg ${
          showDetails ? 'shadow-paper' : ''
        }`}
        style={{ marginLeft: depth > 0 ? `${depth * 1.5}rem` : 0 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-60 pointer-events-none`} />
        <div className="absolute inset-0 paper-bg opacity-25 pointer-events-none rounded-sm" />

        {depth > 0 && (
          <div className="absolute left-0 top-1/2 -translate-x-full w-6 h-px opacity-40" style={{
            background: `linear-gradient(to left, currentColor, transparent)`,
            color: colors.text.replace('text-', '')
          }}>
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${colors.accent} opacity-60`} />
          </div>
        )}

        <div className="relative p-5 md:p-6">
          <div className="flex items-start gap-4 md:gap-6">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-sm flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br ${colors.primary}`}>
              <span className="text-2xl md:text-3xl">{categoryIcon}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className={`font-serif text-xl md:text-2xl font-bold ${colors.text}`}>
                    {school.name}
                  </h3>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-body ${colors.bg} ${colors.text} border ${colors.border}`}>
                    <Calendar size={12} />
                    <span className="tabular-nums">
                      {school.yearStart} — {school.yearEnd || '至今'}
                    </span>
                  </div>
                </div>

                {hasChildren && (
                  <button
                    onClick={onToggle}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-300 ${colors.bg} ${colors.text} border ${colors.border} hover:scale-105 active:scale-95`}
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                )}
              </div>

              <div className={`flex items-center gap-2 mb-3 text-sm ${colors.text} opacity-75`}>
                <MapPin size={13} />
                <span className="font-body">{school.origin}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {school.characteristics.map((char, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 text-xs font-body rounded-sm ${colors.bg} ${colors.text} opacity-80 border ${colors.border}`}
                  >
                    {char}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`inline-flex items-center gap-1.5 text-sm font-body transition-all duration-300 ${colors.text} hover:opacity-80 group/btn`}
              >
                <span>{showDetails ? '收起详情' : '查看详细内容'}</span>
                <span className={`transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`}>
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>

          {showDetails && (
            <div className="mt-6 pt-6 border-t border-paper-200/60 space-y-6" style={{ animation: 'slideDown 0.4s ease-out' }}>
              <div>
                <div className={`flex items-center gap-2 mb-3 ${colors.text}`}>
                  <Lightbulb size={16} />
                  <span className="font-decorative text-sm tracking-wider">核 心 理 念</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {school.keyIdeas.map((idea, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 p-3 rounded-sm ${colors.bg} ${colors.text}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-serif font-bold mt-0.5 bg-gradient-to-br ${colors.primary} text-white`}>
                        {i + 1}
                      </span>
                      <span className="font-body text-sm leading-relaxed">{idea}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className={`flex items-center gap-2 mb-3 ${colors.text}`}>
                  <Users size={16} />
                  <span className="font-decorative text-sm tracking-wider">代 表 人 物</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {school.representativePersons.map((person, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-sm border ${colors.border} bg-white/60`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        {person.id ? (
                          <Link
                            to={`/person/${person.id}`}
                            className={`font-serif font-semibold ${colors.text} hover:underline transition-colors`}
                          >
                            {person.name}
                          </Link>
                        ) : (
                          <span className={`font-serif font-semibold ${colors.text}`}>
                            {person.name}
                          </span>
                        )}
                        {person.years && (
                          <span className={`text-xs font-body tabular-nums opacity-60 ${colors.text}`}>
                            {person.years}
                          </span>
                        )}
                      </div>
                      {person.role && (
                        <p className={`text-xs font-body mt-1 opacity-75 ${colors.text}`}>
                          {person.role}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className={`flex items-center gap-2 mb-3 ${colors.text}`}>
                  <BookOpen size={16} />
                  <span className="font-decorative text-sm tracking-wider">代 表 作 品</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {school.representativeWorks.map((work, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-sm ${colors.bg} border ${colors.border}`}
                    >
                      <p className={`font-serif text-sm font-semibold ${colors.text}`}>
                        《{work.title}》
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-body opacity-75 ${colors.text}`}>
                          {work.author}
                        </span>
                        {work.year && (
                          <>
                            <span className={`text-xs opacity-50 ${colors.text}`}>·</span>
                            <span className={`text-xs font-body tabular-nums opacity-75 ${colors.text}`}>
                              {work.year}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className={`flex items-center gap-2 mb-3 ${colors.text}`}>
                  <Lightbulb size={16} />
                  <span className="font-decorative text-sm tracking-wider">历 史 背 景</span>
                </div>
                <div className={`p-4 rounded-sm ${colors.bg} border ${colors.border}`}>
                  <p className={`font-body text-sm leading-relaxed ${colors.text} opacity-90`}>
                    {school.historicalContext}
                  </p>
                </div>
              </div>

              {influencedSchools.length > 0 && (
                <div>
                  <div className={`flex items-center gap-2 mb-3 ${colors.text}`}>
                    <Link2 size={16} />
                    <span className="font-decorative text-sm tracking-wider">直 接 影 响</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {influencedSchools.map((s, i) => (
                      <div
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border ${colors.border} bg-white/60 ${colors.text} transition-all duration-300 hover:${colors.bg} hover:-translate-y-0.5 cursor-pointer`}
                      >
                        <span className="text-xs">{CULTURAL_CATEGORY_ICONS[s.category]}</span>
                        <span className="text-sm font-body">{s.name}</span>
                        <span className={`text-xs opacity-60 tabular-nums`}>
                          ({s.yearStart})
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-3 p-3 rounded-sm ${colors.bg} border-l-4 ${colors.border} ${colors.text}`}>
                    <p className="font-body text-sm leading-relaxed opacity-90">
                      {school.influenceDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
