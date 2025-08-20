// hooks/useSyncPengaturanGlobal.js
import { useEffect } from 'react';
import { fetchApiPengaturanGlobal } from '../api/fetchApiPengaturanGlobal';
import { useQueryClient } from '@tanstack/react-query';

export function useSyncPengaturanGlobal(intervalMs = 10 * 60 * 1000) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await fetchApiPengaturanGlobal(); // ambil dari server dan simpan ke IndexedDB
        await queryClient.invalidateQueries(['pengaturanGlobal']); // trigger re-fetch
        console.log('[AutoSync] pengaturanGlobal diperbarui dari server.');
      } catch (error) {
        console.error('[AutoSync] Gagal sync data:', error);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [queryClient, intervalMs]);
}
