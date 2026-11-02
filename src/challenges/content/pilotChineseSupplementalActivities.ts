import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type ChineseKnowledgePointId =
  | 'object-and-emotion'
  | 'reading-evidence'
  | 'class-charter'
  | 'beloved-object-writing';

export interface ChineseSupplementalChallengeActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: ChineseKnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface ChineseChoiceDraft {
  knowledgePointIds: ChineseKnowledgePointId[];
  prompt: string;
  options: [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-5/term-1/chinese/unit-01';

const drafts: Record<Difficulty, ChineseChoiceDraft[]> = {
  basic: [
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '《白鹭》写到羽色、身形和几种活动姿态，这些细节合在一起最能支持哪种感受？', options: ['白鹭的外形与姿态显得和谐美', '作者在记录白鹭每天吃多少食物', '课文重点介绍训练白鹭的方法'], correctOptionIndex: 0, hint: '把外形描写和活动画面放在一起体会。', explanation: '羽色、身形与姿态共同呈现白鹭的美；题目没有涉及食量或训练。' },
    { knowledgePointIds: ['object-and-emotion'], prompt: '读《落花生》时，一家人谈论这种普通食物，后来主要引出了什么？', options: ['关于做人和价值的思考', '一份花生种植产量报告', '一次到远方旅行的安排'], correctOptionIndex: 0, hint: '留意谈话从食物特点转向了什么话题。', explanation: '一家人的谈话由花生特点引向做人和价值，体现借具体事物表达思考。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '《桂花雨》中的桂花香和童年摇花经历，怎样联系在一起？', options: ['熟悉的香气牵起对童年与故乡的回忆', '香气说明作者正在学习种植技术', '摇花经历用来比较不同天气'], correctOptionIndex: 0, hint: '想想作者离开家乡后，什么经历仍会被桂花香唤起。', explanation: '桂花香与童年摇花经历相连，带出作者对故乡生活的怀念。' },
    { knowledgePointIds: ['object-and-emotion'], prompt: '《珍珠鸟》记录小鸟从谨慎到逐渐亲近人的过程，最适合说明什么？', options: ['信赖会在安静、耐心的相处中慢慢建立', '只要第一次见面，小鸟就一定不会害怕', '小鸟亲近人是因为不断被追赶'], correctOptionIndex: 0, hint: '把“我”的相处方式和小鸟的变化连起来看。', explanation: '小鸟逐步亲近与“我”保持安静、耐心相处有关；追赶会惊扰它。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '读借具体事物表达感受的文章，哪种做法能让理解更有根据？', options: ['先找事物描写，再联系上下文体会感受', '只看标题就断定作者的全部想法', '把自己的经历当成文章写明的事实'], correctOptionIndex: 0, hint: '判断要能从文中的描写线索找到依据。', explanation: '把事物描写与上下文联系起来，能让感受建立在文章线索上。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '阅读一段描写时，哪项最适合作为解释作者感受的证据？', options: ['文中反复出现的动作、声音或气味细节', '读者没有在文中看到的个人猜测', '与描写内容无关的作者年龄'], correctOptionIndex: 0, hint: '选择能在原文中找到并核对的内容。', explanation: '具体描写是可以回到文章核对的线索；个人猜测或无关信息不能证明感受。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '语文园地积累《蝉》时，理解诗意可以先做什么？', options: ['从诗句中找出蝉的特点，再联系表达意味', '把诗句改成花木养护说明', '不看诗句就给诗人安排一段经历'], correctOptionIndex: 0, hint: '先留意诗里写到的事物和特点。', explanation: '从诗句描写的事物特点出发，再体会表达意味，判断更有文本依据。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '遇到“温和”这样的词语，哪种办法能帮助判断它在句中的意思？', options: ['联系前后句和具体情境来理解', '只凭自己最熟悉的一种用法决定', '跳过句子，只统计词语出现次数'], correctOptionIndex: 0, hint: '同一个词要放回它所在的语境中理解。', explanation: '前后内容和具体情境能帮助确定“温和”在句中的合适意思。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '比较两篇文章时，哪种说法更可靠？', options: ['指出两篇各自的描写线索，再说明相同或不同', '只说一篇更好，不提供任何理由', '把一篇文章的内容当成另一篇的事实'], correctOptionIndex: 0, hint: '比较结论要能对应到两篇各自的内容。', explanation: '先指出具体线索再比较，能让结论清楚且可核对。' },
    { knowledgePointIds: ['class-charter'], prompt: '制定班级公约时，哪一步最有助于让规则回应大家的共同需要？', options: ['先交流班级遇到的问题，再讨论可行约定', '由一个人直接决定所有条目', '只写听起来响亮但无法执行的口号'], correctOptionIndex: 0, hint: '公约要从共同目标和实际问题出发。', explanation: '先交流实际问题，再共同讨论，能让规则回应班级需要。' },
    { knowledgePointIds: ['class-charter'], prompt: '制定班级公约时，“大家要爱护图书角”还不够具体，哪条补充更便于执行？', options: ['借阅后把书放回标记清楚的位置', '每个人任何时候都要表现最好', '希望图书角一直让人觉得很棒'], correctOptionIndex: 0, hint: '把愿望写成看得见的行动。', explanation: '“借阅后放回指定位置”说明了行动和时机，其他表述仍然笼统。' },
    { knowledgePointIds: ['class-charter'], prompt: '小组成员对值日时间有不同意见，怎样讨论更合适？', options: ['先听各自理由，再围绕班级安排商量方案', '不听理由，要求一位同学马上接受', '把互相冲突的两种安排都写进公约'], correctOptionIndex: 0, hint: '倾听理由后，再检查方案能否一起实行。', explanation: '听取理由并围绕共同安排商量，能处理分歧；冲突规则无法同时执行。' },
    { knowledgePointIds: ['beloved-object-writing'], prompt: '写“我的心爱之物”时，哪种材料最能让读者明白它为何珍贵？', options: ['物品的一个特点和一段与它有关的经历', '只反复写“我特别喜欢它”', '列出所有同学拥有的物品名称'], correctOptionIndex: 0, hint: '让喜爱有具体观察或回忆作为依据。', explanation: '特点与经历能具体说明物品对自己的意义；重复评价或列清单不能说明珍贵原因。' },
    { knowledgePointIds: ['beloved-object-writing'], prompt: '习作中写到一只旧书签，读者还不知道它为什么特别，补充什么最有效？', options: ['讲一件书签陪伴自己的具体经历', '再增加几个表示“很旧”的词', '改写成介绍书签制作材料'], correctOptionIndex: 0, hint: '补上物品和个人生活之间的联系。', explanation: '具体经历可以说明书签为何对作者有意义；单写外观或材料仍未解释感情。' },
  ],
  advanced: [
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '一段原创描写写道：“窗边的薄荷在雨后舒展开叶片，清新的气味留在屋里。”这类具体事物描写支持哪种稳妥理解？', options: ['作者留意到薄荷的变化，更多感受还要结合上下文', '可以断定作者因此决定搬到乡下生活', '这段话证明薄荷最适合在所有房间种植'], correctOptionIndex: 0, hint: '区分描写直接支持的内容和文章没有交代的推断。', explanation: '句子直接写到雨后变化和气味；搬家决定或普遍种植结论都超出了证据。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '同学比较《桂花雨》和《白鹭》，哪种比较方法更贴近单元阅读目标？', options: ['分别指出桂花引出回忆、白鹭姿态带来审美感受的线索', '只比较两篇标题的字数', '认为两篇都写了植物，所以表达的感情完全相同'], correctOptionIndex: 0, hint: '比较事物描写如何服务于不同表达。', explanation: '桂花与童年、故乡回忆相连，白鹭描写突出其姿态之美；仅比较字数或把感受说成相同都不充分。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '读《珍珠鸟》时，有人说“小鸟一开始就完全信任人”。怎样检查这个判断？', options: ['回看小鸟从谨慎到靠近的前后变化', '只看文章最后一句，不核对过程', '把读者希望发生的情节补进文章'], correctOptionIndex: 0, hint: '注意同一事物在文章不同阶段的表现。', explanation: '小鸟行为有变化，回看前后过程才能判断信赖如何建立。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '读《落花生》后，哪种概括既提到具体事物，也没有把文章意思说得过头？哪项最有文本依据？', options: ['一家人由花生特点谈到做人的思考', '文章说明所有外表普通的东西都比其他东西更好', '文章给出了种植花生的完整操作手册'], correctOptionIndex: 0, hint: '让概括同时照顾谈话内容和它引出的思考。', explanation: '课文借一家人谈花生引出做人的思考；绝对化比较和种植手册都超出主题。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '一段原创文字写：“木盒边角已经磨亮，奶奶每年冬天都把我寄来的卡片收在里面。”哪项判断可以直接从文字中确认？', options: ['奶奶每年冬天会把“我”寄来的卡片放进木盒', '奶奶每天都会把卡片拿出来读一遍', '作者经常陪奶奶一起旅行'], correctOptionIndex: 0, hint: '只选择句子已经交代的时间、人物和行动。', explanation: '文字直接写明奶奶每年冬天收存寄来的卡片；没有说明她每天读卡片或作者陪她旅行。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '理解一个词语时，字典义和句中语境似乎不完全一致，接下来怎么做？', options: ['结合前后句检查哪种解释能讲通整段内容', '只保留第一个想到的意思，不看上下文', '把词语换成任意近义词，不检查句子'], correctOptionIndex: 0, hint: '检验解释能否与周围内容连贯。', explanation: '把候选意思放回前后句检查，能避免脱离语境地选词义。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '两名读者对一处描写有不同感受，怎样交流更有帮助？', options: ['各自指出支持感受的描写，再比较依据', '把个人感受当作唯一正确答案', '不再阅读文本，只投票决定谁对'], correctOptionIndex: 0, hint: '交流时把感受和文本线索对应起来。', explanation: '指出描写依据后比较，能让不同理解回到文本；投票不能代替证据。' },
    { knowledgePointIds: ['class-charter'], prompt: '小组收集到三条相近的图书管理建议，怎样整理更适合写进班级公约？', options: ['讨论后合并重复意思，保留一条清楚可做的约定', '把三条原样重复写入，让条目越多越好', '不再讨论，把所有建议都删掉'], correctOptionIndex: 0, hint: '先看建议是否表达同一件事，再整理表述。', explanation: '合并意思相近的建议能避免重复，同时保留清晰、可执行的规则。' },
    { knowledgePointIds: ['class-charter'], prompt: '班级公约试行后，大家发现一条值日安排常常做不到，怎样处理更合理？', options: ['听取遇到的困难，再讨论如何调整做法', '把问题都归咎于同学不认真，不再交流', '不说明原因就取消整份公约'], correctOptionIndex: 0, hint: '把执行中的真实困难作为再次讨论的依据。', explanation: '听取困难并调整规则有助于让公约更可行；责怪或全部取消都没有解决具体问题。' },
    { knowledgePointIds: ['class-charter'], prompt: '班级讨论“课间怎样保持通道畅通”，哪项建议最容易检查是否做到？', options: ['课间不在通道摆放书包，离开座位前把物品收好', '大家要一直成为最有秩序的班级', '每个人都应该尽量注意一些'], correctOptionIndex: 0, hint: '选择能观察到具体时间和行动的约定。', explanation: '明确课间、通道和收好物品，便于大家照做和检查；其余说法缺少具体行动。' },
    { knowledgePointIds: ['beloved-object-writing'], prompt: '习作写“我喜欢一只陶杯”，哪种组织顺序更能让感情自然出现？', options: ['先写外形，再写一次共同经历，最后写这段经历带来的感受', '先列出陶杯的所有制作工序，再突然评价它很珍贵', '开头和结尾重复同一句“我喜欢陶杯”'], correctOptionIndex: 0, hint: '让具体描写和经历逐步带出感情。', explanation: '外形、经历和感受相连，读者能看出珍贵的原因；工序堆叠或重复评价缺少联系。' },
    { knowledgePointIds: ['beloved-object-writing', 'reading-evidence'], prompt: '一篇心爱之物习作写了许多外观，却没有说明作者为何珍惜它。怎样修改更有效？', options: ['删减重复外形，补上一件能说明意义的经历', '再加一整段颜色和大小的重复描写', '把个人经历全部删去，只写物品名称'], correctOptionIndex: 0, hint: '检查材料是否解释了“为什么珍惜”。', explanation: '精简重复描写并补充相关经历，能把物品特点和个人感情连起来。' },
    { knowledgePointIds: ['beloved-object-writing', 'reading-evidence'], prompt: '同学写：“我最珍惜这张车票，因为那天我第一次独自完成了旅行。”哪项评价最有依据？', options: ['具体经历说明了车票为什么对作者有意义', '车票一定具有很高的收藏价格', '每个人都会因为同一件事珍惜车票'], correctOptionIndex: 0, hint: '依据作者写出的经历评价表达效果。', explanation: '句子直接说明车票与一次独自旅行相连；价格和所有人的感受都没有依据。' },
    { knowledgePointIds: ['beloved-object-writing'], prompt: '给习作结尾做修改，哪种写法更能回到心爱之物并收住感情？', options: ['再次写到物品带来的具体回忆，简要说出自己的珍惜', '另起话题介绍一种完全无关的新物品', '用“它最好，大家都要喜欢”替代个人感受'], correctOptionIndex: 0, hint: '结尾应和前文的物品、经历保持联系。', explanation: '回到前文的物品和回忆，可以自然收束表达；新话题或替所有人下结论都不合适。' },
  ],
  high: [
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '一段原创文字先写“雨停后，石阶缝里冒出新芽”，再写“我想起去年一起种下它的人”。这类具体事物描写怎样引出回忆？', options: ['新芽的变化引出共同经历，描写和回忆之间有明确联系', '新芽证明作者熟悉所有植物的生长规律', '这段文字只能说明石阶需要重新铺设'], correctOptionIndex: 0, hint: '把眼前事物和随后出现的回忆联系起来。', explanation: '新芽是眼前线索，共同种植是回忆，两者形成具体事物带出感情的联系。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '比较《白鹭》《桂花雨》时，哪项结论同时尊重了两篇的描写重点？', options: ['前者从姿态写出白鹭之美，后者借桂花和童年经历牵起乡愁', '两篇都只是在说明怎样照料植物', '两篇表达的内容完全相同，因为都出现了自然事物'], correctOptionIndex: 0, hint: '分别回到每篇反复描写的事物和经历。', explanation: '白鹭的姿态与桂花引出的童年、故乡回忆作用不同；不能因都写自然事物就认定主题相同。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '一位读者认为《珍珠鸟》强调“立刻让小鸟服从人的安排”。哪条检查路径最能判断这句话是否有依据？', options: ['梳理小鸟从谨慎到靠近的行为和“我”的相处方式', '只寻找文中出现次数最多的动物名称', '把自己对训鸟的看法当成课文内容'], correctOptionIndex: 0, hint: '用行为变化和相应描写检验概括。', explanation: '行为变化与相处方式能检验概括；词语次数或个人看法不能替代内容证据。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '读《落花生》后，有人把感受概括成“外表普通的事物一定比其他事物更好”。哪种修正最有文本依据？', options: ['回到一家人的谈话，说明花生特点怎样引出做人的思考', '保留“一定更好”，因为绝对说法更有力量', '删去花生和谈话，只写读者自己的生活经验'], correctOptionIndex: 0, hint: '让概括贴近谈话线索，不把意思扩大成绝对判断。', explanation: '回到谈话及其引出的思考，能避免把课文意思扩展成绝对比较。' },
    { knowledgePointIds: ['object-and-emotion', 'reading-evidence'], prompt: '原创片段写：“旧围巾被补了两次，边角仍留着旅行时沾上的一小片蓝色颜料。”哪项解释最符合这件具体事物的现有线索？', options: ['围巾的修补痕迹和颜料可能让叙述者想起相关经历', '颜料证明这条围巾来自海边商店', '围巾每次旅行都会变成蓝色'], correctOptionIndex: 0, hint: '区分可以合理推测的回忆线索和没有写出的事实。', explanation: '修补痕迹与颜料可以成为经历的线索，但地点和每次变化都没有交代。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '一段描写中有两处细节都能支持读者的理解，怎样写分析更充分？', options: ['指出两处细节各自说明什么，再解释它们如何共同支持结论', '只重述结论，不提任何细节', '加入与文章无关的猜想来增加篇幅'], correctOptionIndex: 0, hint: '让“结论—证据—说明”之间的关系清楚。', explanation: '说明每处细节的作用并联系结论，能让分析有完整依据。' },
    { knowledgePointIds: ['reading-evidence'], prompt: '诗句中的事物特点可以帮助理解表达意味。哪种做法最稳妥？', options: ['先读清描写，再用诗句支持自己的理解', '先确定结论，再只挑看起来相似的字', '把其他文章的意思直接当成这首诗的意思'], correctOptionIndex: 0, hint: '解释要从本首诗实际写到的内容出发。', explanation: '先读清诗句再说明理解，避免先入为主或挪用其他文章的意思。' },
    { knowledgePointIds: ['class-charter'], prompt: '班级要制定“借阅后整理图书”的公约，两组建议部分重叠、部分不同。怎样形成较好的最终条目？', options: ['先听清不同需要，合并重复部分，再写成大家能执行的步骤', '把所有建议原样相加，不检查冲突和重复', '只选提出建议最多的小组，不讨论内容'], correctOptionIndex: 0, hint: '兼顾倾听、整理重复和可执行性。', explanation: '先理解需要、合并重复并明确行动，能把不同意见整理成可执行约定。' },
    { knowledgePointIds: ['class-charter'], prompt: '公约试行后，一条规则与实际课间安排冲突。哪种调整过程更尊重共同目标？', options: ['说明冲突情况，听取受影响同学意见，再讨论可行的新做法', '要求大家继续照做，不解释冲突', '认为规则写下后永远不能讨论'], correctOptionIndex: 0, hint: '规则要服务于班级生活，实施反馈可以帮助改进。', explanation: '说明问题、倾听意见并重新讨论，能在保留共同目标的同时改进做法。' },
    { knowledgePointIds: ['class-charter'], prompt: '制定班级安全公约时，要把“课间活动注意安全”改写为更具体的约定，哪项最清楚？', options: ['课间在走廊慢行，不追逐；发现通道有物品时及时提醒整理', '每个人每天都要更加安全一些', '希望所有活动永远没有任何问题'], correctOptionIndex: 0, hint: '具体约定要写出可以观察的行动。', explanation: '慢行、不追逐和整理通道都是可观察的行动；另外两项仍是笼统愿望。' },
    { knowledgePointIds: ['beloved-object-writing', 'reading-evidence'], prompt: '心爱之物习作已有外形描写和一段回忆，但两部分衔接突然。怎样修改最能改善表达？', options: ['补一句说明某个外形细节怎样让作者想起这段回忆', '删掉全部回忆，只留下颜色和形状', '增加一串与物品无关的形容词'], correctOptionIndex: 0, hint: '让描写细节成为进入回忆的自然线索。', explanation: '补出细节与回忆之间的联系，能让材料和感情自然衔接。' },
    { knowledgePointIds: ['beloved-object-writing', 'reading-evidence'], prompt: '心爱之物习作写“这本旧笔记很重要”，随后只介绍了纸张颜色。还缺少哪类具体依据最能支持“重要”？', options: ['一件能说明笔记与作者生活关系的具体经历', '更多同类颜色名称的列表', '其他品牌笔记本的售价'], correctOptionIndex: 0, hint: '用经历解释评价，而不是继续堆叠外观信息。', explanation: '具体经历可以说明笔记对作者的意义；颜色和售价不能证明个人珍惜的原因。' },
    { knowledgePointIds: ['beloved-object-writing', 'reading-evidence'], prompt: '修改“我的小船模型最特别”这句话，怎样让心爱之物习作更有说服力？', options: ['补充模型的独特细节，并写一件制作或使用它的经历', '把“最特别”换成“非常非常特别”', '直接写所有人都认为它最特别'], correctOptionIndex: 0, hint: '选择读者能想象的细节和与自己有关的经历。', explanation: '细节和个人经历为评价提供依据；加强语气或代替所有人表态不能增强说服力。' },
    { knowledgePointIds: ['object-and-emotion', 'beloved-object-writing'], prompt: '想把一把陪伴多年的伞写成自己的心爱之物，哪种构思最能体现“借具体事物表达感情”？', options: ['选一处使用痕迹和一次雨中的经历，说明它们牵起的感受', '只列出伞的尺寸、颜色和购买价格', '先写“我很感动”，再添加无关的旅行景点'], correctOptionIndex: 0, hint: '让物品特点、亲身经历和感受互相支撑。', explanation: '使用痕迹和经历能把伞与个人感受联系起来；规格清单或无关内容无法完成这种表达。' },
  ],
};

export const pilotChineseSupplementalActivities: ChineseSupplementalChallengeActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const activity: ChoiceActivityDefinition = {
      id: `challenge-supplement-grade-5-term-1-chinese-unit-01-${difficulty}-${String(index + 1).padStart(2, '0')}`,
      kind: 'choice',
      prompt: draft.prompt,
      options: draft.options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
      correctOptionId: `option-${draft.correctOptionIndex + 1}`,
      hint: draft.hint,
      explanation: draft.explanation,
    };
    return {
      difficulty: difficulty as Difficulty,
      sourceUnitId,
      knowledgePointIds: [...draft.knowledgePointIds],
      activity,
    };
  })
));
