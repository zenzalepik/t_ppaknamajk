'use client';

import DataMemberSection from '@/app/master_data/data_member/DataMemberSection';
import EvoLayout from '@/components/EvoLayout';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';

export default function MasterDataDataGerbang() {
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
        <DataMemberSection />
    </EvoLayout>
  );
}
