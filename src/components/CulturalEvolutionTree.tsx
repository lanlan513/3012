import { useState, useEffect, useMemo } from 'react';
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

function buildTree(schools: CulturalSchool[], parentId: string | null, level: number, visitedIds: Set<string>): TreeNode[] {
  return schools
    .filter((s) => {
      if (visitedIds.has(s.id)) return false;
      if (parentId === null) {
        return s.parentSchoolIds.length === 0;
      }
      return s.parentSchoolIds.includes(parentId);
    })
    .sort((a, b) => a.yearStart - b.yearStart)
    .map((school) => {
      visitedIds.add(school.id);
      return {
        school,
        level,
        children: buildTree(schools, school.id, level + 1, visitedIds),
      };
    });
}

function getAllExpandableIds(nodes: TreeNode[]): Set<string> {
  const ids = new Set<string>();
  const collect = (nodeList: TreeNode[]) => {
    nodeList.forEach((n) => {
      if (n.children.length > 0) {
        ids.add(n.school.id);
        collect(n.children);
      }
    });
  };
  collect(nodes);
  return ids;
}

export default function CulturalEvolutionTree({ category }: Props) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [allExpanded, setAllExpanded] = useState(true);
  const [userIntervened, setUserIntervened] = useState(false);

  const colors = CULTURAL_CATEGORY_COLORS[category];
  const categoryLabel = CULTURAL_CATEGORY_LABELS[category];
  const categoryIcon = CULTURAL_CATEGORY_ICONS[category];

  const allSchools = useMemoCategorySchools(category);
  const tree = useMemo(() => {
    const visited = new Set<string>();
    return buildTree(allSchools, null, 0, visited);
  }, [allSchools]);

  const allExpandableIds = useMemo(() => getAllExpandableIds(tree), [tree]);

  useEffect(() => {
    if (allExpanded) {
      setExpandedIds(new Set(allExpandableIds));
    } else {
      setExpandedIds(new Set());
    }
    setUserIntervened(false);
  }, [allExpanded, category, allExpandableIds]);

  useEffect(() => {
    if (userIntervened) {
      const isAllExpanded = allExpandableIds.size > 0 && 
        Array.from(allExpandableIds).every(id => expandedIds.has(id));
      const isAllCollapsed = allExpandableIds.size === 0 ||
        Array.from(allExpandableIds).every(id => !expandedIds.has(id));
      
      if (isAllExpanded) setAllExpanded(true);
      else if (isAllCollapsed) setAllExpanded(false);
    }
  }, [expandedIds, allExpandableIds, userIntervened]);

  const toggleNode = (id: string) => {
    setUserIntervened(true);
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

  const handleExpandAll = () => {
    setAllExpanded(true);
    setExpandedIds(new Set(allExpandableIds));
    setUserIntervened(false);
  };

  const handleCollapseAll = () => {
    setAllExpanded(false);
    setExpandedIds(new Set());
    setUserIntervened(false);
  };

  const renderNodes = (nodes: TreeNode[]): React.ReactNode[] => {
    return nodes.map((node) => {
      const hasChildren = node.children.length > 0;
      const isExpanded = expandedIds.has(node.school.id);
      const connectionColor = category === 'literature' ? '#92400e' :
                             category === 'music' ? '#9f1239' :
                             category === 'painting' ? '#075985' : '#065f46';
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
            <div className="ml-4 pl-6 border-l-2" style={{ borderColor: connectionColor, opacity: 0.5 }}>
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
            onClick={handleExpandAll}
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
            onClick={handleCollapseAll}
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
