import { useState, useEffect } from 'react';
import { CulturalCategory, CulturalSchool } from '@/types';
import {
  CULTURAL_CATEGORY_LABELS,
  CULTURAL_CATEGORY_COLORS,
  CULTURAL_CATEGORY_ICONS,
  getRootSchools,
  getChildSchools,
  getCulturalSchoolsByCategory,
} from '@/data/culturalSchools';
import CulturalSchoolCard from './CulturalSchoolCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  category: CulturalCategory;
}

interface TreeNode {
  school: CulturalSchool;
  children: TreeNode[];
  level: number;
}

function buildTree(schools: CulturalSchool[], parentId: string | null, level: number): TreeNode[] {
  return schools
    .filter((s) =>
      parentId === null
        ? s.parentSchoolIds.length === 0
        : s.parentSchoolIds.includes(parentId)
    )
    .sort((a, b) => a.yearStart - b.yearStart)
    .map((school) => ({
      school,
      level,
      children: buildTree(schools, school.id, level + 1),
    }));
}

export default function CulturalEvolutionTree({ category }: Props) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [allExpanded, setAllExpanded] = useState(true);

  const colors = CULTURAL_CATEGORY_COLORS[category];
  const categoryLabel = CULTURAL_CATEGORY_LABELS[category];
  const categoryIcon = CULTURAL_CATEGORY_ICONS[category];

  const allSchools = useMemoCategorySchools(category);
  const tree = buildTree(allSchools, null, 0);

  useEffect(() => {
    if (allExpanded) {
      const ids = new Set<string>();
      const collect = (nodes: TreeNode[]) => {
        nodes.forEach((n) => {
          if (n.children.length > 0) {
            ids.add(n.school.id);
            collect(n.children);
          }
        });
      };
      collect(tree);
      setExpandedIds(ids);
    } else {
      setExpandedIds(new Set());
    }
  }, [allExpanded, category]);

  const toggleNode = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderNodes = (nodes: TreeNode[]): React.ReactNode[] => {
    return nodes.map((node) => {
      const hasChildren = node.children.length > 0;
      const isExpanded = expandedIds.has(node.school.id);
      return (
        <div key={node.school.id} className="space-y-4">
          <CulturalSchoolCard
            school={node.school}
            depth={node.level}
            hasChildren={hasChildren}
            isExpanded={isExpanded}
            onToggle={() => toggleNode(node.school.id)}
          />
          {hasChildren && isExpanded && (
            <div className="ml-2 pl-4 border-l-2 opacity-40" style={{ borderColor: 'currentColor', color: colors.text.replace('text-', '') }}>
              {renderNodes(node.children)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-sm bg-white/60 backdrop-blur-sm border border-paper-300/60">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-sm flex items-center justify-center bg-gradient-to-br ${colors.primary} shadow-md`}>
            <span className="text-2xl">{categoryIcon}</span>
          </div>
          <div>
            <h2 className={`font-serif text-2xl md:text-3xl font-bold ${colors.text}`}>
              {categoryLabel}流派演化
            </h2>
            <p className="font-body text-sm text-paper-600 mt-1">
              共 {allSchools.length} 个流派 · 从 {allSchools[0]?.yearStart || '?'} 年到 {allSchools[allSchools.length - 1]?.yearEnd || '至今'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setAllExpanded(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-body transition-all duration-300 border ${
              allExpanded
                ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm`
                : 'bg-paper-50 text-paper-600 border-paper-300/60 hover:bg-paper-100'
            }`}
          >
            <ChevronDown size={14} />
            <span>全 部 展 开</span>
          </button>
          <button
            onClick={() => setAllExpanded(false)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-body transition-all duration-300 border ${
              !allExpanded
                ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm`
                : 'bg-paper-50 text-paper-600 border-paper-300/60 hover:bg-paper-100'
            }`}
          >
            <ChevronUp size={14} />
            <span>全 部 折 叠</span>
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {renderNodes(tree)}
      </div>
    </div>
  );
}

function useMemoCategorySchools(category: CulturalCategory): CulturalSchool[] {
  return getCulturalSchoolsByCategory(category);
}
