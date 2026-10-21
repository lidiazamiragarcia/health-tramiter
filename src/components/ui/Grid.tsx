import React from 'react';
import styles from './grid.module.css';

export default function Grid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.grid} ${className || ''}`.trim()}>{children}</div>;
}

