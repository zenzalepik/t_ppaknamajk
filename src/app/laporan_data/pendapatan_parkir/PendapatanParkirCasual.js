//PendapatanParkirCasual.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataPendapatanParkirCasual } from './tableDataPendapatanParkirCasual';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiPendapatanParkirCasual } from './api/fetchApiPendapatanParkirCasual';
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
import numbers from '@/utils/numbers';
import strings from '@/utils/strings';
import { formatRupiah } from '@/helpers/formatRupiah';
import EvoEmpty from '@/components/EvoEmpty';

const titleSection = 'Pendapatan Parkir Casual';

export default function PendapatanParkirCasual() {
  const [start_date, setStartDate] = React.useState(getDefaultDateAwal());
  const [end_date, setEndDate] = React.useState(getDefaultDateAkhir());

  const urlExport = '/data_pendapatan_parkir_casual/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const formatDate = (date) => format(date, strings.formatDate);
  const formattedStartDate = format(start_date, strings.formatDate);
  const formattedEndDate = format(end_date, strings.formatDate);

  const [searchText, setSearchText] = useState('');

  const {
    data: laporanPendapatanParkirCasual,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'laporanPendapatanParkirCasual',
      currentPage,
      formattedStartDate,
      formattedEndDate,
      searchText,
    ],
    queryFn: () =>
      fetchApiPendapatanParkirCasual({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        search: searchText,
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

  const rows =
    laporanPendapatanParkirCasual?.data?.length > 0
      ? laporanPendapatanParkirCasual.data.map((row, index) => {
          const tarifAsliInt = parseInt(row.tarif_asli ?? 0, 10);
          const potonganVoucherInt = parseInt(row.potongan_voucher ?? 0, 10);
          const tarifDibayarInt = tarifAsliInt - potonganVoucherInt;

          return {
            no: index + 1,
            tanggal: row.tanggal || <i>*empty</i>,
            idTransaksi: <b>{row.no_tiket || <i>*empty</i>}</b>,
            nopol: row.nomor_polisi || <i>*empty</i>,
            tarifAsli:
              row.id_data_member == null ? (
                row.tarif_asli != null && row.tarif_asli !== '' ? (
                  formatRupiah(
                    typeof row.tarif_asli === 'string'
                      ? parseInt(row.tarif_asli)
                      : row.tarif_asli
                  )
                ) : (
                  <EvoEmpty />
                )
              ) : (
                'Rp. 0'
              ),
            namaVoucher: row.nama_voucher || <i>-</i>,
            potonganVoucher:
              row.id_data_member == null ? (
                row.potongan_voucher != null ? (
                  `Rp ${potonganVoucherInt.toLocaleString('id-ID')}`
                ) : (
                  <i>-</i>
                )
              ) : (
                'Rp. 0'
              ),
            tarifDibayar:
              row.id_data_member == null ? (
                <span>{`Rp ${tarifDibayarInt.toLocaleString('id-ID')}`}</span>
              ) : (
                'Rp. 0'
              ),
            pembayaran: row.pembayaran || <i>*empty</i>,
          };
        })
      : [];

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
        {/* {JSON.stringify(laporanPendapatanParkirCasual?.data)} */}
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
          buttonText="Pencarian"
          onSearch={handleSearch}
        />
        <div className="relative">
          {isLoading && <EvoLoading />}
          <EvoTable
            id="tableToPrint"
            tableData={tableDataPendapatanParkirCasual}
            currentPage={currentPage}
            totalPages={laporanPendapatanParkirCasual?.totalPages}
            onPageChange={handlePageChange}
            rows={rows}
          />
        </div>
      </EvoCardSection>
    </>
  );
}
