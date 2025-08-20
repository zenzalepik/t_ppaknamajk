import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchApiPengaturanTarifDendaUpdate } from '../api/fetchApiPengaturanTarifDendaUpdate';

export const useHookStatusTarifDenda = () => {
  const queryClient = useQueryClient();
  const [notif, setNotif] = useState({ message: '', type: 'success' });

  const toggleStatus = async (id, status) => {
    try {
      await fetchApiPengaturanTarifDendaUpdate({ id, status });
      setNotif({
        message: `Tarif denda berhasil di${status ? 'aktifkan' : 'nonaktifkan'}.`,
        type: 'success',
      });
      queryClient.invalidateQueries(['pengaturanTarifDenda']);
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
