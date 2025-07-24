'use client';

import DataPerusahaanSection from '@/app/master_data/perusahaan/DataPerusahaanSection';
import EvoLayout from '@/components/EvoLayout';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';


export default function MasterDataDataPerusahan() {
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
    <EvoLayout pageTitle="Master Data">
        <DataPerusahaanSection />
    </EvoLayout>
  );
}
