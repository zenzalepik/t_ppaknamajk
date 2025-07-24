'use client';

import React, { useState, useEffect } from 'react';
import { RiRoadsterLine, RiWallet3Line } from '@remixicon/react';

export default function DashboardCard({dataApi}) {
  // console.log(JSON.stringify(dataApi));

  const defaultData = [
    { title: 'Hari Ini', income: 0, vehicles: 0 },
    { title: 'Minggu Ini', income: 0, vehicles: 0 },
    { title: 'Bulan Ini', income: 0, vehicles: 0 },
    { title: 'Tahun Ini', income: 0, vehicles: 0 },
  ];

  const [summaryData, setSummaryData] = useState(defaultData);

  useEffect(() => {
    if (dataApi && Object.keys(dataApi).length > 0) {
      const mappedData = [
        {
          title: 'Hari Ini',
          income: dataApi?.ringkasan_pendapatan?.hari_ini?.pendapatan || 0,
          vehicles: dataApi?.ringkasan_pendapatan?.hari_ini?.jumlah_kendaraan || 0,
        },
        {
          title: 'Minggu Ini',
          income: dataApi?.ringkasan_pendapatan?.minggu_ini?.pendapatan || 0,
          vehicles: dataApi?.ringkasan_pendapatan?.minggu_ini?.jumlah_kendaraan || 0,
        },
        {
          title: 'Bulan Ini',
          income: dataApi?.ringkasan_pendapatan?.bulan_ini?.pendapatan || 0,
          vehicles: dataApi?.ringkasan_pendapatan?.bulan_ini?.jumlah_kendaraan || 0,
        },
        {
          title: 'Tahun Ini',
          income: dataApi?.ringkasan_pendapatan?.tahun_ini?.pendapatan || 0,
          vehicles: dataApi?.ringkasan_pendapatan?.tahun_ini?.jumlah_kendaraan || 0,
        },
      ];
      setSummaryData(mappedData);
    }
  }, [dataApi]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
      {summaryData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 bg-primaryTransparent p-3 rounded-[12px]"
        >
          <div className="flex justify-center items-center py-1 text-label_small_semilight border-b bg-black rounded-[8px] text-white">
            {item.title}
          </div>
          <div className="opacity-[0.64] text-sm flex items-center gap-1">
            <RiWallet3Line size={12} />
            <span className="text-label_small_reguler">Pendapatan </span>
          </div>

          <div className="text-title_small text-primary">Rp. {item.income.toLocaleString('id-ID')}</div>
          <div className="h-px bg-border/40" />
          <div className="text-sm flex items-center gap-1">
            <RiRoadsterLine size={18} />
            <span className="text-card">{item.vehicles.toLocaleString('id-ID')} Kendaraan</span>
          </div>
        </div>
      ))}
    </div>
  );
}
