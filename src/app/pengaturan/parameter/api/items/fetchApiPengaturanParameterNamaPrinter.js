// api/fetchApiPengaturanParameterNamaPrinter.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiPengaturanParameterNamaPrinter = async ({
  page = 111,
  limit = 10,
  search = '',
  sortBy = 'id',
  sortOrder = 'asc',
} = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    sortBy,
    sortOrder,
  });

  return await fetchWithAuth({
    method: 'get',
    endpoint: `/setting/parameter/nama-printer?${queryParams.toString()}`,
  });
};
