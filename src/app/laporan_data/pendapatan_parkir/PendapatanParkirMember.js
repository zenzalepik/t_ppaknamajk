//PendapatanParkirMember.js
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

const titleSection = 'Pendapatan Parkir Member';

export default function PendapatanParkirMember() {
  const urlExport = '/data_pendapatan_parkir_member/';
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
    data: laporanPendapatanParkirMember,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanPendapatanParkirMember', currentPage],
    queryFn: () =>
      fetchApiPendapatanParkirMember({
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
    laporanPendapatanParkirMember?.data?.length > 0
      ? laporanPendapatanParkirMember.data.map((row, index) => ({
          no: index + 1,
          // noTiket: <b>{row.noTiket != null ? row.noTiket : <i>*empty</i>}</b>,
          // id: row.id || <i>*empty</i>,
          tanggal: row.tanggal || <i>*empty</i>,
          kategori: row.kategori || <i>*empty</i>,
          idTransaksi: row.idTransaksi || <i>*empty</i>,
          nopol: row.nopol || <i>*empty</i>,
          namaMember: row.namaMember || <i>*empty</i>,
          tarifAsli: row.tarifAsli || <i>*empty</i>,
          namaVoucher: row.namaVoucher || <i>*empty</i>,
          potonganVoucher: row.potonganVoucher || <i>*empty</i>,
          tarifDibayar: row.tarifDibayar || <i>*empty</i>,
          pembayaran: row.pembayaran || <i>*empty</i>,
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

        <EvoTable
          id="tableToPrint"
          tableData={tableDataPendapatanParkirMember}
          currentPage={currentPage}
          totalPages={laporanPendapatanParkirMember?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
