'use client';

import { useEffect } from 'react';
import styles from './Notification.module.scss';

export interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.close} onClick={onClose}>
        x
      </button>
    </div>
  );
}
