import { useEffect, useRef, useState } from 'react';
import { Button } from 'animal-island-ui';
import { StarIcon } from 'naive-icons';
import type { ActivityDefinition } from '../../content/types';
import { submitAnswer } from '../../learning/answers';
import { getActivityAnswerSpeechText, getActivityQuestionSpeechText } from '../../learning/activitySpeech';
import { selectFeedbackMessage } from '../../learning/feedback';
import type { FeedbackStatus } from '../../learning/feedback';
import { speakWithLocalChineseVoice, stopLocalSpeech } from '../../sound/localChineseSpeech';
import { useSound } from '../../sound/SoundProvider';
import ActivityFeedback, { type ActivityFeedbackStatus } from './ActivityFeedback';
import CategorizeActivity from './CategorizeActivity';
import ChoiceActivity from './ChoiceActivity';
import ArithmeticActivity from './ArithmeticActivity';
import MeasurementActivity from './MeasurementActivity';
import MatchActivity from './MatchActivity';
import OrderActivity from './OrderActivity';

interface ActivityRendererProps {
  activity: ActivityDefinition;
  onSolved: (activityId: string) => void;
  onAnswerResult?: (status: FeedbackStatus, activityId: string) => void;
  random?: () => number;
  selectMessage?: (status: FeedbackStatus) => string;
}

export default function ActivityRenderer({ activity, onSolved, onAnswerResult, random, selectMessage }: ActivityRendererProps) {
  const [status, setStatus] = useState<ActivityFeedbackStatus>('unanswered');
  const [hintVisible, setHintVisible] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const solvedRef = useRef(false);
  const previousMessage = useRef<Record<FeedbackStatus, string | null>>({ correct: null, incorrect: null });
  const [speechStatus, setSpeechStatus] = useState<string | null>(null);
  const { enabled: soundEnabled } = useSound();

  useEffect(() => () => stopLocalSpeech(), [activity.id]);
  useEffect(() => {
    if (!soundEnabled) setSpeechStatus(null);
  }, [soundEnabled]);

  function readText(text: string, contentLabel: string) {
    const result = speakWithLocalChineseVoice(text);
    setSpeechStatus({
      spoken: `正在朗读${contentLabel}。`,
      unsupported: '此浏览器不支持语音朗读。',
      'voices-loading': '设备语音列表正在准备，请稍后再试。',
      'no-local-chinese-voice': '此设备没有可用的本地中文语音；请在设备中安装中文语音。不会联网播放。',
      failed: '设备暂时无法朗读，请稍后重试。',
    }[result]);
  }

  function chooseMessage(nextStatus: FeedbackStatus): string {
    const selected = selectMessage
      ? selectMessage(nextStatus)
      : selectFeedbackMessage(nextStatus, previousMessage.current[nextStatus], random);
    previousMessage.current[nextStatus] = selected;
    return selected;
  }

  function submit(answer: unknown) {
    if (solvedRef.current) return;
    stopLocalSpeech();
    if (submitAnswer(activity, answer)) {
      solvedRef.current = true;
      setStatus('correct');
      setMessage(chooseMessage('correct'));
      onAnswerResult?.('correct', activity.id);
      onSolved(activity.id);
    } else {
      setStatus('incorrect');
      setMessage(chooseMessage('incorrect'));
      onAnswerResult?.('incorrect', activity.id);
    }
  }

  function retry() {
    if (solvedRef.current) return;
    setAttempt((value) => value + 1);
    setStatus(hintVisible ? 'hint' : 'unanswered');
  }

  const visibleSpeechStatus = soundEnabled ? speechStatus : '请先在设置中开启语音提示。';

  let activityControl;
  if (activity.kind === 'choice') {
    activityControl = <ChoiceActivity key={attempt} activity={activity} disabled={status === 'correct'} onSubmit={submit} />;
  } else if (activity.kind === 'match') {
    activityControl = <MatchActivity key={attempt} activity={activity} disabled={status === 'correct'} onSubmit={submit} random={random} />;
  } else if (activity.kind === 'order') {
    activityControl = <OrderActivity key={attempt} activity={activity} disabled={status === 'correct'} onSubmit={submit} />;
  } else if (activity.kind === 'categorize') {
    activityControl = <CategorizeActivity key={attempt} activity={activity} disabled={status === 'correct'} onSubmit={submit} />;
  } else if (activity.kind === 'measurement') {
    activityControl = <MeasurementActivity key={attempt} activity={activity} disabled={status === 'correct'} onSubmit={submit} />;
  } else {
    activityControl = <ArithmeticActivity key={attempt} activity={activity} disabled={status === 'correct'} showSteps={status === 'correct'} onSubmit={submit} />;
  }

  return (
    <section className="activity-renderer" aria-labelledby={`activity-${activity.id}`}>
      <div className="activity-prompt-row">
        <span className="activity-symbol" aria-hidden="true"><StarIcon size={18} /></span>
        <h2 id={`activity-${activity.id}`} tabIndex={-1}>{activity.prompt}</h2>
      </div>
      <div className="activity-speech-controls">
        <Button type="default" disabled={!soundEnabled} onClick={() => readText(getActivityQuestionSpeechText(activity), '题目')}>
          朗读题目
        </Button>
        {status === 'correct' && (
          <Button type="default" disabled={!soundEnabled} onClick={() => readText(getActivityAnswerSpeechText(activity), '答案与讲解')}>
            朗读答案与讲解
          </Button>
        )}
        {visibleSpeechStatus && <span className="activity-speech-status" role="status" aria-live="polite">{visibleSpeechStatus}</span>}
      </div>
      {activityControl}
      <ActivityFeedback
        status={status}
        hint={activity.hint}
        explanation={activity.explanation}
        hintVisible={hintVisible}
        message={message}
        onShowHint={() => {
          setHintVisible(true);
          setStatus('hint');
        }}
        onRetry={retry}
      />
    </section>
  );
}
