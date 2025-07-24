import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataVoucherUpdate = async (formData) => {
  try {
    const { id, ...data } = formData;

    if (!id) throw new Error('ID data voucher tidak tersedia');

    await fetchWithAuth({
      method: 'patch',
      endpoint: `/master-data/data-voucher/${id}`,
      data: data,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
