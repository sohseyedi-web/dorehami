'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ResponsiveProvider } from '@/context/ResponsiveProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ResponsiveProvider>{children}</ResponsiveProvider>
    </QueryClientProvider>
  );
}
