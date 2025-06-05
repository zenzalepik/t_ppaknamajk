//DataPenggunaSection.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddDataPenggunaForm from './forms/AddForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataPengguna } from './tableDataPengguna';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasDataPengguna from './FilterMasDataPengguna';
import { fetchApiMasterDataDataPengguna } from './api/fetchApiMasterDataDataPengguna';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const titleSection = 'Data Pengguna';

export default function DataPenggunaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: masterDataDataPengguna,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataPengguna', currentPage],
    queryFn: () =>
      fetchApiMasterDataDataPengguna({
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

    await fetchApiMasterDataPerusahaanDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataDataPengguna']); // logic delete
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

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  const dataApi = masterDataDataPengguna || {};

  const rows =
    masterDataDataPengguna?.data?.length > 0
      ? masterDataDataPengguna.data.map((row, index) => ({
          no: index + 1,
          nama: <b>{row.nama || <i>*empty</i>}</b>,
          jenkel: row.jenis_kelamin || <i>*empty</i>,
          noHp: row.no_hp || <i>*empty</i>,
          alamat: row.alamat_lengkap || <i>*empty</i>,
          level: row.level_akses!=null?(row.level_akses.nama || <i>*empty</i>): <i>*empty</i>,
          status: StatusLabel.status(row.status) || <i>*empty</i>,
          added: new Date(row.createdAt).toLocaleString() || <i>*empty</i>,
          updated: new Date(row.updatedAt).toLocaleString() || <i>*empty</i>,

          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={() => handleEdit(row.id)}
              onDelete={() => handleDelete(row.id)}
              isActive={row.status}
              onAktifkan={() => console.log('Aktifkan', row.id)}
              onNonAktifkan={() => console.log('NonAktifkan', row.id)}
            />
          ),
        
        }
        )
      )
      : [];

  // const rows = tableDataPengguna.rows.map((row) => ({
  //   ...row,
  //   aksesTiket: StatusLabel.status(row.aksesTiket), // Konversi akses tiket menjadi elemen visual
  //   aksesKartu: StatusLabel.status(row.aksesKartu), // Konversi akses kartu menjadi elemen visual
  //   status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
  //   aksi: (
  //     <EvoActionButtons
  //       rowId={row.aksi}
  //       // onPerpanjang={() => handlePerpanjang(row.aksi)}
  //       // onGantiKartu={() => handleGantiKartu(row.aksi)}
  //       // onGantiNomorPolisi={() => handleGantiNomorPolisi(row.aksi)}
  //       // onRiwayatTransaksi={() => handleRiwayatTransaksi(row.aksi)}
  //       onEdit={() => handleEdit(row.aksi)}
  //       onDelete={() => handleDelete(row.aksi)}
  //       // onMore={() => handleMore(row.aksi)}
  //       isActive={row.status == true} // Status member digunakan sebagai indikator aktif/non-aktif
  //       onAktifkan={() => console.log('Aktifkan', row.aksi)}
  //       onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
  //       // moreAction={titleSection}
  //     />
  //   ),
  // }));

  return (
    <EvoCardSection>
      <EvoTitleSection
        title={titleSection}
        // radioItems={radioItems}
        // monthNames={monthNames}
        // years={years}
        handleChange={handleChange}
        buttonText={`Tambah ${titleSection}`}
        onButtonClick={handleTambah}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
      />
      <EvoSearchTabel
        // isFilter={true}
        // FilterComponent={FilterMasDataPengguna}
        placeholder="Ketik nama pengguna..."
        onSearch={(data) => console.log('Hasil pencarian:', data)}
      />

      <AddDataPenggunaForm
        isOpen={modalOpen}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />
      <EvoTable
        id="tableToPrint"
        tableData={tableDataPengguna}
        currentPage={currentPage}
        totalPages={dataApi?.totalPages}
        onPageChange={handlePageChange}
        rows={rows}
      />
    </EvoCardSection>
  );
}
