// api/fetchApiRiwayatTransaksiGantiNopol.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiRiwayatTransaksiGantiNopol = async (
  memberId,
 {
  limit = 15,
  page = 1,
  sortBy = 'id',
  sortOrder = 'asc',
} = {}
) => {
  
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    sortBy,
    sortOrder,
  });

  return await fetchWithAuth({
    method: 'get',
    endpoint: `/master-data/data-nomor-polisi-v2/${memberId}?${queryParams.toString()}`,
  });
};
