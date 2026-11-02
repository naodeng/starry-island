import { describe, expect, it } from 'vitest';
import { ANSWER_PRAISE_ASSETS, getAnswerSoundFeedback, getSoundCueAsset, SOUND_CUE_ASSETS } from './soundCues';

describe('answer sound cues', () => {
  it('usesCorrectCueAtStart', () => {
    expect(getAnswerSoundFeedback('correct', 0, false)).toEqual({
      cue: 'answer-correct',
      consecutiveCorrectCount: 1,
    });
  });

  it('usesStreakCueAfterConsecutiveAnswers', () => {
    expect(getAnswerSoundFeedback('correct', 1, false)).toEqual({
      cue: 'answer-streak',
      consecutiveCorrectCount: 2,
    });
  });

  it('resetsStreakAfterIncorrectAnswer', () => {
    expect(getAnswerSoundFeedback('incorrect', 4, false)).toEqual({
      cue: 'answer-incorrect',
      consecutiveCorrectCount: 0,
    });
  });

  it('choosesSessionCompleteCueBeforeStreakCue', () => {
    expect(getAnswerSoundFeedback('correct', 6, true)).toEqual({
      cue: 'session-complete',
      consecutiveCorrectCount: 7,
    });
  });

  it('doesNotChooseSessionCompleteForAnIncorrectFinalAttempt', () => {
    expect(getAnswerSoundFeedback('incorrect', 6, true)).toEqual({
      cue: 'answer-incorrect',
      consecutiveCorrectCount: 0,
    });
  });

  it('mapsEachCueToItsLocalMp3Asset', () => {
    expect(SOUND_CUE_ASSETS).toEqual({
      'answer-correct': '/audio/answer-correct.mp3',
      'answer-streak': '/audio/answer-streak.mp3',
      'session-complete': '/audio/session-complete.mp3',
      'answer-incorrect': '/audio/answer-incorrect.mp3',
      'interaction-click': '/audio/interaction-click.mp3',
    });
  });

  it('randomlyUsesLocalPraiseClipsForCorrectAnswersWithoutRepeatingThePreviousClip', () => {
    expect(ANSWER_PRAISE_ASSETS).toHaveLength(13);
    expect(ANSWER_PRAISE_ASSETS).toContain('/audio/answer-correct.mp3');
    expect(ANSWER_PRAISE_ASSETS).toContain('/audio/answer-streak.mp3');
    expect(ANSWER_PRAISE_ASSETS).toContain('/audio/answer-praise-11.mp3');

    const first = getSoundCueAsset('answer-correct', null, () => 0);
    const next = getSoundCueAsset('answer-streak', first, () => 0);
    expect(first).toBe('/audio/answer-correct.mp3');
    expect(next).toBe('/audio/answer-streak.mp3');
    expect(next).not.toBe(first);
  });

  it('fallsBackToTheCueAssetWhenTheRandomIndexIsOutOfRange', () => {
    expect(getSoundCueAsset('answer-correct', null, () => 1)).toBe(SOUND_CUE_ASSETS['answer-correct']);
  });

  it('keepsIncorrectAndCompletionCuesDedicated', () => {
    expect(getSoundCueAsset('answer-incorrect', '/audio/answer-correct.mp3', () => 0)).toBe('/audio/answer-incorrect.mp3');
    expect(getSoundCueAsset('session-complete', '/audio/answer-correct.mp3', () => 0)).toBe('/audio/session-complete.mp3');
    expect(getSoundCueAsset('interaction-click', null, () => 0)).toBe('/audio/interaction-click.mp3');
  });
});
