'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';
import SettlementCashlessSection from '@/app/laporan_data/settlement_cashless/SettlementCashlessSection';
import EvoLayout from '@/components/EvoLayout';

export default function LaporanDataSettlementCashless() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        router.push(routes.login); // Redirect ke login jika tidak ada token
      }
    };

    checkAuth();
  }, [router]);
  return (
    <EvoLayout pageTitle="Laporan Data">
      <SettlementCashlessSection />
    </EvoLayout>
  );
}
