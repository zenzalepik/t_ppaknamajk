//PendapatanParkirSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import PendapatanParkirCasual from './PendapatanParkirCasual';
import PendapatanParkirMember from './PendapatanParkirMember';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const titleSection = 'Pendapatan Parkir';

export default function PendapatanParkirSection() {
  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesLDPendapatanParkir =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Laporan Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Pendapatan Parkir')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesLDPendapatanParkir).some(
    (v) => v === true
  );

  const tabs = [
    { key: 'casual', label: 'Pendapatan dari Casual' },
    { key: 'member', label: 'Pendapatan dari Member' },
  ];

  const tabComponents = {
    // laporan: PendapatanParkirSemua,
    casual: PendapatanParkirCasual,
    member: PendapatanParkirMember,
  };

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      {hakAksesLDPendapatanParkir.read == true && (
        <EvoTab tabs={tabs} defaultTab="casual" tabComponents={tabComponents} />
      )}
    </EvoCardSection>
  );
}
