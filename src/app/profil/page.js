'use client';

import React, { useEffect, useRef, useState } from 'react';
import ProfilSection from '@/app/profil/ProfilSection';
import EvoLayout from '@/components/EvoLayout';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';


export default function Profil() {

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
    <EvoLayout pageTitle="Profil Akun">
        <ProfilSection />
    </EvoLayout>
  );
}
