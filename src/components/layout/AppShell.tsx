'use client';
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import shellStyles from './appShell.module.css';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function AppShell({ children, title }: Props) {
  return (
    <div className={shellStyles.shell}>
      <Sidebar />
      <div className={shellStyles.main}>
        <Navbar title={title} />
        <main className={shellStyles.content}>{children}</main>
      </div>
    </div>
  );
}

export { shellStyles };
