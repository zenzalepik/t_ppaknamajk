import { fetchWithAuth } from '@/helpers/fetchWithAuth';

/**
 * API untuk menambahkan data transaksi keluar dengan token auth
 * @param {Object} formData - Data transaksi keluar yang dikirim
 * @returns {Promise<void>}
 */
export const fetchApiTransaksiUpdate = async (formData) => {
  try {
    await fetchWithAuth({
      method: 'patch',
      endpoint: `/transaksi`,
      data: formData,
    });
    // console.log(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
