'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import companyTypes from '@/utils/companyTypes';
import strings from '@/utils/strings';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataPerusahaanUpdate } from '../api/fetchApiMasterDataPerusahaanUpdate';

const EditDataPerusahaanForm = ({ isOpen, onClose, onSubmit,initialData=null }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();


  const [formData, setFormData] = useState({
    nama: '',
    jenis_perusahaan: '',
    kontak: '',
    status: false,
    user_id: null,
  });

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setFormData((prev)=>({
        ...prev,
        id: initialData.id || '',
        nama: initialData.nama || '',
        jenis_perusahaan: initialData.jenis_perusahaan || '',
        kontak: initialData.kontak || '',
      }));
    }
  }, [initialData]);

  useEffect(() => {
  }, [formData]);

  const selectedBusinessType = companyTypes.find(
      (item) => item.name === formData.jenis_perusahaan
    );

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      nama: '',
      jenis_perusahaan: '',
      kontak: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);

  // Ambil user_id secara async
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setFormData((prev) => ({ ...prev, user_id: id }));
    };
    fetchUserId();
  }, []);

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
    e.preventDefault();

    const newErrors = {
      nama: formData.nama.trim() === '' ? 'Nama Perusahaan wajib diisi' : '',
      kontak: formData.kontak.trim() === '' ? 'Kontak wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);

    try {
      await fetchApiMasterDataPerusahaanUpdate(formData);

      queryClient.invalidateQueries(['masterDataPerusahaan']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Perusahaan berhasil disimpan!');
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

      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={'Edit Perusahaan'}
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          {/* Card Hasil Pilih Jenis Perusahaan */}
          <div className="w-full flex flex-col">
            <label className="text-card mb-1">Jenis Perusahaan</label>
            <div className="w-full p-6 bg-primaryTransparent rounded-[32px] flex items-center gap-3">
              <div className="text-primary">{selectedBusinessType?.icon}</div>
              <div className="flex flex-col gap-1">
                <h3 className="text-title_small">{formData.jenis_perusahaan}</h3>
                <p className="text-sm text-black/80 text-center">
                  {selectedBusinessType?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Jenis Perusahaan */}
          <EvoInText
            name="nama"
            label="Nama Perusahaan"
            placeholder="Masukkan Nama Perusahaan"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
          />
          <EvoInText
            name="kontak"
            label="Kontak"
            placeholder="Masukkan Kontak Perusahaan"
            value={formData.kontak}
            onChange={handleChange}
            error={errors.kontak}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditDataPerusahaanForm;
