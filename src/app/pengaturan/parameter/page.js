'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';
import EvoLayout from '@/components/EvoLayout';
import {
  RiSettings3Line,
  RiTvLine,
  RiPrinterLine,
  RiRoadsterLine,
  RiPlugLine,
} from '@remixicon/react';

// Modular form components
import ParameterUmumForm from './forms/ParameterUmumForm';
import ParameterManlessForm from './forms/ParameterManlessForm';
import ParameterPrinterForm from './forms/ParameterPrinterForm';
import ParameterKendaraanForm from './forms/ParameterKendaraanForm';
import ParameterInterfaceForm from './forms/ParameterInterfaceForm';

const InfoCard = ({ title, value, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gradientPrimary45 text-white p-12 rounded-[24px] shadow flex gap-4 hover:scale-[1.02] transition-transform items-center"
    >
      {icon && (
        <div className="text-[56px] bg-white/20 p-4 rounded-[32px]">{icon}</div>
      )}
      <div>
        <h3 className=" text-title_small uppercase font-semibold">{title}</h3>
        {/* <p className="text-2xl font-bold">{value}</p> */}
        {description && <small className="text-white/80">{description}</small>}
      </div>
    </div>
  );
};

export default function PengaturanParameter() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        router.push(routes.login);
      }
    };
    checkAuth();
  }, [router]);

  const renderSelectedForm = () => {
    switch (selectedCard) {
      case 'umum':
        return <ParameterUmumForm onBack={() => setSelectedCard(null)} />;
      case 'manless':
        return <ParameterManlessForm onBack={() => setSelectedCard(null)} />;
      case 'kendaraan':
        return <ParameterKendaraanForm onBack={() => setSelectedCard(null)} />;
      case 'printer':
        return <ParameterPrinterForm onBack={() => setSelectedCard(null)} />;
      case 'interface':
        return <ParameterInterfaceForm onBack={() => setSelectedCard(null)} />;
      default:
        return null;
    }
  };

  return (
    <EvoLayout pageTitle="Pengaturan">
      {!selectedCard ? (
        <div className="wrapper_card px-8 grid grid-cols-2 gap-4 mb-8 p-4 rounded-lg">
          <InfoCard
            title="Parameter Umum"
            value="-"
            description="Pengaturan default sistem"
            icon={<RiSettings3Line size={56} />}
            onClick={() => setSelectedCard('umum')}
          />
          <InfoCard
            title="Parameter Tipe Manless"
            value="-"
            description="Konfigurasi otomatis tanpa petugas"
            icon={<RiTvLine size={56} />}
            onClick={() => setSelectedCard('manless')}
          />
          <InfoCard
            title="Parameter Tipe Kendaraan"
            value="-"
            description="Konfigurasi otomatis tanpa petugas"
            icon={<RiRoadsterLine size={56} />}
            onClick={() => setSelectedCard('kendaraan')}
          />
          <InfoCard
            title="Parameter Nama Printer"
            value="-"
            description="Nama perangkat printer terdaftar"
            icon={<RiPrinterLine size={56} />}
            onClick={() => setSelectedCard('printer')}
          />
          <InfoCard
            title="Parameter Nama Interface"
            value="-"
            description="Interface komunikasi perangkat"
            icon={<RiPlugLine size={56} />}
            onClick={() => setSelectedCard('interface')}
          />
        </div>
      ) : (
        renderSelectedForm()
      )}
    </EvoLayout>
  );
}
