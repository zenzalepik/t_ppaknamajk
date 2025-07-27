// api/fetchApiKendaraanContentIn.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiKendaraanContentIn = async ({
  limit = 15,
  page = 1,
  offset = 0,
  sortBy = 'id',
  sortOrder = 'asc',
  
  startDate,
  endDate,
} = {}) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    offset: offset.toString(),
    sortBy,
    sortOrder,
  });

  

  if (startDate) {
    queryParams.append('start_date', startDate);
  }

  if (endDate) {
    queryParams.append('end_date', endDate);
  }

  return await fetchWithAuth({
    method: 'get',
    endpoint: `/laporan-data/kendaraan/kendaraan-in?${queryParams.toString()}`,
  });
};
