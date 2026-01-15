'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetSpirits } from '@/shared/api';
import { SPIRITS_QUERY_KEY } from '@/entities/spirit';

export function useResetSpirits() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: resetSpirits,
    onSuccess: (spirits) => {
      queryClient.setQueryData(SPIRITS_QUERY_KEY, spirits);
    },
  });

  return {
    reset: mutation.mutate,
    isResetting: mutation.isPending,
  };
}
