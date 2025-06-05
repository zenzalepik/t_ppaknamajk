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

const AddPengaduanForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    judulMasalah: '',
    kategoriMasalah: '',
    pintuPos: '',
    alatPerangkat: '',
    penyebab: '',
    keteranganPermasalahan: '',
    namaPelapor: '',
    tanggalMasalah: ''
  });

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedOptions, setSelectedOptions] = useState({
    kategoriMasalah: '',
    pintuPos: '',
    alatPerangkat: '',
  });

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
      judulMasalah:
        formData.judulMasalah.trim() === '' ? 'Judul masalah wajib diisi' : '',
      kategoriMasalah:
        formData.kategoriMasalah === '' ? 'Kategori masalah wajib dipilih' : '',
      pintuPos: formData.pintuPos === '' ? 'Pintu Pos wajib dipilih' : '',
      alatPerangkat:
        formData.alatPerangkat === '' ? 'Alat/Perangkat wajib dipilih' : '',
      penyebab: formData.penyebab.trim() === '' ? 'Penyebab wajib diisi' : '',
      keteranganPermasalahan:
        formData.keteranganPermasalahan.trim() === ''
          ? 'Keterangan Permasalahan wajib diisi'
          : '',
      namaPelapor:
        formData.namaPelapor.trim() === '' ? 'Nama Pelapor wajib diisi' : '',
        tanggalMasalah: selectedDate === '' ? 'Tanggal masalah wajib dipilih' : '', // Tambahkan validasi tanggal
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
        title="Kirim Pengaduan Masalah"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <EvoInText
            name="judulMasalah"
            label="Judul Masalah"
            placeholder="Masukkan judul masalah"
            value={formData.judulMasalah}
            onChange={handleChange}
            error={errors.judulMasalah}
          />

          <EvoInDropdown
            name="kategoriMasalah"
            label="Kategori Masalah"
            options={[
              { label: 'Masalah A', value: 'A' },
              { label: 'Masalah B', value: 'B' },
            ]}
            // value={selectedOptions.kategoriMasalah}
            value={formData.kategoriMasalah}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, kategoriMasalah: value }))
            }
            error={errors.kategoriMasalah}
            placeholder="Pilih kategori masalah"
          />

<EvoInDatePicker
name="tanggalMasalah"
  label="Tanggal Masalah"
  value={selectedDate}
  placeholder="Pilih tanggal masalah"
  onChange={(date) => setSelectedDate(date)}
  error={errors.tanggalMasalah}
/>

          <EvoInDropdown
            name="pintuPos"
            label="Pintu Pos"
            options={[
              { label: 'Pintu pos A', value: 'A' },
              { label: 'Pintu pos B', value: 'B' },
            ]}
            // value={selectedOptions.pintuPos}
            value={formData.pintuPos}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, pintuPos: value }))
            }
            error={errors.pintuPos}
            placeholder="Pilih pintu pos"
          />

          <EvoInDropdown
            name="alatPerangkat"
            label="Nama alat/perangkat yang bermasalah"
            options={[
              { label: 'Alat A', value: 'A' },
              { label: 'Alat B', value: 'B' },
            ]}
            // value={selectedOptions.alatPerangkat}
            value={formData.alatPerangkat}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, alatPerangkat: value }))
            }
            error={errors.alatPerangkat}
            placeholder="Pilih alat/perangkat"
          />

          <EvoInTextarea
            name="penyebab"
            label="Penyebab"
            placeholder="Ketik penyebab masalah..."
            value={formData.penyebab}
            onChange={handleChange}
            error={errors.penyebab}
          />

          <EvoInTextarea
            name="keteranganPermasalahan"
            label="Keterangan Permasalahan"
            placeholder="Ketik keterangan permasalahan..."
            value={formData.keteranganPermasalahan}
            onChange={handleChange}
            error={errors.keteranganPermasalahan}
          />
          <EvoInText
            name="namaPelapor"
            label="Nama Pelapor"
            placeholder="Masukkan nama pelapor"
            value={formData.namaPelapor}
            onChange={handleChange}
            error={errors.namaPelapor}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddPengaduanForm;
