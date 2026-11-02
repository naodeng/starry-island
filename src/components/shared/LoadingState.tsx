import { CompassIcon, StarIcon } from 'naive-icons';
import '../../styles/loading-state.css';

export interface LoadingStateProps {
  title: string;
  description: string;
  headingLevel: 1 | 2 | 3;
  className?: string;
}

export default function LoadingState({ title, description, headingLevel, className }: LoadingStateProps) {
  const Heading = headingLevel === 1 ? 'h1' : headingLevel === 2 ? 'h2' : 'h3';
  const rootClassName = ['loading-state', className].filter(Boolean).join(' ');

  return (
    <div className={rootClassName} role="status" aria-live="polite" aria-atomic="true">
      <div className="loading-state-visual" aria-hidden="true">
        <span className="loading-state-orbit" />
        <span className="loading-state-compass"><CompassIcon size={28} /></span>
        <span className="loading-state-star"><StarIcon size={14} /></span>
      </div>
      <Heading className="loading-state-title">{title}</Heading>
      <p className="loading-state-description">{description}</p>
      <div className="loading-state-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
