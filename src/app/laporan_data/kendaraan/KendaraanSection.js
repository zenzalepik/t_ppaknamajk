//KendaraanSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import KendaraanContentIn from './KendaraanContentIn';
import KendaraanContentOut from './KendaraanContentOut';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoErrorDiv from '@/components/EvoErrorDiv';

export default function KendaraanSection() {
  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesLDKendaraan =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Laporan Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Kendaraan')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesLDKendaraan).some(
    (v) => v === true
  );

  const tabs = [
    { key: 'in', label: 'In (Masih di dalam)' },
    { key: 'out', label: 'Out (Sudah keluar)' },
  ];

  const tabComponents = {
    in: KendaraanContentIn,
    out: KendaraanContentOut,
  };

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      {hakAksesLDKendaraan.read == true && (
        <EvoTab tabs={tabs} defaultTab="in" tabComponents={tabComponents} />
      )}
    </EvoCardSection>
  );
}
