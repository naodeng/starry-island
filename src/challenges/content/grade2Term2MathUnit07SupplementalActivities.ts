import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit07SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-07';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-07';
const placeValue = 'number-composition-and-place-value';
const zero = 'zero-as-placeholder';
const reading = 'reading-and-writing-within-10000';
const comparing = 'comparing-and-ordering-within-10000';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [placeValue], prompt: '3,746中数字7表示多少？', answer: '700', distractors: ['70', '7'], hint: '先看7在哪个数位，再想这个数位上的7代表多少。', explanation: '7在百位，表示7个百，也就是700。' },
    { knowledgePointIds: [placeValue], prompt: '把2,000、500、30和6合成一个数，应该写成什么？', answer: '2,536', distractors: ['2,356', '2,563'], hint: '按千、百、十、个的顺序把数字放回对应数位。', explanation: '2个千、5个百、3个十和6个一组成2,536。' },
    { knowledgePointIds: [placeValue], prompt: '3,404中的两个4各表示什么？', answer: '一个表示400，另一个表示4', distractors: ['一个表示40，另一个表示4', '两个都表示400'], hint: '同一个数字在不同数位上表示的数量可能不同。', explanation: '左边的4在百位，表示400；右边的4在个位，表示4。' },
    { knowledgePointIds: [placeValue, zero], prompt: '5,090可以写成哪种数位组成？', answer: '5,000+90', distractors: ['5,000+900', '500+90'], hint: '分别看千位、百位、十位和个位上的数字。', explanation: '5,090由5个千和9个十组成，所以可以写成5,000+90。' },
    { knowledgePointIds: [reading, zero], prompt: '5,060应该怎样读？', answer: '五千零六十', distractors: ['五千六百', '五千零六'], hint: '百位没有计数单位，读数时要注意中间的0。', explanation: '5,060由5个千和6个十组成，读作五千零六十。' },
    { knowledgePointIds: [reading, zero], prompt: '“四千零九”写成数字是多少？', answer: '4,009', distractors: ['4,090', '4,900'], hint: '百位和十位没有计数单位，要在相应数位上用0占位。', explanation: '四千零九是4个千、0个百、0个十和9个一，写作4,009。' },
    { knowledgePointIds: [comparing], prompt: '比较6,420和6,402，哪个数更大？', answer: '6,420', distractors: ['6,402', '两个数一样大'], hint: '千位和百位相同后，继续比较十位。', explanation: '两个数的千位和百位相同，十位上的2大于0，所以6,420更大。' },
    { knowledgePointIds: [comparing], prompt: '把4,082、4,820和4,902按从小到大排列，哪项正确？', answer: '4,082 < 4,820 < 4,902', distractors: ['4,820 < 4,082 < 4,902', '4,902 < 4,820 < 4,082'], hint: '从千位开始比较，遇到相同的数位再看下一位。', explanation: '三数的千位都是4；百位依次为0、8、9，因此顺序是4,082、4,820、4,902。' },
    { knowledgePointIds: [reading, zero], prompt: '8,060读作什么？', answer: '八千零六十', distractors: ['八千六百', '八千零六'], hint: '百位和个位都是0，读的时候按数位顺序处理。', explanation: '8,060由8个千和6个十组成，读作八千零六十。' },
    { knowledgePointIds: [reading, zero], prompt: '“七千零二十”写成数字是多少？', answer: '7,020', distractors: ['7,200', '7,002'], hint: '百位没有计数单位，十位上有2个十。', explanation: '七千零二十由7个千、0个百、2个十和0个一组成，写作7,020。' },
    { knowledgePointIds: [reading, zero], prompt: '把数字3,506读出来，哪项正确？', answer: '三千五百零六', distractors: ['三千五百六十', '三千零五十六'], hint: '先说千位和百位，再读出中间空着的十位。', explanation: '3,506由3个千、5个百、0个十和6个一组成，读作三千五百零六。' },
    { knowledgePointIds: [placeValue, zero], prompt: '千位是3、百位是8、十位没有数、个位是4，这个数写作什么？', answer: '3,804', distractors: ['3,840', '3,084'], hint: '十位没有数量，写数时要把0放在十位。', explanation: '按千、百、十、个的顺序写出3、8、0、4，得到3,804。' },
    { knowledgePointIds: [comparing], prompt: '5,709和5,790相比，哪个数更大？', answer: '5,790', distractors: ['5,709', '两个数一样大'], hint: '千位和百位相同，继续比较十位上的数字。', explanation: '十位上的9大于0，所以5,790更大。' },
    { knowledgePointIds: [placeValue, zero], prompt: '5个千、0个百、0个十和8个一组成的数是多少？', answer: '5,008', distractors: ['5,080', '5,800'], hint: '百位和十位没有计数单位，两个位置都要用0占位。', explanation: '把5、0、0、8依次写在千、百、十、个位上，得到5,008。' },
  ],
  advanced: [
    { knowledgePointIds: [placeValue], prompt: '一个数的千位是8、百位是4、十位是6、个位是5，这个数是多少？', answer: '8,465', distractors: ['8,645', '8,456'], hint: '按千、百、十、个的顺序写出各位数字。', explanation: '把8、4、6、5依次放在千、百、十、个位上，得到8,465。' },
    { knowledgePointIds: [comparing], prompt: '比较4,083和4,308，哪个数更大？', answer: '4,308', distractors: ['4,083', '两个数一样大'], hint: '千位相同后，先看百位有没有不同。', explanation: '千位都是4，百位上的3大于0，所以4,308更大。' },
    { knowledgePointIds: [placeValue], prompt: '用数字2、0、5、7各一次组成最大的四位数，是多少？', answer: '7,520', distractors: ['7,250', '5,720'], hint: '要使四位数最大，先确定千位，再把剩下的数字从大到小安排。', explanation: '千位放最大的7，后面依次放5、2、0，得到7,520。' },
    { knowledgePointIds: [placeValue], prompt: '用数字1、0、3、5各一次组成最小的四位数，是多少？', answer: '1,035', distractors: ['1,305', '1,053'], hint: '千位不能是0；确定千位后，让后面的数位尽可能小。', explanation: '千位放最小的非0数字1，后面依次放0、3、5，得到1,035。' },
    { knowledgePointIds: [placeValue, comparing], prompt: '一个数大于5,600、小于5,700，十位是0、个位是8。这个数是多少？', answer: '5,608', distractors: ['5,680', '5,806'], hint: '先用范围确定千位和百位，再放入十位和个位。', explanation: '这个数的千位、百位是5和6，十位是0、个位是8，所以是5,608。' },
    { knowledgePointIds: [comparing], prompt: '5,690和5,620相比，哪个数更大？', answer: '5,690', distractors: ['5,620', '两个数一样大'], hint: '千位、百位相同后，比较第一处不同的十位。', explanation: '5,690和5,620的十位分别是9和2，9大于2，所以5,690更大。' },
    { knowledgePointIds: [placeValue, zero], prompt: '哪种数位展开表示9,002？', answer: '9,000+2', distractors: ['9,000+20', '900+2'], hint: '百位和十位没有计数单位，只保留千位和个位的数量。', explanation: '9,002由9个千和2个一组成，可以写成9,000+2。' },
    { knowledgePointIds: [placeValue, zero], prompt: '6个千、9个百、0个十和6个一组成的数是多少？', answer: '6,906', distractors: ['6,960', '6,096'], hint: '十位没有数量，要在十位写0。', explanation: '把6、9、0、6依次写在千、百、十、个位上，得到6,906。' },
    { knowledgePointIds: [reading, zero], prompt: '7,064应该怎样读？', answer: '七千零六十四', distractors: ['七千六百四十', '七千六百零四'], hint: '百位没有计数单位，十位和个位分别是6和4。', explanation: '7,064由7个千、0个百、6个十和4个一组成，读作七千零六十四。' },
    { knowledgePointIds: [comparing, zero], prompt: '比较8,090和8,009，哪个数更大？', answer: '8,090', distractors: ['8,009', '两个数一样大'], hint: '千位相同，接着比较百位；如果也相同，再看十位。', explanation: '千位都是8，百位都是0，十位上的9大于0，所以8,090更大。' },
    { knowledgePointIds: [placeValue, zero], prompt: '小明把3,060写成3,600，哪句话指出了错误？', answer: '6在十位，表示60；3,600中的6在百位表示600', distractors: ['6在百位，表示600；两个数写法相同', '6在个位，表示6；应该把它移到千位'], hint: '对照两个数中6所在的位置，看它表示的数量是否改变。', explanation: '3,060中的6在十位，表示60；写成3,600后它到了百位，表示600，数值变了。' },
    { knowledgePointIds: [reading, zero], prompt: '4,070对应哪个读法？', answer: '四千零七十', distractors: ['四千七百', '四千零七'], hint: '百位和个位是0，十位上有7个十。', explanation: '4,070由4个千和7个十组成，读作四千零七十。' },
    { knowledgePointIds: [comparing], prompt: '把7,072、7,207和7,270按从小到大排列，哪项正确？', answer: '7,072 < 7,207 < 7,270', distractors: ['7,207 < 7,072 < 7,270', '7,270 < 7,207 < 7,072'], hint: '千位相同后先比较百位；百位也相同，再比较十位。', explanation: '7,072的百位是0，最小；另两数百位都是2，再比较十位，7,207小于7,270。' },
    { knowledgePointIds: [comparing], prompt: '比较5,308和5,380，哪种解释正确？', answer: '5,380更大，两个数千位和百位相同，十位8大于0', distractors: ['5,308更大，因为个位8大于0', '两个数一样大，因为千位相同'], hint: '从最高位开始，找到最先不同的数位再比较。', explanation: '千位和百位相同，十位上的8大于0，所以5,380更大。' },
  ],
  high: [
    { knowledgePointIds: [placeValue, comparing], prompt: '用数字0、2、6、8各一次，组成小于5,000的最大四位数。', answer: '2,860', distractors: ['2,680', '6,820'], hint: '千位必须小于5；确定最高位后，让其余数位从大到小排列。', explanation: '千位只能选2，后面的数字按8、6、0排列，最大的符合条件的数是2,860。' },
    { knowledgePointIds: [placeValue, comparing], prompt: '一个数大于3,600、小于3,700，十位是4、个位是8。这个数是多少？', answer: '3,648', distractors: ['3,684', '3,468'], hint: '范围先确定千位和百位，再根据十位、个位线索填写。', explanation: '范围确定千位和百位是3、6，十位和个位是4、8，因此数是3,648。' },
    { knowledgePointIds: [placeValue, zero], prompt: '一个数的千位是8、百位是0、十位是6、个位是4，这个数写作什么？', answer: '8,064', distractors: ['8,604', '8,640'], hint: '百位没有计数单位，要把0留在百位。', explanation: '按千、百、十、个的顺序写8、0、6、4，得到8,064。' },
    { knowledgePointIds: [comparing], prompt: '比较6,180和6,108，哪个数更大？', answer: '6,180', distractors: ['6,108', '两个数一样大'], hint: '千位和百位相同，继续比较十位。', explanation: '十位上的8大于0，所以6,180更大。' },
    { knowledgePointIds: [placeValue, comparing], prompt: '用数字0、3、5、7各一次组成大于3,000的最小四位数。', answer: '3,057', distractors: ['3,507', '5,037'], hint: '先选能让数超过3,000的最小千位，再让后面的数位尽可能小。', explanation: '千位选3，剩下数字从小到大放入百、十、个位，得到3,057。' },
    { knowledgePointIds: [reading, zero], prompt: '为什么4,030读数时要在千位后读出一个“零”？', answer: '百位是0，读数时要读出“零”', distractors: ['十位是3，所以要读两个“零”', '个位是0，所以不用读出百位'], hint: '先看百位有没有计数单位，再按数位顺序读。', explanation: '4,030的百位是0，读作四千零三十；0占位的信息通过“零”读出来。' },
    { knowledgePointIds: [placeValue], prompt: '7,708里的两个7分别表示多少？', answer: '千位的7表示7,000，百位的7表示700', distractors: ['两个7都表示7,000', '千位的7表示700，百位的7表示7'], hint: '左边的7在千位，右边的7在百位。', explanation: '7,708中，千位上的7表示7,000，百位上的7表示700。' },
    { knowledgePointIds: [comparing], prompt: '把4,086、4,608和4,680按从小到大排列，哪项正确？', answer: '4,086 < 4,608 < 4,680', distractors: ['4,608 < 4,086 < 4,680', '4,680 < 4,608 < 4,086'], hint: '先比较百位；百位相同的两个数再比较十位。', explanation: '4,086的百位是0，最小；另两数百位都是6，再比较十位，0小于8。' },
    { knowledgePointIds: [placeValue, comparing], prompt: '一个数大于8,200、小于8,300，十位是0、个位是4。这个数是多少？', answer: '8,204', distractors: ['8,240', '8,024'], hint: '范围确定千位和百位，十位和个位按题目线索填写。', explanation: '这个数的千位和百位是8、2，十位是0、个位是4，所以是8,204。' },
    { knowledgePointIds: [placeValue, comparing], prompt: '用数字1、4、0、9各一次组成大于4,000的最小四位数。', answer: '4,019', distractors: ['4,109', '4,901'], hint: '千位先选能超过4,000的最小数字，再把其他数字从小到大排列。', explanation: '千位必须是4，后面依次放0、1、9，得到最小的符合条件的数4,019。' },
    { knowledgePointIds: [placeValue, zero], prompt: '哪种数位展开表示6,304？', answer: '6,000+300+4', distractors: ['6,000+30+4', '600+300+4'], hint: '十位没有计数单位，百位和个位分别看清楚。', explanation: '6,304由6个千、3个百和4个一组成，可以写成6,000+300+4。' },
    { knowledgePointIds: [placeValue, comparing], prompt: '一个数大于7,500、小于7,600，十位是2、个位是8。这个数是多少？', answer: '7,528', distractors: ['7,582', '7,258'], hint: '范围先确定千位和百位，再核对十位和个位。', explanation: '千位、百位是7、5，十位、个位是2、8，所以数是7,528。' },
    { knowledgePointIds: [comparing, zero], prompt: '比较8,099和8,100，哪个数更小？', answer: '8,099', distractors: ['8,100', '两个数一样大'], hint: '千位相同后比较百位；0和1哪一个更小？', explanation: '千位都是8，百位0小于1，所以8,099更小。' },
    { knowledgePointIds: [reading, zero], prompt: '7,056应该怎样读？', answer: '七千零五十六', distractors: ['七千五百零六', '七千零五百六'], hint: '百位没有计数单位，十位是5、个位是6。', explanation: '7,056由7个千、0个百、5个十和6个一组成，读作七千零五十六。' },
  ],
};

export const grade2Term2MathUnit07SupplementalActivities: Grade2Term2MathUnit07SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
