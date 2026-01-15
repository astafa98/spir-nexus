'use client';

import { Spirit } from '@/shared/types';
import { threatLevelColors, threatLevelLabels } from '@/shared/lib';
import styles from './SpiritCard.module.scss';

export interface SpiritCardProps {
  spirit: Spirit;
  onCapture: (id: string) => void;
  isCapturing: boolean;
}

export function SpiritCard({ spirit, onCapture, isCapturing }: SpiritCardProps) {
  const threatColor = threatLevelColors[spirit.threatLevel];
  const threatLabel = threatLevelLabels[spirit.threatLevel];
  const isCaptured = spirit.status === 'captured';
  const detectedDate = new Date(spirit.detectedAt).toLocaleString('ru-RU');

  return (
    <div
      className={`${styles.card} ${isCaptured ? styles.captured : ''}`}
      style={{ '--threat-color': threatColor } as React.CSSProperties}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{spirit.name}</h3>
        <span className={styles.threatBadge}>{threatLabel}</span>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.label}>Локация:</span>
          <span className={styles.value}>{spirit.location}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Энергия:</span>
          <div className={styles.energyBar}>
            <div
              className={styles.energyFill}
              style={{ width: `${spirit.energyLevel}%` }}
            />
            <span className={styles.energyValue}>{spirit.energyLevel}%</span>
          </div>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Обнаружен:</span>
          <span className={styles.value}>{detectedDate}</span>
        </div>
        <p className={styles.description}>{spirit.description}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.status}>
          {isCaptured ? 'Захвачен' : 'Активен'}
        </span>
        <button
          className={styles.captureButton}
          onClick={() => onCapture(spirit.id)}
          disabled={isCaptured || isCapturing}
        >
          {isCapturing ? 'Захват...' : isCaptured ? 'Захвачен' : 'Захватить'}
        </button>
      </div>
    </div>
  );
}
