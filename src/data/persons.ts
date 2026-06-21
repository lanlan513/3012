import { Person } from '@/types';

export const persons: Person[] = [
  {
    id: 'person-zweig',
    name: '斯蒂芬·茨威格',
    birthYear: 1881,
    deathYear: 1942,
    occupation: '作家、传记文学家',
    description:
      '奥地利著名作家、诗人、剧作家和传记作家，以细腻的心理描写和对人性的深刻洞察著称。代表作有《一个陌生女人的来信》《象棋的故事》《人类群星闪耀时》等。晚年因不堪纳粹迫害流亡巴西，留下《昨日的世界》作为对那个逝去时代的深情挽歌。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Stefan%20Zweig%20Austrian%20writer%20vintage%20sepia%20style%20elegant%2019th%20century&image_size=square_hd',
    quote: '"我知道，只有那些亲身经历过那个自由世界的人，才会有我这样的感受：我们是在最好的时代里长大的。"',
    chapterIds: ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6'],
  },
  {
    id: 'person-freud',
    name: '西格蒙德·弗洛伊德',
    birthYear: 1856,
    deathYear: 1939,
    occupation: '心理学家、精神分析创始人',
    description:
      '奥地利心理学家，精神分析学派的创始人。他的潜意识理论对二十世纪的文学艺术产生了深远影响，茨威格在维也纳时期与他有交往，其作品也深受心理学影响。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Sigmund%20Freud%20vintage%20sepia%20photograph%20bearded%20man%20serious%20expression&image_size=square_hd',
    quote: '"梦是通往潜意识的康庄大道。"',
    chapterIds: ['chapter-1', 'chapter-2', 'chapter-4'],
  },
  {
    id: 'person-mahler',
    name: '古斯塔夫·马勒',
    birthYear: 1860,
    deathYear: 1911,
    occupation: '作曲家、指挥家',
    description:
      '奥地利作曲家、指挥家，晚期浪漫主义音乐代表人物。曾任维也纳宫廷歌剧院指挥，是维也纳文化黄金时代的重要人物。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Gustav%20Mahler%20composer%20vintage%20sepia%20photograph%20bearded%20musician&image_size=square_hd',
    quote: '"对我来说，交响乐就是整个世界。"',
    chapterIds: ['chapter-1', 'chapter-2'],
  },
  {
    id: 'person-rolland',
    name: '罗曼·罗兰',
    birthYear: 1866,
    deathYear: 1944,
    occupation: '作家、诺贝尔文学奖得主',
    description:
      '法国作家，1915年诺贝尔文学奖获得者。代表作《约翰·克利斯朵夫》。茨威格的好友，两人在一战期间共同呼吁和平，反对战争。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Romain%20Rolland%20French%20writer%20vintage%20sepia%20photograph%20intellectual&image_size=square_hd',
    quote: '"世界上只有一种英雄主义，就是看清生活的真相之后依然热爱生活。"',
    chapterIds: ['chapter-2', 'chapter-3', 'chapter-4'],
  },
  {
    id: 'person-verlaine',
    name: '保罗·魏尔伦',
    birthYear: 1844,
    deathYear: 1896,
    occupation: '诗人',
    description:
      '法国象征主义诗人，对青年茨威格产生了深远影响。茨威格在书中回忆了自己年轻时对法国诗歌的热爱与模仿。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Paul%20Verlaine%20French%20poet%20vintage%20sepia%20photograph%20symbolist&image_size=square_hd',
    quote: '"音乐先于一切，为此选择不对称。"',
    chapterIds: ['chapter-1', 'chapter-2'],
  },
  {
    id: 'person-nietzsche',
    name: '弗里德里希·尼采',
    birthYear: 1844,
    deathYear: 1900,
    occupation: '哲学家',
    description:
      '德国哲学家，对二十世纪思想文化影响深远。茨威格在书中提到尼采对那一代年轻人的震撼性影响。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Friedrich%20Nietzsche%20philosopher%20vintage%20sepia%20photograph%20mustache&image_size=square_hd',
    quote: '"那些杀不死我的，终将使我更强大。"',
    chapterIds: ['chapter-1', 'chapter-2'],
  },
  {
    id: 'person-josephine',
    name: '约瑟芬·贝克',
    birthYear: 1906,
    deathYear: 1975,
    occupation: '舞者、演员',
    description:
      '美国黑人舞蹈家、歌手，1920年代在巴黎走红，成为欧洲舞台上的传奇。她代表了两次大战之间欧洲的繁华与多元文化。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Josephine%20Baker%20dancer%20vintage%20sepia%20photograph%201920s%20elegant&image_size=square_hd',
    quote: '"我不是在表演，我是在活着。"',
    chapterIds: ['chapter-4'],
  },
  {
    id: 'person-kafka',
    name: '弗朗茨·卡夫卡',
    birthYear: 1883,
    deathYear: 1924,
    occupation: '作家',
    description:
      '奥匈帝国犹太裔作家，现代派文学奠基人。与茨威格同为布拉格德语圈作家，以荒诞与异化的主题预示了那个时代的精神危机。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20Franz%20Kafka%20writer%20vintage%20sepia%20photograph%20thin%20man%20suit&image_size=square_hd',
    quote: '"一本书必须是一把能劈开我们心中冰封大海的斧子。"',
    chapterIds: ['chapter-2', 'chapter-3', 'chapter-4'],
  },
];

export const getPersonById = (id: string): Person | undefined => {
  return persons.find((person) => person.id === id);
};

export const getPersonsByChapterId = (chapterId: string): Person[] => {
  return persons.filter((person) => person.chapterIds.includes(chapterId));
};
