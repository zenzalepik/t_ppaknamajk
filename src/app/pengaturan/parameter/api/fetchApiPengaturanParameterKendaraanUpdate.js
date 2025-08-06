import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanParameterKendaraanUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID parameter tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/setting/parameter/tipe-kendaraan/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
