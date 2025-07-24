import { fetchWithAuthFormUrlCode } from '@/helpers/fetchWithAuthFormUrlCode';

/**
 * API untuk menambahkan data level pengguna (form-url-encoded)
 * @param {Object} formData - Data level pengguna
 * @returns {Promise<void>}
 */
export const fetchApiMasterDataLevelPenggunaCreate = async (formData) => {
  try {
    await fetchWithAuthFormUrlCode({
      method: 'post',
      endpoint: '/master-data/level-pengguna',
      data: formData, // akan otomatis dikonversi ke bentuk x-www-form-urlencoded oleh qs.stringify
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
