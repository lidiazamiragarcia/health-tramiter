import React from 'react';
import styles from './ActivityItem.module.css';

export default function ActivityItem({ title, subtitle, color = 'var(--info)' }: { title: string; subtitle?: string; color?: string }) {
  return (
    <div className={styles.item}>
      <div className={styles.dot} style={{ background: color }} />
      <div className={styles.info}>
        <p>{title}</p>
        {subtitle && <small>{subtitle}</small>}
      </div>
    </div>
  );
}

