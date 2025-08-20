'use client';

import React, { useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EditProfilForm from './forms/EditForm';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { getToken, removeToken } from '@/utils/db';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  RiUser3Line,
  RiUserLine,
  RiPhoneLine,
  RiMapPinLine,
  RiDonutChartLine,
  RiAtLine,
  RiLockPasswordLine,
  RiBuildingLine,
  RiShieldUserLine,
} from '@remixicon/react';
import { fetchApiProfil } from '@/app/profil/api/fetchApiProfil';
import { getErrorMessage } from '@/utils/errorHandler';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataPerusahaan } from '@/app/master_data/perusahaan/api/fetchApiMasterDataPerusahaan';
import SuperAdminSection from './sections/SuperAdminSection';
import numbers from '@/utils/numbers';

export default function DataPenggunaSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: profil,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['profil'],
    queryFn: fetchApiProfil,
    // retry: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const handleUbah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const {
    data: masterDataPerusahaan,
    errorDataPerusahaan,
    isLoadingDataPerusahaan,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPage],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
        limit: numbers.apiNumLimitExpanded,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const dataProfil = Array.isArray(profil) ? profil[0] : {};
  // console.log(dataProfil);

  if (isLoading || isLoadingDataPerusahaan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error || errorDataPerusahaan) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  const dataPerusahaan = masterDataPerusahaan?.data || [];
  console.log(dataPerusahaan);
  return (
    <EvoCardSection>
      <EditProfilForm
        userData={dataProfil}
        isOpen={modalOpen}
        onClose={handleTutup}
      />

      {/* Konten utama */}

      {dataProfil?.level_pengguna?.nama == 'Super Admin' ? (
        <SuperAdminSection
          dataProfil={dataProfil}
          dataPerusahaan={dataPerusahaan}
        />
      ) : (
        <div className="flex gap-12 p-6">
          {/* KIRI: Profil Foto + Nama + Level */}
          <div className="h-fit py-24 flex flex-col basis-1/2 items-center text-center col-span-1 border border-border/40 px-6 rounded-[80px] shadow-cardInfo">
            <div className="w-32 h-32 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center text-black mb-4">
              <RiUser3Line className="w-12 h-12" />
            </div>
            <h2 className="text-title_small text-gray-800">
              @{dataProfil?.username}
            </h2>
            <div className="text-content text-primary">
              {dataProfil?.level_akses}
            </div>
          </div>

          <div className="md:border-r-4 border-dashed border-black md:pr-6" />

          {/* KANAN: Detail Informasi */}
          <div className="flex flex-col basis-2/3 gap-6">
            {[
              {
                icon: RiUserLine,
                label: 'Nama Lengkap',
                value: dataProfil?.nama,
              },
              {
                icon: RiPhoneLine,
                label: 'Nomor Handphone',
                value: dataProfil?.no_hp,
              },
              {
                icon: RiDonutChartLine,
                label: 'Jenis Kelamin',
                value: dataProfil?.jenis_kelamin,
              },
              {
                icon: RiMapPinLine,
                label: 'Alamat Lengkap',
                value: dataProfil?.alamat_lengkap,
              },
              {
                icon: RiAtLine,
                label: 'Username',
                value: dataProfil?.username,
              },
              {
                icon: RiLockPasswordLine,
                label: 'Password',
                value: '••••••••',
              },
              {
                icon: RiBuildingLine,
                label: 'Asal Perusahaan',
                // value:
                //   dataProfil?.perusahaan_id == null
                //     ? '-'
                //     : dataProfil?.perusahaan_id || '-',
                value: (() => {
                  if (!dataProfil?.perusahaan_id) return '-';
                  const perusahaan = dataPerusahaan.find(
                    (p) => p.id === dataProfil.perusahaan_id
                  );
                  return perusahaan?.nama || '-';
                })(),
              },
              {
                icon: RiShieldUserLine,
                label: 'Level Pengguna',
                value:
                  dataProfil?.level_pengguna == null
                    ? '-'
                    : dataProfil?.level_pengguna?.nama || '-',
              },
            ].map(({ icon: Icon, label, value }, index) => (
              <div
                key={index}
                className="flex items-start gap-3 border border-border/40 px-6 py-3 rounded-[24px]"
              >
                <Icon className="mt-1 text-primary" size={28} />
                <div className="w-full">
                  <p className="text-content_semilarge text-black/40">
                    {label}
                  </p>
                  <p className="text-base font-medium text-gray-900">{value}</p>
                </div>
              </div>
            ))}

            <EvoButton
              buttonText="Ubah Profil"
              className="mt-6"
              size="large"
              onClick={handleUbah}
            />
          </div>
        </div>
      )}
    </EvoCardSection>
  );
}
