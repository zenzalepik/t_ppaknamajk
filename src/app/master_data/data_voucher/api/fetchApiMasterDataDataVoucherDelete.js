import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataDataVoucherDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/data-voucher/${id}`,
    });

    console.log('Data voucher berhasil dihapus');

    queryClient.invalidateQueries(['masterDataDataVoucher']);

    setNotifMessage('Data voucher telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus voucher:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
