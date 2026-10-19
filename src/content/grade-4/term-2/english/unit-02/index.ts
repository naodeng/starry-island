import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const cityPlaces = lessonProfile(
  [
    { word: 'city', meaning: '城市' },
    { word: 'street', meaning: '街道' },
    { word: 'sports centre', meaning: '体育中心' },
    { word: 'hotel', meaning: '宾馆' },
  ],
  [
    phraseQuestion('原创城市提示：宾馆在城里。哪句表达了相同的位置？', ['There is a hotel in the city.', 'There is a hotel near the city.', 'There is a city near the hotel.'], 0, 'in the city 表示在城里；near the city 表示靠近城市，位置不同。'),
    phraseQuestion('城市地址牌注明：体育中心所在街道是 King Street。哪句准确改写这个地址？', ['The sports centre is on King Street.', 'The sports centre is next to King Street.', 'The sports centre is between King Street and Hill Street.'], 0, '地址牌给出体育中心所在的街道，准确表达是 on King Street。'),
  ],
  ['城市场所', '街道名称'],
  [
    { label: 'hotel', categoryIndex: 0 }, { label: 'sports centre', categoryIndex: 0 },
    { label: 'King Street', categoryIndex: 1 }, { label: 'Hill Street', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“城里有一家宾馆”。', items: ['city', '.', 'a', 'There', 'the', 'in', 'hotel', 'is'], correctOrderIndices: [3, 7, 2, 6, 5, 4, 0, 1] },
);

const cityPlacesAndLocations = lessonProfile(
  [
    { word: 'square', meaning: '广场' },
    { word: 'museum', meaning: '博物馆' },
    { word: 'station', meaning: '（车）站' },
    { word: 'bus stop', meaning: '公共汽车站' },
  ],
  [
    phraseQuestion('原创城市地图标注：City Museum 靠近 Star Hotel。哪句复述了博物馆的位置？', ['The City Museum is near the hotel.', 'The City Museum is between the hotel and the bookshop.', 'The City Museum is on King Street.'], 0, '地图标注说明博物馆靠近宾馆，对应 near the hotel。'),
    phraseQuestion('地图地址写着“Central Square — Hill Street”。哪句正确说明广场所在的街道？', ['Central Square is on Hill Street.', 'Central Square is on King Street.', 'Central Square is between the hotel and the bookshop.'], 0, 'Central Square 的地址是 Hill Street，所以用 is on Hill Street。'),
  ],
  ['城市场所', '交通站点'],
  [
    { label: 'square', categoryIndex: 0 }, { label: 'museum', categoryIndex: 0 },
    { label: 'station', categoryIndex: 1 }, { label: 'bus stop', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“公共汽车站在宾馆和书店之间”。', items: ['bookshop', 'between', 'The', 'and', 'is', 'hotel', 'bus', 'the', 'stop', 'the', '.'], correctOrderIndices: [2, 6, 8, 4, 1, 7, 5, 3, 9, 0, 10] },
);

const askingAboutCityTransport = lessonProfile(
  [
    { word: 'by bus', meaning: '乘公共汽车' },
    { word: 'by subway', meaning: '乘地铁' },
    { word: 'station', meaning: '（车）站' },
    { word: 'on foot', meaning: '步行' },
  ],
  [
    phraseQuestion('课文中的体育中心路线提示写明乘地铁。别人问 “How can I get there?”，哪句与课文信息一致？', ['You can take the subway.', 'You can take a bus.', 'The sports centre is on King Street.'], 0, '课文给出的具体交通方式是乘地铁；乘公共汽车是另一种方式，不是这条路线提示。'),
    phraseQuestion('城市计划：Central Square 在 Hill Street，可以乘公共汽车前往。哪句表达符合计划？', ['You can go there by bus.', 'You can go there by subway.', 'The bus stop is between the hotel and the bookshop.'], 0, '计划说明乘公共汽车去广场，对应 by bus。'),
  ],
  ['问路表达', '路线或交通回答'],
  [
    { label: 'How can I get to the sports centre?', categoryIndex: 0 }, { label: 'Where is the toy shop?', categoryIndex: 0 },
    { label: 'You can take the subway.', categoryIndex: 1 }, { label: 'You can take a bus.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我怎样才能到体育中心？”', items: ['sports centre', 'How', 'to', 'get', 'can', 'I', 'the', '?'], correctOrderIndices: [1, 4, 5, 3, 2, 6, 0, 7] },
);

const readingCityMap = lessonProfile(
  [
    { word: 'City Museum', meaning: '城市博物馆' },
    { word: 'Central Square', meaning: '中心广场' },
    { word: 'subway station', meaning: '地铁站' },
    { word: 'bus stop', meaning: '公共汽车站' },
  ],
  [
    phraseQuestion('原创地图标注：公共汽车站在宾馆和书店之间。哪句与标注一致？', ['The bus stop is between the hotel and the bookshop.', 'The hotel is between the bus stop and the bookshop.', 'The bus stop is near the museum.'], 0, 'between the hotel and the bookshop 表示车站位于宾馆和书店之间。'),
    phraseQuestion('地图说明：City Museum 靠近宾馆，并在地铁站对面。哪句同时符合两条信息？', ['The City Museum is near the hotel and across from the subway station.', 'The City Museum is on King Street and the bus stop is across from the hotel.', 'Central Square is near the hotel and the museum is next to the station.'], 0, '第一句同时保留 near the hotel 和 across from the subway station 两条地图信息。'),
  ],
  ['城市场所', '交通站点'],
  [
    { label: 'City Museum', categoryIndex: 0 }, { label: 'Central Square', categoryIndex: 0 },
    { label: 'subway station', categoryIndex: 1 }, { label: 'bus stop', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“The City Museum 在地铁站对面”。', items: ['station', '.', 'the', 'Museum', 'across', 'City', 'is', 'from', 'subway', 'The'], correctOrderIndices: [9, 5, 3, 6, 4, 7, 2, 8, 0, 1] },
);

const followingCityDirections = lessonProfile(
  [
    { word: 'go straight', meaning: '直行' },
    { word: 'turn left', meaning: '向左转' },
    { word: 'first crossroads', meaning: '第一个十字路口' },
    { word: 'on the right', meaning: '在右边' },
  ],
  [
    phraseQuestion('路线卡：从宾馆出发，先直行，再在第一个十字路口左转；地铁站在右边。地铁站在哪一侧？', ['On the right.', 'On the left.', 'At the second crossroads.'], 0, '路线卡最后说明地铁站在右边，对应 on the right。'),
    phraseQuestion('地图文字：体育中心在 King Street，去那里可以乘地铁。哪项同时保留地点和交通方式？', ['The sports centre is on King Street. You can go there by subway.', 'The sports centre is on Dream Street. You can go there by bus.', 'The City Museum is on Hill Street. You can go there by subway.'], 0, '第一项同时符合体育中心在 King Street、乘地铁前往两条信息。'),
  ],
  ['行进指令', '路线位置线索'],
  [
    { label: 'go straight', categoryIndex: 0 }, { label: 'turn left', categoryIndex: 0 },
    { label: 'at the first crossroads', categoryIndex: 1 }, { label: 'on the right', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“直行，在第一个十字路口向左转”。', items: ['turn left', 'Go', 'straight', 'and', 'at', 'first', 'the', 'crossroads', '.'], correctOrderIndices: [1, 2, 3, 0, 4, 6, 5, 7, 8] },
);

const planningACityVisit = lessonProfile(
  [
    { word: 'buy toys', meaning: '买玩具' },
    { word: 'see a film', meaning: '看电影' },
    { word: 'go boating', meaning: '去划船' },
    { word: 'busy', meaning: '忙碌的' },
  ],
  [
    phraseQuestion('故事里，Country Mouse 看到街上人和车很多后想回乡下。哪项最能说明他想离开的原因？', ['The street is busy with many people and cars.', 'The street is quiet with no cars.', 'The street is far from the country.'], 0, '故事把繁忙街道上的人群和车辆作为 Country Mouse 想回家的线索。'),
    phraseQuestion('城市介绍卡写着：Amsterdam 以自行车出行闻名，London 有大型地铁系统，Copenhagen 适合步行。哪组配对符合介绍？', ['Amsterdam—bicycles; London—the subway; Copenhagen—walking.', 'Amsterdam—walking; London—bicycles; Copenhagen—the subway.', 'Amsterdam—the subway; London—walking; Copenhagen—bicycles.'], 0, '第一组按介绍分别对应自行车、地铁和步行城市。'),
  ],
  ['游玩活动', '城市场所'],
  [
    { label: 'buy toys', categoryIndex: 0 }, { label: 'see a film', categoryIndex: 0 },
    { label: 'sports centre', categoryIndex: 1 }, { label: 'square', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我们可以在城里划船”。', items: ['city', 'boating', 'can', '.', 'We', 'go', 'in', 'the'], correctOrderIndices: [4, 2, 5, 1, 6, 7, 0, 3] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 2,
  formalUnitNumber: 2,
  entryId: 'unit-02',
  title: 'Unit 2 · Cities',
  sourceTopics: [
    '城市与街区场所：city、street、sports centre、hotel、square、museum、station、bus stop，以及地图中的 cinema、park、toy shop、bookshop',
    '描述场所的位置和街道地址：near、on ... Street、between ... and ...、across from；询问 Where is ...?',
    '问路和交通方式：How can I get to ...?、You can take a bus/the subway、by bus/by subway、on foot',
    '理解城市地图和路线提示：go straight、turn left at the first crossroads、on the right；从文字中提取地点、路线和交通信息',
    '城市游玩活动：buy toys、see a film、go boating、play ball games、swim、fly kites、take photos',
    'Fun Time 城市阅读：Amsterdam 的自行车、London 的地铁、Copenhagen 的步行街道；Country Mouse 在繁忙街道看到人群和车辆后想回乡下',
  ],
  basicTasks: [
    makeTask('认读城市场所和街道', '辨认城市、宾馆、体育中心等场所词汇，并读懂简单的街道地址。', 'companion-03', cityPlaces),
    makeTask('辨认城市地点和位置', '区分城市场所与交通站点，并从简短地图标注中读出地点关系。', 'companion-02', cityPlacesAndLocations),
  ],
  advancedTasks: [
    makeTask('询问去城市地点的方式', '根据目的地线索选择公共汽车或地铁，并读懂 How can I get to ...? 问句。', 'companion-04', askingAboutCityTransport),
    makeTask('读取城市地图信息', '综合地点名称、街道地址和位置关系，核对地图中的多条描述。', 'companion-01', readingCityMap),
  ],
  highTasks: [
    makeTask('按指引规划城市路线', '组合直行、转弯、路口和方位信息，核对目的地与交通方式是否一致。', 'companion-03', followingCityDirections),
    makeTask('阅读城市介绍和游玩故事', '从城市介绍和故事线索中提取信息，并辨认游玩活动与适合的场所。', 'companion-04', planningACityVisit),
  ],
});
