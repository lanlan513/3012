import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Coffee, Newspaper as NewspaperIcon, BookOpen, Music, Palette, Brain, Sparkles } from 'lucide-react';
import { CulturalCategory } from '@/types';
import {
  CULTURAL_CATEGORY_LABELS,
  CULTURAL_CATEGORY_COLORS,
  CULTURAL_CATEGORY_ICONS,
} from '@/data/culturalSchools';
import CulturalEvolutionTree from '@/components/CulturalEvolutionTree';

const categories: { key: CulturalCategory; icon: React.ReactNode; label: string }[] = [
  { key: 'literature', icon: <BookOpen size={16} />, label: '文学' },
  { key: 'music', icon: <Music size={16} />, label: '音乐' },
  { key: 'painting', icon: <Palette size={16} />, label: '绘画' },
  { key: 'philosophy', icon: <Brain size={16} />, label: '哲学' },
];

export default function CultureEvolution() {
  const [activeCategory, setActiveCategory] = useState<CulturalCategory>('literature');
  const colors = CULTURAL_CATEGORY_COLORS[activeCategory];

  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 via-paper-100 to-paper-200 relative overflow-hidden">
      <div className="absolute inset-0 paper-bg opacity-40" />

      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          `radial-gradient(ellipse at 20% 10%, rgba(255, 248, 225, 0.4) 0%, transparent 50%), 
           radial-gradient(ellipse at 80% 90%, rgba(184, 151, 82, 0.12) 0%, transparent 50%)`,
      }} />

      <header className="relative z-10 pt-8 pb-4">
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
              <h1 className="font-serif text-3xl md:text-4xl text-ink-700 font-semibold flex items-center justify-center gap-3">
                <Sparkles size={24} className="text-gold-500" />
                文化演化脉络
                <Sparkles size={24} className="text-gold-500" />
              </h1>
              <p className="font-body text-paper-500 text-sm mt-1 italic">
                从流派中看见思想与艺术的传承
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to="/newspaper"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <NewspaperIcon size={14} />
                <span className="hidden sm:inline">每 日 头 条</span>
                <span className="sm:hidden">报 纸</span>
              </Link>
              <Link
                to="/cafe"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Coffee size={14} />
                <span className="hidden sm:inline">咖 啡 馆</span>
                <span className="sm:hidden">咖 啡</span>
              </Link>
              <Link
                to="/relations"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Users size={14} />
                <span className="hidden sm:inline">关 系</span>
                <span className="sm:hidden">关 系</span>
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <MapPin size={14} />
                <span className="hidden sm:inline">地 图</span>
                <span className="sm:hidden">地 图</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-lg">❧</span>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10 mt-6">
            <p className="font-serif text-paper-700 text-lg italic max-w-2xl mx-auto leading-relaxed">
              "人类文明的长河中，每一个流派都是一朵浪花，
              <br />
              它们相互激荡，汇成了我们今天所拥有的精神世界。"
            </p>
          </div>

          <div className="mb-10">
            <div className="flex justify-center flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => {
                const catColors = CULTURAL_CATEGORY_COLORS[cat.key];
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-sm font-decorative text-sm md:text-base tracking-wider transition-all duration-500 border ${
                      isActive
                        ? `bg-gradient-to-br ${catColors.primary} text-white border-transparent shadow-md hover:-translate-y-0.5 scale-[1.02]`
                        : `bg-white/50 ${catColors.text} ${catColors.border} hover:bg-white/80 hover:-translate-y-0.5`
                    }`}
                  >
                    <span className="text-lg md:text-xl">{CULTURAL_CATEGORY_ICONS[cat.key]}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-10">
            <div
              key={activeCategory}
              style={{ animation: 'fadeInContent 0.5s ease-out' }}
            >
              <CulturalEvolutionTree category={activeCategory} />
            </div>
          </div>

          <section className="mb-12">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400/60" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink-700 whitespace-nowrap">
                文化谱系概览
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400/60" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map((cat) => {
                const catColors = CULTURAL_CATEGORY_COLORS[cat.key];
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`group relative rounded-sm border ${catColors.border} ${catColors.bg} p-6 text-left transition-all duration-500 hover:shadow-paper-lg hover:-translate-y-1 overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${catColors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    <div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 pointer-events-none" style={{
                      background: catColors.primary
                    }} />
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-sm flex items-center justify-center mb-4 bg-gradient-to-br ${catColors.primary} shadow-md group-hover:scale-110 transition-transform duration-500`}>
                        <span className="text-3xl">{CULTURAL_CATEGORY_ICONS[cat.key]}</span>
                      </div>
                      <h3 className={`font-serif text-xl font-bold mb-2 ${catColors.text}`}>
                        {cat.label}
                      </h3>
                      <p className={`font-body text-sm ${catColors.text} opacity-75 leading-relaxed`}>
                        {cat.key === 'literature' && '从浪漫主义到超现实主义，见证人类情感与想象力的文学旅程。'}
                        {cat.key === 'music' && '从古典到现代主义，聆听人类精神世界最深刻的声音表达。'}
                        {cat.key === 'painting' && '从印象派到抽象艺术，视觉语言的革命与人类感知的拓展。'}
                        {cat.key === 'philosophy' && '从康德到后现代，人类对存在、知识与意义的永恒追问。'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <span className="text-gold-500/60 text-sm">✦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>
          <p className="font-body text-paper-500 text-sm">
            昨日的世界 · 一个欧洲人的回忆 · 文化学习平台
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInContent {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
