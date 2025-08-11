import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiTransaksiDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/transaksi/${id}`,
    });

    console.log('Transaksi berhasil dihapus');

    queryClient.invalidateQueries(['transaksi']); // Refresh tabel setelah delete

    setNotifMessage('Data Transaksi telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus transaksi:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
