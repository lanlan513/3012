import { events } from '@/data/events';
import { chapters } from '@/data/chapters';
import { persons } from '@/data/persons';
import { getAllTimelineEntries, getWarEra } from '@/data/timelineEntries';
import { TimelineEntry, WarEra } from '@/types';

export interface NewspaperHeadline {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: 'culture' | 'society' | 'historical';
  location?: string;
  quote?: string;
  imageUrl?: string;
}

export interface NewspaperColumn {
  id: string;
  title: string;
  author: string;
  content: string;
  category: 'literature' | 'art' | 'music' | 'philosophy' | 'science';
}

export interface NewsFlash {
  id: string;
  date: string;
  content: string;
  category: 'politics' | 'economy' | 'culture' | 'international';
}

export interface Newspaper {
  year: number;
  era: WarEra;
  chapterTitle: string;
  dateLine: string;
  weather: string;
  frontPage: {
    mainHeadline: NewspaperHeadline;
    secondaryHeadlines: NewspaperHeadline[];
  };
  columns: NewspaperColumn[];
  newsFlashes: NewsFlash[];
  advertisements: string[];
}

const WEATHER_BY_ERA: Record<WarEra, string[]> = {
  'pre-war': ['晴朗', '微风', '多云', '和煦', '宜人'],
  'war': ['阴霾', '萧瑟', '沉郁', '凄冷', '压抑'],
  'interwar': ['多变', '乍暖还寒', '阴晴不定', '复苏', '希望'],
  'wwii': ['阴云密布', '风雨欲来', '昏暗', '沉闷', '萧瑟'],
};

const NEWSPAPER_NAMES: Record<WarEra, string[]> = {
  'pre-war': ['维也纳日报', '新自由报', '泰晤士报', '费加罗报'],
  'war': ['战时公报', '每日电讯', '战地通讯', '巴黎回声'],
  'interwar': ['时代周刊', '世界报', '新苏黎世报', '观察家报'],
  'wwii': ['每日邮报', '晚间新闻', '国际先驱论坛报', '卫报'],
};

function getEntriesForYear(year: number): {
  historical: TimelineEntry[];
  cultural: TimelineEntry[];
  personal: TimelineEntry[];
} {
  const allEntries = getAllTimelineEntries();
  const yearEntries = allEntries.filter(e => e.year === year);
  
  return {
    historical: yearEntries.filter(e => e.track === 'historical'),
    cultural: yearEntries.filter(e => e.track === 'cultural'),
    personal: yearEntries.filter(e => e.track === 'personal'),
  };
}

function getEventsForYear(year: number) {
  return events.filter(event => {
    const eventYear = parseInt(event.date.match(/\d{4}/)?.[0] || '0');
    return eventYear === year;
  });
}

function getPersonsActiveInYear(year: number) {
  return persons.filter(person => 
    person.birthYear <= year && person.deathYear >= year
  );
}

function generateHeadline(entry: TimelineEntry, category: 'culture' | 'society' | 'historical'): NewspaperHeadline {
  return {
    id: `headline-${entry.year}-${entry.title}`,
    title: entry.title,
    subtitle: generateSubtitle(category),
    content: entry.description,
    category,
    quote: generateQuote(),
  };
}

function generateSubtitle(category: string): string {
  const culturalSubtitles = [
    '文坛艺苑新气象',
    '思想界的新震动',
    '艺术革命悄然兴起',
    '文化界的里程碑',
    '学术进展引人注目',
  ];
  const historicalSubtitles = [
    '时局风云变幻',
    '历史转折点',
    '世界局势新动向',
    '欧洲政局变动',
    '国际关系新篇章',
  ];
  const societySubtitles = [
    '社会生活新变化',
    '都市生活掠影',
    '民生百态',
    '时代变迁的印记',
    '社会风尚的转变',
  ];
  
  const subtitles = category === 'culture' ? culturalSubtitles 
    : category === 'historical' ? historicalSubtitles 
    : societySubtitles;
  
  return subtitles[Math.floor(Math.random() * subtitles.length)];
}

function generateQuote(): string | undefined {
  const quotes = [
    '"这是一个时代的印记。"',
    '"历史的车轮滚滚向前。"',
    '"每一个今天都将成为明天的传奇。"',
    '"时代在变迁，文明在演进。"',
    '"有些事件，注定要被载入史册。"',
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function generateColumn(entry: TimelineEntry, personName: string): NewspaperColumn {
  const categoryMap: Record<string, 'literature' | 'art' | 'music' | 'philosophy' | 'science'> = {
    '文学': 'literature',
    '艺术': 'art',
    '绘画': 'art',
    '音乐': 'music',
    '哲学': 'philosophy',
    '科学': 'science',
    '物理': 'science',
    '心理': 'philosophy',
  };
  
  let category: 'literature' | 'art' | 'music' | 'philosophy' | 'science' = 'literature';
  for (const [key, value] of Object.entries(categoryMap)) {
    if (entry.title.includes(key) || entry.description.includes(key)) {
      category = value;
      break;
    }
  }
  
  const authorNames = [
    '本报特约撰稿人',
    '文化评论员',
    '资深记者',
    '学术通讯员',
    '艺术评论家',
  ];
  
  return {
    id: `column-${entry.year}-${entry.title}`,
    title: entry.title,
    author: personName || authorNames[Math.floor(Math.random() * authorNames.length)],
    content: entry.description,
    category,
  };
}

function generateNewsFlash(entry: TimelineEntry, newspaperMonth: number, newspaperYear: number): NewsFlash {
  const categories: Array<'politics' | 'economy' | 'culture' | 'international'> = 
    ['politics', 'economy', 'culture', 'international'];
  
  let month: number;
  if (entry.year < newspaperYear) {
    month = Math.floor(Math.random() * 12) + 1;
  } else {
    month = Math.floor(Math.random() * newspaperMonth) + 1;
  }
  
  return {
    id: `flash-${entry.year}-${entry.title}`,
    date: `${entry.year}年${month}月`,
    content: entry.title,
    category: categories[Math.floor(Math.random() * categories.length)],
  };
}

function generateAdvertisements(era: WarEra): string[] {
  const adsByEra: Record<WarEra, string[]> = {
    'pre-war': [
      '维也纳咖啡馆——品味欧洲最纯正的咖啡香气',
      '莱卡相机——记录时代每一个珍贵瞬间',
      '施坦威钢琴——音乐家的首选',
      '东方快车——横跨欧洲的奢华之旅',
      '蒂芙尼珠宝——永恒璀璨的选择',
      '百达翡丽——时间的艺术',
    ],
    'war': [
      '爱国公债——为祖国贡献一份力量',
      '战争储蓄券——支援前线，保卫家园',
      '战地邮政——将思念送往前线',
      '红十字会——救助伤员，传递温暖',
      '防毒面具——保护您和家人的安全',
    ],
    'interwar': [
      '爵士唱片——感受新时代的节奏',
      '无线电收音机——聆听世界的声音',
      '福特汽车——让每个家庭都拥有一辆车',
      '香奈儿五号——诠释现代女性之美',
      '好莱坞电影——梦幻工厂的魅力',
      '旅行套餐——重游欧洲，感受和平的珍贵',
    ],
    'wwii': [
      '民防指南——保护家人，共渡时艰',
      '定量供应——节约物资，支援抗战',
      '战时菜园——自己动手，丰衣足食',
      '盟军广播——了解真实战况',
      '胜利债券——为自由而投资',
    ],
  };
  
  return adsByEra[era].slice(0, 3);
}

function generateDateLine(year: number, era: WarEra, month: number, day: number): string {
  const newspapers = NEWSPAPER_NAMES[era];
  const newspaper = newspapers[Math.floor(Math.random() * newspapers.length)];
  const cities = ['维也纳', '柏林', '巴黎', '伦敦', '苏黎世', '布拉格'];
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  return `${newspaper} · ${city} · ${year}年${month}月${day}日 · 第${Math.floor(Math.random() * 10000) + 1000}期`;
}

function generateWeather(era: WarEra): string {
  const weathers = WEATHER_BY_ERA[era];
  return weathers[Math.floor(Math.random() * weathers.length)];
}

function getChapterForYear(year: number) {
  return chapters.find(ch => ch.yearStart <= year && ch.yearEnd > year) || chapters[0];
}

export function getAvailableYears(): number[] {
  const allEntries = getAllTimelineEntries();
  const years = new Set(allEntries.map(e => e.year));
  return Array.from(years).sort((a, b) => a - b);
}

export function generateNewspaper(year: number): Newspaper {
  const era = getWarEra(year);
  const chapter = getChapterForYear(year);
  const entries = getEntriesForYear(year);
  const yearEvents = getEventsForYear(year);
  const activePersons = getPersonsActiveInYear(year);
  
  const newspaperMonth = Math.floor(Math.random() * 12) + 1;
  const newspaperDay = Math.floor(Math.random() * 28) + 1;
  
  const allHeadlines: NewspaperHeadline[] = [];
  
  entries.historical.forEach(e => allHeadlines.push(generateHeadline(e, 'historical')));
  entries.cultural.forEach(e => allHeadlines.push(generateHeadline(e, 'culture')));
  entries.personal.slice(0, 2).forEach(e => allHeadlines.push(generateHeadline(e, 'society')));
  
  yearEvents.forEach(event => {
    allHeadlines.push({
      id: `event-${event.id}`,
      title: event.title,
      subtitle: '重大历史事件',
      content: event.description,
      category: 'historical',
      location: event.location,
      quote: event.quote,
      imageUrl: event.imageUrl,
    });
  });
  
  const columns: NewspaperColumn[] = [];
  entries.cultural.slice(0, 3).forEach(entry => {
    const relatedPerson = activePersons.find(p => 
      entry.description.includes(p.name) || entry.title.includes(p.name)
    );
    columns.push(generateColumn(entry, relatedPerson?.name || ''));
  });
  
  const newsFlashes: NewsFlash[] = [];
  const allEntriesForEra = getAllTimelineEntries().filter(e => {
    const eEra = getWarEra(e.year);
    return eEra === era && e.year <= year;
  });
  
  const recentEntries = allEntriesForEra
    .sort((a, b) => b.year - a.year)
    .slice(0, 6);
  
  recentEntries.forEach(entry => {
    newsFlashes.push(generateNewsFlash(entry, newspaperMonth, year));
  });
  
  const mainHeadline = allHeadlines[0] || {
    id: 'default',
    title: '今日无重大新闻',
    subtitle: '和平年代的日常',
    content: '今日世界平静，人们享受着和平的生活。',
    category: 'society' as const,
  };
  
  return {
    year,
    era,
    chapterTitle: chapter.title,
    dateLine: generateDateLine(year, era, newspaperMonth, newspaperDay),
    weather: generateWeather(era),
    frontPage: {
      mainHeadline,
      secondaryHeadlines: allHeadlines.slice(1, 4),
    },
    columns,
    newsFlashes,
    advertisements: generateAdvertisements(era),
  };
}
