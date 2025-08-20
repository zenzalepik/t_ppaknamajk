'use client';

import React, { use, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import CollapseDetilTransaksi from '@/components/EvoCollapseDetilTransaksi';

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
  foto: 'http://localhost:3000/images/png/logo.png',
  aksi: 'Non Aktifkan',
};

const PembatalanTansaksiForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    alasanPembatalan: '',
    keteranganTambahan: '',
  });

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

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      alasanPembatalan:
        formData.alasanPembatalan.trim() === ''
          ? 'Alasan pembatalan wajib diisi'
          : '',
      keteranganTambahan:
        formData.keteranganTambahan.trim() === ''
          ? 'Keterangan/penjelasan wajib diisi'
          : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);

    setNotifMessage('Data pengguna berhasil disimpan!');
    setNotifType('success');

    setTimeout(() => onClose(), 2000);
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
        onClose={onClose}
        title="Anda Yakin Ingin Membatalkan Transaksi Berikut?"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <CollapseDetilTransaksi data={data} />
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
