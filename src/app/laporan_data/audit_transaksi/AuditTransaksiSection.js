//PendapatanParkirSection.js
'use client';

import React, {useEffect, useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import AuditTransaksiKendaraanKeluar from './tabs/kendaraan_keluar/AuditTransaksiKendaraanKeluar';
import AuditTransaksiTransaksiManual from './tabs/transaksi_manual/AuditTransaksiTransaksiManual';
import AuditTransaksiPenggunaanVoucher from './tabs/penggunaan_voucher/AuditTransaksiPenggunaanVoucher';
import AuditTransaksiPembatalanTransaksi from './tabs/pembatalan_transaksi/AuditTransaksiPembatalanTransaksi';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const titleSection = 'Audit Transaksi';

export default function PendapatanParkirSection() {
  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesLDAuditTransaksi =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Laporan Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Audit Transaksi')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesLDAuditTransaksi).some(
    (v) => v === true
  );

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

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      {hakAksesLDAuditTransaksi.read == true && (
      <EvoTab
        tabs={tabs}
        defaultTab="kendaraanKeluar"
        tabComponents={tabComponents}
      />)}
    </EvoCardSection>
  );
}
