'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';
import DataPenggunaSection from '@/app/master_data/data_pengguna/DataPenggunaSection';
import EvoLayout from '@/components/EvoLayout';

export default function MasterDataDataPengguna() {
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
    <EvoLayout pageTitle="Master Data">
      <DataPenggunaSection />
    </EvoLayout>
  );
}
