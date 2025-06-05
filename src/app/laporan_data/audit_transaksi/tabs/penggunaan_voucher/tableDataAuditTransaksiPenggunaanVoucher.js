'use client';

export const tableDataAuditTransaksiPenggunaanVoucher = {
  columns: [
    { label: 'No.' },
    { label: 'Nama Voucher' },
    { label: 'Potongan Voucher' },
    { label: 'Nama Petugas Pos' },
    { label: 'Qty Voucher Digunakan' },
  ],
  rows: [
    { no: '1', namaVoucher: 'PROMOHEMAT', potongan: 'Rp 2.000', petugas: 'Rudi Hartono', qtyDigunakan: '15' },
    { no: '2', namaVoucher: 'CASUALDISC10', potongan: 'Rp 1.000', petugas: 'Siti Aminah', qtyDigunakan: '10' },
    { no: '3', namaVoucher: 'MEMBER2025', potongan: 'Rp 20.000', petugas: 'Agus Salim', qtyDigunakan: '8' },
    { no: '4', namaVoucher: 'MEMBERDISC10', potongan: 'Rp 15.000', petugas: 'Dewi Lestari', qtyDigunakan: '6' },
    { no: '5', namaVoucher: 'MEMBERSAVE', potongan: 'Rp 10.000', petugas: 'Fajar Pratama', qtyDigunakan: '12' },
  ],
};
