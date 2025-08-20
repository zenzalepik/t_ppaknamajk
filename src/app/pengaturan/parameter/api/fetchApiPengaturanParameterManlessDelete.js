import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiPengaturanParameterManlessDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/setting/parameter/tipe-manless/${id}`,
    });

    console.log('Data berhasil dihapus');

    queryClient.invalidateQueries(['pengaturanParameterManless']); // Refresh tabel setelah delete

    setNotifMessage('Data telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus data:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
