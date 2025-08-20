import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataProdukVoucherUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID produk voucher tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/produk-voucher/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
