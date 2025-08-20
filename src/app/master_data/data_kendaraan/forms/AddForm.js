'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoNotifCard from '@/components/EvoNotifCard';
import { useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataKendaraanCreate } from '../api/fetchApiMasterDataDataKendaraanCreate';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { useQuery } from '@tanstack/react-query';

const AddKendaraanForm = ({ isOpen, onClose, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    nama_kendaraan: '',
    tipe_kendaraan_id: '',
    status: false,
    user_id: '',
  });

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        if (isOpen && !id) {
          throw new Error('User ID tidak ditemukan');
        }
        setFormData((prev) => ({ ...prev, user_id: id }));
      } catch (error) {
        setNotifMessage(`Error mengambil User ID: ${error.message}`);
        setNotifType('error');
      }
    };

    fetchUserId();
  }, [isOpen]);

  const {
    data: dataTipeKendaraan,
    error: errorTipeKendaraan,
    isLoading: isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanTipeKendaraan'],
    queryFn: () => fetchApiPengaturanParameterTipeKendaraan(),
  });

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

  const handleCloseModal = () => {
    setFormData({
      nama_kendaraan: '',
      tipe_kendaraan_id: '',
      status: false,
      // user_id: '',
    });

    setErrors({});
    setNotifMessage('');
    setNotifType('success'); // opsional, jika ingin reset ke default
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_id) {
      setNotifMessage('User ID tidak ditemukan, coba ulangi.');
      setNotifType('error');
      return;
    }

    const newErrors = {
      nama_kendaraan:
        formData.nama_kendaraan === '' ? 'Nama Kendaraan wajib diisi' : '',
      tipe_kendaraan_id:
        formData.tipe_kendaraan_id.trim() === ''
          ? 'Tipe Kendaraan wajib dipilih'
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
      // console.log(formData);
      await fetchApiMasterDataDataKendaraanCreate(formData);

      queryClient.invalidateQueries(['masterDataDataKendaraan']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Kendaraan berhasil disimpan!');
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
        title="Tambah Kendaraan"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama_kendaraan"
            label="Nama Kendaraan"
            placeholder="Masukkan nama kendaraan"
            value={formData.nama_kendaraan}
            onChange={handleChange}
            error={errors.nama_kendaraan}
          />
          <EvoInDropdown
            name="tipe_kendaraan_id"
            label="Tipe Kendaraan"
            options={
              dataTipeKendaraan?.data?.map((item) => ({
                label: item.tipe_kendaraan,
                value: item.id,
              })) || []
            }
            value={formData.tipe_kendaraan_id}
            // onChange={handleChange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                tipe_kendaraan_id: value,
              }))
            }
            error={errors.tipe_kendaraan_id}
            placeholder="Pilih tipe kendaraan"
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddKendaraanForm;
