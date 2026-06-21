import { Place } from '@/types';

export const places: Place[] = [
  {
    id: 'place-vienna',
    name: '维也纳',
    country: '奥匈帝国 / 奥地利',
    description:
      '奥匈帝国的首都，茨威格的故乡。十九世纪末二十世纪初的维也纳是欧洲文化的中心之一，音乐、文学、哲学、心理学都在这里繁荣发展。环形大道两旁的宏伟建筑、咖啡馆里的知识分子、歌剧院中的悠扬音乐，构成了"昨日的世界"最动人的画卷。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Vienna%20Austria%2019th%20century%20historic%20architecture%20Ringstra%C3%9Fe%20sepia%20vintage%20style&image_size=square_hd',
    quote: '"维也纳，这座古老的首都，有着一种独特的安逸与从容，仿佛时间在这里放慢了脚步。"',
    chapterIds: ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4'],
  },
  {
    id: 'place-paris',
    name: '巴黎',
    country: '法国',
    description:
      '光明之城，艺术之都。青年茨威格多次游历巴黎，深深着迷于这座城市的文学气息与自由精神。从塞纳河畔的旧书摊到蒙马特高地的艺术家工作室，巴黎是那个时代所有年轻人心中的梦想之地。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Paris%20France%2019th%20century%20Eiffel%20Tower%20vintage%20sepia%20style%20Belle%20%C3%89poque&image_size=square_hd',
    quote: '"巴黎，这座永不疲倦的城市，每一条街道都流淌着艺术的血液。"',
    chapterIds: ['chapter-1', 'chapter-2', 'chapter-4'],
  },
  {
    id: 'place-berlin',
    name: '柏林',
    country: '德意志帝国 / 魏玛共和国',
    description:
      '德国的首都，茨威格曾在此求学。二十年代的柏林是欧洲最具活力的城市，也是最动荡的城市。歌舞升平的表象下，隐藏着深刻的社会危机，预示着日后的灾难。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Berlin%20Germany%201920s%20vintage%20sepia%20style%20historic%20buildings%20Weimar%20Republic&image_size=square_hd',
    quote: '"柏林，这座躁动不安的城市，在疯狂与绝望之间摇摆不定。"',
    chapterIds: ['chapter-2', 'chapter-4', 'chapter-5'],
  },
  {
    id: 'place-salzburg',
    name: '萨尔茨堡',
    country: '奥地利',
    description:
      '莫扎特的故乡，阿尔卑斯山脚下的美丽小城。战后茨威格在此定居，度过了他创作生涯中最宁静也最高产的岁月。站在他的书房里，可以俯瞰整座老城和远处的群山。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Salzburg%20Austria%20historic%20city%20Alps%20mountains%20vintage%20sepia%20style&image_size=square_hd',
    quote: '"在萨尔茨堡，时间仿佛静止了，每一个角落都弥漫着音乐的气息。"',
    chapterIds: ['chapter-4'],
  },
  {
    id: 'place-brooklyn',
    name: '纽约',
    country: '美国',
    description:
      '新世界的象征，流亡者的避风港。茨威格曾短暂旅居纽约，这里的喧嚣与活力让他既惊叹又疏离。摩天大楼、百老汇、中央公园，一切都是那么新鲜，却又与他记忆中的欧洲格格不入。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=New%20York%20City%201930s%20vintage%20sepia%20style%20skyscrapers%20Manhattan&image_size=square_hd',
    quote: '"纽约，这座垂直生长的城市，让所有来自旧世界的人都感到眩晕。"',
    chapterIds: ['chapter-5', 'chapter-6'],
  },
  {
    id: 'place-rio',
    name: '里约热内卢',
    country: '巴西',
    description:
      '茨威格生命最后的落脚点。这座充满阳光和热情的南美城市，与他魂牵梦萦的欧洲形成了鲜明对比。在这里，他完成了《昨日的世界》，也在这里选择了与世界告别。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rio%20de%20Janeiro%20Brazil%20vintage%20sepia%20style%20beach%20mountains%201940s&image_size=square_hd',
    quote: '"巴西，这片充满希望的土地，却让我更加思念那个消逝的欧洲。"',
    chapterIds: ['chapter-5', 'chapter-6'],
  },
  {
    id: 'place-prague',
    name: '布拉格',
    country: '奥匈帝国 / 捷克斯洛伐克',
    description:
      '波西米亚的明珠，卡夫卡的故乡。这座古老的城市有着独特的神秘氛围，茨威格在书中多次提及。金色的布拉格，是奥匈帝国多元文化的缩影。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Prague%20Czech%20vintage%20sepia%20style%20Charles%20Bridge%20castle%20historic&image_size=square_hd',
    quote: '"布拉格，这座金色的城市，每一块石头都在讲述着古老的故事。"',
    chapterIds: ['chapter-1', 'chapter-2', 'chapter-4'],
  },
  {
    id: 'place-london',
    name: '伦敦',
    country: '英国',
    description:
      '日不落帝国的首都。茨威格曾多次访问伦敦，这里的古老传统与现代活力并存。二战前夕，伦敦成为众多欧洲流亡者的聚集地。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=London%20England%20vintage%20sepia%20style%20Big%20Ben%20Thames%20historic&image_size=square_hd',
    quote: '"伦敦，这座浓雾中的城市，有着一种冷静而深沉的力量。"',
    chapterIds: ['chapter-2', 'chapter-5'],
  },
];

export const getPlaceById = (id: string): Place | undefined => {
  return places.find((place) => place.id === id);
};

export const getPlacesByChapterId = (chapterId: string): Place[] => {
  return places.filter((place) => place.chapterIds.includes(chapterId));
};
