import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataTenantDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/tenant/${id}`,
    });

    console.log('Tenant berhasil dihapus');

    queryClient.invalidateQueries(['masterDataTenant']); // Refresh tabel setelah delete

    setNotifMessage('Data tenant telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus tenant:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
