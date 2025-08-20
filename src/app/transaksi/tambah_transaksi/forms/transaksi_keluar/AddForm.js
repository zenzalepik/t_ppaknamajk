'use client';

import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import EvoInTimePicker from '@/components/evosist_elements/EvoInTimePicker';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import {
  RiTimerLine,
  RiAuctionLine,
  RiCashLine,
  RiFileAddLine,
} from '@remixicon/react';
import { fetchApiMasterDataShift } from '../../../../../../dist/win-unpacked/resources/app/src/app/master_data/shift/api/fetchApiMasterDataShift';
import { fetchApiMasterDataPOS } from '@/app/bantuan/tiket/api/fetchApiMasterDataPOS';
import { fetchApiMasterDataUser } from '@/app/master_data/tenant/api/fetchApiMasterDataUser';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import numbers from '@/utils/numbers';
import { fetchApiPengaturanPembayaran } from '@/app/pengaturan/pembayaran/api/fetchApiPengaturanPembayaran';
import { fetchApiPengaturanParameterTipeDenda } from '@/app/pengaturan/parameter/api/fetchApiPengaturanParameterTipeDenda';
import { fetchApiTransaksi } from '../../api/fetchApiTransaksi';
import { fetchApiTransaksiUpdate } from '../../api/fetchApiTransaksiUpdate';
import dayjs from 'dayjs';

const AddTransaksiKeluarForm = ({ isOpen, onClose, onSubmit }) => {
  const [currentPagePos, setCurrentPagePos] = useState(1);
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentPageShift, setCurrentPageShift] = useState(1);
  const [currentPagePengaturanPembayaran, setCurrentPagePengaturanPembayaran] =
    useState(1);
  const [currentPageParameterTipeDenda, setCurrentPageParameterTipeDenda] =
    useState(1);
  const [currentPageDataTransaksi, setCurrentPageDataTransaksi] = useState(1);

  const [formData, setFormData] = useState({
    // A.
    nomor_polisi: '',
    waktu_keluar_tanggal: '',
    waktu_keluar_jam: '',
    pintu_keluar_id: '',
    petugas_id: '',
    shift_id: '',

    //D.
    tipe_denda_id: '',
    jenis_pembayaran_id: '',

    //E.
    keterangan: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [selectedIsDenda, setSelectedIsDenda] = useState({
    iya: false,
  });

  const handleCheckboxIsDenda = (e, answer) => {
    const { checked } = e.target;

    // Update the state for camera selection
    setSelectedIsDenda((prev) => ({
      ...prev,
      [answer.value]: checked, // Update camera1 or camera2 selection
    }));

    setErrors((prev) => ({
      ...prev,
      denda: false, // Remove camera selection error
    }));
  };

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

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      // A.
      nomor_polisi:
        formData.nomor_polisi.trim() === '' ? 'Nomor polisi wajib diisi' : '',
      waktu_keluar_tanggal:
        selectedDate === '' ? 'Tanggal keluar wajib dipilih' : '',
      waktu_keluar_jam: selectedTime === '' ? 'Waktu keluar wajib dipilih' : '',
      pintu_keluar_id:
        formData.pintu_keluar_id === '' ? 'Pintu keluar wajib diisi' : '',
      petugas_id: formData.petugas_id === '' ? 'Petugas wajib dipilih' : '',
      shift_id: formData.shift_id === '' ? 'Shift wajib dipilih' : '',

      // B.
      jenis_pembayaran_id:
        formData.jenis_pembayaran_id === ''
          ? 'Jenis pembayaran wajib dipilih'
          : '',
      jenis_perhitungan_pembayaran:
        formData.jenis_perhitungan_pembayaran === ''
          ? 'Jenis perhitungan pembayaran wajib dipilih'
          : '',

      // C.
      keterangan:
        formData.keterangan.trim() === '' ? 'Keterangan wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    console.log(formData.waktu_keluar_tanggal);
    console.log(100);

    try {
      const form = {
        tanggal_keluar: dayjs(
          `${formData.waktu_keluar_tanggal} ${formData.waktu_keluar_jam}`
        ).format('YYYY-MM-DDTHH:mm:ss'),
        nomor_polisi: formData.nomor_polisi,
        pintu_keluar_id: formData.pintu_keluar_id,
        petugas_id: formData.petugas_id,
        shift_id: formData.shift_id,
        tipe_denda_id:
          formData.tipe_denda_id === '' ? null : formData.tipe_denda_id,
        jenis_pembayaran_id: formData.jenis_pembayaran_id,
        jenis_perhitungan_pembayaran: formData.jenis_perhitungan_pembayaran,
        keterangan: formData.keterangan,
      };

      await fetchApiTransaksiUpdate(form);
      queryClient.invalidateQueries(['transaksi']); // Refresh tabel setelah tambah data
      setNotifMessage('Data Transaksi Keluar berhasil disimpan!');
      setNotifType('success');
      setTimeout(() => onClose(), 500);
    } catch (error) {
      console.log(error);
      setNotifMessage(error.message);
      setNotifType('error');
    }
  };

  const {
    data: masterDataPos,
    errorMasterDataPos,
    isLoadingMasterDataPos,
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
    data: masterDataUser,
    errorMasterDataUser,
    isLoadingMasterDataUser,
  } = useQuery({
    queryKey: ['masterDataUser', currentPageUser],
    queryFn: () =>
      fetchApiMasterDataUser({
        limit: numbers.apiNumLimitExpanded,
        page: currentPageUser,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiUser = masterDataUser?.data || [];

  const {
    data: masterDataShift,
    errorMasterDataShift,
    isLoadingMasterDataShift,
  } = useQuery({
    queryKey: ['masterDataShift', currentPageShift],
    queryFn: () =>
      fetchApiMasterDataShift({
        limit: numbers.apiNumLimitExpanded,
        page: currentPageShift,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiShift = masterDataShift?.data || [];

  const {
    data: pengaturanPembayaran,
    errorPengaturanPembayaran,
    isLoadingPengaturanPembayaran,
  } = useQuery({
    queryKey: ['pengaturanPembayaran', currentPagePengaturanPembayaran],
    queryFn: () =>
      fetchApiPengaturanPembayaran({
        limit: numbers.apiNumLimitExpanded,
        page: currentPagePengaturanPembayaran,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiPengaturanPembayaran = pengaturanPembayaran?.data || [];

  const {
    data: parameterTipeDenda,
    errorParameterTipeDenda,
    isLoadingParameterTipeDenda,
  } = useQuery({
    queryKey: ['parameterTipeDenda', currentPageParameterTipeDenda],
    queryFn: () =>
      fetchApiPengaturanParameterTipeDenda({
        limit: numbers.apiNumLimitExpanded,
        page: currentPageParameterTipeDenda,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiTipeDenda = parameterTipeDenda?.data || [];

  const {
    data: dataTransaksi,
    errorDataTransaksi,
    isLoadingDataTransaksi,
  } = useQuery({
    queryKey: ['dataTransaksi', currentPageDataTransaksi],
    queryFn: () =>
      fetchApiTransaksi({
        limit: numbers.apiNumLimitExpanded,
        page: currentPageDataTransaksi,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataApiTransaksi = dataTransaksi?.data || [];

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
        title="Tambah Transaksi Keluar"
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
              <span className="text-primary">A.</span> Data Gerbang Keluar
            </div>

            <EvoInDropdown
              name="nomor_polisi"
              label="Nomor Polisi"
              options={dataApiTransaksi.map((item) => ({
                label: item.nomor_polisi,
                value: item.nomor_polisi,
              }))}
              value={formData.nomor_polisi}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, nomor_polisi: value }))
              }
              error={errors.nomor_polisi}
              placeholder="Pilih nomor polisi"
            />

            <div className="flex gap-3">
              <div className="w-full">
                <EvoInDatePicker
                  name="waktu_keluar_tanggal"
                  label="Waktu Keluar"
                  value={selectedDate}
                  placeholder="Pilih tanggal keluar"
                  onChange={(date) => {
                    setSelectedDate(date);
                    setFormData((prev) => ({
                      ...prev,
                      waktu_keluar_tanggal: date,
                    }));
                  }}
                  error={errors.waktu_keluar_tanggal}
                />
              </div>

              <div className="w-full">
                <EvoInTimePicker
                  label=". "
                  name="waktu_keluar_jam"
                  placeholder="Pilih jam keluar"
                  value={selectedTime}
                  onChange={(time) => {
                    setSelectedTime(time);
                    setFormData((prev) => ({
                      ...prev,
                      waktu_keluar_jam: time,
                    }));
                  }}
                  error={errors.waktu_keluar_jam}
                />
              </div>
            </div>

            <EvoInDropdown
              name="pintu_keluar_id"
              label="Pintu Keluar"
              options={dataApiPos.map((item) => ({
                label: item.keterangan,
                value: item.id,
              }))}
              value={formData.pintu_keluar_id}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, pintu_keluar_id: value }))
              }
              error={errors.pintu_keluar_id}
              placeholder="Pilih pintu keluar"
            />

            <EvoInDropdown
              name="petugas_id"
              label="Petugas"
              options={dataApiUser.map((item) => ({
                label: item.nama,
                value: item.id,
              }))}
              value={formData.petugas_id}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, petugas_id: value }))
              }
              error={errors.petugas_id}
              placeholder="Pilih petugas"
            />
            <EvoInDropdown
              name="shift_id"
              label="Shift"
              options={dataApiShift.map((item) => ({
                label: item.nama_shift,
                value: item.id,
              }))}
              value={formData.shift_id}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, shift_id: value }))
              }
              error={errors.shift_id}
              placeholder="Pilih shift"
            />
          </div>

          {/* B */}
          <div className="flex flex-col gap-6 border border-border rounded-[20px] p-6 ">
            <div className=" text-title_small mb-0">
              <span className="text-primary">B.</span> Pembayaran
            </div>
            <EvoInCheckbox
              label="Terkena Denda?"
              answers={[
                { label: 'Iya', value: 'iya', checked: selectedIsDenda.iya },
              ]}
              onChange={handleCheckboxIsDenda}
              error={errors.cameras}
            />

            {selectedIsDenda.iya && (
              <EvoInDropdown
                name="tipe_denda_id"
                label="Tipe Denda"
                options={dataApiTipeDenda.map((item) => ({
                  label: item.tipe_denda,
                  value: item.id,
                }))}
                // value={selectedOptions.tipe_denda_id}
                value={formData.tipe_denda_id}
                // onChange={handleDropdownChange}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, tipe_denda_id: value }))
                }
                error={errors.tipe_denda_id}
                placeholder="Pilih Tipe Denda"
              />
            )}

            <EvoInDropdown
              name="jenis_pembayaran_id"
              label="Jenis Pembayaran"
              options={dataApiPengaturanPembayaran.map((item) => ({
                label: item.jenis_payment,
                value: item.id,
              }))}
              // value={selectedOptions.jenis_pembayaran_id}
              value={formData.jenis_pembayaran_id}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, jenis_pembayaran_id: value }))
              }
              error={errors.jenis_pembayaran_id}
              placeholder="Pilih jenis pembayaran"
            />

            <EvoInDropdown
              name="jenis_perhitungan_pembayaran"
              label="Jenis Perhitungan Pembayaran"
              options={[
                { label: 'Reguler', value: 'reguler' },
                { label: 'Flat', value: 'flat' },
              ]}
              // value={selectedOptions.jenis_perhitungan_pembayaran}
              value={formData.jenis_perhitungan_pembayaran}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  jenis_perhitungan_pembayaran: value,
                }))
              }
              error={errors.jenis_perhitungan_pembayaran}
              placeholder="Pilih jenis perhitungan pembayaran"
            />
          </div>

          {/* C */}
          <div className="flex flex-col gap-6 border border-border rounded-[20px] p-6 ">
            <div className=" text-title_small mb-0">
              <span className="text-primary">C.</span> Keterangan/penjelasan
            </div>
            <EvoInTextarea
              name="keterangan"
              label="Keterangan"
              placeholder="Ketik keterangan..."
              value={formData.keterangan}
              onChange={handleChange}
              error={errors.keterangan}
            />
          </div>

          {/* <div className="flex flex-col">
            <div className="border-t-4 border-dashed border-black w-full my-6"></div>
            <div className="text-title_large text-primary text-center">
              Ringkasan
            </div>
            <div className="flex gap-3 mb-3 mt-6">
              <div className="w-full border border-primary flex gap-1.5 p-3 rounded-[20px] items-center">
                <RiTimerLine className="opacity-[0.64]" size={48} />
                <div className="flex flex-col gap-1">
                  <div className="text-card text-black/[0.64]">
                    Durasi Parkir
                  </div>
                  <div className="text-title_small">00:00:00</div>
                </div>
              </div>
              <div className="w-full border border-primary flex gap-1.5 p-3 rounded-[20px] items-center">
                <RiAuctionLine className="opacity-[0.64]" size={48} />
                <div className="flex flex-col gap-1">
                  <div className="text-card text-black/[0.64]">Denda</div>
                  <div className="text-title_small">Rp. 0</div>
                </div>
              </div>
            </div>
            <div className="w-full bg-primaryTransparent flex gap-1.5 px-3 py-6 rounded-[20px] items-center">
              <RiCashLine className="text-primary" size={64} />
              <div className="flex flex-col">
                <div className="text-card text-black/[0.64]">
                  Total Pembayaran
                </div>
                <div className="text-title_large">Rp. 0</div>
              </div>
            </div>
            <div className="border-t-4 border-dashed border-black w-full my-6"></div>
          </div> */}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddTransaksiKeluarForm;
