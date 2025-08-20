import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataVoucherCreate = async (formData) => {
  try {
    await fetchWithAuth({
      method: 'post',
      endpoint: '/master-data/data-voucher',
      data: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
