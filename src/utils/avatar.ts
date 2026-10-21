const AVATAR_PALETTE = [
  { background: '#dbeafe', color: '#1d4ed8' },
  { background: '#dcfce7', color: '#15803d' },
  { background: '#fce7f3', color: '#be185d' },
  { background: '#ffedd5', color: '#c2410c' },
  { background: '#ede9fe', color: '#6d28d9' },
  { background: '#ccfbf1', color: '#0f766e' },
  { background: '#fef3c7', color: '#b45309' },
  { background: '#e0e7ff', color: '#4338ca' },
];

export function getEmailInitial(email?: string | null): string {
  const trimmed = String(email || '').trim();
  if (!trimmed) return '?';
  return trimmed.charAt(0).toUpperCase();
}

export function getAvatarColors(email?: string | null) {
  const value = String(email || '').trim().toLowerCase();
  if (!value) {
    return { background: 'var(--primary-light)', color: 'var(--primary)' };
  }

  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}
