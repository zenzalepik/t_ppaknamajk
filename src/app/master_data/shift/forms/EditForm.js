'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTimePicker from '@/components/evosist_elements/EvoInTimePicker';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataDataShiftCreate } from '../api/fetchApiMasterDataDataShiftCreate';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataShiftUpdate } from '../api/fetchApiMasterDataShiftUpdate';

const EditShiftForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    nama_shift: '',
    awal_shift: '',
    akhir_shift: '',
    user_id: null,
  });

  useEffect(() => {

    if (initialData) {
    
    const formatTime = (timeStr) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':');
      return `${hours}:${minutes}`;
    };

      console.log('isiniasi' + initialData);

      setFormData({
        id: initialData.id || '',
        nama_shift: initialData.nama_shift|| '',
        awal_shift: formatTime(initialData.awal_shift)|| '',
        akhir_shift: formatTime(initialData.akhir_shift)|| '',
      });
    }
  }, [initialData]);

  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      nama_shift: '',
      awal_shift: '',
      akhir_shift: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  // Ambil user_id secara async
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setFormData((prev) => ({ ...prev, user_id: id }));
    };
    fetchUserId();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Bersihkan error saat pengguna mulai mengisi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      nama_shift:
        formData.nama_shift.trim() === '' ? 'Nama Shift wajib diisi' : '',
      awal_shift:
        formData.awal_shift.trim() === '' ? 'Awal Shift wajib dipilih' : '',
      akhir_shift:
        formData.akhir_shift.trim() === '' ? 'Akhir Shift wajib dipilih' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);
    try {
      // console.log(formData);
      await fetchApiMasterDataShiftUpdate(formData);

      queryClient.invalidateQueries(['masterDataDataShift']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Shift berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  return (
    <>
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}

      <EvoModal isOpen={isOpen} onClose={handleCloseModal} title="Tambah Shift">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama_shift"
            label="Nama Shift"
            placeholder="Masukkan nama shift"
            value={formData.nama_shift}
            onChange={(e) => handleChange('nama_shift', e.target.value)}
            error={errors.nama_shift}
          />
          {/* <EvoInTimePicker
            name="awal_shift"
            label="Awal Shift"
            value={formData.awal_shift}
            onChange={(e) => handleChange('awal_shift', e.target.value)}
            error={errors.awal_shift}
          />
          <EvoInTimePicker
            name="akhir_shift"
            label="Akhir Shift"
            value={formData.akhir_shift}
            onChange={(e) => handleChange('akhir_shift', e.target.value)}
            error={errors.akhir_shift}
          /> */}
          <EvoInTimePicker
            name="awal_shift"
            label="Awal Shift"
            value={formData.awal_shift}
            onChange={(val) => handleChange('awal_shift', val)}
            error={errors.awal_shift}
          />
          <EvoInTimePicker
            name="akhir_shift"
            label="Akhir Shift"
            value={formData.akhir_shift}
            onChange={(val) => handleChange('akhir_shift', val)}
            error={errors.akhir_shift}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditShiftForm;
