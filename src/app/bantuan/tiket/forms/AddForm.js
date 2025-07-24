'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import strings from '@/utils/strings';
import { useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiBantuanTiketCreate } from '../api/fetchApiBantuanTiketCreate';

const AddPengaduanForm = ({ isOpen, onClose, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState('');

  const [formData, setFormData] = useState({
    judul_permasalahan: '',
    kategori_permasalahan: '',
    pos_id: '',
    pos_id: '',
    hardware_atau_alat: '',
    penyebab_permasalahan: '',
    keterangan_permasalahan: '',
    nama_pelapor: '',
    tanggal_permasalahan: '',
    status_permasalahan: 'Pending',

    // Tambahan field sesuai API
    tanggal_perbaikan: '',
    jenis_perbaikan: '',
    status_perbaikan: 'Pending',
    penanganan: '',
    keterangan_penanganan: '',
    nama_yang_menangani: '',
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      judul_permasalahan: '',
      kategori_permasalahan: '',
      pos_id: '',
      pos_id: '',
      hardware_atau_alat: '',
      penyebab_permasalahan: '',
      keterangan_permasalahan: '',
      nama_pelapor: '',
      status_permasalahan: 'Pending',
      // tanggal_permasalahan: '',

      // Tambahan field sesuai API
      tanggal_perbaikan: '',
      jenis_perbaikan: '',
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
    // console.log('Form Data Updated:', formData);
  }, [formData]);

  const [selectedOptions, setSelectedOptions] = useState({
    kategori_permasalahan: '',
    pos_id: '',
    hardware_atau_alat: '',
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
      judul_permasalahan:
        formData.judul_permasalahan === '' ? 'Judul masalah wajib diisi' : '',
      kategori_permasalahan:
        formData.kategori_permasalahan === ''
          ? 'Kategori masalah wajib dipilih'
          : '',
      pos_id: formData.pos_id === '' ? 'Pintu Pos wajib dipilih' : '',
      hardware_atau_alat:
        formData.hardware_atau_alat === ''
          ? 'Alat/Perangkat wajib dipilih'
          : '',
      penyebab_permasalahan:
        formData.penyebab_permasalahan === '' ? 'Penyebab wajib diisi' : '',
      keterangan_permasalahan:
        formData.keterangan_permasalahan === ''
          ? 'Keterangan Permasalahan wajib diisi'
          : '',
      nama_pelapor:
        formData.nama_pelapor === '' ? 'Nama Pelapor wajib diisi' : '',
      // tanggal_permasalahan:
      //   selectedDate === '' ? 'Tanggal masalah wajib dipilih' : '', // Tambahkan validasi tanggal
      tanggal_permasalahan:
        formData.tanggal_permasalahan === ''
          ? 'Tanggal masalah wajib dipilih'
          : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);

    // ✅ Cetak JSON ke console sebelum submit
    console.log('Form Data (JSON):', JSON.stringify(formData, null, 2));

    try {
      await fetchApiBantuanTiketCreate(formData);
      //       await fetchApiBantuanTiketCreate({
      //   kategori: "Pengaduan",
      //   produk: "Kartu Member",
      //   tipe_masalah: "Tidak bisa tap",
      //   tanggal_masalah: "2025-06-04",
      //   jam_masalah: "14:30",
      //   deskripsi: "Kartu tidak terdeteksi saat digunakan di gerbang masuk.",
      //   pos_id: "1",
      //   nama_pelapor: "Andi Saputra",
      //   status: "Pending",
      //   penanganan: "",
      //   keterangan_penanganan: "",
      //   nama_yang_menangani: ""
      // }
      // );

      queryClient.invalidateQueries(['bantuanTiketPermasalahanPerbaikan']); // Refresh tabel setelah tambah data

      setNotifMessage('Laporan masalah berhasil disimpan!');
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
          autoClose
        />
      )}

      <EvoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Kirim Pengaduan Gangguan"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="judul_permasalahan"
            label="Judul Masalah"
            placeholder="Masukkan judul masalah"
            value={formData.judul_permasalahan}
            onChange={handleChange}
            error={errors.judul_permasalahan}
          />

          <EvoInDropdown
            name="kategori_permasalahan"
            label="Kategori Masalah"
            options={[
              { label: 'Hardware/Alat', value: 'Hardware/Alat' },
              { label: 'Sistem', value: 'Sistem' },
              { label: 'SDM', value: 'SDM' },
              { label: 'Operasional', value: 'Operasional' },
              { label: 'Lain-lain', value: 'Lain-lain' },
            ]}
            value={formData.kategori_permasalahan}
            // onChange={(e) =>
            //   setFormData((prev) => ({
            //     ...prev,
            //     kategori_permasalahan: e.target.value,
            //   }))
            // }
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                kategori_permasalahan: value,
              }))
            }
            error={errors.kategori_permasalahan}
            placeholder="Pilih kategori masalah"
          />

          <EvoInDatePicker
            name="tanggal_permasalahan"
            label="Tanggal Masalah"
            value={selectedDate}
            placeholder="Pilih tanggal masalah"
            // onChange={(date) => {
            //   setSelectedDate(date);
            //   setFormData((prev) => ({ ...prev, tanggal_permasalahan: date }));
            // }}
            onChange={(date) => {
              const formattedDate = new Intl.DateTimeFormat('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(date)); // hasil: "31/05/2021"

              const normalizedDate = formattedDate.replace(/\//g, '-'); // jadi: "31-05-2021"

              setSelectedDate(normalizedDate);
              setFormData((prev) => ({
                ...prev,
                tanggal_permasalahan: normalizedDate,
              }));
            }}
            error={errors.tanggal_permasalahan}
          />

          <EvoInDropdown
            name="pos_id"
            label="Pintu Pos"
            options={[
              { label: 'Pintu pos A', value: '1' },
              { label: 'Pintu pos B', value: '2' },
            ]}
            value={formData.pos_id}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                pos_id: value,
              }))
            }
            // onChange={(e) =>
            //   setFormData((prev) => ({ ...prev, pos_id: e.target.value }))
            // }
            error={errors.pos_id}
            placeholder="Pilih pintu pos"
          />

          <EvoInDropdown
            name="hardware_atau_alat"
            label="Nama alat/perangkat yang bermasalah"
            options={[
              { label: 'Barrier Gate', value: 'Barrier Gate' },
              { label: 'Scanner QR', value: 'Scanner QR' },
              { label: 'Printer Tiket', value: 'Printer Tiket' },
              { label: 'Loop Detector', value: 'Loop Detector' },
              { label: 'Kamera ANPR', value: 'Kamera ANPR' },
              { label: 'Komputer POS', value: 'Komputer POS' },
              { label: 'UPS', value: 'UPS' },
              { label: 'Switch Jaringan', value: 'Switch Jaringan' },
              { label: 'Modem', value: 'Modem' },
              { label: 'Lain-lain', value: 'Lain-lain' },
            ]}
            value={formData.hardware_atau_alat}
            // onChange={(e) =>
            //   setFormData((prev) => ({
            //     ...prev,
            //     hardware_atau_alat: e.target.value,
            //   }))
            // }
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                hardware_atau_alat: value,
              }))
            }
            error={errors.hardware_atau_alat}
            placeholder="Pilih alat/perangkat"
          />

          <EvoInTextarea
            name="penyebab_permasalahan"
            label="Penyebab"
            placeholder="Ketik penyebab masalah..."
            value={formData.penyebab_permasalahan}
            onChange={handleChange}
            error={errors.penyebab_permasalahan}
          />

          <EvoInTextarea
            name="keterangan_permasalahan"
            label="Keterangan Permasalahan"
            placeholder="Ketik keterangan permasalahan..."
            value={formData.keterangan_permasalahan}
            onChange={handleChange}
            error={errors.keterangan_permasalahan}
          />
          <EvoInText
            name="nama_pelapor"
            label="Nama Pelapor"
            placeholder="Masukkan nama pelapor"
            value={formData.nama_pelapor}
            onChange={handleChange}
            error={errors.nama_pelapor}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddPengaduanForm;
