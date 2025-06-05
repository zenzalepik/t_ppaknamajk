'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import { RiAddLargeLine, RiWallet3Line } from '@remixicon/react';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import EvoCardTambahTransaksi from '@/components/EvoCardTambahTransaksi';
import { motion } from 'framer-motion';
import AddManualForm from './forms/AddManualForm';
import AddTunaiForm from './forms/AddTunaiForm';

const titleSection = 'Tambah Transaksi';

export default function TambahTransaksiSection() {
  const [modalOpenManual, setModalOpenManual] = useState(false);
  const [modalOpenTunai, setModalOpenTunai] = useState(false);

  const handleTambahManual = () => setModalOpenManual(true);
  const handleTambahTunai = () => setModalOpenTunai(true);

  const handleManualTutup = () => setModalOpenManual(false);
  const handleTunaiTutup = () => setModalOpenTunai(false);

  const handleTurnOff = (paymentType) => {
    console.log(`Menonaktifkan ${paymentType}`);
  };

  const handleCancelTurnOff = () => {
    setConfirmDeleteId(null);
  };

  const handleTurnOn = () => {
    console.log('Tombol Aktifkan ditekan');
  };

  const handleManualSubmitData = (data) => {
    console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  const handleTunaiSubmitData = (data) => {
    console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  return (
    <>
      <AddManualForm
        isOpen={modalOpenManual}
        onClose={handleManualTutup}
        onSubmit={handleManualSubmitData}
      />
      <AddTunaiForm
        isOpen={modalOpenTunai}
        onClose={handleTunaiTutup}
        onSubmit={handleTunaiSubmitData}
      />
      <EvoCardSection>
        {/* Animasi dengan Framer Motion */}
        <div className="grid grid-cols-2 gap-6 ">
          <EvoCardTambahTransaksi
            key="Tambah Transaksi Manual"
            title="Tambah Transaksi Manual"
            updatedBy="Muhtar Lubis Asyari"
            updatedDate="18-11-2021 21:39"
            action={handleTambahManual}
          />
          <EvoCardTambahTransaksi
            key="Tambah Transaksi Tunai"
            title="Tambah Transaksi Tunai"
            updatedBy="Muhtar Lubis Asyari"
            updatedDate="18-11-2021 21:39"
            action={handleTambahTunai}
          />
        </div>
      </EvoCardSection>
    </>
  );
}
