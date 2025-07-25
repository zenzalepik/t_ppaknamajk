//RiwayatTransaksiSection.js
'use client';

import React, { useEffect ,useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import RiwayatTransaksiManual from './tabs/manual/RiwayatTransaksiManual';
import RiwayatTransaksiTunai from './tabs/tunai/RiwayatTransaksiTunai';
import RiwayatTransaksiPrepaidCard from './tabs/prepaid_card/RiwayatTransaksiPrepaidCard';
import RiwayatTransaksiEWallet from './tabs/ewallet/RiwayatTransaksiEWallet';
import RiwayatTransaksiMember from './tabs/member/RiwayatTransaksiMember';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const titleSection = 'Riwayat Transaksi';

export default function RiwayatTransaksiSection() {
  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesLDTransaksi =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Transaksi')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Riwayat Transaksi')?.aksi ||
    {};

  const tidakPunyaAkses = !Object.values(hakAksesLDTransaksi).some(
    (v) => v === true
  );

  const tabs = [
    { key: 'manual', label: 'Manual' },
    { key: 'tunai', label: 'Tunai' },
    { key: 'prepaidCard', label: 'Prepaid Card' },
    { key: 'eWallet', label: 'E-Wallet' },
    { key: 'member', label: 'Member' },
  ];

  const tabComponents = {
    manual: RiwayatTransaksiManual,
    tunai: RiwayatTransaksiTunai,
    prepaidCard: RiwayatTransaksiPrepaidCard,
    eWallet: RiwayatTransaksiEWallet,
    member: RiwayatTransaksiMember,
  };

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      {hakAksesLDTransaksi.read == true && (
        <EvoTab tabs={tabs} defaultTab="manual" tabComponents={tabComponents} />
      )}
    </EvoCardSection>
  );
}
