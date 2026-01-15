import {
  Spirit,
  spiritsListSchema,
  captureResponseSchema,
  CaptureResponse,
} from '@/shared/types';

const API_BASE = '/api';

// Получение списка духов
export async function fetchSpirits(): Promise<Spirit[]> {
  const response = await fetch(`${API_BASE}/spirits`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки списка духов');
  }

  const data = await response.json();
  return spiritsListSchema.parse(data);
}

// Захват духа
export async function captureSpirit(spiritId: string): Promise<CaptureResponse> {
  const response = await fetch(`${API_BASE}/spirits/${spiritId}/capture`, {
    method: 'POST',
  });

  const data = await response.json();
  return captureResponseSchema.parse(data);
}

// Подключение к SSE потоку
export function createEventsSource(): EventSource {
  return new EventSource(`${API_BASE}/events`);
}

// Сброс данных к начальному состоянию
export async function resetSpirits(): Promise<Spirit[]> {
  const response = await fetch(`${API_BASE}/spirits/reset`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Ошибка сброса данных');
  }

  const data = await response.json();
  return spiritsListSchema.parse(data.spirits);
}
