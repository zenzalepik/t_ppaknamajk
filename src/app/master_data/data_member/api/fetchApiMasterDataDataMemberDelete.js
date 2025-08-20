import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataDataMemberDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/data-member/${id}`,
    });

    console.log('Data Member berhasil dihapus');

    queryClient.invalidateQueries(['masterDataDataMember']); // Refresh tabel setelah delete

    setNotifMessage('Data member telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus member:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
