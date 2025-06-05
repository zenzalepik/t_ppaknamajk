import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataProdukVoucherDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/produk-voucher/${id}`,
    });

    console.log('Produk voucher berhasil dihapus');

    queryClient.invalidateQueries(['masterDataProdukVoucher']); // Refresh tabel setelah delete

    setNotifMessage('Data produk voucher telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus produk voucher:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
