import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';

const AddDataPenggunaForm = ({ isOpen, onClose, onSubmit }) => {
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

  const handleCheckboxChange = (e, answer) => {
    const { checked } = e.target;

    // Update the state with the changed checkbox value
    setSelectedOptions((prev) => ({
      ...prev,
      [answer.value]: checked, // Update the value of the checkbox (checked or unchecked)
    }));

    setErrors((prev) => ({
      ...prev,
      [answer.name]: '', // Remove the error related to the checkbox
    }));
  };

  const handleCameraChange = (e, answer) => {
    const { checked } = e.target;

    // Update the state for camera selection
    setSelectedCameras((prev) => ({
      ...prev,
      [answer.value]: checked, // Update camera1 or camera2 selection
    }));

    setErrors((prev) => ({
      ...prev,
      cameras: '', // Remove camera selection error
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
      perusahaan:
        selectedOptions.perusahaan === '' ? 'Perusahaan wajib dipilih' : '',
      levelPengguna:
        selectedOptions.levelPengguna === ''
          ? 'Level Pengguna wajib dipilih'
          : '',
      // perusahaan:
      //   formData.perusahaan === '' ? 'Perusahaan Asal wajib dipilih' : '',
      // levelPengguna:
      //   formData.levelPengguna === '' ? 'Level Pengguna wajib dipilih' : '',
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Tambah Pengguna Baru">
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
          <EvoInText
            name="username"
            label="Username"
            placeholder="Masukkan username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
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
          <EvoInDropdown
            name="perusahaan"
            label="Asal Perusahaan"
            options={[
              { label: 'Perusahaan A', value: 'A' },
              { label: 'Perusahaan B', value: 'B' },
            ]}
            value={selectedOptions.perusahaan}
            onChange={handleDropdownChange}
            error={errors.perusahaan}
            placeholder="Pilih perusahaan"
          />
          <EvoInDropdown
            name="levelPengguna"
            label="Level Pengguna"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
            ]}
            value={selectedOptions.levelPengguna}
            onChange={handleDropdownChange}
            error={errors.levelPengguna}
            placeholder="Pilih level pengguna"
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddDataPenggunaForm;
