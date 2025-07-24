import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchApiPengaturanPembayaranUpdate } from '../api/fetchApiPengaturanPembayaranUpdate';

export const useHookStatusPengaturanPembayaran = () => {
  const queryClient = useQueryClient();
  const [notif, setNotif] = useState({ message: '', type: 'success' });

  const toggleStatus = async (id, status, jenis_payment) => {
    try {
      await fetchApiPengaturanPembayaranUpdate({ id, status, jenis_payment });
      setNotif({
        message: `Pengaturan pembayaran berhasil di${status ? 'aktifkan' : 'nonaktifkan'}.`,
        type: 'success',
      });
      queryClient.invalidateQueries(['pengaturanTarifParkir']);
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
