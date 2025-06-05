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
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiBantuanTiketPermasalahanPerbaikan } from './api/fetchApiBantuanTiketPermasalahanPerbaikan.js';
import {fetchApiBantuanTiketDelete} from './api/fetchApiBantuanTiketDelete';

const titleSection = 'Data Pengaduan';

export default function PengaduanSection({ onBack }) {
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: bantuanTiketPermasalahanPerbaikan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bantuanTiketPermasalahanPerbaikan', currentPage],
    queryFn: () =>
      fetchApiBantuanTiketPermasalahanPerbaikan({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page); // trigger TanStack React Query re-fetch dengan page baru
  };

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

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
        await fetchApiBantuanTiketDelete(id, setNotifMessage, setNotifType);
    
        // ✅ Pastikan data diperbarui secara real-time
        queryClient.invalidateQueries(['masterDataPerusahaan']);
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

  const dataApi = bantuanTiketPermasalahanPerbaikan || {};

  const rows =
    bantuanTiketPermasalahanPerbaikan?.data?.length > 0
      ? bantuanTiketPermasalahanPerbaikan.data.map((row, index) => ({
          no: index + 1,
          judul: <b>{row.judul_permasalahan || <i>*empty</i>}</b>,
          tanggal_masalah: row.tanggal_permasalahan || (
            <i>*empty</i>
          ),
          // tanggal_masalah: new Date(row.tanggal_permasalahan).toLocaleString() || (
          //   <i>*empty</i>
          // ),
          kategori_masalah: row.kategori_permasalahan || <i>*empty</i>,
          pos: (row.pos.kode + ' (' + row.pos.tipe_pos + ') ')  || <i>*empty</i>,
          alat_bermasalah: row.hardware_atau_alat || <i>*empty</i>,
          penyebab: row.penyebab_permasalahan || <i>tidak diketahui</i>,
          keterangan_masalah: row.keterangan_permasalahan || <i>*empty</i>,
          pelapor: row.nama_pelapor|| <i>*empty</i>,
          tanggal_perbaikan: row.tanggal_perbaikan || <i>*empty</i>,
          jenis_perbaikan: row.jenis_perbaikan || <i>*empty</i>,
          penanganan: row.penanganan || <i>*empty</i>,
          keterangan_perbaikan: row.keterangan_penanganan || <i>*empty</i>,
          yang_menangani: row.nama_yang_menangani || <i>*empty</i>,
          status: StatusLabel.permasalahanPerbaikan(row.status_perbaikan) || (
            <i>*empty</i>
          ),
          // added: new Date(row.createdAt).toLocaleString() || (
          //   <i>*empty</i>
          // ),
          // updated: new Date(row.updatedAt).toLocaleString() || (
          //   <i>*empty</i>
          // ),
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={() => handleEdit(row.id)}
              onDelete={() => handleDelete(row.id)}
              // isActive={row.status}
              // onAktifkan={() => console.log('Aktifkan', row.id)}
              // onNonAktifkan={() => console.log('NonAktifkan', row.id)}
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
        }))
      : [];

  // const rows = tableDataPengaduan.rows.map((row) => ({
  //   ...row,
  //   status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
  //   aksi: (
  //     <EvoActionButtons
  //       rowId={row.no}
  //       // onPerpanjang={() => handlePerpanjang(row.no)}
  //       // onGantiKartu={() => handleGantiKartu(row.no)}
  //       // onGantiNomorPolisi={() => handleGantiNomorPolisi(row.no)}
  //       // onRiwayatTransaksi={() => handleRiwayatTransaksi(row.no)}
  //       onEdit={() => handleEdit(row.no)}
  //       onDelete={() => handleDelete(row.no)}
  //       // onMore={() => handleMore(row.no)}
  //       isActive={row.status === 'Aktif'} // Status member digunakan sebagai indikator aktif/non-aktif
  //       // onAktifkan={() => console.log('Aktifkan', row.no)}
  //       // onNonAktifkan={() => console.log('NonAktifkan', row.no)}
  //       moreAction={titleSection}
  //       customButtons={[
  //         <EvoButton
  //           key="prosesPerbaikan"
  //           onClick={() => handleProsesPerbaikan(row.no)}
  //           buttonText={'Proses Data Perbaikan'}
  //         />,
  //       ]}
  //     />
  //   ),
  // }));

  return (
    <EvoCardSection>
      {/* <div className="mb-1" /> */}
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
        // FilterComponent={FilterMasProdukMember}
        placeholder="Ketik nama judul masalah atau jenis perbaikan..."
        onSearch={(data) => console.log('Hasil pencarian:', data)}
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
        currentPage={currentPage}
        totalPages={dataApi?.totalPages}
        onPageChange={handlePageChange}
        rows={rows}
      />
    </EvoCardSection>
  );
}
