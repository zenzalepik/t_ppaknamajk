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
import EvoEmpty from '@/components/EvoEmpty';
import numbers from '@/utils/numbers';
import hideNotFinished from '@/utils/hideNotFinished';
import strings from '@/utils/strings';

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

  const formatDate = (date) => format(date, strings.formatDate);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const formattedStartDate = format(start_date, strings.formatDate);
  const formattedEndDate = format(end_date, strings.formatDate);

  const [searchText, setSearchText] = useState('');

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
      searchText,
    ],
    queryFn: () =>
      fetchApiTransaksiBatalLaporan({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        search: searchText,
      }),
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
      format(prevDates.current.end, strings.formatDate) !==
        format(end, strings.formatDate)
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
  console.log(JSON.stringify(laporanTransaksiBatalLaporan));
  const rows =
    laporanTransaksiBatalLaporan?.data?.length > 0
      ? laporanTransaksiBatalLaporan.data.map((row, index) => ({
          no: index + 1,
          noTiket: row.no_tiket ? <b>{row.no_tiket}</b> : <EvoEmpty />,
          tglMasuk: row.tanggal_masuk || <EvoEmpty />,
          pintuMasuk: row.pintu_masuk?.keterangan || <EvoEmpty />, // ✅ ini menampilkan nama pintu          tanggalPembatalan: row.tanggal_pembatalan || <EvoEmpty />,
          tanggalPembatalan: <b>{row?.tanggal_pembatalan || <EvoEmpty />}</b>,
          alasanPembatalan: row.alasan_pembatalan || <EvoEmpty />,
          penjelasanPembatalan: row.penjelasan_pembatalan || <EvoEmpty />,
          user: row.user?.nama || <EvoEmpty />,
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
      {/* {JSON.stringify(laporanTransaksiBatalLaporan)} */}
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
      {!hideNotFinished.evoSearchTabel_TransaksiBatalContentLaporan && (
        <EvoSearchTabel
          // isFilter={true}
          // FilterComponent={FilterMasProdukMember}
          placeholder="Ketik nomor tiket..."
          buttonText="Pencarian"
          onSearch={handleSearch}
        />
      )}

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
