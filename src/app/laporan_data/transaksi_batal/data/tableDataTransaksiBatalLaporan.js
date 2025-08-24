'use client';

export const tableDataTransaksiBatalLaporan = {
  columns: [
    { label: 'No.' },
    { label: 'No. Tiket' },
    { label: 'Tgl. Masuk' },
    { label: 'Pintu Masuk' },
    { label: 'Tanggal Pembatalan' },
    { label: 'Alasan Pembatalan' },
    { label: 'Penjelasan Pembatalan' },
    { label: 'User' },
  ],
  rows: [
    {
      no: '1',
      noTiket: 'TKT12345',
      tglMasuk: '2025-04-23 14:30',
      pintuMasuk: 'Gerbang 1',
      tanggalPembatalan: '2025-04-23 16:10',
      alasanPembatalan: 'Kendaraan salah masuk',
      penjelasanPembatalan:'',
      user: 'Rangga',
    },
    {
      no: '2',
      noTiket: 'TKT67890',
      tglMasuk: '2025-04-23 10:00',
      pintuMasuk: 'Gerbang 3',
      tanggalPembatalan: '2025-04-23 11:00',
      alasanPembatalan: 'Input manual salah',
      penjelasanPembatalan:'',
      user: 'Fauzan',
    },
    {
      no: '3',
      noTiket: 'TKT45678',
      tglMasuk: '2025-04-22 18:45',
      pintuMasuk: 'Gerbang 2',
      tanggalPembatalan: '2025-04-23 08:45',
      alasanPembatalan: 'Transaksi ganda',
      penjelasanPembatalan:'',
      user: 'Indra',
    },
  ],
};
