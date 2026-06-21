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

export interface Place {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  quote: string;
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
