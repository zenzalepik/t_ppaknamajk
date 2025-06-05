// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanPembayaran = async () => {
  return await fetchWithAuth({
    method: 'get',
    endpoint: '/setting/payment',
  });
};
