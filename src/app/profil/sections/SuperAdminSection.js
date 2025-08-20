'use client';
import React, { useState } from 'react';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
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
  RiCodeSSlashLine,
  RiSmartphoneLine,
  RiCpuLine,
  RiContactsBookLine,
  RiToolsLine,
  RiCloudLine,
} from '@remixicon/react';
import { fetchApiProfil } from '@/app/profil/api/fetchApiProfil';
import { getErrorMessage } from '@/utils/errorHandler';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataPerusahaan } from '@/app/master_data/perusahaan/api/fetchApiMasterDataPerusahaan';
import Image from 'next/image';
import strings from '@/utils/strings';

export default function SuperAdminSection({ dataProfil, dataPerusahaan }) {
  return (
    <div className="flex gap-6">
      {/* KIRI: Profil Foto + Nama + Level */}
      <div className="flex flex-col gap-5 w-1/2">
        <div className="bg-gradientSecondary45 text-white h-fit py-16 flex flex-col basis-1/2 items-center text-center col-span-1 border px-6 rounded-[80px] shadow-cardInfo">
          <div className="w-32 h-32 max-w-80 max-h-80 rounded-full flex items-center justify-center text-black mb-4">
            <Image
              src="/images/png/logo.png"
              alt="Logo"
              width={320}
              height={320}
              className=" w-40 h-40 max-w-80 max-h-80"
            />
          </div>
          <h2 className="mt-5 text-title_area text-primary">
            {/* icon: RiBuildingLine, */}
            {/* {dataProfil?.perusahaan_id
              ? dataPerusahaan.find((p) => p.id === dataProfil.perusahaan_id)
                  ?.nama || '-'
              : '-'} */}
            {strings.developerName}
          </h2>
          {/* <div className="opacity-60 text-label_small_reguler">
            ( {strings.developerName} )
          </div> */}
          <div className="mt-3 text-title_large mb-3">
            {strings.developerTagLine}
          </div>
          <div className="text-content text-primary">
            {dataProfil?.level_akses}
          </div>

          <div className="flex items-start gap-2 text-start bg-black text-white px-3 py-3 rounded-[24px]">
            <RiMapPinLine className="mt-1 text-primary" size={28} />
            <div className="w-full">
              <p className="text-content_semilarge ">Alamat Kantor</p>
              <p className="text-content_reguler opacity-60">
                {strings?.developerOffice}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KANAN: Detail Informasi */}
      <div className="flex flex-col justify-between items-stretch">
      
        <div className="rounded-[40px] p-5 bg-primary/10 ">
          <div className="text-title_small text-gray-800">
            Layanan Kami
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                title: 'Web Development',
                subtitle: 'Ini adalah deskripsi untuk profil pertama.',
                icon: <RiCodeSSlashLine className="text-primary w-6 h-6" />,
              },
              {
                title: 'Mobile Apps Development',
                subtitle: 'Informasi singkat tentang profil kedua.',
                icon: <RiSmartphoneLine className="text-primary w-6 h-6" />,
              },
              {
                title: 'IoT Development',
                subtitle: 'Penjelasan menarik untuk profil ketiga.',
                icon: <RiCpuLine className="text-primary w-6 h-6" />,
              },
              {
                title: 'RFID CARD SYSTEM',
                subtitle: 'Detail tambahan untuk profil keempat.',
                icon: <RiContactsBookLine className="text-primary w-6 h-6" />,
              },
              {
                title: 'Hardware Maintenance',
                subtitle: 'Catatan penting dari profil kelima.',
                icon: <RiToolsLine className="text-primary w-6 h-6" />,
              },
              {
                title: 'SAAS ERP SERVICE',
                subtitle: 'Ringkasan profil keenam yang relevan.',
                icon: <RiCloudLine className="text-primary w-6 h-6" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className=" flex items-start gap-3 p-4 rounded-[16px] bg-white hover:bg-white hover:shadow transition-all duration-200 ease-in-out"
              >
                <div>{item.icon}</div>
                <div>
                  <h5 className="text-card text-gray-800">{item.title}</h5>
                  <p className="text-content_reguler text-black/50">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[40px] border p-5">
        <div className="text-title_small text-gray-800 font-semibold text-lg">
          Info User Login
        </div>
        <div className="flex gap-2 justify-stretch">
          {[
            {
              icon: RiAtLine,
              label: 'Username',
              value: dataProfil?.username,
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
              className="w-full flex items-start gap-3 border border-border/40 px-6 py-3 rounded-[24px]"
            >
              <Icon className="mt-1 text-primary" size={28} />
              <div className="w-full">
                <p className="text-content_semilarge text-black/40">{label}</p>
                <p className="text-base font-medium text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div></div>
      </div>
    </div>
  );
}
