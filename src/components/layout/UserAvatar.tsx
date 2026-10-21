'use client';
import React, { useState } from 'react';
import { getAvatarColors, getEmailInitial } from '../../utils/avatar';
import styles from './userAvatar.module.css';

type Props = {
  email?: string | null;
  imageUrl?: string | null;
  size?: 'sm' | 'md';
  className?: string;
  title?: string;
};

export default function UserAvatar({
  email,
  imageUrl,
  size = 'sm',
  className = '',
  title,
}: Props) {
  const [imageError, setImageError] = useState(false);
  const initial = getEmailInitial(email);
  const colors = getAvatarColors(email);
  const showImage = Boolean(imageUrl) && !imageError;

  return (
    <span
      className={`${styles.avatar} ${size === 'md' ? styles.avatarMd : styles.avatarSm} ${className}`.trim()}
      style={showImage ? undefined : { backgroundColor: colors.background, color: colors.color }}
      title={title || email || undefined}
      aria-hidden={title ? undefined : true}
    >
      {showImage ? (
        <img
          src={imageUrl!}
          alt={title || 'Foto de perfil'}
          className={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={styles.initial}>{initial}</span>
      )}
    </span>
  );
}
