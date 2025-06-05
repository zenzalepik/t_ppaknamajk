//ParameterSection.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditParameterForm from './forms/EditForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataParameter } from './tableDataParameter';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import { fetchApiPengaturanParameter } from './api/fetchApiPengaturanParameter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';

const titleSection = 'Parameter';

export default function ParameterSection() {


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
    data: pengaturanParameter,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanParameter', currentPage],
    queryFn: () =>fetchApiPengaturanParameter({
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
    handleTambah();
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = (id) => {
    console.log('Hapus ID:', id);
    setConfirmDeleteId(null); // tutup tooltip
    // logic delete
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  /*  const rows = tableDataParameter.rows.map((row) => ({
    ...row,
    // kamera1: StatusLabel.kamera(row.kamera1),
    // kamera2: StatusLabel.kamera(row.kamera2),
    // otorisasi: StatusLabel.otorisasi(row.otorisasi),
    aksi: (
      <EvoActionButtons
        rowId={row.aksi}
        onEdit={() => handleEdit(row.no)}
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
  const dataApi = pengaturanParameter || {};


  const rows =
    pengaturanParameter?.data?.length > 0
      ? pengaturanParameter.data.map((row, index) => ({
          no: index + 1,
          nama: row.nama,
          nilai: row.nilai,
          keterangan: row.keterangan,
          updated: new Date(row.updatedAt).toLocaleString(),
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
        // radioItems={radioItems}
        // monthNames={monthNames}
        // years={years}
        handleChange={handleChange}
        // buttonText={`Tambah ${titleSection}`}
        onButtonClick={handleTambah}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
      />
      <EvoSearchTabel
        placeholder="Ketik nama parameter..."
        buttonText="Pencarian"
        onSearch={handleSearch}
      />
      <EditParameterForm
        isOpen={modalOpen}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />
      <EvoTable
        id="tableToPrint"
        tableData={tableDataParameter}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
        rows={rows}
      />
    </EvoCardSection>
  );
}
