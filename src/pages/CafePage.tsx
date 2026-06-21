import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coffee, Clock, Users, BookOpen, Music, Sparkles, X } from 'lucide-react';
import { cafeTables } from '@/data/cafes';
import { getPersonById } from '@/data/persons';
import { CATEGORY_LABELS } from '@/data/persons';
import { CafeTable, CafeDiscussion, WarEra } from '@/types';

const ERA_LABELS: Record<WarEra, { label: string; sublabel: string; color: string; bg: string; border: string; accent: string; glow: string }> = {
  'pre-war': {
    label: '太平盛世',
    sublabel: '1881 — 1914',
    color: 'text-amber-800',
    bg: 'bg-amber-50/60',
    border: 'border-amber-400/40',
    accent: 'text-amber-600',
    glow: 'shadow-amber-200/40',
  },
  'war': {
    label: '一战烽火',
    sublabel: '1914 — 1918',
    color: 'text-red-800',
    bg: 'bg-red-50/60',
    border: 'border-red-400/40',
    accent: 'text-red-600',
    glow: 'shadow-red-200/40',
  },
  'interwar': {
    label: '短暂和平',
    sublabel: '1918 — 1933',
    color: 'text-blue-800',
    bg: 'bg-blue-50/60',
    border: 'border-blue-400/40',
    accent: 'text-blue-600',
    glow: 'shadow-blue-200/40',
  },
  'wwii': {
    label: '黑暗深渊',
    sublabel: '1933 — 1942',
    color: 'text-gray-800',
    bg: 'bg-gray-50/60',
    border: 'border-gray-400/40',
    accent: 'text-gray-600',
    glow: 'shadow-gray-200/40',
  },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  literature: <BookOpen size={20} />,
  music: <Music size={20} />,
  philosophy: <Sparkles size={20} />,
  art: <Coffee size={20} />,
};

function TableCard({ table, isSelected, onClick }: { table: CafeTable; isSelected: boolean; onClick: () => void }) {
  const uniquePersons = useMemo(() => {
    const set = new Set<string>();
    table.discussions.forEach((d) => d.personIds.forEach((pid) => set.add(pid)));
    return set.size;
  }, [table]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full text-left p-5 md:p-6 rounded-sm transition-all duration-500 border overflow-hidden ${
        isSelected
          ? 'bg-paper-100/90 border-gold-500/60 shadow-paper-lg -translate-y-1'
          : 'bg-paper-100/50 border-paper-300/40 hover:border-gold-400/50 hover:-translate-y-0.5 hover:shadow-paper'
      }`}
    >
      <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-30" />
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold-100/30 via-transparent to-amber-50/20 pointer-events-none" />
      )}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-300 ${
            isSelected ? 'bg-gold-500/20 text-gold-700' : 'bg-paper-200/80 text-paper-600 group-hover:bg-gold-500/10 group-hover:text-gold-600'
          }`}>
            <span className="text-xl">{table.icon}</span>
          </div>
          <div>
            <h3 className={`font-serif text-lg font-semibold transition-colors duration-300 ${
              isSelected ? 'text-gold-800' : 'text-ink-700 group-hover:text-gold-700'
            }`}>
              {table.name}
            </h3>
            <span className={`text-xs font-decorative tracking-[0.15em] ${isSelected ? 'text-gold-600' : 'text-paper-500'}`}>
              {CATEGORY_LABELS[table.category]}
            </span>
          </div>
        </div>
        <p className={`font-body text-sm leading-relaxed line-clamp-2 transition-colors duration-300 ${
          isSelected ? 'text-ink-700' : 'text-paper-600'
        }`}>
          {table.description}
        </p>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-xs font-body ${isSelected ? 'text-gold-600' : 'text-paper-500'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-gold-400' : 'bg-paper-400'}`} />
            {table.discussions.length} 场讨论
          </span>
          <span className="text-paper-300">/</span>
          <span className={`inline-flex items-center gap-1 text-xs font-body ${isSelected ? 'text-gold-600' : 'text-paper-500'}`}>
            <Users size={11} />
            {uniquePersons} 位独立思想者
          </span>
        </div>
      </div>
    </button>
  );
}

function DiscussionPanel({ discussion, table, onClose }: { discussion: CafeDiscussion; table: CafeTable; onClose: () => void }) {
  const eraInfo = ERA_LABELS[discussion.era];
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  const persons = useMemo(() => {
    return discussion.personIds
      .map((pid) => getPersonById(pid))
      .filter(Boolean);
  }, [discussion.personIds]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-paper-100 rounded-sm shadow-paper-lg border border-paper-300/50">
        <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-paper-400/40 pointer-events-none rounded-tl-sm" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-paper-400/40 pointer-events-none rounded-tr-sm" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-paper-400/40 pointer-events-none rounded-bl-sm" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-paper-400/40 pointer-events-none rounded-br-sm" />

        <div className="relative p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-body border ${eraInfo.bg} ${eraInfo.color} ${eraInfo.border}`}>
                  <Clock size={11} />
                  {eraInfo.label} · {eraInfo.sublabel}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-body border bg-paper-50/60 text-paper-600 border-paper-300/40">
                  {CATEGORY_ICONS[table.category]}
                  {table.name}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-800 leading-snug">
                {discussion.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 ml-4 p-2 rounded-sm text-paper-500 hover:text-ink-700 hover:bg-paper-200/50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <p className="font-body text-paper-700 leading-relaxed mb-8 text-base">
            {discussion.description}
          </p>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
              <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
                观 点 碰 撞
              </h3>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
            </div>
            <div className="space-y-4">
              {discussion.viewpointClashes.map((clash, idx) => {
                const person = getPersonById(clash.personId);
                if (!person) return null;
                const isExpanded = expandedPerson === clash.personId;
                return (
                  <div
                    key={clash.personId}
                    className={`relative rounded-sm border transition-all duration-500 overflow-hidden ${
                      isExpanded
                        ? 'border-gold-400/60 bg-white/60 shadow-paper'
                        : 'border-paper-300/40 bg-paper-50/40 hover:border-gold-300/50 hover:shadow-sm'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedPerson(isExpanded ? null : clash.personId)}
                      className="w-full text-left p-4 md:p-5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-paper-200/80 text-sm font-serif font-bold text-ink-700">
                          {idx + 1}
                        </div>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <img
                            src={person.imageUrl}
                            alt={person.name}
                            className="w-9 h-9 rounded-full object-cover border border-paper-300/50"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/person/${person.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="font-serif text-base font-semibold text-ink-800 hover:text-gold-700 transition-colors truncate"
                              >
                                {person.name}
                              </Link>
                              <span className="text-paper-400 text-xs flex-shrink-0">
                                {person.birthYear}—{person.deathYear}
                              </span>
                            </div>
                            <span className="text-xs text-paper-500">{person.occupation}</span>
                          </div>
                        </div>
                        <span className={`text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                      <p className={`font-body text-sm leading-relaxed transition-all duration-500 ${
                        isExpanded ? 'text-ink-800' : 'text-paper-600 line-clamp-2'
                      }`}>
                        {clash.viewpoint}
                      </p>
                    </button>
                    {isExpanded && (
                      <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
                        <div className="border-t border-paper-200/50 pt-3 mt-1">
                          <p className="font-body text-xs text-paper-500 italic">
                            {person.quote}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`p-5 md:p-6 rounded-sm border ${eraInfo.bg} ${eraInfo.border}`}>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className={eraInfo.accent} />
              <span className={`font-decorative text-xs tracking-[0.15em] ${eraInfo.color}`}>
                历 史 背 景
              </span>
            </div>
            <p className="font-body text-paper-800 leading-relaxed text-sm md:text-base">
              {discussion.historicalBackground}
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
              <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
                相 关 人 物
              </h3>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {persons.map((person) =>
                person && (
                  <Link
                    key={person.id}
                    to={`/person/${person.id}`}
                    className="group flex flex-col items-center p-3 rounded-sm border border-paper-300/40 bg-paper-50/40 hover:border-gold-400/50 hover:bg-gold-50/30 hover:shadow-sm transition-all duration-300"
                  >
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-paper-300/50 group-hover:border-gold-400/60 transition-colors duration-300 mb-2"
                    />
                    <span className="font-serif text-sm font-semibold text-ink-800 group-hover:text-gold-700 transition-colors text-center">
                      {person.name}
                    </span>
                    <span className="text-[10px] text-paper-500 text-center mt-0.5">
                      {person.occupation}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CafePage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<WarEra | 'all'>('all');
  const [selectedDiscussion, setSelectedDiscussion] = useState<CafeDiscussion | null>(null);
  const [activeTableForDiscussion, setActiveTableForDiscussion] = useState<CafeTable | null>(null);

  const currentTable = selectedTable
    ? cafeTables.find((t) => t.id === selectedTable) || null
    : null;

  const availableEras = useMemo(() => {
    if (!currentTable) return [];
    const eras = new Set(currentTable.discussions.map((d) => d.era));
    return (['pre-war', 'war', 'interwar', 'wwii'] as WarEra[]).filter((e) => eras.has(e));
  }, [currentTable]);

  useEffect(() => {
    if (!currentTable) return;
    if (selectedEra !== 'all' && !availableEras.includes(selectedEra)) {
      setSelectedEra('all');
    }
  }, [currentTable, availableEras, selectedEra]);

  const handleTableClick = (tableId: string) => {
    if (selectedTable === tableId) {
      setSelectedTable(null);
    } else {
      setSelectedTable(tableId);
      setSelectedEra('all');
    }
  };

  const filteredDiscussions = useMemo(() => {
    if (!currentTable) return [];
    if (selectedEra === 'all') return currentTable.discussions;
    return currentTable.discussions.filter((d) => d.era === selectedEra);
  }, [currentTable, selectedEra]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-leather-50/80 via-paper-100 to-paper-200 relative">
      <div className="absolute inset-0 paper-bg opacity-40" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 25% 15%, rgba(184, 134, 11, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 75% 85%, rgba(139, 105, 20, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(184, 134, 11, 0.02) 60px, rgba(184, 134, 11, 0.02) 61px)',
        }}
      />

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
              <h1 className="font-serif text-3xl text-ink-700 font-semibold flex items-center gap-2">
                <Coffee size={24} className="text-gold-600" />
                昨日咖啡馆
              </h1>
              <p className="font-body text-paper-500 text-sm mt-1 italic">
                思想在咖啡香中碰撞 · 观点在烟雾中交锋
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/relations"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Users size={14} />
                <span className="hidden sm:inline">人 物 关 系</span>
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

      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10 mt-6">
            <p className="font-serif text-paper-700 text-lg italic max-w-2xl mx-auto leading-relaxed">
              "在维也纳的咖啡馆里，思想的边界比帝国的边界更自由。
              <br />
              这里没有护照，没有审查，只有观点的交锋与灵魂的碰撞。"
            </p>
            <p className="font-body text-paper-500 text-sm mt-3">
              —— 斯蒂芬·茨威格《昨日的世界》
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 flex-shrink-0">
              <div className="sticky top-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
                  <h2 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
                    咖 啡 桌
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
                </div>
                <div className="space-y-3">
                  {cafeTables.map((table) => (
                    <TableCard
                      key={table.id}
                      table={table}
                      isSelected={selectedTable === table.id}
                      onClick={() => handleTableClick(table.id)}
                    />
                  ))}
                </div>

                {currentTable && (
                  <div className="mt-6 p-4 rounded-sm border border-paper-300/40 bg-paper-50/40">
                    <p className="font-body text-xs text-paper-500 italic leading-relaxed">
                      {currentTable.atmosphere}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-2/3">
              {!currentTable ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 rounded-full bg-paper-200/60 flex items-center justify-center mb-6">
                    <Coffee size={40} className="text-gold-500/50" />
                  </div>
                  <h3 className="font-serif text-xl text-ink-700 mb-3">
                    选择一张咖啡桌
                  </h3>
                  <p className="font-body text-paper-500 max-w-md">
                    每张桌子代表一个文化圈层。点击左侧的桌位，进入那个时代的思想沙龙，聆听巨人们的观点碰撞。
                  </p>
                  <div className="flex items-center gap-6 mt-8">
                    {cafeTables.map((table) => (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => setSelectedTable(table.id)}
                        className="flex flex-col items-center gap-2 p-3 rounded-sm hover:bg-paper-200/40 transition-colors duration-300"
                      >
                        <span className="text-2xl">{table.icon}</span>
                        <span className="text-xs font-decorative tracking-wider text-paper-600">
                          {table.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{currentTable.icon}</span>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-ink-800">
                        {currentTable.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setSelectedEra('all')}
                        className={`px-3 py-1.5 rounded-sm text-xs font-decorative tracking-wider transition-all duration-300 border ${
                          selectedEra === 'all'
                            ? 'bg-gold-500/15 text-gold-700 border-gold-400/50'
                            : 'text-paper-600 border-paper-300/40 hover:border-gold-300/40 hover:text-gold-600'
                        }`}
                      >
                        全部
                      </button>
                      {availableEras.map((era) => {
                        const info = ERA_LABELS[era];
                        return (
                          <button
                            key={era}
                            type="button"
                            onClick={() => setSelectedEra(era)}
                            className={`px-3 py-1.5 rounded-sm text-xs font-decorative tracking-wider transition-all duration-300 border ${
                              selectedEra === era
                                ? `${info.bg} ${info.color} ${info.border}`
                                : 'text-paper-600 border-paper-300/40 hover:border-gold-300/40 hover:text-gold-600'
                            }`}
                          >
                            {info.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {filteredDiscussions.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="font-body text-paper-500">该时期暂无讨论记录</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {filteredDiscussions.map((discussion) => {
                        const eraInfo = ERA_LABELS[discussion.era];
                        const discussionPersons = discussion.personIds
                          .map((pid) => getPersonById(pid))
                          .filter(Boolean);
                        return (
                          <button
                            key={discussion.id}
                            type="button"
                            onClick={() => {
                              setSelectedDiscussion(discussion);
                              setActiveTableForDiscussion(currentTable);
                            }}
                            className="group w-full text-left relative bg-paper-100/70 rounded-sm p-5 md:p-6 shadow-paper hover:shadow-paper-lg transition-all duration-500 hover:-translate-y-1 border border-paper-300/40 hover:border-gold-400/50 overflow-hidden"
                          >
                            <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-35" />
                            <div className={`absolute top-0 right-0 w-40 h-40 -translate-y-1/2 translate-x-1/2 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500 bg-gold-500`} />

                            <div className="relative">
                              <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-body border ${eraInfo.bg} ${eraInfo.color} ${eraInfo.border}`}>
                                  <Clock size={10} />
                                  {eraInfo.label}
                                </span>
                                <span className="text-paper-300 text-xs">·</span>
                                <span className="text-[10px] font-body text-paper-500">
                                  {eraInfo.sublabel}
                                </span>
                              </div>

                              <h3 className="font-serif text-lg md:text-xl font-semibold text-ink-800 group-hover:text-gold-700 transition-colors duration-300 mb-3">
                                {discussion.title}
                              </h3>

                              <p className="font-body text-sm text-paper-600 leading-relaxed line-clamp-2 mb-4">
                                {discussion.description}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center -space-x-2">
                                  {discussionPersons.slice(0, 5).map((person) =>
                                    person && (
                                      <img
                                        key={person.id}
                                        src={person.imageUrl}
                                        alt={person.name}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-paper-100"
                                      />
                                    )
                                  )}
                                  {discussionPersons.length > 5 && (
                                    <div className="w-8 h-8 rounded-full bg-paper-200 border-2 border-paper-100 flex items-center justify-center text-[10px] text-paper-600 font-serif">
                                      +{discussionPersons.length - 5}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 text-paper-400 group-hover:text-gold-500 transition-colors duration-300">
                                  <span className="text-xs font-decorative tracking-wider">
                                    进 入 讨 论
                                  </span>
                                  <span className="text-sm">→</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedDiscussion && activeTableForDiscussion && (
        <DiscussionPanel
          discussion={selectedDiscussion}
          table={activeTableForDiscussion}
          onClose={() => {
            setSelectedDiscussion(null);
            setActiveTableForDiscussion(null);
          }}
        />
      )}

      <footer className="relative z-10 py-12 mt-16 border-t border-paper-300/50">
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
