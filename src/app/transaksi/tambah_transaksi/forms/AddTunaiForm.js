'use client';

import React, { use, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoInTextarea from '@/components/evosist_elements/EvoInTextarea';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import EvoInTimePicker from '@/components/evosist_elements/EvoInTimePicker';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import { RiTimerLine, RiAuctionLine, RiCashLine } from '@remixicon/react';

const AddTunaiForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // A.
    waktuMasukTanggal: '',
    waktuMasukJam: '',
    pintuMasuk: '',
    nomorTiket: '',

    // B.
    tipeKendaraan: '',
    nomorPolisi: '',

    // C.
    waktuKeluarTanggal: '',
    waktuKeluarJam: '',
    pintuKeluar: '',
    petugas: '',
    shift: '',

    //D.
    terkenaDenda: false,
    tipeDenda: '',
    jenisPembayaran: '',

    //E.
    // keterangan: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [selectedOptions, setSelectedOptions] = useState({
    pintuMasuk: '',
    tipeKendaraan: '',
  });

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [selectedIsDenda, setSelectedIsDenda] = useState({
    iya: false,
  });

  const handleCheckboxChange = (e, answer) => {
    const { checked } = e.target;

    // Update the state with the changed checkbox value
    setSelectedOptions((prev) => ({
      ...prev,
      [answer.value]: checked, // Update the value of the checkbox (checked or unchecked)
    }));

    setErrors((prev) => ({
      ...prev,
      [answer.name]: '', // Remove the error related to the checkbox
    }));
  };

  const handleCheckboxIsDenda = (e, answer) => {
    const { checked } = e.target;

    // Update the state for camera selection
    setSelectedIsDenda((prev) => ({
      ...prev,
      [answer.value]: checked, // Update camera1 or camera2 selection
    }));

    setErrors((prev) => ({
      ...prev,
      terkenaDenda: false, // Remove camera selection error
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
      // A.
      waktuMasukTanggal:
        selectedDate === '' ? 'Tanggal masuk wajib dipilih' : '',
      waktuMasukJam: selectedTime === '' ? 'Waktu masuk wajib dipilih' : '',
      pintuMasuk: formData.pintuMasuk === '' ? 'Pintu masuk wajib diisi' : '',
      nomorTiket:
        formData.nomorTiket.trim() === '' ? 'Nomor tiket wajib diisi' : '',

      // B.
      tipeKendaraan:
        formData.tipeKendaraan === '' ? 'Tipe kendaraan wajib dipilih' : '',
      nomorPolisi:
        formData.nomorPolisi.trim() === '' ? 'Nomor polisi wajib diisi' : '',

      // C.
      waktuKeluarTanggal:
        selectedDate === '' ? 'Tanggal keluar wajib dipilih' : '',
      waktuKeluarJam: selectedTime === '' ? 'Waktu keluar wajib dipilih' : '',
      pintuKeluar:
        formData.pintuKeluar === '' ? 'Pintu keluar wajib diisi' : '',
      petugas: formData.petugas === '' ? 'Petugas wajib dipilih' : '',
      shift: formData.shift === '' ? 'Shift wajib dipilih' : '',

      //D.
      // terkenaDenda:
      // tipeDenda:'',
      jenisPembayaran:
        formData.jenisPembayaran === '' ? 'Jenis pembayaran wajib dipilih' : '',

      // E.
      // keterangan:
      //   formData.keterangan.trim() === '' ? 'Keterangan wajib diisi' : '',
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

      <EvoModal
        isOpen={isOpen}
        onClose={onClose}
        title="Tambah Transaksi Tunai"
        titleTextColor="!text-white"
        titleBgColor="!bg-black"
        titleIcon={<RiCashLine size={72}/>}
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
                  name="waktuMasukTanggal"
                  label="Waktu Masuk"
                  value={selectedDate}
                  placeholder="Pilih tanggal masuk"
                  onChange={(date) => setSelectedDate(date)}
                  error={errors.waktuMasukTanggal}
                />
              </div>

              <div className="w-full">
                <EvoInTimePicker
                  label=". "
                  name="waktuMasukJam"
                  placeholder="Pilih jam masuk"
                  value={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  error={errors.waktuMasukJam}
                />
              </div>
            </div>

            <EvoInDropdown
              name="pintuMasuk"
              label="Pintu Masuk"
              options={[
                { label: 'Pintu pos A', value: 'A' },
                { label: 'Pintu pos B', value: 'B' },
              ]}
              // value={selectedOptions.pintuPos}
              value={formData.pintuMasuk}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, pintuMasuk: value }))
              }
              error={errors.pintuMasuk}
              placeholder="Pilih pintu pos"
            />

            <EvoInText
              name="nomorTiket"
              label="Nomor Tiket"
              placeholder="Masukkan nomor tiket"
              value={formData.nomorTiket}
              onChange={handleChange}
              error={errors.nomorTiket}
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
                  name="tipeKendaraan"
                  label="Tipe Kendaraan"
                  options={[
                    { label: 'Kendaraan A', value: 'A' },
                    { label: 'Kendaraan B', value: 'B' },
                  ]}
                  // value={selectedOptions.tipeKendaraan}
                  value={formData.tipeKendaraan}
                  // onChange={handleDropdownChange}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, tipeKendaraan: value }))
                  }
                  error={errors.tipeKendaraan}
                  placeholder="Pilih Kendaraan"
                />
              </div>

              <EvoInText
                name="nomorPolisi"
                label="Nomor Polisi"
                placeholder="Masukkan nomor polisi"
                value={formData.nomorPolisi}
                onChange={handleChange}
                error={errors.nomorPolisi}
              />
            </div>
          </div>

          {/* C */}
          <div className="flex flex-col gap-6 border border-border rounded-[20px] p-6 ">
            <div className=" text-title_small mb-0">
              <span className="text-primary">C.</span> Data Gerbang Keluar
            </div>

            <div className="flex gap-3">
              <div className="w-full">
                <EvoInDatePicker
                  name="waktuKeluarTanggal"
                  label="Waktu Keluar"
                  value={selectedDate}
                  placeholder="Pilih tanggal keluar"
                  onChange={(date) => setSelectedDate(date)}
                  error={errors.waktuKeluarTanggal}
                />
              </div>

              <div className="w-full">
                <EvoInTimePicker
                  label=". "
                  name="waktuKeluarJam"
                  placeholder="Pilih jam keluar"
                  value={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  error={errors.waktuKeluarJam}
                />
              </div>
            </div>
            <EvoInDropdown
              name="pintuKeluar"
              label="Pintu Keluar"
              options={[
                { label: 'Pintu A', value: 'A' },
                { label: 'Pintu B', value: 'B' },
              ]}
              value={formData.pintuKeluar}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, pintuKeluar: value }))
              }
              error={errors.pintuKeluar}
              placeholder="Pilih pintu keluar"
            />

            <EvoInDropdown
              name="petugas"
              label="Petugas"
              options={[
                { label: 'Petugas A', value: 'A' },
                { label: 'Petugas B', value: 'B' },
              ]}
              value={formData.petugas}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, petugas: value }))
              }
              error={errors.petugas}
              placeholder="Pilih petugas"
            />
            <EvoInDropdown
              name="shift"
              label="Shift"
              options={[
                { label: 'Shift A', value: 'A' },
                { label: 'Shift B', value: 'B' },
              ]}
              value={formData.shift}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, shift: value }))
              }
              error={errors.shift}
              placeholder="Pilih shift"
            />
          </div>

          {/* D */}
          <div className="flex flex-col gap-6 border border-border rounded-[20px] p-6 ">
            <div className=" text-title_small mb-0">
              <span className="text-primary">D.</span> Pembayaran
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
                name="tipeDenda"
                label="Tipe Denda"
                options={[
                  { label: 'Tipe denda A', value: 'A' },
                  { label: 'Tipe denda B', value: 'B' },
                ]}
                // value={selectedOptions.tipeDenda}
                value={formData.tipeDenda}
                // onChange={handleDropdownChange}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, tipeDenda: value }))
                }
                // error={errors.tipeDenda}
                placeholder="Pilih Tipe Denda"
              />
            )}

            <EvoInDropdown
              name="jenisPembayaran"
              label="Jenis Pembayaran"
              options={[
                { label: 'Jenis Pembayaran A', value: 'A' },
                { label: 'Jenis Pembayaran B', value: 'B' },
              ]}
              // value={selectedOptions.jenisPembayaran}
              value={formData.jenisPembayaran}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, jenisPembayaran: value }))
              }
              error={errors.jenisPembayaran}
              placeholder="Pilih jenis pembayaran"
            />
          </div>

          <div className="flex flex-col">
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
            {/* <div className="border-t-4 border-dashed border-black w-full my-6"></div> */}
          </div>

          {/* E */}
          {/* <div className="flex flex-col gap-6 border border-border rounded-[20px] p-6 ">
            <div className=" text-title_small mb-0">
              <span className="text-primary">E.</span> Keterangan/penjelasan
            </div>
            <EvoInTextarea
              name="keterangan"
              label="Keterangan"
              placeholder="Ketik keterangan..."
              value={formData.keterangan}
              onChange={handleChange}
              error={errors.keterangan}
            />
          </div> */}
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default AddTunaiForm;
