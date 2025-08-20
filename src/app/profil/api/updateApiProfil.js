import axios from 'axios';
import { getToken } from '@/utils/db';

export const updateApiProfil = async (updatedData) => {
  const token = await getToken();
  if (!token) throw new Error('Token tidak ditemukan, harap login ulang.');

  try {
    const response = await axios.put('http://localhost:4000/profile', updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Terjadi kesalahan saat memperbarui profil.');
  }
};
