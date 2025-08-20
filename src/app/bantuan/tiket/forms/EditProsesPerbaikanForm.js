'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import { RiArrowRightLine, RiCalendarEventLine } from '@remixicon/react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import { fetchApiBantuanTiketUpdate } from '../api/fetchApiBantuanTiketUpdate';
import { useQueryClient } from '@tanstack/react-query';

const EditProsesPerbaikanForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState('');

  const [formData, setFormData] = useState({
    tanggal_perbaikan: '',
    jenis_perbaikan: '',
    status_permasalahan: 'Pending',
    status_perbaikan: 'Pending',
    penanganan: '',
    keterangan_penanganan: '',
    nama_yang_menangani: '',
  });

  const [selectedOptions, setSelectedOptions] = useState({
    status_permasalahan: '',
  }); // ✅ Fungsi untuk mereset pilihan saat modal ditutup

  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev,
      tanggal_perbaikan: '',
      jenis_perbaikan: '',
      status_permasalahan: 'Pending',
      status_perbaikan: 'Pending',
      penanganan: '',
      keterangan_penanganan: '',
      nama_yang_menangani: '',
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        id: initialData.id || '',
        tanggal_perbaikan: initialData.tanggal_perbaikan || '',
        jenis_perbaikan: initialData.jenis_perbaikan || '',
        status_permasalahan: initialData.status_permasalahan,
        status_perbaikan: initialData.status_perbaikan,
        penanganan: initialData.penanganan,
        keterangan_penanganan: initialData.keterangan_penanganan || '',
        nama_yang_menangani: initialData.nama_yang_menangani || '',
      }));
      setSelectedDate(initialData.tanggal_perbaikan);
    }
  }, [initialData]);

  useEffect(() => {
    // console.log('Form Data Updated:', formData);
  }, [formData]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      tanggal_perbaikan:
        selectedDate === '' ? 'Tanggal masalah wajib dipilih' : '',
      jenis_perbaikan:
        formData.jenis_perbaikan === '' ? 'Jenis perbaikan wajib diisi' : '',
      status_perbaikan:
        formData.status_perbaikan === '' || formData.status_perbaikan === null
          ? 'Status perbaikan wajib dipilih'
          : '',
      penanganan: formData.penanganan === '' ? 'Penanganan wajib diisi' : '',
      keterangan_penanganan:
        formData.keterangan_penanganan === ''
          ? 'Keterangan penanganan wajib diisi'
          : '',
      nama_yang_menangani:
        formData.nama_yang_menangani === ''
          ? 'Nama yang menangani wajib diisi'
          : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);
    // console.log(JSON.stringify(formData));

    // ✅ Cetak JSON ke console sebelum submit
    // console.log('Form Data (JSON):', JSON.stringify(formData, null, 2));

    try {
      // console.log(formData);
      await fetchApiBantuanTiketUpdate(formData);

      queryClient.invalidateQueries(['bantuanTiketPermasalahanPerbaikan']); // Refresh tabel setelah tambah data

      setNotifMessage('Laporan perbaikan berhasil disimpan!');
      setNotifType('success');

      setTimeout(() => handleCloseModal(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  console.log(formData.status_perbaikan + '====formData.status_perbaikan');
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Perbaikan">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <div className="flex gap-3 flex-col border border-border rounded-[20px] p-6">
            <div className="text-title_medium">
              {initialData?.judul_permasalahan || ''}
            </div>
            <div className="flex gap-1 items-center text-content_medium text-black/[0.72]">
              <RiCalendarEventLine size={16} />
              {initialData?.tanggal_permasalahan || ''}
            </div>

            {/* <EvoButton
              outlined={true}
              icon={<RiArrowRightLine size={16} />}
              isReverse={true}
              buttonText="Lihat detail masalah"
              className="!w-fit px-4 py-3"
              onClick={() => {}}
            /> */}
          </div>
          {/* {formData.tanggal_perbaikan} */}
          <EvoInDatePicker
            name="tanggal_perbaikan"
            label="Tanggal Perbaikan"
            value={selectedDate}
            placeholder="Pilih tanggal perbaikan"
            onChange={(date) => {
              setSelectedDate(date);
              setFormData((prev) => ({
                ...prev,
                tanggal_perbaikan: date,
              }));
            }}
            error={errors.tanggal_perbaikan}
          />

          <EvoInText
            name="jenis_perbaikan"
            label="Jenis Perbaikan"
            placeholder="Masukkan jenis perbaikan"
            value={formData.jenis_perbaikan}
            onChange={handleChange}
            error={errors.jenis_perbaikan}
          />
          <EvoInDropdown
            name="status_perbaikan"
            label="Status Perbaikan"
            options={[
              { label: 'Pending', value: 'Pending' },
              { label: 'On Progress', value: 'On Progress' },
              { label: 'Done', value: 'Done' },
            ]}
            // value={selectedOptions.status_perbaikan}
            value={formData.status_perbaikan}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                status_perbaikan: value,
                status_permasalahan: value,
              }))
            }
            error={errors.status_perbaikan}
            placeholder="Pilih status perbaikan"
          />

          <EvoInTextarea
            name="penanganan"
            label="Penanganan"
            placeholder="Ketik penanganan masalah..."
            value={formData.penanganan}
            onChange={handleChange}
            error={errors.penanganan}
          />

          <EvoInTextarea
            name="keterangan_penanganan"
            label="Keterangan Penanganan"
            placeholder="Ketik keterangan penanganan masalah..."
            value={formData.keterangan_penanganan}
            onChange={handleChange}
            error={errors.keterangan_penanganan}
          />
          <EvoInText
            name="nama_yang_menangani"
            label="Nama yang Menangani"
            placeholder="Masukkan nama yang menangani"
            value={formData.nama_yang_menangani}
            onChange={handleChange}
            error={errors.nama_yang_menangani}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditProsesPerbaikanForm;
