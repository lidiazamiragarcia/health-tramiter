'use client';
import React from 'react';
import UserMenu from './UserMenu';
import styles from './navbar.module.css';

export default function Navbar({ title }: { title?: string }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.title}>{title || 'Health Tramiter'}</div>
      <div className={styles.userInfo}>
        <UserMenu />
      </div>
    </header>
  );
}
