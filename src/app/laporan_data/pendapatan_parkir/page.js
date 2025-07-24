'use client';

import PendapatanSection from '@/app/laporan_data/pendapatan_parkir/PendapatanParkirSection';
import EvoLayout from '@/components/EvoLayout';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';


export default function LaporanDataPendapatanParkir() {
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
        <PendapatanSection />
    </EvoLayout>
  );
}
