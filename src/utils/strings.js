const strings = {
  appName: 'Evosist',
  appDescription: 'Sistem Informasi Parkir Elektronik',
  appLogo: '/images/png/logo.png',
  developerName: 'PT. Evolusi Sistem Digital',
  developerTagLine: 'IT Software & Hardware Services Solutions',
  developerOffice: 'Jl. Alamanda No.227A Cilangkap Cipayung Jakarta Timur',
  welcomeMessage: 'Selamat datang di sistem parkir Evosist!',
  copyRight: '© 2025 Evosist – Developed by PT. Evolusi Sistem Digital',
  locationName: 'Food Court Plaza Pasar Senin',
  error: {
    notFound: 'Halaman tidak ditemukan.',
    unauthorized: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
    serverError: 'Terjadi kesalahan pada server. Silakan coba lagi.',
  },
  labels: {
    //   dashboard: 'Dashboard',
    //   masterData: 'Master Data',
    //   laporanData: 'Laporan Data',
    //   transaksi: 'Transaksi',
    //   pengaturan: 'Pengaturan',
    //   profile: 'Profil Pengguna',
  },
  userName: 'User',

  // apiUrl: 'http://localhost:4000',
  // apiUrlDummy: 'http://localhost:3001',

  apiUrl: 'https://dev-be-parking.evosist.com',
  // apiUrlDummy: '',

  // apiUrl: 'https://evolusipark-backend.onrender.com',
  apiUrlDummy: 'https://api-dummy-evolusipark.onrender.com',

  // apiUrl: process.env.NEXT_PUBLIC_API_URL,
  // apiUrlDummy: 'https://api-dummy-evolusipark.onrender.com',
  options: {
    paymentTypes: ['Tunai', 'Bank', 'QRIS', 'Member'],
    // paymentTypes: ['Cash', 'Prepaid', 'Transfer Bank', 'E-Wallet', 'Member'],
  },
  formatDate:'dd-MM-yyyy'
};

export default strings;
