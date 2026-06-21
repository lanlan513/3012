import { Building2, Users, BookOpen, TrendingDown, TrendingUp, RefreshCw, Plus } from 'lucide-react';
import { EraStatistics } from '@/types';

interface StatisticsPanelProps {
  statistics: EraStatistics;
}

export default function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  const {
    totalCulturalInstitutions,
    lostInstitutions,
    rebuiltInstitutions,
    transformedInstitutions,
    newInstitutions,
    displacedPersons,
    destroyedBuildings,
    culturalLossDescription,
  } = statistics;

  const preservedInstitutions = totalCulturalInstitutions - lostInstitutions;
  const lossPercentage = Math.round((lostInstitutions / totalCulturalInstitutions) * 100);
  const recoveryPercentage = Math.round(((rebuiltInstitutions + transformedInstitutions + newInstitutions) / totalCulturalInstitutions) * 100);

  const statItems = [
    {
      icon: Building2,
      label: '文化机构总数',
      value: totalCulturalInstitutions,
      color: '#b8860b',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200/60',
    },
    {
      icon: TrendingDown,
      label: '永远消逝',
      value: lostInstitutions,
      color: '#c62828',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200/60',
      suffix: `(${lossPercentage}%)`,
    },
    {
      icon: TrendingUp,
      label: '得以保存',
      value: preservedInstitutions,
      color: '#2e7d32',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200/60',
    },
    {
      icon: RefreshCw,
      label: '战后重建',
      value: rebuiltInstitutions,
      color: '#f57c00',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200/60',
    },
    {
      icon: RefreshCw,
      label: '彻底改变',
      value: transformedInstitutions,
      color: '#1565c0',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200/60',
    },
    {
      icon: Plus,
      label: '战后新生',
      value: newInstitutions,
      color: '#0277bd',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200/60',
    },
  ];

  return (
    <div className="bg-paper-100/80 backdrop-blur-sm rounded-sm border border-gold-200/40 shadow-paper p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
          <BookOpen size={20} className="text-gold-700" />
        </div>
        <div>
          <h2 className="font-serif text-2xl text-ink-700 font-semibold">
            文明的沧桑
          </h2>
          <p className="font-body text-paper-500 text-sm">
            文化机构与知识分子的命运变迁（1913-1945）
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statItems.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} rounded-sm border ${item.borderColor} p-4 text-center`}
          >
            <div
              className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <item.icon size={16} style={{ color: item.color }} />
            </div>
            <div
              className="font-serif text-3xl font-bold tabular-nums mb-1"
              style={{ color: item.color }}
            >
              {item.value}
            </div>
            <p className="font-body text-[11px] text-paper-600 leading-tight">
              {item.label}
              {item.suffix && (
                <span style={{ color: item.color }}> {item.suffix}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-paper-50/60 rounded-sm border border-paper-200/60 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-amber-700" />
            <h3 className="font-serif text-lg text-ink-700 font-semibold">
              流亡知识分子
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-4xl font-bold text-amber-800 tabular-nums">
              {displacedPersons.toLocaleString()}
            </span>
            <span className="font-body text-xs text-paper-500">人</span>
          </div>
          <p className="font-body text-sm text-paper-600 leading-relaxed">
            1933年至1945年间，约有2500名犹太知识分子和文化精英被迫逃离纳粹统治的欧洲。
            他们中的许多人再也没有回到故土。
          </p>
        </div>

        <div className="bg-paper-50/60 rounded-sm border border-paper-200/60 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={16} className="text-red-700" />
            <h3 className="font-serif text-lg text-ink-700 font-semibold">
              建筑损毁
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-4xl font-bold text-red-800">
              {destroyedBuildings}
            </span>
          </div>
          <p className="font-body text-sm text-paper-600 leading-relaxed">
            欧洲大陆上，无数历史悠久的图书馆、剧院、大学和博物馆毁于战火。
            仅维也纳就有超过200座重要建筑被完全摧毁。
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-900/5 via-paper-100 to-gray-900/5 rounded-sm p-5 border border-gold-200/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-red-900/10 flex items-center justify-center">
            <TrendingDown size={16} className="text-red-800" />
          </div>
          <h3 className="font-serif text-lg text-ink-700 font-semibold">
            文化的断层
          </h3>
        </div>
        <p className="font-body text-sm text-paper-700 leading-relaxed">
          {culturalLossDescription}
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs text-paper-600">文明存续指数</span>
          <span className="font-serif text-sm font-bold text-ink-700">
            {recoveryPercentage}%
          </span>
        </div>
        <div className="h-3 bg-paper-200 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-emerald-500 transition-all duration-1000"
              style={{ width: `${(preservedInstitutions / totalCulturalInstitutions) * 100}%` }}
            />
            <div
              className="bg-amber-500 transition-all duration-1000"
              style={{ width: `${(rebuiltInstitutions / totalCulturalInstitutions) * 100}%` }}
            />
            <div
              className="bg-blue-500 transition-all duration-1000"
              style={{ width: `${((transformedInstitutions + newInstitutions) / totalCulturalInstitutions) * 100}%` }}
            />
            <div
              className="bg-red-500 transition-all duration-1000"
              style={{ width: `${lossPercentage}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-body text-[9px] text-paper-500">保存</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-body text-[9px] text-paper-500">重建</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-body text-[9px] text-paper-500">改变/新生</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-body text-[9px] text-paper-500">消逝</span>
          </div>
        </div>
      </div>
    </div>
  );
}
