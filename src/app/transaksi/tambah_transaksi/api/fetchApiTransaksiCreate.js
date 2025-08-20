import { fetchWithAuth } from '@/helpers/fetchWithAuth';

/**
 * API untuk menambahkan data transaksi masuk dengan token auth
 * @param {Object} formData - Data transaksi masuk yang dikirim
 * @returns {Promise<void>}
 */
export const fetchApiTransaksiCreate = async (formData) => {
  try {
    await fetchWithAuth({
      method: 'post',
      endpoint: '/transaksi',
      data: formData,
    });
  } catch (error) {
    // console.log(error);
    throw new Error(error.message);
  }
};
