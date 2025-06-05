import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import companyTypes from '@/utils/companyTypes';
import strings from '@/utils/strings';
import { useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataPerusahaanCreate } from '../api/fetchApiMasterDataPerusahaanCreate';

const AddDataPerusahaanForm = ({ isOpen, onClose, onSubmit }) => {
  const [selectedJenisPerusahaan, setSelectedJenisPerusahaan] = useState('');
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      jenis_perusahaan: selectedJenisPerusahaan,
    }));
  }, [selectedJenisPerusahaan]);

  const selectedBusinessType = companyTypes.find(
    (item) => item.name === selectedJenisPerusahaan
  );

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setSelectedJenisPerusahaan('');
    setFormData({
      nama: '',
      jenis_perusahaan: '',
      kontak: '',
      status: false,
      user_id: '',
    });
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  // Event handler untuk menangkap jenis perusahaan saat diklik
  const handleSelectJenisPerusahaan = (name) => {
    console.log(`Jenis Perusahaan yang dipilih: ${name}`);
    setSelectedJenisPerusahaan(name); // Menyimpan pilihan
  };

  const [formData, setFormData] = useState({
    nama: '',
    jenis_perusahaan: selectedJenisPerusahaan,
    kontak: '',
    status: false,
    user_id: null,
  });

  // Ambil user_id secara async
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setFormData((prev) => ({ ...prev, user_id: id }));
    };
    fetchUserId();
  }, []);


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
      nama: formData.nama.trim() === '' ? 'Nama Perusahaan wajib diisi' : '',
      kontak: formData.kontak.trim() === '' ? 'Kontak wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);

    try {
      await fetchApiMasterDataPerusahaanCreate(formData);

      queryClient.invalidateQueries(['masterDataPerusahaan']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Perusahaan berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => onClose(), 500);
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
        title={
          selectedJenisPerusahaan
            ? 'Tambah Perusahaan'
            : 'Pilih Jenis Perusahaan'
        }
      >
        {!selectedJenisPerusahaan && (
          <div className="flex justify-center gap-6">
            {companyTypes.map((item, index) => (
              <div
                key={index}
                className="w-64 py-12 px-6 bg-gradientPrimary45 rounded-[32px] shadow-cardInfo flex flex-col items-center text-white transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleSelectJenisPerusahaan(item.name)}
              >
                <div className="">{item.icon}</div>
                <h3 className="text-card mt-2">{item.name}</h3>
                {/* <p className="text-content_medium text-black/40 mt-1 text-center">
                  {item.description}
                </p> */}
              </div>
            ))}
          </div>
        )}

        {/* Form hanya muncul setelah memilih jenis perusahaan */}
        {selectedJenisPerusahaan && (
          <EvoForm
            onSubmit={handleSubmit}
            submitText="Simpan"
            cancelText="Batal"
            onCancel={handleCloseModal}
          >
            {/* Card Hasil Pilih Jenis Perusahaan */}
            <div className="w-full flex flex-col">
              <label className="text-card mb-1">Jenis Perusahaan</label>
              <div className="w-full p-6 bg-primaryTransparent rounded-[32px] flex items-center gap-3">
                <div className="text-primary">{selectedBusinessType?.icon}</div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-title_small">
                    {selectedJenisPerusahaan}
                  </h3>
                  <p className="text-sm text-black/80 text-center">
                    {selectedBusinessType?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Jenis Perusahaan */}
            <EvoInText
              name="nama"
              label="Nama Perusahaan"
              placeholder="Masukkan Nama Perusahaan"
              value={formData.nama}
              onChange={handleChange}
              error={errors.nama}
            />
            <EvoInText
              name="kontak"
              label="Kontak"
              placeholder="Masukkan Kontak Perusahaan"
              value={formData.kontak}
              onChange={handleChange}
              error={errors.kontak}
            />
          </EvoForm>
        )}
      </EvoModal>
    </>
  );
};

export default AddDataPerusahaanForm;
