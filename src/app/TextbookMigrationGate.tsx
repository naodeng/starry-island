import { useEffect, useState } from 'react';
import { Button, Card } from 'animal-island-ui';
import App from '../App';
import { initializeGrade2Term1MathTextbookMigration } from './textbookMigration';

type MigrationGateState =
  | { status: 'loading' }
  | { status: 'ready'; showNotice: boolean }
  | { status: 'error' };

interface TextbookMigrationGateProps {
  initialize?: typeof initializeGrade2Term1MathTextbookMigration;
}

export default function TextbookMigrationGate({
  initialize = initializeGrade2Term1MathTextbookMigration,
}: TextbookMigrationGateProps) {
  const [state, setState] = useState<MigrationGateState>({ status: 'loading' });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    void initialize().then((result) => {
      if (active) setState({ status: 'ready', showNotice: result.showNotice });
    }).catch(() => {
      if (active) setState({ status: 'error' });
    });
    return () => { active = false; };
  }, [initialize, retry]);

  if (state.status === 'ready') return <App showTextbookMigrationNotice={state.showNotice} />;
  if (state.status === 'error') {
    return (
      <main className="route-message-page" role="alert">
        <div className="catalog-shell">
          <Card className="route-message-card" color="default">
            <p className="eyebrow">本机课程数据安全检查</p>
            <h1>课程更新暂时没有完成</h1>
            <p>尚未进入新版课程，本机现有记录没有被整体清除。请保持此页面打开后重试；不要清除此网站数据。</p>
            <Button type="primary" onClick={() => setRetry((value) => value + 1)}>重试更新</Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="route-message-page" aria-live="polite" aria-busy="true">
      <div className="catalog-shell">
        <Card className="route-message-card" color="default">
          <p className="eyebrow">本机课程数据安全检查</p>
          <h1>正在更新二年级上册数学</h1>
          <p>正在按新教材清理这门课程的旧进度；其他课程记录会保留。</p>
        </Card>
      </div>
    </main>
  );
}
