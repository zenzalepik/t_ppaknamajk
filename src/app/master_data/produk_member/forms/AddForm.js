'use client';

import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import companyTypes from '@/utils/companyTypes';
import strings from '@/utils/strings';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataProdukMemberCreate } from '../api/fetchApiMasterDataProdukMemberCreate';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';


const AddProdukMemberForm = ({ isOpen, onClose, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const queryClient = useQueryClient();

  const {
    data: kendaraanData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['kendaraanList'],
    queryFn: fetchApiMasterDataDataKendaraan,
  });

  const [formData, setFormData] = useState({
    nama: '',
    periode_mulai: '',
    periode_akhir: '',
    periode:[],
    // periode_value: '',
    // periode_unit: '',
    list_id_kendaraan: [],
    max_kendaraan: '',
    tarif: '',
    biaya_kartu: '',
    biaya_ganti_nopol: '',
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

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData({
    nama: '',
    periode_mulai: '',
    periode_akhir: '',
    periode:[],
    // periode_value: '',
    // periode_unit: '',
    list_id_kendaraan: [],
    max_kendaraan: '',
    tarif: '',
    biaya_kartu: '',
    biaya_ganti_nopol: '',
    status: false,
    });
    setErrors({});
    setNotifMessage('');
    onClose();
  };

  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     periode_mulai: startDate,
  //     periode_akhir: endDate,
  //     periode: [String(startDate), String(endDate)],
  //   }));
  // }, [startDate, endDate]);

   useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      periode: [
        String(prev.periode_mulai),
        String(prev.periode_akhir),
      ],
    }));
  }, [formData.periode_mulai, formData.periode_akhir]);

  // const [selectedKendaraan, setSelectedKendaraan] = useState({
  //   mobil: false,
  //   motor: false,
  //   truk: false,
  //   taxi: false,
  // });

  // useEffect(() => {
  //   setErrors((prev) => ({
  //     ...prev,
  //     kendaraan:
  //       formData.list_id_kendaraan.length === 0
  //         ? 'Minimal satu kendaraan harus dipilih'
  //         : '',
  //   }));
  // }, [formData.list_id_kendaraan]); // Setiap kali `list_id_kendaraan` berubah, error diperbarui
  useEffect(() => {
    if (formData.list_id_kendaraan.length > 0) {
      setErrors((prev) => ({
        ...prev,
        kendaraan:
          formData.list_id_kendaraan.length === 0
            ? 'Minimal satu kendaraan harus dipilih'
            : '',
      }));
    }
  }, [formData.list_id_kendaraan]); // Error hanya muncul setelah user memilih sesuatu

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // const handleCheckboxChange = (e, answer) => {
  //   const { checked } = e.target;
  //   setSelectedKendaraan((prev) => ({
  //     ...prev,
  //     [answer.value]: checked,
  //   }));
  //   setErrors((prev) => ({ ...prev, kendaraan: '' }));
  // };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const updatedList = checked
        ? [...new Set([...prev.list_id_kendaraan, String(value)])] // Pastikan tidak ada duplikasi
        : prev.list_id_kendaraan.filter((id) => id !== String(value));

      return {
        ...prev,
        list_id_kendaraan: updatedList,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const list_id_kendaraan = Object.values(selectedKendaraan).some(
    //   (val) => val === true
    // );

    const newErrors = {
      nama: formData.nama === '' ? 'Nama Produk Member wajib diisi' : '',
      periode_mulai:
        formData.periode_mulai === '' ? 'Tanggal Mulai wajib diisi' : '',
      periode_akhir:
        formData.periode_akhir === '' ? 'Tanggal Akhir wajib diisi' : '',

      // jumlahPeriode:
      //   formData.jumlahPeriode.trim() === ''
      //     ? 'Jumlah Periode wajib diisi'
      //     : '',
      // tipePeriode:
      //   formData.tipePeriode.trim() === '' ? 'Tipe Periode wajib dipilih' : '',
      max_kendaraan:
        formData.max_kendaraan === ''
          ? 'Maksimal Kendaraan wajib diisi'
          : '',
      tarif: formData.tarif === '' ? 'Tarif wajib diisi' : '',
      biaya_kartu:
        formData.biaya_kartu === '' ? 'Biaya Kartu wajib diisi' : '',
      biaya_ganti_nopol:
        formData.biaya_ganti_nopol === ''
          ? 'Biaya Ganti Nopol wajib diisi'
          : '',
      // kendaraan:
      //   formData.list_id_kendaraan.length === 0
      //     ? ''
      //     : 'Minimal satu kendaraan harus dipilih',
    };

    setErrors(newErrors);

    if (formData.list_id_kendaraan.length === 0) {
      setErrors((prev) => ({
        ...prev,
        kendaraan: 'Minimal satu kendaraan harus dipilih',
      }));
      return;
    }

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Harap isi semua kolom.');
      setNotifType('error');
      return;
    }

    // onSubmit?.({
    //   ...formData,
    //   kendaraan: selectedKendaraan,
    // });

    try {
      // console.log(JSON.stringify(formData));
      await fetchApiMasterDataProdukMemberCreate(formData);

      queryClient.invalidateQueries(['masterDataProdukVoucher']); // Refresh tabel setelah tambah data

      setNotifMessage('Produk Member berhasil disimpan!');
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Tambah Produk Member">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
          onClose={handleCloseModal}
        >
          <EvoInText
            name="nama"
            label="Nama Produk Member"
            placeholder="Masukkan nama produk"
            value={formData.nama}
            onChange={handleChange}
            error={errors.nama}
          />
          <div className="flex flex-col relative">
            {/* <label className="w-full text-card mb-1">Periode</label> */}

            <div className="flex gap-3 relative">
              <EvoInDatePicker
                name="periode_mulai"
                label="Periode Awal"
                placeholder="Pilih tanggal awal"
                value={formData.periode_mulai}
                isWidthFull={true}
                onChange={(value) => handleDateChange('periode_mulai', value)}
                error={errors.periode_mulai}
              />
              <EvoInDatePicker
                name="periode_akhir"
                label="Periode Akhir"
                placeholder="Pilih tanggal akhir"
                value={formData.periode_akhir}
                isWidthFull={true}
                onChange={(value) => handleDateChange('periode_akhir', value)}
                error={errors.periode_akhir}
              />
            </div>
          </div>
          <div className="flex gap-3 relative">
            <EvoInText
              name="max_kendaraan"
              label="Maksimal Kendaraan"
              placeholder="Masukkan jumlah maksimal kendaraan"
              value={formData.max_kendaraan}
              onChange={handleChange}
              error={errors.max_kendaraan}
              className=" w-full basis-1/2"
            />
            <EvoInText
              name="tarif"
              label="Tarif"
              placeholder="Masukkan tarif"
              value={formData.tarif}
              onChange={handleChange}
              error={errors.tarif}
              className=" w-full basis-1/2"
            />
          </div>
          <div className="flex gap-3 relative">
            <EvoInText
              name="biaya_kartu"
              label="Biaya Kartu"
              placeholder="Masukkan biaya kartu"
              value={formData.biaya_kartu}
              onChange={handleChange}
              error={errors.biaya_kartu}
            />
            <EvoInText
              name="biaya_ganti_nopol"
              label="Biaya Ganti Nomor Polisi"
              placeholder="Masukkan biaya ganti nopol"
              value={formData.biaya_ganti_nopol}
              onChange={handleChange}
              error={errors.biaya_ganti_nopol}
            />
          </div>

          <EvoInCheckbox
            label="Kendaraan"
            answers={
              kendaraanData?.data.map((item) => ({
                label: `${item?.nama_kendaraan} (${item?.tipe_kendaraan?.tipe_kendaraan||' - '})`,
                value: item.id.toString(), // Convert ke string untuk value di HTML
                // checked: formData.list_id_kendaraan.includes(item.id),
                checked: formData.list_id_kendaraan.includes(
                  item.id.toString()
                ), // Sesuaikan tipe data
              })) || []
            }
            onChange={handleCheckboxChange}
            error={errors.kendaraan}
          />

          {/* <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <strong>ID Kendaraan Terpilih:</strong>{' '}
            {formData.list_id_kendaraan.length > 0
              ? formData.list_id_kendaraan.join(', ')
              : 'Belum ada kendaraan dipilih.'}
          </div> */}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddProdukMemberForm;
