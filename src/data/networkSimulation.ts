import { Person, PersonCategory } from '@/types';
import { persons } from './persons';
import { relations, RelationType } from './relations';

export interface SimulatedPerson {
  id: string;
  person: Person;
  appearYear: number;
  peakYear: number;
  fadeYear: number;
  active: boolean;
}

export interface SimulatedRelation {
  id: string;
  source: string;
  target: string;
  type: RelationType;
  description: string;
  startYear: number;
  peakYear: number;
  endYear: number | null;
  endReason?: 'war' | 'death' | 'distance' | 'political';
  strength: number;
}

export interface WarEvent {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  impact: 'mild' | 'moderate' | 'severe' | 'catastrophic';
  description: string;
}

export const warEvents: WarEvent[] = [
  {
    id: 'war-wwi',
    name: '第一次世界大战',
    startYear: 1914,
    endYear: 1918,
    impact: 'severe',
    description: '一战爆发，欧洲和平时代终结，文化交流中断，许多关系被迫疏远。',
  },
  {
    id: 'war-wwii',
    name: '第二次世界大战',
    startYear: 1939,
    endYear: 1945,
    impact: 'catastrophic',
    description: '二战爆发，纳粹上台，欧洲文化圈彻底瓦解，知识分子流亡或遇难。',
  },
];

export function parseEraYears(era: string): { start: number; end: number } {
  const match = era.match(/(\d{4})-(\d{4})/);
  if (match) {
    return { start: parseInt(match[1]), end: parseInt(match[2]) };
  }
  return { start: 1900, end: 1940 };
}

export function generateSimulatedPersons(): SimulatedPerson[] {
  return persons.map((person) => {
    const appearYear = person.birthYear + 20;
    const peakYear = person.birthYear + 40;
    const fadeYear = person.deathYear;
    
    return {
      id: person.id,
      person,
      appearYear,
      peakYear,
      fadeYear,
      active: false,
    };
  });
}

export function generateSimulatedRelations(): SimulatedRelation[] {
  return relations.map((rel) => {
    const { start, end } = parseEraYears(rel.era);
    const sourcePerson = persons.find((p) => p.id === rel.source);
    const targetPerson = persons.find((p) => p.id === rel.target);
    
    let endYear: number | null = null;
    let endReason: SimulatedRelation['endReason'] | undefined;
    
    if (sourcePerson && targetPerson) {
      const deathYear = Math.min(sourcePerson.deathYear, targetPerson.deathYear);
      if (deathYear <= end) {
        endYear = deathYear;
        endReason = 'death';
      }
    }
    
    if (!endYear && rel.type === 'contemporary') {
      endYear = Math.min(end, 1938);
      endReason = 'distance';
    }
    
    if (!endYear && end < 1939) {
      endYear = end;
      endReason = 'distance';
    }
    
    if (!endYear) {
      if (rel.type === 'friendship' || rel.type === 'collaboration') {
        endYear = 1938;
        endReason = 'political';
      } else if (rel.type === 'influence' || rel.type === 'intellectual') {
        endYear = null;
      } else {
        endYear = end;
        endReason = 'distance';
      }
    }
    
    const peakYear = start + Math.floor((end - start) * 0.4);
    
    let strength = 0.5;
    if (rel.type === 'friendship') strength = 0.9;
    else if (rel.type === 'collaboration') strength = 0.85;
    else if (rel.type === 'mentorship') strength = 0.75;
    else if (rel.type === 'intellectual') strength = 0.7;
    else if (rel.type === 'influence') strength = 0.6;
    else strength = 0.4;
    
    return {
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: rel.type,
      description: rel.description,
      startYear: start,
      peakYear,
      endYear,
      endReason,
      strength,
    };
  });
}

export function getPersonActivity(person: SimulatedPerson, year: number): number {
  if (year < person.appearYear) return 0;
  if (year >= person.fadeYear) return 0;
  
  if (year < person.peakYear) {
    const riseDuration = person.peakYear - person.appearYear;
    const progress = (year - person.appearYear) / riseDuration;
    return Math.min(1, progress * 1.2);
  } else {
    const fallDuration = person.fadeYear - person.peakYear;
    const progress = (year - person.peakYear) / fallDuration;
    return Math.max(0, 1 - progress * 0.8);
  }
}

export function getRelationStrength(relation: SimulatedRelation, year: number): number {
  if (year < relation.startYear) return 0;
  
  if (relation.endYear && year >= relation.endYear) return 0;
  
  const warImpact = getWarImpact(year);
  const warPenalty = warImpact * 0.6;
  
  let strength = relation.strength;
  
  if (year < relation.peakYear) {
    const riseDuration = relation.peakYear - relation.startYear;
    const progress = (year - relation.startYear) / riseDuration;
    strength *= Math.min(1, progress * 1.5);
  } else if (relation.endYear) {
    const fallDuration = relation.endYear - relation.peakYear;
    const progress = (year - relation.peakYear) / fallDuration;
    strength *= Math.max(0, 1 - progress * 0.3);
  }
  
  return Math.max(0, strength - warPenalty);
}

export function getWarImpact(year: number): number {
  let impact = 0;
  
  for (const war of warEvents) {
    if (year < war.startYear - 2) continue;
    if (year > war.endYear + 5) continue;
    
    let warImpact = 0;
    
    if (year < war.startYear) {
      const preWarProgress = (year - (war.startYear - 2)) / 2;
      warImpact = preWarProgress * 0.3;
    } else if (year <= war.endYear) {
      const warProgress = (year - war.startYear) / (war.endYear - war.startYear);
      const baseImpact = war.impact === 'catastrophic' ? 1 : 
                         war.impact === 'severe' ? 0.8 :
                         war.impact === 'moderate' ? 0.5 : 0.3;
      warImpact = baseImpact * (0.6 + warProgress * 0.4);
    } else {
      const postWarProgress = (year - war.endYear) / 5;
      const baseImpact = war.impact === 'catastrophic' ? 1 : 
                         war.impact === 'severe' ? 0.8 :
                         war.impact === 'moderate' ? 0.5 : 0.3;
      warImpact = baseImpact * (1 - postWarProgress);
    }
    
    impact = Math.max(impact, warImpact);
  }
  
  return impact;
}

export function getCurrentWar(year: number): WarEvent | null {
  for (const war of warEvents) {
    if (year >= war.startYear && year <= war.endYear) {
      return war;
    }
  }
  return null;
}

export function getEraName(year: number): string {
  if (year < 1900) return '世纪末的黄金时代';
  if (year < 1914) return '世纪之交的繁华';
  if (year < 1918) return '一战风云';
  if (year < 1933) return '战后的短暂和平';
  if (year < 1939) return '黑暗降临';
  return '二战浩劫';
}

export interface NetworkStatistics {
  totalPersons: number;
  activePersons: number;
  totalRelations: number;
  activeRelations: number;
  averageDegree: number;
  density: number;
  warImpact: number;
  cohesionIndex: number;
}

export function calculateNetworkStats(year: number): NetworkStatistics {
  const simPersons = generateSimulatedPersons();
  const simRelations = generateSimulatedRelations();
  
  const activePersons = simPersons.filter(
    (p) => getPersonActivity(p, year) > 0.3
  );
  
  const activeRelations = simRelations.filter(
    (r) => getRelationStrength(r, year) > 0.2
  );
  
  const totalPersons = simPersons.length;
  const totalRelations = simRelations.length;
  
  const averageDegree = activePersons.length > 0
    ? (activeRelations.length * 2) / activePersons.length
    : 0;
  
  const maxPossibleEdges = activePersons.length * (activePersons.length - 1) / 2;
  const density = maxPossibleEdges > 0 ? activeRelations.length / maxPossibleEdges : 0;
  
  const warImpact = getWarImpact(year);
  
  const cohesionIndex = Math.max(0, 1 - warImpact * 0.7) * density * 10;
  
  return {
    totalPersons,
    activePersons: activePersons.length,
    totalRelations,
    activeRelations: activeRelations.length,
    averageDegree,
    density,
    warImpact,
    cohesionIndex,
  };
}

export const CATEGORY_COLORS: Record<PersonCategory, string> = {
  literature: '#b8860b',
  music: '#8b4513',
  philosophy: '#5c440c',
  art: '#a67d4d',
};

export const RELATION_COLORS: Record<RelationType, string> = {
  friendship: '#d4a017',
  influence: '#8b6914',
  collaboration: '#b8860b',
  mentorship: '#a67d4d',
  intellectual: '#7d5a2e',
  contemporary: '#c4a76c',
};
