import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataPerusahaanUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID prusahaan tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/perusahaan/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
