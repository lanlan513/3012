import { Place, CulturalConnection } from '@/types';

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
    coordinates: { lat: 48.2082, lng: 16.3738, x: 680, y: 280 },
    eraContexts: [
      {
        era: '十九世纪末',
        chapterId: 'chapter-1',
        yearRange: '1881-1900',
        culture: '奥匈帝国鼎盛时期的多元文化之都，德语、捷克语、匈牙利语、意大利语在此交汇。犹太知识分子阶层成为文化创造力的核心，茨威格家族正是其中的代表。咖啡馆文化成为思想交流的公共空间。',
        art: '克里姆特与维也纳分离派掀起新艺术运动的革命，金色的《吻》成为时代标志。古斯塔夫·马勒执掌维也纳歌剧院，将音乐推向新高度。弗洛伊德在维也纳大学发展精神分析学，从根本上改变了人类对自我的认知。',
        society: '太平盛世的黄金时代，资产阶级相信进步与理性。教育普及，剧院、博物馆、音乐厅向公众开放。然而，帝国的多民族矛盾已在表面下涌动，反犹主义的暗流开始涌动。',
        notableFigures: ['西格蒙德·弗洛伊德', '古斯塔夫·克里姆特', '古斯塔夫·马勒', '西奥多·赫茨尔'],
      },
      {
        era: '世纪之交',
        chapterId: 'chapter-2',
        yearRange: '1900-1914',
        culture: '现代主义思潮的爆发点。阿道夫·卢斯的建筑宣言《装饰与罪恶》预示着新时代的来临。维也纳作为音乐之都的地位无人撼动，勋伯格正在探索无调性音乐。',
        art: '埃贡·席勒以扭曲的线条描绘人性的挣扎，奥斯卡·科柯施卡的表现主义撼动了传统美学。文学上，霍夫曼斯塔尔与施尼茨勒深入探索现代人的焦虑与欲望。',
        society: '青年茨威格在此求学、开始文学创作。咖啡馆中聚集着欧洲各地的流亡者与理想主义者。弗朗茨·约瑟夫皇帝年迈，帝国虽仍繁荣，但社会矛盾日益尖锐，泛日耳曼主义与斯拉夫民族主义同时崛起。',
        notableFigures: ['埃贡·席勒', '阿诺德·勋伯格', '阿图尔·施尼茨勒', '胡戈·冯·霍夫曼斯塔尔'],
      },
      {
        era: '一战风云',
        chapterId: 'chapter-3',
        yearRange: '1914-1918',
        culture: '战争突然降临，文化生活陷入停顿。剧院关闭，书籍审查严苛。茨威格在战争后方亲历了狂热的民族主义如何撕裂昔日的欧洲精神共同体。',
        art: '战时艺术转向描绘苦难与荒诞。科柯施卡奔赴前线，他的画从此带上挥之不去的创伤印记。文学创作在审查的夹缝中艰难生存，反战声音被严厉压制。',
        society: '食物短缺、通货膨胀、讣告栏每天变长。曾经繁荣的帝国在战争的重压下分崩离析。1918年，随着哈布斯堡王朝的崩塌，维也纳从一个5000万人口帝国的首都，骤缩为一个600万人小国的城市。',
      },
      {
        era: '两次大战之间',
        chapterId: 'chapter-4',
        yearRange: '1918-1933',
        culture: '"红色维也纳"时期，社会民主党执政，推行激进的社会改革，建造了大批工人住宅。城市成为欧洲社会主义实验的橱窗，但也陷入左右翼的激烈对抗。',
        art: '虽然经济困难，维也纳仍保持着文化中心的地位。弗洛伊德继续写作，勋伯格在此任教，年轻的难民艺术家从东欧涌入。但与二十年代柏林的喧嚣相比，维也纳的空气中弥漫着怀旧与忧伤。',
        society: '茨威格在近郊的卡普岑山有一所住宅，但他更多时间在萨尔茨堡度过。德奥合并的呼声在右翼中越来越强。1933年希特勒上台后，奥地利的政治空气迅速恶化，犹太知识分子开始感到不安。',
      },
    ],
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
    coordinates: { lat: 48.8566, lng: 2.3522, x: 380, y: 310 },
    eraContexts: [
      {
        era: '十九世纪末',
        chapterId: 'chapter-1',
        yearRange: '1881-1900',
        culture: '美好年代（Belle Époque）的巅峰。巴黎作为世界文化之都，举办了1889年和1900年两届世博会，埃菲尔铁塔成为现代精神的象征。德雷福斯事件震撼法国社会，知识分子挺身而出捍卫正义。',
        art: '印象派已进入博物馆，后印象派的塞尚、梵高、高更正在为现代艺术开辟道路。罗丹的雕塑震撼世界，德彪西的印象派音乐开创了听觉的新天地。',
        society: '第三共和国的稳定时期，经济繁荣，殖民地扩张。巴黎的林荫大道、百货公司、地铁系统塑造了现代都市生活。但阶级分化严重，工人运动此起彼伏。',
        notableFigures: ['克劳德·莫奈', '奥古斯特·罗丹', '克洛德·德彪西', '埃米尔·左拉'],
      },
      {
        era: '世纪之交',
        chapterId: 'chapter-2',
        yearRange: '1900-1914',
        culture: '毕加索、布拉克在蒙马特高地开创立体主义，彻底颠覆了传统绘画。阿波利奈尔的诗歌与艺术评论成为现代主义的宣言。俄罗斯芭蕾舞团的演出在巴黎引发狂热。',
        art: '野兽派、立体主义、未来主义轮番登场，每年的秋季沙龙都是艺术革命的战场。普鲁斯特在病榻上开始书写《追忆似水年华》，用文字重建消逝的时间。',
        society: '青年茨威格流连于塞纳河畔的旧书摊、拉丁区的小酒馆，沉醉在这座城市自由的空气中。法德虽为宿敌，但两国知识分子的交流从未中断。',
        notableFigures: ['巴勃罗·毕加索', '马塞尔·普鲁斯特', '纪尧姆·阿波利奈尔', '亨利·马蒂斯'],
      },
      {
        era: '两次大战之间',
        chapterId: 'chapter-4',
        yearRange: '1918-1933',
        culture: '疯狂年代（Années folles）。战后巴黎成为欧洲艺术与夜生活的中心，爵士俱乐部、卡巴莱歌舞、超现实主义运动让这座城市彻夜不眠。美国"迷惘的一代"作家们在此聚集。',
        art: '超现实主义宣告诞生，达利的超现实梦境、马格利特的哲学图像震惊世界。海明威、菲茨杰拉德、乔伊斯等流亡作家在此完成他们最重要的作品。',
        society: '和平恢复，但战争的创伤仍在。德国流亡者开始涌入巴黎。茨威格在这里会见了罗曼·罗兰，两人结为挚友，共同倡导欧洲精神与和平主义。',
        notableFigures: ['欧内斯特·海明威', '萨尔瓦多·达利', '詹姆斯·乔伊斯', '安德烈·布勒东'],
      },
    ],
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
    coordinates: { lat: 52.5200, lng: 13.4050, x: 580, y: 200 },
    eraContexts: [
      {
        era: '世纪之交',
        chapterId: 'chapter-2',
        yearRange: '1900-1914',
        culture: '德意志帝国的首都，威廉皇帝主义的中心。普鲁士传统与工业现代性在此碰撞，成为欧洲最具活力的大都市之一。大学是学术自由的堡垒。',
        art: '桥社（Die Brücke）的表现主义画家在柏林与德累斯顿活动。托马斯·曼在此发表《布登勃洛克一家》。理查·施特劳斯的歌剧《莎乐美》引发巨大争议。',
        society: '茨威格在柏林大学求学，与未来主义者、表现主义者交往。这座城市没有维也纳的优雅，却有一种生猛的能量。工人运动声势浩大，社会民主党是帝国议会第一大党。',
        notableFigures: ['托马斯·曼', '瓦西里·康定斯基', '马克斯·韦伯', '理查德·施特劳斯'],
      },
      {
        era: '两次大战之间',
        chapterId: 'chapter-4',
        yearRange: '1918-1933',
        culture: '黄金二十年代的柏林——魏玛文化的最高峰。鲍豪斯的现代设计革命正在进行，布莱希特与魏尔的《三毛钱歌剧》在剧院里引发风暴，电影院里放映着表现主义的默片杰作。',
        art: '乔治·格罗茨的社会讽刺画无情地揭露魏玛共和国的阴暗面。托马斯·曼在此完成《魔山》。流亡的俄国作曲家斯特拉文斯基在此居住，与保罗·欣德米特等年轻音乐家交往。',
        society: '通货膨胀与政治刺杀并存。1923年通胀达到顶峰时，1美元兑换4.2万亿马克。但"道威斯计划"后短暂复苏，柏林的夜生活、爵士乐、卡巴莱歌舞闻名全欧。1929年大萧条后，纳粹党徒开始冲击犹太人的商店与住宅。',
        notableFigures: ['贝托尔特·布莱希特', '库尔特·魏尔', '瓦尔特·格罗皮乌斯', '托马斯·曼'],
      },
      {
        era: '纳粹上台与流亡',
        chapterId: 'chapter-5',
        yearRange: '1933-1939',
        culture: '1933年5月10日，柏林大学门前的广场上，纳粹学生焚毁了数千本"非德意志"书籍，其中包括茨威格、弗洛伊德、卡夫卡、海涅的作品。文化被强行"雅利安化"。',
        art: '所有现代艺术被冠以"颓废艺术"之名禁止展出。画家们或流亡、或禁止创作、或自杀。格罗茨、霍克等艺术家连夜逃离德国。',
        society: '国会纵火案后，共产党人被大规模逮捕。恩斯特·台尔曼被捕并最终遇害。书店橱窗里茨威格的书一夜之间消失，取而代之的是希特勒的《我的奋斗》。曾经最自由的德国大学成为纳粹意识形态的传声筒。',
      },
    ],
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
    coordinates: { lat: 47.8095, lng: 13.0550, x: 610, y: 310 },
    eraContexts: [
      {
        era: '两次大战之间',
        chapterId: 'chapter-4',
        yearRange: '1918-1933',
        culture: '萨尔茨堡音乐节创立于1920年，由理查·施特劳斯、霍夫曼斯塔尔、马克斯·莱因哈特共同创办。每到夏天，欧洲最优秀的音乐家与戏剧家齐聚于此，这座小城暂时恢复了昔日欧洲文化中心的光彩。',
        art: '霍夫曼斯塔尔与理查·施特劳斯的合作在此进入全盛，《玫瑰骑士》等歌剧在音乐节首演。莱因哈特的露天戏剧演出在大教堂广场举行，观众超过万人。',
        society: '茨威格1919年在此购买别墅，度过了他人生中最宁静的创作时期，写下了《三大师》《与魔鬼作斗争》《人类群星闪耀时》等传世之作。他在这里会见了罗曼·罗兰、托马斯·曼、爱因斯坦等挚友。1933年后，流亡的德国艺术家开始涌入这座小城，空气中弥漫着不安。',
        notableFigures: ['理查德·施特劳斯', '马克斯·莱因哈特', '阿尔伯特·爱因斯坦', '胡戈·冯·霍夫曼斯塔尔'],
      },
    ],
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
    coordinates: { lat: 50.0755, lng: 14.4378, x: 590, y: 250 },
    eraContexts: [
      {
        era: '十九世纪末',
        chapterId: 'chapter-1',
        yearRange: '1881-1900',
        culture: '奥匈帝国波希米亚省的首府，德语、捷克语、意第绪语在此共存。捷克民族复兴运动蓬勃发展，扬·聂鲁达的小说唤起了民族意识。',
        art: '德沃夏克与斯美塔那将波希米亚的民间音乐传统升华至交响乐的高度，使布拉格成为欧洲音乐地图上不可忽视的节点。',
        society: '工业革命带来了繁荣，也带来了社会问题。犹太区在1893年被拆除改造，古老的隔都消失了，取而代之的是新艺术风格的公寓。年轻的卡夫卡就住在这座城市里，过着保险公司职员的白天与作家的夜晚。',
        notableFigures: ['安东尼·德沃夏克', '贝多伊齐·斯美塔那', '扬·聂鲁达'],
      },
      {
        era: '世纪之交',
        chapterId: 'chapter-2',
        yearRange: '1900-1914',
        culture: '弗朗茨·卡夫卡开始写作，他的荒诞感与存在主义焦虑正从这座城市的古老石缝中生长出来。他的大多数故事都以布拉格的街道与建筑为背景。',
        art: '捷克立体主义独具特色，建筑、家具、绘画中融入了棱角分明的几何形式，成为布拉格独特的视觉语言。',
        society: '多语言、多宗教的多元社会仍在运作，但捷克人与德国人的关系日趋紧张。茨威格多次访问这座城市，他被查理大桥的夜景、老城广场的天文钟所吸引。',
        notableFigures: ['弗朗茨·卡夫卡', '莱纳·玛利亚·里尔克', '卡雷尔·恰佩克'],
      },
      {
        era: '两次大战之间',
        chapterId: 'chapter-4',
        yearRange: '1918-1933',
        culture: '独立的捷克斯洛伐克共和国成立，布拉格成为首都。马萨里克总统推行民主制度，这里成为中欧最自由的国家之一。',
        art: '卡雷尔·恰佩克的科幻戏剧《罗素姆的万能机器人》创造了"Robot"这个词，传遍全球。布拉格德语文学继续繁荣，卡夫卡的遗作由马克斯·布罗德整理出版，开始获得世界声誉。',
        society: '民主制度运作良好，经济发展迅速。但苏台德地区的日耳曼少数民族问题成为隐患。希特勒上台后，捷克深感威胁，开始修筑边境防御工事。',
      },
    ],
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
    coordinates: { lat: 51.5074, lng: -0.1278, x: 270, y: 240 },
    eraContexts: [
      {
        era: '世纪之交',
        chapterId: 'chapter-2',
        yearRange: '1900-1914',
        culture: '爱德华时代的余晖。日不落帝国仍控制着世界四分之一的土地，伦敦是世界金融与贸易的中心。萧伯纳、威尔斯等费边社会主义者影响着社会思想。',
        art: '英国文学的白银时代，康拉德、哈代、吉卜林分别以海洋小说、乡村悲剧、帝国叙事占据文坛。后印象派画展在伦敦引发争议，英国现代艺术艰难起步。',
        society: '维多利亚时代的道德规范仍有约束力，但新思潮正在涌动。妇女参政运动日趋激烈。茨威格在此接触到英国政治生活的运作方式，对其冷静务实的作风印象深刻。',
        notableFigures: ['乔治·萧伯纳', '约瑟夫·康拉德', '赫伯特·乔治·威尔斯'],
      },
      {
        era: '纳粹上台与流亡',
        chapterId: 'chapter-5',
        yearRange: '1933-1939',
        culture: '希特勒上台后，伦敦成为德国流亡者最重要的落脚点之一。托马斯·曼、爱因斯坦、布莱希特都曾在此停留，然后前往美国。弗洛伊德1938年在纳粹入侵奥地利后逃到伦敦，在此度过了生命中最后一年。',
        art: '流亡艺术家在伦敦组织了大量展览、朗诵会、音乐会。彼得·布鲁克斯等年轻导演受到布莱希特史诗戏剧理论的影响。',
        society: '英国最初对纳粹采取绥靖政策，张伯伦的"我们时代的和平"曾让人们抱有幻想。但1938年慕尼黑协定后，越来越多的人意识到战争不可避免。茨威格1934年在伦敦定居，成为英国文化界欢迎的作家，1939年他最终离开英国前往美国。',
        notableFigures: ['托马斯·曼', '西格蒙德·弗洛伊德', '阿尔伯特·爱因斯坦'],
      },
    ],
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
    coordinates: { lat: 40.7128, lng: -74.0060, x: -380, y: 340 },
    eraContexts: [
      {
        era: '纳粹上台与流亡',
        chapterId: 'chapter-5',
        yearRange: '1933-1939',
        culture: '大萧条的阴影尚未完全散去，但纽约已成为欧洲流亡艺术家、科学家、作家的新家园。托马斯·曼在普林斯顿任教，爱因斯坦在普林斯顿高等研究院继续思考统一场论。',
        art: '欧洲超现实主义者们在纽约找到了新的舞台，达利在这里获得前所未有的商业成功。同时，抽象表现主义正在酝酿，美国即将从欧洲接过现代艺术中心的接力棒。',
        society: '罗斯福"新政"正在推行，美国逐渐走出经济危机。1939年二战爆发后，美国虽保持中立，但已开始秘密援助英国。茨威格1939年首次踏上美国土地，他对这个国家的效率与物质丰裕惊叹不已，却始终无法真正融入。',
        notableFigures: ['富兰克林·罗斯福', '托马斯·曼', '阿尔伯特·爱因斯坦'],
      },
      {
        era: '二战与告别',
        chapterId: 'chapter-6',
        yearRange: '1939-1942',
        culture: '美国参战前夕，知识分子圈内激烈辩论是否应该介入战争。欧洲流亡者们成为最坚定的反纳粹宣传者，托马斯·曼在美国之音广播中向德国同胞喊话。',
        art: '好莱坞成为反纳粹电影的大本营，卓别林的《大独裁者》于1940年上映。百老汇音乐剧进入黄金时代，提供了战时所需的娱乐与鼓舞。',
        society: '1941年珍珠港事件后美国正式参战。茨威格却已离开美国前往巴西。他无法适应纽约匆忙的节奏，感到自己是一个"多余的人"，同时也对远离正在受难的欧洲深感愧疚。',
      },
    ],
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
    coordinates: { lat: -22.9068, lng: -43.1729, x: -200, y: 780 },
    eraContexts: [
      {
        era: '纳粹上台与流亡',
        chapterId: 'chapter-5',
        yearRange: '1933-1939',
        culture: '瓦加斯总统时代的巴西正在快速现代化，欢迎欧洲移民带来的文化与技术。里约热内卢举办了1939年世界博览会，展示一个进步的新兴国家。',
        art: '巴西现代主义文学艺术蓬勃发展，欧洲超现实主义影响了当地画家。桑巴与波萨诺瓦的节奏开始在里约的街头回响。',
        society: '茨威格1936年首次访问巴西，深深被这里的自然之美与种族和谐所打动。他后来写下《巴西：未来之国》，将这片土地描绘为避免了欧洲民族主义悲剧的"新人类"的希望。',
      },
      {
        era: '二战与告别',
        chapterId: 'chapter-6',
        yearRange: '1939-1942',
        culture: '茨威格1940年定居里约近郊的佩特罗波利斯，在山中的小屋里夜以继日地写作《昨日的世界》。这是他对"那个消逝的欧洲"最后的致敬，也是一部悲伤的挽歌。',
        art: '尽管身处美丽的热带花园中，茨威格的创作却越来越沉郁。他无法排遣对欧洲的思念，以及对故土被纳粹蹂躏、亲友遭遇不测的焦虑。',
        society: '1942年2月22日，茨威格与妻子绿蒂在他们的寓所中双双自尽。他在遗书中写道："在我自己的语言所通行的世界对我来说业已沦亡和我精神上的故乡欧洲业已自我毁灭之后，我再也没有地方可以从头开始重建我的生活了。"第二天，里约万人空巷为他送葬，巴西以国葬礼遇送别这位伟大的奥地利作家。',
      },
    ],
  },
];

export const getPlaceById = (id: string): Place | undefined => {
  return places.find((place) => place.id === id);
};

export const getPlacesByChapterId = (chapterId: string): Place[] => {
  return places.filter((place) => place.chapterIds.includes(chapterId));
};

export const getEuropeanPlaces = (): Place[] => {
  const nonEuropeanIds = ['place-brooklyn', 'place-rio'];
  return places.filter((p) => !nonEuropeanIds.includes(p.id));
};

export const culturalConnections: CulturalConnection[] = [
  {
    id: 'conn-1',
    from: 'place-vienna',
    to: 'place-paris',
    type: 'musical',
    description: '维也纳古典主义音乐传统通过李斯特、古诺等作曲家影响巴黎；巴黎的印象派音乐又反过来影响马勒、勋伯格等维也纳音乐家。',
    era: '世纪之交',
    chapterIds: ['chapter-1', 'chapter-2'],
  },
  {
    id: 'conn-2',
    from: 'place-vienna',
    to: 'place-berlin',
    type: 'philosophical',
    description: '维也纳的逻辑实证主义哲学（维也纳学派）与柏林的启蒙理性传统相互呼应；弗洛伊德的精神分析学说从维也纳传到柏林后引发轩然大波。',
    era: '世纪之交',
    chapterIds: ['chapter-1', 'chapter-2'],
  },
  {
    id: 'conn-3',
    from: 'place-vienna',
    to: 'place-salzburg',
    type: 'musical',
    description: '莫扎特的音乐将两座城市永远联系在一起。萨尔茨堡音乐节上的演出与维也纳歌剧院形成奥地利音乐文化的双璧。',
    era: '两次大战之间',
    chapterIds: ['chapter-4'],
  },
  {
    id: 'conn-4',
    from: 'place-vienna',
    to: 'place-prague',
    type: 'literary',
    description: '卡夫卡与维也纳的里尔克、霍夫曼斯塔尔同属奥匈帝国的德语文学传统，彼此影响。布拉格立体主义也在维也纳艺术圈引发回响。',
    era: '世纪之交',
    chapterIds: ['chapter-1', 'chapter-2'],
  },
  {
    id: 'conn-5',
    from: 'place-paris',
    to: 'place-berlin',
    type: 'artistic',
    description: '立体主义与达达主义从巴黎传到柏林，催生了柏林达达——最激进、最政治化的达达分支，格罗茨、豪斯曼等人的作品震撼了战后欧洲。',
    era: '两次大战之间',
    chapterIds: ['chapter-4'],
  },
  {
    id: 'conn-6',
    from: 'place-paris',
    to: 'place-london',
    type: 'literary',
    description: '英国作家普鲁斯特的翻译工作让意识流文学在英语世界扎根；海明威等美国作家从巴黎流亡到伦敦，将现代主义文学传统传播到大西洋两岸。',
    era: '世纪之交 / 两次大战之间',
    chapterIds: ['chapter-2', 'chapter-4'],
  },
  {
    id: 'conn-7',
    from: 'place-berlin',
    to: 'place-london',
    type: 'historical',
    description: '1933年纳粹上台后，大批德国知识分子从柏林经荷兰、比利时逃往伦敦。托马斯·曼家族、布莱希特、弗洛伊德都走过这条流亡路线。',
    era: '纳粹上台与流亡',
    chapterIds: ['chapter-5'],
  },
  {
    id: 'conn-8',
    from: 'place-london',
    to: 'place-brooklyn',
    type: 'historical',
    description: '二战前夕，流亡者从伦敦跨越大西洋前往纽约。爱因斯坦、托马斯·曼等从英国启程，在新世界重建他们的精神家园。',
    era: '纳粹上台与流亡',
    chapterIds: ['chapter-5'],
  },
  {
    id: 'conn-9',
    from: 'place-brooklyn',
    to: 'place-rio',
    type: 'historical',
    description: '茨威格从纽约经布宜诺斯艾利斯抵达里约。这是他流亡之路的最后一段，也是生命之旅的终点。',
    era: '二战与告别',
    chapterIds: ['chapter-6'],
  },
  {
    id: 'conn-10',
    from: 'place-vienna',
    to: 'place-london',
    type: 'historical',
    description: '1934年维也纳政变后，茨威格离开奥地利，经萨尔茨堡、瑞士前往伦敦。弗洛伊德1938年也沿类似路线流亡到英国。',
    era: '纳粹上台与流亡',
    chapterIds: ['chapter-5'],
  },
  {
    id: 'conn-11',
    from: 'place-paris',
    to: 'place-prague',
    type: 'artistic',
    description: '毕加索的立体主义启发了捷克立体主义艺术家；布拉格作家们的作品也被翻译成法语，在巴黎受到欢迎。',
    era: '世纪之交',
    chapterIds: ['chapter-2'],
  },
  {
    id: 'conn-12',
    from: 'place-berlin',
    to: 'place-salzburg',
    type: 'musical',
    description: '欣德米特等魏玛共和国的年轻音乐家参加萨尔茨堡音乐节；布莱希特与魏尔的作品也在奥地利剧院上演。',
    era: '两次大战之间',
    chapterIds: ['chapter-4'],
  },
];

export const getConnectionsByPlaceId = (placeId: string): CulturalConnection[] => {
  return culturalConnections.filter(
    (c) => c.from === placeId || c.to === placeId
  );
};
