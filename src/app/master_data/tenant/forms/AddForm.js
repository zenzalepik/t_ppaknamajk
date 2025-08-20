'use client';
import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import { useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataTenantCreate } from '../api/fetchApiMasterDataTenantCreate';

const AddTenantForm = ({ isOpen, onClose, onSubmit }) => {
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
      await fetchApiMasterDataTenantCreate(formData);
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

      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Tambah Tenant"
      >
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

export default AddTenantForm;
