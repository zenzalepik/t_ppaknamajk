import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataPenggunaUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID pengguna tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/profile/${id}`,
      data: data,
    });
    // console.log(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
