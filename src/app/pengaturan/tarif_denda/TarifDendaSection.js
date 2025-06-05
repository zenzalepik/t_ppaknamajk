//TarifDendaSection.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddTarifDendaForm from './forms/AddForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataTarifDenda } from './tableDataTarifDenda';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import { fetchApiPengaturanTarifDenda } from './api/fetchApiPengaturanTarifDenda';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';

const titleSection = 'Tarif Denda';

export default function TarifDendaSection() {
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
    data: pengaturanTarifDenda,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanTarifDenda', currentPage],
    queryFn: () =>
          fetchApiPengaturanTarifDenda({
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

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // const handleDelete = async(id) => {
  //   console.log('Hapus ID:', id);
  //       await fetchApiMasterDataPerusahaanDelete(id, setNotifMessage, setNotifType);
    
  //       // ✅ Pastikan data diperbarui secara real-time
  //       queryClient.invalidateQueries(['masterDataPerusahaan']);
  //   // logic delete
  // };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  /*const rows = tableDataTarifDenda.rows.map((row) => ({
      ...row,
      dendaUntukMember: StatusLabel.untukMember(row.dendaUntukMember),
      status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
      aksi: (
        <EvoActionButtons
          rowId={row.aksi}
          onPerpanjang={() => handlePerpanjang(row.aksi)}
          onGantiKartu={() => handleGantiKartu(row.aksi)}
          onGantiNomorPolisi={() => handleGantiNomorPolisi(row.aksi)}
          onRiwayatTransaksi={() => handleRiwayatTransaksi(row.aksi)}
          onEdit={() => handleEdit(row.aksi)}
          onDelete={() => handleDelete(row.aksi)}
          // onMore={() => handleMore(row.aksi)}
          isActive={row.status == true} // Status member digunakan sebagai indikator aktif/non-aktif
        onAktifkan={() => console.log('Aktifkan', row.aksi)}
        onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
          moreAction={titleSection}
        />
      ),
    }));*/

  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  const dataApi = pengaturanTarifDenda || {};

  const rows =pengaturanTarifDenda?.data?.length > 0
      ?
    pengaturanTarifDenda?.data?.map((row, index) => ({
      no: index + 1,
      kendaraan: (
        <b>
          {row.kendaraan
            ? `${row.kendaraan.nama_kendaraan} (${row.kendaraan.tipe_kendaraan})`
            : 'Tidak ditemukan'}
        </b>
      ),
      tarifDendaTiket:
        row.denda_tiket != null
          ? `Rp ${row.denda_tiket.toLocaleString()}`
          : '-',
      tarifDendaSTNK:
        row.denda_stnk != null ? `Rp ${row.denda_stnk.toLocaleString()}` : '-',
      dendaUntukMember: StatusLabel.isDendaMember(row.denda_member),
      status: StatusLabel.status(row.status),
      // status:  StatusLabel.status(true),
      updated: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-',
      // added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
      aksi: (
        <EvoActionButtons
          rowId={row.id}
          onEdit={() => handleEdit(row.id)}
          isActive={row.status}
          onAktifkan={() => console.log('Aktifkan', row.id)}
          onNonAktifkan={() => console.log('NonAktifkan', row.id)}
        />
      ),
    })) : [];

  return (
    <EvoCardSection>
      <EvoTitleSection
        title={titleSection}
        handleChange={handleChange}
        buttonText={`Tambah ${titleSection}`}
        onButtonClick={handleTambah}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
      />

      <AddTarifDendaForm
        isOpen={modalOpen}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />
      <EvoTable
        id="tableToPrint"
        tableData={tableDataTarifDenda}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
        rows={rows}
      />
    </EvoCardSection>
  );
}
