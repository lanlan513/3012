import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  X,
  Map,
  Building2,
  Sparkles,
  History,
  ChevronRight,
  User,
  Calendar,
  MapPin,
  Camera,
} from 'lucide-react';
import {
  streetScenes,
  SCENE_CATEGORY_LABELS,
  getStreetSceneById,
} from '@/data/streetScenes';
import { getPersonById } from '@/data/persons';
import {
  StreetScene,
  StreetBuilding,
  EasterEgg,
  BuildingHistoryPhase,
} from '@/types';

function SceneSelector({
  selectedSceneId,
  onSelect,
}: {
  selectedSceneId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="bg-paper-100/70 rounded-sm border border-paper-300/40 p-4 md:p-5 shadow-paper relative">
      <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-30" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
          <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
            场 景 漫 游
          </h3>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {streetScenes.map((scene) => {
            const categoryInfo = SCENE_CATEGORY_LABELS[scene.category];
            const isSelected = selectedSceneId === scene.id;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => onSelect(scene.id)}
                className={`group relative p-4 rounded-sm border transition-all duration-500 text-left overflow-hidden ${
                  isSelected
                    ? 'bg-gold-50/40 border-gold-500/60 shadow-paper -translate-y-1'
                    : 'bg-paper-50/50 border-paper-300/40 hover:border-gold-400/50 hover:-translate-y-0.5 hover:shadow-paper'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gold-500" />
                <div className="relative">
                  <div className="text-3xl mb-2">{categoryInfo.icon}</div>
                  <h4
                    className={`font-serif text-sm md:text-base font-semibold mb-1 transition-colors duration-300 ${
                      isSelected ? 'text-gold-800' : 'text-ink-700 group-hover:text-gold-700'
                    }`}
                  >
                    {scene.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs">
                    <span
                      className={`font-decorative tracking-wider ${
                        isSelected ? 'text-gold-600' : 'text-paper-500'
                      }`}
                    >
                      {scene.era}
                    </span>
                    <span className="text-paper-300">·</span>
                    <span
                      className={`font-body ${
                        isSelected ? 'text-gold-600' : 'text-paper-500'
                      }`}
                    >
                      {scene.yearRange}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SceneView({
  scene,
  onBuildingClick,
  onEasterEggClick,
  foundEasterEggs,
}: {
  scene: StreetScene;
  onBuildingClick: (building: StreetBuilding) => void;
  onEasterEggClick: (egg: EasterEgg) => void;
  foundEasterEggs: Set<string>;
}) {
  const sceneImageUrl = useMemo(
    () =>
      `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(scene.sceneImagePrompt)}&image_size=landscape_16_9`,
    [scene.sceneImagePrompt]
  );

  const allEasterEggs = useMemo(() => {
    const buildingEggs = scene.buildings.flatMap(
      (b) => (b.easterEggs || []).map((e) => ({ ...e, buildingName: b.name }))
    );
    const sceneEggs = scene.easterEggs.map((e) => ({ ...e, buildingName: scene.name }));
    return [...buildingEggs, ...sceneEggs];
  }, [scene]);

  const totalEggs = allEasterEggs.length;
  const foundCount = allEasterEggs.filter((e) => foundEasterEggs.has(e.id)).length;

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border bg-paper-50/60 border-paper-300/40">
            <MapPin size={14} className="text-gold-600" />
            <span className="font-body text-sm text-paper-700">{scene.city}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border bg-paper-50/60 border-paper-300/40">
            <Calendar size={14} className="text-gold-600" />
            <span className="font-body text-sm text-paper-700">{scene.yearRange}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border bg-amber-50/50 border-amber-400/40">
          <Sparkles size={14} className="text-amber-600" />
          <span className="font-body text-xs text-amber-700">
            历史彩蛋：{foundCount} / {totalEggs}
          </span>
        </div>
      </div>

      <div className="relative bg-paper-100 rounded-sm p-3 md:p-4 shadow-paper-lg border border-paper-300/50 overflow-hidden">
        <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none" />
        <div className="absolute inset-0 border border-paper-300/60 rounded-sm pointer-events-none m-1" />
        <div className="absolute inset-0 border border-paper-200/40 rounded-sm pointer-events-none m-2" />

        <div className="relative">
          <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
            <div className="absolute inset-0 border border-paper-400/40 m-1 z-10 rounded-sm pointer-events-none" />

            <img
              src={sceneImageUrl}
              alt={scene.name}
              className="w-full h-full object-cover sepia-[0.12]"
              loading="lazy"
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(51, 37, 21, 0.15) 0%, transparent 40%, transparent 60%, rgba(51, 37, 21, 0.25) 100%)',
              }}
            />

            {scene.buildings.map((building) => (
              <button
                key={building.id}
                type="button"
                onClick={() => onBuildingClick(building)}
                className="absolute group"
                style={{
                  left: `${building.position.x}%`,
                  top: `${building.position.y}%`,
                  width: `${building.position.width}%`,
                  height: `${building.position.height}%`,
                }}
              >
                <span className="absolute inset-0 rounded-sm border-2 border-gold-400/0 group-hover:border-gold-400/70 bg-gold-400/0 group-hover:bg-gold-400/10 transition-all duration-300 backdrop-blur-[0px] group-hover:backdrop-blur-[1px]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-white text-[10px] flex items-center justify-center shadow-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                  <Building2 size={10} />
                </span>
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 px-2 py-0.5 rounded-sm bg-ink-900/80 text-paper-100 text-[10px] font-body whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none">
                  {building.name}
                </span>
              </button>
            ))}

            {allEasterEggs.map((egg) => {
              const isFound = foundEasterEggs.has(egg.id);
              return (
                <button
                  key={egg.id}
                  type="button"
                  onClick={() => onEasterEggClick(egg)}
                  className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    isFound ? 'scale-90' : 'animate-pulse'
                  }`}
                  style={{
                    left: `${egg.position.x}%`,
                    top: `${egg.position.y}%`,
                  }}
                >
                  <span
                    className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shadow-paper transition-all duration-300 ${
                      isFound
                        ? 'bg-emerald-500/80 text-white border-2 border-emerald-300'
                        : 'bg-amber-400/80 text-white border-2 border-amber-200 hover:bg-amber-500 hover:scale-125'
                    }`}
                  >
                    {isFound ? (
                      egg.type === 'person' ? (
                        <User size={12} />
                      ) : (
                        <Sparkles size={12} />
                      )
                    ) : (
                      <span className="text-xs">?</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 md:mt-5 flex items-center justify-center gap-4">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-base md:text-lg">❦</span>
            <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>

          <div className="mt-3 md:mt-4 text-center">
            <blockquote className="font-serif text-base md:text-lg text-ink-600 italic leading-relaxed max-w-2xl mx-auto">
              {scene.description}
            </blockquote>
          </div>

          <div className="mt-4 md:mt-5 flex flex-wrap gap-2 justify-center">
            {scene.buildings.map((building) => (
              <button
                key={building.id}
                type="button"
                onClick={() => onBuildingClick(building)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-paper-300/40 bg-paper-50/50 hover:border-gold-400/50 hover:bg-gold-50/30 transition-all duration-300"
              >
                <Building2 size={12} className="text-paper-500 group-hover:text-gold-600 transition-colors" />
                <span className="font-body text-xs md:text-sm text-paper-700 group-hover:text-gold-700 transition-colors">
                  {building.name}
                </span>
                <ChevronRight size={12} className="text-paper-400 group-hover:text-gold-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildingDetailPanel({
  building,
  onClose,
  onEasterEggClick,
  foundEasterEggs,
}: {
  building: StreetBuilding;
  onClose: () => void;
  onEasterEggClick: (egg: EasterEgg) => void;
  foundEasterEggs: Set<string>;
}) {
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activePhase, setActivePhase] = useState<BuildingHistoryPhase>(building.history[0]);

  useEffect(() => {
    setHistoryIndex(0);
    setActivePhase(building.history[0]);
  }, [building.id]);

  const buildingImageUrl = useMemo(
    () =>
      `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(building.illustrationPrompt)}&image_size=square_hd`,
    [building.illustrationPrompt]
  );

  const relatedPersons = useMemo(
    () =>
      (building.relatedPersonIds || [])
        .map((pid) => getPersonById(pid))
        .filter(Boolean),
    [building.relatedPersonIds]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-paper-100 rounded-sm shadow-paper-lg border border-paper-300/50">
        <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
        <div className="absolute top-3 left-3 w-5 h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-paper-400/40 pointer-events-none rounded-tl-sm" />
        <div className="absolute top-3 right-3 w-5 h-5 md:w-6 md:h-6 border-t-2 border-r-2 border-paper-400/40 pointer-events-none rounded-tr-sm" />
        <div className="absolute bottom-3 left-3 w-5 h-5 md:w-6 md:h-6 border-b-2 border-l-2 border-paper-400/40 pointer-events-none rounded-bl-sm" />
        <div className="absolute bottom-3 right-3 w-5 h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-paper-400/40 pointer-events-none rounded-br-sm" />

        <div className="relative p-5 md:p-8">
          <div className="flex items-start justify-between mb-5 md:mb-6">
            <div className="flex-1 min-w-0 pr-3">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] md:text-xs font-body border bg-gold-50/50 text-gold-700 border-gold-400/40">
                  <History size={11} />
                  历 史 建 筑
                </div>
                {relatedPersons.length > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] md:text-xs font-body border bg-blue-50/50 text-blue-700 border-blue-400/40">
                    <User size={11} />
                    {relatedPersons.length} 位关联人物
                  </div>
                )}
              </div>
              <h2 className="font-serif text-xl md:text-3xl font-bold text-ink-800 leading-snug">
                {building.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 p-1.5 md:p-2 rounded-sm text-paper-500 hover:text-ink-700 hover:bg-paper-200/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
            <div>
              <div className="relative bg-paper-100 rounded-sm p-2 md:p-3 shadow-paper border border-paper-300/40">
                <div className="relative overflow-hidden rounded-sm aspect-square">
                  <img
                    src={buildingImageUrl}
                    alt={building.name}
                    className="w-full h-full object-cover sepia-[0.15]"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 60%, rgba(51, 37, 21, 0.25) 100%)',
                    }}
                  />
                </div>
              </div>
              {building.atmosphere && (
                <div className="mt-4 p-4 rounded-sm border border-paper-300/40 bg-paper-50/60">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera size={13} className="text-gold-600" />
                    <span className="font-decorative text-xs tracking-[0.15em] text-gold-700">
                      当 时 情 景
                    </span>
                  </div>
                  <p className="font-body text-sm text-paper-700 leading-relaxed italic">
                    {building.atmosphere}
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
                  <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
                    建 筑 印 象
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
                </div>
                <div className="bg-paper-100/80 rounded-sm p-4 md:p-5 shadow-paper relative border border-paper-300/40">
                  <div className="relative font-body text-paper-800 leading-relaxed text-sm md:text-base ink-drop-cap">
                    {building.description}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
                  <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
                    历 史 变 迁
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
                    {building.history.map((phase, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setHistoryIndex(idx);
                          setActivePhase(phase);
                        }}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-sm text-xs font-decorative tracking-wider transition-all duration-300 border ${
                          historyIndex === idx
                            ? 'bg-gold-500/15 text-gold-800 border-gold-500/60'
                            : 'bg-paper-50/50 text-paper-600 border-paper-300/40 hover:border-gold-400/50 hover:text-gold-700'
                        }`}
                      >
                        {phase.year}
                      </button>
                    ))}
                  </div>

                  <div className="relative pl-5 md:pl-6">
                    <div className="absolute left-1.5 md:left-2 top-1 bottom-1 w-px bg-gradient-to-b from-gold-500/60 via-gold-500/30 to-gold-500/60" />
                    <div
                      className="absolute left-0 md:left-0.5 w-3 h-3 rounded-full bg-gold-500 border-2 border-paper-100 shadow-paper"
                      style={{
                        top: `${(historyIndex * 100) / Math.max(building.history.length - 1, 1)}%`,
                        transform: 'translateY(-50%)',
                        transition: 'top 500ms ease-out',
                      }}
                    />

                    <div
                      key={historyIndex}
                      className="bg-paper-100/80 rounded-sm p-4 md:p-5 shadow-paper border border-paper-300/40"
                      style={{
                        animation: 'fadeIn 400ms ease-out',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-decorative tracking-wider bg-gold-500/15 text-gold-800 border border-gold-400/40">
                          {activePhase.year}
                        </span>
                        <h4 className="font-serif text-base md:text-lg font-semibold text-ink-800">
                          {activePhase.title}
                        </h4>
                      </div>
                      <p className="font-body text-sm md:text-base text-paper-700 leading-relaxed">
                        {activePhase.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(building.easterEggs?.length ?? 0) > 0 && (
            <div className="mt-6 md:mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
                <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
                  隐 藏 彩 蛋
                </h3>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {building.easterEggs?.map((egg) => {
                  const isFound = foundEasterEggs.has(egg.id);
                  const person = egg.targetId ? getPersonById(egg.targetId) : null;
                  return (
                    <button
                      key={egg.id}
                      type="button"
                      onClick={() => onEasterEggClick(egg)}
                      className={`group text-left p-4 rounded-sm border transition-all duration-500 overflow-hidden ${
                        isFound
                          ? 'bg-emerald-50/40 border-emerald-400/50'
                          : 'bg-amber-50/40 border-amber-400/40 hover:bg-amber-50/60 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            isFound
                              ? 'bg-emerald-500/20 text-emerald-700'
                              : 'bg-amber-500/20 text-amber-700'
                          }`}
                        >
                          {egg.type === 'person' ? <User size={14} /> : <Sparkles size={14} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-serif text-sm md:text-base font-semibold text-ink-800">
                              {isFound ? egg.title : '未发现的彩蛋'}
                            </h5>
                            {!isFound && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] font-decorative tracking-wider bg-amber-500/20 text-amber-800">
                                点击场景中?号发现
                              </span>
                            )}
                          </div>
                          <p className="font-body text-xs md:text-sm text-paper-600 leading-relaxed line-clamp-2">
                            {isFound
                              ? egg.description
                              : '在场景中仔细寻找，点击闪烁的问号图标即可发现这个隐藏的历史瞬间...'}
                          </p>
                          {isFound && person && (
                            <div className="mt-2 flex items-center gap-2">
                              <img
                                src={person.imageUrl}
                                alt={person.name}
                                className="w-6 h-6 rounded-full object-cover border border-paper-300/50"
                              />
                              <span className="text-[11px] md:text-xs text-paper-600">
                                关联人物：{person.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {relatedPersons.length > 0 && (
            <div className="mt-6 md:mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
                <h3 className="font-decorative text-sm tracking-[0.2em] text-gold-700">
                  关 联 人 物
                </h3>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/60" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {relatedPersons.map(
                  (person) =>
                    person && (
                      <Link
                        key={person.id}
                        to={`/person/${person.id}`}
                        onClick={onClose}
                        className="group flex flex-col items-center p-3 rounded-sm border border-paper-300/40 bg-paper-50/40 hover:border-gold-400/50 hover:bg-gold-50/30 hover:shadow-sm transition-all duration-300"
                      >
                        <img
                          src={person.imageUrl}
                          alt={person.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-paper-300/50 group-hover:border-gold-400/60 transition-colors duration-300 mb-2"
                        />
                        <span className="font-serif text-xs md:text-sm font-semibold text-ink-800 group-hover:text-gold-700 transition-colors text-center">
                          {person.name}
                        </span>
                        <span className="text-[10px] md:text-[11px] text-paper-500 text-center mt-0.5 line-clamp-1">
                          {person.occupation}
                        </span>
                      </Link>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EasterEggModal({
  egg,
  onClose,
}: {
  egg: EasterEgg;
  onClose: () => void;
}) {
  const person = egg.targetId ? getPersonById(egg.targetId) : null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-md" onClick={onClose} />
      <div
        className="relative w-full max-w-lg bg-paper-100 rounded-sm shadow-paper-lg border border-gold-400/50 overflow-hidden"
        style={{ animation: 'fadeIn 400ms ease-out' }}
      >
        <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gold-400/20 to-transparent pointer-events-none" />

        <div className="relative p-5 md:p-7">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-paper ${
                  egg.type === 'person'
                    ? 'bg-blue-500/20 text-blue-700 border-2 border-blue-400/40'
                    : 'bg-amber-500/20 text-amber-700 border-2 border-amber-400/40'
                }`}
              >
                {egg.type === 'person' ? <User size={22} /> : <Sparkles size={22} />}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-decorative tracking-wider bg-amber-500/15 text-amber-800 border border-amber-400/40 mb-1">
                  🎉 发现彩蛋！
                </div>
                <h2 className="font-serif text-lg md:text-xl font-bold text-ink-800">
                  {egg.title}
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-sm text-paper-500 hover:text-ink-700 hover:bg-paper-200/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {person && (
            <Link
              to={`/person/${person.id}`}
              onClick={onClose}
              className="flex items-center gap-3 p-3 mb-5 rounded-sm border border-blue-400/40 bg-blue-50/40 hover:bg-blue-50/60 transition-colors group"
            >
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-300/50"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-base font-semibold text-ink-800 group-hover:text-blue-700 transition-colors">
                  {person.name}
                </h4>
                <p className="text-xs text-paper-600">{person.occupation}</p>
                <p className="text-[10px] text-paper-500 mt-0.5">
                  {person.birthYear} — {person.deathYear}
                </p>
              </div>
              <ChevronRight size={16} className="text-paper-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          )}

          <div className="bg-paper-100/80 rounded-sm p-4 md:p-5 shadow-paper border border-paper-300/40 mb-5">
            <p className="font-body text-sm md:text-base text-paper-800 leading-relaxed">
              {egg.description}
            </p>
          </div>

          {egg.quote && (
            <blockquote className="relative pl-4 md:pl-5 py-3 border-l-2 border-gold-500/50 bg-gold-50/30 rounded-r-sm">
              <p className="font-serif text-sm md:text-base italic text-paper-700 leading-relaxed">
                {egg.quote}
              </p>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StreetArchivePage() {
  const [selectedSceneId, setSelectedSceneId] = useState<string>(streetScenes[0]?.id || '');
  const [selectedBuilding, setSelectedBuilding] = useState<StreetBuilding | null>(null);
  const [selectedEasterEgg, setSelectedEasterEgg] = useState<EasterEgg | null>(null);
  const [foundEasterEggs, setFoundEasterEggs] = useState<Set<string>>(new Set());
  const [showIntro, setShowIntro] = useState(true);

  const currentScene = useMemo(
    () => getStreetSceneById(selectedSceneId),
    [selectedSceneId]
  );

  const totalEasterEggsCount = useMemo(() => {
    return streetScenes.reduce((sum, scene) => {
      const sceneEggs = scene.easterEggs.length;
      const buildingEggs = scene.buildings.reduce(
        (s, b) => s + (b.easterEggs?.length || 0),
        0
      );
      return sum + sceneEggs + buildingEggs;
    }, 0);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleEasterEggClick = (egg: EasterEgg) => {
    setFoundEasterEggs((prev) => {
      const next = new Set(prev);
      next.add(egg.id);
      return next;
    });
    setSelectedEasterEgg(egg);
  };

  if (!currentScene) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-100">
        <div className="text-center">
          <p className="font-serif text-2xl text-ink-600">场景加载中...</p>
          <Link to="/timeline" className="mt-4 inline-block text-gold-600 hover:text-gold-700">
            返回时间线
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-leather-50/80 via-paper-100 to-paper-200 relative">
      <div className="absolute inset-0 paper-bg opacity-40" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 25% 15%, rgba(184, 134, 11, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 75% 85%, rgba(139, 105, 20, 0.06) 0%, transparent 50%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(184, 134, 11, 0.02) 60px, rgba(184, 134, 11, 0.02) 61px)',
        }}
      />

      {showIntro && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/80 backdrop-blur-md p-6">
          <div className="text-center max-w-lg" style={{ animation: 'fadeIn 600ms ease-out' }}>
            <div className="text-6xl mb-6">📜</div>
            <h1 className="font-serif text-3xl md:text-4xl text-paper-100 font-bold mb-4">
              街 景 档 案 馆
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400/70" />
              <span className="text-gold-400 text-xl">❦</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400/70" />
            </div>
            <p className="font-body text-paper-300 leading-relaxed mb-6 text-base md:text-lg">
              穿过时光的长廊，回到昨日的欧洲。
              <br />
              漫步于百年前的街道、车站、剧院与书店，
              <br />
              点击闪烁的问号，发现隐藏的历史彩蛋。
            </p>
            <div className="flex items-center justify-center gap-6 text-paper-400 text-sm">
              <div className="flex items-center gap-2">
                <Map size={14} className="text-gold-400" />
                <span>4 个场景</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-gold-400" />
                <span>
                  {streetScenes.reduce((s, sc) => s + sc.buildings.length, 0)} 座建筑
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-gold-400" />
                <span>{totalEasterEggsCount} 个彩蛋</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="relative z-10 pt-6 md:pt-8 pb-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-paper-600 hover:text-gold-700 transition-colors duration-300 font-body text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">返回时间线</span>
            </Link>

            <div className="text-center">
              <h1 className="font-serif text-2xl md:text-3xl text-ink-700 font-semibold flex items-center gap-2 justify-center">
                <Map size={22} className="text-gold-600" />
                街 景 档 案 馆
              </h1>
              <p className="font-body text-paper-500 text-xs md:text-sm mt-1 italic">
                漫步昨日的欧洲 · 触摸消逝的时光
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/cafe"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold-500/40 text-gold-700 hover:bg-gold-500 hover:text-paper-100 transition-all duration-300 font-decorative text-xs tracking-[0.12em] shadow-sm"
              >
                <Building2 size={12} />
                <span className="hidden sm:inline">咖 啡 馆</span>
              </Link>
            </div>
          </div>

          <div className="mt-4 md:mt-6 flex items-center justify-center gap-4">
            <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-lg">❧</span>
            <div className="w-24 md:w-32 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-6 md:mb-10 mt-2 md:mt-6">
            <p className="font-serif text-paper-700 text-base md:text-lg italic max-w-2xl mx-auto leading-relaxed">
              "在这些古老的街巷中，时间以另一种方式流淌。
              <br />
              每一扇窗户背后，都藏着一个消逝的故事。"
            </p>
            <p className="font-body text-paper-500 text-xs md:text-sm mt-3">
              —— 斯蒂芬·茨威格《昨日的世界》
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <SceneSelector selectedSceneId={selectedSceneId} onSelect={setSelectedSceneId} />
          </div>

          <div className="mb-5 md:mb-6">
            <div className="bg-paper-100/70 rounded-sm border border-paper-300/40 p-4 md:p-6 shadow-paper relative">
              <div className="absolute inset-0 paper-bg rounded-sm pointer-events-none opacity-30" />
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-ink-800 mb-2">
                    {currentScene.name}
                  </h3>
                  <p className="font-body text-sm md:text-base text-paper-700 leading-relaxed">
                    {currentScene.overview}
                  </p>
                </div>
                <div className="p-4 rounded-sm border border-paper-300/40 bg-paper-50/60">
                  <div className="flex items-center gap-2 mb-2">
                    <History size={14} className="text-gold-600" />
                    <span className="font-decorative text-xs tracking-[0.15em] text-gold-700">
                      历 史 背 景
                    </span>
                  </div>
                  <p className="font-body text-xs md:text-sm text-paper-700 leading-relaxed">
                    {currentScene.historicalBackground}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <SceneView
            scene={currentScene}
            onBuildingClick={setSelectedBuilding}
            onEasterEggClick={handleEasterEggClick}
            foundEasterEggs={foundEasterEggs}
          />

          <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-3 p-4 rounded-sm border border-gold-400/40 bg-gold-50/30">
            <div className="flex items-center gap-2 text-gold-700">
              <Sparkles size={16} />
              <span className="font-decorative text-xs md:text-sm tracking-[0.15em]">
                探索进度
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 md:w-48 h-2 rounded-full bg-paper-300/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-700"
                  style={{
                    width: `${(foundEasterEggs.size / totalEasterEggsCount) * 100}%`,
                  }}
                />
              </div>
              <span className="font-body text-xs md:text-sm text-gold-800">
                {foundEasterEggs.size} / {totalEasterEggsCount}
              </span>
            </div>
            {foundEasterEggs.size === totalEasterEggsCount && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-decorative tracking-wider bg-emerald-500/20 text-emerald-800 border border-emerald-400/40">
                🎉 全部发现！
              </span>
            )}
          </div>
        </div>
      </main>

      {selectedBuilding && (
        <BuildingDetailPanel
          building={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
          onEasterEggClick={handleEasterEggClick}
          foundEasterEggs={foundEasterEggs}
        />
      )}

      {selectedEasterEgg && (
        <EasterEggModal egg={selectedEasterEgg} onClose={() => setSelectedEasterEgg(null)} />
      )}

      <footer className="relative z-10 py-10 md:py-12 mt-12 border-t border-paper-300/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <span className="text-gold-500/60 text-sm">✦</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>
          <p className="font-body text-paper-500 text-xs md:text-sm">
            昨日的世界 · 一个欧洲人的回忆
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
