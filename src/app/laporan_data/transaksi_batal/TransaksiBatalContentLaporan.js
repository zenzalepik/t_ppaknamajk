'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataTransaksiBatalLaporan } from './data/tableDataTransaksiBatalLaporan';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiTransaksiBatalLaporan } from './api/fetchApiTransaksiBatalLaporan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoLoading from '@/components/EvoLoading';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

const titleSection = 'Laporan Pembatalan Transaksi';

export default function TransaksiBatalContentLaporan() {
  const [start_date, setStartDate] = React.useState(getDefaultDateAwal());
  const [end_date, setEndDate] = React.useState(getDefaultDateAkhir());

  const urlExport = '/laporan_transaksi_batal_laporan/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const formatDate = (date) => format(date, 'dd-MM-yyyy');

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const formattedStartDate = format(start_date, 'MM-dd-yyyy');
  const formattedEndDate = format(end_date, 'MM-dd-yyyy');

  const [searchKeyword, setSearchKeyword] = useState('');

  const {
    data: laporanTransaksiBatalLaporan,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'laporanTransaksiBatalLaporan',
      currentPage,
      formattedStartDate,
      formattedEndDate,
      searchKeyword,
    ],
    queryFn: () =>
      fetchApiTransaksiBatalLaporan({
        limit: 13,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        search: searchKeyword,
      }),
    // retry: false,
  });

  const prevDates = React.useRef({ start: start_date, end: end_date });

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    // Hanya reset page kalau tanggal bener-bener berubah
    if (
      format(prevDates.current.start, 'MM-dd-yyyy') !==
        format(start, 'MM-dd-yyyy') ||
      format(prevDates.current.end, 'MM-dd-yyyy') !== format(end, 'MM-dd-yyyy')
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
    setSearchKeyword(query); // Simpan kata kunci
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const rows =
    laporanTransaksiBatalLaporan?.data?.length > 0
      ? laporanTransaksiBatalLaporan.data.map((row, index) => ({
          no: index + 1,
          // noTiket: <b>{row.noTiket != null ? row.noTiket : <i>*empty</i>}</b>,
          // id: row.id || <i>*empty</i>,
          noTiket: row.noTiket == null ? <i>*empty</i> : <b>{row.noTiket}</b>,
          tglMasuk: row.tglMasuk || <i>*empty</i>,
          pintuMasuk: row.pintuMasuk || <i>*empty</i>,
          tanggalPembatalan: row.tanggalPembatalan || <i>*empty</i>,
          alasanPembatalan: row.alasanPembatalan || <i>*empty</i>,
          user: row.user || <i>*empty</i>,
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
    <div className="flex flex-col gap-4">
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}
      <EvoTitleSection
        title={titleSection}
        onExportPDF={
          // hakAksesMDPerusahaan.read == true
          //   ?
          () => setModalExportPDFOpen(true)
          // : null
        }
        onExportExcel={
          // hakAksesMDPerusahaan.read == true
          //   ?
          () => setModalExportExcel(true)
          // : null
        }
        onPrint={
          // hakAksesMDPerusahaan.read == true
          //   ?
          () => setModalExportPrint(true)
          // : null
        }
        onDateAkhir={getDefaultDateAkhir}
        onDateAwal={getDefaultDateAwal}
        onDateChange={handleDateChange}
      />
      {/* {hakAksesMDPerusahaan.read == true && ( */}
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
      {/* )} */}
      <EvoSearchTabel
        // isFilter={true}
        // FilterComponent={FilterMasProdukMember}
        placeholder="Ketik nomor tiket..."
        onSearch={(data) => console.log('Hasil pencarian:', data)}
      />

      <div className="relative">
        {isLoading && <EvoLoading />}
        <EvoTable
          id="tableToPrint"
          tableData={tableDataTransaksiBatalLaporan}
          currentPage={currentPage}
          totalPages={laporanTransaksiBatalLaporan?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </div>
    </div>
  );
}
