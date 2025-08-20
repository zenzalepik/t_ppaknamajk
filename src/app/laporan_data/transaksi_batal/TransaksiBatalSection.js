//TransaksiBatalSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import TransaksiBatalContentLaporan from './TransaksiBatalContentLaporan';
import TransaksiBatalContentTambah from './TransaksiBatalContentTambah';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const titleSection = 'Pembatalan Transaksi';

export default function PembatalanTransaksiSection({ onBack }) {
  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesLDTransaksiBatal =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Laporan Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Transaksi Batal')?.aksi ||
    {};

  const tidakPunyaAkses = !Object.values(hakAksesLDTransaksiBatal).some(
    (v) => v === true
  );

  const tabs = [
    ...(hakAksesLDTransaksiBatal.read
      ? [{ key: 'laporan', label: 'Laporan' }]
      : []),
    ...(hakAksesLDTransaksiBatal.batalkan_transaksi
      ? [{ key: 'tambah', label: 'Kirim Pembatalan' }]
      : []),
  ];

  const tabComponents = {
    ...(hakAksesLDTransaksiBatal.read && {
      laporan: TransaksiBatalContentLaporan,
    }),
    ...(hakAksesLDTransaksiBatal.batalkan_transaksi && {
      tambah: TransaksiBatalContentTambah,
    }),
  };
  //

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      {/* {hakAksesLDTransaksiBatal.read == true && ( */}
      <EvoTab
        tabs={tabs}
        defaultTab={hakAksesLDTransaksiBatal.batalkan_transaksi && hakAksesLDTransaksiBatal.read ==false ?"tambah":"laporan"}
        tabComponents={tabComponents}
        hakAkses={hakAksesLDTransaksiBatal}
      />
      {/* )} */}
    </EvoCardSection>
  );
}
