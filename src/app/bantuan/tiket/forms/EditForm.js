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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiBantuanTiketUpdate } from '../api/fetchApiBantuanTiketUpdate';
import numbers from '@/utils/numbers';
import { fetchApiMasterDataPOS } from '../api/fetchApiMasterDataPOS';

const EditPengaduanForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedDate, setSelectedDate] = useState(
  //   initialData.tanggal_permasalahan||''
  // );

  const [formData, setFormData] = useState({
    judul_permasalahan: '',
    kategori_permasalahan: '',
    pos_id: '',
    hardware_atau_alat: '',
    penyebab_permasalahan: '',
    keterangan_permasalahan: '',
    nama_pelapor: '',
    tanggal_permasalahan: null,
    // status_permasalahan: 'Pending',

    // Tambahan field sesuai API
    /*tanggal_perbaikan: '',
    jenis_perbaikan: '',
    status_perbaikan: 'Pending',
    penanganan: '',
    keterangan_penanganan: '',
    nama_yang_menangani: '',*/
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData((prev) => ({
      ...prev, // Menyimpan data yang sudah ada
      judul_permasalahan: '',
      kategori_permasalahan: '',
      pos_id: '',
      hardware_atau_alat: '',
      penyebab_permasalahan: '',
      keterangan_permasalahan: '',
      nama_pelapor: '',
      tanggal_permasalahan: null,
      // status_permasalahan: 'Pending',
      // tanggal_permasalahan: '',

      // Tambahan field sesuai API
      /*tanggal_perbaikan: '',
      jenis_perbaikan: '',
      status_perbaikan: 'Pending',
      penanganan: '',
      keterangan_penanganan: '',
      nama_yang_menangani: '',*/
    }));
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      const reformatTanggal = (tanggalStr) => {
        if (!tanggalStr || typeof tanggalStr !== 'string') return tanggalStr;

        const parts = tanggalStr.split('-');
        // Jika format adalah dd-MM-yyyy
        if (
          parts.length === 3 &&
          parts[0].length === 2 &&
          parts[1].length === 2 &&
          parts[2].length === 4
        ) {
          const [dd, MM, yyyy] = parts;
          return `${MM}-${dd}-${yyyy}`; // ubah jadi MM-dd-yyyy
        }

        return tanggalStr; // kalau bukan dd-MM-yyyy, biarkan
      };

      setFormData({
        id: initialData.id || '',
        judul_permasalahan: initialData.judul_permasalahan || '',
        kategori_permasalahan: initialData.kategori_permasalahan || '',
        pos_id: initialData.pos_id,
        hardware_atau_alat: initialData.hardware_atau_alat || '',
        penyebab_permasalahan: initialData.penyebab_permasalahan || '',
        keterangan_permasalahan: initialData.keterangan_permasalahan || '',
        nama_pelapor: initialData.nama_pelapor || '',
        tanggal_permasalahan: reformatTanggal(initialData.tanggal_permasalahan),
        // status_permasalahan: initialData.status_permasalahan || '',

        // Tambahan field sesuai API
        /*tanggal_perbaikan: initialData.tanggal_perbaikan || '',
        jenis_perbaikan: initialData.jenis_perbaikan || '',
        status_perbaikan: initialData.status_perbaikan || 'Pending',
        penanganan: initialData.penanganan || '',
        keterangan_penanganan: initialData.keterangan_penanganan || '',
        nama_yang_menangani: initialData.nama_yang_menangani || '',*/
      });
      setSelectedDate(reformatTanggal(initialData.tanggal_permasalahan));
    }
  }, [initialData]);

  useEffect(() => {
    // console.log('Form Data Updated:', formData);
  }, [formData]);

  const formatTanggal = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const {
    data: masterDataPOS,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataPOS', currentPage],
    queryFn: () =>
      fetchApiMasterDataPOS({
        limit: numbers.apiNumLimitExpanded,
        page: currentPage,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
  });

  const posOptions =
    masterDataPOS?.data?.map((pos) => ({
      label: pos.keterangan || `Pos ${pos.id}`,
      value: String(pos.id),
    })) || [];

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
      // tanggal_permasalahan:
      //   formData.tanggal_permasalahan === ''
      //     ? 'Tanggal masalah wajib dipilih'
      //     : '',

      // Validasi tetap seperti sebelumnya
      tanggal_permasalahan: !formData.tanggal_permasalahan
        ? 'Tanggal masalah wajib dipilih'
        : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // Format tanggal sebelum kirim
    const formattedData = {
      ...formData,
      tanggal_permasalahan: formatTanggal(formData.tanggal_permasalahan),
    };

    // onSubmit?.(formData);

    // ✅ Cetak JSON ke console sebelum submit
    // console.log('Form Data (JSON):', JSON.stringify(formData, null, 2));

    onSubmit?.(formattedData);
    console.log('Form Data (JSON):', JSON.stringify(formattedData, null, 2));

    try {
      // console.log(formData);
      // await fetchApiBantuanTiketUpdate(formData);

      // queryClient.invalidateQueries(['bantuanTiketPermasalahanPerbaikan']); // Refresh tabel setelah tambah data

      // setNotifMessage('Laporan masalah berhasil disimpan!');
      // setNotifType('success');

      // setTimeout(() => handleCloseModal(), 500);

      await fetchApiBantuanTiketUpdate(formattedData);
      queryClient.invalidateQueries(['bantuanTiketPermasalahanPerbaikan']);
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
        title="Ubah Data Pengaduan Masalah"
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
            // value={selectedOptions.kategori_permasalahan}
            value={formData.kategori_permasalahan}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                kategori_permasalahan: value,
              }))
            }
            error={errors.kategori_permasalahan}
            placeholder="Pilih kategori masalah"
          />
          {/* <>{formData.tanggal_permasalahan}</> */}
          {/* {initialData?.tanggal_permasalahan} */}
          <EvoInDatePicker
            name="tanggal_permasalahan"
            label="Tanggal Masalah"
            value={
              selectedDate instanceof Date
                ? selectedDate
                : selectedDate
                ? new Date(selectedDate)
                : null
            }
            // value={formData.tanggal_permasalahan}

            // value={formData.judul_permasalahan}
            placeholder="Pilih tanggal masalah"
            onChange={(date) => {
              setSelectedDate(date); // ⬅️ Tetap simpan sebagai Date object
              setFormData((prev) => ({
                ...prev,
                tanggal_permasalahan: date, // ⬅️ Simpan Date object juga di formData
              }));
            }}
            error={errors.tanggal_permasalahan}
          />

          <EvoInDropdown
            name="pos_id"
            label="Pintu Pos"
            // options={[
            //   { label: 'Pintu pos A', value: '1' },
            //   { label: 'Pintu pos B', value: '2' },
            // ]}
            options={posOptions}
            // value={selectedOptions.pos_id}
            value={formData.pos_id}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                pos_id: value,
              }))
            }
            error={errors.pos_id}
            placeholder={isLoading ? 'Memuat data...' : 'Pilih pintu pos'}
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
            // value={selectedOptions.hardware_atau_alat}
            value={formData.hardware_atau_alat}
            // onChange={handleDropdownChange}
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

export default EditPengaduanForm;
