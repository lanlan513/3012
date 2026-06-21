import { ComparisonStatus } from '@/types';
import { STATUS_LABELS, STATUS_ICONS } from '@/data/dualTimeline';

interface StatusFilterProps {
  selectedStatus: ComparisonStatus | 'all';
  onStatusChange: (status: ComparisonStatus | 'all') => void;
  counts: Record<ComparisonStatus | 'all', number>;
}

export default function StatusFilter({ selectedStatus, onStatusChange, counts }: StatusFilterProps) {
  const statuses: Array<{ key: ComparisonStatus | 'all'; label: string; icon: string }> = [
    { key: 'all', label: '全部', icon: '✦' },
    { key: 'preserved', label: STATUS_LABELS['preserved'].label, icon: STATUS_ICONS['preserved'] },
    { key: 'lost', label: STATUS_LABELS['lost'].label, icon: STATUS_ICONS['lost'] },
    { key: 'rebuilt', label: STATUS_LABELS['rebuilt'].label, icon: STATUS_ICONS['rebuilt'] },
    { key: 'transformed', label: STATUS_LABELS['transformed'].label, icon: STATUS_ICONS['transformed'] },
    { key: 'new', label: STATUS_LABELS['new'].label, icon: STATUS_ICONS['new'] },
  ];

  const getStyle = (key: ComparisonStatus | 'all', isSelected: boolean) => {
    if (key === 'all') {
      return isSelected
        ? 'bg-gold-500 text-white border-gold-500'
        : 'bg-white/60 text-paper-700 border-paper-300/60 hover:bg-gold-50 hover:border-gold-300/60';
    }
    const info = STATUS_LABELS[key];
    return isSelected
      ? `${info.bgColor} ${info.color} ${info.borderColor} border-2`
      : `bg-white/60 text-paper-600 border-paper-200/60 hover:${info.bgColor} hover:${info.borderColor}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const isSelected = selectedStatus === status.key;
        return (
          <button
            key={status.key}
            onClick={() => onStatusChange(status.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-decorative tracking-wider transition-all duration-300 ${getStyle(status.key, isSelected)}`}
          >
            <span>{status.icon}</span>
            <span>{status.label}</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-sm text-[10px] ${
              isSelected ? 'bg-white/30' : 'bg-paper-100 text-paper-500'
            }`}>
              {counts[status.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
