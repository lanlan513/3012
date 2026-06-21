import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Sparkles, BookOpen, Music, Brain, Palette, Users } from 'lucide-react';
import NetworkSimulator from '@/components/NetworkSimulator';
import TimeController from '@/components/TimeController';
import StatisticsPanel from '@/components/StatisticsPanel';
import PersonDetailPanel from '@/components/PersonDetailPanel';
import { PersonCategory } from '@/types';
import { getRelationTypeLabel, type RelationType } from '@/data/relations';
import { CATEGORY_COLORS, RELATION_COLORS } from '@/data/networkSimulation';

const MIN_YEAR = 1890;
const MAX_YEAR = 1945;

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

const RELATION_TYPES: { type: RelationType; label: string; dash: string }[] = [
  { type: 'friendship', label: '友谊', dash: '' },
  { type: 'collaboration', label: '合作', dash: '' },
  { type: 'mentorship', label: '师承', dash: '' },
  { type: 'influence', label: '影响', dash: '5,3' },
  { type: 'intellectual', label: '思想对话', dash: '3,3' },
  { type: 'contemporary', label: '同时代', dash: '' },
];

export default function NetworkSimulatorPage() {
  const [currentYear, setCurrentYear] = useState(1890);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const handleYearChange = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

  const handlePlayToggle = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentYear(MIN_YEAR);
    setSelectedPersonId(null);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    lastTimeRef.current = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      const yearsPerSecond = speed * 2;
      const deltaYears = (deltaTime / 1000) * yearsPerSecond;

      setCurrentYear((prev) => {
        const next = prev + deltaYears;
        if (next >= MAX_YEAR) {
          setIsPlaying(false);
          return MAX_YEAR;
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed]);

  const displayYear = Math.round(currentYear);

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative flex flex-col">
      <div className="absolute inset-0 paper-bg opacity-40" />

      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link
              to="/relations"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">返回关系图</span>
            </Link>

            <div className="text-center">
              <h1 className="font-serif text-3xl text-ink-700 font-semibold">
                文化网络模拟器
              </h1>
              <p className="font-body text-paper-500 text-sm mt-1 italic">
                见证一个文化生态圈的形成与瓦解
              </p>
            </div>

            <button
              onClick={() => setShowIntro(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500/10 transition-all duration-300 font-body text-xs"
            >
              <Info size={14} />
              <span className="hidden sm:inline">说明</span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-lg">❧</span>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col container mx-auto px-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 min-h-[500px] lg:min-h-0 bg-paper-50/60 rounded-sm border border-paper-300/50 shadow-paper relative overflow-hidden">
              <NetworkSimulator
                currentYear={displayYear}
                selectedPersonId={selectedPersonId}
                onSelectPerson={setSelectedPersonId}
                isPlaying={isPlaying}
              />

              {showIntro && (
                <div className="absolute inset-0 bg-paper-900/60 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="bg-paper-100 rounded-sm border border-paper-300/60 shadow-paper-lg p-8 max-w-md mx-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                        <Sparkles size={28} className="text-gold-600" />
                      </div>
                      <h3 className="font-serif text-2xl text-ink-700 font-semibold mb-2">
                        文化网络模拟器
                      </h3>
                      <p className="font-body text-paper-600 text-sm leading-relaxed">
                        拖动时间轴或点击播放，观察一个文化生态圈如何从十九世纪末的黄金时代逐渐形成，
                        又如何在两次世界大战的冲击下分崩离析。
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-literature/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Users size={12} className="text-gold-700" />
                        </div>
                        <div>
                          <p className="font-body text-ink-600 text-xs font-semibold">人物的登场与退场</p>
                          <p className="font-body text-paper-500 text-xs">文化精英按时间顺序登场，随着年龄增长逐渐淡出</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles size={12} className="text-gold-600" />
                        </div>
                        <div>
                          <p className="font-body text-ink-600 text-xs font-semibold">关系的建立与断裂</p>
                          <p className="font-body text-paper-500 text-xs">友谊、合作、影响随时间变化，战争会削弱许多连接</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info size={12} className="text-red-800" />
                        </div>
                        <div>
                          <p className="font-body text-ink-600 text-xs font-semibold">战争的冲击</p>
                          <p className="font-body text-paper-500 text-xs">两次世界大战对文化网络造成毁灭性打击</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowIntro(false)}
                      className="w-full py-3 rounded-sm bg-gold-500 text-paper-100 font-body text-sm hover:bg-gold-600 transition-colors"
                    >
                      开始探索
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-6 flex-wrap">
                <span className="font-body text-paper-600 text-xs">人物类别：</span>
                {(Object.keys(CATEGORY_CONFIG) as PersonCategory[]).map((cat) => {
                  const config = CATEGORY_CONFIG[cat];
                  return (
                    <div key={cat} className="flex items-center gap-1.5">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <span className="font-body text-paper-600 text-xs">{config.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-paper-500 text-xs">关系类型图例：</span>
                <div className="flex items-center gap-3 flex-wrap">
                  {RELATION_TYPES.slice(0, 4).map(({ type, label, dash }) => (
                    <div key={type} className="flex items-center gap-1.5">
                      <svg width="20" height="3" className="flex-shrink-0">
                        <line
                          x1="0"
                          y1="1.5"
                          x2="20"
                          y2="1.5"
                          stroke={RELATION_COLORS[type]}
                          strokeWidth="2"
                          strokeDasharray={dash}
                        />
                      </svg>
                      <span className="font-body text-paper-500 text-[10px]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
            <TimeController
              currentYear={displayYear}
              minYear={MIN_YEAR}
              maxYear={MAX_YEAR}
              isPlaying={isPlaying}
              speed={speed}
              onYearChange={handleYearChange}
              onPlayToggle={handlePlayToggle}
              onSpeedChange={handleSpeedChange}
              onReset={handleReset}
            />

            <StatisticsPanel currentYear={displayYear} />

            {selectedPersonId ? (
              <PersonDetailPanel
                personId={selectedPersonId}
                currentYear={displayYear}
                onClose={() => setSelectedPersonId(null)}
                onSelectPerson={setSelectedPersonId}
              />
            ) : (
              <div className="bg-paper-100/70 backdrop-blur-sm rounded-sm border border-paper-300/40 shadow-paper p-5">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <Users size={20} className="text-gold-600" />
                  </div>
                  <h3 className="font-serif text-lg text-ink-700 font-semibold mb-2">
                    点击人物探索
                  </h3>
                  <p className="font-body text-paper-600 text-sm leading-relaxed">
                    点击图中的人物节点，查看其在当前时代的状态与文化关联。
                  </p>
                </div>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-paper-300/50" />
                  <span className="text-paper-400 text-sm">✦</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-paper-300/50" />
                </div>

                <div className="space-y-2 text-xs font-body text-paper-500">
                  <p>• 拖动滑块或点击播放控制时间流逝</p>
                  <p>• 节点大小代表人物的影响力</p>
                  <p>• 线条粗细代表关系的强度</p>
                  <p>• 战争时期网络会逐渐暗淡</p>
                </div>
              </div>
            )}
          </div>
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
