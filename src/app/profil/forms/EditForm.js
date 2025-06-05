'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateApiProfil } from '@/app/profil/api/updateApiProfil';

const EditProfilForm = ({ userData, isOpen, onClose, onSubmit }) => {
  const queryClient = useQueryClient();
  // console.log(userData);

  const [formData, setFormData] = useState({
    namaLengkap: '',
    nomorHandphone: '',
    jenisKelamin: '',
    alamatLengkap: '',
    username: '',
    password: '',
    ulangiPassword: '',
    perusahaan: '',
    levelPengguna: '',
  });

  // **Gunakan useEffect untuk update formData saat userData tersedia**
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        namaLengkap: userData?.namaLengkap || '',
        nomorHandphone: userData?.nomorHandphone || '',
        jenisKelamin: userData?.jenisKelamin || '',
        alamatLengkap: userData?.alamatLengkap || '',
        // username: userData?.username || '',
        // perusahaan: userData?.asalPerusahaan || '',
        // levelPengguna: userData?.levelPengguna || '',
      }));
    }
  }, [userData]); // **Terpicu saat userData berubah**

  // **Mutation untuk Update Profil**
  const mutation = useMutation({
    mutationFn: updateApiProfil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      onClose(); // misalnya untuk menutup modal
    },
    onError: (error) => {
      console.error('Error updating profile:', error.message);
    },
  });

  const [selectedOptions, setSelectedOptions] = useState({
    perusahaan: '',
    levelPengguna: '',
  });

  const [selectedCameras, setSelectedCameras] = useState({
    kamera1: false,
    kamera2: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      namaLengkap:
        formData.namaLengkap.trim() === '' ? 'Nama Lengkap wajib diisi' : '',
      nomorHandphone:
        formData.nomorHandphone.trim() === ''
          ? 'Nomor Telepon wajib diisi'
          : '',
      jenisKelamin:
        formData.jenisKelamin === '' ? 'Jenis Kelamin wajib dipilih' : '',
      alamatLengkap:
        formData.alamatLengkap.trim() === '' ? 'Alamat wajib diisi' : '',
      username: formData.username.trim() === '' ? 'Username wajib diisi' : '',
      password: formData.password.trim() === '' ? 'Password wajib diisi' : '',
      ulangiPassword:
        formData.ulangiPassword.trim() === ''
          ? 'Konfirmasi Password wajib diisi'
          : '',
      // perusahaan:
      //   selectedOptions.perusahaan === '' ? 'Perusahaan wajib dipilih' : '',
      // levelPengguna:
      //   selectedOptions.levelPengguna === ''
      //     ? 'Level Pengguna wajib dipilih'
      //     : '',
    };

    if (formData.password !== formData.ulangiPassword) {
      newErrors.ulangiPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);

    // **Lakukan request update profil dengan Mutation**
    mutation.mutate(formData, {
      onSuccess: () => {
        setNotifMessage('Data berhasil disimpan!');
        setNotifType('success');
        setTimeout(() => onClose(), 2000);
      },
      onError: (error) => {
        setNotifMessage(`Gagal menyimpan: ${error.message}`);
        setNotifType('error');
      },
    });

    // setTimeout(() => onClose(), 2000);
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Ubah Data Pengguna">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <EvoInText
            name="namaLengkap"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formData.namaLengkap}
            onChange={handleChange}
            error={errors.namaLengkap}
          />

          <div className="flex gap-3 relative">
            <div className="flex w-1/2">
              <EvoInText
                name="nomorHandphone"
                label="Nomor Handphone"
                placeholder="Masukkan nomor handphone"
                value={formData.nomorHandphone}
                onChange={handleChange}
                error={errors.nomorHandphone}
              />
            </div>
            <div className="flex w-1/2">
              <EvoInRadio
                name="jenisKelamin"
                label="Jenis Kelamin"
                placeholder="Pilih jenis kelamin"
                items={[
                  { label: 'Laki-laki', value: 'laki-laki' },
                  { label: 'Perempuan', value: 'perempuan' },
                ]}
                defaultValue={formData.jenisKelamin}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, jenisKelamin: value }))
                }
                direction="horizontal"
                error={errors.jenisKelamin}
              />
            </div>
          </div>
          <EvoInTextarea
            name="alamatLengkap"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
            value={formData.alamatLengkap}
            onChange={handleChange}
            error={errors.alamatLengkap}
          />
          <div className="flex gap-3 relative">
            <EvoInText
              name="password"
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <EvoInText
              name="ulangiPassword"
              label="Ulangi Password"
              placeholder="Masukkan ulangi password"
              type="password"
              value={formData.ulangiPassword}
              onChange={handleChange}
              error={errors.ulangiPassword}
            />
          </div>
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditProfilForm;
