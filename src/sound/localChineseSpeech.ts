export type LocalChineseSpeechResult = 'spoken' | 'unsupported' | 'voices-loading' | 'no-local-chinese-voice' | 'failed';

function getSpeechSynthesis(): SpeechSynthesis | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  return window.speechSynthesis ?? null;
}

export function stopLocalSpeech(): void {
  try {
    getSpeechSynthesis()?.cancel();
  } catch {
    // Speech playback is optional and must not interrupt learning.
  }
}

export function speakWithLocalChineseVoice(text: string): LocalChineseSpeechResult {
  const synthesis = getSpeechSynthesis();
  if (!synthesis || typeof SpeechSynthesisUtterance === 'undefined') return 'unsupported';

  try {
    const voices = synthesis.getVoices();
    if (voices.length === 0) return 'voices-loading';
    const localChineseVoices = voices.filter(({ lang, localService }) => localService && /^zh(?:-|_|$)/i.test(lang));
    const voice = localChineseVoices.find(({ default: isDefault }) => isDefault) ?? localChineseVoices[0];
    if (!voice) return 'no-local-chinese-voice';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice.lang;
    utterance.voice = voice;
    if (synthesis.speaking || synthesis.pending) synthesis.cancel();
    synthesis.speak(utterance);
    return 'spoken';
  } catch {
    return 'failed';
  }
}
