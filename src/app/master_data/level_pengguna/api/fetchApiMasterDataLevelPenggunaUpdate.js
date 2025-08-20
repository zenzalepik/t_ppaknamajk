import { fetchWithAuthFormUrlCode } from '@/helpers/fetchWithAuthFormUrlCode';

/**
 * API untuk memperbarui data level pengguna (form-url-encoded)
 * @param {Object} formData - Data level pengguna, harus mengandung `id`
 * @returns {Promise<void>}
 */
export const fetchApiMasterDataLevelPenggunaUpdate = async (formData) => {
  try {
    if (!formData?.id) throw new Error('ID level pengguna tidak ditemukan.');

    await fetchWithAuthFormUrlCode({
      method: 'patch', // atau 'patch' jika backend pakai PATCH
      endpoint: `/master-data/level-pengguna/${formData.id}`,
      data: formData, // helper akan otomatis stringify x-www-form-urlencoded
    });
  } catch (error) {
    throw new Error(error?.message || 'Gagal memperbarui data level pengguna.');
  }
};
