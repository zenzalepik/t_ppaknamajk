// api/profil.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import { getUserId } from '@/utils/db';

export const fetchApiProfil = async () => {
  const userId = await getUserId(); // Ambil ID user yang tersimpan
  if (!userId) throw new Error('User ID tidak ditemukan');
  return await fetchWithAuth({
    method: 'get',
    endpoint: `/profile/${userId}`,
  });
};
