import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, lessonProfile, makeTask, pair, phraseQuestion, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';
// 主题边界依据固定册次目录；练习词为原创主题词，不声称逐词核验了教材页词表。
const profile1 = lessonProfile(
  [
    { word: 'send an email', meaning: '发电子邮件' }, { word: 'write a letter', meaning: '写信' },
    { word: 'make a phone call', meaning: '打电话' }, { word: 'send a short message', meaning: '发短信' },
  ],
  [
    phraseQuestion('你不明白短语“send an email”的意思，哪句可以请同伴解释？', ['What does “send an email” mean?', 'Where is “send an email”?', 'How are you?'], 0, '先说清你想询问短语的意思；与同伴交流时还可以在句末加 please。 What does “send an email” mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问：“What does ‘send a short message’ mean?” 哪句回答了短语的意思？', ['它的意思是“写信”。', '它的意思是“打电话”。', '它的意思是“发短信”。'], 2, '回答词义时要核对英文短语和中文意思是否匹配。 “send a short message”表示“发短信”；另两个选项把其他表达的意思错配过来。'),
  ],
  ['联系和通话', '书写和邮寄'],
  [
    { label: 'make a phone call', categoryIndex: 0 }, { label: 'make a video call', categoryIndex: 0 },
    { label: 'write a letter', categoryIndex: 1 }, { label: 'mail a present', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想学会这个词语”。', items: ['word', 'this', 'learn', 'I', 'would', 'like', 'to', '.'], correctOrderIndices: [3, 4, 5, 6, 2, 1, 0, 7] },
);
function customTask(
  title: string,
  objective: string,
  companionId: EnglishTaskSpec['companionId'],
  questions: EightEnglishQuestions,
): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

const basicTask2 = customTask(
  '根据情境选择联系方法',
  '根据沟通需要选择合适的联系方法，并在简单句和问句中使用主题表达。',
  'companion-02',
  q8([
    choose('Your friend wants to read a short message now. Which phrase names this contact method?', ['send a short message', 'make a phone call', 'mail a present'], 0, '题目要找一种能马上发送、供朋友阅读的简短文字。', 'send a short message 表示发送简短文字信息。'),
    choose('You want to see and talk with your cousin online. Which method fits?', ['make a video call', 'write a letter', 'mail a present'], 0, '选择能同时看到并听到对方的线上方式。', 'make a video call 可以让双方在线看到并交谈。'),
    choose('Kai writes a message on paper and sends it to a friend. Which phrase describes what Kai does?', ['write a letter', 'make a phone call', 'make a video call'], 0, '留意 Kai 写在纸上并寄给朋友的内容。', 'write a letter 表示写信。'),
    pair('把联系需要和合适的方法连起来。', [
      ['用电话和朋友直接交谈', 'make a phone call'],
      ['用电子邮件发送文字资料', 'send an email'],
      ['把礼物寄给远方的朋友', 'mail a present'],
    ], '根据每种需要的媒介选择对应表达。', '电话用于直接交谈，电子邮件用于发送电子文字，mail a present 表示邮寄礼物。'),
    choose('Which sentence is grammatically correct?', ['I write a letter to my friend.', 'I writes a letter to my friend.', 'I am write a letter to my friend.'], 0, '主语 I 后使用动词原形。', 'I write a letter to my friend. 主语 I 搭配动词原形 write。'),
    choose('You decide to send an online invitation. What can you tell your friend?', ['I can send the invitation by email.', 'I can sends the invitation by email.', 'I am send the invitation by email.'], 0, '选择语法完整、意思清楚的表达。', 'I can send the invitation by email. 表示我可以用电子邮件发送邀请。'),
    sortInto('把联系情境分到“即时交谈”或“书面信息或寄送物品”。', ['即时交谈', '书面信息或寄送物品'], [
      { label: 'talk to a friend by phone', categoryIndex: 0 },
      { label: 'see and talk with a friend online', categoryIndex: 0 },
      { label: 'write a letter for a friend to read later', categoryIndex: 1 },
      { label: 'mail a present to a friend', categoryIndex: 1 },
    ], '先判断是否需要直接交谈，再看是否是文字或寄送物品。', '电话和视频通话用于即时交谈；信件和邮寄礼物属于书面信息或寄送物品。'),
    arrange('把词卡排成礼貌询问能否视频通话的问句。', ['call?', 'video', 'a', 'make', 'Can', 'we'], [4, 5, 3, 2, 1, 0], '一般疑问句从 Can 开始，问号放在句末。', '完整问句是 Can we make a video call?'),
  ]),
);

const advancedTask1 = customTask(
  '在对话中选择合适表达',
  '根据对话目的判断是在请求、回答还是提出联系方法，并选择自然礼貌的表达。',
  'companion-03',
  q8([
    choose('A: “Can we talk about the plan now?” B: “___” Which reply fits?', ['Sure. Let’s talk on the phone now.', 'Yes. I am a letter.', 'The phone call is a present.'], 0, '对话要继续讨论计划，选择能开始即时交谈的回答。', 'Let’s talk on the phone now. 直接回应了马上通话的提议。'),
    choose('A: “Could you send the class details by email?” B: “___” Which reply answers clearly?', ['Sure, I can send them by email.', 'Sure, I sends email.', 'Sure, I am send the details.'], 0, '回答要说明是否会按请求用电子邮件发送资料。', 'Sure, I can send them by email. 语法正确，也回应了请求。'),
    pair('把对话问题和合适回答连起来。', [
      ['How can I reach you after school?', 'You can call me.'],
      ['Would you like the trip details in writing?', 'Yes, please send them by email.'],
      ['What are you sending to your grandma?', 'A letter with my holiday news.'],
    ], '根据问题关注的联系方法或内容匹配回答。', '电话、电子邮件和信件分别回应了三个对话问题。'),
    choose('You want to use the contact method your friend prefers. What can you ask?', ['How would you like me to contact you?', 'You prefer me contact?', 'What contact you like?'], 0, '选择语序完整、礼貌询问对方偏好的句子。', 'How would you like me to contact you? 自然地询问对方希望用什么方式联系。'),
    choose('A friend asks, “Could you send me a short message after school?” Which reply is clear and polite?', ['Sure, I can send one.', 'Sure, I message one.', 'Yes, I am.'], 0, '回答应接受请求，并说明可以发送信息。', 'Sure, I can send one. 自然地答应发送一条简短信息。'),
    choose('A friend asks how you can tell them something quickly. You prefer a phone conversation. What can you say?', ['You can call me.', 'I can mail a present.', 'I can write a letter next month.'], 0, '根据“快速通话”的需要选择合适方法。', 'You can call me. 符合希望马上用电话交谈的情境。'),
    sortInto('把句子分到“询问或确认联系方法”或“提供联系方法”。', ['询问或确认联系方法', '提供联系方法'], [
      { label: 'How can I contact you?', categoryIndex: 0 },
      { label: 'Would you like an email?', categoryIndex: 0 },
      { label: 'You can call me after school.', categoryIndex: 1 },
      { label: 'I can send you a short message.', categoryIndex: 1 },
    ], '问号句在询问或确认；陈述句在提供一种方式。', '前两句询问对方的联系偏好，后两句提出可以采用的方式。'),
    arrange('按询问需要、回答、确认安排、致谢的顺序整理对话。', [
      'How would you like me to send the details?',
      'Please send them by email.',
      'Okay, I can do that.',
      'Thanks.',
    ], [0, 1, 2, 3], '先问方法，再回答；随后确认执行，最后致谢。', '对话依次询问发送方式、提出请求、确认安排并致谢。'),
  ]),
);

const advancedTask2 = customTask(
  '阅读便笺并准确转述',
  '从题面提供的原创便笺提取联系方式和时间，只转述材料明确写出的内容。',
  'companion-04',
  q8([
    choose('A note says, “Please call me after school.” What method does the writer suggest?', ['Make a phone call.', 'Send an email.', 'Write a letter.'], 0, '从便笺中找出明确提到的联系方法。', '便笺请读者放学后打电话。'),
    choose('A note says, “I will send you a short message before 5 p.m.” What will be sent?', ['A short message.', 'A letter.', 'A present.'], 0, '找出便笺中写明要发送的内容。', '便笺说写信人会在下午五点前发送一条简短信息。'),
    choose('A note says, “Send the class plan by email.” Which summary matches it?', ['Send the class plan by email.', 'Call the class to read the plan.', 'Mail a present to the class.'], 0, '保留便笺中的资料和联系方式。', '便笺要求用电子邮件发送班级计划。'),
    pair('把便笺内容和其中明确写出的信息连起来。', [
      ['“Call me after school.”', '放学后打电话'],
      ['“I’ll email the class plan tonight.”', '今晚用电子邮件发送班级计划'],
      ['“I’ll send a short message now.”', '现在发送一条简短信息'],
    ], '在每条便笺中找出方法和时间线索。', '三条记录分别写明放学后通话、今晚发邮件和现在发简讯。'),
    choose('A note reads, “I will write a letter this weekend.” Which summary keeps both the method and time?', ['The writer plans to write a letter this weekend.', 'The writer will send an email next week.', 'The writer will make a phone call tonight.'], 0, '核对摘要是否保留便笺里的方式和时间。', '原便笺写明本周末写信；另外两项改变了方法或时间。'),
    sortInto('便笺写着：“After dinner, I will send a short message. At the weekend, I will write a letter.”把信息分到“便笺写明”或“便笺未提”。', ['便笺写明', '便笺未提'], [
      { label: 'send a short message after dinner', categoryIndex: 0 },
      { label: 'write a letter at the weekend', categoryIndex: 0 },
      { label: 'make a video call after dinner', categoryIndex: 1 },
      { label: 'mail a present at the weekend', categoryIndex: 1 },
    ], '只按这条便笺分类，不要根据日常习惯补充信息。', '便笺明确提到饭后发简讯、周末写信，没有提到视频通话或邮寄礼物。'),
    choose('A note says, “I’ll call you after class.” What can you report?', ['The writer plans a phone call after class.', 'The call will last ten minutes.', 'The writer will call every day.'], 0, '只概括便笺明确给出的联系方法和时间。', '便笺说明放学后打电话，没有说明通话时长或是否每天都打。'),
    arrange('把词卡排成便笺中的完整句子：“I will send an email.”', ['email.', 'an', 'send', 'will', 'I'], [4, 3, 2, 1, 0], '先放主语，再放 will 和动词短语。', '完整句子是 “I will send an email.”'),
  ]),
);

const highTask1 = customTask(
  '按多个条件选择联系方法',
  '综合联系速度、媒介和沟通目的等条件比较方案，并检查行动是否满足全部要求。',
  'companion-01',
  q8([
    choose('A classmate needs to send one very short written message now. Which method fits all three requirements?', ['Send a short message.', 'Make a phone call.', 'Mail a present.'], 0, '核对内容长度、文字媒介和发送时间三个条件。', 'send a short message 符合“简短、书面、现在发送”三个条件。'),
    choose('A student needs to see and speak with a cousin online right now. Which method fits both needs?', ['Make a video call.', 'Send an email.', 'Mail a letter.'], 0, '同时满足线上看到对方和即时交谈的需要。', '视频通话能让双方在线看到并交谈。'),
    choose('A project asks for a spoken question now and a written copy later. Which pair of actions matches both parts?', ['Make a phone call now and send an email later.', 'Write a letter now and mail a present later.', 'Send an email now and make a video call later.'], 0, '分别核对现在要口头提问、之后要书面副本这两个要求。', '电话适合现在口头提问，稍后用电子邮件发送书面副本。'),
    pair('把具体沟通需要和最合适的方法连起来。', [
      ['马上和朋友直接交谈', 'make a phone call'],
      ['用电脑发送一份文字计划', 'send an email'],
      ['写一封纸质信件给朋友', 'write a letter'],
    ], '注意每种需要要求的是直接交谈、电子文字还是纸质信件。', '电话对应直接交谈，电子邮件对应电子文字，信件对应纸质消息。'),
    choose('Your class must send a timetable today, let everyone read it later, and collect written replies. Which plan meets all three requirements?', ['Email the timetable and ask classmates to reply by email.', 'Call one classmate and ask everyone to remember the times.', 'Mail a paper copy next month and ask for phone calls.'], 0, '检查方案是否同时满足发送时间、可读内容和书面回复。', '电子邮件能发送可重复查看的时间表，也能收集书面回复。'),
    choose('Your group needs to see and speak with a partner online today. Which plan meets both requirements?', ['Make a video call today.', 'Send a letter next week.', 'Mail a present today.'], 0, '同时核对线上交流、看到对方和今天进行这几个条件。', '视频通话能在线看到并交谈，今天即可进行。'),
    sortInto('班级的要求是：午饭前用电子邮件发送文字时间表，并请同学用邮件回复。把方案分到“满足全部要求”或“至少漏掉一项”。', ['满足全部要求', '至少漏掉一项'], [
      { label: 'Email the timetable before lunch and ask for email replies.', categoryIndex: 0 },
      { label: 'Call everyone before lunch and ask for email replies.', categoryIndex: 1 },
      { label: 'Email the timetable after lunch and ask for email replies.', categoryIndex: 1 },
      { label: 'Email the timetable before lunch but do not ask for replies.', categoryIndex: 1 },
    ], '逐项核对时间、文字发送方式和回复要求。', '只有第一项同时满足午饭前、邮件发送时间表和邮件回复三个要求。'),
    arrange('按发送前的先后步骤整理班级邮件计划。', [
      'First, list the details classmates need.',
      'Next, write the timetable in the email.',
      'Then, ask for written replies.',
      'Finally, check the message before sending it.',
    ], [0, 1, 2, 3], '依照 First、Next、Then、Finally 的顺序词排列。', '先确定资料，再写入邮件、提出回复要求，最后检查邮件。'),
  ]),
);

const highTask2 = customTask(
  '核对卡片表达并继续交流',
  '检查联系方法卡片的语法和中英文对应，随后用合适的问题邀请同伴继续交流。',
  'companion-02',
  q8([
    choose('A card says, “This card about the phrase ‘make a video call.’” Which edit makes the sentence complete and correct?', ['This card is about the phrase “make a video call.”', 'This card are about the phrase “make a video call.”', 'This card about the phrase “make a video call.”'], 0, 'This card 是单数主语，需要 be 动词 is。', 'This card is about ... 是主语、be 动词和介词短语齐全的句子。'),
    choose('A word card shows “mail a present — 邮寄礼物.” Which copy keeps the English and Chinese meanings matched?', ['mail a present — 邮寄礼物', 'mail a present — 写信', 'send an email — 邮寄礼物'], 0, '逐项核对英文表达和中文意思是否对应。', 'mail a present 表示邮寄礼物，另外两项把表达或意思错配了。'),
    choose('Before sharing a contact card, which check helps catch a translation mistake?', ['Compare each English expression with its Chinese meaning.', 'Change the English spelling to match the Chinese characters.', 'Share the card without reading it.'], 0, '先检查表达和译文是否对应，再分享卡片。', '对照英文和中文意思可以发现词义错配。'),
    choose('After you explain a contact phrase, invite your partner to ask a question. What can you say?', ['What would you like to know?', 'The card is ready.', 'I know the phrase.'], 0, '选择一个开放问句，让同伴决定接下来想了解什么。', 'What would you like to know? 邀请同伴提出自己想问的问题。'),
    choose('A card pairs “write a letter” with “写信.” Which sentence reports its information accurately?', ['The phrase “write a letter” means “写信.”', 'The phrase “write a letter” means “打电话.”', 'The phrase “make a phone call” means “写信.”'], 0, '保留卡片上的英文短语和正确中文意思。', 'write a letter 表示写信。'),
    choose('Your partner wants to continue after you explain a phrase. Which question lets them choose what to ask?', ['What would you like to know?', 'The card is blue.', 'I know a phrase.'], 0, '用开放问题邀请对方选择接下来的话题。', 'What would you like to know? 把接下来要问什么交给同伴选择。'),
    sortInto('把句子分到“报告卡片内容”或“邀请继续交流”。', ['报告卡片内容', '邀请继续交流'], [
      { label: 'The card says “write a letter” means “写信.”', categoryIndex: 0 },
      { label: 'This phrase means “make a phone call.”', categoryIndex: 0 },
      { label: 'What would you like to know?', categoryIndex: 1 },
      { label: 'Can I help you with the card?', categoryIndex: 1 },
    ], '判断句子是在陈述词义，还是在邀请对方继续提问。', '前两句报告词义，后两句邀请同伴继续交流。'),
    arrange('把词卡排成“这张卡片已经准备好了”。', ['ready', 'card', 'The', 'is', '.'], [2, 1, 3, 0, 4], '先排主语，再放 be 动词和形容词。', '完整句子是 “The card is ready.”'),
  ]),
);

export const unit = buildEnglishUnit({
  grade: 5,
  term: 2,
  formalUnitNumber: 3,
  entryId: 'unit-03',
  title: 'Unit 3 · Making Contact',
  sourceTopics: [
    '联系与沟通方式；选择合适的方式发邮件、写信或打电话。',
    '练习围绕目录主题设计原创词卡、问答、信息核对和简短表达；核心词卡已与固定快照附录单元词表对照；教材正文未逐页核对；扩展词不宣称来自原文。',
  ],
  basicTasks: [
    makeTask('认读与辨析主题词', '认读本主题的核心词汇，准确辨认英文形式和中文意思。', 'companion-01', profile1),
    basicTask2,
  ],
  advancedTasks: [
    advancedTask1,
    advancedTask2,
  ],
  highTasks: [
    highTask1,
    highTask2,
  ],
});
