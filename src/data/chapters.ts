import { Chapter } from '@/types';

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: '第一乐章',
    era: '十九世纪末',
    yearStart: 1881,
    yearEnd: 1900,
    description:
      '茨威格出生并成长于维也纳的犹太富商家庭，在那个"太平的黄金时代"，欧洲享受着前所未有的和平与繁荣。维也纳作为奥匈帝国的首都，是文化艺术的中心。',
    quote:
      '"我们那个时代的年轻人，谁不觉得自己是在一个坚不可摧的世界里成长起来的。"',
  },
  {
    id: 'chapter-2',
    title: '二十世纪初',
    era: '世纪之交',
    yearStart: 1900,
    yearEnd: 1914,
    description:
      '青年茨威格在维也纳和柏林求学，开始文学创作，游历欧洲各地，结识了众多文化名人。这是欧洲文化的鼎盛时期，也是"昨日的世界"最灿烂的黄昏。',
    quote: '"那是一个美好的时代，每个人都相信进步，相信未来。"',
  },
  {
    id: 'chapter-3',
    title: '一战风云',
    era: '第一次世界大战',
    yearStart: 1914,
    yearEnd: 1918,
    description:
      '第一次世界大战爆发，昔日的和平世界轰然倒塌。茨威格亲历战争后方经历了战争的残酷，开始反思民族主义的狂热，他的反战立场使他成为欧洲精神上的流亡者。',
    quote: '"一九一四年的战争，把我们从睡梦中惊醒。"',
  },
  {
    id: 'chapter-4',
    title: '重返和平',
    era: '两次大战之间',
    yearStart: 1918,
    yearEnd: 1933,
    description:
      '战后茨威格在萨尔茨堡定居，创作进入黄金时期，作品享誉世界。然而在短暂的和平中，他看到了新的危险正在逼近。',
    quote: '"我们曾经以为，战争结束后世界会变得更好。"',
  },
  {
    id: 'chapter-5',
    title: '黑暗降临',
    era: '纳粹上台与流亡',
    yearStart: 1933,
    yearEnd: 1939,
    description:
      '希特勒上台，茨威格的作品被焚毁，他被迫离开奥地利，开始流亡生涯。从英国、美国、巴西，他一步步远离故乡，也远离那个他深爱的欧洲。',
    quote: '"我知道，在我身后，那个世界已经永远消失了。"',
  },
  {
    id: 'chapter-6',
    title: '昨日终结',
    era: '二战与告别',
    yearStart: 1939,
    yearEnd: 1942,
    description:
      '第二次世界大战爆发，欧洲陷入黑暗深渊。茨威格在巴西完成了《昨日的世界》，这是他对那个消逝的欧洲的最后挽歌，也是自己生命的绝唱。',
    quote: '"我完全可以说，我为这个时代而生，也为这个时代而死。"',
  },
];

export const getChapterById = (id: string): Chapter | undefined => {
  return chapters.find((chapter) => chapter.id === id);
};
