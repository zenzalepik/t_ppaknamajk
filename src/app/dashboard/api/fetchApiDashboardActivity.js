// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiDashboardActivity = async ({
  limit = 13,
  page = 1,
  // offset = 0,
  sortBy = 'id',
  sortOrder = 'desc',
  
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
  });

  
  if (start_date) queryParams.append('start_date', start_date);
  if (end_date) queryParams.append('end_date', end_date); 

  if (search) queryParams.set('search', search);
  
  // console.log(`/dashboard/aktivitas-gerbang-kendaraan?${queryParams.toString()}`);
  
  return await fetchWithAuth({
    method: 'get',
    endpoint: `/dashboard/aktivitas-gerbang-kendaraan?${queryParams.toString()}`,
    // endpoint: `/dashboard/aktivitas-gerbang-kendaraan?limit=13&page=1&sortBy=id&sortOrder=desc&startDate=07-28-2025&endDate=07-31-2025`,
    // endpoint: `/dashboard/aktivitas-gerbang-kendaraan?page=1&limit=15&sortBy=id&sortOrder=desc&start_date=07-28-2025&end_date=07-30-2025`,
  });
};
