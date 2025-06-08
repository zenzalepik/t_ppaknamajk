import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanTarifParkirUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID tarif parkir tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/setting/tarif-parkir/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
