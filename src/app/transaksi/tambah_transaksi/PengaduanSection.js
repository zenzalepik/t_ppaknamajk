//PengaduanSection.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTableMulti from '@/components/evosist_elements/EvoTableMulti';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditProsesPerbaikanForm from './forms/EditForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataPengaduan } from './tableDataPengaduan';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukMember from './FilterMasProdukMember';
import EvoButton from '@/components/evosist_elements/EvoButton';

const titleSection = 'Data Pengaduan';

export default function PengaduanSection({ onBack }) {
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

  const rows = tableDataPengaduan.rows.map((row) => ({
    ...row,
    status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
    aksi: (
      <EvoActionButtons
        rowId={row.no}
        // onPerpanjang={() => handlePerpanjang(row.no)}
        // onGantiKartu={() => handleGantiKartu(row.no)}
        // onGantiNomorPolisi={() => handleGantiNomorPolisi(row.no)}
        // onRiwayatTransaksi={() => handleRiwayatTransaksi(row.no)}
        onEdit={() => handleEdit(row.no)}
        onDelete={() => handleDelete(row.no)}
        // onMore={() => handleMore(row.no)}
        isActive={row.status === 'Aktif'} // Status member digunakan sebagai indikator aktif/non-aktif
        // onAktifkan={() => console.log('Aktifkan', row.no)}
        // onNonAktifkan={() => console.log('NonAktifkan', row.no)}
        moreAction={titleSection}
        customButtons={[
          <EvoButton
            key="prosesPerbaikan"
            onClick={() => handleProsesPerbaikan(row.no)}
            buttonText={'Proses Data Perbaikan'}
          />,
        ]}
      />
    ),
  }));

  return (
    <EvoCardSection>
      <div className="mb-1" />
      <EvoSearchTabel
        isFilter={true}
        FilterComponent={FilterMasProdukMember}
        placeholder="Ketik nama judul masalah atau jenis perbaikan..."
        onSearch={(data) => console.log('Hasil pencarian:', data)}
      />
      <EvoTitleSection
        title={titleSection}
        // radioItems={radioItems}
        // monthNames={monthNames}
        // years={years}
        onBack={onBack}
        handleChange={handleChange}
        // buttonText={titleSection}
        borderTop={true}
        // onButtonClick={handleTambah}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
      />

      <EditProsesPerbaikanForm
        isOpen={modalOpenPengaduan}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />
      <EvoTableMulti
        id="tableToPrint"
        tableData={tableDataPengaduan}
        textRight="Perbaikan"
        textLeft="Masalah"
        orangeEndIndex={8}
        blackStartIndex={9}
        currentPage={1}
        totalPages={3}
        onPageChange={
          (page) => console.log('Page:', page)
          // columns={tableDataPengaduan.columns} rows={rows}
        }
        rows={rows}
      />
    </EvoCardSection>
  );
}
