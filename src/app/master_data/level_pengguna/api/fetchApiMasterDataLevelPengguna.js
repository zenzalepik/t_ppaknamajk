// api/masterData.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiMasterDataLevelPengguna = async ({
  limit = 15,
  page = 1,
  // offset = 0,
  sortBy = 'id',
  sortOrder = 'asc',
  hakAkses='',
  perusahaanId
} = {}) => {
  
  let endpointBase = '/master-data/level-pengguna';

  // Tentukan endpoint berdasarkan hak akses
  if (hakAkses === 'Super Admin') {
    endpointBase = '/master-data/level-pengguna';
  } else if (hakAkses === 'Administrator Tenant') {
    endpointBase = '/master-data/level-pengguna/admin-tenant';
  } else {
    endpointBase = '/master-data/level-pengguna/custom-user';
  }

  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    // offset: offset.toString(),
    sortBy,
    sortOrder,
    hakAkses,
  });

  
  // ✅ WAJIB: ikutkan perusahaan_id
  if (perusahaanId != null) {
    queryParams.set('perusahaan_id', String(perusahaanId));
  }
  
  console.log('hakAkses:'+hakAkses);
  console.log('endpoint: ' + endpointBase);

  return await fetchWithAuth({
    method: 'get',
    // endpoint: `/master-data/level-pengguna?${queryParams.toString()}`,
    endpoint: `${endpointBase}?${queryParams.toString()}`,
  });
};
