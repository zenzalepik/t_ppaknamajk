import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanPembayaranUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID pengaturan pembayaran tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/setting/payment/${id}`,
      data: data,
    });
    // console.log(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
