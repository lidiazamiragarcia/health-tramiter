'use client';
import React from 'react';

type Props = { message?: string | null; variant?: 'error' | 'success' | 'info' };

export default function ErrorBanner({ message, variant = 'error' }: Props) {
  if (!message) return null;
  const bg = variant === 'error' ? '#fee2e2' : variant === 'success' ? '#ecfccb' : '#eef2ff';
  const border = variant === 'error' ? '#fca5a5' : variant === 'success' ? '#bbf7d0' : '#c7d2fe';
  const color = variant === 'error' ? '#991b1b' : variant === 'success' ? '#365314' : '#3730a3';
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, color, padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem' }}>
      {message}
    </div>
  );
}

