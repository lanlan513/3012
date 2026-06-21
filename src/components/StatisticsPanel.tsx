import { Users, Link2, Network, TrendingDown, Activity, Heart } from 'lucide-react';
import { calculateNetworkStats } from '@/data/networkSimulation';

interface StatisticsPanelProps {
  currentYear: number;
}

export default function StatisticsPanel({ currentYear }: StatisticsPanelProps) {
  const stats = calculateNetworkStats(currentYear);

  const statItems = [
    {
      icon: Users,
      label: '活跃人物',
      value: stats.activePersons,
      total: stats.totalPersons,
      color: '#b8860b',
      description: '当前在文化圈中活跃的人物数量',
    },
    {
      icon: Link2,
      label: '活跃关系',
      value: stats.activeRelations,
      total: stats.totalRelations,
      color: '#8b6914',
      description: '当前存在的文化关联数量',
    },
    {
      icon: Network,
      label: '平均连接数',
      value: stats.averageDegree.toFixed(1),
      color: '#5c440c',
      description: '每人平均拥有的关系数量',
    },
    {
      icon: Activity,
      label: '网络密度',
      value: `${(stats.density * 100).toFixed(1)}%`,
      color: '#a67d4d',
      description: '实际连接与可能连接的比例',
    },
    {
      icon: Heart,
      label: '文化凝聚力',
      value: `${(stats.cohesionIndex * 10).toFixed(0)}%`,
      color: stats.cohesionIndex > 0.5 ? '#2e7d32' : stats.cohesionIndex > 0.3 ? '#f57c00' : '#c62828',
      description: '文化生态圈的整体凝聚程度',
    },
    {
      icon: TrendingDown,
      label: '战争冲击',
      value: `${(stats.warImpact * 100).toFixed(0)}%`,
      color: stats.warImpact > 0.5 ? '#c62828' : stats.warImpact > 0.2 ? '#f57c00' : '#2e7d32',
      description: '战争对文化网络的破坏程度',
    },
  ];

  return (
    <div className="bg-paper-100/90 backdrop-blur-sm rounded-sm border border-paper-300/60 shadow-paper p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center">
          <Activity size={14} className="text-gold-700" />
        </div>
        <h3 className="font-serif text-lg text-ink-700 font-semibold">
          网络状态
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-paper-50/80 rounded-sm border border-paper-200/60 p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon size={12} style={{ color: item.color }} />
              </div>
              <span className="font-body text-[11px] text-paper-600">{item.label}</span>
            </div>
            
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="font-serif text-xl font-bold tabular-nums"
                style={{ color: item.color }}
              >
                {item.value}
              </span>
              {item.total !== undefined && (
                <span className="font-body text-[10px] text-paper-400 tabular-nums">
                  / {item.total}
                </span>
              )}
            </div>
            
            <p className="font-body text-[10px] text-paper-500 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-paper-200/60">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs text-paper-600">文化生态健康度</span>
          <span
            className="font-serif text-sm font-bold"
            style={{
              color: stats.cohesionIndex > 0.5 ? '#2e7d32' : stats.cohesionIndex > 0.3 ? '#f57c00' : '#c62828',
            }}
          >
            {(stats.cohesionIndex * 100).toFixed(0)}%
          </span>
        </div>
        <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${stats.cohesionIndex * 100}%`,
              backgroundColor: stats.cohesionIndex > 0.5 ? '#4caf50' : stats.cohesionIndex > 0.3 ? '#ff9800' : '#f44336',
            }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[9px] font-body text-paper-400">
          <span>崩溃</span>
          <span>脆弱</span>
          <span>健康</span>
        </div>
      </div>
    </div>
  );
}
