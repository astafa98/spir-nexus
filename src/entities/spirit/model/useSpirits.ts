'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { fetchSpirits, createEventsSource } from '@/shared/api';
import { Spirit, sseEventSchema } from '@/shared/types';

export const SPIRITS_QUERY_KEY = ['spirits'] as const;

export function useSpirits() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: SPIRITS_QUERY_KEY,
    queryFn: fetchSpirits,
    refetchOnWindowFocus: false,
  });

  // Обработчик SSE событий
  const handleSSEMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const parsedEvent = sseEventSchema.parse(data);

        queryClient.setQueryData<Spirit[]>(SPIRITS_QUERY_KEY, (oldData) => {
          if (!oldData) return oldData;

          switch (parsedEvent.type) {
            case 'update':
              return oldData.map((spirit) =>
                spirit.id === parsedEvent.spirit.id ? parsedEvent.spirit : spirit
              );
            case 'new':
              // Проверяем, нет ли уже такого духа
              if (oldData.some((s) => s.id === parsedEvent.spirit.id)) {
                return oldData;
              }
              return [...oldData, parsedEvent.spirit];
            case 'remove':
              return oldData.filter((spirit) => spirit.id !== parsedEvent.spirit.id);
            default:
              return oldData;
          }
        });
      } catch {
        // Игнорируем невалидные события
      }
    },
    [queryClient]
  );

  // Подключение к SSE
  useEffect(() => {
    const eventSource = createEventsSource();

    eventSource.onmessage = handleSSEMessage;

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [handleSSEMessage]);

  return query;
}
