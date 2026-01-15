'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { captureSpirit } from '@/shared/api';
import { Spirit } from '@/shared/types';
import { SPIRITS_QUERY_KEY } from '@/entities/spirit';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

export function useCaptureSpirit() {
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [capturingId, setCapturingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: captureSpirit,
    onMutate: async (spiritId: string) => {
      setCapturingId(spiritId);

      // Отменяем текущие запросы
      await queryClient.cancelQueries({ queryKey: SPIRITS_QUERY_KEY });

      // Сохраняем предыдущее состояние
      const previousSpirits = queryClient.getQueryData<Spirit[]>(SPIRITS_QUERY_KEY);

      // Оптимистично обновляем
      queryClient.setQueryData<Spirit[]>(SPIRITS_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((spirit) =>
          spirit.id === spiritId ? { ...spirit, status: 'captured' as const } : spirit
        );
      });

      return { previousSpirits };
    },
    onSuccess: (data, spiritId) => {
      if (data.success) {
        setNotification({
          message: `Дух успешно захвачен!`,
          type: 'success',
        });
      } else {
        // Откатываем при неуспешном ответе
        queryClient.setQueryData<Spirit[]>(SPIRITS_QUERY_KEY, (old) => {
          if (!old) return old;
          return old.map((spirit) =>
            spirit.id === spiritId ? { ...spirit, status: 'active' as const } : spirit
          );
        });
        setNotification({
          message: data.error || 'Не удалось захватить духа',
          type: 'error',
        });
      }
    },
    onError: (_error, spiritId, context) => {
      // Откатываем к предыдущему состоянию
      if (context?.previousSpirits) {
        queryClient.setQueryData(SPIRITS_QUERY_KEY, context.previousSpirits);
      }
      setNotification({
        message: 'Ошибка при захвате духа. Попробуйте снова.',
        type: 'error',
      });
    },
    onSettled: () => {
      setCapturingId(null);
    },
  });

  const handleCapture = useCallback(
    (spiritId: string) => {
      mutation.mutate(spiritId);
    },
    [mutation]
  );

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    capture: handleCapture,
    isCapturing: (id: string) => capturingId === id,
    notification,
    clearNotification,
  };
}
