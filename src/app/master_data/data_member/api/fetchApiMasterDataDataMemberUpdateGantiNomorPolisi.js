import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataMemberUpdateGantiNomorPolisi = async (formData) => {
  try {
    const { id, ...data } = formData;

    console.log('id member:'+id);
    console.log(JSON.stringify(formData));
    if (!id) throw new Error('ID data member tidak tersedia');

    await fetchWithAuth({
      method: 'post',
      // endpoint: `/master-data/data-member/ganti-nopol/${id}`,
      endpoint:`/master-data/data-nomor-polisi-v2/create`,
      data: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
