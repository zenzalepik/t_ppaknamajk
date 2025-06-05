//TransaksiBatalSection.js
'use client';

import React, { useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import TransaksiBatalContentLaporan from './TransaksiBatalContentLaporan';
import TransaksiBatalContentTambah from './TransaksiBatalContentTambah';

const titleSection = 'Pembatalan Transaksi';

export default function PembatalanTransaksiSection({ onBack }) {
  const tabs = [
    { key: 'laporan', label: 'Laporan' },
    { key: 'tambah', label: 'Kirim Pembatalan' },
  ];

  const tabComponents = {
    laporan: TransaksiBatalContentLaporan,
    tambah: TransaksiBatalContentTambah,
  };
  //
  return (
    <EvoCardSection className='!p-0 !bg-transparent !shadow-none'>
      <EvoTab tabs={tabs} defaultTab="laporan" tabComponents={tabComponents} />
    </EvoCardSection>
  );
}
