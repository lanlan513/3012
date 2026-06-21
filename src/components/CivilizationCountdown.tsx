import { useMemo } from 'react';
import { CountdownData, WarEra } from '@/types';
import { getCountdownForYear, URGENCY_THEMES, WAR_OUTBREAK_LABEL } from '@/data/civilizationCountdown';
import { Clock, BookOpen, Globe, Shield, AlertTriangle, Eye } from 'lucide-react';

interface CivilizationCountdownProps {
  year: number;
  currentEra: WarEra;
}

function IndexBar({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) {
  const getLevelLabel = (v: number) => {
    if (v >= 85) return '鼎盛';
    if (v >= 70) return '繁荣';
    if (v >= 55) return '平稳';
    if (v >= 40) return '衰退';
    if (v >= 25) return '紧张';
    return '崩溃';
  };
  const getTextColor = (v: number) => {
    if (v >= 70) return 'text-emerald-700';
    if (v >= 50) return 'text-amber-700';
    if (v >= 30) return 'text-orange-700';
    return 'text-red-700';
  };
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="font-decorative text-[11px] tracking-wider text-paper-600">{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`font-serif text-sm font-bold tabular-nums ${getTextColor(value)}`}>{value}</span>
          <span className={`text-[10px] font-decorative tracking-wider ${getTextColor(value)}`}>{getLevelLabel(value)}</span>
        </div>
      </div>
      <div className="h-2 bg-paper-200/60 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function CivilizationCountdown({ year, currentEra }: CivilizationCountdownProps) {
  const countdown = useMemo<CountdownData>(() => {
    if (currentEra === 'war' || currentEra === 'interwar' || currentEra === 'wwii') {
      return getCountdownForYear(Math.min(year, 1914), 6, 27);
    }
    return getCountdownForYear(year, 6, 15);
  }, [year, currentEra]);

  const theme = URGENCY_THEMES[countdown.urgency];
  const perspective = countdown.perspective;
  const indices = perspective.indices;

  const formatDays = (days: number) => {
    if (days <= 0) return 'D-DAY';
    if (days < 365) return `${days.toLocaleString()} 天`;
    const years = Math.floor(days / 365);
    const remain = days % 365;
    return remain > 0 ? `${years} 年 ${remain} 天` : `${years} 年`;
  };

  const progressPercent = (() => {
    const totalDays = 365 * 15;
    const elapsed = Math.max(0, Math.min(totalDays, totalDays - countdown.daysToWar));
    return Math.round((elapsed / totalDays) * 100);
  })();

  const shouldShowCountdown = currentEra === 'pre-war' || (currentEra === 'war' && year <= 1914);

  if (!shouldShowCountdown && (currentEra === 'interwar' || currentEra === 'wwii')) {
    return null;
  }

  return (
    <div className={`relative bg-gradient-to-br ${theme.background} rounded-sm p-5 md:p-6 border ${theme.border} shadow-paper ${theme.glow} transition-all duration-700 overflow-hidden`}>
      <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-paper-200/50 overflow-hidden">
        <div
          className={`h-full ${theme.progress} transition-all duration-1000 ease-out`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-paper-300/40">
          <Eye size={16} className={theme.text} />
          <h3 className={`font-decorative text-sm tracking-[0.2em] ${theme.text}`}>
            身 在 局 中 · 文 明 倒 计 时
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-paper-300/40 to-transparent" />
          <span className={`text-lg ${theme.pulse}`}>{theme.icon}</span>
        </div>

        {countdown.urgency !== 'war' && (
          <div className="mb-5 md:mb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock size={13} className="text-paper-500" />
                  <span className="font-body text-xs text-paper-500">
                    {countdown.formattedDate} · {theme.label}
                  </span>
                </div>
                <p className="font-body text-sm text-paper-600 italic leading-relaxed">
                  {theme.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className={`font-decorative text-[10px] tracking-[0.25em] ${theme.text} opacity-70 mb-1`}>
                  距 离 大 战 爆 发
                </div>
                <div className={`font-serif text-3xl md:text-4xl font-bold tabular-nums ${theme.text}`}>
                  {formatDays(countdown.daysToWar)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-sm bg-white/30 border border-paper-200/50">
              <AlertTriangle size={14} className={theme.text} />
              <div className="flex-1 min-w-0">
                <div className={`font-decorative text-[10px] tracking-wider ${theme.text} opacity-80 mb-0.5`}>
                  爆 发 日
                </div>
                <div className="font-serif text-sm text-paper-700 truncate">
                  {WAR_OUTBREAK_LABEL}
                </div>
              </div>
            </div>
          </div>
        )}

        {countdown.urgency === 'war' && (
          <div className="mb-5 md:mb-6 p-4 rounded-sm bg-red-900/10 border border-red-400/40">
            <div className="flex items-start gap-3">
              <span className="text-3xl">⚔</span>
              <div>
                <div className={`font-decorative text-base tracking-wider ${theme.text} mb-1`}>
                  1914年7月28日 · 战火已燃
                </div>
                <p className="font-body text-sm text-paper-700 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-6 p-4 rounded-sm bg-white/25 border border-paper-200/40">
          <IndexBar
            label="文化繁荣"
            value={indices.culture}
            color="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500"
            icon={<BookOpen size={12} className="text-purple-600" />}
          />
          <IndexBar
            label="国际关系"
            value={indices.international}
            color="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
            icon={<Globe size={12} className="text-blue-600" />}
          />
          <IndexBar
            label="社会稳定"
            value={indices.stability}
            color="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"
            icon={<Shield size={12} className="text-emerald-600" />}
          />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="p-3.5 rounded-sm bg-white/30 border border-paper-200/40">
              <div className={`font-decorative text-[10px] tracking-[0.2em] ${theme.text} opacity-80 mb-1.5`}>
                当 时 人 心
              </div>
              <p className="font-serif text-sm md:text-base text-paper-800 leading-relaxed">
                {perspective.publicMood}
              </p>
            </div>
            <div className="p-3.5 rounded-sm bg-white/30 border border-paper-200/40">
              <div className={`font-decorative text-[10px] tracking-[0.2em] ${theme.text} opacity-80 mb-1.5`}>
                主 流 信 念
              </div>
              <p className="font-serif text-sm md:text-base text-paper-800 leading-relaxed">
                {perspective.prevailingBelief}
              </p>
            </div>
          </div>

          <blockquote className="p-4 rounded-sm border-l-4 border-gold-400/60 bg-gradient-to-r from-gold-50/50 via-amber-50/30 to-transparent">
            <p className="font-serif text-base md:text-lg italic text-ink-800 leading-relaxed mb-2">
              {perspective.quote}
            </p>
            <footer className="font-body text-xs text-paper-500">
              —— {perspective.quoteAuthor}
            </footer>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="p-3.5 rounded-sm bg-white/30 border border-paper-200/40">
              <div className="flex items-center gap-1.5 mb-2">
                <Globe size={11} className="text-blue-600" />
                <div className={`font-decorative text-[10px] tracking-[0.2em] text-blue-800`}>
                  外 交 气 候
                </div>
              </div>
              <p className="font-body text-xs md:text-sm text-paper-700 leading-relaxed">
                {perspective.diplomaticClimate}
              </p>
            </div>
            <div className="p-3.5 rounded-sm bg-white/30 border border-paper-200/40">
              <div className="flex items-center gap-1.5 mb-2">
                <Shield size={11} className="text-emerald-600" />
                <div className={`font-decorative text-[0.6rem] tracking-[0.2em] text-emerald-800`}>
                  社 会 暗 流
                </div>
              </div>
              <p className="font-body text-xs md:text-sm text-paper-700 leading-relaxed">
                {perspective.socialUnderCurrent}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-white/30 border border-paper-200/40">
            <div className="flex items-center gap-1.5 mb-3">
              <BookOpen size={13} className="text-purple-600" />
              <div className={`font-decorative text-[10px] tracking-[0.2em] text-purple-800`}>
                文 化 盛 况
              </div>
            </div>
            <ul className="space-y-1.5">
              {perspective.culturalHighlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-xs md:text-sm text-paper-700 leading-relaxed">
                  <span className="text-gold-500 mt-0.5 flex-shrink-0">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-4 rounded-sm border ${theme.border} bg-white/40`}>
            <div className="flex items-center gap-1.5 mb-3">
              <AlertTriangle size={13} className={theme.text} />
              <div className={`font-decorative text-[10px] tracking-[0.2em] ${theme.text}`}>
                未 被 察 觉 的 预 兆
              </div>
            </div>
            <ul className="space-y-1.5">
              {perspective.omens.map((o, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-xs md:text-sm text-paper-700 leading-relaxed">
                  <span className={`${theme.text} mt-0.5 flex-shrink-0`}>◈</span>
                  <span className="italic">{o}</span>
                </li>
              ))}
            </ul>
            <div className={`mt-3 pt-3 border-t border-paper-200/50 font-body text-[11px] md:text-xs ${theme.text} italic opacity-80`}>
              ※ 这些预兆在当时被忽视、被轻视，或被当作无关紧要的小事。直到历史翻过那一页，人们才读懂它们的含义。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
