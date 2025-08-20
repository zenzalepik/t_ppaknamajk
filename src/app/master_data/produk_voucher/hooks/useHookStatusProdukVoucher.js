import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchApiMasterDataProdukVoucherUpdate } from '../api/fetchApiMasterDataProdukVoucherUpdate';

export const useHookStatusProdukVoucher = () => {
  const queryClient = useQueryClient();
  const [notif, setNotif] = useState({ message: '', type: 'success' });

  const toggleStatus = async (id, status) => {
    try {
      await fetchApiMasterDataProdukVoucherUpdate({ id, status });
      setNotif({
        message: `Produk voucher berhasil di${status ? 'aktifkan' : 'nonaktifkan'}.`,
        type: 'success',
      });
      queryClient.invalidateQueries(['masterDataProdukVoucher']);
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
