import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataShiftUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID shift tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/shift/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
