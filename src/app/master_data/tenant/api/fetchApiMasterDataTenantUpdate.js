import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataTenantUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID tenant tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/tenant/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
