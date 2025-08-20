import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataDataPenggunaDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/profile/${id}`,
    });

    console.log('Data pengguna berhasil dihapus');

    queryClient.invalidateQueries(['masterDataDataPengguna']); // Refresh tabel setelah delete

    setNotifMessage('Data pengguna telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus pengguna:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
