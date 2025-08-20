import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import {fetchApiPengaturanTarifDendaUpdate} from '../api/fetchApiPengaturanTarifDendaUpdate';
import { useQueryClient } from '@tanstack/react-query';

const EditTarifDendaForm = ({
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
    kendaraan_id: '',
    tipeKendaraan: '',
    denda_tiket: '',
    denda_stnk: '',
    // berlakuUntukMember: '',
    denda_member: false,
    status: false,
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      kendaraan_id: '',
      tipeKendaraan: '',
      denda_tiket: '',
      denda_stnk: '',
      // berlakuUntukMember: '',
      denda_member: false,
      status: false,
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      // console.log('initial data '+JSON.stringify(initialData));
      setFormData({
        id: initialData.id || '',
        tipeKendaraan: initialData.tipeKendaraan || '-',
        kendaraan_id: initialData.kendaraan_id || '',

        denda_tiket: initialData.denda_tiket || '',
        denda_stnk: initialData.denda_stnk || '',
        denda_member: initialData.denda_member,
        status: initialData.status,
      });

      // ✅ Sinkronisasi checkbox juga di sini
      setSelectedBerlakuUntukMember({
        iya: initialData.denda_member || false,
      });
    }
  }, [initialData]);

  const [selectedBerlakuUntukMember, setSelectedBerlakuUntukMember] = useState({
    iya: false,
  });

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

  const handleBerlakuUntukMemberChange = (e, answer) => {
    const { checked } = e.target;
    setSelectedBerlakuUntukMember((prev) => ({
      ...prev,
      [answer.value]: checked,
    }));
    setFormData((prev) => ({
      ...prev,
      denda_member: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newErrors = {
    //   denda_tiket: formData.denda_tiket.trim() === '' ? 'Silahkan isi nilai terlebih dahulu' : '',
    //   denda_stnk: formData.denda_stnk.trim() === '' ? 'Silahkan isi nilai terlebih dahulu' : '',
    // };

    // setErrors(newErrors);

    // if (Object.values(newErrors).some((err) => err !== '')) {
    //   setNotifMessage('Formulir tidak boleh kosong.');
    //   setNotifType('error');
    //   return;
    // }

    // onSubmit?.({
    //   ...formData,
    // });

    // console.log(...formData);

    try {
      await fetchApiPengaturanTarifDendaUpdate(formData);

      queryClient.invalidateQueries(['masterDataPerusahaan']); // Refresh tabel setelah tambah data

      setNotifMessage('Data Gerbang berhasil disimpan!');
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
        title="Edit Tarif Denda"
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
          </div>
          <div className="flex gap-3">
            <EvoInText
              name="denda_tiket"
              label="Denda Tiket"
              placeholder="Rp. 0"
              value={formData.denda_tiket}
              onChange={handleChange}
              // error={errors.denda_tiket}
            />
            <EvoInText
              name="denda_stnk"
              label="Denda STNK"
              placeholder="Rp. 0"
              value={formData.denda_stnk}
              onChange={handleChange}
              // error={errors.denda_stnk}
            />
          </div>

          <EvoInCheckbox
            label="Berlaku Untuk Member?"
            answers={[
              {
                label: 'Iya',
                value: 'iya',
                checked: selectedBerlakuUntukMember.iya,
              },
            ]}
            onChange={handleBerlakuUntukMemberChange}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditTarifDendaForm;
