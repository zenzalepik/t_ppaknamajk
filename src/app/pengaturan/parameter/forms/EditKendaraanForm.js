import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiPengaturanParameterKendaraanUpdate } from '../api/fetchApiPengaturanParameterKendaraanUpdate';
import { useQueryClient } from '@tanstack/react-query';

const EditKendaraanForm = ({
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
    tipe_kendaraan: '',
    // nilai: '',
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      id: '',
      tipe_kendaraan: '',
      // nilai: '',
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
        tipe_kendaraan: initialData.nama || '',
        // nilai: initialData.nilai || '',
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
          await fetchApiPengaturanParameterKendaraanUpdate(formData);

          queryClient.invalidateQueries(['pengaturanParameter']); // Refresh tabel setelah tambah data

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
        title="Ubah Nilai Parameter Kendaraan"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          {/* <div className="border-2 border-primary rounded-[20px] p-4">
            <div className="text-card mb-1">Nama Parameter</div>
            <div className="text-title_small">{formData.tipe_kendaraan}</div>
          </div> */}

          <div className="mx-4">
            <EvoInText
              name="tipe_kendaraan"
              label="Nilai Parameter yang Baru"
              placeholder="Masukkan nama tipe kendaraan"
              value={formData.tipe_kendaraan}
              onChange={handleChange}
              error={errors.tipe_kendaraan}
            />
          </div>

          {/* <div className="border-dashed p-4 !pt-0">
            <div className="text-card mb-1">Keterangan</div>
            <div className="text-title_content">
              Pengaturan mekanisme pembayaran untuk member
            </div>
          </div> */}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditKendaraanForm;
