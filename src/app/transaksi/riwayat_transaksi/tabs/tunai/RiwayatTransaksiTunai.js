//RiwayatTransaksiTunai.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTableMulti from '@/components/evosist_elements/EvoTableMulti';
import {
  RiImageLine,
  RiAddLargeLine,
  RiSearchLine,
  RiUser3Line,
} from '@remixicon/react';
// import PembatalanTansaksiForm from './forms/PembatalanTansaksiForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataRiwayatTransaksiTunai } from './tableDataRiwayatTransaksiTunai';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukMember from './FilterMasProdukMember';
import EvoButton from '@/components/evosist_elements/EvoButton';
import EvoTable from '@/components/evosist_elements/EvoTable';
import colors from '@/utils/colors';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiRiwayatTransaksiTunai } from './api/fetchApiRiwayatTransaksiTunai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';
import numbers from '@/utils/numbers';
import EvoEmpty from '@/components/EvoEmpty';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import EvoLoading from '@/components/EvoLoading';

const titleSection = 'Riwayat Transaksi Tunai';

export default function RiwayatTransaksiTunai({ onBack }) {
  const urlExport = '/riwayat_transaksi_tunai/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const [modalOpenPengaduan, setModalOpenPengaduan] = useState(false);

  const handleTambahPengaduan = () => setModalOpenPengaduan(true);
  const handleTutup = () => setModalOpenPengaduan(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [searchText, setSearchText] = useState('');

  const {
    data: laporanRiwayatTransaksiTunai,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanRiwayatTransaksiTunai', currentPage,searchText],
    queryFn: () =>
      fetchApiRiwayatTransaksiTunai({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        search: searchText, 
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

  // Fungsi untuk edit data
  const handleEdit = (id) => {
    console.log('Tombol Edit diklik untuk ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  // const [confirmMoreId, setConfirmMoreId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = (id) => {
    console.log('Hapus ID:', id);
    setConfirmDeleteId(null); // tutup tooltip
    // logic delete
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handlePerpanjang = (id) => {
    console.log('Perpanjang ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleGantiKartu = (id) => {
    console.log('Ganti Kartu ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleGantiNomorPolisi = (id) => {
    console.log('Ganti Nomor Polisi ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleRiwayatTransaksi = (id) => {
    console.log('Riwayat Transaksi ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleProsesPerbaikan = (id) => {
    console.log('Riwayat Transaksi ID:', id);
    handleTambahPengaduan();
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    // setShowTabel(true);
    setSearchText(query.searchText); // simpan input pencarian
    setCurrentPage(1); // reset ke halaman pertama
  };

  const rows =
    laporanRiwayatTransaksiTunai?.data?.length > 0
      ? laporanRiwayatTransaksiTunai.data
          // .filter((row) => row.jenisTransaksi === 'Tunai')
          .map((row, index) => {
            const formatTanggal = (value) => {
              return value ? (
                format(new Date(value), 'dd MMMM yyyy - HH:mm', { locale: id })
              ) : (
                <EvoEmpty />
              );
            };

            const formatRupiah = (value) => {
              return value !== null && value !== undefined
                ? new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(value)
                : '-';
            };

            return {
              no: index + 1,
              nomorTiket: <b>{row.nomor_tiket}</b> || <EvoEmpty />,
              waktuMasuk: formatTanggal(row?.waktu_masuk),
              gerbangMasuk: row.gerbang_masuk || <EvoEmpty />,
              jenisKendaraan: row.jenis_kendaraan || <EvoEmpty />,
              nomorPolisi: row.nomor_polisi || <EvoEmpty />,
              waktuKeluar: formatTanggal(row?.waktu_keluar),
              pintuKeluar: row.pintu_keluar || <EvoEmpty />,
              durasiParkir: row.durasi_parkir || <EvoEmpty />,
              denda: formatRupiah(row?.denda),
              totalPembayaran: formatRupiah(row?.total_pembayaran),
              jenisTransaksi: row.jenis_transaksi || <EvoEmpty />,
              added: formatTanggal(row?.added),
              updated: formatTanggal(row?.updated),
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
          // radioItems={radioItems}
          // monthNames={monthNames}
          // years={years}
          onBack={onBack}
          handleChange={handleChange}
          // buttonText={titleSection}
          // borderTop={true}
          // onButtonClick={handleTambah}
          icon={<RiAddLargeLine size={16} />}
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
          FilterComponent={FilterMasProdukMember}
          placeholder="Ketik nomor tiket..."
          onSearch={handleSearch}
        />

        {/* <PembatalanTansaksiForm
        isOpen={modalOpenPengaduan}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      /> */}
        {/* {searchText == '' ? (
          <div className="text-2xl text-black/20 text-center bg-black/[0.025] rounded-[20px] py-32">
            Ketik Pencarian Untuk Menampilkan Data
          </div>
        ) : ( */}
          <div className="relative">
            {isLoading && <EvoLoading />}
            <EvoTable
              id="tableToPrint"
              tableData={tableDataRiwayatTransaksiTunai}
              currentPage={currentPage}
              totalPages={laporanRiwayatTransaksiTunai?.totalPages}
              onPageChange={handlePageChange}
              rows={rows}
            />
          </div>
        {/* )} */}
      </EvoCardSection>
    </>
  );
}
