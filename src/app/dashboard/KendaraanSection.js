'use client';

import React, { useState, useMemo } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoChartLine from '@/components/evosist_elements/EvoChartLine';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import EvoNotifCard from '@/components/EvoNotifCard';
import { getErrorMessage } from '@/utils/errorHandler';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApiDashboardKendaraan } from './api/fetchApiDashboardKendaraan';

export default function KendaraanSection() {
  const [startDate, setStartDate] = useState(getDefaultDateAwal());
  const [endDate, setEndDate] = useState(getDefaultDateAkhir());
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const { data: dashboardKendaraan, error, isLoading } = useQuery({
    queryKey: ['dashboardKendaraan', currentPage],
    queryFn: () => fetchApiDashboardKendaraan(),
  });

  const dataDashboardKendaraan = dashboardKendaraan?.data || [];

  const defaultColorList = [
    '#2A6DFF', '#FF5B2A', '#53E172', '#FF2AEA',
    '#FFD700', '#00CED1', '#FF4500', '#ADFF2F',
    '#8A2BE2', '#FF69B4', '#20B2AA', '#DC143C',
    '#00FA9A', '#FF6347', '#7B68EE',
  ];

  const colorCache = new Map();

  function generateColorFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    const saturation = 70 + (Math.abs(hash) % 20); // 70–90%
    const lightness = 50 + (Math.abs(hash) % 10);  // 50–59%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function getColorByIndexOrHash(name, index) {
    if (index < defaultColorList.length) return defaultColorList[index];
    if (colorCache.has(name)) return colorCache.get(name);
    const color = generateColorFromString(name);
    colorCache.set(name, color);
    return color;
  }

  const chartData = useMemo(() => {
    const kendaraanJenisSet = new Set();
    dataDashboardKendaraan.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'tanggal') kendaraanJenisSet.add(key);
      });
    });
    const kendaraanJenis = Array.from(kendaraanJenisSet);

    return {
      labels: dataDashboardKendaraan.map((item) =>
        new Date(item.tanggal).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
        })
      ),
      datasets: kendaraanJenis.map((jenis, idx) => ({
        label: jenis.charAt(0).toUpperCase() + jenis.slice(1),
        data: dataDashboardKendaraan.map((item) =>
          parseInt(item[jenis] ?? 0, 10)
        ),
        borderColor: getColorByIndexOrHash(jenis, idx),
        backgroundColor: getColorByIndexOrHash(jenis, idx),
        pointBackgroundColor: 'black',
      })),
    };
  }, [dataDashboardKendaraan]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );
  }

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />;
  }

  return (
    <>
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}
      <EvoCardSection>
        <EvoTitleSection
          title="Kendaraan"
          onDateAkhir={getDefaultDateAkhir}
          onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}
        />

        {dataDashboardKendaraan.length > 0 ? (
          <EvoChartLine data={chartData} />
        ) : (
          <div className="text-center text-gray-400">
            Tidak ada data untuk ditampilkan
          </div>
        )}
      </EvoCardSection>
    </>
  );
}
