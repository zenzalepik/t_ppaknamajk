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

const AddProdukVoucherForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    namaProdukVoucher: '',
    periodeMulai: '',
    periodeAkhir: '',
    modelBayar:'',
    metodeVerifikasi:'',
    tarif: '',
  });

  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      periodeMulai: startDate,
      periodeAkhir: endDate,
    }));
  }, [startDate, endDate]);

  const [selectedKendaraan, setSelectedKendaraan] = useState({
    mobil: false,
    motor: false,
    truk: false,
    taxi: false,
  });

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (e, answer) => {
    const { checked } = e.target;
    setSelectedKendaraan((prev) => ({
      ...prev,
      [answer.value]: checked,
    }));
    setErrors((prev) => ({ ...prev, kendaraan: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const kendaraanTerpilih = Object.values(selectedKendaraan).some(
      (val) => val === true
    );

    const newErrors = {
      namaProdukVoucher:
        formData.namaProdukVoucher.trim() === ''
          ? 'Nama Produk Voucher wajib diisi'
          : '',
      periodeMulai:
        formData.periodeMulai === '' ? 'Tanggal Mulai wajib diisi' : '',
      periodeAkhir:
        formData.periodeAkhir === '' ? 'Tanggal Akhir wajib diisi' : '',
      modelBayar:
        formData.modelBayar === '' ? 'Model Bayar wajib diisi' : '',
      metodeVerifikasi:
        formData.metodeVerifikasi === '' ? 'Metode Verifikasi wajib diisi' : '',
      tarif: formData.tarif.trim() === '' ? 'Tarif wajib diisi' : '',
      kendaraan: kendaraanTerpilih
        ? ''
        : 'Minimal satu kendaraan harus dipilih',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Harap isi semua kolom.');
      setNotifType('error');
      return;
    }

    onSubmit?.({
      ...formData,
      kendaraan: selectedKendaraan,
    });

    setNotifMessage('Produk Voucher berhasil disimpan!');
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
          autoClose={true}
        />
      )}

      <EvoModal isOpen={isOpen} onClose={onClose} title="Tambah Produk Voucher">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <EvoInText
            name="namaProdukVoucher"
            label="Nama Produk Voucher"
            placeholder="Masukkan nama produk"
            value={formData.namaProdukVoucher}
            onChange={handleChange}
            error={errors.namaProdukVoucher}
          />
          <div className="flex flex-col relative">
            {/* <label className="w-full text-card mb-1">Periode</label> */}

            <div className="flex gap-3 relative">
              <EvoInDatePicker
                name="periodeMulai"
                label="Periode Awal"
                placeholder="Pilih tanggal awal"
                value={formData.periodeMulai}
                isWidthFull={true}
                onChange={(value) => handleDateChange('periodeMulai', value)}
                error={errors.periodeMulai}
              />
              <EvoInDatePicker
                name="periodeAkhir"
                label="Periode Akhir"
                placeholder="Pilih tanggal akhir"
                value={formData.periodeAkhir}
                isWidthFull={true}
                onChange={(value) => handleDateChange('periodeAkhir', value)}
                error={errors.periodeAkhir}
              />
            </div>
          </div>

          <div className="flex gap-3 relative">
            <div className="w-full">
              <EvoInDropdown
                name="modelBayar"
                label="Model Bayar"
                options={[
                  { label: 'Model Bayar A', value: 'A' },
                  { label: 'Model Bayar B', value: 'B' },
                ]}
                value={formData.modelBayar}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, modelBayar: value }))
                }
                error={errors.modelBayar}
                placeholder="Pilih model bayar"
              />
            </div>

            <div className="w-full">
              <EvoInDropdown
                name="metodeVerifikasi"
                label="Tipe metode verifikasi"
                options={[
                  { label: 'Kendaraan A', value: 'A' },
                  { label: 'Kendaraan B', value: 'B' },
                ]}
                value={formData.metodeVerifikasi}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, metodeVerifikasi: value }))
                }
                error={errors.metodeVerifikasi}
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
            answers={[
              {
                label: 'Mobil',
                value: 'mobil',
                checked: selectedKendaraan.mobil,
              },
              {
                label: 'Motor',
                value: 'motor',
                checked: selectedKendaraan.motor,
              },
              {
                label: 'Truk/Box',
                value: 'truk',
                checked: selectedKendaraan.truk,
              },
              { label: 'Taxi', value: 'taxi', checked: selectedKendaraan.taxi },
            ]}
            onChange={handleCheckboxChange}
            error={errors.kendaraan}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddProdukVoucherForm;
