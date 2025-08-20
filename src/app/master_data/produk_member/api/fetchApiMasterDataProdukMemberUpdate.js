import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataProdukMemberUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID produk member tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/produk-member/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
