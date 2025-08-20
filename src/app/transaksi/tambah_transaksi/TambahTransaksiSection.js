'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/db';
import routes from '@/utils/routes';
import { RiSettings3Line, RiTvLine } from '@remixicon/react';
import AddTransaksiMasukForm from './forms/transaksi_masuk/AddForm';
import AddTransaksiKeluarForm from './forms/transaksi_keluar/AddForm';
import { RiArrowLeftRightFill } from '@remixicon/react';
import { RiArrowRightFill } from '@remixicon/react';
import { RiArrowLeftFill } from '@remixicon/react';
import { RiArrowRightDoubleLine } from '@remixicon/react';
import { RiArrowLeftDoubleLine } from '@remixicon/react';

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

export default function TambahTransaksiSection() {
  const router = useRouter();
  const [openTransaksiMasuk, setOpenTransaksiMasuk] = useState(false);
  const [openTransaksiKeluar, setOpenTransaksiKeluar] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (!token) {
        router.push(routes.login);
      }
    };
    checkAuth();
  }, [router]);

  const handleOpenTransaksiMasuk = () => setOpenTransaksiMasuk(true);

  const handleOpenTransaksiKeluar = () => setOpenTransaksiKeluar(true);

  const handleCloseTransaksiMasuk = () => setOpenTransaksiMasuk(false);

  const handleCloseTransaksiKeluar = () => setOpenTransaksiKeluar(false);

  const handleSubmitTransaksiMasuk = (data) => console.log('Data baru:', data);

  const handleSubmitTransaksiKeluar = (data) => console.log('Data baru:', data);

  return (
    <div className="wrapper_card px-8 grid grid-cols-2 gap-4 mb-8 p-4 rounded-lg">
      <InfoCard
        title="Transaksi Masuk"
        value="-"
        description="Transaksi Masuk"
        icon={<RiArrowRightDoubleLine size={56} />}
        onClick={handleOpenTransaksiMasuk}
      />
      <InfoCard
        title="Transaksi Keluar"
        value="-"
        description="Transaksi Keluar"
        icon={<RiArrowLeftDoubleLine size={56} />}
        onClick={handleOpenTransaksiKeluar}
      />
      <AddTransaksiMasukForm
        isOpen={openTransaksiMasuk}
        onClose={handleCloseTransaksiMasuk}
        onSubmit={handleSubmitTransaksiMasuk}
      />
      <AddTransaksiKeluarForm
        isOpen={openTransaksiKeluar}
        onClose={handleCloseTransaksiKeluar}
        onSubmit={handleSubmitTransaksiKeluar}
      />
    </div>
  );
}
