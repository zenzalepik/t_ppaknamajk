//RiwayatTransaksiSection.js
'use client';

import React, { useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTab from '@/components/EvoTab';
import RiwayatTransaksiManual from './tabs/manual/RiwayatTransaksiManual';
import RiwayatTransaksiTunai from './tabs/tunai/RiwayatTransaksiTunai';
import RiwayatTransaksiPrepaidCard from './tabs/prepaid_card/RiwayatTransaksiPrepaidCard';
import RiwayatTransaksiEWallet from './tabs/ewallet/RiwayatTransaksiEWallet';
import RiwayatTransaksiMember from './tabs/member/RiwayatTransaksiMember';

const titleSection = 'Riwayat Transaksi';

export default function RiwayatTransaksiSection() {
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
  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      <EvoTab tabs={tabs} defaultTab="manual" tabComponents={tabComponents} />
    </EvoCardSection>
  );
}
