import React from 'react';
import styles from './button.module.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export default function Button({ variant = 'primary', children, ...rest }: Props) {
  return (
    <button className={variant === 'primary' ? styles.btnPrimary : styles.btnSecondary} {...rest}>
      {children}
    </button>
  );
}

