'use client';

import { ModalsProvider } from '@/contexts/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: true,
      // gcTime: 60 * 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalsProvider>{children}</ModalsProvider>
    </QueryClientProvider>
  );
}
