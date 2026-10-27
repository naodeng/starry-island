import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ChallengeGroupManifest } from '../domain/types';
import type { LoadedPilotGroup } from '../content/pilotContent';
import ChallengeCenter from './ChallengeCenter';
import { getChallengeGroupDescription, getChallengeGroupTitle } from './ChallengeCenter';
import pilotManifest from '../content/pilotManifest';

describe('ChallengeCenter', () => {
  it('orders routes by grade, semester, subject, chapters, then semester stages', () => {
    const groupIds = [
      'grade-2-term-1-math-unit-02',
      'grade-1-term-1-english-first-half',
      'grade-1-term-2-math-unit-01',
      'grade-1-term-1-math-first-half',
      'grade-1-term-1-english-unit-01',
      'grade-1-term-1-math-unit-02',
      'grade-1-term-1-chinese-first-half',
      'grade-1-term-1-math-unit-01',
    ];
    const groups: LoadedPilotGroup[] = groupIds.map((id) => ({
      group: pilotManifest.groups.find(({ definition }) => definition.id === id) as unknown as ChallengeGroupManifest,
      status: 'ready',
      candidates: [],
      disabledQuestionIds: [],
      learningTasks: [],
      issues: [],
    }));
    render(<ChallengeCenter groups={groups} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} />);

    expect(screen.getAllByRole('heading', { level: 3 }).map(({ textContent }) => textContent)).toEqual([
      '一年级上册语文 · 前半学期',
      '一年级上册数学 · 第一单元',
      '一年级上册数学 · 第二单元',
      '一年级上册数学 · 前半学期',
      '一年级上册英语 · 第一单元',
      '一年级上册英语 · 前半学期',
      '一年级下册数学 · 第一单元',
      '二年级上册数学 · 第二单元',
    ]);
  });

  it('uses the registered unit grade, term, subject, and chapter in its title', () => {
    const englishGroup = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-3-term-1-english-unit-01') as unknown as ChallengeGroupManifest;
    const chineseGroup = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-5-term-1-chinese-unit-01') as unknown as ChallengeGroupManifest;

    expect(getChallengeGroupTitle(englishGroup)).toBe('三年级上册英语 · 第一单元');
    expect(getChallengeGroupTitle(chineseGroup)).toBe('五年级上册语文 · 第一单元');
  });

  it('describes representative routes by registered subject and knowledge scope', () => {
    const ids = [
      'grade-1-term-1-math-unit-01',
      'grade-1-term-1-math-unit-02',
      'grade-3-term-1-english-unit-01',
      'grade-5-term-1-chinese-unit-01',
    ];
    const groups = ids.map((id) => pilotManifest.groups.find(({ definition }) => definition.id === id) as unknown as ChallengeGroupManifest);
    const grade1EnglishGroup: ChallengeGroupManifest = {
      ...groups[2]!,
      definition: {
        ...groups[2]!.definition,
        id: 'grade-1-term-1-english-unit-01',
        grade: 1,
        sourceUnitIds: ['grade-1/term-1/english/unit-01'],
      },
    };
    const grade1EnglishFaceGroup: ChallengeGroupManifest = {
      ...grade1EnglishGroup,
      definition: {
        ...grade1EnglishGroup.definition,
        id: 'grade-1-term-1-english-unit-02',
        sourceUnitIds: ['grade-1/term-1/english/unit-02'],
      },
    };
    const grade1EnglishAnimalsGroup: ChallengeGroupManifest = {
      ...grade1EnglishFaceGroup,
      definition: {
        ...grade1EnglishFaceGroup.definition,
        id: 'grade-1-term-1-english-unit-03',
        sourceUnitIds: ['grade-1/term-1/english/unit-03'],
      },
    };
    const grade1EnglishNumbersGroup: ChallengeGroupManifest = {
      ...grade1EnglishAnimalsGroup,
      definition: {
        ...grade1EnglishAnimalsGroup.definition,
        id: 'grade-1-term-1-english-unit-04',
        sourceUnitIds: ['grade-1/term-1/english/unit-04'],
      },
    };
    const grade1EnglishColoursGroup: ChallengeGroupManifest = {
      ...grade1EnglishNumbersGroup,
      definition: {
        ...grade1EnglishNumbersGroup.definition,
        id: 'grade-1-term-1-english-unit-05',
        sourceUnitIds: ['grade-1/term-1/english/unit-05'],
      },
    };
    const grade1EnglishFruitGroup: ChallengeGroupManifest = {
      ...grade1EnglishColoursGroup,
      definition: {
        ...grade1EnglishColoursGroup.definition,
        id: 'grade-1-term-1-english-unit-06',
        sourceUnitIds: ['grade-1/term-1/english/unit-06'],
      },
    };
    const grade1Term2MathShapeGroup = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-1-term-2-math-unit-01') as unknown as ChallengeGroupManifest;
    const grade1Term2MathClassificationGroup = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-1-term-2-math-unit-03') as unknown as ChallengeGroupManifest;

    expect(getChallengeGroupDescription(groups[0]!)).toBe('练习数一数、比一比和 0 的初步认识。');
    expect(getChallengeGroupDescription(groups[1]!)).toBe('练习上下、前后、左右、里外和按顺序描述路线。');
    expect(getChallengeGroupDescription(groups[2]!)).toBe('练习本单元的自我介绍、年龄和班级表达。');
    expect(getChallengeGroupDescription(grade1EnglishGroup)).toBe('练习问候与告别、课堂指令和学习用品表达。');
    expect(getChallengeGroupDescription(grade1EnglishFaceGroup)).toBe('练习眼、耳、鼻、口等面部词汇、相关指令和简单介绍句。');
    expect(getChallengeGroupDescription(grade1EnglishAnimalsGroup)).toBe('练习常见动物名称，以及描述动物和表达喜好的简单句。');
    expect(getChallengeGroupDescription(grade1EnglishNumbersGroup)).toBe('练习 1～10 的英文数词、数数顺序和“How many books?”等数量表达。');
    expect(getChallengeGroupDescription(grade1EnglishColoursGroup)).toBe('练习 red、blue、yellow、green 颜色词、询问颜色和描述颜色。');
    expect(getChallengeGroupDescription(grade1EnglishFruitGroup)).toBe('练习 apple、pear、banana、orange 水果词，按类别分组并表达水果喜好。');
    expect(getChallengeGroupDescription(grade1Term2MathShapeGroup)).toBe('练习三角形、长方形、正方形和圆的辨认、特征观察与简单拼组。');
    expect(getChallengeGroupDescription(grade1Term2MathClassificationGroup)).toBe('练习按标准分类、记录数量、读取分类结果并检查记录。');
    expect(getChallengeGroupDescription(groups[3]!)).toBe('阅读本单元课文，练习文本线索、表达方法与习作。');
  });

  it('describes semester stages without assigning every stage to the first four chapters', () => {
    const firstHalf = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-first-half') as unknown as ChallengeGroupManifest;
    const secondHalf: ChallengeGroupManifest = {
      ...firstHalf,
      definition: { ...firstHalf.definition, id: 'grade-1-term-1-math-second-half', stage: 'second-half' },
    };
    const endTerm: ChallengeGroupManifest = {
      ...firstHalf,
      definition: { ...firstHalf.definition, id: 'grade-1-term-1-math-end-term', stage: 'end-term' },
    };

    expect(getChallengeGroupDescription(firstHalf)).toBe('按教材章节顺序练习上册前半部分内容。');
    expect(getChallengeGroupDescription(secondHalf)).toBe('按教材章节顺序练习上册后半部分内容。');
    expect(getChallengeGroupDescription(endTerm)).toBe('综合练习本册已登记的课程内容。');
  });

  it('describes Grade 1 Chinese stages as theme-based because they are not formal numbered chapters', () => {
    const firstHalf = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-chinese-first-half') as unknown as ChallengeGroupManifest;
    const secondHalf: ChallengeGroupManifest = {
      ...firstHalf,
      definition: { ...firstHalf.definition, id: 'grade-1-term-1-chinese-second-half', stage: 'second-half' },
    };

    expect(getChallengeGroupDescription(firstHalf)).toBe('按课程主题顺序练习上册前半部分内容。');
    expect(getChallengeGroupDescription(secondHalf)).toBe('按课程主题顺序练习上册后半部分内容。');
  });

  it('links to local growth, settings data management, and the course catalog', () => {
    const onNavigate = vi.fn();
    const groups: LoadedPilotGroup[] = [];
    render(<ChallengeCenter groups={groups} progressByTaskId={{}} progressAvailable onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: '查看成长记录' }));
    expect(onNavigate).toHaveBeenLastCalledWith('/challenges/growth');
    fireEvent.click(screen.getByRole('button', { name: '设置与数据管理' }));
    expect(onNavigate).toHaveBeenLastCalledWith('/settings/backup');
    fireEvent.click(screen.getByRole('button', { name: '返回课程目录' }));
    expect(onNavigate).toHaveBeenLastCalledWith('/courses');
    expect(screen.queryByRole('heading', { name: '闯关备份' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '恢复点与隔离记录' })).not.toBeInTheDocument();
  });
});
