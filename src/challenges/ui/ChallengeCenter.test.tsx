import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ChallengeGroupManifest } from '../domain/types';
import type { LoadedPilotGroup } from '../content/pilotContent';
import ChallengeCenter from './ChallengeCenter';
import { getChallengeGroupDescription, getChallengeGroupTitle } from './ChallengeCenter';
import pilotManifest from '../content/pilotManifest';

describe('ChallengeCenter', () => {
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

    expect(getChallengeGroupDescription(groups[0]!)).toBe('练习数一数、比一比和 0 的初步认识。');
    expect(getChallengeGroupDescription(groups[1]!)).toBe('练习上下、前后、左右、里外和按顺序描述路线。');
    expect(getChallengeGroupDescription(groups[2]!)).toBe('练习本单元的自我介绍、年龄和班级表达。');
    expect(getChallengeGroupDescription(groups[3]!)).toBe('阅读本单元课文，练习文本线索、表达方法与习作。');
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
