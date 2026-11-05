import { defineKnowledgeCards } from '../../types';

const unit = (slug: string, rows: Parameters<typeof defineKnowledgeCards>[1]) => defineKnowledgeCards(`grade-2/term-2/english/${slug}`, rows);

export const term2EnglishCards = {
  'unit-01': unit('unit-01', [
    ['游泳、踢足球、骑自行车和放风筝', '活动词语表示人会做的事情；听或读句子时，可以把动作词和对应活动联系起来。', 'Which activity means “放风筝”: fly a kite or ride a bike?', 'fly a kite.', 'fly a kite 是放风筝；ride a bike 是骑自行车。'],
    ['用 can 与 cannot 表达能力', 'can 表示会做某事，cannot 或 can’t 表示不会；后面接动作词。', '“我会游泳。”可以怎样说？', 'I can swim.', 'I 后接 can，再接动作词 swim。'],
    ['询问和回答会不会做某项活动', '可以用“Can you…?”询问能力，用“Yes, I can.”或“No, I can’t.”回答。', '朋友问“Can you ride a bike?”，如果会骑，怎样回答？', 'Yes, I can.', '肯定回答用 Yes, I can.'],
  ]),
  'unit-02': unit('unit-02', [
    ['sunny、rainy、windy、cloudy', '这些词描述天气；读天气词时要把拼写、读音和天气图标对应起来。', 'Which word means “有风的”: windy or rainy?', 'windy.', 'windy 表示有风的；rainy 表示下雨的。'],
    ['询问并描述天气', '可以用“How is the weather?”询问天气，再用“It is…”描述。', '回答“天气晴朗”：It is _____.', 'It is sunny.', 'sunny 表示晴朗的，放在 It is 后面。'],
    ['把天气词放进简单的日常表达', '天气描述可以和日常活动放在一起；选择活动时也要考虑天气是否合适。', 'It is rainy. 出门前带什么更合适：an umbrella 还是 a kite?', 'an umbrella.', '下雨时带伞可以帮助遮雨。'],
  ]),
  'unit-03': unit('unit-03', [
    ['春、夏、秋、冬四季', '一年有春、夏、秋、冬四季；读季节词时要把名称和季节顺序记清楚。', '夏天之后通常是哪一个季节？', '秋天。', '四季顺序是春、夏、秋、冬，再回到春。'],
    ['描述季节常见的天气', '介绍季节时可以搭配常见天气词，但天气会变化，不能说某季节每天都只有一种天气。', '用 sunny 描述一个晴朗的春日：It is a _____ spring day.', 'sunny.', 'sunny 表示晴朗的，放在名词短语前描述天气。'],
    ['介绍自己喜欢的季节', '可以用“I like…”介绍喜欢的季节，再补充一个简单理由。', '完成句子：I like winter because I can _____.', '例如：I like winter because I can play in the snow.', 'like 后说喜欢的季节，because 后说明理由。'],
  ]),
  'unit-04': unit('unit-04', [
    ['认识和读出数字时间', '读数字时间时先看小时和分钟；分钟数要按钟面数字正确读出。', '钟面显示 3:30，英语中可以怎样说？', 'It is three thirty.', '3:30 表示三点三十分。'],
    ['What time is it?', '可以用“What time is it?”询问现在几点，并用“It is…”报告时间。', '有人问“What time is it?”，钟面是8:00，怎样回答？', 'It is eight o’clock.', '整点可以用数字加 o’clock 表示。'],
    ['用简短句子报告钟面显示的时间', '报告时间要让数字与钟面一致；说完后可以再看一次小时和分钟。', '钟面显示 7:40，选择正确句子：It is seven forty. / It is seven fourteen.', 'It is seven forty.', '分针指向8表示40分钟，所以是7:40。'],
  ]),
  'unit-05': unit('unit-05', [
    ['get up、eat breakfast、go to school、go home', '这些短语描述一天中的常见活动；可以按早晨、白天、回家等时间顺序整理。', '通常早晨先做哪件事：get up 还是 go home?', 'get up.', 'get up 表示起床，通常发生在早晨。'],
    ['When do you…every day? 日常活动问答', '可以用“When do you…?”询问日常活动时间，用“I … at…”回答。', '回答“When do you get up?”：I get up _____ seven.', 'at.', '介绍具体时间时用 at，例如 at seven。'],
    ['用 at 加时间介绍一天安排', 'at 后面可以接具体钟点，介绍活动安排时要确保时间和活动顺序合理。', '“我八点去上学。”可以怎样说？', 'I go to school at eight.', 'at eight 表示在八点；整句说明活动和时间。'],
  ]),
  'unit-06': unit('unit-06', [
    ['星期一至星期日', '一周有七天，星期名称按固定顺序排列；开头字母要大写。', 'Wednesday 之后是哪一天？', 'Thursday。', '星期顺序中 Wednesday 后面是 Thursday。'],
    ['询问和回答今天是星期几', '可以用“What day is it today?”询问星期，用“It is…”回答。', '今天是星期一，怎样回答“What day is it today?”', 'It is Monday.', 'Monday 是星期一，星期名称首字母大写。'],
    ['在星期安排简单活动', '可以用“on + 星期”说明活动安排在哪一天。', '“我们星期五踢足球。”可以怎样说？', 'We play football on Friday.', '表示在星期五时用 on Friday。'],
  ]),
  'review-01': unit('review-01', [
    ['复习 Unit 1 Playtime', '复习活动和能力表达时，先确认动作词，再用 can 或 can’t 说清会不会做。', '“我不会踢足球。”可以怎样说？', 'I cannot play football. / I can’t play football.', 'cannot 和 can’t 都表示不会。'],
    ['复习 Unit 2 Weather', '天气词可以描述当天天气，回答时用“It is…”加天气形容词。', 'What is the weather like? It is windy. 表示什么天气？', '有风的天气。', 'windy 表示有风的。'],
    ['复习 Unit 3 Seasons', '季节词和天气词能组合介绍季节，但表达时要把季节名称和天气特点分清。', '“我喜欢秋天。”可以怎样说？', 'I like autumn.', 'like 后接喜欢的季节名称。'],
  ]),
  'review-02': unit('review-02', [
    ['复习 Unit 4 Time', '读时间要核对钟面上的小时和分钟，并用合适的英语句子回答。', '钟面是11:30，可以怎样报告？', 'It is eleven thirty.', '11:30 表示十一点三十分。'],
    ['复习 Unit 5 My Day：get up、eat breakfast', '介绍一天活动时可以按时间顺序说，并用 at 加钟点。', '“我七点吃早饭。”可以怎样说？', 'I eat breakfast at seven.', 'eat breakfast 表示吃早饭，at seven 表示在七点。'],
    ['复习 Unit 6 My Week', '星期安排使用星期名称；句首或星期名称的首字母要大写。', '“我们星期日回家。”可以怎样说？', 'We go home on Sunday.', '表示在星期日用 on Sunday。'],
  ]),
} satisfies Record<string, ReturnType<typeof unit>>;
