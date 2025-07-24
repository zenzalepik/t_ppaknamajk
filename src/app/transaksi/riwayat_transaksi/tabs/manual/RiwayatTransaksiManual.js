//RiwayatTransaksiManual.js
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
import { tableDataRiwayatTransaksiManual } from './tableDataRiwayatTransaksiManual';
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
import { fetchApiRiwayatTransaksiManual } from './api/fetchApiRiwayatTransaksiManual';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Riwayat Transaksi Manual';

export default function RiwayatTransaksiManual({ onBack }) {
  const urlExport = '/riwayat_transaksi_manual/';
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

  const {
    data: laporanRiwayatTransaksiManual,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanRiwayatTransaksiManual', currentPage],
    queryFn: () =>
      fetchApiRiwayatTransaksiManual({
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
    console.log('Hasil pencarian:', query);
  };

  /*const rows = tableDataRiwayatTransaksiManual.rows.map((row) => ({
    ...row,
    // status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
    // member: row.member ? 'Ya' : 'Tidak',
    // manualInput: row.manualInput ? 'Ya' : 'Tidak',
    // kartuMember: row.kartuMember ? 'Ya' : 'Tidak',
    // Menampilkan "-" untuk nilai yang null
    // namaBank: row.namaBank ?? '-',
    // nomorRekening: row.nomorRekening ?? '-',
    // namaEwallet: row.namaEwallet ?? '-',
    // nomorEwallet: row.nomorEwallet ?? '-',
    // Tampilkan link jika `row.foto` memiliki isi, jika tidak tampilkan "-"
    // foto: row.foto ? (
    //   <EvoButton
    //     key={`prosesPerbaikan-${row.no}`}
    //     outlined={true}
    //     icon={<RiImageLine />}
    //     onClick={() => window.open(row.foto, '_blank', 'noopener,noreferrer')}
    //     buttonText={'Lihat Foto'}
    //   />
    // ) : (
    //   '-'
    // ),

    // aksi: (
    //   <EvoActionButtons
    //     rowId={row.no}
        // onEdit={() => handleEdit(row.no)}
        // onDelete={() => handleDelete(row.no)}
        // isActive={Boolean(row.status)} // Pastikan boolean dikirim dengan benar
    //     moreAction={titleSection}
    //     customButtons={[
    //       <EvoButton
    //         key={`prosesPerbaikan-${row.no}`}
    //         onClick={() => handleProsesPerbaikan(row.no)}
    //         fillColor={colors.danger}
    //         buttonText={'Batalkan Transaksi'}
    //       />,
    //     ]}
    //   />
    // ),
  }));*/

  // const rows = tableDataRiwayatTransaksiManual.rows

  //   }));

  // row.jenisTransaksi === 'Manual'
  const rows =
    laporanRiwayatTransaksiManual?.data?.length > 0
      ? laporanRiwayatTransaksiManual.data
          .filter((row) => row.jenisTransaksi === 'Manual')
          .map((row, index) => ({
            no: index + 1,
            // id: row.id || <i>*empty</i>,
            // no: row.no || <i>*empty</i>,

            // id: row.id || <i>*empty</i>,
            // no: row.no || <i>*empty</i>,
            nomorTiket: row.nomorTiket || <i>*empty</i>,
            waktuMasuk: row.waktuMasuk || <i>*empty</i>,
            gerbangMasuk: row.gerbangMasuk || <i>*empty</i>,
            jenisKendaraan: row.jenisKendaraan || <i>*empty</i>,
            nomorPolisi: row.nomorPolisi || <i>*empty</i>,
            waktuKeluar: row.waktuKeluar || <i>*empty</i>,
            pintuKeluar: row.pintuKeluar || <i>*empty</i>,
            durasiParkir: row.durasiParkir || <i>*empty</i>,
            denda: row.denda || <i>*empty</i>,
            totalPembayaran: row.totalPembayaran || <i>*empty</i>,
            jenisTransaksi: row.jenisTransaksi || <i>*empty</i>,
            added: row.added || <i>*empty</i>,
            updated: row.updated || <i>*empty</i>,
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
          onSearch={(data) => console.log('Hasil pencarian:', data)}
        />

        {/* <PembatalanTansaksiForm
        isOpen={modalOpenPengaduan}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      /> */}

        <EvoTable
          id="tableToPrint"
          tableData={tableDataRiwayatTransaksiManual}
          currentPage={currentPage}
          totalPages={laporanRiwayatTransaksiManual?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
