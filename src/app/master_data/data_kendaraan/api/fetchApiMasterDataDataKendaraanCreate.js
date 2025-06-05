import { fetchWithAuth } from '@/helpers/fetchWithAuth';

/**
 * API untuk menambahkan data perusahaan dengan token auth
 * @param {Object} formData - Data perusahaan yang dikirim
 * @returns {Promise<void>} 
 */
export const fetchApiMasterDataDataKendaraanCreate = async (formData) => {
  try {
    await fetchWithAuth({
      method: 'post',
      endpoint: '/master-data/kendaraan',
      data: formData,
    });
  } catch (error) {
    // console.log(error);
    throw new Error(error.message);
  }
};
