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
import TiketForm from './TiketForm';
// import dataKendaraan from '../data/dataKendaraan';
import EvoTicketVoucher from '@/components/EvoTicketVoucher';
import { tableProdukVoucher } from '../../produk_voucher/tableProdukVoucher';

const AddDataVoucherForm = ({ isOpen, onClose, onSubmit, vouchers }) => {
  const [modalVoucherOpen, setModalVoucherOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setModalVoucherOpen(false);
  };

  const [formData, setFormData] = useState({
    // namaVoucher: '',
    nomorTiketAtauPolisi: '',
    jenisKendaraan: '',
    keterangan: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedVoucher) {
      setErrors((prev) => ({
        ...prev,
        voucher: 'Harap pilih tiket terlebih dahulu.',
      }));
      setNotifMessage('Harap pilih tiket sebelum menyimpan.');
      setNotifType('error');
      return;
    }

    // if (formData.nomorPolisi === '') {
    //   setErrors({ nomorPolisi: 'Nomor Polisi wajib diisi' });
    //   return;
    // }

    const newErrors = {
      nomorTiketAtauPolisi:
        formData.nomorTiketAtauPolisi === '' ? 'Kontak wajib diisi' : '',
      jenisKendaraan:
        formData.jenisKendaraan === '' ? 'Jenis Kendaraan wajib diisi' : '',
      keterangan: formData.keterangan === '' ? 'Keterangan wajib diisi' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('Formulir tidak boleh kosong.');
      setNotifType('error');
      return;
    }

    // onSubmit?.(formData);
    onSubmit?.({ ...formData, selectedVoucher });

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
          autoClose={true}
        />
      )}

      <EvoModal isOpen={isOpen} onClose={onClose} title="Tambah Voucher">
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <div className="text-title_small">
            <span className="text-primary">A.</span> Produk Voucher
          </div>

          {/* Pilih Tiket */}
          <EvoButton
            buttonText={selectedVoucher == null ? 'Pilih Tiket' : 'Ubah Tiket'}
            onClick={() => setModalVoucherOpen(true)}
            size="large"
            type="button"
            outlined={selectedVoucher == null ? false : true}
          />
          {errors.ticket && (
            <p className="text-red-500 text-sm">{errors.ticket}</p>
          )}
          {selectedVoucher && <EvoTicketVoucher voucher={selectedVoucher} />}

          <div className="text-title_small">
            <span className="text-primary">B.</span> Data Voucher
          </div>
          <EvoInText
            name="nomorTiketAtauPolisi"
            label="Nomor Tiket / Nomor Polisi"
            placeholder="Masukkan nomor tiket / nomor polisi"
            value={formData.nomorTiketAtauPolisi}
            onChange={handleChange}
            error={errors.nomorTiketAtauPolisi}
          />
          <EvoInDropdown
            name="jenisKendaraan"
            label="Jenis Kendaraan"
            options={[
              { label: 'Jenis Kendaraan', value: 'A' },
              { label: 'Jenis Kendaraan', value: 'B' },
            ]}
            value={formData.jenisKendaraan}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, jenisKendaraan: value }))
            }
            error={errors.jenisKendaraan}
            placeholder="Pilih jenis kendaraan"
          />

          <EvoInText
            name="keterangan"
            label="Keterangan"
            placeholder="Masukkan keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            error={errors.keterangan}
          />
        </EvoForm>
      </EvoModal>

      <TiketForm
        isOpen={modalVoucherOpen}
        onClose={() => setModalVoucherOpen(false)}
        onSubmit={handleSelectVoucher}
        listVouchers={tableProdukVoucher.rows} // Pastikan mengambil data voucher
      />
    </>
  );
};

export default AddDataVoucherForm;
