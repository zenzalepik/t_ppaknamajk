// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataDataVoucher = async ({
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
  
  console.log(`/master-data/data-voucher?${queryParams.toString()}`);
  
  return await fetchWithAuth({
    method: 'get',
    endpoint: `/master-data/data-voucher?${queryParams.toString()}`,
  });
};
