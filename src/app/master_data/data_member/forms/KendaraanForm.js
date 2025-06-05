import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';

const KendaraanForm = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  dropdownOptions = {}, // Expects: { jenisKendaraan: [...] }
  existingData = [],
}) => {
  const [formData, setFormData] = useState({
    nomorPolisi: '',
    jenisKendaraan: '',
  });

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({ nomorPolisi: '', jenisKendaraan: '' });
    }
  }, [editData]);

  // Clear notifikasi saat modal ditutup
  useEffect(() => {
    if (!isOpen) {
      setNotifMessage('');
      setErrors({});
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      nomorPolisi:
        formData.nomorPolisi.trim() === '' ? 'Nomor Polisi wajib diisi' : '',
      jenisKendaraan:
        formData.jenisKendaraan === '' ? 'Jenis Kendaraan wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    const isDuplicate = existingData.some(
      (item) =>
        item.nomorPolisi.toLowerCase() === formData.nomorPolisi.toLowerCase() &&
        (!editData || item.nomorPolisi !== editData.nomorPolisi)
    );

    if (isDuplicate) {
      setNotifMessage('Nomor Polisi sudah terdaftar.');
      setNotifType('error');
      return;
    }

     // ✅ Print data ke console
  console.log('Data yang akan dikirim:', formData);

    onSubmit?.(formData);

    setNotifMessage(
      editData
        ? 'Data kendaraan berhasil diperbarui!'
        : 'Data kendaraan berhasil ditambahkan!'
    );
    setNotifType('success');

    setTimeout(() => onClose(), 1000);
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
        onClose={onClose}
        title={editData ? 'Edit Kendaraan' : 'Tambah Kendaraan'}
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
          noform={true}
        >
          <EvoInText
            name="nomorPolisi"
            label="Nomor Polisi"
            placeholder="Masukkan nomor polisi"
            value={formData.nomorPolisi}
            onChange={handleChange}
            error={errors.nomorPolisi}
          />
          <EvoInDropdown
            name="jenisKendaraan"
            label="Jenis Kendaraan"
            options={dropdownOptions.jenisKendaraan || []}
            value={formData.jenisKendaraan}
            // onChange={(value) =>
            //   setFormData((prev) => ({ ...prev, jenisKendaraan: value }))
            // }
              onChange={handleChange} // Gunakan handler yang sama seperti input lain

            error={errors.jenisKendaraan}
            placeholder="Pilih Jenis Kendaraan"
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default KendaraanForm;
