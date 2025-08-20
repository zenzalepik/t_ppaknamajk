'use client';

import React, { useState, useEffect } from 'react';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoBtnDropdown from '@/components/evosist_elements/EvoBtnDropdown';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import EvoChartLine from '@/components/evosist_elements/EvoChartLine';
import { RiSearchLine, RiUser3Line } from '@remixicon/react';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { chartDataOverNight } from './data/chartDataOverNight';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { fetchApiDashboardOverNight } from './api/fetchApiDashboardOverNight';
import { fetchApiDashboardOverNightKendaraanKeluar } from './api/fetchApiDashboardOverNightKendaraanKeluar';
import EvoNotifCard from '@/components/EvoNotifCard';
import { getErrorMessage } from '@/utils/errorHandler';

export default function OverNightSection() {
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());
  const [showOvernightKeluar, setShowOvernightKeluar] = React.useState(false);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: dashboardOverNight,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['dashboardOverNight', currentPage],
    queryFn: () => fetchApiDashboardOverNight(),
    //   {
    //   limit: 5,
    //   page: currentPage,
    //   offset: (currentPage - 1) * 5,
    //   sortBy: 'id',
    //   sortOrder: 'desc',
    // }
    // retry: false,
  });

  const {
    data: dashboardOverNightKendaraanKeluar,
    errorKendaraanKeluar,
    isLoadingKendaraanKeluar,
  } = useQuery({
    queryKey: ['dashboardOverNightKendaraanKeluar', currentPage],
    queryFn: () => fetchApiDashboardOverNightKendaraanKeluar(),
    //   {
    //   limit: 5,
    //   page: currentPage,
    //   offset: (currentPage - 1) * 5,
    //   sortBy: 'id',
    //   sortOrder: 'desc',
    // }
    // retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page); // trigger TanStack React Query re-fetch dengan page baru
  };

  const overnightData = dashboardOverNight?.data || [];
  const overnightDataKendaraanKeluar =
    dashboardOverNightKendaraanKeluar?.data || [];

  const chartData = {
    labels: overnightData.map((item) =>
      new Date(item.tanggal).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        data: overnightData.map((item) => item.nilai),
        borderColor: '#FF5B2A',
        backgroundColor: '#FF5B2A',
        pointBackgroundColor: 'black',
      },
    ],
  };

  const chartDataKendaraanKeluar = {
    labels: overnightDataKendaraanKeluar.map((item) =>
      new Date(item.tanggal).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        data: overnightDataKendaraanKeluar.map((item) => item.nilai),
        borderColor: '#FF5B2A',
        backgroundColor: '#FF5B2A',
        pointBackgroundColor: 'black',
      },
    ],
  };

  if (isLoading || isLoadingKendaraanKeluar)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error || errorKendaraanKeluar) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />;
  }

  const handleChange = (selectedValue) => {
    // console.log('Selected:', selectedValue);
  };

  const handleOverKendaraanKeluar = () => {
    setShowOvernightKeluar((prev) => !prev);
  };

  return (
    <div className="w-full">
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
          title="Over Night"
          handleChange={handleChange}
          onDateAkhir={getDefaultDateAkhir}
          onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}
          buttonText={`${
            showOvernightKeluar == false
              ? 'Kendaraan Sudah Keluar'
              : 'Hitung Kendaraan Masih di Dalam'
          }`}
          onButtonClick={handleOverKendaraanKeluar}
        />
        {showOvernightKeluar == true ? (
          <div className="mt-4 p-4 rounded-[16px] bg-black">
            {/* Ganti isi <div> ini dengan komponen aslimu jika sudah ada */}
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Data Kendaraan Overnight yang Sudah Keluar
            </h3>
            <>
              {dashboardOverNightKendaraanKeluar?.data?.length > 0 ? (
                <EvoChartLine
                  // data={chartDataOverNight}
                  data={chartDataKendaraanKeluar}
                />
              ) : (
                <div className="text-center text-gray-400">
                  Tidak ada data untuk ditampilkan
                </div>
              )}
            </>
          </div>
        ) : (
          <></>
        )}

        {showOvernightKeluar == false ? (
          dashboardOverNight?.data?.length > 0 ? (
            <EvoChartLine
              // data={chartDataOverNight}
              data={chartData}
            />
          ) : (
            <div className="text-center text-gray-400">
              Tidak ada data untuk ditampilkan
            </div>
          )
        ) : (
          <></>
        )}
      </EvoCardSection>
    </div>
  );
}
