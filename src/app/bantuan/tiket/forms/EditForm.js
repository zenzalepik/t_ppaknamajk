'use client';

import React, { useState } from 'react';
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

const EditProsesPerbaikanForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    tanggalPerbaikan:'',
    status: '',
    penanganan: '',
    keteranganPenanganan: '',
    namaYangMenangani: '',
  });

  const [selectedDate, setSelectedDate] = useState('');

  const [selectedOptions, setSelectedOptions] = useState({
    status: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      tanggalPerbaikan:
      selectedDate === '' ? 'Tanggal masalah wajib dipilih' : '',
      status: formData.status === '' ? 'Status wajib dipilih' : '',
      penanganan:
        formData.penanganan.trim() === '' ? 'Penanganan wajib diisi' : '',
      keteranganPenanganan:
        formData.keteranganPenanganan.trim() === ''
          ? 'Keterangan penanganan wajib diisi'
          : '',
      namaYangMenangani:
        formData.namaYangMenangani.trim() === ''
          ? 'Nama yang menangani wajib diisi'
          : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);

    setNotifMessage('Data berhasil disimpan!');
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
            <div className="text-title_medium">Komputer Tidak Menyala</div>
            <div className="flex gap-1 items-center text-content_medium text-black/[0.72]">
              <RiCalendarEventLine size={16} />
              24 April 2025
            </div>

            <EvoButton
              outlined={true}
              icon={<RiArrowRightLine size={16} />}
              isReverse={true}
              buttonText="Lihat detail masalah"
              className="!w-fit px-4 py-3"
              onClick={() => {}}
            />
          </div>

          <EvoInDatePicker
          name="tanggalPerbaikan"
            label="Tanggal Perbaikan"
            value={selectedDate}
            placeholder="Pilih tanggal perbaikan"
            onChange={(date) => setSelectedDate(date)}
            error={errors.tanggalPerbaikan}
          />

          <EvoInDropdown
            name="status"
            label="Status"
            options={[
              { label: 'Status A', value: 'A' },
              { label: 'Status B', value: 'B' },
            ]}
            // value={selectedOptions.status}
            value={formData.status}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
            error={errors.status}
            placeholder="Pilih status"
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
            name="keteranganPenanganan"
            label="Keterangan Penanganan"
            placeholder="Ketik keterangan penanganan masalah..."
            value={formData.keteranganPenanganan}
            onChange={handleChange}
            error={errors.keteranganPenanganan}
          />
          <EvoInText
            name="namaYangMenangani"
            label="Nama yang Menangani"
            placeholder="Masukkan nama yang menangani"
            value={formData.namaYangMenangani}
            onChange={handleChange}
            error={errors.namaYangMenangani}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditProsesPerbaikanForm;
