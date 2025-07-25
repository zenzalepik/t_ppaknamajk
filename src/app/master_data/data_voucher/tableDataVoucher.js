'use client';

export const tableDataVoucher = {
  columns: [
    { label: 'No.' },
    { label: 'Waktu Input' },
    { label: 'Produk Voucher' },
    { label: 'No. Tiket' },
    { label: 'Nopol' },
    { label: 'Kendaraan' },
    // { label: 'Jenis Kendaraan' },
    { label: 'Model Bayar' },
    { label: 'Verifikasi' },
    { label: 'Periode' },
    { label: 'Tarif' },
    { label: 'Masa Aktif' },
    { label: 'Keterangan' },
    { label: 'Aksi' },
  ],
  rows: [
    {
      no: '1',
      waktuInput: '30 Sep 2024 16:33:11',
      produkVoucher: 'MT-2',
      noTiket: '11118240',
      nopol: 'B 1234 XYZ',
      jenisKendaraan: 'Motor',
      modelBayar: 'Prepaid',
      verifikasi: 'QR Code',
      periode: '30-09-2024 s/d 30-12-2024',
      tarif: 'Rp 180.000',
      masaAktif: '3 Bulan',
      keterangan: 'Pembayaran sukses',
      aksi: '1',
    },
    {
      no: '2',
      waktuInput: '01 Okt 2024 08:12:34',
      produkVoucher: 'MOB-3',
      noTiket: '11118247',
      nopol: 'D 5678 ABC',
      jenisKendaraan: 'Mobil',
      modelBayar: 'Postpaid',
      verifikasi: 'RFID',
      periode: '01-10-2024 s/d 01-01-2025',
      tarif: 'Rp 250.000',
      masaAktif: '3 Bulan',
      keterangan: 'Karyawan tetap',
      aksi: '2',
    },
    {
      no: '3',
      waktuInput: '02 Okt 2024 14:20:10',
      produkVoucher: 'MOB-5',
      noTiket: '11118248',
      nopol: 'A 567 GHJ',
      jenisKendaraan: 'Mobil',
      modelBayar: 'Prepaid',
      verifikasi: 'Fingerprint',
      periode: '02-10-2024 s/d 02-01-2025',
      tarif: 'Rp 350.000',
      masaAktif: '3 Bulan',
      keterangan: 'Tamu perusahaan',
      aksi: '3',
    },
    {
      no: '4',
      waktuInput: '03 Okt 2024 18:55:25',
      produkVoucher: 'MOB-6',
      noTiket: '11118249',
      nopol: 'B 8910 LMN',
      jenisKendaraan: 'Mobil',
      modelBayar: 'Postpaid',
      verifikasi: 'QR Code',
      periode: '03-10-2024 s/d 03-01-2025',
      tarif: 'Rp 400.000',
      masaAktif: '3 Bulan',
      keterangan: 'VIP akses',
      aksi: '4',
    },
  ],
};
