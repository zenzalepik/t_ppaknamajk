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
import EvoCollapseDetilLaporanKendaraan from '@/components/EvoCollapseDetilLaporanKendaraan';
import EvoInFile from '@/components/evosist_elements/EvoInFile';

const data = {
  no: '1',
  noTiket: 'TK-001',
  tanggalKeluar: '2025-05-09 14:10',
  pintuKeluar: 'Gate A',
  nopol: 'B 1234 ABC',
  kendaraan: 'Mobil',
  interval: '2 jam',
  tarif: 'Rp 10.000',
  denda: 'Rp 0',
  tipeDenda: 'Tidak Ada',
  pembayaran: 'QRIS',
  channel: 'GoPay',
  vaQr: 'INV001QR001',
  petugas: 'Riki',
  shift: 'A',
  transactionId: 'mid-001',
  orderId: 'ORD-001',
  transactionTime: '2025-05-09 14:08',
  settlementTime: '2025-05-10 10:00',
  settlementStatus: 'settled',
  fileSettlementName: 'settlement_20250510.csv',
};

const EditSettlementCashlessForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // alasanPembatalan: '',
    // keteranganTambahan: '',
    fileSettlementCashless: null,
  });

  const [selectedDate, setSelectedDate] = useState('');

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
      // alasanPembatalan:
      //   formData.alasanPembatalan.trim() === ''
      //     ? 'Alasan pembatalan wajib diisi'
      //     : '',
      // keteranganTambahan:
      //   formData.keteranganTambahan.trim() === ''
      //     ? 'Keterangan/penjelasan wajib diisi'
      //     : '',
      fileSettlementCashless: !formData.fileSettlementCashless
        ? 'File settlement wajib diunggah'
        : '',
    };

    setErrors(newErrors);

    // if (Object.values(newErrors).some((err) => err !== '')) {
    //   setNotifMessage('Formulir tidak boleh kosong.');
    //   setNotifType('error');
    //   return;
    // }
    
     if (Object.values(newErrors).some((err) => err !== '')) {
      setNotifMessage('File settlement harus diunggah.');
      setNotifType('error');
      return;
    }

    fileSettlementCashless: !formData.fileSettlementCashless
      ? 'File settlement wajib diunggah'
      : '',
      onSubmit?.(formData);

    setNotifMessage('File settlement cashless berhasil disimpan!');
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
        title="Unggah Settlement Cashless"
      >
        <EvoForm
          onSubmit={handleSubmit}
          submitText="Simpan"
          cancelText="Batal"
          onCancel={onClose}
        >
          <EvoCollapseDetilLaporanKendaraan data={data} />
          <EvoInFile
            name="fileSettlementCashless"
            label="Upload File Settlement Cashless"
            onChange={(file) =>
              setFormData((prev) => ({ ...prev, fileSettlementCashless: file }))
            }
            error={errors?.fileSettlementCashless}
          />
        </EvoForm>
      </EvoModal>
    </>
  );
};

export default EditSettlementCashlessForm;
