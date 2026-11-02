import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ActivityDefinition, ChoiceActivityDefinition } from '../../content/types';
import { SoundProvider, useSound } from '../../sound/SoundProvider';
import { SOUND_PREFERENCE_KEY } from '../../sound/soundPreferences';
import ActivityRenderer from './ActivityRenderer';

const activity: ChoiceActivityDefinition = {
  id: 'learning-choice-speech',
  kind: 'choice',
  prompt: '哪一个算式表示数量增加？',
  hint: '把原有数量和新放入的数量合起来。',
  explanation: '增加可以用加法表示。',
  options: [
    { id: 'add', label: '24 + 18' },
    { id: 'subtract', label: '24 - 18' },
  ],
  correctOptionId: 'add',
};

function makeVoice(lang: string, localService: boolean): SpeechSynthesisVoice {
  return { lang, localService, default: false, name: `${lang} voice`, voiceURI: `${lang}-voice` };
}

function setupSpeech(voices: SpeechSynthesisVoice[]) {
  const speech = {
    getVoices: vi.fn(() => voices),
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    speaking: false,
    pending: false,
    paused: false,
    onvoiceschanged: null,
  };
  class TestUtterance {
    lang = '';
    voice: SpeechSynthesisVoice | null = null;
    constructor(public text: string) {}
  }
  vi.stubGlobal('speechSynthesis', speech);
  vi.stubGlobal('SpeechSynthesisUtterance', TestUtterance);
  return speech;
}

function renderActivity(onSolved = vi.fn(), renderedActivity: ActivityDefinition = activity) {
  return render(
    <SoundProvider>
      <ActivityRenderer activity={renderedActivity} onSolved={onSolved} />
    </SoundProvider>,
  );
}

const accessibleActivityCases: Array<{
  kind: string;
  activity: ActivityDefinition;
  role: string;
  name: string;
}> = [
  { kind: 'choice', activity, role: 'group', name: '选择一个答案' },
  {
    kind: 'match',
    activity: {
      id: 'accessible-match', kind: 'match', prompt: '找到对应词语。', hint: '读一读两个词语。', explanation: '词语可以配对。',
      pairs: [{ id: 'one', left: '太阳', right: '白天' }, { id: 'two', left: '月亮', right: '夜晚' }],
    },
    role: 'group', name: '左侧词语',
  },
  {
    kind: 'order',
    activity: {
      id: 'accessible-order', kind: 'order', prompt: '排好顺序。', hint: '看看先后。', explanation: '顺序已正确。',
      items: [{ id: 'first', label: '第一步' }, { id: 'second', label: '第二步' }], correctOrder: ['first', 'second'],
    },
    role: 'list', name: '当前排列顺序',
  },
  {
    kind: 'categorize',
    activity: {
      id: 'accessible-categorize', kind: 'categorize', prompt: '整理水果。', hint: '想想它们是什么。', explanation: '分类可以帮助整理。',
      categories: [{ id: 'fruit', label: '水果' }, { id: 'vegetable', label: '蔬菜' }],
      items: [{ id: 'apple', label: '苹果', categoryId: 'fruit' }],
    },
    role: 'group', name: '为苹果选择分类',
  },
  {
    kind: 'arithmetic',
    activity: {
      id: 'accessible-arithmetic', kind: 'arithmetic', prompt: '算一算。', hint: '把两个数合起来。', explanation: '4 加 5 等于 9。',
      expression: '4 + 5', correctAnswer: 9,
    },
    role: 'spinbutton', name: '输入计算结果',
  },
  {
    kind: 'measurement',
    activity: {
      id: 'accessible-measurement', kind: 'measurement', prompt: '量一量。', hint: '移动到合适的位置。', explanation: '这段长度是 2 厘米。',
      objectLabel: '彩带', targetLengthCm: 2, minCm: 1, maxCm: 3,
    },
    role: 'group', name: '调整终点',
  },
];

function DisableSoundButton() {
  const { setEnabled } = useSound();
  return <button onClick={() => setEnabled(false)}>关闭声音</button>;
}

describe('ActivityRenderer local speech', () => {
  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('reads the prompt and all choice options with a local Chinese voice', () => {
    const localVoice = makeVoice('zh-CN', true);
    const speech = setupSpeech([makeVoice('en-US', true), makeVoice('zh-CN', false), localVoice]);
    renderActivity();

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));

    expect(speech.speak).toHaveBeenCalledOnce();
    const utterance = speech.speak.mock.calls[0]![0] as { text: string; voice: SpeechSynthesisVoice | null };
    expect(utterance.text).toBe('题目：哪一个算式表示数量增加？选项一：24 + 18；选项二：24 - 18。');
    expect(utterance.voice).toBe(localVoice);
    expect(utterance.text).not.toContain(activity.hint);
    expect(utterance.text).not.toContain(activity.explanation);
  });

  it('does not offer answer speech before submission or after an incorrect answer', () => {
    setupSpeech([makeVoice('zh-CN', true)]);
    renderActivity();
    expect(screen.queryByRole('button', { name: '朗读答案与讲解' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /24 - 18/ }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));

    expect(screen.queryByRole('button', { name: '朗读答案与讲解' })).not.toBeInTheDocument();
    expect(screen.queryByText(activity.explanation)).not.toBeInTheDocument();
  });

  it('reads the structured correct answer and explanation only after a correct answer', () => {
    const speech = setupSpeech([makeVoice('zh-CN', true)]);
    renderActivity();
    fireEvent.click(screen.getByRole('button', { name: /24 \+ 18/ }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));
    const answerButton = screen.getByRole('button', { name: '朗读答案与讲解' });

    fireEvent.click(answerButton);

    const utterance = speech.speak.mock.calls[0]![0] as { text: string };
    expect(utterance.text).toBe(`正确答案：24 + 18。${activity.explanation}`);
  });

  it('disables speech controls when the existing voice preference is off', () => {
    localStorage.setItem(SOUND_PREFERENCE_KEY, 'false');
    const speech = setupSpeech([makeVoice('zh-CN', true)]);
    renderActivity();

    expect(screen.getByRole('button', { name: '朗读题目' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('请先在设置中开启语音提示');
    expect(speech.speak).not.toHaveBeenCalled();
  });

  it.each([
    { name: 'no local Chinese voice', voices: [makeVoice('zh-CN', false), makeVoice('en-US', true)], message: '此设备没有可用的本地中文语音' },
    { name: 'voices still loading', voices: [], message: '设备语音列表正在准备' },
  ])('explains when $name is unavailable without a remote fallback', ({ voices, message }) => {
    const speech = setupSpeech(voices);
    renderActivity();

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));

    expect(screen.getByRole('status')).toHaveTextContent(message);
    expect(speech.speak).not.toHaveBeenCalled();
  });

  it('explains when the browser has no speech API', () => {
    vi.stubGlobal('speechSynthesis', undefined);
    vi.stubGlobal('SpeechSynthesisUtterance', undefined);
    renderActivity();

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));

    expect(screen.getByRole('status')).toHaveTextContent('此浏览器不支持语音朗读');
  });

  it('stops speech on answer submission, activity change, and unmount', () => {
    const speech = setupSpeech([makeVoice('zh-CN', true)]);
    const onSolved = vi.fn();
    const view = render(
      <SoundProvider>
        <ActivityRenderer activity={activity} onSolved={onSolved} />
      </SoundProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));
    fireEvent.click(screen.getByRole('button', { name: /24 \+ 18/ }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));
    expect(speech.cancel).toHaveBeenCalledTimes(1);

    view.rerender(
      <SoundProvider>
        <ActivityRenderer activity={{ ...activity, id: 'learning-choice-speech-next' }} onSolved={onSolved} />
      </SoundProvider>,
    );
    expect(speech.cancel).toHaveBeenCalledTimes(2);

    view.unmount();
    expect(speech.cancel).toHaveBeenCalledTimes(3);
  });

  it('stops speech when the existing voice preference is turned off', () => {
    const speech = setupSpeech([makeVoice('zh-CN', true)]);
    render(
      <SoundProvider>
        <ActivityRenderer activity={activity} onSolved={vi.fn()} />
        <DisableSoundButton />
      </SoundProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));
    fireEvent.click(screen.getByRole('button', { name: '关闭声音' }));

    expect(speech.cancel).toHaveBeenCalledOnce();
  });
});

describe('ActivityRenderer accessibility', () => {
  it('announcesThePromptAndKeepsItVisibleAlongsideAnswerFeedback', () => {
    renderActivity();
    const prompt = screen.getByRole('heading', { level: 2, name: activity.prompt });

    fireEvent.click(screen.getByRole('button', { name: /24 - 18/ }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));

    expect(prompt).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/没关系|勇敢尝试|换个角度|别着急|每一次尝试/);
  });

  it.each(accessibleActivityCases)('exposes labelled controls for $kind activities', ({ activity: testedActivity, role, name }) => {
    renderActivity(vi.fn(), testedActivity);

    expect(screen.getByRole(role, { name })).toBeInTheDocument();
  });
});
