import React from 'react';
import styles from './card.module.css';

type Props = {
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export default function Card({ title, children, actions }: Props) {
  return (
    <div className={styles.card}>
      {(title || actions) && (
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>{title}</div>
          <div>{actions}</div>
        </div>
      )}
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

