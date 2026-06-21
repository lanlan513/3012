export interface Chapter {
  id: string;
  title: string;
  era: string;
  yearStart: number;
  yearEnd: number;
  description: string;
  quote: string;
}

export type PersonCategory = 'literature' | 'music' | 'philosophy' | 'art';

export interface Person {
  id: string;
  name: string;
  birthYear: number;
  deathYear: number;
  occupation: string;
  category: PersonCategory;
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

export type TimelineTrack = 'personal' | 'historical' | 'cultural';

export type WarEra = 'pre-war' | 'war' | 'interwar' | 'wwii';

export interface TimelineEntry {
  year: number;
  title: string;
  description: string;
  track: TimelineTrack;
}

export type CardType = 'person' | 'place' | 'event';

export type CafeTableCategory = 'literature' | 'music' | 'philosophy' | 'art';

export interface CafeDiscussion {
  id: string;
  title: string;
  description: string;
  personIds: string[];
  era: WarEra;
  viewpointClashes: {
    personId: string;
    viewpoint: string;
  }[];
  historicalBackground: string;
}

export interface CafeTable {
  id: string;
  name: string;
  category: CafeTableCategory;
  description: string;
  icon: string;
  atmosphere: string;
  discussions: CafeDiscussion[];
}

export type CulturalCategory = 'literature' | 'music' | 'painting' | 'philosophy';

export interface RepresentativeWork {
  title: string;
  author: string;
  year?: number;
}

export interface RepresentativePerson {
  id?: string;
  name: string;
  years?: string;
  role?: string;
}

export interface CulturalSchool {
  id: string;
  name: string;
  category: CulturalCategory;
  yearStart: number;
  yearEnd?: number;
  origin: string;
  keyIdeas: string[];
  representativePersons: RepresentativePerson[];
  representativeWorks: RepresentativeWork[];
  influenceDescription: string;
  influencedSchoolIds: string[];
  parentSchoolIds: string[];
  characteristics: string[];
  historicalContext: string;
}
