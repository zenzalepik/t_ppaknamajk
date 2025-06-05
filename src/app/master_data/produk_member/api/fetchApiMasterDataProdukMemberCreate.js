import { fetchWithAuth } from '@/helpers/fetchWithAuth';


export const fetchApiMasterDataProdukMemberCreate = async (formData) => {
  try {
    await fetchWithAuth({
      method: 'post',
      endpoint: '/master-data/produk-member',
      data: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
