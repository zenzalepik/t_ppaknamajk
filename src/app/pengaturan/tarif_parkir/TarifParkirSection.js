//TarifParkirSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditTarifParkirForm from './forms/EditForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataTarifParkir } from './tableDataTarifParkir';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiPengaturanTarifParkir } from './api/fetchApiPengaturanTarifParkir';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';

const titleSection = 'Tarif Parkir';

export default function TarifParkirSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleTutup = () => setModalOpen(false);
  const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const [selectedData, setSelectedData] = useState(null);

  const {
    data: pengaturanTarifParkir,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanTarifParkir', currentPage],
    queryFn: () =>
      fetchApiPengaturanTarifParkir({
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
    // console.log('Tombol Edit diklik untuk ID:', id);
    const dataDipilih = pengaturanTarifParkir?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      setSelectedData({
        id: dataDipilih.id,
        tipeKendaraan: dataDipilih.kendaraan?.nama_kendaraan || '',
        kendaraan_id: dataDipilih.kendaraan_id,
        grace_period: String(dataDipilih.grace_period),
        tarif_grace_period: String(dataDipilih.tarif_grace_period || '0'),
        rotasi_pertama: String(dataDipilih.rotasi_pertama || ''),
        tarif_rotasi_pertama: String(dataDipilih.tarif_rotasi_pertama || ''),
        rotasi_kedua: String(dataDipilih.rotasi_kedua || ''),
        tarif_rotasi_kedua: String(dataDipilih.tarif_rotasi_kedua || ''),
        rotasi_ketiga: String(dataDipilih.rotasi_ketiga || ''),
        tarif_rotasi_ketiga: String(dataDipilih.tarif_rotasi_ketiga || ''),
        tarif_maksimal: String(dataDipilih.tarif_maksimal || ''),
      });
      setModalOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  /*const rows = tableDataTarifParkir.rows.map((row) => ({
    ...row,
    // kamera1: StatusLabel.kamera(row.kamera1),
    // kamera2: StatusLabel.kamera(row.kamera2),
    // otorisasi: StatusLabel.otorisasi(row.otorisasi),
    aksi: (
      <EvoActionButtons
        rowId={row.aksi}
        onEdit={handleEdit}
        // onDelete={handleDelete}
        isActive={row.otorisasi} // atau row.kamera1 jika itu yang dianggap status aktifnya
        // onAktifkan={() => console.log('Aktifkan', row.aksi)}
        // onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
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

  const dataApi = pengaturanTarifParkir || {};

  const rows =
    pengaturanTarifParkir?.data?.length > 0
      ? pengaturanTarifParkir?.data?.map((row, index) => ({
          no: index + 1,
          tipeKendaraan: (
            <b>
              {row.kendaraan
                ? `${row.kendaraan.nama_kendaraan} (${row.kendaraan.tipe_kendaraan})`
                : 'Tidak ditemukan'}
            </b>
          ),
          toleransiWaktu: row.grace_period + ' menit',
          tarifRotasiPertama:
            row.tarif_rotasi_pertama != null
              ? `Rp ${row.tarif_rotasi_pertama.toLocaleString()}`
              : '-',
          tarifRotasiKedua:
            row.tarif_rotasi_kedua != null
              ? `Rp ${row.tarif_rotasi_kedua.toLocaleString()}`
              : '-',
          tarifRotasiKetiga:
            row.tarif_rotasi_ketiga != null
              ? `Rp ${row.tarif_rotasi_ketiga.toLocaleString()}`
              : '-',
          tarifMaksimal:
            row.tarif_maksimal != null
              ? `Rp ${row.tarif_maksimal.toLocaleString()}`
              : '-',
          updated: row.updatedAt
            ? new Date(row.updatedAt).toLocaleString()
            : '-',
          // added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={() => handleEdit(row.id)}
            />
          ),
        }))
      : [];

  return (
    <EvoCardSection>
      <EvoTitleSection
        title={titleSection}
        handleChange={handleChange}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
      />
      <EditTarifParkirForm
        isOpen={modalOpen}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
        initialData={selectedData}
      />
      <EvoTable
        id="tableToPrint"
        tableData={tableDataTarifParkir}
        currentPage={currentPage}
        totalPages={dataApi?.totalPages}
        onPageChange={handlePageChange}
        rows={rows}
      />
    </EvoCardSection>
  );
}
