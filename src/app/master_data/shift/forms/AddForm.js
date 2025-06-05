'use client';

import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTimePicker from '@/components/evosist_elements/EvoInTimePicker';
import EvoNotifCard from '@/components/EvoNotifCard';

const AddShiftForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    namaShift: '',
    awalShift: '',
    akhirShift: '',
  });

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Bersihkan error saat pengguna mulai mengisi
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      namaShift: formData.namaShift.trim() === '' ? 'Nama Shift wajib diisi' : '',
      awalShift: formData.awalShift.trim() === '' ? 'Awal Shift wajib dipilih' : '',
      akhirShift: formData.akhirShift.trim() === '' ? 'Akhir Shift wajib dipilih' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);

    setNotifMessage('Data Shift berhasil disimpan!');
    setNotifType('success');

    setTimeout(() => onClose(), 2000);
  };

  return (
    <>
      {notifMessage && <EvoNotifCard message={notifMessage} onClose={() => setNotifMessage('')} type={notifType} autoClose={true} />}

      <EvoModal isOpen={isOpen} onClose={onClose} title="Tambah Shift">
        <EvoForm onSubmit={handleSubmit} submitText="Simpan" cancelText="Batal" onCancel={onClose}>
          <EvoInText
            name="namaShift"
            label="Nama Shift"
            placeholder="Masukkan nama shift"
            value={formData.namaShift}
            onChange={(e) => handleChange('namaShift', e.target.value)}
            error={errors.namaShift}
          />
          <EvoInTimePicker
            name="awalShift"
            label="Awal Shift"
            value={formData.awalShift}
            onChange={(e) => handleChange('awalShift', e.target.value)}
            error={errors.awalShift}
          />
          <EvoInTimePicker
            name="akhirShift"
            label="Akhir Shift"
            value={formData.akhirShift}
            onChange={(e) => handleChange('akhirShift', e.target.value)}
            error={errors.akhirShift}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddShiftForm;
