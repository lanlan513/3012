import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';
import { persons } from '@/data/persons';
import { relations, RelationType, getRelationTypeLabel } from '@/data/relations';
import { PersonCategory } from '@/types';

interface GraphNode extends SimulationNodeDatum {
  id: string;
  name: string;
  category: PersonCategory;
  radius: number;
  birthYear: number;
  appearDelay: number;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  type: RelationType;
  description: string;
  era: string;
  appearDelay: number;
}

const CATEGORY_COLORS: Record<PersonCategory, string> = {
  literature: '#b8860b',
  music: '#8b4513',
  philosophy: '#5c440c',
  art: '#a67d4d',
};

const RELATION_COLORS: Record<RelationType, string> = {
  friendship: '#d4a017',
  influence: '#8b6914',
  collaboration: '#b8860b',
  mentorship: '#a67d4d',
  intellectual: '#7d5a2e',
  contemporary: '#c4a76c',
};

const CATEGORY_CENTER_OFFSETS: Record<PersonCategory, { x: number; y: number }> = {
  literature: { x: -0.25, y: -0.15 },
  music: { x: 0.25, y: -0.15 },
  philosophy: { x: -0.15, y: 0.2 },
  art: { x: 0.2, y: 0.2 },
};

interface RelationGraphProps {
  selectedCategories: PersonCategory[];
  selectedPersonId: string | null;
  onSelectPerson: (id: string | null) => void;
  animationPhase: number;
}

export default function RelationGraph({
  selectedCategories,
  selectedPersonId,
  onSelectPerson,
  animationPhase,
}: RelationGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const simulationRef = useRef<ReturnType<typeof forceSimulation<GraphNode>> | null>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const [renderTick, setRenderTick] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [visibleLinks, setVisibleLinks] = useState<Set<number>>(new Set());

  const filteredPersons = persons.filter((p) =>
    selectedCategories.includes(p.category)
  );
  const filteredPersonIds = new Set(filteredPersons.map((p) => p.id));
  const filteredRelations = relations.filter(
    (r) => filteredPersonIds.has(r.source) && filteredPersonIds.has(r.target)
  );

  const sortedPersons = useMemo(() => {
    return [...filteredPersons].sort((a, b) => a.birthYear - b.birthYear);
  }, [filteredPersons]);

  const getConnectionCount = useCallback(
    (personId: string) => {
      return filteredRelations.filter(
        (r) => r.source === personId || r.target === personId
      ).length;
    },
    [filteredRelations]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const nodes: GraphNode[] = sortedPersons.map((person, index) => {
      const connCount = getConnectionCount(person.id);
      const radius = person.id === 'person-zweig' ? 32 : 16 + connCount * 1.8;
      const offset = CATEGORY_CENTER_OFFSETS[person.category];
      const clusterX = centerX + offset.x * dimensions.width * 0.5;
      const clusterY = centerY + offset.y * dimensions.height * 0.5;

      return {
        id: person.id,
        name: person.name,
        category: person.category,
        radius,
        birthYear: person.birthYear,
        x: clusterX + (Math.random() - 0.5) * 40,
        y: clusterY + (Math.random() - 0.5) * 40,
        appearDelay: index * 60,
      };
    });

    const links: GraphLink[] = filteredRelations.map((relation) => {
      const delayIndex = sortedPersons.findIndex((p) => p.id === relation.source);

      return {
        source: relation.source,
        target: relation.target,
        type: relation.type,
        description: relation.description,
        era: relation.era,
        appearDelay: (delayIndex + 2) * 60 + 300,
      };
    });

    nodesRef.current = nodes;
    linksRef.current = links;
    setIsSimulating(true);

    const simulation = forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance(110)
          .strength(0.4)
      )
      .force(
        'charge',
        forceManyBody<GraphNode>()
          .strength(-280)
          .distanceMin(50)
          .distanceMax(300)
      )
      .force(
        'center',
        forceCenter(centerX, centerY).strength(0.03)
      )
      .force(
        'collide',
        forceCollide<GraphNode>().radius((d) => d.radius + 8)
      )
      .force('x', forceX<GraphNode>().x((d) => {
        const offset = CATEGORY_CENTER_OFFSETS[d.category];
        return centerX + offset.x * dimensions.width * 0.45;
      }).strength(0.2))
      .force('y', forceY<GraphNode>().y((d) => {
        const offset = CATEGORY_CENTER_OFFSETS[d.category];
        return centerY + offset.y * dimensions.height * 0.45;
      }).strength(0.2))
      .alpha(1)
      .alphaDecay(0.05)
      .velocityDecay(0.5)
      .on('tick', () => {
        setRenderTick((t) => t + 1);
      })
      .on('end', () => {
        setIsSimulating(false);
      });

    simulationRef.current = simulation;

    const stopTimeout = setTimeout(() => {
      simulation.stop();
      setIsSimulating(false);
    }, 3000);

    return () => {
      simulation.stop();
      clearTimeout(stopTimeout);
    };
  }, [sortedPersons, filteredRelations, dimensions, getConnectionCount]);

  useEffect(() => {
    if (animationPhase === 0) {
      setVisibleNodes(new Set());
      setVisibleLinks(new Set());
      return;
    }

    const nodeTimeouts: ReturnType<typeof setTimeout>[] = [];
    const linkTimeouts: ReturnType<typeof setTimeout>[] = [];

    nodesRef.current.forEach((node) => {
      const timeout = setTimeout(() => {
        setVisibleNodes((prev) => new Set([...prev, node.id]));
      }, node.appearDelay);
      nodeTimeouts.push(timeout);
    });

    linksRef.current.forEach((link, i) => {
      const timeout = setTimeout(() => {
        setVisibleLinks((prev) => new Set([...prev, i]));
      }, link.appearDelay);
      linkTimeouts.push(timeout);
    });

    return () => {
      nodeTimeouts.forEach(clearTimeout);
      linkTimeouts.forEach(clearTimeout);
    };
  }, [animationPhase, sortedPersons.length]);

  const getNodePosition = useCallback(
    (id: string) => {
      const node = nodesRef.current.find((n) => n.id === id);
      if (!node) return { x: 0, y: 0 };
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const padding = 50;
      return {
        x: Math.max(padding, Math.min(dimensions.width - padding, x)),
        y: Math.max(padding, Math.min(dimensions.height - padding, y)),
      };
    },
    [dimensions]
  );

  const getLinkEndpointId = (endpoint: string | number | GraphNode): string => {
    if (typeof endpoint === 'string') return endpoint;
    if (typeof endpoint === 'number') return String(endpoint);
    return endpoint.id;
  };

  const isLinkHighlighted = useCallback(
    (link: GraphLink) => {
      if (!selectedPersonId && !hoveredNodeId) return false;
      const activeId = selectedPersonId || hoveredNodeId;
      const sourceId = getLinkEndpointId(link.source);
      const targetId = getLinkEndpointId(link.target);
      return sourceId === activeId || targetId === activeId;
    },
    [selectedPersonId, hoveredNodeId]
  );

  const isNodeHighlighted = useCallback(
    (nodeId: string) => {
      if (!selectedPersonId && !hoveredNodeId) return true;
      const activeId = selectedPersonId || hoveredNodeId;
      if (nodeId === activeId) return true;
      return linksRef.current.some((link) => {
        const sourceId = getLinkEndpointId(link.source);
        const targetId = getLinkEndpointId(link.target);
        return (
          (sourceId === activeId && targetId === nodeId) ||
          (targetId === activeId && sourceId === nodeId)
        );
      });
    },
    [selectedPersonId, hoveredNodeId]
  );

  const handleNodeClick = useCallback(
    (id: string) => {
      onSelectPerson(selectedPersonId === id ? null : id);
    },
    [selectedPersonId, onSelectPerson]
  );

  const handleNodeMouseDown = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      const simulation = simulationRef.current;
      if (!simulation) return;

      const node = nodesRef.current.find((n) => n.id === id);
      if (!node) return;

      simulation.alpha(0.3).alphaDecay(0.05).restart();
      setIsSimulating(true);

      const startX = node.x ?? 0;
      const startY = node.y ?? 0;
      const offsetX = e.clientX;
      const offsetY = e.clientY;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        node.x = Math.max(50, Math.min(dimensions.width - 50, moveEvent.clientX - rect.left));
        node.y = Math.max(50, Math.min(dimensions.height - 50, moveEvent.clientY - rect.top));
        node.fx = node.x;
        node.fy = node.y;
        setRenderTick((t) => t + 1);
      };

      const handleMouseUp = () => {
        node.fx = null;
        node.fy = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => {
          if (simulationRef.current) {
            simulationRef.current.alphaTarget(0);
          }
        }, 500);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [dimensions]
  );

  const activeId = selectedPersonId || hoveredNodeId;
  const activeRelations = activeId
    ? filteredRelations.filter(
        (r) => r.source === activeId || r.target === activeId
      )
    : [];

  const categoryClusterCenters = useMemo(() => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const result: { category: PersonCategory; x: number; y: number; label: string }[] = [];
    const labels: Record<PersonCategory, string> = {
      literature: '文学圈',
      music: '音乐圈',
      philosophy: '思想圈',
      art: '艺术圈',
    };

    (Object.keys(CATEGORY_CENTER_OFFSETS) as PersonCategory[]).forEach((cat) => {
      if (selectedCategories.includes(cat)) {
        const offset = CATEGORY_CENTER_OFFSETS[cat];
        result.push({
          category: cat,
          x: centerX + offset.x * dimensions.width * 0.4,
          y: centerY + offset.y * dimensions.height * 0.4,
          label: labels[cat],
        });
      }
    });

    return result;
  }, [dimensions, selectedCategories]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block select-none"
      >
        <defs>
          {filteredPersons.map((person) => (
            <radialGradient
              key={`gradient-${person.id}`}
              id={`gradient-${person.id}`}
              cx="35%"
              cy="35%"
              r="65%"
            >
              <stop offset="0%" stopColor={CATEGORY_COLORS[person.category]} stopOpacity="0.9" />
              <stop offset="100%" stopColor={CATEGORY_COLORS[person.category]} stopOpacity="0.5" />
            </radialGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {categoryClusterCenters.map((cluster) => (
          <g key={`cluster-${cluster.category}`}>
            <circle
              cx={cluster.x}
              cy={cluster.y}
              r={100}
              fill={CATEGORY_COLORS[cluster.category]}
              fillOpacity={0.03}
              stroke={CATEGORY_COLORS[cluster.category]}
              strokeOpacity={0.1}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <text
              x={cluster.x}
              y={cluster.y - 85}
              textAnchor="middle"
              className="font-decorative"
              fontSize={11}
              fill={CATEGORY_COLORS[cluster.category]}
              fillOpacity={0.5}
              letterSpacing="0.15em"
            >
              {cluster.label}
            </text>
          </g>
        ))}

        {linksRef.current.map((link, i) => {
          const sourcePos = getNodePosition(
            getLinkEndpointId(link.source)
          );
          const targetPos = getNodePosition(
            getLinkEndpointId(link.target)
          );
          const highlighted = isLinkHighlighted(link);
          const isVisible = visibleLinks.has(i);

          return (
            <g key={`link-${i}`} style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
              <line
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={RELATION_COLORS[link.type]}
                strokeWidth={highlighted ? 2.5 : 1}
                strokeOpacity={highlighted ? 0.8 : activeId ? 0.08 : 0.3}
                strokeDasharray={link.type === 'influence' ? '6,3' : link.type === 'intellectual' ? '3,3' : 'none'}
              />
              {highlighted && (
                <text
                  x={(sourcePos.x + targetPos.x) / 2}
                  y={(sourcePos.y + targetPos.y) / 2 - 8}
                  textAnchor="middle"
                  className="font-body"
                  fontSize={10}
                  fill={RELATION_COLORS[link.type]}
                  fillOpacity={0.9}
                >
                  {getRelationTypeLabel(link.type)}
                </text>
              )}
            </g>
          );
        })}

        {nodesRef.current.map((node) => {
          const pos = getNodePosition(node.id);
          const highlighted = isNodeHighlighted(node.id);
          const isSelected = selectedPersonId === node.id;
          const isHovered = hoveredNodeId === node.id;
          const opacity = highlighted ? 1 : 0.1;
          const isVisible = visibleNodes.has(node.id);

          return (
            <g
              key={node.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => handleNodeClick(node.id)}
              onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              style={{ 
                cursor: isSimulating ? 'grab' : 'pointer',
                opacity: isVisible ? opacity : 0,
                transition: 'opacity 0.4s ease-out',
              }}
            >
              {(isSelected || isHovered) && (
                <circle
                  r={node.radius + 8}
                  fill="none"
                  stroke={CATEGORY_COLORS[node.category]}
                  strokeWidth={1.5}
                  strokeOpacity={0.5}
                  filter="url(#soft-glow)"
                >
                  <animate
                    attributeName="r"
                    from={node.radius + 4}
                    to={node.radius + 14}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;0.15;0.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              <circle
                r={node.radius}
                fill={`url(#gradient-${node.id})`}
                stroke={isSelected ? CATEGORY_COLORS[node.category] : 'rgba(255,255,255,0.3)'}
                strokeWidth={isSelected ? 3 : 1.5}
                filter={isSelected || isHovered ? 'url(#glow)' : undefined}
              />

              <circle
                r={node.radius - 4}
                fill="transparent"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={0.5}
              />

              <text
                textAnchor="middle"
                dy={node.radius + 16}
                className="font-body"
                fontSize={11}
                fontWeight={isSelected || isHovered ? 600 : 400}
                fill="#332515"
              >
                {node.name}
              </text>

              {node.id === 'person-zweig' && highlighted && (
                <text
                  textAnchor="middle"
                  dy={node.radius + 30}
                  className="font-decorative"
                  fontSize={9}
                  fill="#b8860b"
                  fillOpacity={0.7}
                  letterSpacing="0.1em"
                >
                  中心人物
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {activeId && activeRelations.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 bg-paper-100/95 backdrop-blur-sm rounded-sm p-4 shadow-paper border border-paper-300/60">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: CATEGORY_COLORS[
                  persons.find((p) => p.id === activeId)?.category || 'literature'
                ],
              }}
            />
            <span className="font-serif text-ink-700 font-semibold text-sm">
              {persons.find((p) => p.id === activeId)?.name} 的关联
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-paper-300/50 to-transparent" />
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {activeRelations.map((rel) => {
              const otherId = rel.source === activeId ? rel.target : rel.source;
              const otherPerson = persons.find((p) => p.id === otherId);
              return (
                <div
                  key={rel.id}
                  className="flex items-start gap-2 text-xs font-body text-paper-700"
                >
                  <span
                    className="inline-block px-1.5 py-0.5 rounded-sm text-paper-100 flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: RELATION_COLORS[rel.type],
                      fontSize: '10px',
                    }}
                  >
                    {getRelationTypeLabel(rel.type)}
                  </span>
                  <span className="font-semibold text-ink-600">{otherPerson?.name}：</span>
                  <span className="italic">{rel.description.slice(0, 50)}…</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
