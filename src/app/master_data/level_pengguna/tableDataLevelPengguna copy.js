export const tableDataLevelPengguna = {
  columns: [
    { label: 'No.' },
    { label: 'Nama' },
    { label: 'Perusahaan' },
    { label: 'Hak Akses' },
    { label: 'Added' },
    { label: 'Updated' },
    { label: 'Aksi' },
  ],
  
  rows: [
    {
      no: 1,
      nama: 'Admin',
      perusahaan: 'PT. KAS',
      hakAkses: [
        {
          nama_menu: 'Dashboard',
          nama_sub_menu: null,
          aksi: { create: true, read: true, update: true, delete: true },
        },
        {
          nama_menu: 'Master',
          nama_sub_menu: [
            { nama: 'User', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'Level Akses', aksi: { create: true, read: true, update: true, delete: true, konfigurasi_menu: true } },
            { nama: 'Produk Member', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'Produk Voucher', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'Data Member', aksi: { create: true, read: true, update: true, delete: true, perpanjang: true, ganti_kartu: true, ganti_nopol: true } },
            { nama: 'Data Voucher', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'POS', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'Kendaraan', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'Shift', aksi: { create: true, update: true, delete: true } },
            { nama: 'Perusahaan', aksi: { create: true, read: true, update: true, delete: true } },
          ],
        },
        {
          nama_menu: 'Setting',
          nama_sub_menu: [
            { nama: 'Tarif Parkir', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'Tarif Denda', aksi: { create: true, read: true, update: true, delete: true } },
            { nama: 'Parameter', aksi: { read: true, update: true } },
            { nama: 'Global', aksi: { read: true, update: true } },
            { nama: 'Payment', aksi: { read: true, update: true } },
          ],
        },
        {
          nama_menu: 'Transaksi',
          nama_sub_menu: [
            { nama: 'Manual mix', aksi: null },
            { nama: 'Pembatalan Transaksi', aksi: null },
            { nama: 'Permasalahan atau Perbaikan', aksi: { create_permasalahan: true, create_perbaikan: true, read: true, update: true, delete: true } },
          ],
        },
        {
          nama_menu: 'Report',
          nama_sub_menu: [
            { nama: 'Kendaraan', aksi: null },
            { nama: 'Overnight', aksi: null },
            { nama: 'Pendapatan Parkir', aksi: null },
            { nama: 'Pendapatan Gabungan', aksi: null },
            { nama: 'Pendapatan Member', aksi: null },
            { nama: 'Pendapatan Voucher', aksi: null },
            { nama: 'Pembatalan Transaksi', aksi: null },
            { nama: 'Audit Transaksi', aksi: null },
            { nama: 'Settlement Cashless', aksi: null },
          ],
        },
      ],
      added: '31-10-2022 14:39',
      updated: '31-10-2022 14:39',
    },
    {
      no: 2,
      nama: 'Operator',
      perusahaan: 'PT. KAS',
      hakAkses: [
        {
          nama_menu: 'Dashboard',
          nama_sub_menu: null,
          aksi: { create: false, read: true, update: false, delete: false },
        },
      ],
      added: '31-10-2022 14:39',
      updated: '31-10-2022 14:39',
    },
    {
      no: 3,
      nama: 'Supervisor',
      perusahaan: 'PT. KAS',
      hakAkses: [
        { nama_menu: 'Dashboard', nama_sub_menu: null, aksi: { create: true, read: true, update: true, delete: false } },
        { nama_menu: 'Master', nama_sub_menu: [{ nama: 'User', aksi: { create: true, read: true, update: true, delete: false } }] },
        { nama_menu: 'Transaksi', nama_sub_menu: [{ nama: 'Pembatalan Transaksi', aksi: { create: true, read: true, update: false, delete: false } }] },
      ],
      added: '06-05-2025 16:52',
      updated: '06-05-2025 16:52',
    },
    {
      no: 4,
      nama: 'Finance',
      perusahaan: 'PT. KAS',
      hakAkses: [
        { nama_menu: 'Report', nama_sub_menu: [{ nama: 'Pendapatan Parkir', aksi: { read: true } }, { nama: 'Pendapatan Gabungan', aksi: { read: true } }] },
        { nama_menu: 'Setting', nama_sub_menu: [{ nama: 'Payment', aksi: { read: true, update: true } }] },
      ],
      added: '06-05-2025 16:52',
      updated: '06-05-2025 16:52',
    },
    {
      no: 5,
      nama: 'IT Support',
      perusahaan: 'PT. KAS',
      hakAkses: [
        { nama_menu: 'Dashboard', nama_sub_menu: null, aksi: { create: false, read: true, update: false, delete: false } },
        { nama_menu: 'Setting', nama_sub_menu: [{ nama: 'Parameter', aksi: { read: true, update: true } }, { nama: 'Global', aksi: { read: true, update: true } }] },
        { nama_menu: 'Transaksi', nama_sub_menu: [{ nama: 'Permasalahan atau Perbaikan', aksi: { create_permasalahan: true, create_perbaikan: true, read: true, update: true, delete: true } }] },
      ],
      added: '06-05-2025 16:52',
      updated: '06-05-2025 16:52',
    },
  ],
};
