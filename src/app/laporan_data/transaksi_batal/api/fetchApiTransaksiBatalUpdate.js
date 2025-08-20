import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiTransaksiBatalUpdate = async (formData) => {
  try {
    const { no_tiket_atau_nomor_polisi, ...data } = formData;

    if (!no_tiket_atau_nomor_polisi) throw new Error('Nomor tiket atau nomor polisi tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/transaksi/cancel-transaksi?no_tiket_atau_nomor_polisi=${no_tiket_atau_nomor_polisi}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
