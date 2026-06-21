export interface Chapter {
  id: string;
  title: string;
  era: string;
  yearStart: number;
  yearEnd: number;
  description: string;
  quote: string;
}

export interface Person {
  id: string;
  name: string;
  birthYear: number;
  deathYear: number;
  occupation: string;
  description: string;
  imageUrl: string;
  quote: string;
  chapterIds: string[];
}

export interface EraContext {
  era: string;
  chapterId: string;
  yearRange: string;
  culture: string;
  art: string;
  society: string;
  notableFigures?: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
  x: number;
  y: number;
}

export interface Place {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  quote: string;
  chapterIds: string[];
  coordinates: Coordinates;
  eraContexts: EraContext[];
}

export interface CulturalConnection {
  id: string;
  from: string;
  to: string;
  type: 'literary' | 'artistic' | 'musical' | 'philosophical' | 'historical';
  description: string;
  era: string;
  chapterIds: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  quote: string;
  chapterIds: string[];
  personIds: string[];
}

export type CardType = 'person' | 'place' | 'event';
