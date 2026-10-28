import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit05SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/chinese/unit-05';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-05';
const fable = 'fable-action-consequence';
const evidence = 'evidence-based-interpretation';
const perspective = 'perspective-and-description';
const information = 'information-source-comparison';
const safety = 'safe-decision-making';
const reflection = 'reflective-revision';

export const grade2Term2ChineseUnit05CoreKnowledgePointIds = [
  fable,
  evidence,
  perspective,
  information,
  safety,
  reflection,
] as const;

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [fable, evidence], prompt: '《揠苗助长》里的人急着让禾苗长高，最后禾苗怎样了？', answer: '禾苗受到损伤，后来枯萎了', distractors: ['禾苗只是暂时歪倒，后来自己挺直', '禾苗没有受伤，反而长高了一些'], hint: '回想拔高禾苗后出现的结果。', explanation: '用力拔高禾苗会伤到它，故事结尾是禾苗枯萎了。' },
    { knowledgePointIds: [fable, reflection], prompt: '发现羊圈有一处破损，及时修好后还可以做什么？', answer: '再检查其他地方是否也需要修补', distractors: ['不再看羊圈，直接认定不会有问题', '把修补工具放在破损处不收好'], hint: '修好一处后，再看看问题是否都处理到了。', explanation: '修补后检查其他地方，能确认羊圈是否还有漏洞。' },
    { knowledgePointIds: [evidence], prompt: '小组只观察了一株植物，哪种说法最符合这次观察的范围？', answer: '这株植物最近长高了一些', distractors: ['所有植物都会用同样的速度长高', '以后每株植物都不会遇到问题'], hint: '只观察了一株，就先说这一株的情况。', explanation: '一次观察只能说明这株植物的变化，不能代表所有植物。' },
    { knowledgePointIds: [perspective, evidence], prompt: '两位同学从画的不同方向看，描述的外形不一样。哪种想法最合理？', answer: '先了解他们分别站在哪里，再比较看到的部分', distractors: ['马上认定其中一位没有认真看', '要求两人只保留同一个描述'], hint: '看看观察位置是否相同。', explanation: '观察位置不同，看到的轮廓可能不同；先比较位置和画面更有依据。' },
    { knowledgePointIds: [information, safety], prompt: '有人说河边的小路安全，另一个人说那里水流很快。孩子接下来怎样做？', answer: '留在安全地点，把情况告诉可信任的成人并一起确认', distractors: ['不再查看就独自走到水边', '只听听起来更勇敢的那种说法'], hint: '有不同信息时先停下，安全地找人核实。', explanation: '留在安全处并请成人确认，比自行靠近水边更稳妥。' },
    { knowledgePointIds: [information], prompt: '“我看见水面有波纹”和“伙伴说水很浅”分别来自什么？', answer: '前一句是亲自观察，后一句是听来的说法', distractors: ['两句都是亲自观察', '两句都只是自己的猜想'], hint: '分清自己看到的和别人告诉你的。', explanation: '看到波纹是直接观察；伙伴说水浅属于转述信息，还需要核实。' },
    { knowledgePointIds: [safety], prompt: '河水看起来流得很快，儿童最安全的做法是什么？', answer: '停在远离水边的安全处，马上找成人帮助', distractors: ['自己下水试一试深浅', '沿着湿滑石头快速跑过去'], hint: '不要独自接近或进入不熟悉的水域。', explanation: '快速水流有危险，留在安全处并告知成人才合适。' },
    { knowledgePointIds: [fable, evidence], prompt: '一件事先出现困难，角色后来修补了破损。要理解故事结果，还要留意什么？', answer: '修补后问题是否减少或再次出现', distractors: ['角色衣服的颜色有没有变化', '故事里一共用了几种标点'], hint: '把行动和行动之后发生的事连起来。', explanation: '修补是行动，之后问题是否减少能说明这项行动带来的结果。' },
    { knowledgePointIds: [evidence, perspective], prompt: '哪句话只描述了画纸上能看见的内容？', answer: '画纸上画着一个黄色的圆形', distractors: ['画这幅画的人一定不喜欢蓝色', '所有人都会觉得这个圆形最好看'], hint: '找不需要猜作者心情或别人想法的说法。', explanation: '黄色圆形是画纸上可见的内容；另外两句是在猜测或概括别人的想法。' },
    { knowledgePointIds: [reflection, fable], prompt: '按时照料的植物看起来还是有些低垂，下一步怎样做更合适？', answer: '再观察土壤和叶片，并请懂得照料植物的人一起判断', distractors: ['用力拉植物的茎，让它马上变高', '不看情况就连续浇很多水'], hint: '先找线索，再决定是否需要调整照料办法。', explanation: '观察植物和土壤后再作调整，比强拉或盲目浇水更稳妥。' },
    { knowledgePointIds: [perspective, evidence], prompt: '两人对同一幅画有不同描述，怎样让讨论更清楚？', answer: '说出各自观察的位置和看到的部分', distractors: ['只重复自己的答案，不说明在哪里看', '把不同描述都改成完全相同的话'], hint: '把观察位置和描述一起说出来。', explanation: '位置和看到的部分能帮助伙伴理解描述为什么不同。' },
    { knowledgePointIds: [reflection], prompt: '发现自己漏做了一步，哪种做法最能帮助下次完成得更好？', answer: '找出漏掉的原因，补做后再检查一遍', distractors: ['把遗漏藏起来，不再提起', '只责怪提醒自己的人'], hint: '把注意力放在原因和能改进的步骤上。', explanation: '找原因、补做并检查，能把错误变成下一次可以使用的经验。' },
    { knowledgePointIds: [reflection, fable], prompt: '复盘一次没有按计划完成的事情，先后怎样安排更清楚？', answer: '回想原目标、找出困难、想一个改进办法，再看结果', distractors: ['先决定自己一定没问题，再停止检查', '先责怪别人，之后不再讨论经过'], hint: '复盘要从目标和实际经过开始。', explanation: '回看目标和困难，再提出改进并检查结果，能形成清楚的复盘过程。' },
    { knowledgePointIds: [fable, evidence], prompt: '哪种说法最能用故事中的行动和结果来说明一个道理？', answer: '急着改变事情却不顾条件，可能带来不好的结果', distractors: ['只要犯错，就说明这个人永远做不好', '故事里的每件事都会在生活中完全一样地发生'], hint: '结论要联系故事经过，也不要说得过于绝对。', explanation: '根据行动与结果总结有限的经验，比责怪人物或把故事扩大到所有情况更有依据。' },
  ],
  advanced: [
    { knowledgePointIds: [fable, evidence], prompt: '一株植物被用力拉过后叶片开始发蔫。哪种结论最符合现在的线索？', answer: '拉扯可能伤到了植物，还可以继续观察其他变化', distractors: ['叶片发蔫只能说明缺水，和拉扯无关', '可以确定所有植物被拉扯后都会立刻枯死'], hint: '把看到的结果和可能原因连起来，结论先不要扩大。', explanation: '拉扯与叶片发蔫可能有关，但还应继续观察，不能排除其他原因或概括所有植物。' },
    { knowledgePointIds: [perspective, evidence], prompt: '想比较同一张画从正面和侧面看起来有什么不同，哪种做法更可靠？', answer: '标出观察位置，请同学分别描述，再对照两份记录', distractors: ['让大家闭眼猜画的形状', '只保留第一位同学的描述，不记位置'], hint: '比较时要知道每份描述来自哪里。', explanation: '记录观察位置并对照描述，能帮助发现角度与画面之间的关系。' },
    { knowledgePointIds: [information, safety], prompt: '去陌生公园时，两个人给了相反的路线建议。哪种计划更稳妥？', answer: '先留在安全的公共地点，查看园区指示并向工作人员或同行成人确认', distractors: ['分开走两条路，看哪一条先到', '选距离听起来较短的路马上出发'], hint: '先核对信息，也要让可信任的成人知道情况。', explanation: '查看指示并请工作人员或成人确认，能减少因听错建议而走错路的风险。' },
    { knowledgePointIds: [information, evidence], prompt: '同学说“我听说那边的水很浅”，还没有亲眼看过。怎样记录这条信息？', answer: '标明这是听来的说法，暂时不把它当作已确认的事实', distractors: ['直接改写成“我看到水很浅”', '因为有人说过，就断定任何时候都安全'], hint: '记录信息来源，别把转述改成自己的观察。', explanation: '说明是听来的信息，能避免把未核实的内容写成亲眼看到的事实。' },
    { knowledgePointIds: [fable, evidence], prompt: '一则寓言讲了某种行动带来不好的结果。总结时怎样让道理有根据？', answer: '指出角色做了什么、结果怎样，再说明自己从中想到的经验', distractors: ['只写一个道理，不提故事经过', '把一个故事的结果说成所有人都会遇到的结果'], hint: '用具体行动和结果支持自己的理解。', explanation: '把行动、结果和自己的理解连起来，也要让结论范围和故事证据相符。' },
    { knowledgePointIds: [reflection, fable], prompt: '修好一个小漏点后，水暂时不再漏。哪一步能帮助确认修补是否有效？', answer: '过一会儿再检查漏点和周围，看看有没有新的水迹', distractors: ['不再检查，马上说以后都不会漏', '把修补处遮住，不让别人看见'], hint: '处理问题后，还要观察后续结果。', explanation: '再次检查漏点和周围变化，能确认目前的修补效果，不作永久保证。' },
    { knowledgePointIds: [safety, information], prompt: '孩子发现自己走错了公园路线，周围没有熟悉的人。下一步怎样做更安全？', answer: '留在显眼的公共地点，联系同行成人或工作人员', distractors: ['继续独自穿过不熟悉的小路', '跟着刚认识的人离开公园'], hint: '不要独自走远，先到容易被找到的地方求助。', explanation: '留在公共地点并联系可信任的成人或工作人员，比独自继续走更安全。' },
    { knowledgePointIds: [evidence, reflection], prompt: '新记录和原来的想法不一样，怎样表现出认真求证？', answer: '把新旧记录放在一起比较，再说明要修改哪一部分想法', distractors: ['删掉与原想法不同的记录', '只保留原来的想法，不再观察'], hint: '比较记录后，再决定结论是否需要调整。', explanation: '比较新旧记录能帮助判断原想法是否仍有支持，并据此作出修正。' },
    { knowledgePointIds: [perspective, evidence], prompt: '两位同学画出的同一只水果看起来不太一样，哪种比较最公平？', answer: '记录两人坐的位置，再从各自的位置看看画面有什么变化', distractors: ['只比较谁画得更像，不看观察位置', '不问原因就把其中一张画判成错误'], hint: '先确认两人的观察条件是否相同。', explanation: '观察位置会影响看到的外形；记录位置后比较，判断会更公平。' },
    { knowledgePointIds: [safety, information], prompt: '有人建议走一条近路，但路牌写着“暂不通行”。应该怎样选择？', answer: '遵守路牌，留在开放路线并向同行成人确认', distractors: ['为了省时间跨过路牌继续走', '只凭近路看起来平坦就进入'], hint: '明确的安全提示要优先遵守。', explanation: '遵守封闭提示并选择开放路线，比猜测近路是否安全更稳妥。' },
    { knowledgePointIds: [evidence, perspective], prompt: '同学说画里的物体“看起来像一个三角形”，怎样让这个描述更有依据？', answer: '说明自己从哪个位置观察，并指出看到的轮廓', distractors: ['说所有人都会看到同一个形状', '只说画得不好，不说明观察到什么'], hint: '把观察位置和实际看到的轮廓一起说。', explanation: '说明位置和轮廓能支持描述，也承认别人可能看到不同画面。' },
    { knowledgePointIds: [reflection, information], prompt: '一次判断后来发现不合适，回想时最有帮助的问题是什么？', answer: '当时依据了哪些信息，后来又发现了什么新线索', distractors: ['谁应该为这次情况负责', '怎样让别人以后不再提出意见'], hint: '回看当时的信息和之后的变化。', explanation: '检查当时的信息与后来发现的线索，能帮助改进判断方法。' },
    { knowledgePointIds: [fable, reflection], prompt: '寓言角色发现原来的办法没有解决问题，怎样续写更体现学习？', answer: '回看结果，找出需要改变的一步，再尝试合适的新办法', distractors: ['重复同一个办法，却不观察结果', '马上宣布问题已经解决，不说明经过'], hint: '让角色根据结果调整行动。', explanation: '回看结果并调整行动，体现角色从经历中学习，而不是假装问题消失。' },
    { knowledgePointIds: [evidence, information], prompt: '三个人对同一条小路有不同说法，哪种整理方式能帮助小组判断？', answer: '写下每种说法来自亲自走过、地图指示还是别人转述', distractors: ['只记下说得最响亮的那个人', '把三种说法混在一起，当作同一条观察'], hint: '比较信息前先标出来源。', explanation: '来源不同，可靠程度和含义也可能不同；分别记录能帮助核对。' },
  ],
  high: [
    { knowledgePointIds: [fable, evidence, reflection], prompt: '小组要创作一个角色发现问题、尝试办法并学会调整的原创寓言，哪份计划最完整？', answer: '先定角色目标和困难，再安排行动与结果，最后让角色回看并调整', distractors: ['先写一个道理，再随意添加互不相连的事情', '让角色一开始就知道所有答案，不经历选择'], hint: '故事需要目标、行动、结果和回顾之间的联系。', explanation: '目标和困难推动选择，结果提供线索，回顾与调整表现角色学习。' },
    { knowledgePointIds: [perspective, evidence], prompt: '小组想研究观察位置怎样影响对同一物体的描述，怎样安排更容易比较？', answer: '选定两个安全位置，请同学分别记录所见，再一起比较轮廓', distractors: ['让每个人随意移动，不记录位置', '只请一个人看一次，就判断所有人的感受'], hint: '比较时要控制并记录观察位置。', explanation: '明确位置并记录多人的观察，能让比较有依据，也不把一次经验说成普遍结论。' },
    { knowledgePointIds: [information, safety, evidence], prompt: '伙伴说小路能通向目的地，路牌却提示前方施工。怎样决定下一步？', answer: '先停在安全的开放区域，核对路牌并向同行成人或工作人员询问', distractors: ['跟着伙伴直接走进施工区域', '把路牌当作旧信息，不再确认就继续'], hint: '把现场提示和他人说法一起核对，并先保证安全。', explanation: '停下、核对现场提示并求助，能避免只听转述而进入封闭区域。' },
    { knowledgePointIds: [fable, reflection], prompt: '寓言角色第一次修补后问题又出现了。哪种后续最能表现它在反思？', answer: '重新观察破损位置，找原因后调整修补方法，再检查效果', distractors: ['重复原来的做法，不检查是否有效', '认为问题无法改变，放弃观察'], hint: '让角色根据新结果找线索并改进办法。', explanation: '重新观察、找原因、调整并复查，能体现角色从结果中学习。' },
    { knowledgePointIds: [safety, information], prompt: '班级要演出一个角色遇到陌生水域的故事，怎样安排既清楚又安全？', answer: '用图片或模型表现水域，让角色停在岸边并向成人求助', distractors: ['让演员真的走进水里演示深浅', '让演员在地面洒水后快速跑过'], hint: '演出可以使用道具，不需要真的接近危险水域。', explanation: '图片或模型能讲清故事情境，也让演员不必进入或模拟危险水域。' },
    { knowledgePointIds: [fable, evidence], prompt: '故事里角色修好漏点后暂时没有再漏。哪种结尾既回应结果又不过度保证？', answer: '角色记下这次修补有效，并约好之后再检查', distractors: ['角色宣布以后任何地方都不会再漏', '角色不提结果，突然换到另一个故事'], hint: '说明目前看到的结果，也留下继续检查的空间。', explanation: '记录目前的结果并继续检查，比把一次观察扩大成永久保证更准确。' },
    { knowledgePointIds: [perspective, evidence], prompt: '互读时发现同伴和你对画面描述不同，哪种讨论最能帮助双方理解？', answer: '请两人分别说明观察位置、看到的轮廓和判断依据', distractors: ['先决定谁的描述更标准，再停止讨论', '把两种描述合成一句，不说明差异'], hint: '让双方说清观察条件和看到的线索。', explanation: '位置、轮廓和依据能解释描述差异，让讨论回到观察本身。' },
    { knowledgePointIds: [safety, reflection], prompt: '准备和家人去一处不熟悉的地方，路线信息还不完整。哪种出发前计划更稳妥？', answer: '先和家人核对开放路线、集合地点和求助办法', distractors: ['到了再各自寻找想走的路', '只记住一条听来的近路，不准备其他办法'], hint: '提前核对路线，并商量遇到变化时怎样联系。', explanation: '和家人核对路线及求助办法，能在信息不完整或情况变化时更安全。' },
    { knowledgePointIds: [evidence, information], prompt: '小组介绍“不同位置看到的画面”，怎样让听众知道哪些是记录、哪些是想法？', answer: '先展示每个位置的观察记录，再单独说明小组的理解', distractors: ['把猜测写成大家都观察到的事实', '只留下小组结论，不展示观察记录'], hint: '先给听众看依据，再说自己的解释。', explanation: '分开展示记录和理解，能让听众判断结论来自哪些观察。' },
    { knowledgePointIds: [safety, information], prompt: '小马听到不同建议后，伙伴想让他立刻选一个。哪种回应既尊重建议又重视安全？', answer: '先听完建议，再观察实际情况并请可信任的成人一起判断', distractors: ['只选最先听到的说法马上行动', '为了不让伙伴失望，就不再核实情况'], hint: '听取建议后还要核对条件，不必急着作决定。', explanation: '尊重他人意见不等于盲目照做；观察和求助能让判断更稳妥。' },
    { knowledgePointIds: [safety, evidence], prompt: '做户外活动时，计划路线上的桥暂时关闭。怎样处理最合适？', answer: '留在安全区域，告诉带队成人并一起选择开放路线', distractors: ['从桥边绕过去，看看能不能走', '跟在别人后面穿过关闭区域'], hint: '遵守关闭提示，不要自行进入限制区域。', explanation: '关闭提示表示路线不可通行，留在安全处并请带队成人安排替代路线。' },
    { knowledgePointIds: [reflection, evidence], prompt: '一次判断后来被新信息改变了。怎样做能把这次经历变成下次可用的经验？', answer: '记下原先依据、后来发现的新线索和自己调整的地方', distractors: ['只记最后结果，不保留判断经过', '删掉不同意见，避免再讨论'], hint: '保存从想法到调整的过程。', explanation: '记录原依据、新线索和调整，能帮助下次更清楚地比较信息。' },
    { knowledgePointIds: [perspective, information, safety], prompt: '小组要描述一个河岸景物，有人站得较远，有人留在安全标线后。怎样记录更完整？', answer: '注明观察位置、各自看到的部分，并遵守安全标线', distractors: ['让大家越过标线，站到水边比较', '只采用离得最近的人说法，不记录位置'], hint: '记录位置有助于解释不同画面，观察也要保持安全。', explanation: '位置会影响看到的内容；标明位置并守住安全区域，能同时保证记录清楚和安全。' },
    { knowledgePointIds: [fable, reflection, evidence], prompt: '互读后，伙伴说寓言里的结果出现得太突然。怎样修改最能补足因果？', answer: '在结果前补上角色采取的行动和能看见的变化线索', distractors: ['只增加角色衣服的颜色描写', '把结尾换成另一件事，不说明前因'], hint: '读者需要知道角色做了什么，事情才发生变化。', explanation: '补充行动和变化线索能连接前因与结果，让寓言更连贯。' },
  ],
};

export const grade2Term2ChineseUnit05SupplementalActivities: Grade2Term2ChineseUnit05SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = (index % 3) as 0 | 1 | 2;
    const options = [...draft.distractors];
    options.splice(correctOptionIndex, 0, draft.answer);
    return {
      difficulty: difficulty as Difficulty,
      sourceUnitId,
      knowledgePointIds: draft.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice' as const,
        prompt: draft.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: draft.hint,
        explanation: draft.explanation,
      },
    };
  })
));
