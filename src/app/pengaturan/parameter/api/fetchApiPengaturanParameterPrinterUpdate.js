import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanParameterPrinterUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID parameter tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/setting/parameter/nama-printer/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
