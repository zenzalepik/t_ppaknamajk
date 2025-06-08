import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiPengaturanParameterUpdate } from '../api/fetchApiPengaturanParameterUpdate';
import { useQueryClient } from '@tanstack/react-query';

const EditParameterForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData=null
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    nilai: '',
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      id: '',
      nama: '',
      nilai: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        nama: initialData.nama || '',
        nilai: initialData.nilai || '',
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
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} wajib diisi`;
      }
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // console.log(formData);
    // onSubmit?.(formData);

    try {
          await fetchApiPengaturanParameterUpdate(formData);

          queryClient.invalidateQueries(['masterDataPerusahaan']); // Refresh tabel setelah tambah data

          setNotifMessage('Data parameter berhasil disimpan!');
          setNotifType('success');

          setTimeout(() => handleCloseModal(), 500);
        } catch (error) {
          setNotifMessage(error.message);
          setNotifType('error');
        }

    setNotifMessage('Data parameter berhasil disimpan!');
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

      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Ubah Nilai Parameter"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <div className="border-2 border-primary rounded-[20px] p-4">
            <div className="text-card mb-1">Nama Parameter</div>
            <div className="text-title_small">{formData.nama}</div>
          </div>

          <div className="mx-4">
            <EvoInText
              name="nilai"
              label="Nilai"
              placeholder="Masukkan nilai"
              value={formData.nilai}
              onChange={handleChange}
              error={errors.nilai}
            />
          </div>

          <div className="border-dashed p-4 !pt-0">
            <div className="text-card mb-1">Keterangan</div>
            <div className="text-title_content">
              Pengaturan mekanisme pembayaran untuk member
            </div>
          </div>
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditParameterForm;
