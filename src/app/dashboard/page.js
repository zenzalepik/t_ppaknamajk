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
import { useSyncPengaturanGlobal } from '@/app/pengaturan/global/hooks/useSyncPengaturanGlobal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { fetchApiDashboardPendapatan } from './api/fetchApiDashboardPendapatan';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoNotifCard from '@/components/EvoNotifCard';
import Image from 'next/image';

export default function Dashboard() {
  useSyncPengaturanGlobal(); // sync tiap 10 menit

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

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: dashboardPendapatan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['dashboardPendapatan', currentPage],
    queryFn: () =>
      fetchApiDashboardPendapatan({
        // limit: 5,
        // page: currentPage,
        // offset: (currentPage - 1) * 5,
        // sortBy: 'id',
        // sortOrder: 'desc',
      }),
    // retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page); // trigger TanStack React Query re-fetch dengan page baru
  };

  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />;
  }

  const handleChange = (selectedValue) => {
    // console.log('Selected:', selectedValue);
  };

  return (
    <EvoLayout pageTitle="Dashboard">
      <>
        {notifMessage && (
          <EvoNotifCard
            message={notifMessage}
            onClose={() => setNotifMessage('')}
            type={notifType}
            autoClose={true}
          />
        )}
        <div className="flex gap-0">
          <div className="flex justify-center items-center w-2/3 pl-6 max-h-80">
            <Image
              src="/images/png/img_illustration_pendapatan_parkir.png"
              alt="Pendapatan Parkir Illustration"
              width={480}
              height={480}
              className=" w-full h-full object-cover rounded-[40px] overflow-hidden"
            />
          </div>
          {/* {JSON.stringify(dashboardPendapatan?.data)} */}
          <DashboardCard dataApi={dashboardPendapatan?.data || []} />
        </div>
      </>
      <ActivitySection />
      {/* <div className="flex gap-3"> */}
        <OverNightSection />
        {/* <div className="flex justify-center items-center w-1/3 pl-6 max-h-80">
          <Image
            src="/images/png/img_illustration_pendapatan_parkir.png"
            alt="Pendapatan Parkir Illustration"
            width={480}
            height={480}
            className=" w-full h-full object-cover rounded-[40px] overflow-hidden"
          />
        </div>
      </div> */}
      <KendaraanSection />
    </EvoLayout>
  );
}
