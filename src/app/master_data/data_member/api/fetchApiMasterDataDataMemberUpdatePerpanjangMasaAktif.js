import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataMemberUpdatePerpanjangMasaAktif = async (
  formData
) => {
  try {
    // const { id, ...data } = formData;

    // if (!id && id !== 0) throw new Error('ID data member tidak tersedia');

    // const stringId = String(id);
    await fetchWithAuth({
      method: 'post',
      endpoint: `/master-data/data-member/transaksi-riwayat-member-v3`,
      data: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
