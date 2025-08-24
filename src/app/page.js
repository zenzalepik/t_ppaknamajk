'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import DashboardCard from '@/components/DashboardCard';
import ActivitySection from '@/app/dashboard/ActivitySection';
import routes from '@/utils/routes'; // Pastikan ini diimpor
import Image from 'next/image';

// Test

export default function Home() {
  const scrollRef = useRef(null); // Tidak perlu <HTMLDivElement> di JavaScript
  const [isScrolled, setIsScrolled] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollTop > 0);
    }
  };

  const router = useRouter();
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = await getToken();
  //     if (token) {
  //       router.push(routes.dashboard); // ✅ Redirect ke Dashboard jika ada token
  //     } else {
  //       router.push(routes.login); // ✅ Redirect ke Login jika tidak ada token
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        router.push(routes.dashboard);
      } else {
        router.push(routes.login);
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [router]);

  if (!authChecked) return null;

  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar />

      <div
        className="flex flex-col flex-grow max-h-full overflow-y-scroll gap-6 pb-6"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <Header isScrolled={isScrolled} />
        <div className="h-16 mb-6 opacity-0">space</div>
        {/* <DashboardCard /> */}
        <div className="flex items-center justify-center bg-black mx-4 rounded-[32px] p-4">
          <Image
            src="/images/png/img_sistem_parkir.png"
            alt="Img Sistem Parkir"
            width={480}
            height={480}
          />
        </div>
        {/* <ActivitySection /> */}
      </div>
    </div>
  );
}
