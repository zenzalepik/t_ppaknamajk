// api/fetchApiRiwayatTransaksiMember.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiRiwayatTransaksiMember = async ({
  limit = 15,
  page = 1,
  // offset = 0,
  sortBy = 'id',
  sortOrder = 'asc',
   search = '',
} = {}) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    // offset: offset.toString(),
    sortBy,
    sortOrder,
  });

  if (search) queryParams.set('search', search);
  
  return await fetchWithAuth({
    method: 'get',
    endpoint: `/transaksi/riwayat-member?${queryParams.toString()}`,
  });
};
