import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ChoiceActivityDefinition } from '../../content/types';
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

function renderActivity(onSolved = vi.fn()) {
  return render(
    <SoundProvider>
      <ActivityRenderer activity={activity} onSolved={onSolved} />
    </SoundProvider>,
  );
}

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
