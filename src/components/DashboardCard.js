'use client';

import React from 'react';
import { RiRoadsterLine, RiWallet3Line } from '@remixicon/react';

export default function DashboardCard() {
  const data = [
    { title: 'Hari Ini', income: 0, vehicles: 0 },
    { title: 'Minggu Ini', income: 0, vehicles: 0 },
    { title: 'Bulan Ini', income: 0, vehicles: 0 },
    { title: 'Tahun Ini', income: 0, vehicles: 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
      {data.map((item, index) => (
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

          <div className="text-title_small text-primary">Rp. {item.income}</div>
          <div className="h-px bg-border/40" />
          <div className="text-sm flex items-center gap-1">
            <RiRoadsterLine size={18} />
            <span className="text-card">{item.vehicles} Kendaraan</span>
          </div>
        </div>
      ))}
    </div>
  );
}
