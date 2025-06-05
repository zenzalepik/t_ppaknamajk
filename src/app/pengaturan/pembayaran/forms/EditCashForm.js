import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';

const EditCashForm = ({
  isOpen,
  onClose,
  onSubmit,
  namaParameter = 'Bayar Member Ketika Keluar',
}) => {
  const [formData, setFormData] = useState({
    namaOperator: '',
    whatsappOperator: '',
    emailOperator: '',
    alamatKantorOperator: '',
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

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
        newErrors[key] = `${formattedKey.charAt(0).toUpperCase()}${formattedKey.slice(1).toLowerCase()} wajib diisi`;
      }
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);

    setNotifMessage('Tarif Parkir berhasil disimpan!');
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
          autoClose={true}
        />
      )}

      <EvoModal isOpen={isOpen} onClose={onClose} title="Ubah Data Operator">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <EvoInText
            name="namaOperator"
            label="Nama Operator"
            placeholder="Masukkan nama operator"
            value={formData.namaOperator}
            onChange={handleChange}
            error={errors.namaOperator}
          />

          <EvoInText
            name="whatsappOperator"
            label="Nomor Telephone (Whatsapp) Operator"
            placeholder="Masukkan nomor whatsapp operator"
            value={formData.whatsappOperator}
            onChange={handleChange}
            error={errors.whatsappOperator}
          />

          <EvoInText
            name="emailOperator"
            label="E-mail Operator"
            placeholder="Masukkan alamat e-mail operator"
            value={formData.emailOperator}
            onChange={handleChange}
            error={errors.emailOperator}
          />

          <EvoInTextarea
            name="alamatKantorOperator"
            label="Alamat Kantor Operator"
            placeholder="Masukkan alamat kantor operator"
            value={formData.alamatKantorOperator}
            onChange={handleChange}
            error={errors.alamatKantorOperator}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditCashForm;
