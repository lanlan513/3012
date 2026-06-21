import { useParams, Link } from 'react-router-dom';
import { getPersonById } from '@/data/persons';
import { getChapterById } from '@/data/chapters';
import { getPersonTimeline } from '@/data/timelineEntries';
import { ArrowLeft, Users, Clock, MapPin, Coffee, Sparkles } from 'lucide-react';
import { CATEGORY_LABELS } from '@/data/persons';
import { useState, useMemo, useEffect } from 'react';
import { WarEra, TimelineEntry } from '@/types';
import InteractiveTimeline from '@/components/InteractiveTimeline';

const ERA_THEMES: Record<WarEra, {
  overlay: string;
  vignette: string;
  imageFilter: string;
  borderAccent: string;
  quoteBg: string;
  pageBg: string;
  textTint: string;
  titleColor: string;
  ambientGlow: string;
  texturePattern: string;
}> = {
  'pre-war': {
    overlay: 'bg-gradient-to-b from-amber-100/30 via-transparent to-amber-50/20',
    vignette: '',
    imageFilter: 'sepia-[0.15] saturate-[1.1]',
    borderAccent: 'border-gold-500/50',
    quoteBg: 'bg-gradient-to-r from-gold-50/50 via-amber-50/40 to-gold-50/50',
    pageBg: 'from-paper-50 via-amber-50/30 to-paper-100',
    textTint: 'text-amber-900',
    titleColor: 'text-amber-950',
    ambientGlow: 'shadow-[0_0_120px_rgba(212,160,23,0.12)]',
    texturePattern: '',
  },
  'war': {
    overlay: 'bg-gradient-to-b from-red-900/15 via-red-700/8 to-red-950/15',
    vignette: 'shadow-[inset_0_0_150px_rgba(127,29,29,0.2)]',
    imageFilter: 'sepia-[0.45] contrast-[1.15] saturate-[0.85]',
    borderAccent: 'border-red-500/40',
    quoteBg: 'bg-gradient-to-r from-red-50/50 via-rose-50/40 to-red-50/50',
    pageBg: 'from-paper-100 via-red-50/25 to-paper-200',
    textTint: 'text-red-950',
    titleColor: 'text-red-900',
    ambientGlow: 'shadow-[0_0_120px_rgba(185,28,28,0.15)]',
    texturePattern: '',
  },
  'interwar': {
    overlay: 'bg-gradient-to-b from-blue-100/20 via-transparent to-indigo-50/15',
    vignette: '',
    imageFilter: 'sepia-[0.2] saturate-[0.92] contrast-[1.02]',
    borderAccent: 'border-blue-400/35',
    quoteBg: 'bg-gradient-to-r from-blue-50/40 via-sky-50/30 to-blue-50/40',
    pageBg: 'from-paper-50 via-blue-50/20 to-paper-100',
    textTint: 'text-blue-950',
    titleColor: 'text-blue-900',
    ambientGlow: 'shadow-[0_0_120px_rgba(59,130,246,0.1)]',
    texturePattern: '',
  },
  'wwii': {
    overlay: 'bg-gradient-to-b from-gray-900/25 via-gray-800/12 to-gray-950/25',
    vignette: 'shadow-[inset_0_0_180px_rgba(0,0,0,0.35)]',
    imageFilter: 'sepia-[0.55] contrast-[1.2] brightness-[0.8] saturate-[0.7]',
    borderAccent: 'border-gray-600/50',
    quoteBg: 'bg-gradient-to-r from-gray-100/50 via-stone-100/40 to-gray-100/50',
    pageBg: 'from-gray-100 via-stone-100/50 to-gray-200',
    textTint: 'text-gray-900',
    titleColor: 'text-gray-950',
    ambientGlow: 'shadow-[0_0_120px_rgba(0,0,0,0.2)]',
    texturePattern: '',
  },
};

const ERA_DESCRIPTIONS: Record<WarEra, { label: string; sublabel: string; emotion: string; atmosphere: string }> = {
  'pre-war': { label: '太平盛世', sublabel: '欧洲的黄金时代，人们对进步与理性充满信心', emotion: '✦', atmosphere: '阳光灿烂的岁月' },
  'war': { label: '一战烽火', sublabel: '战争摧毁了旧世界，理性在炮火面前不堪一击', emotion: '⚔', atmosphere: '硝烟弥漫的年代' },
  'interwar': { label: '短暂和平', sublabel: '在废墟上重建文明，但新的危机已在暗处酝酿', emotion: '❧', atmosphere: '风雨欲来的平静' },
  'wwii': { label: '黑暗深渊', sublabel: '欧洲文明最后的崩塌，昨日的世界从此消逝', emotion: '✝', atmosphere: '长夜未尽的寒冬' },
};

const ERA_YEAR_MILESTONES: Record<WarEra, { year: number; event: string; color: string }[]> = {
  'pre-war': [
    { year: 1889, event: '埃菲尔铁塔落成', color: 'text-gold-700' },
    { year: 1900, event: '巴黎世博会', color: 'text-gold-700' },
    { year: 1913, event: '战前最后一个和平年', color: 'text-gold-700' },
  ],
  'war': [
    { year: 1914, event: '战争爆发', color: 'text-red-800' },
    { year: 1916, event: '凡尔登战役', color: 'text-red-800' },
    { year: 1918, event: '战争结束', color: 'text-red-800' },
  ],
  'interwar': [
    { year: 1925, event: '洛迦诺公约', color: 'text-blue-800' },
    { year: 1929, event: '经济大萧条', color: 'text-blue-800' },
    { year: 1933, event: '希特勒上台', color: 'text-blue-800' },
  ],
  'wwii': [
    { year: 1939, event: '二战爆发', color: 'text-gray-800' },
    { year: 1941, event: '战争白热化', color: 'text-gray-800' },
    { year: 1945, event: '战争终结', color: 'text-gray-800' },
  ],
};

export default function PersonDetail() {
  const { id } = useParams<{ id: string }>();
  const person = getPersonById(id || '');
  const [currentEra, setCurrentEra] = useState<WarEra>('pre-war');
  const [activeYear, setActiveYear] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevEra, setPrevEra] = useState<WarEra>('pre-war');

  const timelineEntries = useMemo(() => {
    if (!person) return [];
    return getPersonTimeline(person.id);
  }, [person]);

  const theme = ERA_THEMES[currentEra];
  const eraDesc = ERA_DESCRIPTIONS[currentEra];

  useEffect(() => {
    if (currentEra !== prevEra) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevEra(currentEra);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentEra, prevEra]);

  const activeEraMilestones = ERA_YEAR_MILESTONES[currentEra];

  const eraSpecificEvents = useMemo(() => {
    if (!activeYear || activeYear === 0) return [];
    return timelineEntries
      .filter(e => Math.abs(e.year - activeYear) <= 8)
      .sort((a, b) => Math.abs(a.year - activeYear) - Math.abs(b.year - activeYear))
      .slice(0, 4);
  }, [activeYear, timelineEntries]);

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-100">
        <div className="text-center">
          <p className="font-serif text-2xl text-ink-600">人物未找到</p>
          <Link to="/timeline" className="mt-4 inline-block text-gold-600 hover:text-gold-700">
            返回时间线
          </Link>
        </div>
      </div>
    );
  }

  const relatedChapters = person.chapterIds
    .map((cid) => getChapterById(cid))
    .filter(Boolean);

  const handleEraChange = (era: WarEra, year: number) => {
    setCurrentEra(era);
    setActiveYear(year);
  };

  const handleYearChange = (year: number) => {
    setActiveYear(year);
  };

  const lifeStage = activeYear > 0
    ? activeYear < person.birthYear
      ? '降生前'
      : activeYear > person.deathYear
        ? '逝世后'
        : `${activeYear - person.birthYear} 岁`
    : '';

  const lifeProgress = activeYear > 0
    ? Math.max(0, Math.min(100, Math.round(((activeYear - person.birthYear) / (person.deathYear - person.birthYear)) * 100)))
    : 0;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${theme.pageBg} relative transition-all duration-1000 ease-out ${theme.ambientGlow}`}
    >
      <div className="absolute inset-0 paper-bg opacity-35 transition-opacity duration-700" />
      <div className={`absolute inset-0 ${theme.overlay} pointer-events-none transition-all duration-1000 ease-out z-[1]`} />
      <div className={`absolute inset-0 ${theme.vignette} pointer-events-none transition-all duration-1000 ease-out z-[2]`} />

      {currentEra === 'war' && (
        <div
          className="absolute inset-0 pointer-events-none z-[2] opacity-[0.035] animate-pulse"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(127,29,29,0.5) 3px, rgba(127,29,29,0.5) 5px)',
            animationDuration: '3s',
          }}
        />
      )}
      {currentEra === 'wwii' && (
        <>
          <div
            className="absolute inset-0 pointer-events-none z-[2] opacity-[0.06]"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 6px)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03] animate-pulse"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(0,0,0,0.1) 0%, transparent 50%)',
              animationDuration: '5s',
            }}
          />
        </>
      )}
      {currentEra === 'pre-war' && (
        <div
          className="absolute inset-0 pointer-events-none z-[2] opacity-[0.025] animate-shimmer"
          style={{
            background: 'radial-gradient(ellipse at 70% 10%, rgba(212,160,23,0.2) 0%, transparent 40%)',
          }}
        />
      )}
      {currentEra === 'interwar' && (
        <div
          className="absolute inset-0 pointer-events-none z-[2] opacity-[0.04]"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59,130,246,0.03) 10px, rgba(59,130,246,0.03) 20px)',
          }}
        />
      )}

      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentEra === 'war' ? 'bg-red-900/10' :
              currentEra === 'wwii' ? 'bg-gray-900/15' :
              currentEra === 'pre-war' ? 'bg-amber-300/10' :
              'bg-blue-400/8'
            }`}
            style={{ animation: 'eraFlash 0.8s ease-out' }}
          />
        </div>
      )}

      <style>{`
        @keyframes eraFlash {
          0% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .era-slide-in {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>

      <header className="relative z-10 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>返回时间线</span>
            </Link>
            <div className="flex items-center gap-4 flex-wrap">
              {activeYear > 0 && (
                <div className={`flex items-center gap-3 px-4 py-2 rounded-sm border ${theme.borderAccent} bg-white/40 backdrop-blur-sm transition-all duration-700`}>
                  <Clock size={14} className={theme.textTint} />
                  <div className="flex items-baseline gap-2">
                    <span className={`font-serif text-2xl font-bold tabular-nums ${theme.titleColor} transition-colors duration-500`}>
                      {activeYear}
                    </span>
                    <span className={`font-body text-sm ${theme.textTint} opacity-80`}>
                      {lifeStage}
                    </span>
                  </div>
                </div>
              )}
              <Link
                to="/culture"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm hover:-translate-y-0.5 ${
                  currentEra === 'war' ? 'border-red-500/40 text-red-700 hover:bg-red-500/10' :
                  currentEra === 'wwii' ? 'border-gray-600/40 text-gray-700 hover:bg-gray-500/10' :
                  currentEra === 'interwar' ? 'border-blue-500/40 text-blue-700 hover:bg-blue-500/10' :
                  'border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100'
                }`}
              >
                <Sparkles size={14} />
                <span className="hidden sm:inline">文 化 脉 络</span>
                <span className="sm:hidden">文 化</span>
              </Link>
              <Link
                to="/cafe"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm hover:-translate-y-0.5 ${
                  currentEra === 'war' ? 'border-red-500/40 text-red-700 hover:bg-red-500/10' :
                  currentEra === 'wwii' ? 'border-gray-600/40 text-gray-700 hover:bg-gray-500/10' :
                  currentEra === 'interwar' ? 'border-blue-500/40 text-blue-700 hover:bg-blue-500/10' :
                  'border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100'
                }`}
              >
                <Coffee size={14} />
                <span className="hidden sm:inline">咖 啡 馆</span>
              </Link>
              <Link
                to="/relations"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm hover:-translate-y-0.5 ${
                  currentEra === 'war' ? 'border-red-500/40 text-red-700 hover:bg-red-500/10' :
                  currentEra === 'wwii' ? 'border-gray-600/40 text-gray-700 hover:bg-gray-500/10' :
                  currentEra === 'interwar' ? 'border-blue-500/40 text-blue-700 hover:bg-blue-500/10' :
                  'border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100'
                }`}
              >
                <Users size={14} />
                <span className="hidden sm:inline">人 物 关 系</span>
                <span className="sm:hidden">关 系</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {activeYear > 0 && (
        <div className="relative z-10 container mx-auto px-6 mb-8">
          <div className={`era-slide-in flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-5 md:p-6 rounded-sm bg-white/30 backdrop-blur-sm border ${theme.borderAccent} transition-all duration-700`}
            key={currentEra}
          >
            <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center float-slow ${
                currentEra === 'war' ? 'bg-red-100/80' :
                currentEra === 'wwii' ? 'bg-gray-200/80' :
                currentEra === 'interwar' ? 'bg-blue-100/80' :
                'bg-amber-100/80'
              }`}>
                <span className={`text-3xl md:text-4xl ${theme.titleColor}`}>
                  {eraDesc.emotion}
                </span>
              </div>
              <div>
                <div className={`font-decorative text-xl md:text-2xl tracking-[0.18em] ${theme.titleColor} transition-colors duration-500`}>
                  {eraDesc.label}
                </div>
                <div className={`font-body text-sm md:text-base italic ${theme.textTint} opacity-80 mt-1`}>
                  {eraDesc.atmosphere}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className={`font-body text-sm md:text-base ${theme.textTint} opacity-90 leading-relaxed`}>
                {eraDesc.sublabel}
              </p>
              {lifeProgress > 0 && lifeProgress < 100 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-decorative tracking-wider ${theme.textTint} opacity-60`}>
                      人生旅程
                    </span>
                    <span className={`text-xs font-serif tabular-nums ${theme.textTint} opacity-80`}>
                      {lifeProgress}%
                    </span>
                  </div>
                  <div className="h-2 bg-paper-200/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        currentEra === 'war' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                        currentEra === 'wwii' ? 'bg-gradient-to-r from-gray-500 to-gray-700' :
                        currentEra === 'interwar' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                        'bg-gradient-to-r from-gold-400 to-amber-500'
                      }`}
                      style={{ width: `${lifeProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="hidden lg:flex flex-col gap-2 md:border-l md:border-paper-300/50 md:pl-6 flex-shrink-0">
              {activeEraMilestones.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`font-serif text-xs tabular-nums opacity-70 ${m.color}`}>{m.year}</span>
                  <span className={`text-xs font-body ${theme.textTint} opacity-60`}>·</span>
                  <span className={`text-xs font-body ${theme.textTint} opacity-80`}>{m.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative mb-14">
            <div className={`relative bg-paper-100/80 rounded-sm p-5 md:p-8 shadow-paper-lg border ${theme.borderAccent} transition-all duration-700 ${isTransitioning ? 'scale-[0.99]' : ''}`}>
              <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
              <div className="absolute inset-0 border border-paper-300/50 rounded-sm pointer-events-none" />
              <div className="absolute inset-2 border border-paper-200/30 rounded-sm pointer-events-none" />
              {currentEra === 'war' && (
                <div className="absolute inset-0 rounded-sm pointer-events-none border border-red-200/30" />
              )}
              {currentEra === 'wwii' && (
                <div className="absolute inset-0 rounded-sm pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.08)' }} />
              )}

              <div className="relative flex flex-col lg:flex-row gap-8 md:gap-10">
                <div className="lg:w-2/5 xl:w-1/3 flex-shrink-0">
                  <div className="relative group">
                    <div className={`absolute -inset-2 rounded-sm opacity-60 blur transition-all duration-700 ${
                      currentEra === 'war' ? 'bg-red-300/40' :
                      currentEra === 'wwii' ? 'bg-gray-400/30' :
                      currentEra === 'interwar' ? 'bg-blue-300/30' :
                      'bg-gold-300/40'
                    }`} />
                    <div className="relative">
                      <div className="absolute inset-0 border border-paper-400/50 m-1.5 z-10 rounded-sm" />
                      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-paper-400/60 z-20 rounded-tl-sm" />
                      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-paper-400/60 z-20 rounded-tr-sm" />
                      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-paper-400/60 z-20 rounded-bl-sm" />
                      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-paper-400/60 z-20 rounded-br-sm" />
                      <img
                        src={person.imageUrl}
                        alt={person.name}
                        className={`w-full aspect-[3/4] object-cover rounded-sm transition-all duration-1000 ${theme.imageFilter}`}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none rounded-sm"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%), linear-gradient(180deg, transparent 55%, rgba(51, 37, 21, 0.25) 100%)',
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-paper-100 border border-paper-300/60 rounded-sm shadow-md z-30">
                      <span className={`font-serif text-sm ${theme.textTint}`}>{person.birthYear}</span>
                      <span className="text-paper-400">—</span>
                      <span className={`font-serif text-sm ${theme.textTint}`}>{person.deathYear}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-3/5 xl:w-2/3 flex flex-col justify-center pt-8 lg:pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`font-decorative text-xs md:text-sm tracking-[0.25em] ${theme.textTint} opacity-70`}>
                      {person.occupation.toUpperCase()}
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-paper-300/50 to-transparent" />
                  </div>

                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-body border transition-colors duration-500 ${
                      currentEra === 'war' ? 'bg-red-500/10 text-red-700 border-red-400/30' :
                      currentEra === 'wwii' ? 'bg-gray-500/10 text-gray-700 border-gray-400/30' :
                      currentEra === 'interwar' ? 'bg-blue-500/10 text-blue-700 border-blue-400/30' :
                      'bg-leather-500/10 text-leather-600 border-leather-400/30'
                    }`}>
                      <MapPin size={11} />
                      {CATEGORY_LABELS[person.category]}
                    </span>
                  </div>

                  <h1 className={`font-serif text-4xl md:text-5xl xl:text-6xl font-bold mb-4 leading-tight transition-colors duration-500 ${theme.titleColor}`}>
                    {person.name}
                  </h1>

                  <div className={`font-serif text-lg md:text-xl mb-5 ${theme.textTint} opacity-70`}>
                    {person.birthYear} — {person.deathYear} · {person.deathYear - person.birthYear} 载春秋
                  </div>

                  <div className="flex items-center gap-4 mb-7">
                    <div className={`w-20 h-px bg-gradient-to-r from-transparent ${
                      currentEra === 'war' ? 'via-red-500/50' :
                      currentEra === 'wwii' ? 'via-gray-500/50' :
                      currentEra === 'interwar' ? 'via-blue-500/50' :
                      'via-gold-500/50'
                    } to-transparent`} />
                    <span className={`text-2xl md:text-3xl transition-colors duration-500 ${
                      currentEra === 'war' ? 'text-red-500' :
                      currentEra === 'wwii' ? 'text-gray-500' :
                      currentEra === 'interwar' ? 'text-blue-500' :
                      'text-gold-500'
                    }`}>
                      ❧
                    </span>
                    <div className={`w-20 h-px bg-gradient-to-r from-transparent ${
                      currentEra === 'war' ? 'via-red-500/50' :
                      currentEra === 'wwii' ? 'via-gray-500/50' :
                      currentEra === 'interwar' ? 'via-blue-500/50' :
                      'via-gold-500/50'
                    } to-transparent`} />
                  </div>

                  <blockquote className={`font-serif text-xl md:text-2xl italic leading-relaxed mb-6 pl-6 border-l-4 transition-all duration-700 ${theme.quoteBg} py-4 pr-5 rounded-r-sm ${
                    currentEra === 'war' ? 'border-red-400/60 text-red-950' :
                    currentEra === 'wwii' ? 'border-gray-500/60 text-gray-900' :
                    currentEra === 'interwar' ? 'border-blue-400/60 text-blue-950' :
                    'border-gold-500/60 text-ink-800'
                  } ${currentEra === 'wwii' ? 'brightness-95' : ''}`}>
                    {person.quote}
                  </blockquote>

                  {eraSpecificEvents.length > 0 && activeYear > 0 && (
                    <div className={`era-slide-in mt-6 p-4 rounded-sm border ${theme.borderAccent} bg-white/30 backdrop-blur-sm`}
                      key={activeYear}
                    >
                      <div className={`flex items-center gap-2 mb-3`}>
                        <Clock size={14} className={theme.textTint} />
                        <span className={`font-decorative text-xs tracking-wider ${theme.textTint} opacity-80`}>
                          {activeYear} 年前后的世界
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {eraSpecificEvents.map((evt: TimelineEntry, i: number) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-sm border-l-2 transition-all duration-300 hover:-translate-x-0.5 ${
                              evt.track === 'personal' ? 'bg-amber-50/50 border-amber-400/60' :
                              evt.track === 'historical' ? 'bg-rose-50/50 border-rose-400/60' :
                              'bg-sky-50/50 border-sky-400/60'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className={`font-serif text-xs tabular-nums ${
                                evt.track === 'personal' ? 'text-amber-700' :
                                evt.track === 'historical' ? 'text-rose-700' :
                                'text-sky-700'
                              } font-semibold`}>
                                {evt.year}
                              </span>
                              <span className="text-paper-300 text-xs">·</span>
                              <span className={`text-[10px] font-decorative tracking-wider ${
                                evt.track === 'personal' ? 'text-amber-600' :
                                evt.track === 'historical' ? 'text-rose-600' :
                                'text-sky-600'
                              }`}>
                                {evt.track === 'personal' ? '人生' : evt.track === 'historical' ? '历史' : '文化'}
                              </span>
                            </div>
                            <div className={`font-serif text-sm leading-snug ${theme.titleColor}`}>
                              {evt.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {timelineEntries.length > 0 && (
            <section className="mb-16">
              <InteractiveTimeline
                entries={timelineEntries}
                birthYear={person.birthYear}
                deathYear={person.deathYear}
                onEraChange={handleEraChange}
                onYearChange={handleYearChange}
              />
            </section>
          )}

          <section className="mb-14">
            <div className="flex items-center gap-4 mb-7">
              <div className={`w-10 h-px ${
                currentEra === 'war' ? 'bg-gradient-to-r from-transparent via-red-400/60 to-red-400/60' :
                currentEra === 'wwii' ? 'bg-gradient-to-r from-transparent via-gray-500/60 to-gray-500/60' :
                currentEra === 'interwar' ? 'bg-gradient-to-r from-transparent via-blue-400/60 to-blue-400/60' :
                'bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400/60'
              }`} />
              <h2 className={`font-serif text-2xl md:text-3xl font-semibold whitespace-nowrap transition-colors duration-500 ${theme.titleColor}`}>
                生平简介
              </h2>
              <div className={`flex-1 h-px ${
                currentEra === 'war' ? 'bg-gradient-to-l from-transparent via-red-400/60 to-red-400/60' :
                currentEra === 'wwii' ? 'bg-gradient-to-l from-transparent via-gray-500/60 to-gray-500/60' :
                currentEra === 'interwar' ? 'bg-gradient-to-l from-transparent via-blue-400/60 to-blue-400/60' :
                'bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400/60'
              }`} />
            </div>
            <div className={`relative bg-paper-100/70 rounded-sm p-7 md:p-10 shadow-paper border ${theme.borderAccent} transition-all duration-700`}>
              <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-paper-400/40 pointer-events-none rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-paper-400/40 pointer-events-none rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-paper-400/40 pointer-events-none rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-paper-400/40 pointer-events-none rounded-br-sm" />
              <div className={`relative font-body text-paper-800 leading-loose text-lg md:text-xl ink-drop-cap transition-all duration-700 ${currentEra === 'wwii' ? 'brightness-95' : ''} ${theme.textTint}`}>
                {person.description}
              </div>
            </div>
          </section>

          {relatedChapters.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-7">
                <div className={`w-10 h-px ${
                  currentEra === 'war' ? 'bg-gradient-to-r from-transparent via-red-400/60 to-red-400/60' :
                  currentEra === 'wwii' ? 'bg-gradient-to-r from-transparent via-gray-500/60 to-gray-500/60' :
                  currentEra === 'interwar' ? 'bg-gradient-to-r from-transparent via-blue-400/60 to-blue-400/60' :
                  'bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400/60'
                }`} />
                <h2 className={`font-serif text-2xl md:text-3xl font-semibold whitespace-nowrap transition-colors duration-500 ${theme.titleColor}`}>
                  相关章节
                </h2>
                <div className={`flex-1 h-px ${
                  currentEra === 'war' ? 'bg-gradient-to-l from-transparent via-red-400/60 to-red-400/60' :
                  currentEra === 'wwii' ? 'bg-gradient-to-l from-transparent via-gray-500/60 to-gray-500/60' :
                  currentEra === 'interwar' ? 'bg-gradient-to-l from-transparent via-blue-400/60 to-blue-400/60' :
                  'bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400/60'
                }`} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {relatedChapters.map((chapter) =>
                  chapter && (
                    <Link
                      key={chapter.id}
                      to={`/chapter/${chapter.id}`}
                      className={`group block bg-paper-100/70 rounded-sm p-6 md:p-7 shadow-paper hover:shadow-paper-lg transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden border ${theme.borderAccent}`}
                    >
                      <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
                      <div className={`absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${
                        currentEra === 'war' ? 'bg-red-500' :
                        currentEra === 'wwii' ? 'bg-gray-500' :
                        currentEra === 'interwar' ? 'bg-blue-500' :
                        'bg-gold-500'
                      }`} />
                      <div className="relative">
                        <div className={`font-decorative text-xs md:text-sm tracking-[0.2em] mb-2 transition-colors duration-300 group-hover:${theme.textTint} ${
                          currentEra === 'war' ? 'text-red-600' :
                          currentEra === 'wwii' ? 'text-gray-600' :
                          currentEra === 'interwar' ? 'text-blue-600' :
                          'text-gold-600'
                        }`}>
                          {chapter.era}
                        </div>
                        <h3 className={`font-serif text-xl md:text-2xl font-semibold group-hover:transition-colors duration-300 mb-3 ${theme.titleColor} ${
                          currentEra === 'war' ? 'group-hover:text-red-700' :
                          currentEra === 'wwii' ? 'group-hover:text-gray-800' :
                          currentEra === 'interwar' ? 'group-hover:text-blue-800' :
                          'group-hover:text-gold-700'
                        }`}>
                          {chapter.title}
                        </h3>
                        <p className="font-body text-paper-600 text-sm md:text-base mb-4 flex items-center gap-2">
                          <Clock size={13} className="opacity-60" />
                          {chapter.yearStart} — {chapter.yearEnd}
                        </p>
                        <p className={`font-body text-sm md:text-base ${theme.textTint} opacity-75 line-clamp-3 leading-relaxed`}>
                          {chapter.description}
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className={`relative z-10 py-12 border-t transition-colors duration-700 ${
        currentEra === 'war' ? 'border-red-300/40' :
        currentEra === 'wwii' ? 'border-gray-400/40' :
        currentEra === 'interwar' ? 'border-blue-300/40' :
        'border-paper-300/50'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`w-28 h-px ${
              currentEra === 'war' ? 'bg-gradient-to-r from-transparent to-red-400/40' :
              currentEra === 'wwii' ? 'bg-gradient-to-r from-transparent to-gray-500/40' :
              currentEra === 'interwar' ? 'bg-gradient-to-r from-transparent to-blue-400/40' :
              'bg-gradient-to-r from-transparent to-gold-500/40'
            }`} />
            <span className={`text-lg transition-colors duration-500 ${
              currentEra === 'war' ? 'text-red-500/70' :
              currentEra === 'wwii' ? 'text-gray-600/70' :
              currentEra === 'interwar' ? 'text-blue-500/70' :
              'text-gold-500/70'
            }`}>✦</span>
            <div className={`w-28 h-px ${
              currentEra === 'war' ? 'bg-gradient-to-l from-transparent to-red-400/40' :
              currentEra === 'wwii' ? 'bg-gradient-to-l from-transparent to-gray-500/40' :
              currentEra === 'interwar' ? 'bg-gradient-to-l from-transparent to-blue-400/40' :
              'bg-gradient-to-l from-transparent to-gold-500/40'
            }`} />
          </div>
          <p className={`font-body text-sm md:text-base transition-colors duration-500 ${theme.textTint} opacity-70`}>
            昨日的世界 · 一个欧洲人的回忆
          </p>
        </div>
      </footer>
    </div>
  );
}
