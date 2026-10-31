import type { FeedbackStatus } from '../learning/feedback';

export type SoundCue = 'answer-correct' | 'answer-streak' | 'session-complete' | 'answer-incorrect' | 'interaction-click';

export const SOUND_CUE_ASSETS: Record<SoundCue, string> = {
  'answer-correct': '/audio/answer-correct.mp3',
  'answer-streak': '/audio/answer-streak.mp3',
  'session-complete': '/audio/session-complete.mp3',
  'answer-incorrect': '/audio/answer-incorrect.mp3',
  'interaction-click': '/audio/interaction-click.mp3',
};

export const ANSWER_PRAISE_ASSETS = [
  SOUND_CUE_ASSETS['answer-correct'],
  SOUND_CUE_ASSETS['answer-streak'],
  ...Array.from({ length: 11 }, (_, index) => `/audio/answer-praise-${String(index + 1).padStart(2, '0')}.mp3`),
];

export function getSoundCueAsset(
  cue: SoundCue,
  previousPraiseAsset: string | null,
  random: () => number = Math.random,
): string {
  if (cue !== 'answer-correct' && cue !== 'answer-streak') return SOUND_CUE_ASSETS[cue];
  const choices = previousPraiseAsset && ANSWER_PRAISE_ASSETS.length > 1
    ? ANSWER_PRAISE_ASSETS.filter((asset) => asset !== previousPraiseAsset)
    : ANSWER_PRAISE_ASSETS;
  const index = Math.floor(random() * choices.length);
  return choices[index] ?? SOUND_CUE_ASSETS[cue];
}

export interface AnswerSoundFeedback {
  cue: SoundCue;
  consecutiveCorrectCount: number;
}

export function getAnswerSoundFeedback(
  status: FeedbackStatus,
  previousConsecutiveCorrectCount: number,
  sessionComplete: boolean,
): AnswerSoundFeedback {
  if (status === 'incorrect') return { cue: 'answer-incorrect', consecutiveCorrectCount: 0 };

  const previousCount = Number.isSafeInteger(previousConsecutiveCorrectCount) && previousConsecutiveCorrectCount > 0
    ? previousConsecutiveCorrectCount
    : 0;
  const consecutiveCorrectCount = previousCount + 1;
  if (sessionComplete) return { cue: 'session-complete', consecutiveCorrectCount };
  return {
    cue: previousCount > 0 ? 'answer-streak' : 'answer-correct',
    consecutiveCorrectCount,
  };
}
