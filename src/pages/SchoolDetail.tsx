import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, BookOpen, Calendar, MapPin, Sparkles, ArrowRight, GitBranch, Star } from 'lucide-react';
import {
  getCulturalSchoolById,
  getCulturalSchools,
  CULTURAL_CATEGORY_LABELS,
  CULTURAL_CATEGORY_COLORS,
  CULTURAL_CATEGORY_ICONS,
} from '@/data/culturalSchools';
import { persons } from '@/data/persons';
import { CulturalCategory } from '@/types';

const categoryStyles: Record<CulturalCategory, {
  bgGradient: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  sectionLine: string;
  glow: string;
}> = {
  literature: {
    bgGradient: 'from-amber-50 via-amber-100/40 to-paper-100',
    accentBg: 'bg-gradient-to-br from-amber-500 to-amber-700',
    accentText: 'text-amber-800',
    accentBorder: 'border-amber-400/50',
    sectionLine: 'from-transparent via-amber-400/60 to-amber-400/60',
    glow: 'shadow-[0_0_80px_rgba(217,119,6,0.1)]',
  },
  music: {
    bgGradient: 'from-rose-50 via-rose-100/40 to-paper-100',
    accentBg: 'bg-gradient-to-br from-rose-500 to-rose-700',
    accentText: 'text-rose-800',
    accentBorder: 'border-rose-400/50',
    sectionLine: 'from-transparent via-rose-400/60 to-rose-400/60',
    glow: 'shadow-[0_0_80px_rgba(244,63,94,0.1)]',
  },
  painting: {
    bgGradient: 'from-sky-50 via-sky-100/40 to-paper-100',
    accentBg: 'bg-gradient-to-br from-sky-500 to-sky-700',
    accentText: 'text-sky-800',
    accentBorder: 'border-sky-400/50',
    sectionLine: 'from-transparent via-sky-400/60 to-sky-400/60',
    glow: 'shadow-[0_0_80px_rgba(14,165,233,0.1)]',
  },
  philosophy: {
    bgGradient: 'from-emerald-50 via-emerald-100/40 to-paper-100',
    accentBg: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    accentText: 'text-emerald-800',
    accentBorder: 'border-emerald-400/50',
    sectionLine: 'from-transparent via-emerald-400/60 to-emerald-400/60',
    glow: 'shadow-[0_0_80px_rgba(16,185,129,0.1)]',
  },
};

export default function SchoolDetail() {
  const { id } = useParams<{ id: string }>();
  const school = id ? getCulturalSchoolById(id) : undefined;

  if (!school) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-paper-50 to-paper-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-ink-600 mb-4">未找到该流派</h1>
          <Link
            to="/culture"
            className="inline-flex items-center gap-2 text-gold-700 hover:text-gold-800 font-body"
          >
            <ArrowLeft size={16} />
            返回文化演化脉络
          </Link>
        </div>
      </div>
    );
  }

  const styles = categoryStyles[school.category];
  const categoryColors = CULTURAL_CATEGORY_COLORS[school.category];
  const parentSchools = school.parentSchoolIds
    .map((pid) => getCulturalSchoolById(pid))
    .filter(Boolean);
  const influencedSchools = school.influencedSchoolIds
    .map((sid) => getCulturalSchoolById(sid))
    .filter(Boolean);

  const allSchools = getCulturalSchools();
  const sameCategorySchools = allSchools.filter(
    (s) => s.category === school.category && s.id !== school.id
  );

  return (
    <div className={`min-h-screen bg-gradient-to-b ${styles.bgGradient} relative overflow-hidden ${styles.glow}`}>
      <div className="absolute inset-0 paper-bg opacity-30" />

      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          `radial-gradient(ellipse at 20% 10%, rgba(255, 248, 225, 0.3) 0%, transparent 50%), 
           radial-gradient(ellipse at 80% 90%, rgba(184, 151, 82, 0.08) 0%, transparent 50%)`,
      }} />

      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/culture"
              className={`inline-flex items-center gap-2 ${styles.accentText} hover:opacity-75 transition-colors duration-300 font-body text-sm group`}
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>返回文化演化脉络</span>
            </Link>

            <Link
              to="/star-map"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border ${styles.accentBorder} ${styles.accentText} hover:opacity-80 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm`}
            >
              <Sparkles size={14} />
              <span>✦ 星 空 漫 游 ✦</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className={`w-16 h-px bg-gradient-to-r from-transparent ${categoryColors.border.replace('border', 'bg').replace('/50', '/50')}`} />
              <span className={`${styles.accentBg} text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                {CULTURAL_CATEGORY_ICONS[school.category]}
              </span>
              <div className={`w-16 h-px bg-gradient-to-l from-transparent ${categoryColors.border.replace('border', 'bg').replace('/50', '/50')}`} />
            </div>

            <p className={`font-decorative text-xs tracking-[0.3em] ${styles.accentText} opacity-70 mb-3`}>
              {CULTURAL_CATEGORY_LABELS[school.category]}流派
            </p>

            <h1 className={`font-serif text-4xl md:text-5xl font-bold ${styles.accentText} mb-4`}>
              {school.name}
            </h1>

            <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-paper-600 font-body">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className={styles.accentText} />
                {school.yearStart} — {school.yearEnd || '至今'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className={styles.accentText} />
                起源于 {school.origin}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} className={styles.accentText} />
                {school.representativePersons.length} 位代表人物
              </span>
            </div>
          </div>

          <div className={`relative rounded-sm border ${styles.accentBorder} bg-white/60 backdrop-blur-sm p-8 md:p-10 shadow-paper mb-10`}>
            <div className={`absolute top-0 left-0 right-0 h-1 ${styles.accentBg}`} />
            <div className="flex items-start gap-3 mb-4">
              <Sparkles size={20} className={`${styles.accentText} mt-0.5 shrink-0`} />
              <h2 className={`font-serif text-xl font-semibold ${styles.accentText}`}>
                历史影响
              </h2>
            </div>
            <p className="font-serif text-lg leading-8 text-ink-700 italic pl-8">
              "{school.influenceDescription}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <section className={`rounded-sm border ${styles.accentBorder} bg-white/50 p-6 shadow-sm`}>
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-10 h-px bg-gradient-to-r ${styles.sectionLine}`} />
                <h3 className={`font-serif text-lg font-semibold ${styles.accentText}`}>
                  核心理念
                </h3>
              </div>
              <ul className="space-y-3">
                {school.keyIdeas.map((idea, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`${styles.accentText} font-decorative mt-0.5`}>✦</span>
                    <span className="font-body text-base text-ink-700 leading-relaxed">
                      {idea}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={`rounded-sm border ${styles.accentBorder} bg-white/50 p-6 shadow-sm`}>
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-10 h-px bg-gradient-to-r ${styles.sectionLine}`} />
                <h3 className={`font-serif text-lg font-semibold ${styles.accentText}`}>
                  艺术特征
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {school.characteristics.map((char, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-sm text-sm font-decorative tracking-wider ${categoryColors.bg} ${styles.accentText} border ${styles.accentBorder}`}
                  >
                    {char}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-8 mb-4">
                <div className={`w-10 h-px bg-gradient-to-r ${styles.sectionLine}`} />
                <h3 className={`font-serif text-lg font-semibold ${styles.accentText}`}>
                  历史背景
                </h3>
              </div>
              <p className="font-body text-sm text-ink-600 leading-relaxed">
                {school.historicalContext}
              </p>
            </section>
          </div>

          <section className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-px bg-gradient-to-r ${styles.sectionLine}`} />
              <h2 className={`font-serif text-2xl font-semibold ${styles.accentText}`}>
                代表人物
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {school.representativePersons.map((rp, idx) => {
                const matchedPerson = rp.id ? persons.find((p) => p.id === rp.id) : undefined;
                return matchedPerson ? (
                  <Link
                    key={idx}
                    to={`/person/${matchedPerson.id}`}
                    className={`group rounded-sm border ${styles.accentBorder} bg-white/60 p-5 transition-all duration-300 hover:shadow-paper-lg hover:-translate-y-0.5`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full ${styles.accentBg} flex items-center justify-center text-white font-serif text-sm shadow-sm`}>
                        {matchedPerson.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className={`font-serif text-base font-semibold ${styles.accentText} group-hover:opacity-80`}>
                          {matchedPerson.name}
                        </h4>
                        {rp.years && (
                          <p className="font-body text-xs text-paper-500">{rp.years}</p>
                        )}
                      </div>
                    </div>
                    {rp.role && (
                      <p className="font-body text-sm text-paper-600 pl-13">{rp.role}</p>
                    )}
                    <div className={`mt-3 flex items-center gap-1 text-xs ${styles.accentText} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <span>查看详情</span>
                      <ArrowRight size={12} />
                    </div>
                  </Link>
                ) : (
                  <div
                    key={idx}
                    className={`rounded-sm border ${styles.accentBorder} bg-white/40 p-5`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full ${categoryColors.bg} ${styles.accentBorder} border flex items-center justify-center ${styles.accentText} font-serif text-sm`}>
                        {rp.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className={`font-serif text-base font-semibold ${styles.accentText}`}>
                          {rp.name}
                        </h4>
                        {rp.years && (
                          <p className="font-body text-xs text-paper-500">{rp.years}</p>
                        )}
                      </div>
                    </div>
                    {rp.role && (
                      <p className="font-body text-sm text-paper-600">{rp.role}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {school.representativeWorks.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-px bg-gradient-to-r ${styles.sectionLine}`} />
                <h2 className={`font-serif text-2xl font-semibold ${styles.accentText}`}>
                  代表作品
                </h2>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {school.representativeWorks.map((work, idx) => (
                  <div
                    key={idx}
                    className={`group relative rounded-sm border ${styles.accentBorder} bg-white/60 p-5 overflow-hidden transition-all duration-300 hover:shadow-paper`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    <div className="relative">
                      <BookOpen size={20} className={`${styles.accentText} mb-3 opacity-70`} />
                      <h4 className={`font-serif text-lg font-semibold ${styles.accentText} mb-1`}>
                        《{work.title}》
                      </h4>
                      <p className="font-body text-sm text-paper-600">
                        {work.author}
                        {work.year && ` · ${work.year}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(parentSchools.length > 0 || influencedSchools.length > 0) && (
            <section className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-px bg-gradient-to-r ${styles.sectionLine}`} />
                <h2 className={`font-serif text-2xl font-semibold ${styles.accentText}`}>
                  流派谱系
                </h2>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {parentSchools.length > 0 && (
                  <div className={`rounded-sm border ${styles.accentBorder} bg-white/50 p-6`}>
                    <div className="flex items-center gap-2 mb-4">
                      <GitBranch size={18} className={styles.accentText} />
                      <h3 className={`font-serif text-lg font-semibold ${styles.accentText}`}>
                        前驱流派
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {parentSchools.map((ps) => (
                        ps && (
                          <Link
                            key={ps.id}
                            to={`/school/${ps.id}`}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-sm font-decorative ${categoryColors.bg} ${styles.accentText} border ${styles.accentBorder} hover:opacity-80 transition-opacity`}
                          >
                            <Star size={12} />
                            {ps.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {influencedSchools.length > 0 && (
                  <div className={`rounded-sm border ${styles.accentBorder} bg-white/50 p-6`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={18} className={styles.accentText} />
                      <h3 className={`font-serif text-lg font-semibold ${styles.accentText}`}>
                        影响后世
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {influencedSchools.map((is) => (
                        is && (
                          <Link
                            key={is.id}
                            to={`/school/${is.id}`}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-sm font-decorative ${categoryColors.bg} ${styles.accentText} border ${styles.accentBorder} hover:opacity-80 transition-opacity`}
                          >
                            <Star size={12} />
                            {is.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {sameCategorySchools.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-px bg-gradient-to-r ${styles.sectionLine}`} />
                <h2 className={`font-serif text-2xl font-semibold ${styles.accentText}`}>
                  更多{CULTURAL_CATEGORY_LABELS[school.category]}流派
                </h2>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent" />
              </div>

              <div className="flex flex-wrap gap-2">
                {sameCategorySchools.slice(0, 8).map((s) => (
                  <Link
                    key={s.id}
                    to={`/school/${s.id}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm font-decorative tracking-wider bg-white/50 ${styles.accentText} border ${styles.accentBorder} hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300`}
                  >
                    <span className="text-xs">✦</span>
                    {s.name}
                    <span className="text-xs text-paper-400 ml-1">
                      ({s.yearStart}—{s.yearEnd || '今'})
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/culture"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border ${styles.accentBorder} ${styles.accentText} hover:opacity-80 transition-opacity font-decorative text-sm tracking-[0.15em]`}
                >
                  <BookOpen size={16} />
                  浏览全部{CULTURAL_CATEGORY_LABELS[school.category]}流派
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className={`w-20 h-px bg-gradient-to-r from-transparent ${categoryColors.border.replace('border', 'bg').replace('/50', '/30')}`} />
            <span className={`${styles.accentText} opacity-50 text-sm`}>✦</span>
            <div className={`w-20 h-px bg-gradient-to-l from-transparent ${categoryColors.border.replace('border', 'bg').replace('/50', '/30')}`} />
          </div>
          <p className="font-body text-paper-500 text-sm">
            昨日的世界 · 一个欧洲人的回忆 · 文化学习平台
          </p>
        </div>
      </footer>
    </div>
  );
}
