'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect,useState } from 'react';

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient()); // ✅ Pastikan ini ada di dalam komponen client
  const [isElectron, setIsElectron] = useState(false);

   useEffect(() => {
      if (typeof window !== 'undefined' && window.electronAPI) {
        setIsElectron(true)
      }
    }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {/* <div className={isElectron ? 'pt-[-76px]' : ''}> */}
        {children}
        {/* </div> */}
    </QueryClientProvider>
  );
}
