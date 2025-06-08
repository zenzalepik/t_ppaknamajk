// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanParameter = async ({
  limit = 15,
  page = 1,
  offset = 0,
  sortBy = 'id',
  sortOrder = 'asc',
} = {}) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    offset: offset.toString(),
    sortBy,
    sortOrder,
  });

  return await fetchWithAuth({
    method: 'get',
    endpoint: `/setting/parameter/parameter?${queryParams.toString()}`,
  });
};
