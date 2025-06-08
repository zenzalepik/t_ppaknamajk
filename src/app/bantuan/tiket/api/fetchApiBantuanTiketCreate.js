import { fetchWithAuth } from '@/helpers/fetchWithAuth';

/**
 * API untuk menambahkan data perusahaan dengan token auth
 * @param {Object} formData - Data perusahaan yang dikirim
 * @returns {Promise<void>} 
 */
export const fetchApiBantuanTiketCreate = async (formData) => {
  try {
    await fetchWithAuth({
      method: 'post',
      endpoint: '/transaksi/permasalahan-atau-perbaikan',
      data: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
