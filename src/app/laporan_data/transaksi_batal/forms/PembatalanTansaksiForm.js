'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import CollapseDetilTransaksi from '@/components/EvoCollapseDetilTransaksi';
import { fetchApiTransaksiBatalUpdate } from '../api/fetchApiTransaksiBatalUpdate';

const data = {
  no: '1',
  nomorTiket: 'TKT12345',
  nomorPolisi: 'AB123CD',
  jenisKendaraan: 'Mobil',
  member: false,
  manualInput: false,
  waktuMasuk: '2025-04-23 14:30',
  waktuKeluar: '2025-04-23 16:00',
  gerbangMasuk: 'Gerbang 1',
  gerbangKeluar: 'Gerbang 2',
  durasiParkir: '1 jam 30 menit',
  denda: 'Rp. 5.000',
  totalPembayaran: 'Rp. 15.000',
  status: true,
  tipe: 'Casual',
  pembayaran: 'Cash',
  kartuMember: false,
  namaBank: null,
  nomorRekening: null,
  namaEwallet: null,
  nomorEwallet: null,
  petugas: 'Rangga',
  shift: 'SHIFT 2',
  foto: '/images/png/logo.png',
  aksi: 'Non Aktifkan',
};

const PembatalanTansaksiForm = ({ isOpen, onClose, onSubmit, dataForm }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    no_tiket_atau_nomor_polisi: '',
    alasanPembatalan: '',
    keteranganTambahan: '',
  });

  useEffect(() => {
    if (dataForm) {
      setFormData((prev) => ({
        ...prev,
        user_id: dataForm.user_id || '',
        no_tiket_atau_nomor_polisi: dataForm.no_tiket_atau_nomor_polisi || '',
      }));
    }
  }, [dataForm]);

  const [selectedDate, setSelectedDate] = useState('');

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault();

    const newErrors = {
      user_id: formData.user_id === '' ? 'User tidak ditemukan' : '',
      no_tiket_atau_nomor_polisi:
        formData.no_tiket_atau_nomor_polisi === ''
          ? 'Nomor tiket/nomor polisi tidak ditemukan'
          : '',
      alasanPembatalan:
        formData.alasanPembatalan === '' ? 'Alasan pembatalan wajib diisi' : '',
      keteranganTambahan:
        formData.keteranganTambahan === ''
          ? 'Keterangan/penjelasan wajib diisi'
          : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);

    try {
      await fetchApiTransaksiBatalUpdate(formData);

      queryClient.invalidateQueries(['laporanTransaksiBatalLaporan']); // Refresh tabel setelah tambah data

      // setNotifMessage('Laporan pembatalan transaksi berhasil dikirim!');
      // setNotifType('success');

      // Cek isi pesan dari response
      if (response?.message === 'Transaksi berhasil dibatalkan') {
        setNotifType('success');
        setNotifMessage(response.message);
        setTimeout(() => handleCloseModal(), 500);
      } else {
        setNotifMessage(
          response?.message || 'Terjadi kesalahan saat membatalkan transaksi.'
        );
        setNotifType('error');
        setTimeout(() => handleCloseModal(), 500);
      }

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      if (error?.message === 'Transaksi berhasil dibatalkan') {
        setNotifType('success');
        setNotifMessage(error.message);
        setTimeout(() => handleCloseModal(), 500);
      } else {
        setNotifMessage(
          error?.message || 'Terjadi kesalahan saat membatalkan transaksi.'
        );
        setNotifType('error');
        setTimeout(() => handleCloseModal(), 500);
      }
      // setNotifMessage(error.message);
      // setNotifType('error');
    }
  };

  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      no_tiket_atau_nomor_polisi: '',
      alasanPembatalan: '',
      keteranganTambahan: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
    // Refresh browser
    window.location.reload();
  };

  return (
    <>
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose
        />
      )}

      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Anda Yakin Ingin Membatalkan Transaksi Berikut?"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
        >
          {/* {dataForm?.user_id}
          {JSON.stringify(dataForm?.dataDipilih)} */}
          <CollapseDetilTransaksi data={dataForm?.dataDipilih || {}} />
          <EvoInText
            name="alasanPembatalan"
            label="Alasan Pembatalan"
            placeholder="Alasan Pembatalan"
            value={formData.alasanPembatalan}
            onChange={handleChange}
            error={errors.alasanPembatalan}
          />
          <EvoInTextarea
            name="keteranganTambahan"
            label="Keterangan/Penjelasan"
            placeholder="Ketik keterangan/penjelasan tambahan..."
            value={formData.keteranganTambahan}
            onChange={handleChange}
            error={errors.keteranganTambahan}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default PembatalanTansaksiForm;
