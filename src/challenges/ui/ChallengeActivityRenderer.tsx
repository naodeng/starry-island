import { useState } from 'react';
import { StarIcon } from 'naive-icons';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeAnswer } from '../domain/types';
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
  const locked = disabled || submitted;

  function submit(answer: ChallengeAnswer) {
    if (locked) return;
    setSubmitted(true);
    onAnswer(answer);
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
      {control}
    </section>
  );
}
