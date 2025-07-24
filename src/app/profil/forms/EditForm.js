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
import { fetchApiProfilUpdate } from '../api/fetchApiProfilUpdate';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';

const EditProfilForm = ({
  userData,
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const queryClient = useQueryClient();
  // console.log(userData);

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    no_hp: '',
    jenis_kelamin: '',
    alamat_lengkap: '',
    username: '',
    password: '',
    ulangiPassword: '',
    // perusahaan_id: '',
    // level_pengguna_id: '',
  });

  // **Gunakan useEffect untuk update formData saat userData tersedia**
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        id: userData?.id || '',
        nama: userData?.nama || '',
        no_hp: userData?.no_hp || '',
        jenis_kelamin: userData?.jenis_kelamin || '',
        alamat_lengkap: userData?.alamat_lengkap || '',
        username: userData?.username || '',
        // perusahaan_id: userData?.asalPerusahaan || '',
        // level_pengguna_id: userData?.level_pengguna_id || '',
      }));
    }
  }, [userData]); // **Terpicu saat userData berubah**

  // useEffect(() => {
  //   if (isOpen && userData) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       id: userData?.id || '',
  //       nama: userData?.nama || '',
  //       no_hp: userData?.no_hp || '',
  //       jenis_kelamin: userData?.jenis_kelamin || '',
  //       alamat_lengkap: userData?.alamat_lengkap || '',
  //       username: userData?.username || '',
  //     }));
  //   }
  // }, [isOpen, userData]); // ⬅️ tambahkan isOpen

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    /*setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      id: '',
      nama: '',
      no_hp: '',
      jenis_kelamin: '',
      alamat_lengkap: '',
      username: '',
      password: '',
      ulangiPassword: '',
      perusahaan_id: '',
      level_pengguna_id: '',
      // status: true,
      // added_by: userId,
    }));*/
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  const [selectedOptions, setSelectedOptions] = useState({
    perusahaan_id: '',
    level_pengguna_id: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      nama: formData.nama === '' ? 'Nama Lengkap wajib diisi' : '',
      no_hp: formData.no_hp === '' ? 'Nomor Telepon wajib diisi' : '',
      jenis_kelamin:
        formData.jenis_kelamin === '' ? 'Jenis Kelamin wajib dipilih' : '',
      alamat_lengkap:
        formData.alamat_lengkap === '' ? 'Alamat wajib diisi' : '',
      // username: formData.username === '' ? 'Username wajib diisi' : '',
      // password: formData.password === '' ? 'Password wajib diisi' : '',
      // ulangiPassword:
      //   formData.ulangiPassword === '' ? 'Konfirmasi Password wajib diisi' : '',
      // perusahaan_id:
      //   selectedOptions.perusahaan_id === '' ? 'Perusahaan wajib dipilih' : '',
      // level_pengguna_id:
      //   selectedOptions.level_pengguna_id === ''
      //     ? 'Level Pengguna wajib dipilih'
      //     : '',
    };

    // if (formData.password !== formData.ulangiPassword) {
    //   newErrors.ulangiPassword = 'Password tidak cocok';
    // }

    if (isChangePassword) {
      newErrors.password =
        formData.password === '' ? 'Password wajib diisi' : '';
      newErrors.ulangiPassword =
        formData.ulangiPassword === '' ? 'Konfirmasi Password wajib diisi' : '';

      if (formData.password !== formData.ulangiPassword) {
        newErrors.ulangiPassword = 'Password tidak cocok';
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);
    try {
      const payload = { ...formData };
      if (!isChangePassword) {
        delete payload.password;
        delete payload.ulangiPassword;
      }

      await fetchApiProfilUpdate(payload);

      queryClient.invalidateQueries(['masterDataPerusahaan']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Perusahaan berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }

    // setTimeout(() => onClose(), 2000);
  };

  console.log(JSON.stringify(errors));
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
            name="nama"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
          />

          <div className="flex gap-3 relative">
            <div className="flex w-1/2">
              <EvoInText
                name="no_hp"
                label="Nomor Handphone"
                placeholder="Masukkan nomor handphone"
                value={formData.no_hp}
                onChange={handleChange}
                error={errors.no_hp}
              />
            </div>
            <div className="flex w-1/2">
              <EvoInRadio
                name="jenis_kelamin"
                label="Jenis Kelamin"
                placeholder="Pilih jenis kelamin"
                items={[
                  { label: 'Laki-laki', value: 'Laki-laki' },
                  { label: 'Perempuan', value: 'Perempuan' },
                ]}
                defaultValue={formData.jenis_kelamin}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, jenis_kelamin: value }))
                }
                direction="horizontal"
                error={errors.jenis_kelamin}
              />
            </div>
          </div>
          <EvoInTextarea
            name="alamat_lengkap"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap"
            value={formData.alamat_lengkap}
            onChange={handleChange}
            error={errors.alamat_lengkap}
          />

          <EvoInCheckbox
            label="Ubah password?"
            answers={[
              {
                label: 'Iya',
                value: 'akses_kartu',
                checked: isChangePassword,
              },
            ]}
            // onChange={(e) => {
            //   const { value, checked } = e.target;
            //   setFormData((prev) => ({
            //     ...prev,
            //     [value]: checked,
            //   }));
            // }}
            onChange={(e) => {
              setIsChangePassword(e.target.checked);
            }}
            error={errors.akses_kartu}
          />
          {isChangePassword && (
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
          )}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditProfilForm;
