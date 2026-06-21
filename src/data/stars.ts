import { persons } from './persons';
import { places } from './places';
import { culturalSchools } from './culturalSchools';
import { events } from './events';
import { relations } from './relations';
import type { Person, Place, CulturalSchool, Event } from '@/types';

export type StarType = 'person' | 'place' | 'school' | 'event';

export type ConstellationCategory = 'literature' | 'music' | 'philosophy' | 'art';

export interface StarNode {
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
  fx?: number;
  fy?: number;
}

export interface StarLink {
  source: string;
  target: string;
  type: 'influence' | 'friendship' | 'mentorship' | 'collaboration' | 'historical' | 'belongs';
  strength: number;
}

export interface Constellation {
  id: ConstellationCategory;
  name: string;
  icon: string;
  color: string;
  glowColor: string;
  centerX: number;
  centerY: number;
}

export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'literature',
    name: '文学星座',
    icon: '📖',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    centerX: -250,
    centerY: -180,
  },
  {
    id: 'music',
    name: '音乐星座',
    icon: '🎵',
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    centerX: 280,
    centerY: -150,
  },
  {
    id: 'philosophy',
    name: '哲学星座',
    icon: '💭',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    centerX: -200,
    centerY: 220,
  },
  {
    id: 'art',
    name: '艺术星座',
    icon: '🎨',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    centerX: 250,
    centerY: 200,
  },
];

const getCategoryForPerson = (category: string): ConstellationCategory => {
  if (category === 'art') return 'art';
  return category as ConstellationCategory;
};

const getCategoryForSchool = (category: string): ConstellationCategory => {
  if (category === 'painting') return 'art';
  return category as ConstellationCategory;
};

const getPersonImportance = (person: Person): number => {
  const base = 3;
  const chapterBonus = person.chapterIds.length * 0.5;
  const nameBonus = ['斯蒂芬·茨威格', '西格蒙德·弗洛伊德', '弗里德里希·尼采', '马塞尔·普鲁斯特', '托马斯·曼'].includes(person.name) ? 2 : 0;
  return base + chapterBonus + nameBonus;
};

const getSchoolImportance = (school: CulturalSchool): number => {
  const base = 4;
  const influenceBonus = school.influencedSchoolIds.length * 0.5;
  const parentBonus = school.parentSchoolIds.length === 0 ? 1 : 0;
  return base + influenceBonus + parentBonus;
};

const getPlaceImportance = (place: Place): number => {
  const base = 5;
  const chapterBonus = place.chapterIds.length * 0.8;
  return base + chapterBonus;
};

const getEventImportance = (event: Event): number => {
  const base = 3;
  const majorEvents = ['第一次世界大战爆发', '第二次世界大战爆发', '希特勒上台', '德奥合并'];
  const majorBonus = majorEvents.includes(event.title) ? 2 : 0;
  return base + majorBonus;
};

export const generateStarNodes = (): StarNode[] => {
  const nodes: StarNode[] = [];

  persons.forEach((person) => {
    nodes.push({
      id: `person-${person.id}`,
      name: person.name,
      type: 'person',
      category: getCategoryForPerson(person.category),
      description: person.description,
      imageUrl: person.imageUrl,
      quote: person.quote,
      yearStart: person.birthYear,
      yearEnd: person.deathYear,
      detailPath: `/person/${person.id}`,
      importance: getPersonImportance(person),
    });
  });

  culturalSchools.forEach((school) => {
    nodes.push({
      id: `school-${school.id}`,
      name: school.name,
      type: 'school',
      category: getCategoryForSchool(school.category),
      description: school.influenceDescription,
      yearStart: school.yearStart,
      yearEnd: school.yearEnd,
      detailPath: `/school/${school.id}`,
      importance: getSchoolImportance(school),
    });
  });

  places.forEach((place) => {
    const categories: ConstellationCategory[] = ['literature', 'music', 'philosophy', 'art'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    nodes.push({
      id: `place-${place.id}`,
      name: place.name,
      type: 'place',
      category: 'literature',
      description: place.description,
      imageUrl: place.imageUrl,
      quote: place.quote,
      yearStart: 1880,
      yearEnd: 1945,
      detailPath: `/place/${place.id}`,
      importance: getPlaceImportance(place),
    });
  });

  events.forEach((event) => {
    nodes.push({
      id: `event-${event.id}`,
      name: event.title,
      type: 'event',
      category: 'philosophy',
      description: event.description,
      imageUrl: event.imageUrl,
      quote: event.quote,
      yearStart: parseInt(event.date),
      detailPath: `/event/${event.id}`,
      importance: getEventImportance(event),
    });
  });

  return nodes;
};

export const generateStarLinks = (): StarLink[] => {
  const links: StarLink[] = [];
  const linkSet = new Set<string>();

  const addLink = (source: string, target: string, type: StarLink['type'], strength: number) => {
    const key = [source, target].sort().join('-');
    if (!linkSet.has(key)) {
      linkSet.add(key);
      links.push({ source, target, type, strength });
    }
  };

  culturalSchools.forEach((school) => {
    school.representativePersons.forEach((rp) => {
      if (rp.id) {
        addLink(`school-${school.id}`, `person-${rp.id}`, 'belongs', 2.5);
      }
    });
  });

  culturalSchools.forEach((school) => {
    school.parentSchoolIds.forEach((parentId) => {
      addLink(`school-${school.id}`, `school-${parentId}`, 'influence', 1.5);
    });
    school.influencedSchoolIds.forEach((childId) => {
      addLink(`school-${school.id}`, `school-${childId}`, 'influence', 1.5);
    });
  });

  relations.forEach((rel) => {
    const strength = rel.type === 'friendship' || rel.type === 'mentorship' ? 2 : 1.2;
    addLink(`person-${rel.source}`, `person-${rel.target}`, rel.type as StarLink['type'], strength);
  });

  events.forEach((event) => {
    event.personIds.forEach((pid) => {
      addLink(`event-${event.id}`, `person-${pid}`, 'historical', 1.5);
    });
  });

  return links;
};

export const getConstellationColor = (category: ConstellationCategory): string => {
  const c = CONSTELLATIONS.find((c) => c.id === category);
  return c?.color || '#ffffff';
};

export const getStarSize = (importance: number, type: StarType): number => {
  const baseSize = type === 'school' ? 8 : type === 'place' ? 10 : type === 'event' ? 6 : 5;
  return baseSize + importance * 1.2;
};
