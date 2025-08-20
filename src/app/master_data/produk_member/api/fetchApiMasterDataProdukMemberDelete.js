import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiMasterDataProdukMemberDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/master-data/produk-member/${id}`,
    });

    queryClient.invalidateQueries(['masterDataProdukMember']); // Refresh tabel setelah delete

    setNotifMessage('Data produk member telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus produk member:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
