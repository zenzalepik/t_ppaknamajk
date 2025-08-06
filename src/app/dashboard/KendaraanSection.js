'use client';

import React, { useState, useEffect } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoChartLine from '@/components/evosist_elements/EvoChartLine';
import { RiSearchLine, RiUser3Line } from '@remixicon/react';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { fetchApiDashboardKendaraan } from './api/fetchApiDashboardKendaraan';
import EvoNotifCard from '@/components/EvoNotifCard';
import { getErrorMessage } from '@/utils/errorHandler';

export default function KendaraanSection() {
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: dashboardKendaraan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['dashboardKendaraan', currentPage],
    queryFn: () =>
      fetchApiDashboardKendaraan(
        // {
        // limit: 5,
        // page: currentPage,
        // offset: (currentPage - 1) * 5,
        // sortBy: 'id',
        // sortOrder: 'desc',
      // }
    ),
    // retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page); // trigger TanStack React Query re-fetch dengan page baru
  };

  const dataDashboardKendaraan = dashboardKendaraan?.data || [];

  const chartData = {
    labels: dataDashboardKendaraan?.map((item) =>
      new Date(item.tanggal).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
      })
    ),
    datasets: [
      {
        label: 'Mobil',
        data: dataDashboardKendaraan?.map((item) => item.mobil),
        borderColor: '#2A6DFF',
        backgroundColor: '#2A6DFF',
        pointBackgroundColor: 'black',
      },
      {
        label: 'Motor',
        data: dataDashboardKendaraan?.map((item) => item.motor),
        borderColor: '#FF5B2A',
        backgroundColor: '#FF5B2A',
        pointBackgroundColor: 'black',
      },
      {
        label: 'Truk/Box',
        data: dataDashboardKendaraan?.map((item) => item.truk_box),
        borderColor: '#53E172',
        backgroundColor: '#53E172',
        pointBackgroundColor: 'black',
      },
      {
        label: 'Taxi',
        data: dataDashboardKendaraan?.map((item) => item.taxi),
        borderColor: '#FF2AEA',
        backgroundColor: '#FF2AEA',
        pointBackgroundColor: 'black',
      },
    ],
  };

  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />;
  }

  const handleChange = (selectedValue) => {
    // console.log('Selected:', selectedValue);
  };

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
          // radioItems={radioItems}
          // monthNames={monthNames}
          // years={years}
          // handleChange={handleChange}
          onDateAkhir={getDefaultDateAkhir}
          onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}
        />

        {dashboardKendaraan?.data?.length > 0 ? (
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
