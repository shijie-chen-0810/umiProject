import React from 'react';
import styles from './projectLayout.less';

export default function test(props: any) {
  return <div className={styles.pageLayout}>{props.children}</div>;
}
