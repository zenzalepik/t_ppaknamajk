'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';import AuditTransaksiSection from '@/app/laporan_data/audit_transaksi/AuditTransaksiSection';
import EvoLayout from '@/components/EvoLayout';


export default function LaporanDataAuditTransaksi() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        router.push(routes.login); // Redirect ke login jika tidak ada token
      }
    };

    checkAuth();
  }, []);
  return (
    <EvoLayout pageTitle="Laporan Data">
        <AuditTransaksiSection />
    </EvoLayout>
  );
}
