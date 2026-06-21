import { Event } from '@/types';

export const events: Event[] = [
  {
    id: 'event-sarajevo',
    title: '萨拉热窝事件',
    date: '1914年6月28日',
    location: '萨拉热窝，波斯尼亚',
    description:
      '奥匈帝国皇储斐迪南大公在萨拉热窝遇刺身亡，成为第一次世界大战的导火索。这一事件彻底改变了欧洲的命运，也终结了茨威格笔下那个"太平的黄金时代"。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sarajevo%201914%20assassination%20archduke%20Franz%20Ferdinand%20vintage%20sepia%20style%20historic&image_size=square_hd',
    quote: '"那一天，一颗子弹不仅杀死了一位大公，也杀死了整整一个时代。"',
    chapterIds: ['chapter-3'],
    personIds: [],
  },
  {
    id: 'event-wwi',
    title: '第一次世界大战爆发',
    date: '1914年8月',
    location: '欧洲全境',
    description:
      '第一次世界大战全面爆发，欧洲各国卷入战争。昔日的和平世界轰然倒塌，民族主义的狂热席卷一切。茨威格在战争中保持着清醒的反战立场，成为精神上的流亡者。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=World%20War%20I%20trenches%20soldiers%20vintage%20sepia%20style%20historic%20warfare&image_size=square_hd',
    quote: '"一场战争把我们这一代人从和平的美梦中惊醒。"',
    chapterIds: ['chapter-3'],
    personIds: ['person-zweig', 'person-rolland'],
  },
  {
    id: 'event-versailles',
    title: '凡尔赛和约签署',
    date: '1919年6月28日',
    location: '凡尔赛宫，法国',
    description:
      '第一次世界大战结束，凡尔赛和约签署。奥匈帝国解体，欧洲版图重新划分。茨威格看到的不是和平，而是新的仇恨与不满的种子。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Palace%20of%20Versailles%20Treaty%20signing%201919%20vintage%20sepia%20style%20historic&image_size=square_hd',
    quote: '"和平来了，可我们都知道，这只是一场短暂的休战。"',
    chapterIds: ['chapter-3', 'chapter-4'],
    personIds: [],
  },
  {
    id: 'event-hitler',
    title: '希特勒上台',
    date: '1933年1月',
    location: '柏林，德国',
    description:
      '希特勒成为德国总理，纳粹党上台。这标志着欧洲黑暗时代的开始。茨威格的作品在德国被焚毁，他开始意识到灾难即将来临。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Nazi%20rally%201930s%20Germany%20vintage%20sepia%20style%20historic%20dark%20atmosphere&image_size=square_hd',
    quote: '"当纳粹的旗帜在德国升起时，我知道，那个我熟悉的欧洲已经死了。"',
    chapterIds: ['chapter-5'],
    personIds: ['person-freud'],
  },
  {
    id: 'event-anschluss',
    title: '德奥合并',
    date: '1938年3月',
    location: '维也纳，奥地利',
    description:
      '纳粹德国吞并奥地利，茨威格的故乡落入希特勒手中。他从此再也没有回到过维也纳。萨尔茨堡的家被抄没，他彻底成为了流亡者。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Anschluss%201938%20Vienna%20Nazi%20troops%20vintage%20sepia%20style%20historic%20Austria&image_size=square_hd',
    quote: '"当我得知维也纳沦陷的消息，我知道，我的过去已经被彻底抹去了。"',
    chapterIds: ['chapter-5'],
    personIds: ['person-zweig', 'person-freud'],
  },
  {
    id: 'event-wwii',
    title: '第二次世界大战爆发',
    date: '1939年9月1日',
    location: '波兰',
    description:
      '德国入侵波兰，第二次世界大战全面爆发。欧洲再次陷入战火，而这一次的灾难比上一次更加深重。茨威格在流亡中目睹着故国的毁灭。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=World%20War%20II%20invasion%20Poland%201939%20vintage%20sepia%20style%20tanks%20warfare&image_size=square_hd',
    quote: '"又一场战争开始了，而我已经失去了一切可以失去的东西。"',
    chapterIds: ['chapter-6'],
    personIds: ['person-zweig'],
  },
  {
    id: 'event-france-fall',
    title: '法国沦陷',
    date: '1940年6月',
    location: '巴黎，法国',
    description:
      '德军占领巴黎，法国投降。这对所有相信欧洲文明的人来说是毁灭性的打击。茨威格心中的"昨日的世界"至此彻底崩塌。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Paris%201940%20German%20occupation%20Eiffel%20Tower%20vintage%20sepia%20style%20historic&image_size=square_hd',
    quote: '"当巴黎沦陷的消息传来，我感到，整个欧洲文明都在我面前坍塌了。"',
    chapterIds: ['chapter-6'],
    personIds: ['person-rolland'],
  },
  {
    id: 'event-modern-olympics',
    title: '第一届现代奥运会',
    date: '1896年4月',
    location: '雅典，希腊',
    description:
      '第一届现代奥林匹克运动会在雅典举行，标志着国际和平与交流的新时代。在那个乐观的年代，人们相信体育可以促进世界和平与理解。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=first%20modern%20Olympic%20Games%20Athens%201896%20vintage%20sepia%20style%20historic%20sports&image_size=square_hd',
    quote: '"那是一个人们真诚地相信世界会越来越好的时代。"',
    chapterIds: ['chapter-1'],
    personIds: [],
  },
];

export const getEventById = (id: string): Event | undefined => {
  return events.find((event) => event.id === id);
};

export const getEventsByChapterId = (chapterId: string): Event[] => {
  return events.filter((event) => event.chapterIds.includes(chapterId));
};
