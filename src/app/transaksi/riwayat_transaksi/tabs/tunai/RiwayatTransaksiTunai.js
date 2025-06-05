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

const titleSection = 'Riwayat Transaksi Tunai';

export default function RiwayatTransaksiTunai({ onBack }) {
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const [modalOpenPengaduan, setModalOpenPengaduan] = useState(false);

  const handleTambahPengaduan = () => setModalOpenPengaduan(true);
  const handleTutup = () => setModalOpenPengaduan(false);

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

  /*const rows = tableDataRiwayatTransaksiTunai.rows.map((row) => ({
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

  const rows = tableDataRiwayatTransaksiTunai.rows
    .filter(
      (row) => row.jenisTransaksi === 'Tunai'
    ) // Hanya tampilkan "Tunai" dan "Manual"
    .map((row) => ({
      ...row,
      namaBank: row.namaBank ?? '-',
      nomorRekening: row.nomorRekening ?? '-',
      namaEwallet: row.namaEwallet ?? '-',
      nomorEwallet: row.nomorEwallet ?? '-',

      foto: row.foto ? (
        <EvoButton
          key={`lihatFoto-${row.no}`}
          outlined={true}
          icon={<RiImageLine />}
          onClick={() => window.open(row.foto, '_blank', 'noopener,noreferrer')}
          buttonText={'Lihat Foto'}
        />
      ) : (
        '-'
      ),

      aksi: (
        <EvoActionButtons
          rowId={row.no}
          onEdit={() => handleEdit(row.no)}
          onDelete={() => handleDelete(row.no)}
          isActive={Boolean(row.status)}
          // moreAction={titleSection}
          // customButtons={[
          //   <EvoButton
          //     key={`batalkanTransaksi-${row.no}`}
          //     onClick={() => handleProsesPerbaikan(row.no)}
          //     fillColor={colors.danger}
          //     buttonText={'Batalkan Transaksi'}
          //   />,
          // ]}
        />
      ),
    }));

  return (
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
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
        onDateAkhir={getDefaultDateAkhir}
        onDateAwal={getDefaultDateAwal}
        onDateChange={handleDateChange}
      />

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
        tableData={tableDataRiwayatTransaksiTunai}
        currentPage={1}
        totalPages={3}
        onPageChange={
          (page) => console.log('Page:', page)
          // columns={tableDataGerbang.columns} rows={rows}
        }
        rows={rows}
      />
    </EvoCardSection>
  );
}
