'use client';

import React, { useState } from 'react';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoBtnDropdown from '@/components/evosist_elements/EvoBtnDropdown';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import EvoBtnEdit from '@/components/evosist_elements/EvoBtnEdit';
import EvoBtnDelete from '@/components/evosist_elements/EvoBtnDelete';
import EvoBtnTurnOff from '@/components/evosist_elements/EvoBtnTurnOff';
import EvoBtnTurnOn from '@/components/evosist_elements/EvoBtnTurnOn';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import * as Popover from '@radix-ui/react-popover';
import EvoTooltipConfirm from '@/components/EvoTooltipConfirm';
import AddShiftForm from './forms/AddForm';
import { tableDataShift } from './tableDataShift';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiMasterDataShift } from './api/fetchApiMasterDataShift';
import { useQuery,useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataShiftDelete } from './api/fetchApiMasterDataShiftDelete';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Data Shift';

export default function DataShiftSection() {
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
      data: masterDataDataShift,
      error,
      isLoading,
    } = useQuery({
      queryKey: ['masterDataDataShift', currentPage],
      queryFn: () =>fetchApiMasterDataShift({
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

  const handleDelete = async(id) => {
    console.log('Hapus ID:', id);
        await fetchApiMasterDataShiftDelete(id, setNotifMessage, setNotifType);
    
        // ✅ Pastikan data diperbarui secara real-time
        queryClient.invalidateQueries(['masterDataDataShift']);
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

  // const rows = tableDataShift.rows.map((row) => ({
  //   ...row,
  //   status: StatusLabel.status(row.status), // Konversi boolean ke elemen tampilan
  //   aksi: (
  //     <EvoActionButtons
  //       rowId={row.aksi}
  //       onEdit={() => console.log('Edit', row.aksi)}
  //       onDelete={() => console.log('Delete', row.aksi)}
  //       onAktifkan={() => console.log('Aktifkan', row.aksi)}
  //       onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
  //       isActive={row.status} // Status digunakan dalam action
  //     />
  //   ),
  // }));

  
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

    const dataApi = masterDataDataShift || {};

  const rows =  masterDataDataShift?.data?.length > 0?
    masterDataDataShift?.data?.map((row, index) => ({
      no: index + 1,
      nama: row.nama_shift || '-',
      kontak: row.awal_shift || '-',
      perusahaan: row.akhir_shift || '-',
      status: StatusLabel.status(row.status),

     
      added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
      updated: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-',
      aksi: (
        <EvoActionButtons
          rowId={row.id}
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
          isActive={row.status || false}
          onAktifkan={() => console.log('Aktifkan', row.id)}
          onNonAktifkan={() => console.log('NonAktifkan', row.id)}
        />
      ),
    })) : [];

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
      {/* <EvoSearchTabel
        placeholder="Temukan loker impian kamu..."
        buttonText="Pencarian"
        onSearch={handleSearch}
      /> */}
      <AddShiftForm
        isOpen={modalOpen}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />
      <EvoTable
        tableData={tableDataShift}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
        rows={rows}
      />
    </EvoCardSection></>
  );
}
