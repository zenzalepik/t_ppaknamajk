import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataMemberUpdatePerpanjangMasaAktif = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID data member tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/data-member/perpanjang-masa-aktif/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
