//AuditTransaksiPenggunaanVoucher.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataAuditTransaksiPenggunaanVoucher } from './tableDataAuditTransaksiPenggunaanVoucher';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiAuditTransaksiPenggunaanVoucher } from './api/fetchApiAuditTransaksiPenggunaanVoucher';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoLoading from '@/components/EvoLoading';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import strings from '@/utils/strings';
import numbers from '@/utils/numbers';
import EvoEmpty from '@/components/EvoEmpty';

const titleSection = 'Penggunaan Voucher';

export default function AuditTransaksiPenggunaanVoucher() {
  const [start_date, setStartDate] = React.useState(getDefaultDateAwal());
  const [end_date, setEndDate] = React.useState(getDefaultDateAkhir());

  const urlExport = '/laporan_data_audit_transaksi_penggunaan_voucher/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const formatDate = (date) => format(date, strings.formatDate);

  const formattedStartDate = format(start_date, strings.formatDate);
  const formattedEndDate = format(end_date, strings.formatDate);

  const [searchText, setSearchText] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: laporanAuditTransaksiPenggunaanVoucher,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'laporanAuditTransaksiPenggunaanVoucher',
      currentPage,
      formattedStartDate,
      formattedEndDate,
      searchText,
    ],
    queryFn: () =>
      fetchApiAuditTransaksiPenggunaanVoucher({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        // sortBy: 'id',
        sortOrder: 'desc',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        search: searchText,
      }),
    retry: false,
    keepPreviousData: true,
    // retry: false,
  });

  const prevDates = React.useRef({ start: start_date, end: end_date });

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    // Hanya reset page kalau tanggal bener-bener berubah
    if (
      format(prevDates.current.start, strings.formatDate) !==
        format(start, strings.formatDate) ||
      format(prevDates.current.end, strings.formatDate) !== format(end, strings.formatDate)
    ) {
      prevDates.current = { start, end };
      setResetPage(true);
    }
  };

  const [resetPage, setResetPage] = useState(false);

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
      setResetPage(false);
    }
  }, [resetPage]);

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
    // console.log('Hasil pencarian:', query);
    setSearchText(query.searchText); // Simpan kata kunci
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const rows =
    laporanAuditTransaksiPenggunaanVoucher?.data?.length > 0
      ? laporanAuditTransaksiPenggunaanVoucher.data.map((row, index) => ({
          no: index + 1,
          // noTiket: <b>{row.noTiket != null ? row.noTiket : <EvoEmpty />}</b>,
          // id: row.id || <EvoEmpty />,
          // id: row.id || <EvoEmpty />,
          namaVoucher: row.nama_voucher || <EvoEmpty />,
          potongan: row.potongan_voucher || <EvoEmpty />,
          petugas: row.nama_petugas_pos || <EvoEmpty />,
          qtyDigunakan: row.quantity_voucher_digunakan || <EvoEmpty />,
        }))
      : [];

  // if (isLoading)
  //   return (
  //     <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
  //       <Spinner size={32} color="border-black" />
  //       Loading...
  //     </div>
  //   );

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
        {/* {JSON.stringify(laporanAuditTransaksiPenggunaanVoucher)} */}
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
          // FilterComponent={FilterLapAudTranPenggunaanVoucher}
          placeholder="Ketik nama voucher..."
        buttonText="Pencarian"
          onSearch={handleSearch}    />

        <div className="relative">
          {isLoading && <EvoLoading />}
          <EvoTable
            id="tableToPrint"
            tableData={tableDataAuditTransaksiPenggunaanVoucher}
            currentPage={currentPage}
            totalPages={laporanAuditTransaksiPenggunaanVoucher?.totalPages}
            onPageChange={handlePageChange}
            rows={rows}
          />
        </div>
      </EvoCardSection>
    </>
  );
}
