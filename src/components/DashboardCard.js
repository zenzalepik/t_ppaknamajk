'use client';

import React, { useState, useEffect } from 'react';
import { RiRoadsterLine, RiWallet3Line } from '@remixicon/react';

export default function DashboardCard({ dataApi }) {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    if (Array.isArray(dataApi) && dataApi.length > 0) {
      setSummaryData(dataApi);
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
            {item.label}
          </div>
          <div className="opacity-[0.64] text-sm flex items-center gap-1">
            <RiWallet3Line size={12} />
            <span className="text-label_small_reguler">Pendapatan</span>
          </div>

          <div className="text-title_small text-primary">
            Rp. {item.total_pendapatan.toLocaleString('id-ID')}
          </div>
          <div className="h-px bg-border/40" />
          <div className="text-sm flex items-center gap-1">
            <RiRoadsterLine size={18} />
            <span className="text-card">
              {item.jumlah_kendaraan.toLocaleString('id-ID')} Kendaraan
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
