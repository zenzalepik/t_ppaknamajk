'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';
import PosSection from '@/app/master_data/pos/PosSection';
import EvoLayout from '@/components/EvoLayout';

export default function MasterDataDataPos() {
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
      <PosSection />
    </EvoLayout>
  );
}
