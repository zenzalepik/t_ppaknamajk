import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanGlobalOperatorUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID global tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/setting/global/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
