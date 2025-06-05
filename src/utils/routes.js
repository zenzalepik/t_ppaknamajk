const routes = {
  // Root
  home: '/',

  // Login
  login: '/login',

  // Dashboard
  dashboard: '/dashboard',

  // Master Data
  masterData: {
    perusahaan: '/master_data/perusahaan',
    levelPengguna: '/master_data/level_pengguna',
    dataPengguna: '/master_data/data_pengguna',
    pos: '/master_data/pos',
    dataKendaraan: '/master_data/data_kendaraan',
    produkMember: '/master_data/produk_member',
    dataMember: '/master_data/data_member',
    produkVoucher: '/master_data/produk_voucher',
    dataVoucher: '/master_data/data_voucher',
    shift: '/master_data/shift',
  },

  // Laporan Data
  laporanData: {
    kendaraan: '/laporan_data/kendaraan',
    pendapatanParkir: '/laporan_data/pendapatan_parkir',
    overNight: '/laporan_data/over_night',
    transaksiBatal: '/laporan_data/transaksi_batal',
    auditTransaksi: '/laporan_data/audit_transaksi',
    settlementCashless: '/laporan_data/settlement_cashless',
  },

   // Transaksi
   transaksi: {
    tambahTransaksi: '/transaksi/tambah_transaksi',
    riwayatTransaksi: '/transaksi/riwayat_transaksi',
  },

  //Pengaturan
  pengaturan: {
    tarifParkir: '/pengaturan/tarif_parkir',
    tarifDenda: '/pengaturan/tarif_denda',
    pembayaran: '/pengaturan/pembayaran',
    parameter: '/pengaturan/parameter',
    global: '/pengaturan/global',
  },

   // Bantuan
   bantuan: {
    tiket: '/bantuan/tiket',
  },

  // Profil
  profil: '/profil',
};

export default routes;
