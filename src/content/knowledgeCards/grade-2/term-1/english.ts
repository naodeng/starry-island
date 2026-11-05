import { defineKnowledgeCards } from '../../types';

const unit = (slug: string, rows: Parameters<typeof defineKnowledgeCards>[1]) => defineKnowledgeCards(`grade-2/term-1/english/${slug}`, rows);

export const term1EnglishCards = {
  'unit-01': unit('unit-01', [
    ['家庭成员词汇', '用家庭成员词汇介绍家人时，先认清每个词的意思，再选择合适的称呼。', 'Which word means “妈妈”: mother or father?', 'mother.', 'mother 表示“妈妈”；father 表示“爸爸”。'],
    ['介绍家人', '可以用“This is my…”介绍一位家人，my 表示“我的”。', '用英语介绍爸爸：This is my _____.', 'This is my father.', 'father 表示爸爸，放在 my 后面介绍家人。'],
    ['he 与 she 的初步表达', 'he 指男性，she 指女性；说句子时要让代词和人物对应。', '介绍一位女孩：“___ is my friend.”填 he 还是 she？', 'She is my friend.', '这里介绍女孩，用 she。'],
  ]),
  'unit-02': unit('unit-02', [
    ['男孩、女孩、男人、女人', 'boy 和 girl 表示男孩、女孩；man 和 woman 表示成年男性、成年女性。', '“一个女孩”用哪个短语：a girl 还是 a man？', 'a girl.', 'girl 表示女孩，man 表示成年男性。'],
    ['同班同学与朋友', 'classmate 表示同班同学，friend 表示朋友；同一个人可以既是同学也是朋友。', '“我的同班同学”可以说 my _____.', 'my classmate.', 'classmate 表示同班同学，my 表示“我的”。'],
    ['he 与 she 的人物表达', '介绍人物时，he 和 she 要与所介绍的人对应，再接人物身份或描述。', '介绍一位男同学：“___ is my classmate.”', 'He is my classmate.', '介绍男孩时用 he。'],
  ]),
  'unit-03': unit('unit-03', [
    ['big、thin、tall、short', '这些形容词描述大小、身高或体形；选择词语时要结合句子和人物特点。', '“这棵树很高。”用 tall 还是 short？', 'tall.', 'tall 表示高的；short 可表示矮的或短的。'],
    ['handsome 与 pretty', 'handsome 和 pretty 都是描述外表的形容词；说话时要礼貌，不用外貌取笑别人。', '想说“这幅画很漂亮”，可以用 pretty 吗？', '可以。', 'pretty 可以表示漂亮；这里描述的是画。'],
    ['使用简单形容词描述人物', '可以用“He/She is…”加一个形容词描述人物，句子要完整。', '用 tall 描述一位男孩：He is _____.', 'He is tall.', 'He 是主语，is 后面接形容词 tall。'],
  ]),
  'review-01': unit('review-01', [
    ['复习 Unit 1 家庭成员', '复习家庭成员词汇时，把英文词和中文意思配对，再用完整句子介绍家人。', '“sister”是什么意思？', '姐姐或妹妹。', '英语的 sister 可以指姐姐，也可以指妹妹。'],
    ['复习 Unit 2 人物与同伴', '介绍人物关系时，可以把 he 或 she 和 classmate、friend 等词语放在完整句中。', '“她是我的同学。”可以怎样说？', 'She is my classmate.', 'she 指她，my classmate 表示“我的同学”。'],
    ['复习 Unit 3 友善描述人物', '使用形容词描述人物时，句子要有主语和 be 动词，也要保持友善。', '“他很矮。”可以怎样说？', 'He is short.', 'He is 后接形容词 short。'],
  ]),
  'unit-04': unit('unit-04', [
    ['bookshop、supermarket、zoo、park', '这些词表示社区里的地点；看清词义后，能把活动和地点联系起来。', '想看动物，去 zoo 还是 bookshop？', 'zoo.', 'zoo 是动物园，bookshop 是书店。'],
    ['school 与 hospital', 'school 是学校，hospital 是医院；地点词要和相应的学习或看病情境对应。', '生病需要看医生，通常去 school 还是 hospital？', 'hospital.', 'hospital 表示医院。'],
    ['询问地点和表达前往某地', '可以用“Where are you going?”询问去哪里，用“I am going to…”回答。', '回答“我要去公园”：I am going to the _____.', 'I am going to the park.', 'park 表示公园，放在 to the 后面。'],
  ]),
  'unit-05': unit('unit-05', [
    ['lake、boat、tree、grass、flower、hill', '这些词表示公园或自然景物；可以边观察边用词语说出看见的东西。', 'Which word means “花”: flower or hill?', 'flower.', 'flower 是花；hill 是小山。'],
    ['What is this?', '问单个物品是什么，可以说“What is this?”，再用“It is a…”回答。', '指着一朵花问“What is this?”，怎样回答？', 'It is a flower.', '回答使用 It is a，再说物品名称。'],
    ['What can you see?', '询问能看见什么可以说“What can you see?”，回答时说出看到的景物。', '看到湖面上的船，回答“What can you see?”', 'I can see a boat.', 'I can see…表示“我能看见……”。'],
  ]),
  'unit-06': unit('unit-06', [
    ['Father Christmas、card、Christmas tree、present', '这些词和圣诞节情境有关；认读时注意词形和中文意思。', 'Which word means “礼物”: card or present?', 'present.', 'present 在这里表示礼物；card 表示卡片。'],
    ['圣诞节与新年问候', '节日问候可以用简短、友好的句子；说祝福时要注意对应的节日。', '在新年见面时，可以说“Happy New Year!”吗？', '可以。', 'Happy New Year! 是新年问候语。'],
    ['表达感谢和礼貌回应', '收到帮助或礼物时可以说“Thank you.”；对方可以礼貌地回答“You’re welcome.”', '朋友递给你一张卡片，你可以怎样表达感谢？', 'Thank you.', 'Thank you 表示“谢谢你”。'],
  ]),
  'review-02': unit('review-02', [
    ['复习 Unit 4 社区地点', '复习地点词时，把场所名称和常见活动配对，并练习询问去哪里。', '想买书，去 bookshop 还是 zoo？', 'bookshop.', 'bookshop 是书店，适合购买书籍。'],
    ['复习 Unit 5 公园与自然景物', '复习自然景物词语时，可以用“What can you see?”说出眼前的景物。', '看到一棵树，可以怎样回答“I can see…”？', 'I can see a tree.', 'tree 表示树，放在 a 后面。'],
    ['复习 Unit 6 节日词汇与问候', '节日词汇、问候和感谢用语可以放在同一段礼貌对话里。', '朋友送你 present，先说哪句更合适？', 'Thank you.', '收到礼物时先表达感谢。'],
  ]),
} satisfies Record<string, ReturnType<typeof unit>>;
