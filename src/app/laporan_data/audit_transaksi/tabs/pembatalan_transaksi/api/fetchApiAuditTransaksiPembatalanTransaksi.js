// api/fetchApiAuditTransaksiPembatalanTransaksi.js

import { fetchWithAuth } from '@/helpers/fetchWithAuth';

export const fetchApiAuditTransaksiPembatalanTransaksi = async ({
  limit = 15,
  page = 1,
  // offset = 0,
  // sortBy = 'id',
  sortOrder = 'desc',
  start_date, // <-- tambahkan
  end_date, // <-- tambahkan
   search = '',
} = {}) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    // offset: offset.toString(),
    // sortBy,
    sortOrder,
  });

  if (start_date) queryParams.append('start_date', start_date);
  if (end_date) queryParams.append('end_date', end_date); 

  if (search) queryParams.set('search', search);
  
  console.log(`/laporan-data/audit-transaksi/audit-pembatalan-transaksi?${queryParams.toString()}`);
  
  return await fetchWithAuth({
    method: 'get',
    endpoint: `/laporan-data/audit-transaksi/audit-pembatalan-transaksi?${queryParams.toString()}`,
  });
};
