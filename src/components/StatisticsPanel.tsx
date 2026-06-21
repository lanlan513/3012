import { EraStatistics } from '@/types';
import { BookOpen, Users, Building2, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';

interface StatisticsPanelProps {
  statistics: EraStatistics;
}

export default function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  const lostPercentage = Math.round((statistics.lostInstitutions / statistics.totalCulturalInstitutions) * 100);
  const rebuiltPercentage = Math.round((statistics.rebuiltInstitutions / statistics.totalCulturalInstitutions) * 100);
  const transformedPercentage = Math.round((statistics.transformedInstitutions / statistics.totalCulturalInstitutions) * 100);

  const stats = [
    {
      label: '文化机构总数',
      value: statistics.totalCulturalInstitutions,
      icon: BookOpen,
      color: 'text-gold-600',
      bgColor: 'bg-gold-50',
      borderColor: 'border-gold-200/60',
    },
    {
      label: '永远消逝',
      value: statistics.lostInstitutions,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200/60',
      sublabel: `占 ${lostPercentage}%`,
    },
    {
      label: '战后重建',
      value: statistics.rebuiltInstitutions,
      icon: RefreshCw,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200/60',
      sublabel: `占 ${rebuiltPercentage}%`,
    },
    {
      label: '彻底改变',
      value: statistics.transformedInstitutions,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200/60',
      sublabel: `占 ${transformedPercentage}%`,
    },
    {
      label: '流亡知识分子',
      value: `${statistics.displacedPersons}+`,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200/60',
      sublabel: '作家、学者、艺术家',
    },
    {
      label: '建筑损毁',
      value: statistics.destroyedBuildings,
      icon: Building2,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200/60',
      sublabel: '主要城市平均',
    },
  ];

  return (
    <div className="relative bg-paper-100/80 rounded-sm p-6 shadow-paper border border-paper-200/60">
      <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
      <div className="absolute inset-2 border border-paper-200/40 rounded-sm pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400/60" />
          <h3 className="font-serif text-xl font-semibold text-ink-700">
            文明的损失 · 数据统计
          </h3>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400/60" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`${stat.bgColor} border ${stat.borderColor} rounded-sm p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <Icon size={20} className={`${stat.color} mx-auto mb-2`} />
                <div className={`font-serif text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="font-decorative text-xs text-paper-600 tracking-wider mt-1">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-[10px] text-paper-500 mt-1">
                    {stat.sublabel}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-red-50/50 border border-red-200/50 rounded-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-serif text-sm font-semibold text-red-800 mb-1">
                文化的损失
              </h4>
              <p className="font-body text-xs text-red-700/80 leading-relaxed">
                {statistics.culturalLossDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[10px] font-decorative tracking-wider text-paper-500 mb-2">
            文化机构命运分布
          </div>
          <div className="h-3 bg-paper-200/50 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-emerald-400 transition-all duration-700"
              style={{ width: `${((statistics.totalCulturalInstitutions - statistics.lostInstitutions - statistics.rebuiltInstitutions - statistics.transformedInstitutions - statistics.newInstitutions) / statistics.totalCulturalInstitutions) * 100}%` }}
              title="得以保存"
            />
            <div
              className="h-full bg-amber-400 transition-all duration-700"
              style={{ width: `${(statistics.rebuiltInstitutions / statistics.totalCulturalInstitutions) * 100}%` }}
              title="战后重建"
            />
            <div
              className="h-full bg-blue-400 transition-all duration-700"
              style={{ width: `${(statistics.transformedInstitutions / statistics.totalCulturalInstitutions) * 100}%` }}
              title="彻底改变"
            />
            <div
              className="h-full bg-sky-400 transition-all duration-700"
              style={{ width: `${(statistics.newInstitutions / statistics.totalCulturalInstitutions) * 100}%` }}
              title="战后新生"
            />
            <div
              className="h-full bg-red-400 transition-all duration-700"
              style={{ width: `${(statistics.lostInstitutions / statistics.totalCulturalInstitutions) * 100}%` }}
              title="永远消逝"
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-paper-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              保存
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              重建
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              改变
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-sky-400 rounded-full" />
              新生
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-400 rounded-full" />
              消逝
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
