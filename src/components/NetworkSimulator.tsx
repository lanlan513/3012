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
import {
  generateSimulatedPersons,
  generateSimulatedRelations,
  getPersonActivity,
  getRelationStrength,
  getWarImpact,
  getCurrentWar,
  CATEGORY_COLORS,
  RELATION_COLORS,
  type SimulatedPerson,
  type SimulatedRelation,
} from '@/data/networkSimulation';
import { PersonCategory } from '@/types';
import { getRelationTypeLabel } from '@/data/relations';

interface GraphNode extends SimulationNodeDatum {
  id: string;
  name: string;
  category: PersonCategory;
  radius: number;
  birthYear: number;
  simPerson: SimulatedPerson;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  type: SimulatedRelation['type'];
  description: string;
  simRelation: SimulatedRelation;
}

const CATEGORY_CENTER_OFFSETS: Record<PersonCategory, { x: number; y: number }> = {
  literature: { x: -0.25, y: -0.15 },
  music: { x: 0.25, y: -0.15 },
  philosophy: { x: -0.15, y: 0.2 },
  art: { x: 0.2, y: 0.2 },
};

interface NetworkSimulatorProps {
  currentYear: number;
  selectedPersonId: string | null;
  onSelectPerson: (id: string | null) => void;
  isPlaying: boolean;
}

export default function NetworkSimulator({
  currentYear,
  selectedPersonId,
  onSelectPerson,
  isPlaying,
}: NetworkSimulatorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const simulationRef = useRef<ReturnType<typeof forceSimulation<GraphNode>> | null>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const [, setRenderTick] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  const simPersons = useMemo(() => generateSimulatedPersons(), []);
  const simRelations = useMemo(() => generateSimulatedRelations(), []);

  const activePersonIds = useMemo(() => {
    const ids = new Set<string>();
    simPersons.forEach((p) => {
      if (getPersonActivity(p, currentYear) > 0.1) {
        ids.add(p.id);
      }
    });
    return ids;
  }, [simPersons, currentYear]);

  const activeRelations = useMemo(() => {
    return simRelations.filter((r) => {
      if (!activePersonIds.has(r.source) || !activePersonIds.has(r.target)) return false;
      return getRelationStrength(r, currentYear) > 0.05;
    });
  }, [simRelations, activePersonIds, currentYear]);

  const getConnectionCount = useCallback(
    (personId: string) => {
      return activeRelations.filter(
        (r) => r.source === personId || r.target === personId
      ).length;
    },
    [activeRelations]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions((prev) => {
            if (Math.abs(prev.width - width) < 1 && Math.abs(prev.height - height) < 1) {
              return prev;
            }
            return { width, height };
          });
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const nodes: GraphNode[] = simPersons
      .filter((p) => activePersonIds.has(p.id))
      .map((simPerson) => {
        const person = simPerson.person;
        const connCount = getConnectionCount(person.id);
        const activity = getPersonActivity(simPerson, currentYear);
        const baseRadius = person.id === 'person-zweig' ? 30 : 14 + connCount * 1.5;
        const radius = baseRadius * (0.5 + activity * 0.5);
        const offset = CATEGORY_CENTER_OFFSETS[person.category];
        const clusterX = centerX + offset.x * dimensions.width * 0.5;
        const clusterY = centerY + offset.y * dimensions.height * 0.5;

        const existingNode = nodesRef.current.find((n) => n.id === person.id);

        return {
          id: person.id,
          name: person.name,
          category: person.category,
          radius,
          birthYear: person.birthYear,
          simPerson,
          x: existingNode?.x ?? clusterX + (Math.random() - 0.5) * 40,
          y: existingNode?.y ?? clusterY + (Math.random() - 0.5) * 40,
        };
      });

    const links: GraphLink[] = activeRelations.map((simRelation) => {
      return {
        source: simRelation.source,
        target: simRelation.target,
        type: simRelation.type,
        description: simRelation.description,
        simRelation,
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
          .distance(100)
          .strength(0.3)
      )
      .force(
        'charge',
        forceManyBody<GraphNode>()
          .strength(-250)
          .distanceMin(40)
          .distanceMax(280)
      )
      .force(
        'center',
        forceCenter(centerX, centerY).strength(0.02)
      )
      .force(
        'collide',
        forceCollide<GraphNode>().radius((d) => d.radius + 6)
      )
      .force('x', forceX<GraphNode>().x((d) => {
        const offset = CATEGORY_CENTER_OFFSETS[d.category];
        return centerX + offset.x * dimensions.width * 0.4;
      }).strength(0.15))
      .force('y', forceY<GraphNode>().y((d) => {
        const offset = CATEGORY_CENTER_OFFSETS[d.category];
        return centerY + offset.y * dimensions.height * 0.4;
      }).strength(0.15))
      .alpha(0.6)
      .alphaDecay(0.04)
      .velocityDecay(0.4)
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
    }, 2500);

    return () => {
      simulation.stop();
      clearTimeout(stopTimeout);
    };
  }, [simPersons, activePersonIds, activeRelations, dimensions, getConnectionCount, currentYear]);

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

  const warImpact = getWarImpact(currentYear);
  const currentWar = getCurrentWar(currentYear);
  const activeId = selectedPersonId || hoveredNodeId;

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
      const hasPersons = nodesRef.current.some((n) => n.category === cat);
      if (hasPersons) {
        const offset = CATEGORY_CENTER_OFFSETS[cat];
        result.push({
          category: cat,
          x: centerX + offset.x * dimensions.width * 0.35,
          y: centerY + offset.y * dimensions.height * 0.35,
          label: labels[cat],
        });
      }
    });

    return result;
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block select-none"
      >
        <defs>
          {nodesRef.current.map((node) => (
            <radialGradient
              key={`gradient-${node.id}`}
              id={`gradient-${node.id}`}
              cx="35%"
              cy="35%"
              r="65%"
            >
              <stop offset="0%" stopColor={CATEGORY_COLORS[node.category]} stopOpacity="0.9" />
              <stop offset="100%" stopColor={CATEGORY_COLORS[node.category]} stopOpacity="0.5" />
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
          <filter id="war-vignette">
            <feColorMatrix
              type="matrix"
              values="0.4 0 0 0 0.1
                      0.2 0.2 0 0 0.05
                      0.1 0.1 0.1 0 0.02
                      0 0 0 1 0"
            />
          </filter>
        </defs>

        {warImpact > 0.1 && (
          <rect
            x="0"
            y="0"
            width={dimensions.width}
            height={dimensions.height}
            fill="#3a0a0a"
            opacity={warImpact * 0.25}
            style={{ transition: 'opacity 0.8s ease' }}
          />
        )}

        {categoryClusterCenters.map((cluster) => (
          <g key={`cluster-${cluster.category}`}>
            <circle
              cx={cluster.x}
              cy={cluster.y}
              r={90}
              fill={CATEGORY_COLORS[cluster.category]}
              fillOpacity={0.04 * (1 - warImpact * 0.5)}
              stroke={CATEGORY_COLORS[cluster.category]}
              strokeOpacity={0.1 * (1 - warImpact * 0.5)}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <text
              x={cluster.x}
              y={cluster.y - 75}
              textAnchor="middle"
              className="font-decorative"
              fontSize={10}
              fill={CATEGORY_COLORS[cluster.category]}
              fillOpacity={0.4 * (1 - warImpact * 0.6)}
              letterSpacing="0.15em"
            >
              {cluster.label}
            </text>
          </g>
        ))}

        {linksRef.current.map((link, i) => {
          const sourcePos = getNodePosition(getLinkEndpointId(link.source));
          const targetPos = getNodePosition(getLinkEndpointId(link.target));
          const highlighted = isLinkHighlighted(link);
          const strength = getRelationStrength(link.simRelation, currentYear);
          const baseOpacity = activeId ? (highlighted ? 0.9 : 0.06) : Math.max(0.1, strength * 0.5);

          return (
            <g key={`link-${i}`} style={{ transition: 'opacity 0.6s ease' }}>
              <line
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={RELATION_COLORS[link.type]}
                strokeWidth={highlighted ? 2.5 : 0.8 + strength * 1.5}
                strokeOpacity={baseOpacity}
                strokeDasharray={
                  link.type === 'influence'
                    ? '5,3'
                    : link.type === 'intellectual'
                      ? '3,3'
                      : 'none'
                }
                style={{ transition: 'stroke-width 0.4s ease, stroke-opacity 0.6s ease' }}
              />
              {highlighted && (
                <text
                  x={(sourcePos.x + targetPos.x) / 2}
                  y={(sourcePos.y + targetPos.y) / 2 - 8}
                  textAnchor="middle"
                  className="font-body"
                  fontSize={9}
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
          const activity = getPersonActivity(node.simPerson, currentYear);
          const opacity = highlighted ? Math.max(0.6, activity) : Math.max(0.1, activity * 0.3);

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
                opacity,
                transition: 'opacity 0.5s ease',
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
                dy={node.radius + 14}
                className="font-body"
                fontSize={10}
                fontWeight={isSelected || isHovered ? 600 : 400}
                fill="#332515"
                opacity={activity > 0.5 ? 1 : activity * 2}
              >
                {node.name}
              </text>

              {node.id === 'person-zweig' && highlighted && (
                <text
                  textAnchor="middle"
                  dy={node.radius + 26}
                  className="font-decorative"
                  fontSize={8}
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

        {currentWar && isPlaying && (
          <g>
            <text
              x={dimensions.width / 2}
              y={40}
              textAnchor="middle"
              className="font-serif"
              fontSize={14}
              fill="#8b0000"
              fillOpacity={0.8}
              fontWeight="bold"
              letterSpacing="0.1em"
            >
              ⚔ {currentWar.name} ⚔
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
