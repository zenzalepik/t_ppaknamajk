import React, { useState, useEffect } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiPengaturanGlobalLokasiUpdate } from '../api/fetchApiPengaturanGlobalLokasiUpdate';
import { useQueryClient } from '@tanstack/react-query';

const EditLokasiForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    id: '',
    nama_lokasi: '',
    no_telp_lokasi: '',
    email_lokasi: '',
    alamat_lokasi: '',
  });

  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      id: '',
      nama_lokasi: '',
      no_telp_lokasi: '',
      email_lokasi: '',
      alamat_lokasi: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setFormData({
        id: initialData.id || '',
        nama_lokasi: initialData.nama_lokasi || '',
        no_telp_lokasi: initialData.no_telp_lokasi || '',
        email_lokasi: initialData.email_lokasi || '',
        alamat_lokasi: initialData.alamat_lokasi || '',
      });
    }
  }, [initialData]);

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

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
        newErrors[key] = `${formattedKey.charAt(0).toUpperCase()}${formattedKey
          .slice(1)
          .toLowerCase()} wajib diisi`;
      }
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);
    console.log('Submit data' + JSON.stringify(formData));

    try {
      await fetchApiPengaturanGlobalLokasiUpdate(formData);

      queryClient.invalidateQueries(['pengaturanGlobal']); // Refresh tabel setelah tambah data

      setNotifMessage('Data lokasi berhasil disimpan!');
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
        title="Ubah Data Lokasi"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama_lokasi"
            label="Nama Lokasi"
            placeholder="Masukkan nama lokasi"
            value={formData.nama_lokasi}
            onChange={handleChange}
            error={errors.nama_lokasi}
          />

          <EvoInText
            name="no_telp_lokasi"
            label="Nomor Telephone (Whatsapp) Lokasi"
            placeholder="Masukkan nomor whatsapp lokasi"
            value={formData.no_telp_lokasi}
            onChange={handleChange}
            error={errors.no_telp_lokasi}
          />

          <EvoInText
            name="email_lokasi"
            label="E-mail Lokasi"
            placeholder="Masukkan alamat e-mail lokasi"
            value={formData.email_lokasi}
            onChange={handleChange}
            error={errors.email_lokasi}
          />

          <EvoInTextarea
            name="alamat_lokasi"
            label="Alamat Kantor Lokasi"
            placeholder="Masukkan alamat kantor lokasi"
            value={formData.alamat_lokasi}
            onChange={handleChange}
            error={errors.alamat_lokasi}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditLokasiForm;
