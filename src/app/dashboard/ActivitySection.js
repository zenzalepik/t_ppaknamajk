'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { tabelDataAktivitasKendaraan } from './data/tabelDataAktivitasKendaraan';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { fetchApiDashboardActivity } from './api/fetchApiDashboardActivity';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoNotifCard from '@/components/EvoNotifCard';
import { StatusLabel } from '@/components/StatusLabel';

const titleSection = 'Aktivitas Gerbang Kendaraan';

export default function ActivitySection() {
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: dashboardActivity,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['dashboardActivity', currentPage],
    queryFn: () =>
      fetchApiDashboardActivity({
        limit: 15,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page); // trigger TanStack React Query re-fetch dengan page baru
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleChange = (selectedValue) => {
    // console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    // console.log('Hasil pencarian:', query);
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

  console.log( dashboardActivity?.data);
  const rows =
    dashboardActivity?.data?.length > 0
      ? dashboardActivity.data.map((row, index) => ({
          no: index + 1,
          ticket: <b>{row.tiket}</b> || <i>*empty</i>,
          plate: row.plat_nomor || <i>*empty</i>,

          type: row.kendaraan_id || <i>*empty</i>,

          time: row.waktu || <i>*empty</i>,
          gate: row.lokasi_gerbang || <i>*empty</i>,
          status:  row.buka_atau_tutup || <i>*empty</i>,
          // open: row.petugas || <i>*empty</i>,
          officer:  row.petugas?.nama?.trim()
    ? row.petugas.nama
    : <i>*empty</i>,
          result: StatusLabel.status_palang(row.status_palang) || <i>*empty</i>,
        }))
      : [];

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
          title={titleSection}
          handleChange={handleChange}
          onExportPDF={() => exportPDF('tableToPrint', titleSection)}
          onExportExcel={() => exportExcel('tableToPrint', titleSection)}
          onPrint={() => exportPrint('tableToPrint', titleSection)}
          onDateAkhir={getDefaultDateAkhir}
          onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}
        />
        <EvoSearchTabel
          placeholder="Temukan loker impian kamu..."
          buttonText="Pencarian"
          onSearch={handleSearch}
        />
        <EvoTable
          id="tableToPrint"
          tableData={tabelDataAktivitasKendaraan}
          currentPage={currentPage}
          totalPages={dashboardActivity?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
