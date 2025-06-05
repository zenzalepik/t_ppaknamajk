//PendapatanParkirSection.js
'use client';

import React, { useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import AuditTransaksiKendaraanKeluar from './tabs/kendaraan_keluar/AuditTransaksiKendaraanKeluar';
import AuditTransaksiTransaksiManual from './tabs/transaksi_manual/AuditTransaksiTransaksiManual';
import AuditTransaksiPenggunaanVoucher from './tabs/penggunaan_voucher/AuditTransaksiPenggunaanVoucher';
import AuditTransaksiPembatalanTransaksi from './tabs/pembatalan_transaksi/AuditTransaksiPembatalanTransaksi';

const titleSection = 'Audit Transaksi';

export default function PendapatanParkirSection() {
  const tabs = [
    { key: 'kendaraanKeluar', label: 'Audit Kendaraan yang Sering Keluar' },
    { key: 'transaksiManual', label: 'Audit Transaksi Manual' },
    { key: 'penggunaanVoucher', label: 'Audit Penggunaan Voucher' },
    {key: 'pembatalanTransaksi', label: 'Audit Pembatalan Transaksi'},
  ];

  const tabComponents = {
    kendaraanKeluar: AuditTransaksiKendaraanKeluar,
    transaksiManual: AuditTransaksiTransaksiManual,
    penggunaanVoucher: AuditTransaksiPenggunaanVoucher,
    pembatalanTransaksi: AuditTransaksiPembatalanTransaksi
  };
  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      <EvoTab
        tabs={tabs}
        defaultTab="kendaraanKeluar"
        tabComponents={tabComponents}
      />
    </EvoCardSection>
  );
}
