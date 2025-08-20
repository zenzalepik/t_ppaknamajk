//PendapatanParkirMember.js
'use client';

import React, { useEffect, useState } from 'react';
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
import { tableDataPendapatanParkirMember } from './tableDataPendapatanParkirMember';
// import {tableDataKendaraan} from './tableDataPendapatanParkirMember';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterLapPendapatanParkir from './FilterLapPendapatanParkir';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiUpload2Line } from '@remixicon/react';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiPendapatanParkirMember } from './api/fetchApiPendapatanParkirMember';
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

const titleSection = 'Pendapatan Parkir Member';

export default function PendapatanParkirMember() {
  const [start_date, setStartDate] = React.useState(getDefaultDateAwal());
  const [end_date, setEndDate] = React.useState(getDefaultDateAkhir());

  const urlExport = '/data_pendapatan_parkir_member/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const formatDate = (date) => format(date, 'dd-MM-yyyy');

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const formattedStartDate = format(start_date, 'MM-dd-yyyy');
  const formattedEndDate = format(end_date, 'MM-dd-yyyy');

  const [searchKeyword, setSearchKeyword] = useState('');

  const {
    data: laporanPendapatanParkirMember,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'laporanPendapatanParkirMember',
      currentPage,
      formattedStartDate,
      formattedEndDate,
      searchKeyword,
    ],
    queryFn: () =>
      fetchApiPendapatanParkirMember({
        limit: 13,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        search: searchKeyword,
      }),
    retry: false,
    keepPreviousData: true,
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
    laporanPendapatanParkirMember?.data?.length > 0
      ? laporanPendapatanParkirMember.data.map((row, index) => {
          const tarifAsliInt = parseInt(row.tarif_asli ?? 0, 10);
          const potonganVoucherInt = parseInt(row.potongan_voucher ?? 0, 10);
          const tarifDibayarInt = tarifAsliInt - potonganVoucherInt;

          return {
            no: index + 1,
            // noTiket: <b>{row.noTiket != null ? row.noTiket : <i>*empty</i>}</b>,
            // id: row.id || <i>*empty</i>,
            tanggal: row.tanggal ? (
              new Date(row.tanggal).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            ) : (
              <i>*empty</i>
            ),
            // kategori: row.kategori || <i>*empty</i>,
            idTransaksi: row.no_tiket || <i>*empty</i>,
            nopol: row.nopol || <i>*empty</i>,
            namaMember: row.nama_member || <i>*empty</i>,
            tarifAsli:
              row.tarif_asli != null ? (
                `Rp ${parseInt(row.tarif_asli, 10).toLocaleString('id-ID')}`
              ) : (
                <i>*empty</i>
              ),
            namaVoucher: row.nama_voucher || <i>-</i>,
            potonganVoucher:
              row.potongan_voucher != null ? (
                `Rp ${potonganVoucherInt.toLocaleString('id-ID')}`
              ) : (
                <i>-</i>
              ),
            tarifDibayar: (
              <span>{`Rp ${tarifDibayarInt.toLocaleString('id-ID')}`}</span>
            ),
            //row.tarifDibayar || <i>*empty</i>
            // tarifDibayar: tarifDibayarInt,
            pembayaran: row.metode_pembayaran || <i>*empty</i>,
          };
        })
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
        <EvoTitleSection
          title={titleSection}
          onExportPDF={
            // hakAksesMDPe.read == true
            //   ?
            () => setModalExportPDFOpen(true)
            // : null
          }
          onExportExcel={
            // hakAksesMDPe.read == true
            //   ?
            () => setModalExportExcel(true)
            // : null
          }
          onPrint={
            // hakAksesMDPe.read == true
            //   ?
            () => setModalExportPrint(true)
            // : null
          }
          onDateAkhir={getDefaultDateAkhir}
          onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}
        />
        {/* {hakAksesMDPe.read == true && ( */}
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
          placeholder="Ketik nomor tiket..."
          onSearch={(data) => console.log('Hasil pencarian:', data)}
        />

        <div className="relative">
          {isLoading && <EvoLoading />}
          <EvoTable
            id="tableToPrint"
            tableData={tableDataPendapatanParkirMember}
            currentPage={currentPage}
            totalPages={laporanPendapatanParkirMember?.totalPages}
            onPageChange={handlePageChange}
            rows={rows}
          />
        </div>
      </EvoCardSection>
    </>
  );
}
