import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3-force';
import { Search, ZoomIn, ZoomOut, RotateCcw, Star, Sparkles, X, ArrowLeft } from 'lucide-react';
import {
  generateStarNodes,
  generateStarLinks,
  CONSTELLATIONS,
  getConstellationColor,
  getStarSize,
  type StarNode,
  type StarLink,
  type ConstellationCategory,
  type StarType,
} from '@/data/stars';

interface SimulatedNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: StarType;
  category: ConstellationCategory;
  description: string;
  imageUrl?: string;
  quote?: string;
  yearStart: number;
  yearEnd?: number;
  detailPath: string;
  importance: number;
  radius: number;
  color: string;
}

interface SimulatedLink extends d3.SimulationLinkDatum<SimulatedNode> {
  source: string | SimulatedNode;
  target: string | SimulatedNode;
  type: string;
  strength: number;
}

const STAR_TYPE_LABELS: Record<StarType, string> = {
  person: '人物',
  place: '城市',
  school: '流派',
  event: '事件',
};

export default function StarMap() {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<SimulatedNode, SimulatedLink> | null>(null);
  const [nodes, setNodes] = useState<SimulatedNode[]>([]);
  const [links, setLinks] = useState<SimulatedLink[]>([]);
  const [hoveredStar, setHoveredStar] = useState<SimulatedNode | null>(null);
  const [selectedStar, setSelectedStar] = useState<SimulatedNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<ConstellationCategory>>(
    new Set(['literature', 'music', 'philosophy', 'art'])
  );
  const [activeTypeFilters, setActiveTypeFilters] = useState<Set<StarType>>(
    new Set(['person', 'place', 'school', 'event'])
  );
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  const { filteredNodes, filteredLinks } = useMemo(() => {
    const filtered = nodes.filter(
      (n) =>
        activeFilters.has(n.category) &&
        activeTypeFilters.has(n.type) &&
        (searchQuery === '' || n.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const filteredIds = new Set(filtered.map((n) => n.id));
    const fLinks = links.filter(
      (l) =>
        filteredIds.has(typeof l.source === 'string' ? l.source : l.source.id) &&
        filteredIds.has(typeof l.target === 'string' ? l.target : l.target.id)
    );
    return { filteredNodes: filtered, filteredLinks: fLinks };
  }, [nodes, links, activeFilters, activeTypeFilters, searchQuery]);

  useEffect(() => {
    const starNodes = generateStarNodes();
    const starLinks = generateStarLinks();

    const simNodes: SimulatedNode[] = starNodes.map((n) => ({
      ...n,
      radius: getStarSize(n.importance, n.type),
      color: getConstellationColor(n.category),
      x: 0,
      y: 0,
    }));

    const simLinks: SimulatedLink[] = starLinks.map((l) => ({
      ...l,
    }));

    setNodes(simNodes);
    setLinks(simLinks);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (nodes.length === 0 || dimensions.width === 0) return;

    const width = dimensions.width;
    const height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const simulation = d3
      .forceSimulation<SimulatedNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<SimulatedNode, SimulatedLink>(links)
          .id((d) => d.id)
          .distance((d) => 80 / d.strength)
          .strength(0.3)
      )
      .force('charge', d3.forceManyBody<SimulatedNode>().strength(-180))
      .force('collide', d3.forceCollide<SimulatedNode>().radius((d) => d.radius + 6).strength(0.8))
      .force('center', d3.forceCenter(centerX, centerY).strength(0.02))
      .force('x', d3.forceX<SimulatedNode>((d) => {
        const c = CONSTELLATIONS.find((c) => c.id === d.category);
        return centerX + (c?.centerX || 0);
      }).strength(0.08))
      .force('y', d3.forceY<SimulatedNode>((d) => {
        const c = CONSTELLATIONS.find((c) => c.id === d.category);
        return centerY + (c?.centerY || 0);
      }).strength(0.08))
      .alphaDecay(0.02)
      .velocityDecay(0.4);

    simulationRef.current = simulation;

    let tickCount = 0;
    simulation.on('tick', () => {
      tickCount++;
      if (tickCount % 2 === 0) {
        setNodes([...nodes]);
      }
    });

    return () => {
      simulation.stop();
    };
  }, [nodes.length, dimensions]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.3, Math.min(3, zoom * delta));
    
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const scaleRatio = newZoom / zoom;
      const newX = mouseX - (mouseX - transform.x) * scaleRatio;
      const newY = mouseY - (mouseY - transform.y) * scaleRatio;
      
      setZoom(newZoom);
      setTransform({ x: newX, y: newY });
    }
  };

  const handleStarClick = useCallback(
    (node: SimulatedNode) => {
      if (node.detailPath) {
        navigate(node.detailPath);
      }
    },
    [navigate]
  );

  const handleZoomIn = () => {
    setZoom((z) => Math.min(3, z * 1.3));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(0.3, z / 1.3));
  };

  const handleResetView = () => {
    setZoom(1);
    setTransform({ x: 0, y: 0 });
  };

  const toggleFilter = (category: ConstellationCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        if (next.size > 1) next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toggleTypeFilter = (type: StarType) => {
    setActiveTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const getLinkOpacity = (link: SimulatedLink) => {
    const source = typeof link.source === 'object' ? link.source : null;
    const target = typeof link.target === 'object' ? link.target : null;
    
    if (hoveredStar && source && target) {
      if (source.id === hoveredStar.id || target.id === hoveredStar.id) {
        return 0.8;
      }
      return 0.05;
    }
    return 0.15;
  };

  const getStarOpacity = (node: SimulatedNode) => {
    if (hoveredStar && node.id !== hoveredStar.id) {
      const isConnected = filteredLinks.some((l) => {
        const srcId = typeof l.source === 'string' ? l.source : l.source.id;
        const tgtId = typeof l.target === 'string' ? l.target : l.target.id;
        return (
          (srcId === hoveredStar.id && tgtId === node.id) ||
          (tgtId === hoveredStar.id && srcId === node.id)
        );
      });
      return isConnected ? 0.9 : 0.2;
    }
    return 1;
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 5 + 's',
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(244, 63, 94, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
          }}
        />

        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
        >
          <defs>
            {CONSTELLATIONS.map((c) => (
              <radialGradient key={c.id} id={`glow-${c.id}`}>
                <stop offset="0%" stopColor={c.color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={c.color} stopOpacity="0" />
              </radialGradient>
            ))}
            {nodes.map((n) => (
              <radialGradient key={`star-glow-${n.id}`} id={`star-glow-${n.id}`}>
                <stop offset="0%" stopColor={n.color} stopOpacity="1" />
                <stop offset="40%" stopColor={n.color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {CONSTELLATIONS.map((c) => (
            <g key={`constellation-${c.id}`}>
              <circle
                cx={dimensions.width / 2 + c.centerX}
                cy={dimensions.height / 2 + c.centerY}
                r={200}
                fill={`url(#glow-${c.id})`}
                opacity={activeFilters.has(c.id) ? 0.5 : 0.1}
              />
              <text
                x={dimensions.width / 2 + c.centerX}
                y={dimensions.height / 2 + c.centerY - 160}
                textAnchor="middle"
                className="fill-white/40 font-serif text-sm"
                style={{ fontSize: '14px' }}
              >
                {c.icon} {c.name}
              </text>
            </g>
          ))}

          <g className="links">
            {filteredLinks.map((link, i) => {
              const source = typeof link.source === 'object' ? link.source : null;
              const target = typeof link.target === 'object' ? link.target : null;
              if (!source || !target) return null;
              
              const sourceColor = source.color;
              const targetColor = target.color;
              
              const midX = ((source.x || 0) + (target.x || 0)) / 2;
              const midY = ((source.y || 0) + (target.y || 0)) / 2;
              
              return (
                <g key={`link-${i}`}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={midX}
                    y2={midY}
                    stroke={sourceColor}
                    strokeWidth={1}
                    opacity={getLinkOpacity(link)}
                    className="transition-opacity duration-300"
                  />
                  <line
                    x1={midX}
                    y1={midY}
                    x2={target.x}
                    y2={target.y}
                    stroke={targetColor}
                    strokeWidth={1}
                    opacity={getLinkOpacity(link)}
                    className="transition-opacity duration-300"
                  />
                </g>
              );
            })}
          </g>

          <g className="stars">
            {filteredNodes.map((node) => (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer transition-all duration-200"
                style={{ opacity: getStarOpacity(node) }}
                onMouseEnter={() => setHoveredStar(node)}
                onMouseLeave={() => setHoveredStar(null)}
                onClick={() => handleStarClick(node)}
              >
                <circle
                  r={node.radius * 3}
                  fill={`url(#star-glow-${node.id})`}
                  opacity={0.5}
                  className="transition-all duration-300"
                />
                <circle
                  r={node.radius}
                  fill={node.color}
                  className="transition-all duration-200 hover:r-[1.2]"
                  style={{
                    filter: `drop-shadow(0 0 ${node.radius / 2}px ${node.color})`,
                  }}
                />
                <circle
                  r={node.radius * 0.4}
                  fill="white"
                  opacity={0.8}
                />
                {node.type === 'place' && (
                  <circle
                    r={node.radius * 1.5}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    opacity={0.6}
                  />
                )}
                {node.type === 'school' && (
                  <>
                    <circle
                      r={node.radius * 1.8}
                      fill="none"
                      stroke={node.color}
                      strokeWidth={1}
                      opacity={0.4}
                    />
                    <circle
                      r={node.radius * 2.2}
                      fill="none"
                      stroke={node.color}
                      strokeWidth={1}
                      opacity={0.2}
                    />
                  </>
                )}
                {hoveredStar?.id === node.id && (
                  <text
                    y={-node.radius - 8}
                    textAnchor="middle"
                    className="fill-white font-serif text-sm"
                    style={{ fontSize: '13px', paintOrder: 'stroke', stroke: '#0a0a1a', strokeWidth: 3 }}
                  >
                    {node.name}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>

        {hoveredStar && (
          <div
            className="absolute z-20 pointer-events-none bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-2xl max-w-xs"
            style={{
              left: (hoveredStar.x || 0) * zoom + transform.x + 20,
              top: (hoveredStar.y || 0) * zoom + transform.y - 20,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hoveredStar.color, boxShadow: `0 0 10px ${hoveredStar.color}` }}
              />
              <div>
                <h3 className="font-serif text-lg font-bold">{hoveredStar.name}</h3>
                <p className="text-xs text-white/50">
                  {STAR_TYPE_LABELS[hoveredStar.type]} · {CONSTELLATIONS.find((c) => c.id === hoveredStar.category)?.name}
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 line-clamp-3 mb-2">{hoveredStar.description}</p>
            {hoveredStar.yearStart && (
              <p className="text-xs text-white/40">
                {hoveredStar.yearStart}
                {hoveredStar.yearEnd ? ` — ${hoveredStar.yearEnd}` : ''}
              </p>
            )}
            <p className="text-xs text-white/30 mt-2">点击查看详情 →</p>
          </div>
        )}
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <div className="text-center">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider mb-1">
            <Sparkles className="inline w-5 h-5 mr-2 text-gold-400" />
            文化宇宙
            <Sparkles className="inline w-5 h-5 ml-2 text-gold-400" />
          </h1>
          <p className="text-white/40 text-sm">探索昨日世界的璀璨星空</p>
        </div>
      </div>

      <div className="absolute top-6 left-6 z-30 flex flex-col gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-black/80 transition-all text-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-decorative tracking-wider">返回</span>
        </button>
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <h3 className="font-serif text-sm mb-3 text-white/80">星座</h3>
          <div className="space-y-2">
            {CONSTELLATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleFilter(c.id)}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded transition-all text-left ${
                  activeFilters.has(c.id)
                    ? 'bg-white/10 text-white'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c.color, boxShadow: activeFilters.has(c.id) ? `0 0 8px ${c.color}` : 'none' }}
                />
                <span className="text-sm">{c.icon} {c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-30">
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <h3 className="font-serif text-sm mb-3 text-white/80">星体类型</h3>
          <div className="space-y-2">
            {(['person', 'place', 'school', 'event'] as StarType[]).map((type) => (
              <button
                key={type}
                onClick={() => toggleTypeFilter(type)}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded transition-all text-left ${
                  activeTypeFilters.has(type)
                    ? 'bg-white/10 text-white'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                <Star className="w-3 h-3" />
                <span className="text-sm">{STAR_TYPE_LABELS[type]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-30">
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10 flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-xs text-white/50 w-16 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          >
            <ZoomIn size={18} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button
            onClick={handleResetView}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-30">
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10 w-64">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="搜索星体..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <p className="text-white/20 text-xs">
          拖拽平移 · 滚轮缩放 · 点击星体查看详情
        </p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
