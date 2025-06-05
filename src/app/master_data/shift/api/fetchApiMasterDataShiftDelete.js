import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataShiftDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/shift/${id}`,
    });

    console.log('Shift berhasil dihapus');

    queryClient.invalidateQueries(['masterDataDataShift']); // Refresh tabel setelah delete

    setNotifMessage('Data shift telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus shift:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
