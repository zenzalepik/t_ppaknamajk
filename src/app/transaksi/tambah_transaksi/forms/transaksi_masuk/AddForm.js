'use client';

import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import EvoInTimePicker from '@/components/evosist_elements/EvoInTimePicker';
import { RiFileAddLine } from '@remixicon/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import numbers from '@/utils/numbers';
import { fetchApiMasterDataPOS } from '@/app/bantuan/tiket/api/fetchApiMasterDataPOS';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiPengaturanParameterTipeKendaraan';
import { fetchApiTransaksiCreate } from '../../api/fetchApiTransaksiCreate';
import dayjs from 'dayjs';

const AddTransaksiMasukForm = ({ isOpen, onClose, onSubmit }) => {
  const [currentPagePos, setCurrentPagePos] = useState(1);
  const [currentPageTipeKendaraan, setCurrentPageTipeKendaraan] = useState(1);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    // A.
    waktu_masuk_tanggal: '',
    waktu_masuk_jam: '',
    pintu_masuk_id: '',

    // B.
    tipe_kendaraan_id: '',
    nomor_polisi: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      // A.
      waktu_masuk_tanggal:
        selectedDate === '' ? 'Tanggal masuk wajib dipilih' : '',
      waktu_masuk_jam: selectedTime === '' ? 'Waktu masuk wajib dipilih' : '',
      pintu_masuk_id:
        formData.pintu_masuk_id === '' ? 'Pintu masuk wajib diisi' : '',

      // B.
      tipe_kendaraan_id:
        formData.tipe_kendaraan_id === '' ? 'Tipe kendaraan wajib dipilih' : '',
      nomor_polisi:
        formData.nomor_polisi.trim() === '' ? 'Nomor polisi wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    try {
      const form = {
        tanggal_masuk: dayjs(
          `${formData.waktu_masuk_tanggal} ${formData.waktu_masuk_jam}`
        ).format('YYYY-MM-DDTHH:mm:ss'),
        pintu_masuk_id: formData.pintu_masuk_id,
        kendaraan_id: formData.tipe_kendaraan_id,
        nomor_polisi: formData.nomor_polisi,
      };

      await fetchApiTransaksiCreate(form);
      queryClient.invalidateQueries(['transaksi']); // Refresh tabel setelah tambah data
      setNotifMessage('Data Transaksi Masuk berhasil disimpan!');
      setNotifType('success');
      setTimeout(() => onClose(), 500);
    } catch (error) {
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  const {
    data: masterDataPos,
    errorPerusahaan,
    isLoadingPerusahaan,
  } = useQuery({
    queryKey: ['masterDataPos', currentPagePos],
    queryFn: () =>
      fetchApiMasterDataPOS({
        limit: numbers.apiNumLimitExpanded,
        page: currentPagePos,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiPos = masterDataPos?.data || [];

  const {
    data: masterDataTipeKendaraan,
    errorMasterDataTipeKendaraan,
    isLoadingMasterDataTipeKendaraan,
  } = useQuery({
    queryKey: ['masterDataTipeKendaraan', currentPageTipeKendaraan],
    queryFn: () =>
      fetchApiPengaturanParameterTipeKendaraan({
        limit: numbers.apiNumLimitExpanded,
        page: currentPageTipeKendaraan,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiTipeKendaraan = masterDataTipeKendaraan?.data || [];

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
        onClose={onClose}
        title="Tambah Transaksi Masuk"
        titleTextColor="!text-white"
        titleBgColor="!bg-primary"
        titleIcon={<RiFileAddLine size={72} />}
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          {/* A */}
          <div className="flex flex-col gap-6 border border-border rounded-[20px] p-6 ">
            <div className=" text-title_small mb-0">
              <span className="text-primary">A.</span> Data Gerbang Masuk
            </div>

            <div className="flex gap-3">
              <div className="w-full">
                <EvoInDatePicker
                  name="waktu_masuk_tanggal"
                  label="Waktu Masuk"
                  value={selectedDate}
                  placeholder="Pilih tanggal masuk"
                  onChange={(date) => {
                    setSelectedDate(date);
                    setFormData((prev) => ({
                      ...prev,
                      waktu_masuk_tanggal: date,
                    }));
                  }}
                  error={errors.waktu_masuk_tanggal}
                />
              </div>

              <div className="w-full">
                <EvoInTimePicker
                  label=". "
                  name="waktu_masuk_jam"
                  placeholder="Pilih jam masuk"
                  value={selectedTime}
                  onChange={(time) => {
                    setSelectedTime(time);
                    setFormData((prev) => ({
                      ...prev,
                      waktu_masuk_jam: time,
                    }));
                  }}
                  error={errors.waktu_masuk_jam}
                />
              </div>
            </div>

            <EvoInDropdown
              name="pintu_masuk_id"
              label="Pintu Masuk"
              options={dataApiPos.map((item) => ({
                label: item.keterangan,
                value: item.id,
              }))}
              // value={selectedOptions.pintuPos}
              value={formData.pintu_masuk_id}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, pintu_masuk_id: value }))
              }
              error={errors.pintu_masuk_id}
              placeholder="Pilih pintu pos"
            />
          </div>

          {/* B */}
          <div className="flex flex-col gap-6 border border-border rounded-[20px] p-6 ">
            <div className=" text-title_small mb-0">
              <span className="text-primary">B.</span> Data Kendaraan
            </div>

            <div className="flex gap-3">
              <div className="w-full">
                <EvoInDropdown
                  name="tipe_kendaraan_id"
                  label="Tipe Kendaraan"
                  options={dataApiTipeKendaraan.map((item) => ({
                    label: item.tipe_kendaraan,
                    value: item.id,
                  }))}
                  // value={selectedOptions.tipe_kendaraan_id}
                  value={formData.tipe_kendaraan_id}
                  // onChange={handleDropdownChange}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      tipe_kendaraan_id: value,
                    }))
                  }
                  error={errors.tipe_kendaraan_id}
                  placeholder="Pilih Kendaraan"
                />
              </div>

              <EvoInText
                name="nomor_polisi"
                label="Nomor Polisi"
                placeholder="Masukkan nomor polisi"
                value={formData.nomor_polisi}
                onChange={handleChange}
                error={errors.nomor_polisi}
              />
            </div>
          </div>

          {/* C */}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddTransaksiMasukForm;
