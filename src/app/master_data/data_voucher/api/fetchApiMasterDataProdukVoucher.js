// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';
import numbers from '@/utils/numbers';

export const fetchApiMasterDataProdukVoucher = async ({
  limit = numbers.apiNumLimitExpanded,
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
    endpoint: `/master-data/produk-voucher?${queryParams.toString()}`,
  });
};
