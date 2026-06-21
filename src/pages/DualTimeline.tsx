import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles, Globe2 } from 'lucide-react';
import ComparisonSlider from '@/components/ComparisonSlider';
import StatisticsPanel from '@/components/StatisticsPanel';
import StatusFilter from '@/components/StatusFilter';
import { dualTimelineData } from '@/data/dualTimeline';
import { ComparisonStatus } from '@/types';

export default function DualTimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<ComparisonStatus | 'all'>('all');

  const allItems = useMemo(() => {
    return dualTimelineData.categories.flatMap(cat => cat.items);
  }, []);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allItems.length };
    allItems.forEach(item => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });
    return counts as Record<ComparisonStatus | 'all', number>;
  }, [allItems]);

  const filteredItems = useMemo(() => {
    let items = allItems;

    if (selectedCategory !== 'all') {
      items = items.filter(item => {
        const category = dualTimelineData.categories.find(c =>
          c.items.some(i => i.id === item.id)
        );
        return category?.id === selectedCategory;
      });
    }

    if (selectedStatus !== 'all') {
      items = items.filter(item => item.status === selectedStatus);
    }

    return items;
  }, [allItems, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-amber-50/20 to-paper-100 relative overflow-hidden">
      <div className="absolute inset-0 paper-bg opacity-35" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 10%, rgba(255, 248, 225, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(184, 151, 82, 0.1) 0%, transparent 50%)',
        }}
      />

      <header className="relative z-10 pt-8 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">返回时间线</span>
              <span className="sm:hidden">返回</span>
            </Link>

            <div className="text-center">
              <h1 className="font-serif text-3xl md:text-4xl text-ink-700 font-bold">
                {dualTimelineData.title}
              </h1>
              <p className="font-body text-paper-500 text-sm mt-1 italic max-w-xl mx-auto">
                {dualTimelineData.subtitle}
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
            >
              <Home size={14} />
              <span className="hidden sm:inline">首 页</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-gold-500/50" />
            <span className="text-gold-500 text-lg">❧</span>
            <div className="w-24 md:w-32 h-px bg-gradient-to-l from-transparent via-gold-500/50 to-gold-500/50" />
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              to="/network-simulator"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-sm bg-gradient-to-r from-amber-700 to-amber-800 text-paper-100 font-body text-sm hover:from-amber-800 hover:to-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Globe2 size={18} className="animate-pulse" />
              <div className="text-left">
                <div className="font-semibold">文化网络模拟器</div>
                <div className="text-[10px] opacity-90">动态观察文化圈的形成与瓦解 →</div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 mb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative bg-gradient-to-br from-amber-900/10 via-paper-100 to-gray-100/40 rounded-sm p-6 md:p-8 shadow-paper-lg border border-gold-200/50">
            <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold-400/40 pointer-events-none rounded-tl-sm" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold-400/40 pointer-events-none rounded-tr-sm" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold-400/40 pointer-events-none rounded-bl-sm" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold-400/40 pointer-events-none rounded-br-sm" />

            <div className="relative text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-400/40 to-red-400/40" />
                <Sparkles size={18} className="text-gold-500" />
                <div className="w-8 h-px bg-gradient-to-l from-transparent via-red-400/40 to-red-400/40" />
              </div>

              <blockquote className="font-serif text-xl md:text-2xl italic text-ink-700 leading-relaxed max-w-2xl mx-auto">
                {dualTimelineData.themeQuote}
              </blockquote>

              <p className="mt-4 font-body text-sm text-paper-600 text-right">
                —— {dualTimelineData.themeQuoteAuthor}
              </p>

              <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-amber-800">
                    {dualTimelineData.preWarYear}
                  </div>
                  <div className="text-xs text-paper-500 font-decorative tracking-wider">
                    战前 · 太平盛世
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-gray-400" />
                  <div className="text-xs text-paper-400 mt-1">⟷</div>
                  <div className="text-[10px] text-paper-400 font-decorative tracking-wider">
                    拖动滑块对比
                  </div>
                </div>

                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-gray-700">
                    {dualTimelineData.postWarYear}
                  </div>
                  <div className="text-xs text-paper-500 font-decorative tracking-wider">
                    战后 · 文明碎片
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mb-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <StatisticsPanel statistics={dualTimelineData.statistics} />
        </div>
      </section>

      <section className="relative z-10 mb-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400/60" />
              <h2 className="font-serif text-2xl font-semibold text-ink-700">
                文明的对比
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400/60 md:hidden" />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: '全部类别', icon: '✦' },
                ...dualTimelineData.categories.map(cat => ({
                  id: cat.id,
                  label: cat.name,
                  icon: cat.icon,
                })),
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-decorative tracking-wider transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-gold-500 text-white border-gold-500 shadow-md'
                      : 'bg-white/60 text-paper-600 border-paper-300/60 hover:bg-gold-50 hover:border-gold-300/60'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <StatusFilter
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              counts={statusCounts}
            />
          </div>

          {selectedCategory !== 'all' && (
            <div className="mb-6 p-4 bg-paper-50/70 border border-paper-200/60 rounded-sm">
              <p className="font-body text-sm text-paper-600 italic">
                {dualTimelineData.categories.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>
          )}

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <ComparisonSlider key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-serif text-lg text-paper-500">
                没有找到符合条件的对比项目
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="mt-4 text-gold-600 hover:text-gold-700 text-sm font-body underline underline-offset-2"
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="relative z-10 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative bg-gradient-to-br from-gray-900/5 via-paper-100 to-amber-50/30 rounded-sm p-6 md:p-8 border border-paper-200/60">
            <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-red-400/50 to-red-400/50" />
                <h3 className="font-serif text-xl font-semibold text-red-800">
                  失去的文明
                </h3>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-red-400/50 to-red-400/50" />
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="font-body text-paper-700 leading-relaxed">
                  《昨日的世界》不仅是斯蒂芬·茨威格个人的回忆录，更是对一个消逝文明的挽歌。
                  那个曾经相信进步、理性与和平的欧洲，在两次世界大战的炮火中灰飞烟灭。
                </p>
                <p className="font-body text-paper-700 leading-relaxed mt-3">
                  从维也纳的咖啡馆到柏林的大学讲堂，从布拉格的德语文学到巴黎的艺术沙龙，
                  欧洲文明的每一个角落都经历了沧桑巨变。有些建筑在废墟上重建，
                  但那种多元、包容、相信人性之善的文化氛围，却永远地消逝了。
                </p>
                <p className="font-body text-paper-700 leading-relaxed mt-3 italic">
                  茨威格在巴西自尽前写下："在我自己的语言所通行的世界对我来说业已沦亡，
                  和我精神上的故乡欧洲业已自我毁灭之后，我再也没有地方可以从头开始重建我的生活了。"
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-red-50/50 rounded-sm border border-red-100/60">
                  <div className="font-serif text-2xl font-bold text-red-700">600万</div>
                  <div className="text-xs text-red-600/70 mt-1">犹太遇难者</div>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-sm border border-amber-100/60">
                  <div className="font-serif text-2xl font-bold text-amber-700">2500+</div>
                  <div className="text-xs text-amber-600/70 mt-1">流亡知识分子</div>
                </div>
                <div className="p-3 bg-gray-50/50 rounded-sm border border-gray-200/60">
                  <div className="font-serif text-2xl font-bold text-gray-700">1/3</div>
                  <div className="text-xs text-gray-600/70 mt-1">城市建筑损毁</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-10 border-t border-paper-300/50">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/40" />
            <span className="text-gold-500/70 text-lg">✦</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/40" />
          </div>
          <p className="font-body text-sm text-paper-500">
            昨日的世界 · 一个欧洲人的回忆
          </p>
        </div>
      </footer>
    </div>
  );
}
