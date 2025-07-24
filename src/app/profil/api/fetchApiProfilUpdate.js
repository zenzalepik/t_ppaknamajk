import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiProfilUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID pengguna tidak tersedia');

    console.log('tes'+id);

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/profile/${id}`,
      data: data,
    });

  } catch (error) {
    throw new Error(error.message);
  }
};
