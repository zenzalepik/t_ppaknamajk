// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanGlobal = async () => {
  return await fetchWithAuth({
    method: 'get',
    endpoint: '/setting/global',
  });
};
