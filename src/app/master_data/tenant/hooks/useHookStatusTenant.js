import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchApiMasterDataTenantUpdate } from '../api/fetchApiMasterDataTenantUpdate';

export const useHookStatusTenant = () => {
  const queryClient = useQueryClient();
  const [notif, setNotif] = useState({ message: '', type: 'success' });

  const toggleStatus = async (id, status) => {
    try {
      await fetchApiMasterDataTenantUpdate({ id, status });
      setNotif({
        message: `Perusahaan berhasil di${
          status ? 'aktifkan' : 'nonaktifkan'
        }.`,
        type: 'success',
      });
      queryClient.invalidateQueries(['masterDataPerusahaan']);
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
