import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchApiMasterDataDataPenggunaUpdate } from '../api/fetchApiMasterDataDataPenggunaUpdate';

export const useHookStatusDataPengguna = () => {
  const queryClient = useQueryClient();
  const [notif, setNotif] = useState({ message: '', type: 'success' });

  const toggleStatus = async (id, status) => {
    try {
      await fetchApiMasterDataDataPenggunaUpdate({ id, status });
      setNotif({
        message: `Data pengguna berhasil di${status ? 'aktifkan' : 'nonaktifkan'}.`,
        type: 'success',
      });
      queryClient.invalidateQueries(['masterDataDataPengguna']);
    } catch (error) {
      setNotif({
        message: error.message,
        type: 'error',
      });
    }
  };

  return {
    toggleStatus, // panggil dengan (id, true) atau (id, false)
    notif,
    setNotif, // untuk reset notif
  };
};
