import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataMemberUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID prusahaan tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/data-member/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
