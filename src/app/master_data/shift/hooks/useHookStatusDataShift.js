import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchApiMasterDataShiftUpdate } from '../api/fetchApiMasterDataShiftUpdate';

export const useHookStatusDataShift = () => {
  const queryClient = useQueryClient();
  const [notif, setNotif] = useState({ message: '', type: 'success' });

  const toggleStatus = async (id, status) => {
    try {
      await fetchApiMasterDataShiftUpdate({ id, status });
      setNotif({
        message: `Data shift berhasil di${status ? 'aktifkan' : 'nonaktifkan'}.`,
        type: 'success',
      });
      queryClient.invalidateQueries(['masterDataDataShift']);
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
