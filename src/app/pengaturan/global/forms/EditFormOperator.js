import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import { useQueryClient } from '@tanstack/react-query';
import { fetchApiPengaturanGlobalOperatorUpdate } from '../api/fetchApiPengaturanGlobalOperatorUpdate';

const EditPembayaranForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    id: '',
    nama_operator: '',
    no_telp_operator: '',
    email_operator: '',
    alamat_operator: '',
  });

  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      id: '',
      nama_operator: '',
      no_telp_operator: '',
      email_operator: '',
      alamat_operator: '',
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
        nama_operator: initialData.nama_operator || '',
        no_telp_operator: initialData.no_telp_operator || '',
        email_operator: initialData.email_operator || '',
        alamat_operator: initialData.alamat_operator || '',
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

    // onSubmit?.(formData);
    // console.log('Submit data' + JSON.stringify(formData));

    try {
      await fetchApiPengaturanGlobalOperatorUpdate(formData);

      queryClient.invalidateQueries(['pengaturanGlobal']); // Refresh tabel setelah tambah data

      setNotifMessage('Data operator berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // kasih delay biar notif sempat tampil
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
        title="Ubah Data Operator"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama_operator"
            label="Nama Operator"
            placeholder="Masukkan nama operator"
            value={formData.nama_operator}
            onChange={handleChange}
            error={errors.nama_operator}
          />

          <EvoInText
            name="no_telp_operator"
            label="Nomor Telephone (Whatsapp) Operator"
            placeholder="Masukkan nomor whatsapp operator"
            value={formData.no_telp_operator}
            onChange={handleChange}
            error={errors.no_telp_operator}
          />

          <EvoInText
            name="email_operator"
            label="E-mail Operator"
            placeholder="Masukkan alamat e-mail operator"
            value={formData.email_operator}
            onChange={handleChange}
            error={errors.email_operator}
          />

          <EvoInTextarea
            name="alamat_operator"
            label="Alamat Kantor Operator"
            placeholder="Masukkan alamat kantor operator"
            value={formData.alamat_operator}
            onChange={handleChange}
            error={errors.alamat_operator}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditPembayaranForm;
