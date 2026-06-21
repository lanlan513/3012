import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Coffee, ChevronLeft, ChevronRight, Calendar, Sun, Cloud, CloudRain, Wind } from 'lucide-react';
import { generateNewspaper, getAvailableYears, Newspaper, NewspaperHeadline, NewspaperColumn, NewsFlash } from '@/data/newspaper';
import { getWarEra } from '@/data/timelineEntries';
import type { WarEra } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  culture: '文化',
  society: '社会',
  historical: '要闻',
  literature: '文学',
  art: '艺术',
  music: '音乐',
  philosophy: '哲学',
  science: '科学',
  politics: '政治',
  economy: '经济',
  international: '国际',
};

const ERA_LABELS: Record<string, string> = {
  'pre-war': '战前黄金时代',
  'war': '第一次世界大战',
  'interwar': '两次大战之间',
  'wwii': '第二次世界大战',
};

function WeatherIcon({ weather }: { weather: string }) {
  const iconClass = "w-4 h-4 inline-block mr-1";
  if (weather.includes('晴') || weather.includes('和煦') || weather.includes('宜人')) {
    return <Sun className={iconClass} />;
  }
  if (weather.includes('云') || weather.includes('阴') || weather.includes('多变')) {
    return <Cloud className={iconClass} />;
  }
  if (weather.includes('雨') || weather.includes('沉郁')) {
    return <CloudRain className={iconClass} />;
  }
  return <Wind className={iconClass} />;
}

function HeadlineCard({ headline, isMain = false }: { headline: NewspaperHeadline; isMain?: boolean }) {
  return (
    <article className={`relative ${isMain ? '' : 'border-t border-ink-300/40 pt-4 mt-4'}`}>
      {isMain && headline.imageUrl && (
        <div className="mb-4 overflow-hidden border-2 border-ink-400/30">
          <img 
            src={headline.imageUrl} 
            alt={headline.title}
            className="w-full h-64 object-cover sepia-[0.3]"
            style={{ filter: 'sepia(0.3) contrast(1.05)' }}
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] bg-ink-100 text-ink-600 font-decorative">
          {CATEGORY_LABELS[headline.category] || '新闻'}
        </span>
        {headline.location && (
          <span className="text-ink-500 text-xs font-body flex items-center gap-1">
            <MapPin size={10} />
            {headline.location}
          </span>
        )}
      </div>
      
      <h2 
        className={`font-serif text-ink-800 font-bold mb-2 leading-tight ${
          isMain ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
        }`}
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        {headline.title}
      </h2>
      
      <p className="text-ink-500 text-sm italic mb-3 font-body">
        {headline.subtitle}
      </p>
      
      <p className="text-ink-700 font-body leading-relaxed text-sm md:text-base">
        {headline.content}
      </p>
      
      {headline.quote && (
        <blockquote className="mt-4 pl-4 border-l-2 border-gold-500/50 italic text-ink-600 font-body text-sm">
          {headline.quote}
        </blockquote>
      )}
      
      {!isMain && headline.imageUrl && (
        <div className="mt-4 float-right ml-4 mb-2 w-32 h-24 overflow-hidden border border-ink-300/40">
          <img 
            src={headline.imageUrl} 
            alt={headline.title}
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.4)' }}
          />
        </div>
      )}
    </article>
  );
}

function ColumnCard({ column }: { column: NewspaperColumn }) {
  return (
    <div className="column-item">
      <div className="flex items-center justify-between mb-2">
        <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] bg-gold-100 text-gold-700 font-decorative">
          {CATEGORY_LABELS[column.category] || '专栏'}
        </span>
      </div>
      
      <h3 className="font-serif text-lg text-ink-800 font-semibold mb-1" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
        {column.title}
      </h3>
      
      <p className="text-ink-500 text-xs mb-2 font-body italic">
        {column.author} 撰
      </p>
      
      <div className="first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-ink-800 first-letter:mr-2 first-letter:leading-none">
        <p className="text-ink-700 font-body text-sm leading-relaxed column-text">
          {column.content}
        </p>
      </div>
    </div>
  );
}

function NewsFlashItem({ flash }: { flash: NewsFlash }) {
  return (
    <div className="flex gap-2 py-2 border-b border-ink-200/50 last:border-b-0">
      <span className="px-1.5 py-0.5 text-[9px] tracking-wider bg-ink-100 text-ink-600 font-decorative h-fit shrink-0">
        {CATEGORY_LABELS[flash.category] || '快讯'}
      </span>
      <div className="flex-1">
        <span className="text-ink-500 text-[10px] mr-2">{flash.date}</span>
        <span className="text-ink-700 text-sm font-body">{flash.content}</span>
      </div>
    </div>
  );
}

function Advertisement({ text }: { text: string }) {
  return (
    <div className="border-2 border-double border-gold-500/50 p-3 bg-gold-50/50 text-center">
      <p className="text-[10px] tracking-[0.2em] text-gold-600 font-decorative mb-1">广 告</p>
      <p className="text-ink-700 text-xs font-body">{text}</p>
    </div>
  );
}

const ERA_RANGES: Array<{ key: WarEra; label: string; start: number; end: number }> = [
  { key: 'pre-war', label: '战前黄金时代', start: 1881, end: 1914 },
  { key: 'war', label: '第一次世界大战', start: 1914, end: 1918 },
  { key: 'interwar', label: '两次大战之间', start: 1918, end: 1939 },
  { key: 'wwii', label: '第二次世界大战', start: 1939, end: 1942 },
];

function YearSelector({ 
  years, 
  selectedYear, 
  onYearChange 
}: { 
  years: number[]; 
  selectedYear: number; 
  onYearChange: (year: number) => void;
}) {
  const [selectedEra, setSelectedEra] = useState<WarEra>(() => {
    if (selectedYear < 1914) return 'pre-war';
    if (selectedYear <= 1918) return 'war';
    if (selectedYear < 1939) return 'interwar';
    return 'wwii';
  });
  
  const currentEraRange = ERA_RANGES.find(e => e.key === selectedEra)!;
  const eraYears = years.filter(y => y >= currentEraRange.start && y <= currentEraRange.end);
  const currentIndex = eraYears.indexOf(selectedYear);
  
  const goToPrev = () => {
    if (currentIndex > 0) {
      onYearChange(eraYears[currentIndex - 1]);
    } else if (ERA_RANGES.findIndex(e => e.key === selectedEra) > 0) {
      const prevEra = ERA_RANGES[ERA_RANGES.findIndex(e => e.key === selectedEra) - 1];
      const prevEraYears = years.filter(y => y >= prevEra.start && y <= prevEra.end);
      setSelectedEra(prevEra.key);
      onYearChange(prevEraYears[prevEraYears.length - 1]);
    }
  };
  
  const goToNext = () => {
    if (currentIndex < eraYears.length - 1) {
      onYearChange(eraYears[currentIndex + 1]);
    } else if (ERA_RANGES.findIndex(e => e.key === selectedEra) < ERA_RANGES.length - 1) {
      const nextEra = ERA_RANGES[ERA_RANGES.findIndex(e => e.key === selectedEra) + 1];
      const nextEraYears = years.filter(y => y >= nextEra.start && y <= nextEra.end);
      setSelectedEra(nextEra.key);
      onYearChange(nextEraYears[0]);
    }
  };
  
  const handleEraChange = (era: WarEra) => {
    setSelectedEra(era);
    const eraRange = ERA_RANGES.find(e => e.key === era)!;
    const eraYearList = years.filter(y => y >= eraRange.start && y <= eraRange.end);
    if (eraYearList.length > 0) {
      const closestYear = eraYearList.reduce((prev, curr) => 
        Math.abs(curr - selectedYear) < Math.abs(prev - selectedYear) ? curr : prev
      );
      onYearChange(closestYear);
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Era selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {ERA_RANGES.map((era) => (
          <button
            key={era.key}
            onClick={() => handleEraChange(era.key)}
            className={`px-3 py-1.5 text-xs font-decorative tracking-wider transition-all duration-300 rounded-sm ${
              selectedEra === era.key
                ? 'bg-ink-800 text-paper-50 shadow-md'
                : 'bg-paper-100 text-ink-600 hover:bg-ink-100 border border-ink-200/50'
            }`}
          >
            {era.label}
            <span className="ml-1.5 text-[10px] opacity-70">
              {era.start}-{era.end}
            </span>
          </button>
        ))}
      </div>
      
      {/* Year navigation */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={goToPrev}
          disabled={selectedEra === 'pre-war' && currentIndex === 0}
          className="p-2 rounded-full border border-ink-300/50 text-ink-600 hover:bg-ink-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="上一年"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex flex-wrap justify-center gap-1.5 min-h-[40px] items-center">
          {eraYears.map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`relative w-9 h-9 rounded-sm flex items-center justify-center text-sm font-serif transition-all duration-200 ${
                year === selectedYear
                  ? 'bg-ink-800 text-paper-50 scale-105 shadow-md'
                  : 'bg-paper-100 text-ink-600 hover:bg-ink-100 border border-ink-200/50 hover:scale-105'
              }`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              title={`${year}年`}
            >
              {year}
            </button>
          ))}
        </div>
        
        <button
          onClick={goToNext}
          disabled={selectedEra === 'wwii' && currentIndex === eraYears.length - 1}
          className="p-2 rounded-full border border-ink-300/50 text-ink-600 hover:bg-ink-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="下一年"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Quick jump */}
      <div className="flex items-center justify-center gap-2 text-xs text-ink-500">
        <span className="font-decorative tracking-wider">快 速 跳 转：</span>
        {[1890, 1900, 1910, 1920, 1930, 1940].map((jumpYear) => {
          const closestYear = years.reduce((prev, curr) => 
            Math.abs(curr - jumpYear) < Math.abs(prev - jumpYear) ? curr : prev
          );
          return (
            <button
              key={jumpYear}
              onClick={() => {
                const era = getWarEra(closestYear);
                setSelectedEra(era);
                onYearChange(closestYear);
              }}
              className="px-2 py-0.5 bg-paper-50 border border-ink-200/50 hover:border-gold-500/50 hover:text-gold-700 transition-colors rounded-sm font-body"
            >
              {jumpYear}s
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function NewspaperPage() {
  const availableYears = useMemo(() => getAvailableYears(), []);
  const [selectedYear, setSelectedYear] = useState<number>(1900);
  const [newspaper, setNewspaper] = useState<Newspaper | null>(null);
  
  useEffect(() => {
    const closestYear = availableYears.reduce((prev, curr) => 
      Math.abs(curr - selectedYear) < Math.abs(prev - selectedYear) ? curr : prev
    );
    setNewspaper(generateNewspaper(closestYear));
  }, [selectedYear, availableYears]);
  
  if (!newspaper) {
    return (
      <div className="min-h-screen bg-paper-100 flex items-center justify-center">
        <div className="text-ink-500 font-body">加载中...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-100 via-paper-200 to-paper-300 relative">
      {/* Background texture */}
      <div className="absolute inset-0 paper-bg opacity-30" />
      
      {/* Header */}
      <header className="relative z-10 pt-6 pb-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">返回首页</span>
            </Link>
            
            <div className="text-center">
              <h1 className="font-serif text-2xl text-ink-700 font-semibold" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                每日头条
              </h1>
              <p className="font-body text-paper-500 text-xs mt-0.5 italic">
                穿越时光的报纸 · 见证时代的变迁
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link
                to="/cafe"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Coffee size={14} />
                <span className="hidden sm:inline">咖啡馆</span>
              </Link>
              <Link
                to="/relations"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Users size={14} />
                <span className="hidden sm:inline">关系</span>
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <MapPin size={14} />
                <span className="hidden sm:inline">地图</span>
              </Link>
            </div>
          </div>
          
          {/* Decorative divider */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-lg">❧</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>
      </header>
      
      {/* Year selector */}
      <section className="relative z-10 bg-paper-50/80 border-y border-ink-200/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-2 text-ink-600">
              <Calendar size={16} />
              <span className="font-decorative text-sm tracking-wider">选 择 年 份</span>
            </div>
            <span className="px-3 py-1 bg-ink-800 text-paper-50 font-serif text-xl" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              {selectedYear}
            </span>
            <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-xs font-decorative tracking-wider">
              {ERA_LABELS[newspaper.era]}
            </span>
          </div>
          <YearSelector 
            years={availableYears} 
            selectedYear={selectedYear} 
            onYearChange={setSelectedYear} 
          />
        </div>
      </section>
      
      {/* Newspaper content */}
      <main className="relative z-10 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div 
            className="bg-paper-50 shadow-paper-lg border border-ink-200/50 p-6 md:p-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
            }}
          >
            {/* Newspaper masthead */}
            <div className="text-center border-b-4 border-double border-ink-800 pb-4 mb-6">
              <div className="flex items-center justify-between text-xs text-ink-600 font-body mb-2">
                <span className="flex items-center gap-1">
                  <WeatherIcon weather={newspaper.weather} />
                  {newspaper.weather}
                </span>
                <span className="text-gold-700 font-decorative tracking-[0.2em]">
                  {newspaper.chapterTitle}
                </span>
                <span>第 {Math.floor(Math.random() * 30) + 1} 版</span>
              </div>
              
              <h1 
                className="text-5xl md:text-7xl font-black text-ink-900 tracking-tight mb-2"
                style={{ 
                  fontFamily: '"Playfair Display", Georgia, serif',
                  letterSpacing: '-0.02em',
                }}
              >
                每 日 头 条
              </h1>
              
              <p className="text-ink-600 text-sm font-body tracking-[0.3em] uppercase">
                {newspaper.dateLine}
              </p>
              
              <div className="flex items-center justify-center gap-8 mt-4 text-[10px] text-ink-500 font-decorative tracking-[0.2em]">
                <span>☰ 政治</span>
                <span>☰ 经济</span>
                <span>☰ 文化</span>
                <span>☰ 艺术</span>
                <span>☰ 科学</span>
              </div>
            </div>
            
            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main column - front page headlines */}
              <div className="lg:col-span-2">
                {/* Main headline */}
                <HeadlineCard headline={newspaper.frontPage.mainHeadline} isMain />
                
                {/* Secondary headlines */}
                {newspaper.frontPage.secondaryHeadlines.map(headline => (
                  <HeadlineCard key={headline.id} headline={headline} />
                ))}
              </div>
              
              {/* Sidebar - news flashes and ads */}
              <div className="lg:col-span-1">
                {/* News flashes */}
                <div className="border border-ink-300/50 p-4 mb-6 bg-paper-100/50">
                  <h3 className="font-decorative text-sm tracking-[0.2em] text-ink-700 text-center border-b border-ink-300/50 pb-2 mb-3">
                    ✦ 快 讯 ✦
                  </h3>
                  <div className="space-y-1">
                    {newspaper.newsFlashes.map(flash => (
                      <NewsFlashItem key={flash.id} flash={flash} />
                    ))}
                  </div>
                </div>
                
                {/* Advertisements */}
                <div className="space-y-4">
                  {newspaper.advertisements.map((ad, idx) => (
                    <Advertisement key={idx} text={ad} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Columns section */}
            {newspaper.columns.length > 0 && (
              <div className="mt-10 pt-8 border-t-4 border-double border-ink-800">
                <h3 className="font-decorative text-center text-sm tracking-[0.3em] text-ink-700 mb-6">
                  — 专 栏 —
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {newspaper.columns.map((column, idx) => (
                    <div key={column.id} className="relative">
                      {idx > 0 && (
                        <div className="absolute -left-4 top-0 bottom-0 w-px bg-ink-300/40 hidden md:block" />
                      )}
                      <ColumnCard column={column} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-ink-300/50 text-center">
              <div className="flex items-center justify-center gap-4 text-[10px] text-ink-500 font-decorative tracking-[0.2em]">
                <span>定 价：壹 角</span>
                <span>|</span>
                <span>邮 发 代 号：1-234</span>
                <span>|</span>
                <span>国 内 统 一 刊 号：CNXX-XXXX</span>
              </div>
              <p className="text-ink-400 text-xs mt-2 italic font-body">
                "记录时代变迁，见证历史瞬间"
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <span className="text-gold-500/60 text-sm">✦</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>
          <p className="font-body text-paper-500 text-sm">
            每日头条 · 穿越时光的报纸
          </p>
        </div>
      </footer>
      
      <style>{`
        .column-text {
          text-align: justify;
          text-justify: inter-character;
        }
        .column-text::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
        }
      `}</style>
    </div>
  );
}
