import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanTarifDendaUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID tarif denda tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/setting/tarif-denda/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
