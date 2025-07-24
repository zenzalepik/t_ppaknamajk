//AuditTransaksiPembatalanTransaksi.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataAuditTransaksiPembatalanTransaksi } from './tableDataAuditTransaksiPembatalanTransaksi';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterLapAudTranPembatalanTransaksi from './FilterLapAudTranPembatalanTransaksi';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiUpload2Line } from '@remixicon/react';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiAuditTransaksiPembatalanTransaksi } from './api/fetchApiAuditTransaksiPembatalanTransaksi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Pembatalan Transaksi';

export default function AuditTransaksiPembatalanTransaksi() {
  const urlExport = '/laporan_data_audit_transaksi_pembatalan_transaksi/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: laporanAuditTransaksiPembatalanTransaksi,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanAuditTransaksiPembatalanTransaksi', currentPage],
    queryFn: () =>
      fetchApiAuditTransaksiPembatalanTransaksi({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmitData = (data) => {
    console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  const rows =
    laporanAuditTransaksiPembatalanTransaksi?.data?.length > 0
      ? laporanAuditTransaksiPembatalanTransaksi.data.map((row, index) => ({
          no: index + 1,
          // noTiket: <b>{row.noTiket != null ? row.noTiket : <i>*empty</i>}</b>,

          // id: row.id ||<i>*empty</i>,
          pos: row.pos || <i>*empty</i>,
          petugas: row.petugas || <i>*empty</i>,
          qty: row.qty || <i>*empty</i>,
          totalNominal: row.totalNominal || <i>*empty</i>,
        }))
      : [];

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
      <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
        <EvoTitleSection
          title={titleSection}
          onExportPDF={() => setModalExportPDFOpen(true)}
          onExportExcel={() => setModalExportExcel(true)}
          onPrint={() => setModalExportPrint(true)}
          onDateAkhir={getDefaultDateAkhir}
          onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}
        />
        <>
          <EvoExportApiPDF
            isOpen={modalExportPDFOpen}
            onClose={() => setModalExportPDFOpen(false)}
            endpoint={urlExport + 'pdf'}
            filename={titleSection}
          />
          <EvoExportApiExcel
            isOpen={modalExportExcel}
            onClose={() => setModalExportExcel(false)}
            endpoint={urlExport + 'excel'}
            filename={titleSection}
          />
          <EvoExportApiPrint
            isOpen={modalExportPrint}
            onClose={() => setModalExportPrint(false)}
            endpoint={urlExport + 'pdf'}
          />
        </>
        <EvoSearchTabel
          // isFilter={true}
          // FilterComponent={FilterLapAudTranPembatalanTransaksi}
          placeholder="Ketik nomor polisi..."
          onSearch={(data) => console.log('Hasil pencarian:', data)}
        />

        <EvoTable
          id="tableToPrint"
          tableData={tableDataAuditTransaksiPembatalanTransaksi}
          currentPage={currentPage}
          totalPages={laporanAuditTransaksiPembatalanTransaksi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
