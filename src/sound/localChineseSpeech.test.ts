import { afterEach, describe, expect, it, vi } from 'vitest';
import { speakWithLocalChineseVoice } from './localChineseSpeech';

function makeVoice(lang: string, localService: boolean, isDefault = false): SpeechSynthesisVoice {
  return { default: isDefault, lang, localService, name: `${lang} voice`, voiceURI: `${lang}-voice` };
}

function setupSpeech(voices: SpeechSynthesisVoice[], state: { speaking?: boolean; pending?: boolean } = {}) {
  const synthesis = {
    getVoices: vi.fn(() => voices),
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    speaking: state.speaking ?? false,
    pending: state.pending ?? false,
    paused: false,
    onvoiceschanged: null,
  };
  class TestUtterance {
    lang = '';
    voice: SpeechSynthesisVoice | null = null;
    constructor(public text: string) {}
  }
  vi.stubGlobal('speechSynthesis', synthesis);
  vi.stubGlobal('SpeechSynthesisUtterance', TestUtterance);
  return synthesis;
}

describe('local Chinese speech', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('uses the device default local Chinese voice without resetting an idle speech engine', () => {
    const systemVoice = makeVoice('zh-CN', true, true);
    const listedFirst = makeVoice('zh-TW', true);
    const synthesis = setupSpeech([listedFirst, makeVoice('zh-CN', false, true), systemVoice]);

    expect(speakWithLocalChineseVoice('读出可见题干')).toBe('spoken');

    const utterance = synthesis.speak.mock.calls[0]![0] as { text: string; voice: SpeechSynthesisVoice | null };
    expect(utterance.voice).toBe(systemVoice);
    expect(utterance.text).toBe('读出可见题干');
    expect(synthesis.cancel).not.toHaveBeenCalled();
  });

  it('cancels an active utterance before replacing it', () => {
    const synthesis = setupSpeech([makeVoice('zh-CN', true)], { speaking: true });

    expect(speakWithLocalChineseVoice('新的题干')).toBe('spoken');

    expect(synthesis.cancel).toHaveBeenCalledOnce();
    expect(synthesis.speak).toHaveBeenCalledOnce();
  });

  it('does not speak with remote or non-Chinese voices', () => {
    const synthesis = setupSpeech([makeVoice('zh-CN', false), makeVoice('en-US', true)]);

    expect(speakWithLocalChineseVoice('题干')).toBe('no-local-chinese-voice');
    expect(synthesis.speak).not.toHaveBeenCalled();
  });
});
