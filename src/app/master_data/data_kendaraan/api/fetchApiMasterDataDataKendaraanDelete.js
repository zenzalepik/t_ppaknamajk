import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataDataKendaraanDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/kendaraan/${id}`,
    });

    console.log('Kendaraan berhasil dihapus');

    queryClient.invalidateQueries(['masterDataDataKendaraan']); // Refresh tabel setelah delete

    setNotifMessage('Data kendaraan telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus kendaraan:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
