import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import type { ChoiceActivityDefinition } from '../../content/types';
import { SoundProvider, useSound } from '../../sound/SoundProvider';
import { SOUND_PREFERENCE_KEY } from '../../sound/soundPreferences';
import ChallengeActivityRenderer from './ChallengeActivityRenderer';

const activity: ChoiceActivityDefinition = {
  id: 'challenge-choice-1',
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

function DisableSoundButton() {
  const { setEnabled } = useSound();
  return <button onClick={() => setEnabled(false)}>关闭声音</button>;
}

describe('ChallengeActivityRenderer', () => {
  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('does not render hints or explanations and locks after one submitted answer', () => {
    const onAnswer = vi.fn();
    render(<SoundProvider><ChallengeActivityRenderer activity={activity} onAnswer={onAnswer} disabled={false} /></SoundProvider>);
    const question = screen.getByRole('region', { name: activity.prompt });
    const controls = within(question);

    expect(controls.queryByText(activity.hint)).not.toBeInTheDocument();
    expect(controls.queryByText(activity.explanation)).not.toBeInTheDocument();
    fireEvent.click(controls.getByRole('button', { name: /24 \+ 18/ }));
    fireEvent.click(controls.getByRole('button', { name: '提交答案' }));

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith('add');
    expect(controls.getByRole('button', { name: '提交答案' })).toBeDisabled();
  });

  it('reads only the visible prompt with a local Chinese voice', () => {
    const localVoice = makeVoice('zh-CN', true);
    const speech = setupSpeech([makeVoice('en-US', true), makeVoice('zh-CN', false), localVoice]);
    render(<SoundProvider><ChallengeActivityRenderer activity={activity} onAnswer={vi.fn()} disabled={false} /></SoundProvider>);

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));

    expect(speech.speak).toHaveBeenCalledOnce();
    const utterance = speech.speak.mock.calls[0]![0] as { text: string; voice: SpeechSynthesisVoice | null };
    expect(utterance.text).toBe(activity.prompt);
    expect(utterance.voice).toBe(localVoice);
    expect(utterance.text).not.toContain(activity.options[0]!.label);
    expect(utterance.text).not.toContain(activity.hint);
    expect(utterance.text).not.toContain(activity.explanation);
  });

  it('explains when no local Chinese voice is available without using a remote voice', () => {
    const speech = setupSpeech([makeVoice('zh-CN', false), makeVoice('en-US', true)]);
    render(<SoundProvider><ChallengeActivityRenderer activity={activity} onAnswer={vi.fn()} disabled={false} /></SoundProvider>);

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));

    expect(screen.getByRole('status')).toHaveTextContent('此设备没有可用的本地中文语音');
    expect(screen.getByRole('status')).toHaveTextContent('不会联网播放');
    expect(speech.speak).not.toHaveBeenCalled();
  });

  it('does not offer prompt speech when the existing voice preference is disabled', () => {
    localStorage.setItem(SOUND_PREFERENCE_KEY, 'false');
    const speech = setupSpeech([makeVoice('zh-CN', true)]);
    render(<SoundProvider><ChallengeActivityRenderer activity={activity} onAnswer={vi.fn()} disabled={false} /></SoundProvider>);

    expect(screen.getByRole('button', { name: '朗读题目' })).toBeDisabled();
    expect(speech.speak).not.toHaveBeenCalled();
  });

  it('stops prompt speech when the existing voice preference is turned off', () => {
    const speech = setupSpeech([makeVoice('zh-CN', true)]);
    render(
      <SoundProvider>
        <ChallengeActivityRenderer activity={activity} onAnswer={vi.fn()} disabled={false} />
        <DisableSoundButton />
      </SoundProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: '朗读题目' }));
    fireEvent.click(screen.getByRole('button', { name: '关闭声音' }));

    expect(speech.cancel).toHaveBeenCalledOnce();
  });
});
