'use client';

import EvoLayout from '@/components/EvoLayout';
import DashboardCard from '@/components/DashboardCard';
import ActivitySection from '@/app/dashboard/ActivitySection';
import OverNightSection from '@/app/dashboard/OverNightSection';
import KendaraanSection from '@/app/dashboard/KendaraanSection';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';

export default function Dashboard() {
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
    <EvoLayout pageTitle="Dashboard">
      <DashboardCard />
      <ActivitySection />
      <OverNightSection />
      <KendaraanSection />
    </EvoLayout>
  );
}
