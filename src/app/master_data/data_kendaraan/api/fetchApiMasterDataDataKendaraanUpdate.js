import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataKendaraanUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID kendaraan tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/kendaraan/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
