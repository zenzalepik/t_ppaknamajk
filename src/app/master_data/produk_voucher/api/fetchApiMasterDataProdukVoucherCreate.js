import { fetchWithAuth } from '@/helpers/fetchWithAuth';


export const fetchApiMasterDataProdukVoucherCreate = async (formData) => {
  try {
    await fetchWithAuth({
      method: 'post',
      endpoint: '/master-data/produk-voucher',
      data: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
