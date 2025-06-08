import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiPengaturanTarifParkirUpdate } from '../api/fetchApiPengaturanTarifParkirUpdate';
import { useQueryClient } from '@tanstack/react-query';

const EditTarifParkirForm = ({
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
    tipeKendaraan: '',
    kendaraan_id: '',
    grace_period: '',
    tarif_grace_period: '',
    rotasi_pertama: '',
    tarif_rotasi_pertama: '',
    rotasi_kedua: '',
    tarif_rotasi_kedua: '',
    rotasi_ketiga: '',
    tarif_rotasi_ketiga: '', //Rotasi Seterusnya
    tarif_maksimal: '',
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      id: '',
      tipeKendaraan: '',
      kendaraan_id: '',
      grace_period: '',
      tarif_grace_period: '',
      rotasi_pertama: '',
      tarif_rotasi_pertama: '',
      rotasi_kedua: '',
      tarif_rotasi_kedua: '',
      rotasi_ketiga: '',
      tarif_rotasi_ketiga: '', //Rotasi Seterusnya
      tarif_maksimal: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        tipeKendaraan: initialData.tipeKendaraan || '-',
        kendaraan_id: initialData.kendaraan_id || '',
        grace_period: initialData.grace_period || '',
        tarif_grace_period: initialData.tarif_grace_period || '',
        rotasi_pertama: initialData.rotasi_pertama || '',
        tarif_rotasi_pertama: initialData.tarif_rotasi_pertama || '',
        rotasi_kedua: initialData.rotasi_kedua || '',
        tarif_rotasi_kedua: initialData.tarif_rotasi_kedua || '',
        rotasi_ketiga: initialData.rotasi_ketiga || '',
        tarif_rotasi_ketiga: initialData.tarif_rotasi_ketiga || '',
        tarif_maksimal: initialData.tarif_maksimal || '',
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

    // onSubmit?.(formData);
    // console.log(formData);

    try {
      await fetchApiPengaturanTarifParkirUpdate(formData);

      queryClient.invalidateQueries(['masterDataPerusahaan']); // Refresh tabel setelah tambah data

      setNotifMessage('Tarif Parkir berhasil disimpan!');
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
        title="Edit Tarif Parkir"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <div className="border-2 border-primary rounded-[20px] p-4">
            <div className="text-card mb-1">Tipe Kendaraan</div>
            <div className="text-title_small">{formData.tipeKendaraan}</div>
            {/* <div className="text-title_small">{formData.tipeKendaraan + ' - ' +formData.kendaraan_id}</div> */}
          </div>

          <div className="flex gap-3 relative">
            <div className="w-[50%] flex gap-2 relative">
              <div className="w-[50%]">
                <EvoInText
                  name="grace_period"
                  label="Grace Periode"
                  placeholder="0"
                  value={formData.grace_period}
                  onChange={handleChange}
                  error={errors.grace_period}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">menit</div>
            </div>
            <EvoInText
              name="tarif_grace_period"
              label="Tarif dalam Grace Periode"
              placeholder="Rp. 0"
              value={formData.tarif_grace_period}
              onChange={handleChange}
              error={errors.tarif_grace_period}
            />
          </div>

          <div className="flex gap-3 ">
            <div className="w-[50%] flex gap-2 ">
              <div className="w-[50%]">
                <EvoInText
                  name="rotasi_pertama"
                  label="Rotasi Pertama"
                  placeholder="0"
                  value={formData.rotasi_pertama}
                  onChange={handleChange}
                  error={errors.rotasi_pertama}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">jam</div>
            </div>
            <EvoInText
              name="tarif_rotasi_pertama"
              label="Tarif Rotasi Pertama"
              placeholder="Rp. 0"
              value={formData.tarif_rotasi_pertama}
              onChange={handleChange}
              error={errors.tarif_rotasi_pertama}
            />
          </div>

          <div className="flex gap-3 ">
            <div className="w-[50%] flex gap-2 ">
              <div className="w-[50%]">
                <EvoInText
                  name="rotasi_kedua"
                  label="Rotasi Kedua"
                  placeholder="0"
                  value={formData.rotasi_kedua}
                  onChange={handleChange}
                  error={errors.rotasi_kedua}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">jam</div>
            </div>
            <EvoInText
              name="tarif_rotasi_kedua"
              label="Tarif Rotasi Kedua"
              placeholder="Rp. 0"
              value={formData.tarif_rotasi_kedua}
              onChange={handleChange}
              error={errors.tarif_rotasi_kedua}
            />
          </div>

          <div className="flex gap-3 ">
            <div className="w-[50%] flex gap-2 relative">
              <div className="w-[50%]">
                <EvoInText
                  name="rotasi_ketiga"
                  label="Rotasi Seterusnya"
                  placeholder="0"
                  value={formData.rotasi_ketiga}
                  onChange={handleChange}
                  error={errors.rotasi_ketiga}
                />
              </div>
              <div className="w-[50px] mt-8 text-black/[0.8]">jam</div>
            </div>
            <EvoInText
              name="tarif_rotasi_ketiga"
              label="Tarif Rotasi Seterusnya"
              placeholder="Rp. 0"
              value={formData.tarif_rotasi_ketiga}
              onChange={handleChange}
              error={errors.tarif_rotasi_ketiga}
            />
          </div>

          <EvoInText
            name="tarif_maksimal"
            label="Tarif Maksimal"
            placeholder="Rp. 0"
            value={formData.tarif_maksimal}
            onChange={handleChange}
            error={errors.tarif_maksimal}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditTarifParkirForm;
