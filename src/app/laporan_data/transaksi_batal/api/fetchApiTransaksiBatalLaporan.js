// api/fetchApiTransaksiBatalLaporan.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiTransaksiBatalLaporan = async ({
  limit = 13,
  page = 1,
  // offset = 0,
  sortBy = 'id',
  sortOrder = 'asc',
} = {}) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    // offset: offset.toString(),
    sortBy,
    sortOrder,
  });

  return await fetchWithAuth({
    method: 'get',
    endpoint: `/laporan-data/kendaraan/kendaraan-in?${queryParams.toString()}`,
  });
};
