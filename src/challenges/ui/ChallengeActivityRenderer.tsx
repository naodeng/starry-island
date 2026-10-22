import { useEffect, useState } from 'react';
import { Button } from 'animal-island-ui';
import { StarIcon } from 'naive-icons';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeAnswer } from '../domain/types';
import { useSound } from '../../sound/SoundProvider';
import { speakWithLocalChineseVoice, stopLocalSpeech } from '../../sound/localChineseSpeech';
import ArithmeticActivity from '../../components/game/ArithmeticActivity';
import CategorizeActivity from '../../components/game/CategorizeActivity';
import ChoiceActivity from '../../components/game/ChoiceActivity';
import MatchActivity from '../../components/game/MatchActivity';
import OrderActivity from '../../components/game/OrderActivity';

interface ChallengeActivityRendererProps {
  activity: ActivityDefinition;
  disabled: boolean;
  onAnswer: (answer: ChallengeAnswer) => void;
}

export default function ChallengeActivityRenderer({ activity, disabled, onAnswer }: ChallengeActivityRendererProps) {
  const [submitted, setSubmitted] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<string | null>(null);
  const { enabled: soundEnabled } = useSound();
  const locked = disabled || submitted;

  useEffect(() => () => stopLocalSpeech(), []);

  function submit(answer: ChallengeAnswer) {
    if (locked) return;
    stopLocalSpeech();
    setSubmitted(true);
    onAnswer(answer);
  }

  function readPrompt() {
    const result = speakWithLocalChineseVoice(activity.prompt);
    setSpeechStatus({
      spoken: '正在朗读题目。',
      unsupported: '此浏览器不支持语音朗读。',
      'voices-loading': '设备语音列表正在准备，请稍后再试。',
      'no-local-chinese-voice': '此设备没有可用的本地中文语音；请在设备中安装中文语音。不会联网播放。',
      failed: '设备暂时无法朗读题目，请稍后重试。',
    }[result]);
  }

  let control;
  switch (activity.kind) {
    case 'choice':
      control = <ChoiceActivity activity={activity} disabled={locked} onSubmit={submit} />;
      break;
    case 'match':
      control = <MatchActivity activity={activity} disabled={locked} onSubmit={submit} />;
      break;
    case 'order':
      control = <OrderActivity activity={activity} disabled={locked} onSubmit={submit} />;
      break;
    case 'categorize':
      control = <CategorizeActivity activity={activity} disabled={locked} onSubmit={submit} />;
      break;
    case 'arithmetic':
      control = <ArithmeticActivity activity={activity} disabled={locked} showSteps={false} onSubmit={submit} />;
      break;
    case 'measurement':
      control = <p role="alert">这道题暂时不能在闯关中呈现，请退出并联系课程维护者。</p>;
      break;
  }

  return (
    <section className="activity-renderer challenge-activity" aria-labelledby={`challenge-activity-${activity.id}`}>
      <div className="activity-prompt-row">
        <span className="activity-symbol" aria-hidden="true"><StarIcon size={18} /></span>
        <h2 id={`challenge-activity-${activity.id}`}>{activity.prompt}</h2>
      </div>
      <div className="challenge-prompt-speech">
        <Button type="default" disabled={!soundEnabled || disabled} onClick={readPrompt}>朗读题目</Button>
        {!soundEnabled && <span className="challenge-speech-status">请先在设置中开启语音提示。</span>}
        {speechStatus && <span className="challenge-speech-status" role="status" aria-live="polite">{speechStatus}</span>}
      </div>
      {control}
    </section>
  );
}
