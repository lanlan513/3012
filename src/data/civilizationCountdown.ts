import { YearPerspective, CountdownData, CivilizationIndex } from '@/types';

export const WAR_OUTBREAK_DATE = new Date(1914, 6, 28);
export const WAR_OUTBREAK_LABEL = '1914年7月28日 · 奥匈帝国向塞尔维亚宣战';

function daysBetween(from: Date, to: Date): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.ceil((to.getTime() - from.getTime()) / MS_PER_DAY);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

const YEAR_PERSPECTIVES: Record<number, YearPerspective> = {
  1900: {
    year: 1900,
    publicMood: '欢欣鼓舞，沉浸于新世纪的无限希望',
    prevailingBelief: '进步是必然的，科学和理性将带领人类走向永恒和平',
    culturalHighlights: [
      '巴黎世博会盛大开幕，电灯光照亮人类未来',
      '尼采的思想余波震荡整个欧洲知识界',
      '弗洛伊德《梦的解析》悄然出版，尚无人知晓其将颠覆人类对自我的认知',
      '印象派已登堂入室，现代艺术的种子正在萌芽',
    ],
    diplomaticClimate: '列强虽在海外争夺殖民地，但欧洲本土维持着「百年和平」的表象，各国君主互称表亲，外交宴会上觥筹交错',
    socialUnderCurrent: '工人运动悄然兴起，妇女开始争取选举权，但中产阶级相信社会将在渐进改良中趋于完美',
    quote: '「二十世纪将是人类最伟大的世纪，战争将成为过时的野蛮遗迹。」',
    quoteAuthor: '法国《费加罗报》社论，1900年元旦',
    indices: { culture: 88, international: 82, stability: 80 },
    omens: [
      '德国开始大规模造舰计划，英国警觉但未公开表态',
      '德雷福斯事件撕裂法国社会，但被视作「可解决的内部矛盾」',
    ],
  },
  1905: {
    year: 1905,
    publicMood: '自信满满，科技奇迹令人目不暇接',
    prevailingBelief: '物质文明的进步必然带来精神文明的提升，欧洲文明已是人类历史的巅峰',
    culturalHighlights: [
      '爱因斯坦发表相对论，时空观被彻底颠覆却鲜有人理解',
      '施特劳斯《莎乐美》震撼乐坛，瓦格纳传统遭遇挑战',
      '毕加索进入「蓝色时期」，现代主义的阵痛即将爆发',
      '维也纳分离派运动如日中天，克里姆特正在绘制《吻》',
    ],
    diplomaticClimate: '第一次摩洛哥危机短暂地紧张了气氛，但外交家们相信「条约体系足以维持均势」，三国协约与三国同盟被视为和平的双重保险',
    socialUnderCurrent: '俄国1905年革命被镇压，欧洲各国左派政党在议会中席位渐增，但右翼势力仍稳操大局',
    quote: '「我们生活在一个前所未有的黄金时代，昨日的梦想正一一化为现实。」',
    quoteAuthor: '斯蒂芬·茨威格，《昨日的世界》回忆1905年',
    indices: { culture: 92, international: 75, stability: 76 },
    omens: [
      '俄国革命的失败让欧洲松了一口气，却无人从中看到未来的镜像',
      '德法在摩洛哥的对峙暴露了联盟体系的僵化',
    ],
  },
  1908: {
    year: 1908,
    publicMood: '文化生活极度丰富，对政治危机漠然处之',
    prevailingBelief: '局部冲突永远不会升级为全面战争，因为银行家们绝不容许',
    culturalHighlights: [
      '克里姆特《吻》在维也纳艺术展引发轰动',
      '勋伯格发表《第二弦乐四重奏》，无调性音乐破茧而出',
      '普鲁斯特开始在脑海中构筑《追忆似水年华》的宏伟大厦',
      '霍夫曼斯塔尔、施特劳斯合作的《玫瑰骑士》即将问世',
    ],
    diplomaticClimate: '波斯尼亚危机让巴尔干火药桶第一次发出嘶嘶的引信声，但柏林的银行家告诉维也纳：「放心，我们不会为波斯尼亚开战」',
    socialUnderCurrent: '青年运动、和平运动、妇女运动方兴未艾，社会党国际代表大会高喊「反对战争」，投票者相信和平有保障',
    quote: '「国际金融界的相互依存是维护和平最可靠的保证。」',
    quoteAuthor: '伦敦《经济学人》，1908年',
    indices: { culture: 94, international: 68, stability: 72 },
    omens: [
      '奥匈兼并波斯尼亚-黑塞哥维那，塞尔维亚的民族主义被激怒',
      '英德海军军备竞赛进入白热化，公众却只关注造舰的「国家荣耀」',
    ],
  },
  1910: {
    year: 1910,
    publicMood: '岁月静好，享受着「美好年代」最后的余晖',
    prevailingBelief: '欧洲已走过五十年没有大战的历史，下一个五十年只会更好',
    culturalHighlights: [
      '马勒完成《大地之歌》，却已预感死神将至',
      '里尔克写下《杜伊诺哀歌》的开篇，预感一个时代即将落幕',
      '康定斯基画出第一幅抽象水彩画，旧世界的美学正在崩塌',
      '弗洛伊德精神分析学派分裂，荣格另立门户',
    ],
    diplomaticClimate: '第二次摩洛哥危机雷声大雨点小，报纸头条喧闹三天后便让位于时尚版和赛马新闻。民众普遍认为「外交家总能在最后一刻达成妥协」',
    socialUnderCurrent: '工人罢工浪潮此起彼伏，女权主义者开始激进行动，但这一切都被视作「进步的阵痛」，而非结构性危机的前兆',
    quote: '「我们这一代人有幸生活在欧洲最辉煌的时刻，文明的光芒永不熄灭。」',
    quoteAuthor: '罗曼·罗兰，1910年日记',
    indices: { culture: 95, international: 62, stability: 70 },
    omens: [
      '爱德华七世驾崩，英德皇室的最后一条私人纽带断裂',
      '刺杀奥匈皇储的秘密结社「黑手党」已在塞尔维亚成立',
    ],
  },
  1911: {
    year: 1911,
    publicMood: '生活如常，文化盛宴仍在继续',
    prevailingBelief: '最坏的情况不过是又一次巴尔干局部战争，与西欧文明人何干',
    culturalHighlights: [
      '马勒辞世，留下未完成的《第十交响曲》，预言般的哀歌',
      '茨威格在巴黎与罗曼·罗兰畅谈和平，筹划反战作家联盟',
      '普鲁斯特终于动笔，要在纸上重建那个正在消逝的世界',
      '维也纳的咖啡馆里，维特根斯坦、希特勒、斯大林、托洛茨基……几个人擦肩而过，无人知晓他们将决定下半个世纪',
    ],
    diplomaticClimate: '意大利入侵奥斯曼帝国的黎波里，列强口头谴责、暗地分赃。欧洲公众耸耸肩：「不过是远方野蛮人之间的事」',
    socialUnderCurrent: '各国军费预算悄然攀升至历史新高，但议会辩论中「经济优先于大炮」仍是主旋律',
    quote: '「让青年们享受和平吧，战争是遥远国度的古老传说。」',
    quoteAuthor: '维也纳《新自由报》文化版，1911年春',
    indices: { culture: 93, international: 55, stability: 68 },
    omens: [
      '意大利对土耳其的战争打破了巴尔干的力量平衡',
      '德国总参谋部完成了「施里芬计划」的最终修订，却被束之高阁，无人相信它会被启用',
    ],
  },
  1912: {
    year: 1912,
    publicMood: '隐约感到不安，但仍拒绝相信最坏的可能',
    prevailingBelief: '巴尔干战争被限制在局部，大国的「理性」将阻止一切失控',
    culturalHighlights: [
      '托马斯·曼正在写《魔山》，那座阿尔卑斯山上的疗养院成了战前欧洲的隐喻',
      '卡夫卡写出《变形记》，现代人的异化感在和平年代已悄然滋长',
      '斯特拉文斯基《春之祭》在巴黎首演引发骚乱，艺术界先于政治嗅到了原始暴力的气息',
      '弗洛伊德《图腾与禁忌》出版，试图从人类心灵深处解释战争的诱惑',
    ],
    diplomaticClimate: '第一次巴尔干战争爆发，塞尔维亚、保加利亚、希腊联合击败土耳其。欧洲首都的外交部彻夜灯火通明，但最终达成伦敦和约。报纸宣称「外交战胜了战争」',
    socialUnderCurrent: '战争的第一次真实影像出现在新闻短片中，观众在电影院里战栗，却随即告诉自己「这不会发生在我们这里」',
    quote: '「巴尔干的烟尘终将散去，欧洲的和平坚如磐石。」',
    quoteAuthor: '法国总理普恩加莱，1912年12月',
    indices: { culture: 90, international: 45, stability: 60 },
    omens: [
      '塞尔维亚在巴尔干战争中获胜，民族自信心极度膨胀',
      '俄国开始秘密军事改革，加速扩军备战',
      '奥匈帝国总参谋部将塞尔维亚列为「必须消灭的威胁」',
    ],
  },
  1913: {
    year: 1913,
    publicMood: '最后的和平年份，庆典与隐忧交织',
    prevailingBelief: '既然1912年那么危险都过去了，1913年自然更不会出问题',
    culturalHighlights: [
      '普鲁斯特《在斯万家那边》自费出版，最初只卖出几百本，无人意识到这是整个时代的墓志铭',
      '维也纳分离派举办最后一次盛大展览，装饰艺术的黄金时代悄然落幕',
      '勋伯格《古雷之歌》首演，浪漫主义的晚霞映红天际',
      '茨威格写出《一个陌生女人的来信》，那细腻敏感的文风正属于一个即将永远逝去的时代',
    ],
    diplomaticClimate: '第二次巴尔干战争（塞尔维亚对保加利亚）短暂而血腥，但再次被大国调停。和平主义者奔走相告：「看吧，国际协调机制运转良好！」',
    socialUnderCurrent: '街头报童叫卖着「和平！」的号外，咖啡馆里哲学家辩论着永恒。然而，在各大城市的征兵办公室门口，排队的青年已越来越多',
    quote: '「这是和平的最后一年，可惜我们无人知晓。」',
    quoteAuthor: '茨威格在回忆录中回顾1913年',
    indices: { culture: 96, international: 38, stability: 55 },
    omens: [
      '法国总统普恩加莱强势推行「三年兵役法」，德国人视之为威胁',
      '俄国「大军事计划」获批，战争动员能力将翻番',
      '萨拉热窝，一群青年学生正在秘密接受训练，誓言要为大塞尔维亚献出生命',
    ],
  },
  1914: {
    year: 1914,
    publicMood: '上半年风平浪静，夏天突如其来的风暴',
    prevailingBelief: '七月危机之前，所有人都以为「这次也会和以前一样，以某种外交妥协收场」',
    culturalHighlights: [
      '新年伊始，毕加索《亚维农少女》的草稿在小圈子中传阅，预示着美学的革命',
      '维也纳爱乐照常上演新年音乐会，舒伯特的旋律依旧甜美',
      '6月28日之前，所有报纸的文化版都在讨论即将开幕的威尼斯双年展',
    ],
    diplomaticClimate: '6月28日萨拉热窝的枪声起初被淹没在社交版中。「又是一桩巴尔干的暗杀？」欧洲的外交官们在度假胜地悠闲地讨论着。奥匈7月23日发出最后通牒时，柏林的宫廷舞会仍在进行，德皇威廉二世在通牒上批示「很好，想不到塞尔维亚会接受」',
    socialUnderCurrent: '7月下旬，当「总动员」三个字出现在报纸头版时，民众先是愕然，随后是「爱国主义」的狂欢。许多青年相信「圣诞节前就能回家」，军官们担心「战争结束前赶不上立功」',
    quote: '「我以为这不过是又一次外交危机，直到我在报纸上看到了「动员」二字。」',
    quoteAuthor: '茨威格回忆1914年7月底',
    indices: { culture: 85, international: 12, stability: 25 },
    omens: [
      '7月5日德皇给奥匈「空白支票」，这张支票将兑换成上千万人的生命',
      '7月28日奥匈向塞尔维亚宣战，联盟体系像多米诺骨牌依次倒塌',
      '8月1日德国对俄宣战，8月3日对法宣战，8月4日英军渡过英吉利海峡',
    ],
  },
};

export function getYearPerspective(year: number): YearPerspective {
  const keys = Object.keys(YEAR_PERSPECTIVES).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(k - year) < Math.abs(closest - year)) {
      closest = k;
    }
  }
  return YEAR_PERSPECTIVES[closest];
}

export function interpolateIndices(year: number): CivilizationIndex {
  const sorted = Object.keys(YEAR_PERSPECTIVES).map(Number).sort((a, b) => a - b);
  if (year <= sorted[0]) return YEAR_PERSPECTIVES[sorted[0]].indices;
  if (year >= sorted[sorted.length - 1]) return YEAR_PERSPECTIVES[sorted[sorted.length - 1]].indices;
  for (let i = 0; i < sorted.length - 1; i++) {
    const y1 = sorted[i];
    const y2 = sorted[i + 1];
    if (year >= y1 && year <= y2) {
      const t = (year - y1) / (y2 - y1);
      const i1 = YEAR_PERSPECTIVES[y1].indices;
      const i2 = YEAR_PERSPECTIVES[y2].indices;
      return {
        culture: Math.round(i1.culture + (i2.culture - i1.culture) * t),
        international: Math.round(i1.international + (i2.international - i1.international) * t),
        stability: Math.round(i1.stability + (i2.stability - i1.stability) * t),
      };
    }
  }
  return YEAR_PERSPECTIVES[sorted[0]].indices;
}

export function getUrgency(days: number): CountdownData['urgency'] {
  if (days <= 0) return 'war';
  if (days <= 30) return 'crisis';
  if (days <= 365) return 'tension';
  if (days <= 365 * 3) return 'unease';
  return 'calm';
}

export function getCountdownForYear(year: number, month: number = 6, day: number = 15): CountdownData {
  const currentDate = new Date(year, month, day);
  const daysToWar = daysBetween(currentDate, WAR_OUTBREAK_DATE);
  const perspective = getYearPerspective(year);
  perspective.indices = interpolateIndices(year);
  return {
    daysToWar,
    formattedDate: formatDate(currentDate),
    perspective,
    urgency: getUrgency(daysToWar),
  };
}

export const URGENCY_THEMES: Record<CountdownData['urgency'], {
  label: string;
  glow: string;
  pulse: string;
  icon: string;
  background: string;
  text: string;
  border: string;
  progress: string;
  description: string;
}> = {
  calm: {
    label: '风平浪静',
    glow: 'shadow-[0_0_60px_rgba(212,160,23,0.15)]',
    pulse: 'animate-pulse',
    icon: '☀',
    background: 'from-gold-50/60 via-amber-50/40 to-gold-100/50',
    text: 'text-gold-800',
    border: 'border-gold-400/40',
    progress: 'bg-gradient-to-r from-gold-400 to-amber-500',
    description: '欧洲大陆阳光明媚，人们享受着和平的日常，坚信进步是历史的必然',
  },
  unease: {
    label: '暗流涌动',
    glow: 'shadow-[0_0_60px_rgba(217,119,6,0.2)]',
    pulse: 'animate-pulse',
    icon: '⛅',
    background: 'from-amber-50/60 via-orange-50/40 to-amber-100/50',
    text: 'text-amber-800',
    border: 'border-amber-500/40',
    progress: 'bg-gradient-to-r from-amber-400 to-orange-500',
    description: '地平线上有几缕阴云，但大多数人仍选择相信阳光不会消散',
  },
  tension: {
    label: '山雨欲来',
    glow: 'shadow-[0_0_60px_rgba(234,88,12,0.25)]',
    pulse: 'animate-pulse',
    icon: '🌩',
    background: 'from-orange-50/60 via-rose-50/40 to-orange-100/50',
    text: 'text-orange-800',
    border: 'border-orange-500/50',
    progress: 'bg-gradient-to-r from-orange-500 to-rose-500',
    description: '风声渐紧，有识之士开始忧虑，但大多数人仍沉浸在最后的狂欢中',
  },
  crisis: {
    label: '危在旦夕',
    glow: 'shadow-[0_0_70px_rgba(220,38,38,0.35)]',
    pulse: 'animate-pulse',
    icon: '⚡',
    background: 'from-rose-50/70 via-red-50/50 to-rose-100/60',
    text: 'text-red-800',
    border: 'border-red-500/60',
    progress: 'bg-gradient-to-r from-rose-500 to-red-600',
    description: '闪电已经划破天际，惊雷即将响彻整个欧洲大陆',
  },
  war: {
    label: '战火已燃',
    glow: 'shadow-[0_0_80px_rgba(153,27,27,0.45)]',
    pulse: '',
    icon: '⚔',
    background: 'from-red-100/70 via-rose-100/50 to-red-200/60',
    text: 'text-red-900',
    border: 'border-red-600/70',
    progress: 'bg-gradient-to-r from-red-600 to-red-800',
    description: '1914年7月28日，奥匈帝国向塞尔维亚宣战。战争的闸门轰然落下，昨日的世界从此消逝。',
  },
};
