import { useCallback, useState } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import BasicLayout from './../layouts/index';

export default function IndexPage() {
  const [view, setView] = useState(true);
  const trigerView = useCallback(() => {
    setView(!view);
  }, [view]);
  return (
    <BasicLayout>
      <Button onClick={trigerView}>给我变</Button>
      {view ? (
        <h1 className={styles.title}>Page True</h1>
      ) : (
        <h1 className={styles.title}> Page False </h1>
      )}
    </BasicLayout>
  );
}
