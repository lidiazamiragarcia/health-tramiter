import React from 'react';
import Card from './Card';

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export default function ActionCard({ title, description, icon, children }: Props) {
  return (
    <Card title={title}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 48, minHeight: 48, borderRadius: 8, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          {description && <div style={{ marginBottom: 8, color: 'var(--on-surface-variant)' }}>{description}</div>}
          {children}
        </div>
      </div>
    </Card>
  );
}

