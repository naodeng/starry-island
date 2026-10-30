import { Button, Card } from 'animal-island-ui';
import type { ReactNode } from 'react';
import '../../styles/empty-state.css';

export interface EmptyStateProps {
  title: string;
  description: string;
  headingLevel: 2 | 3;
  icon?: ReactNode;
  action?: { label: string; onAction: () => void };
  className?: string;
}

export default function EmptyState({ title, description, headingLevel, icon, action, className }: EmptyStateProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const rootClassName = ['empty-state', className].filter(Boolean).join(' ');

  return (
    <Card className={rootClassName} type="dashed">
      <div className="empty-state-content">
        {icon ? <span className="empty-state-icon" aria-hidden="true">{icon}</span> : null}
        <Heading className="empty-state-title">{title}</Heading>
        <p className="empty-state-description">{description}</p>
        {action ? <Button type="default" onClick={action.onAction}>{action.label}</Button> : null}
      </div>
    </Card>
  );
}
