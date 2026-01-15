import { Spirit } from '@/shared/types';

// Мок-данные духов
export const spiritsData: Spirit[] = [
  {
    id: '1',
    name: 'Кицунэ-но-Ками',
    location: 'Район Синдзюку, станция метро',
    threatLevel: 'high',
    energyLevel: 87,
    status: 'active',
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
    description: 'Древний лисий дух. Способен создавать иллюзии и влиять на разум людей.',
  },
  {
    id: '2',
    name: 'Они-Тэнгу',
    location: 'Парк Уэно, северная часть',
    threatLevel: 'critical',
    energyLevel: 95,
    status: 'active',
    detectedAt: new Date(Date.now() - 7200000).toISOString(),
    description: 'Гибрид они и тэнгу. Крайне агрессивен, обладает способностью к полёту.',
  },
  {
    id: '3',
    name: 'Юки-Онна',
    location: 'Токийский залив, пирс 7',
    threatLevel: 'medium',
    energyLevel: 62,
    status: 'active',
    detectedAt: new Date(Date.now() - 1800000).toISOString(),
    description: 'Снежная женщина. Понижает температуру в радиусе 50 метров.',
  },
  {
    id: '4',
    name: 'Нурарихён',
    location: 'Район Асакуса, храм Сэнсо-дзи',
    threatLevel: 'low',
    energyLevel: 34,
    status: 'active',
    detectedAt: new Date(Date.now() - 900000).toISOString(),
    description: 'Лидер ночного парада. Проникает в дома и ведёт себя как хозяин.',
  },
  {
    id: '5',
    name: 'Каппа-Рю',
    location: 'Река Сумида, мост Адзума',
    threatLevel: 'medium',
    energyLevel: 58,
    status: 'active',
    detectedAt: new Date(Date.now() - 5400000).toISOString(),
    description: 'Водяной дракон-каппа. Затягивает жертв под воду.',
  },
  {
    id: '6',
    name: 'Ямаба-Тэнси',
    location: 'Район Сибуя, перекрёсток',
    threatLevel: 'high',
    energyLevel: 78,
    status: 'active',
    detectedAt: new Date(Date.now() - 2700000).toISOString(),
    description: 'Горная ведьма в обличии ангела. Собирает человеческие души.',
  },
];

// Хранилище состояния для имитации персистентности
let spirits = [...spiritsData];

export function getSpirits(): Spirit[] {
  return spirits;
}

export function updateSpirit(id: string, updates: Partial<Spirit>): Spirit | null {
  const index = spirits.findIndex((s) => s.id === id);
  if (index === -1) return null;

  spirits[index] = { ...spirits[index], ...updates };
  return spirits[index];
}

export function resetSpirits(): void {
  spirits = [...spiritsData];
}
