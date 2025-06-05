import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataPOSDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/pos/${id}`,
    });

    console.log('POS berhasil dihapus');

    queryClient.invalidateQueries(['masterDataPOS']); // Refresh tabel setelah delete

    setNotifMessage('Data POS telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus POS:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
