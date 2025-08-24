// api/fetchApiKendaraanContentOut.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiKendaraanContentOut = async ({
  limit = 13,
  page = 1,
  // offset = 0,
  sortBy = 'id',
  sortOrder = 'asc',
  start_date,   // <-- tambahkan
  end_date,     // <-- tambahkan
  search = '',
} = {}) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    // offset: offset.toString(),
    sortBy,
    sortOrder,
    sortBy,
    sortOrder,
  });

  
  if (start_date) queryParams.append('start_date', start_date);
  if (end_date) queryParams.append('end_date', end_date); 

  if (search) queryParams.set('search', search);

  console.log(`/laporan-data/kendaraan/kendaraan-out?${queryParams.toString()}`);
  
  return await fetchWithAuth({
    method: 'get',
    endpoint: `/laporan-data/kendaraan/kendaraan-out?${queryParams.toString()}`,
  });
};
