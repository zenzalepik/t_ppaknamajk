'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import { RiAddLargeLine, RiWallet3Line } from '@remixicon/react';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import EvoCardSettingPayment from '@/components/EvoCardSettingPayment';
import { fetchApiPengaturanPembayaran } from './api/fetchApiPengaturanPembayaran';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';

const titleSection = 'Pembayaran';

const paymentTypes = ['Cash', 'Prepaid', 'Transfer Bank', 'E-Wallet', 'Member'];

export default function PembayaranSection() {
  const {
    data: pengaturanTarifParkir,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanTarifParkir'],
    queryFn: fetchApiPengaturanPembayaran,
    // retry: false,
  });

  const handleTurnOff = (paymentType) => {
    console.log(`Menonaktifkan ${paymentType}`);
  };

  const handleCancelTurnOff = () => {
    setConfirmDeleteId(null);
  };

  const handleTurnOn = () => {
    console.log('Tombol Aktifkan ditekan');
  };

  const handleSubmitEWallet = (data) => {
    console.log('Data E-Wallet baru:', data);
    // Kirim ke API atau setState
  };

  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  const dataPembayaran = pengaturanTarifParkir?.data ?? [];

  return (
    <EvoCardSection>
      <EvoTitleSection
        title={titleSection}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
      />

      {/* <div className="grid grid-cols-2 gap-6">
        {['Cash', 'Prepaid', 'Transfer Bank', 'E-Wallet', 'Member'].map((paymentType) => (
          <EvoCardSettingPayment
            key={paymentType} // Tambahkan key unik
            title={paymentType}
            updatedBy="Muhtar Lubis Asyari"
            updatedDate="18-11-2021 21:39"
            onTurnOff={() => handleTurnOff(paymentType)}
          />
        ))}
      </div> */}
      <div className="grid grid-cols-2 gap-6">
        {paymentTypes.map((type) => {
          const matchedPayment = dataPembayaran.find(
            (p) => p.jenis_payment.toLowerCase() === type.toLowerCase()
          );
          const isActive = matchedPayment?.status === true;

          return (
            <div
              key={type}
              className={isActive ? '' : 'opacity-20 transition-opacity'}
            >
              <EvoCardSettingPayment
                title={type}
                updatedBy={matchedPayment?.updated_by ?? '-'}
                updatedDate={
                  matchedPayment?.updatedAt
                    ? new Date(matchedPayment.updatedAt).toLocaleString()
                    : '-'
                }
                isActive={isActive}
                {...(matchedPayment && {
                  onTurnOff: () => handleTurnOff(type),
                  onTurnOn: () => handleTurnOn(type),
                })}
              />
            </div>
          );
        })}
      </div>
    </EvoCardSection>
  );
}
