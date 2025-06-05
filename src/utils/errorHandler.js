import React from 'react';

export const getErrorMessage = (error) => {
  if (!error) return 'Terjadi kesalahan tidak diketahui';

  const status = error.response?.status;
  const message = error.response?.data?.message || error.message || 'Terjadi kesalahan';

  if (status === 401) return 'Unauthorized: Silakan login ulang.';
  if (status === 404) return 'Error 404: Data tidak ditemukan.';
  if (status === 500) return 'Error 500: Terjadi masalah pada server. Coba lagi nanti.';

  return message; // ✅ Pastikan hanya teks error yang dikembalikan
};
