'use client';

export const tableDataAuditTransaksiPembatalanTransaksi = {
  columns: [
    { label: 'No.' },
    { label: 'Pos' },
    { label: 'Nama Petugas' },
    { label: 'Qty Transaksi Dibatalkan' },
    { label: 'Total Nominal Pembatalan' },
  ],
  rows: [
    { no: '1', pos: 'Pos Utama 1', petugas: 'Rudi Hartono', qty: '3', totalNominal: 'Rp 36.000' },
    { no: '2', pos: 'Pos Timur', petugas: 'Siti Aminah', qty: '2', totalNominal: 'Rp 22.000' },
    { no: '3', pos: 'Pos Barat', petugas: 'Agus Salim', qty: '4', totalNominal: 'Rp 48.000' },
    { no: '4', pos: 'Pos Selatan', petugas: 'Dewi Lestari', qty: '1', totalNominal: 'Rp 11.000' },
    { no: '5', pos: 'Pos Utama 2', petugas: 'Fajar Pratama', qty: '2', totalNominal: 'Rp 25.000' },
  ],
};
