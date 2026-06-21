import { StreetScene } from '@/types';

export const SCENE_CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  street: { label: '繁华街道', icon: '🏛️' },
  station: { label: '中央车站', icon: '🚂' },
  theater: { label: '皇家剧院', icon: '🎭' },
  bookstore: { label: '古籍书店', icon: '📚' },
};

export const streetScenes: StreetScene[] = [
  {
    id: 'scene-vienna-street',
    name: '维也纳环形大道',
    category: 'street',
    era: '太平盛世',
    yearRange: '1890 — 1914',
    city: '维也纳',
    description:
      '奥匈帝国鼎盛时期的维也纳环形大道，两旁矗立着新文艺复兴风格的宏伟建筑。马车与有轨电车并行，绅士们头戴礼帽，女士们身着蓬裙，空气中弥漫着咖啡馆的香气与施特劳斯的华尔兹。',
    sceneImagePrompt: 'Vienna Ringstraße 1890s historic street scene horse carriages elegant buildings Belle Époque sepia vintage illustration style',
    overview:
      '1857年，弗朗茨·约瑟夫皇帝下令拆除维也纳旧城墙，修建了这条长达4公里的环形大道。大道两旁汇聚了维也纳最重要的公共建筑：歌剧院、市政厅、议会大厦、大学、自然史博物馆……每一座都是帝国荣耀的象征。',
    historicalBackground:
      '这是奥匈帝国最后的黄金岁月。弗朗茨·约瑟夫皇帝已在位四十余年，帝国疆域横跨中欧，人口超过五千万。维也纳作为帝国首都，人口突破两百万，是欧洲第四大城市。然而，表面的繁华之下，民族矛盾、阶级冲突、反犹主义的暗流正在涌动。茨威格正是在这样的氛围中长大，他后来在《昨日的世界》中深情地回忆了这个"安全的黄金时代"。',
    buildings: [
      {
        id: 'building-cafe-central',
        name: '中央咖啡馆',
        category: 'street',
        description:
          '维也纳最著名的咖啡馆，被誉为"世界文学之都"。在这里，一杯咖啡可以坐上一整天，侍者不会催你，报纸架上有欧洲各国的刊物，来自各地的知识分子在这里高谈阔论。',
        illustrationPrompt: 'Vienna Cafe Central interior 1900s Belle Époque coffee house intellectuals marble tables vintage illustration sepia',
        position: { x: 8, y: 15, width: 22, height: 40 },
        atmosphere: '大理石桌面上的咖啡杯冒着热气，角落里有人在奋笔疾书，钢琴师在弹奏着一首忧伤的华尔兹。',
        relatedPersonIds: ['person-zweig', 'person-freud', 'person-kafka', 'person-rilke'],
        history: [
          {
            year: '1876',
            title: '咖啡馆开业',
            description: '中央咖啡馆在维也纳内城正式开业，很快成为艺术家、作家和政治家的聚集地。',
          },
          {
            year: '1900',
            title: '文学沙龙鼎盛期',
            description: '每天下午，咖啡馆里座无虚席。阿图尔·施尼茨勒在角落里写剧本，年轻的茨威格和朋友们讨论法国诗歌，托洛茨基甚至在这里下过国际象棋。',
          },
          {
            year: '1914',
            title: '战争阴影',
            description: '一战爆发后，咖啡馆里的气氛骤然变化。曾经高谈阔论和平主义的人们陷入沉默，报纸头条每天都在宣告新的伤亡。',
          },
          {
            year: '1938',
            title: '德奥合并后',
            description: '纳粹吞并奥地利后，许多犹太常客被迫流亡。咖啡馆仍在营业，但空气中弥漫着一种说不出的忧伤。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-cafe-zweig',
            type: 'person',
            title: '年轻的茨威格',
            description: '角落里坐着一位戴着圆眼镜的年轻人，他正在笔记本上飞快地写着什么。桌上的咖啡已经凉了，他却浑然不觉。他的身旁摊开着一本魏尔伦的诗集。',
            targetId: 'person-zweig',
            quote: '"在维也纳的咖啡馆里，时间是流动的，但思想是永恒的。"',
            position: { x: 25, y: 55 },
          },
        ],
      },
      {
        id: 'building-state-opera',
        name: '维也纳国家歌剧院',
        category: 'street',
        description:
          '新文艺复兴风格的宏伟建筑，是维也纳音乐之都的象征。每晚这里上演着世界顶级的歌剧和芭蕾舞，观众身着华服，马车在门口排成长龙。',
        illustrationPrompt: 'Vienna State Opera building historic facade 1890s night evening gas lamps carriages elegant crowd sepia illustration',
        position: { x: 35, y: 10, width: 28, height: 45 },
        atmosphere: '夜幕降临，歌剧院门口的煤气灯一盏盏亮起，身着晚礼服的绅士淑女们拾级而上，马车载着更多观众从环形大道驶来。',
        relatedPersonIds: ['person-mahler', 'person-strauss', 'person-wagner'],
        history: [
          {
            year: '1869',
            title: '歌剧院落成',
            description: '维也纳宫廷歌剧院（后改名为国家歌剧院）正式落成，首演剧目是莫扎特的《唐璜》。',
          },
          {
            year: '1897',
            title: '马勒时代',
            description: '古斯塔夫·马勒被任命为歌剧院指挥，他对演出质量的严格要求使歌剧院达到了历史巅峰。十年间，他指挥了超过3000场演出。',
          },
          {
            year: '1907',
            title: '马勒离去',
            description: '马勒因反犹主义攻击和宫廷的压力被迫辞职，前往纽约大都会歌剧院。维也纳失去了一位伟大的音乐天才。',
          },
          {
            year: '1945',
            title: '战火焚毁',
            description: '二战中，歌剧院被盟军轰炸严重损毁，只剩下外墙屹立不倒。战后经过十年重建，于1955年重新开放。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-opera-mahler',
            type: 'person',
            title: '古斯塔夫·马勒',
            description: '后台的指挥室里，一位面容清癯的男子正全神贯注地审阅总谱。他的眉头紧锁，似乎对某个细节不满意。桌上放着一封来自纽约的邀请信。',
            targetId: 'person-mahler',
            quote: '"对我来说，交响乐就是整个世界。"',
            position: { x: 50, y: 35 },
          },
        ],
      },
      {
        id: 'building-hofburg',
        name: '霍夫堡皇宫',
        category: 'street',
        description:
          '哈布斯堡王朝的冬宫，弗朗茨·约瑟夫皇帝的居所。皇宫绵延数公里，拥有2600个房间，是欧洲最庞大的宫殿建筑群之一。',
        illustrationPrompt: 'Vienna Hofburg Imperial Palace historic exterior 1890s guards uniform horses imperial grandeur sepia illustration',
        position: { x: 68, y: 12, width: 24, height: 42 },
        atmosphere: '皇宫门口的卫兵身着传统制服，纹丝不动地站立着。偶尔有皇室马车从宫门驶出，引来路人驻足观望。',
        history: [
          {
            year: '1279',
            title: '始建',
            description: '霍夫堡始建于13世纪，此后每一代哈布斯堡统治者都对其进行扩建，形成了今天的规模。',
          },
          {
            year: '1848',
            title: '弗朗茨·约瑟夫登基',
            description: '18岁的弗朗茨·约瑟夫在此登基，开始了他长达68年的统治。他将成为奥匈帝国在位时间最长的君主。',
          },
          {
            year: '1898',
            title: '伊丽莎白皇后遇刺',
            description: '深受民众爱戴的茜茜公主在日内瓦遇刺身亡。皇帝在霍夫堡收到噩耗，从此陷入深深的忧郁。',
          },
          {
            year: '1914',
            title: '萨拉热窝事件',
            description: '皇储弗朗茨·斐迪南大公夫妇在萨拉热窝遇刺。皇帝在霍夫堡的书房里签署了对塞尔维亚的最后通牒，欧洲从此坠入深渊。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-hofburg-emperor',
            type: 'event',
            title: '皇帝的剪影',
            description: '皇宫楼上的一扇窗户里，可以看到一个孤独的老人身影。他就是弗朗茨·约瑟夫皇帝，正在批阅那永远也批阅不完的奏折。他今年已经84岁了。',
            position: { x: 80, y: 28 },
          },
        ],
      },
      {
        id: 'building-bookstore-ring',
        name: '环形大道旧书店',
        category: 'street',
        description:
          '一家典雅的旧书店，橱窗里陈列着烫金封面的精装本。推开门会响起清脆的铃铛声，空气中弥漫着旧纸张、皮革和墨水混合的独特香气。',
        illustrationPrompt: 'old antique bookstore Vienna 1900s interior leather books wooden shelves reading nook vintage sepia illustration',
        position: { x: 15, y: 60, width: 20, height: 32 },
        atmosphere: '书架从地板延伸到天花板，需要梯子才能够到最上层。角落里有一张旧沙发，常客可以在这里坐下翻阅心仪的书籍。',
        relatedPersonIds: ['person-zweig', 'person-verlaine', 'person-nietzsche', 'person-kafka'],
        history: [
          {
            year: '1872',
            title: '书店开业',
            description: '一位从波希米亚来的书商在此开设了这家旧书店，专门经营法语和德语文学作品。',
          },
          {
            year: '1895',
            title: '诗人的发现',
            description: '14岁的茨威格在这里第一次读到了魏尔伦、波德莱尔的诗集，从此他的人生轨迹被永远地改变了。',
          },
          {
            year: '1905',
            title: '禁书地下交易',
            description: '虽然帝国的审查制度相对宽松，但一些"伤风败俗"的书籍仍需在柜台下交易。尼采的某些著作、施尼茨勒的小说就在此列。',
          },
          {
            year: '1938',
            title: '最后的时光',
            description: '德奥合并后，书店的犹太裔店主被迫将店铺"雅利安化"，他本人后来死于集中营。',
          },
        ],
      },
      {
        id: 'building-newspaper-stand',
        name: '报刊亭',
        category: 'street',
        description:
          '街角的报刊亭，出售欧洲各国的报纸和杂志。《新自由报》《法兰克福报》《泰晤士报》……在这里，你可以了解整个文明世界的动向。',
        illustrationPrompt: 'historic newspaper kiosk Vienna street corner 1900s vintage newspapers magazines crowd sepia illustration',
        position: { x: 45, y: 65, width: 14, height: 22 },
        atmosphere: '人们围在报刊亭前，争相阅读最新的报纸号外。一位绅士买了一份《新自由报》，匆匆赶往咖啡馆。',
        history: [
          {
            year: '1880',
            title: '报刊亭设立',
            description: '随着报业的繁荣，维也纳在街角设立了第一批现代化的报刊亭。',
          },
          {
            year: '1900',
            title: '自由媒体黄金时代',
            description: '维也纳拥有数十份日报，观点各异，从保守派到社会民主党，从犹太复国主义到泛日耳曼主义，应有尽有。',
          },
          {
            year: '1914',
            title: '战争号外',
            description: '7月28日，报刊亭贴出红色号外：奥匈帝国对塞尔维亚宣战。人群沉默地读着，有人欢呼，有人流泪。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-news-crowd',
            type: 'event',
            title: '读报的人群',
            description: '一群人围在报刊亭前，一位工人正在高声朗读报纸上的战事新闻。一个年轻人摇着头，转身走进了旁边的咖啡馆，他知道一切都不会再和从前一样了。',
            position: { x: 52, y: 78 },
          },
        ],
      },
      {
        id: 'building-university',
        name: '维也纳大学',
        category: 'street',
        description:
          '神圣罗马帝国时期便已成立的古老大学，是德语区最古老的大学之一。弗洛伊德曾在这里任教，无数杰出的思想从这里诞生。',
        illustrationPrompt: 'University of Vienna historic building exterior 1890s students professors scholars courtyard Renaissance style sepia illustration',
        position: { x: 72, y: 58, width: 20, height: 35 },
        atmosphere: '下课铃响，学生们从教学楼涌出，三三两两地讨论着课堂上的内容。一位蓄着大胡子的教授被几个学生围住，正在解答问题。',
        relatedPersonIds: ['person-freud', 'person-mahler', 'person-nietzsche'],
        history: [
          {
            year: '1365',
            title: '大学创立',
            description: '鲁道夫四世公爵创立维也纳大学，是神圣罗马帝国境内继布拉格大学和维也纳大学之后的第三所大学。',
          },
          {
            year: '1873',
            title: '弗洛伊德入学',
            description: '17岁的西格蒙德·弗洛伊德进入维也纳大学医学院学习，从此开启了一段改变人类认知的旅程。',
          },
          {
            year: '1899',
            title: '《梦的解析》',
            description: '弗洛伊德的划时代著作《梦的解析》出版。虽然销量惨淡，但它注定将颠覆人们对自身的认识。',
          },
          {
            year: '1938',
            title: '大学被"清洗"',
            description: '纳粹吞并奥地利后，维也纳大学的犹太教授被全部解雇。弗洛伊德也被迫流亡伦敦，大学失去了它最耀眼的明星。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-university-freud',
            type: 'person',
            title: '弗洛伊德教授',
            description: '在医学院的走廊里，一位戴着眼镜的教授正在和同事交谈。他的手势富有表现力，眼中闪烁着智慧的光芒。他刚刚完成了一例歇斯底里症的分析报告。',
            targetId: 'person-freud',
            quote: '"梦是通往潜意识的康庄大道。"',
            position: { x: 78, y: 72 },
          },
        ],
      },
    ],
    easterEggs: [
      {
        id: 'egg-street-carriage',
        type: 'event',
        title: '婚礼马车',
        description: '一辆装饰着白色鲜花的马车从街道上缓缓驶过，马车里坐着一对新婚夫妇。路人们纷纷驻足，向他们投去祝福的目光。',
        position: { x: 32, y: 82 },
      },
      {
        id: 'egg-street-street-musician',
        type: 'event',
        title: '街头小提琴手',
        description: '街角站着一位衣衫褴褛的小提琴手，正在演奏施特劳斯的《蓝色多瑙河》。琴声悠扬，路人纷纷停下脚步，往他面前的帽子里扔进几枚硬币。',
        position: { x: 58, y: 80 },
      },
    ],
  },
  {
    id: 'scene-vienna-station',
    name: '维也纳中央火车站',
    category: 'station',
    era: '世纪之交',
    yearRange: '1900 — 1914',
    city: '维也纳',
    description:
      '宏大的钢铁玻璃穹顶下，是帝国铁路系统的心脏。从这里，你可以乘火车前往布拉格、布达佩斯、威尼斯、巴黎……蒸汽机车鸣响汽笛，预示着旅程和远方。',
    sceneImagePrompt: 'Vienna Westbahnhof train station interior 1900s steam locomotives iron glass roof travelers crowd vintage sepia illustration',
    overview:
      '19世纪末，铁路已经彻底改变了欧洲的面貌。从维也纳出发，24小时内可以抵达欧洲任何一个首都。茨威格年轻时就热爱乘火车旅行，火车站对他而言是自由、远方和冒险的象征。',
    historicalBackground:
      '这是铁路的黄金时代。奥匈帝国拥有超过四万公里的铁路线，将多民族帝国的各个角落连接在一起。火车站不仅是交通枢纽，更是一个时代的精神象征：人们第一次可以如此便捷地移动，地理距离第一次被如此显著地压缩。然而，铁路也将在1914年把数百万年轻人送上前线。',
    buildings: [
      {
        id: 'building-main-hall',
        name: '中央大厅',
        category: 'station',
        description:
          '高耸的钢铁拱顶下，是繁忙的中央大厅。巨大的列车时刻表上，目的地用各种语言标注：布达佩斯、布拉格、的里雅斯特、慕尼黑、苏黎世……',
        illustrationPrompt: 'train station main hall 1900s iron glass roof grand arch pillars travelers luggage vintage sepia illustration',
        position: { x: 25, y: 10, width: 50, height: 50 },
        atmosphere: '蒸汽从管道中喷出，在灯光下形成缥缈的云雾。报童在叫卖最新的报纸，搬运工推着沉重的行李车，站长不时举起怀表查看时间。',
        history: [
          {
            year: '1873',
            title: '车站落成',
            description: '为迎接维也纳世界博览会，维也纳西火车站正式启用。它是当时欧洲最现代化的火车站之一。',
          },
          {
            year: '1895',
            title: '东方快车停靠',
            description: '从巴黎到伊斯坦布尔的东方快车在此停靠。乘坐这趟列车的有富豪、外交官、间谍，以及各色神秘人物。',
          },
          {
            year: '1914',
            title: '运兵专列',
            description: '战争爆发后，每天都有运兵专列从这里出发。站台上挤满了送行的亲友，有人欢呼，有人哭泣。',
          },
          {
            year: '1938',
            title: '流亡列车',
            description: '纳粹吞并奥地利后，无数犹太人从这里踏上流亡之路。车票极其难求，每一趟列车都挤得水泄不通。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-hall-zweig',
            type: 'person',
            title: '启程的茨威格',
            description: '一个年轻人站在三等车厢门口，手里攥着一张去柏林的车票。他的行李不多——一只旧皮箱，一叠稿纸，几本诗集。他即将开始他的第一次旅行。',
            targetId: 'person-zweig',
            quote: '"旅行意味着自由，意味着从熟悉的生活中暂时解脱。"',
            position: { x: 45, y: 38 },
          },
        ],
      },
      {
        id: 'building-first-class-lounge',
        name: '一等车厢候车室',
        category: 'station',
        description:
          '铺着丝绒地毯，墙上挂着镀金画框的油画，侍者端着香槟来回穿梭。帝国的贵族和资产阶级在这里等待列车，他们是这个时代的真正主人。',
        illustrationPrompt: 'luxury first class train station waiting room 1900s velvet armchairs chandeliers elegant passengers vintage sepia illustration',
        position: { x: 5, y: 12, width: 18, height: 35 },
        atmosphere: '一位戴着单片眼镜的男爵正在阅读《泰晤士报》，一位贵妇人在给巴黎的时装店写信。角落里，一位外交官正在低声打电话。',
        history: [
          {
            year: '1873',
            title: '设立',
            description: '一等车厢候车室向持有一等车票的旅客开放，提供免费茶水和报刊。',
          },
          {
            year: '1898',
            title: '皇室光临',
            description: '伊丽莎白皇后（茜茜公主）曾在这里候车，她喜欢乘坐火车前往匈牙利的行宫。',
          },
          {
            year: '1918',
            title: '帝国落幕',
            description: '哈布斯堡王朝的最后一位皇帝卡尔一世，就是从这里踏上流亡之路的。他在候车室里签署了退位声明。',
          },
        ],
      },
      {
        id: 'building-platform',
        name: '蒸汽站台',
        category: 'station',
        description:
          '几列蒸汽机车停靠在站台旁，黑色的车身闪着金属光泽，巨大的驱动轮随时准备启程。列车员站在车厢门口，吹哨示意旅客登车。',
        illustrationPrompt: 'steam locomotive train platform 1900s passengers boarding conductor whistle vintage sepia illustration',
        position: { x: 8, y: 62, width: 84, height: 30 },
        atmosphere: '"呜——"一声悠长的汽笛划破空气。白色的蒸汽升腾而起，弥漫了整个站台。列车员的哨声响起，车门陆续关闭。',
        history: [
          {
            year: '1880',
            title: '蒸汽时代',
            description: '站台引入了最新的蒸汽加热系统，冬天候车不再寒冷。',
          },
          {
            year: '1905',
            title: '电力照明',
            description: '站台全面换装电灯照明，取代了原有的煤气灯，夜晚的车站如同白昼。',
          },
          {
            year: '1914',
            title: '战争开始',
            description: '1914年7月，第一批士兵就是从这个站台登上火车，开赴塞尔维亚前线。没人知道这场战争会持续多久。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-platform-soldier',
            type: 'event',
            title: '送别士兵',
            description: '站台上，一位年轻女子正在和身着军装的未婚夫告别。她强忍着泪水，把一束干花塞进他的口袋。"我会等你回来的，"她说。然而，他没有回来。',
            position: { x: 30, y: 78 },
          },
          {
            id: 'egg-platform-einstein',
            type: 'person',
            title: '思考的旅客',
            description: '一等车厢里，一位头发蓬乱的男士望着窗外飞逝的风景出神。他的手指在窗户上画着一些奇怪的符号，似乎在计算着什么。他正在思考一个关于光速的问题。',
            targetId: 'person-einstein',
            quote: '"想象力比知识更重要。"',
            position: { x: 68, y: 70 },
          },
        ],
      },
      {
        id: 'building-station-cafe',
        name: '车站餐厅',
        category: 'station',
        description:
          '大厅旁边的餐厅，提供热腾腾的维也纳炸牛排和浓郁的黑咖啡。很多旅客会在这里用餐，等待列车。墙上挂着帝国铁路网的地图。',
        illustrationPrompt: 'vienna train station restaurant 1900s interior dining tables waiters menu wood paneling vintage sepia illustration',
        position: { x: 78, y: 15, width: 18, height: 38 },
        atmosphere: '侍者端着托盘在餐桌间穿梭，叮当作响的餐具声和人们的交谈声交织在一起。厨房里飘出烤牛肉的香气。',
        history: [
          {
            year: '1875',
            title: '餐厅开业',
            description: '车站餐厅开业，以正宗的维也纳菜肴闻名。旅客临走前都要在这里吃上一顿。',
          },
          {
            year: '1910',
            title: '扩建',
            description: '餐厅扩建，增加了啤酒花园和露天座位。夏天，旅客可以在户外用餐。',
          },
          {
            year: '1916',
            title: '配给制',
            description: '战争进入第三个年头，食物开始短缺。餐厅实行配给制，菜单上的菜品越来越少。',
          },
        ],
      },
    ],
    easterEggs: [
      {
        id: 'egg-station-clock',
        type: 'event',
        title: '大钟指向10点',
        description: '大厅中央的大钟指针指向10点整。1914年6月28日上午10点，皇储斐迪南大公的专列准点驶入萨拉热窝车站。几个小时后，他遇刺身亡。',
        position: { x: 50, y: 22 },
      },
    ],
  },
  {
    id: 'scene-vienna-theater',
    name: '城堡剧院夜场',
    category: 'theater',
    era: '世纪之交',
    yearRange: '1905 — 1914',
    city: '维也纳',
    description:
      '夜幕降临，城堡剧院前的广场上人头攒动。今晚的剧目是霍夫曼斯塔尔的新作，由著名导演马克斯·莱因哈特执导。贵族、艺术家、记者齐聚一堂，这是维也纳文化生活的巅峰之夜。',
    sceneImagePrompt: 'Vienna Burgtheater night scene 1905 facade illuminated gas lamps theater goers horse carriages elegant crowd sepia illustration',
    overview:
      '城堡剧院是德语世界最负盛名的剧院之一。在这个时代，戏剧不仅仅是娱乐，更是知识分子讨论社会问题的公共空间。霍夫曼斯塔尔、施尼茨勒等人的剧本在此首演，每一次新剧上演都是文化界的盛事。',
    historicalBackground:
      '世纪之交的维也纳，戏剧是城市文化生活的核心。与巴黎和柏林不同，维也纳的戏剧传统更为典雅和精致。城堡剧院、人民剧院、河畔剧院——每个晚上都有数十部戏剧在上演。马克斯·莱因哈特正在以他革命性的导演理念改变着舞台艺术的面貌。',
    buildings: [
      {
        id: 'building-theater-facade',
        name: '剧院正立面',
        category: 'theater',
        description:
          '新文艺复兴风格的华丽立面，门廊上方矗立着阿波罗和九位缪斯女神的雕像。煤气灯照亮了整个广场，身着华服的观众正拾级而上。',
        illustrationPrompt: 'grand theater facade night 1900s neo renaissance style statues steps elegant crowd gas lamps vintage sepia illustration',
        position: { x: 20, y: 8, width: 60, height: 48 },
        atmosphere: '"大师来了！"人群中一阵低语。一位戴着黑色礼帽的男子走下马车，人们纷纷脱帽致意。那是今天的导演，马克斯·莱因哈特。',
        relatedPersonIds: ['person-hofmannsthal', 'person-schnitzler', 'person-zweig'],
        history: [
          {
            year: '1888',
            title: '剧院落成',
            description: '城堡剧院新楼在环城大道旁落成，取代了原来在霍夫堡宫内的旧剧院。它是当时欧洲最现代化的剧院之一。',
          },
          {
            year: '1899',
            title: '施尼茨勒首演',
            description: '阿图尔·施尼茨勒的《轮舞》在城郊的小剧院秘密演出，引发了巨大的争议，也让他声名鹊起。',
          },
          {
            year: '1903',
            title: '莱因哈特时代',
            description: '年仅30岁的马克斯·莱因哈特被任命为城堡剧院导演。他的导演手法大胆而创新，让古老的剧院焕发新生。',
          },
          {
            year: '1920',
            title: '萨尔茨堡音乐节',
            description: '莱因哈特与霍夫曼斯塔尔、理查·施特劳斯共同创办了萨尔茨堡音乐节。从此，维也纳和萨尔茨堡成为德语戏剧的双璧。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-theater-hofmannsthal',
            type: 'person',
            title: '霍夫曼斯塔尔',
            description: '后台入口处，一位风度翩翩的诗人正在和一位女演员交谈。他就是胡戈·冯·霍夫曼斯塔尔，维也纳的"神童"。他今天的新作即将首演，心中有些忐忑。',
            targetId: 'person-hofmannsthal',
            quote: '"深刻与轻浮并不矛盾。"',
            position: { x: 42, y: 28 },
          },
        ],
      },
      {
        id: 'building-lobby',
        name: '金色大厅休息廊',
        category: 'theater',
        description:
          '中场休息时，观众们涌入铺着红地毯的休息廊。水晶吊灯璀璨夺目，金箔装饰的墙面反射着柔和的光。人们一边啜饮香槟，一边议论上半场的演出。',
        illustrationPrompt: 'theater lobby intermission 1900s crystal chandeliers gold leaf audience champagne conversation vintage sepia illustration',
        position: { x: 8, y: 58, width: 40, height: 35 },
        atmosphere: '一位身着紫色晚礼服的女士正在和同伴激烈地讨论着女主角的演技。她就是著名的贝塔·冯·苏特纳夫人，诺贝尔和平奖得主。',
        history: [
          {
            year: '1888',
            title: '休息廊启用',
            description: '休息廊以奢华著称，水晶吊灯来自波希米亚，大理石来自意大利。',
          },
          {
            year: '1900',
            title: '世纪之交的沙龙',
            description: '休息廊不仅是休息的地方，更是维也纳的"第二客厅"。人们在这里交换政治八卦、文学评论和社会新闻。',
          },
          {
            year: '1914',
            title: '最后一场演出',
            description: '7月27日，城堡剧院上演了战前的最后一场演出。第二天，帝国对塞尔维亚宣战，剧院关闭。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-lobby-schnitzler',
            type: 'person',
            title: '施尼茨勒医生',
            description: '靠在大理石柱子旁的那位男士，他既是医生又是作家。白天给人看病，晚上写剧本。他的《轮舞》曾引发全欧洲的争议。今晚，他是观众席上的一员。',
            targetId: 'person-schnitzler',
            quote: '"我们的记忆是唯一不会失去的天堂。"',
            position: { x: 22, y: 72 },
          },
        ],
      },
      {
        id: 'building-auditorium',
        name: '观众席',
        category: 'theater',
        description:
          '五层包厢的观众席座无虚席，红色丝绒座椅如同一片波浪。正中央的皇家包厢里悬挂着哈布斯堡的旗帜，皇帝偶尔会驾临观看演出。',
        illustrationPrompt: 'theater auditorium interior 1900s red velvet five tiered boxes chandelier audience stage vintage sepia illustration',
        position: { x: 52, y: 58, width: 40, height: 35 },
        atmosphere: '大幕缓缓拉开，全场屏息。舞台上的烛光摇曳，把观众带入另一个世界。第一句台词响起，全场鸦雀无声。',
        history: [
          {
            year: '1888',
            title: '开幕演出',
            description: '开幕演出选择了席勒的《威廉·退尔》，全场起立高唱。',
          },
          {
            year: '1905',
            title: '电灯取代煤气灯',
            description: '观众席和舞台全面换装电气照明，不再需要担心煤气灯引发的火灾。',
          },
          {
            year: '1936',
            title: '最后一位犹太演员',
            description: '纳粹的压力下，剧院的犹太演员纷纷被解雇。最后一位犹太演员告别舞台时，观众起立鼓掌长达十分钟。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-audience-zweig',
            type: 'person',
            title: '年轻的剧评人',
            description: '三楼后排坐着一个戴眼镜的年轻人，他正在昏暗的灯光下飞快地做笔记。他是茨威格，正在为《新自由报》撰写剧评。这是他文学道路的起点。',
            targetId: 'person-zweig',
            position: { x: 72, y: 68 },
          },
        ],
      },
    ],
    easterEggs: [
      {
        id: 'egg-theater-program',
        type: 'event',
        title: '节目单上的名字',
        description: '节目单上印着今晚的剧目：《耶德曼》——霍夫曼斯塔尔与施特劳斯的合作作品。旁边还有一个广告：维也纳爱乐乐团，下周日金色大厅，马勒《第二交响曲》复活。',
        position: { x: 85, y: 40 },
      },
    ],
  },
  {
    id: 'scene-vienna-bookstore',
    name: '老城旧书店',
    category: 'bookstore',
    era: '世纪之交',
    yearRange: '1900 — 1910',
    city: '维也纳',
    description:
      '位于维也纳内城一条古老小巷中的旧书店，推开斑驳的木门，一阵旧纸张和皮革的香气扑面而来。书架从地板延伸到天花板，藏着无数被遗忘的珍本。',
    sceneImagePrompt: 'old antique bookstore interior Vienna 1900s wooden floor to ceiling shelves ladders rare books reading corner warm vintage sepia illustration',
    overview:
      '在那个书籍被视若珍宝的年代，旧书店是城市的精神宝库。茨威格年轻时就常常流连于这样的书店，在这里发现了魏尔伦、波德莱尔、尼采，也淘到了许多珍贵的初版本。旧书店老板是最懂书的人，他们的推荐往往能改变一位年轻人的阅读品味。',
    historicalBackground:
      '19世纪末20世纪初，维也纳的出版业极为繁荣。全城有超过两百家书店，其中数十家是旧书店。在这里，你可以找到中世纪的手抄本、文艺复兴时期的羊皮卷、18世纪的启蒙著作，当然还有最新出版的文学作品。旧书交易不只是商业，更是一门艺术、一种传承。',
    buildings: [
      {
        id: 'building-rare-book-room',
        name: '珍本室',
        category: 'bookstore',
        description:
          '位于书店二层的小房间，专门存放价值连城的珍本。门上挂着"非请莫入"的牌子，只有熟客和真正的藏书家才能进入。',
        illustrationPrompt: 'rare book room antique bookstore 1900s locked glass cabinets first editions leather bindings gloves curator vintage sepia illustration',
        position: { x: 5, y: 5, width: 35, height: 42 },
        atmosphere: '书店老板戴着白色手套，小心翼翼地从玻璃柜中取出一本1568年版的《愚人颂》。书口烫金，皮质封面泛着温润的光泽。',
        relatedPersonIds: ['person-zweig', 'person-verlaine', 'person-nietzsche'],
        history: [
          {
            year: '1860',
            title: '书店创立',
            description: '一位波希米亚来的老书商创办了这家店，最初只是街边的一个小摊位。',
          },
          {
            year: '1892',
            title: '珍本室开放',
            description: '经过三十年的经营，书店积累了足够的珍本，正式设立珍本室。',
          },
          {
            year: '1903',
            title: '茨威格的发现',
            description: '22岁的茨威格在这里淘到了一本魏尔伦亲笔签名的初版诗集，价格仅为5克朗。这是他珍本收藏生涯的起点。',
          },
          {
            year: '1938',
            title: '藏书被没收',
            description: '德奥合并后，书店老板的私人藏书被纳粹没收。据说整整装了27箱，运往帝国图书馆，从此下落不明。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-rare-zweig',
            type: 'person',
            title: '藏书家茨威格',
            description: '珍本室里，一个年轻人正俯身翻阅一本莫扎特的亲笔书信手稿。他的眼中闪烁着兴奋的光芒——这是他做梦都想得到的东西。他就是茨威格，当时还没有名气的年轻诗人。',
            targetId: 'person-zweig',
            quote: '"一本藏书是一个沉默的朋友，它从不背叛你。"',
            position: { x: 22, y: 25 },
          },
        ],
      },
      {
        id: 'building-main-shelves',
        name: '主书区',
        category: 'bookstore',
        description:
          '书店一层的主体，高大的橡木书架按类别排列：小说、诗歌、哲学、历史、艺术……需要梯子才能够到最上层的书。空气中弥漫着旧纸特有的香气。',
        illustrationPrompt: 'bookstore main shelves 1900s floor to ceiling oak books ladders rolling ladder readers browsing vintage sepia illustration',
        position: { x: 45, y: 8, width: 50, height: 45 },
        atmosphere: '一位大学生站在梯子上，翻阅着一本黑格尔的《精神现象学》，眉头紧锁。角落里，一位老者坐在破旧的扶手椅上，埋头于一本厚重的历史书。',
        history: [
          {
            year: '1885',
            title: '书架扩建',
            description: '为容纳不断增长的库存，书店扩建了书架，形成了今天的格局。',
          },
          {
            year: '1900',
            title: '法语文学专柜',
            description: '在茨威格等年轻作家的建议下，书店设立了法语文学专柜，引进波德莱尔、兰波、魏尔伦等人的作品。',
          },
          {
            year: '1914',
            title: '战争的影响',
            description: '战争爆发后，来自法国和英国的书籍断货。德语书籍占据了越来越多的空间。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-main-nietzsche',
            type: 'event',
            title: '查拉图斯特拉如是说',
            description: '哲学区前，一个高中生正在偷偷翻看尼采的《查拉图斯特拉如是说》。他的父母不让他读这种"危险的书"，但同龄人都在读。他翻到了那句著名的话："上帝死了。"',
            position: { x: 68, y: 30 },
          },
        ],
      },
      {
        id: 'building-reading-corner',
        name: '阅读角',
        category: 'bookstore',
        description:
          '书店深处一个僻静的角落，摆着一张旧皮沙发和两把扶手椅。常客可以在这里免费阅读选中的书，老板还会端上一杯热水。',
        illustrationPrompt: 'cozy reading corner old bookstore 1900s leather armchairs warm lamp books piled floor reader vintage sepia illustration',
        position: { x: 10, y: 52, width: 38, height: 40 },
        atmosphere: '落地灯的温暖灯光笼罩着这个小小的角落。一个年轻人蜷在沙发里，完全沉浸在手中的书中，完全忘记了时间。茶几上的热水早已凉透。',
        relatedPersonIds: ['person-kafka', 'person-rilke', 'person-zweig'],
        history: [
          {
            year: '1890',
            title: '阅读角设立',
            description: '老板应常客要求设立了阅读角，只放了两把椅子。没想到大受欢迎。',
          },
          {
            year: '1902',
            title: '卡夫卡的位置',
            description: '年轻的卡夫卡几乎每个周末都会来，坐同一个位置，读同样的书。他话很少，老板甚至怀疑他有语言障碍。',
          },
          {
            year: '1908',
            title: '里尔克的推荐',
            description: '诗人里尔克在这个角落向茨威格推荐了一位默默无闻的诗人的作品——那是他自己的第一本诗集。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-reading-kafka',
            type: 'person',
            title: '孤独的读者',
            description: '最里面的扶手椅上坐着一个瘦削的年轻人，他的表情既专注又恍惚。他正在读一本丹麦文的克尔凯郭尔，字典摊在旁边的小桌上。他是布拉格来的弗朗茨·卡夫卡。',
            targetId: 'person-kafka',
            quote: '"一本书必须是一把能劈开我们心中冰封大海的斧子。"',
            position: { x: 28, y: 72 },
          },
        ],
      },
      {
        id: 'building-shop-window',
        name: '橱窗展示',
        category: 'bookstore',
        description:
          '朝向街道的大橱窗，每月更换一次主题。这个月的主题是"新世纪的诗人"，陈列着里尔克、霍夫曼斯塔尔、特拉克尔等人的新作。',
        illustrationPrompt: 'antique bookstore shop window display 1900s art nouveau frame featured books posters vintage sepia illustration',
        position: { x: 54, y: 55, width: 40, height: 38 },
        atmosphere: '橱窗外的人行道上，几个行人驻足观看。一个少女用手指着一本封面设计精美的诗集，拉着母亲的衣角，眼神中充满渴望。',
        history: [
          {
            year: '1895',
            title: '新艺术橱窗',
            description: '请维也纳分离派的艺术家重新设计了橱窗，采用了新艺术风格的装饰。',
          },
          {
            year: '1905',
            title: '被禁书籍橱窗',
            description: '老板悄悄在橱窗的一角展示了几本"问题书籍"，用帘子半遮着。内行人才知道帘子的含义。',
          },
          {
            year: '1933',
            title: '焚书目录',
            description: '纳粹在德国焚书的消息传来，老板把所有即将被禁的书籍从前台搬到了地下室。橱窗里，只留下希特勒的《我的奋斗》孤零零地躺着。',
          },
        ],
        easterEggs: [
          {
            id: 'egg-window-rilke',
            type: 'person',
            title: '年轻的诗人',
            description: '橱窗外的人行道上，一个面色苍白的年轻人正凝视着橱窗里的一本诗集。那是他的第一本正式出版的作品——赖内·马利亚·里尔克的《生活与诗》。',
            targetId: 'person-rilke',
            quote: '"有何胜利可言，挺住就是一切。"',
            position: { x: 78, y: 75 },
          },
        ],
      },
    ],
    easterEggs: [
      {
        id: 'egg-bookstore-cat',
        type: 'event',
        title: '书店猫',
        description: '主书架的顶层，一只黑色的猫咪正懒洋洋地晒着从天窗透进来的太阳。据说它已经在这里待了十年，每一本书都经过它的"审阅"。',
        position: { x: 62, y: 15 },
      },
      {
        id: 'egg-bookstore-bell',
        type: 'event',
        title: '叮当的铃铛',
        description: '门上挂着一个古铜色的铃铛。每当有人推门进来，铃铛就会发出清脆的"叮当"声。老板从不抬头，但他知道谁来了。',
        position: { x: 4, y: 50 },
      },
    ],
  },
];

export const getStreetSceneById = (id: string): StreetScene | undefined => {
  return streetScenes.find((scene) => scene.id === id);
};

export const getStreetScenesByCategory = (category: string): StreetScene[] => {
  return streetScenes.filter((scene) => scene.category === category);
};

export const getAllStreetSceneCategories = (): Array<{ category: string; count: number }> => {
  const map = new Map<string, number>();
  streetScenes.forEach((s) => {
    map.set(s.category, (map.get(s.category) || 0) + 1);
  });
  return Array.from(map.entries()).map(([category, count]) => ({ category, count }));
};
