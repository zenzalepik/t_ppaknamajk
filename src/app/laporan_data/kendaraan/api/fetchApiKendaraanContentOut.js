// api/fetchApiKendaraanContentOut.js

import { fetchWithAuthDummy } from '@/helpers/fetchWithAuthDummy';

export const fetchApiKendaraanContentOut = async ({
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

  return await fetchWithAuthDummy({
    method: 'get',
    endpoint: `/data_kendaraan_keluar?${queryParams.toString()}`,
  });
};
