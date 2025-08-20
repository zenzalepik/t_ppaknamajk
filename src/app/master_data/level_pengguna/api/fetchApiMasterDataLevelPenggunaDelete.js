import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataLevelPenggunaDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/level-pengguna/${id}`,
    });

    console.log('Level Pengguna berhasil dihapus');

    queryClient.invalidateQueries(['masterDataLevelPengguna']); // Refresh tabel setelah delete

    setNotifMessage('Data level pengguna telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus level pengguna:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
