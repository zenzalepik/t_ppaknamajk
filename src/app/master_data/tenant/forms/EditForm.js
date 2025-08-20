'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoNotifCard from '@/components/EvoNotifCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataTenantUpdate } from '../api/fetchApiMasterDataTenantUpdate';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';

const EditTenantForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    nama_tenant: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        nama_tenant: initialData.nama_tenant || '',
        username: initialData.username || '',
        password: initialData.password || '',
      });
    }
  }, [initialData]);

  useEffect(() => {
    // console.log('Form Data Updated:', formData);
  }, [formData]);

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

  // const {
  //   data: dataTipeKendaraan,
  //   error: errorTipeKendaraan,
  //   isLoading: isLoadingTipeKendaraan,
  // } = useQuery({
  //   queryKey: ['pengaturanTipeKendaraan'],
  //   queryFn: () => fetchApiPengaturanParameterTipeKendaraan(),
  // });

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
      nama_tenant: '',
      username: '',
      password: '',
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
      nama_tenant: formData.nama_tenant === '' ? 'Nama Tenant wajib diisi' : '',
      username: formData.username === '' ? 'Username wajib diisi' : '',
      password: formData.password === '' ? 'Password wajib diisi' : '',
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
      await fetchApiMasterDataTenantUpdate(formData);

      queryClient.invalidateQueries(['masterDataTenant']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Tenant berhasil disimpan!');
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

      <EvoModal isOpen={isOpen} onClose={handleCloseModal} title="Edit Tenant">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama_tenant"
            label="Nama Tenant"
            placeholder="Masukkan nama tenant"
            value={formData.nama_tenant}
            onChange={handleChange}
            error={errors.nama_tenant}
          />
          <EvoInText
            name="username"
            label="Username"
            placeholder="Masukkan username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <EvoInText
            name="password"
            label="Password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            type="password"
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditTenantForm;
