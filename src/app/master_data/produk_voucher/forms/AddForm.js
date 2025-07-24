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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataProdukVoucherCreate } from '../api/fetchApiMasterDataProdukVoucherCreate';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';

const AddProdukVoucherForm = ({ isOpen, onClose, onSubmit }) => {
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
    periode: [],
    list_id_kendaraan: [],
    model_pembayaran: '',
    metode_verifikasi: '',
    tarif: '',
    status: false,
    user_id: null,
  });

  // ✅ Fungsi untuk mereset pilihan saat modal ditutup
  const handleCloseModal = () => {
    setFormData({
      nama: '',
      periode_mulai: '',
      periode_akhir: '',
      periode: [],
      list_id_kendaraan: [],
      model_pembayaran: '',
      metode_verifikasi: '',
      tarif: '',
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

  
    // Ambil user_id secara async
    useEffect(() => {
      const fetchUserId = async () => {
        const id = await getUserId();
        setFormData((prev) => ({ ...prev, user_id: id }));
      };
      fetchUserId();
    }, []);

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     periode_mulai: startDate,
  //     periode_akhir: endDate,
  //   }));
  // }, [startDate, endDate]);
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      periode: [String(prev.periode_mulai), String(prev.periode_akhir)],
    }));
  }, [formData.periode_mulai, formData.periode_akhir]);

  // const [selectedKendaraan, setSelectedKendaraan] = useState({
  //   mobil: false,
  //   motor: false,
  //   truk: false,
  //   taxi: false,
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

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

    // const kendaraanTerpilih = Object.values(selectedKendaraan).some(
    //   (val) => val === true
    // );

    const newErrors = {
      nama:
        formData.nama === '' ? 'Nama Produk Voucher wajib diisi' : '',
      periode_mulai:
        formData.periode_mulai === '' ? 'Tanggal Mulai wajib diisi' : '',
      periode_akhir:
        formData.periode_akhir === '' ? 'Tanggal Akhir wajib diisi' : '',
      model_pembayaran:
        formData.model_pembayaran === '' ? 'Model Bayar wajib diisi' : '',
      metode_verifikasi:
        formData.metode_verifikasi === ''
          ? 'Metode Verifikasi wajib diisi'
          : '',
      tarif: formData.tarif === '' ? 'Tarif wajib diisi' : '',
      // kendaraan: kendaraanTerpilih
      //   ? ''
      //   : 'Minimal satu kendaraan harus dipilih',
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
      console.log(formData);
      // const payload = {
      //   ...formData,
      //   kendaraan: selectedKendaraan,
      // };

      // console.log('Payload dikirim:', payload);

      await fetchApiMasterDataProdukVoucherCreate(formData);
      // await fetchApiMasterDataProdukVoucherCreate(payload);

      queryClient.invalidateQueries(['masterDataProdukVoucher']); // Refresh tabel setelah tambah data

      setNotifMessage('Produk Voucher berhasil disimpan!');
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

      <EvoModal isOpen={isOpen} onClose={handleCloseModal} title="Tambah Produk Voucher">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={handleCloseModal}
        >
          <EvoInText
            name="nama"
            label="Nama Produk Voucher"
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
            <div className="w-full">
              <EvoInDropdown
                name="model_pembayaran"
                label="Model Bayar"
                options={[
                  { label: 'Check In', value: 'Check In' },
                  { label: 'Check Out', value: 'Check Out' },
                ]}
                value={formData.model_pembayaran}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, model_pembayaran: value }))
                }
                error={errors.model_pembayaran}
                placeholder="Pilih model bayar"
              />
            </div>

            <div className="w-full">
              <EvoInDropdown
                name="metode_verifikasi"
                label="Tipe metode verifikasi"
                options={[
                  { label: 'Tiket', value: 'Tiket' },
                  { label: 'Nopol', value: 'Nopol' },
                ]}
                value={formData.metode_verifikasi}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, metode_verifikasi: value }))
                }
                error={errors.metode_verifikasi}
                placeholder="Pilih metode verifikasi"
              />
            </div>
          </div>
          <div className="flex gap-3 relative">
            <EvoInText
              name="tarif"
              label="Tarif"
              placeholder="Masukkan tarif"
              value={formData.tarif}
              onChange={handleChange}
              error={errors.tarif}
            />
          </div>
          <EvoInCheckbox
            label="Kendaraan"
            answers={
              kendaraanData?.data.map((item) => ({
                label: `${item?.nama_kendaraan} (${
                  item?.tipe_kendaraan?.tipe_kendaraan || ' - '
                })`,
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
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddProdukVoucherForm;
