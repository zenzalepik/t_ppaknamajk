import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { queryClient } from '@/utils/queryClient';

export const fetchApiBantuanTiketDelete = async (
  id,
  setNotifMessage,
  setNotifType
) => {
  try {
    await fetchWithAuth({
      method: 'delete',
      endpoint: `/transaksi/permasalahan-atau-perbaikan/${id}`,
    });

    console.log('Laporan pengaduan masalah berhasil dihapus');

    queryClient.invalidateQueries(['bantuanTiketPermasalahanPerbaikan']); // Refresh tabel setelah delete

    setNotifMessage('Data pengaduan masalah telah dihapus');
    setNotifType('success');
  } catch (error) {
    console.error('Error saat menghapus laporan pengaduan masalah:', error);
    setNotifMessage(`Error: ${error.message}`);
    setNotifType('error');
  }
};
