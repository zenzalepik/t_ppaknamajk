import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataMemberUpdatePerpanjangMasaAktif = async (
  formData
) => {
  try {
    const { id, ...data } = formData;

    if (!id && id !== 0) throw new Error('ID data member tidak tersedia');

    const stringId = String(id); // konversi ke string
    // console.log('formData:'+JSON.stringify(formData));
    // console.log('id:'+id);
    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/data-member/perpanjang-masa-aktif/${stringId}`,
      data: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
