import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataPerusahaanDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/perusahaan/${id}`,
    });

    console.log('Perusahaan berhasil dihapus');

    queryClient.invalidateQueries(['masterDataPerusahaan']); // Refresh tabel setelah delete

    setNotifMessage('Data perusahaan telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus perusahaan:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
