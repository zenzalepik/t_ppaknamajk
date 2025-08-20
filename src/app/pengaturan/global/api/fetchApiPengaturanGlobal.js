import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { getPengaturanGlobal, savePengaturanGlobal } from '@/utils/dbGlobals';

export const fetchApiPengaturanGlobal = async () => {
  // 1. Selalu ambil data terbaru dari server
  const response = await fetchWithAuth({
    method: 'get',
    endpoint: '/setting/global',
  });

  // 2. Simpan hasil terbaru ke IndexedDB
  await savePengaturanGlobal(response); // simpan di IndexedDB

  // 3. Kembalikan responsnya
  return response;
};

/*Kode Lama
// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanGlobal = async () => {
  return await fetchWithAuth({
    method: 'get',
    endpoint: '/setting/global',
  });
};
*/
