import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, BookOpen, Music, Brain, Palette, Users, Play, RotateCcw, Sparkles, Globe2 } from 'lucide-react';
import RelationGraph from '@/components/RelationGraph';
import { persons, getPersonById } from '@/data/persons';
import { getRelationsByPersonId, getRelationTypeLabel, RelationType } from '@/data/relations';
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

const RELATION_STYLES: Record<RelationType, { label: string; color: string; dash: string }> = {
  friendship: { label: '友谊', color: '#d4a017', dash: '' },
  influence: { label: '影响', color: '#8b6914', dash: '6,3' },
  collaboration: { label: '合作', color: '#b8860b', dash: '' },
  mentorship: { label: '师承', color: '#a67d4d', dash: '' },
  intellectual: { label: '思想对话', color: '#7d5a2e', dash: '3,3' },
  contemporary: { label: '同时代', color: '#c4a76c', dash: '' },
};

export default function PersonRelationPage() {
  const [selectedCategories, setSelectedCategories] = useState<PersonCategory[]>([
    'literature',
    'music',
    'philosophy',
    'art',
  ]);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleCategory = useCallback((cat: PersonCategory) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat];
      const currentPerson = selectedPersonId ? getPersonById(selectedPersonId) : null;
      if (currentPerson && !next.includes(currentPerson.category)) {
        setSelectedPersonId(null);
      }
      return next;
    });
    setAnimationPhase(0);
    setTimeout(() => setAnimationPhase(1), 50);
  }, [selectedPersonId]);

  const handlePlayAnimation = useCallback(() => {
    setAnimationPhase(0);
    setIsAnimating(true);
    setTimeout(() => {
      setAnimationPhase(1);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 100);
  }, []);

  const handleReset = useCallback(() => {
    setAnimationPhase(0);
    setSelectedPersonId(null);
    setTimeout(() => setAnimationPhase(1), 50);
  }, []);

  const selectedPerson = selectedPersonId ? getPersonById(selectedPersonId) : null;
  const selectedRelations = selectedPersonId
    ? getRelationsByPersonId(selectedPersonId)
    : [];

  const totalPersons = persons.filter((p) =>
    selectedCategories.includes(p.category)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative flex flex-col">
      <div className="absolute inset-0 paper-bg opacity-40" />

      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">返回时间线</span>
            </Link>

            <div className="text-center">
              <h1 className="font-serif text-3xl text-ink-700 font-semibold">
                人物关系
              </h1>
              <p className="font-body text-paper-500 text-sm mt-1 italic">
                文化圈层 · 精神网络
              </p>
            </div>

            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
            >
              <span className="hidden sm:inline">昨 日 地 图</span>
              <span className="sm:hidden">地 图</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-lg">❧</span>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              to="/network-simulator"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-sm bg-gradient-to-r from-gold-600 to-gold-700 text-paper-100 font-body text-sm hover:from-gold-700 hover:to-gold-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Globe2 size={18} className="animate-pulse" />
              <div className="text-left">
                <div className="font-semibold">文化网络模拟器</div>
                <div className="text-[10px] opacity-90">观察生态圈的形成与瓦解 →</div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-6 flex-1 pb-8">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-paper-600 font-body text-sm">
                  <Users size={16} />
                  <span>类别筛选</span>
                </div>
                {(Object.keys(CATEGORY_CONFIG) as PersonCategory[]).map((cat) => {
                  const config = CATEGORY_CONFIG[cat];
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-body transition-all duration-300 ${
                        active
                          ? 'border-current bg-paper-100 shadow-paper text-paper-800'
                          : 'border-paper-300/40 bg-paper-50/50 text-paper-500 opacity-60'
                      }`}
                      style={active ? { color: config.color, borderColor: config.color } : undefined}
                    >
                      {config.icon}
                      <span>{config.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayAnimation}
                  disabled={isAnimating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-gold-500/40 bg-gold-500/5 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 text-xs font-body disabled:opacity-50"
                >
                  <Sparkles size={14} />
                  <span className="hidden sm:inline">展示圈层形成</span>
                  <span className="sm:hidden">动画</span>
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-paper-300/40 text-paper-600 hover:bg-paper-100 transition-all duration-300 text-xs font-body"
                >
                  <RotateCcw size={14} />
                  <span className="hidden sm:inline">重置</span>
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-[450px] lg:min-h-0 bg-paper-50/60 rounded-sm border border-paper-300/50 shadow-paper relative overflow-hidden">
              <RelationGraph
                selectedCategories={selectedCategories}
                selectedPersonId={selectedPersonId}
                onSelectPerson={setSelectedPersonId}
                animationPhase={animationPhase}
              />
            </div>

            <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-6 flex-wrap">
                <span className="font-body text-paper-600 text-xs">关系类型：</span>
                {(Object.keys(RELATION_STYLES) as RelationType[]).map((type) => {
                  const style = RELATION_STYLES[type];
                  return (
                    <div key={type} className="flex items-center gap-1.5">
                      <svg width="24" height="4" className="flex-shrink-0">
                        <line
                          x1="0"
                          y1="2"
                          x2="24"
                          y2="2"
                          stroke={style.color}
                          strokeWidth="2"
                          strokeDasharray={style.dash}
                        />
                      </svg>
                      <span className="font-body text-paper-600 text-xs">{style.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="font-body text-paper-500 text-xs">
                共 {totalPersons} 位人物
              </div>
            </div>
          </div>

          {selectedPerson && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-paper-100/90 backdrop-blur-sm rounded-sm border border-paper-300/60 shadow-paper-lg sticky top-8">
                <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-50" />

                <div className="relative">
                  <div className="p-6">
                    <button
                      onClick={() => setSelectedPersonId(null)}
                      className="absolute top-4 right-4 text-paper-500 hover:text-ink-700 transition-colors"
                    >
                      <X size={16} />
                    </button>

                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={selectedPerson.imageUrl}
                        alt={selectedPerson.name}
                        className="w-16 h-20 object-cover rounded-sm sepia-[0.15] border border-paper-300/60 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-paper-100 text-[10px] font-body mb-1"
                          style={{
                            backgroundColor: CATEGORY_CONFIG[selectedPerson.category].color,
                          }}
                        >
                          {CATEGORY_CONFIG[selectedPerson.category].icon}
                          {CATEGORY_CONFIG[selectedPerson.category].label}
                        </div>
                        <h3 className="font-serif text-xl text-ink-700 font-semibold leading-tight">
                          {selectedPerson.name}
                        </h3>
                        <p className="font-body text-paper-600 text-xs mt-1">
                          {selectedPerson.birthYear} — {selectedPerson.deathYear}
                        </p>
                        <p className="font-body text-paper-500 text-[11px] mt-0.5">
                          {selectedPerson.occupation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
                      <span className="text-gold-500 text-sm">❧</span>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
                    </div>

                    <blockquote className="font-serif text-paper-700 text-sm italic leading-relaxed mb-4">
                      {selectedPerson.quote}
                    </blockquote>

                    <p className="font-body text-paper-700 text-sm leading-relaxed mb-6 line-clamp-4">
                      {selectedPerson.description}
                    </p>

                    {selectedRelations.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="font-serif text-base text-ink-700 font-semibold whitespace-nowrap">
                            关联人物 ({selectedRelations.length})
                          </h4>
                          <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
                        </div>

                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {selectedRelations.map((rel) => {
                            const otherId =
                              rel.source === selectedPersonId ? rel.target : rel.source;
                            const otherPerson = persons.find((p) => p.id === otherId);
                            if (!otherPerson) return null;

                            return (
                              <button
                                key={rel.id}
                                onClick={() => setSelectedPersonId(otherId)}
                                className="w-full text-left bg-paper-50/80 hover:bg-paper-100 rounded-sm p-3 border border-paper-200/60 hover:border-gold-300/50 transition-all duration-200 group"
                              >
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span
                                    className="inline-block px-1.5 py-0.5 rounded-sm text-paper-100 text-[10px] font-body"
                                    style={{
                                      backgroundColor:
                                        RELATION_STYLES[rel.type].color,
                                    }}
                                  >
                                    {getRelationTypeLabel(rel.type)}
                                  </span>
                                  <span className="font-body text-paper-500 text-[10px]">
                                    {rel.era}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 mb-1.5">
                                  <div
                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{
                                      backgroundColor:
                                        CATEGORY_CONFIG[otherPerson.category].color,
                                    }}
                                  />
                                  <span className="font-serif text-ink-700 text-sm font-semibold group-hover:text-gold-700 transition-colors">
                                    {otherPerson.name}
                                  </span>
                                </div>

                                <p className="font-body text-paper-600 text-xs leading-relaxed line-clamp-2">
                                  {rel.description}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    <Link
                      to={`/person/${selectedPerson.id}`}
                      className="mt-6 inline-flex items-center gap-2 text-gold-700 hover:text-gold-600 transition-colors font-body text-sm group"
                    >
                      <span>查看完整人物档案</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selectedPerson && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-paper-100/70 backdrop-blur-sm rounded-sm border border-paper-300/40 shadow-paper sticky top-8">
                <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
                <div className="relative p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold-500/10 flex items-center justify-center">
                      <Users size={20} className="text-gold-600" />
                    </div>
                    <h3 className="font-serif text-lg text-ink-700 font-semibold mb-2">
                      探索人物关系
                    </h3>
                    <p className="font-body text-paper-600 text-sm leading-relaxed">
                      点击图中的人物节点，查看其生平简介与文化关联。
                    </p>
                  </div>

                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-paper-300/50" />
                    <span className="text-paper-400 text-sm">✦</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-paper-300/50" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-literature/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookOpen size={12} className="text-gold-700" />
                      </div>
                      <div>
                        <p className="font-body text-ink-600 text-xs font-semibold">四大文化圈层</p>
                        <p className="font-body text-paper-500 text-xs">文学、音乐、哲学、艺术交织成网</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles size={12} className="text-gold-600" />
                      </div>
                      <div>
                        <p className="font-body text-ink-600 text-xs font-semibold">动态力导向图</p>
                        <p className="font-body text-paper-500 text-xs">人物节点自然聚集形成文化圈层</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Play size={12} className="text-gold-600" />
                      </div>
                      <div>
                        <p className="font-body text-ink-600 text-xs font-semibold">动画展示</p>
                        <p className="font-body text-paper-500 text-xs">点击"展示圈层形成"观看动画效果</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-paper-200/60">
                    <Link
                      to="/network-simulator"
                      className="block w-full"
                    >
                      <div className="flex items-start gap-3 p-3 rounded-sm bg-gradient-to-r from-gold-500/10 to-transparent border border-gold-500/30 hover:bg-gold-500/20 transition-colors group">
                        <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Globe2 size={12} className="text-gold-700" />
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-ink-600 text-xs font-semibold group-hover:text-gold-700 transition-colors">
                            ✨ 文化网络模拟器
                          </p>
                          <p className="font-body text-paper-500 text-xs">
                            随时间观察生态圈的形成与瓦解
                          </p>
                        </div>
                        <span className="text-gold-600 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
