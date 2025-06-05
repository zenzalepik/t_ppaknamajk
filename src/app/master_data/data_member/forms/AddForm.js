import React, { useEffect, useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInText from '@/components/evosist_elements/EvoInText';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoInDropdown from '@/components/evosist_elements/EvoInDropdown';
import EvoInCheckbox from '@/components/evosist_elements/EvoInCheckbox';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import {
  RiAddLine,
  RiDeleteBin2Line,
  RiCalendarEventLine,
  RiFileEditLine,
} from '@remixicon/react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import colors from '@/utils/colors';
import KendaraanForm from './KendaraanForm';
// import dataKendaraan from '../data/dataKendaraan';

const AddDataMemberForm = ({ isOpen, onClose, onSubmit }) => {
  const [modalKendaraanOpen, setModalKendaraanOpen] = useState(false);
  const [editKendaraan, setEditKendaraan] = useState(null);
  const [dataKendaraan, setDataKendaraan] = useState([]); // daftar kendaraan milik member

  // opsional: dropdown jenis kendaraan
  const jenisKendaraanDropdown = [
    { label: 'Motor', value: 'Motor' },
    { label: 'Mobil', value: 'Mobil' },
    { label: 'Truck', value: 'Truck' },
    { label: 'Bus', value: 'Bus' },

  ];

  const handleDeleteKendaraan = (nomorPolisi) => {
  setDataKendaraan((prev) =>
    prev.filter((item) => item.nomorPolisi !== nomorPolisi)
  );
};

  const [formData, setFormData] = useState({
    namaMember: '',
    nomorHandphone: '',
  });

  const [errors, setErrors] = useState({});
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [selectedIsMenggunakanTiket, setSelectedIsMenggunakanTiket] = useState({
    iya: false,
  });

  const [selectedIsMenggunakanKartu, setSelectedIsMenggunakanKartu] = useState({
    iya: false,
  });

  const handleCheckboxChange = (e, answer) => {
    const { checked } = e.target;
    setSelectedKendaraan((prev) => ({
      ...prev,
      [answer.value]: checked,
    }));
    setErrors((prev) => ({ ...prev, kendaraan: '' }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.nomorPolisi === '') {
      setErrors({ nomorPolisi: 'Nomor Polisi wajib diisi' });
      return;
    }

    const newErrors = {
      namaMember:
        formData.namaMember === '' ? 'Nama Perusahaan wajib diisi' : '',
      nomorHandphone:
        formData.nomorHandphone.trim() === '' ? 'Kontak wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    onSubmit?.(formData);

    setNotifMessage('Data Perusahaan berhasil disimpan!');
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

      <EvoModal isOpen={isOpen} onClose={onClose} title="Tambah Member">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <div className="text-title_small">
            <span className="text-primary">A.</span> Data Member
          </div>
          <EvoInText
            name="namaMember"
            label="Nama Perusahaan"
            placeholder="Masukkan nama lengkap member"
            value={formData.namaMember}
            onChange={handleChange}
            error={errors.namaMember}
          />
          <EvoInText
            name="nomorHandphone"
            label="Nomor Handphone"
            placeholder="Masukkan nomor handphone"
            value={formData.nomorHandphone}
            onChange={handleChange}
            error={errors.nomorHandphone}
          />
          <EvoInDropdown
            name="perusahaan"
            label="Pintu nama perusahaan"
            options={[
              { label: 'Perusahaan A', value: 'A' },
              { label: 'Perusahaan B', value: 'B' },
            ]}
            // value={selectedOptions.pintuPos}
            value={formData.perusahaan}
            // onChange={handleDropdownChange}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, perusahaan: value }))
            }
            error={errors.perusahaan}
            placeholder="Pilih pintu pos"
          />

          <div className="text-title_small mt-4">
            <span className="text-primary">B.</span> Akses Gerbang
          </div>
          <EvoInCheckbox
            label="Apakah Menggunakan Tiket?"
            answers={[
              {
                label: 'Iya',
                value: 'iya',
                checked: selectedIsMenggunakanTiket.iya,
              },
            ]}
            onChange={handleCheckboxChange}
            error={errors.kendaraan}
          />
          <EvoInCheckbox
            label="Apakah Menggunakan Kartu?"
            answers={[
              {
                label: 'Iya',
                value: 'iya',
                checked: selectedIsMenggunakanTiket.iya,
              },
            ]}
            onChange={handleCheckboxChange}
            error={errors.kendaraan}
          />
          <EvoInText
            name="nomorRFID"
            label="Nomor Handphone"
            placeholder="Masukkan nomor kartu RFID"
            value={formData.nomorRFID}
            onChange={handleChange}
            error={errors.nomorRFID}
          />

          <div className="text-title_small mt-4">
            <span className="text-primary">C.</span> Transaksi
          </div>
          <div className="w-full">
            <EvoInDropdown
              name="produk"
              label="Produk"
              options={[
                { label: 'Produk ', value: 'A' },
                { label: 'Produk ', value: 'B' },
              ]}
              // value={selectedOptions.produk}
              value={formData.produk}
              // onChange={handleDropdownChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, produk: value }))
              }
              error={errors.produk}
              placeholder="Pilih produk"
            />
          </div>
          <div className="flex flex-col gap-2 border border-primary/40 p-6 rounded-[24px] w-full shadow-card">
            <div className="flex gap-6">
              <p className="w-[180px] text-black/[0.64]">Periode</p>
              <div className="text-black font-semibold">: 1 Tahun</div>
            </div>
            <div className="flex gap-6">
              <p className="w-[180px] text-black/[0.64]">Tarif Dasar Member</p>
              <div className="text-black font-semibold">: Rp 0</div>
            </div>
            <div className="flex gap-6">
              <p className="w-[180px] text-black/[0.64]">Biaya Member</p>
              <div className="text-black font-semibold">: Rp 0</div>
            </div>
            <div className="flex gap-6">
              <p className="w-[180px] text-black/[0.64]">Biaya Kartu RFID</p>
              <div className="text-black font-semibold">: Rp 0</div>
            </div>
            <hr className="my-3  border-primary" />
            <div className="flex flex-col gap-1">
              <p className="text-black/80 text-card">
                Total Biaya Member + Kartu:
              </p>
              <div className="text-black text-title_small">Rp 0</div>
            </div>
            <hr className="my-3  border-primary" />

            <div className="flex gap-3 relative">
              <EvoInDatePicker
                name="periodeMulai"
                label="Tanggal Mulai Aktif"
                placeholder="Pilih tanggal mulai aktif"
                value={formData.periodeMulai}
                isWidthFull={true}
                onChange={(value) => handleDateChange('periodeMulai', value)}
                error={errors.periodeMulai}
              />
              <div className="flex flex-col w-full">
                <span className="text-card mb-1">Tanggal Akhir Aktif</span>
                <div className="flex w-full gap-3 py-3 px-3.5 rounded-[16px] border border-dashed border-primary justify-center items-center">
                  <div className="w-full">1 Juni 2015</div>
                  <RiCalendarEventLine className="text-black/50" size={28} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-title_small mt-4">
            <span className="text-primary">D.</span> Data Kendaraan/Nomor Polisi
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-card w-full bg-primary text-white">
                  {['Nomor Polisi', 'Jenis Kendaraan', 'Aksi'].map((header) => (
                    <th key={header} className="py-2 px-4">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataKendaraan.map(({ nomorPolisi, jenisKendaraan }) => (
                  <tr key={nomorPolisi} className="border-b">
                    <td className="py-2 px-4">{nomorPolisi}</td>
                    <td className="py-2 px-4">{jenisKendaraan}</td>
                    <td className="py-2 px-4 flex space-x-2 justify-center">
                      <EvoButton
                        icon={<RiFileEditLine size={24} />}
                        onClick={() => {
                          setEditKendaraan({ nomorPolisi, jenisKendaraan }); // Kirim data untuk edit
                          setModalKendaraanOpen(true);
                        }}
                        className="mt-3"
                        type="button"
                      />
                      <EvoButton
                        icon={<RiDeleteBin2Line size={24} />}
                        outlined
                        fillColor={colors.danger}
                        onClick={() => handleDeleteKendaraan(nomorPolisi)}
                        className="mt-3"
                        type="button"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <EvoButton
              buttonText="Tambah Kendaraan"
              icon={<RiAddLine size={24} />}
              outlined={true}
              onClick={() => {
                setEditKendaraan(null);
                setModalKendaraanOpen(true);
              }}
              className="mt-3"
              type="button" // Pastikan type adalah "button"
            />
          </div>
        </EvoForm>
      </EvoModal>
      <KendaraanForm
        isOpen={modalKendaraanOpen}
        onClose={() => setModalKendaraanOpen(false)}
        editData={editKendaraan}
        onSubmit={(kendaraanBaru) => {
          if (editKendaraan) {
            // mode edit
            setDataKendaraan((prev) =>
              prev.map((item) =>
                item.nomorPolisi === editKendaraan.nomorPolisi
                  ? kendaraanBaru
                  : item
              )
            );
          } else {
            // mode tambah
            setDataKendaraan((prev) => [...prev, kendaraanBaru]);
          }
          setModalKendaraanOpen(false);
        }}
        existingData={dataKendaraan}
        dropdownOptions={{ jenisKendaraan: jenisKendaraanDropdown }}
      />
    </>
  );
};

export default AddDataMemberForm;
