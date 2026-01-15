import { ThreatLevel } from '@/shared/types';

// Цвета для уровней угрозы
export const threatLevelColors: Record<ThreatLevel, string> = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
  critical: '#9c27b0',
};

// Названия уровней угрозы на русском
export const threatLevelLabels: Record<ThreatLevel, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
};
