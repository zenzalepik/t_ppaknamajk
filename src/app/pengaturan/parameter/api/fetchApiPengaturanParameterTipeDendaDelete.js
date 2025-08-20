import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiPengaturanParameterTipeDendaDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/setting/parameter/tipe-denda/${id}`,
    });

    console.log('Data berhasil dihapus');

    queryClient.invalidateQueries(['pengaturanParameterTipeDenda']); // Refresh tabel setelah delete

    setNotifMessage('Data telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus data:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
