//PosSection.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddPosForm from './forms/AddForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataPos } from './tableDataPos';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiMasterDataPOS } from './api/fetchApiMasterDataPOS';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataPOSDelete } from './api/fetchApiMasterDataPOSDelete';

const titleSection = 'Data Pos';

export default function PosSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: masterDataPOS,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataPOS', currentPage],
    queryFn: () =>
      fetchApiMasterDataPOS({
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

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);

    await fetchApiMasterDataPOSDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataPOS']);

    // setConfirmDeleteId(null); // tutup tooltip
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

  // const rows = tableDataPos.rows.map((row) => ({
  //   ...row,
  //   kamera1: StatusLabel.kamera(row.kamera1),
  //   kamera2: StatusLabel.kamera(row.kamera2),
  //   otorisasi: StatusLabel.otorisasi(row.otorisasi),
  //   aksi: (
  //     <EvoActionButtons
  //       rowId={row.aksi}
  //       onEdit={handleEdit}
  //       onDelete={handleDelete}
  //       isActive={row.otorisasi} // atau row.kamera1 jika itu yang dianggap status aktifnya
  //       // onAktifkan={() => console.log('Aktifkan', row.aksi)}
  //       // onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
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

  // console.log('Data Perusahaan:', masterDataPOS.pageSize);
  const dataApi = masterDataPOS || {};

  const rows =
    masterDataPOS?.data?.length > 0
      ? masterDataPOS?.data?.map((row, index) => ({
          no: index + 1,
          kode: row.kode,
          keterangan: row.keterangan,
          tipePos: row.tipe_pos,
          tipeManless: row.tipe_manless,
          tipeKendaraan: row.tipe_kendaraan,
          kamera1: StatusLabel.kamera(row.kamera_1),
          kamera2: StatusLabel.kamera(row.kamera_2),
          printerName: row.nama_printer,
          interfaceName: row.nama_interface,
          comPort: row.com_port,
          otorisasi: StatusLabel.otorisasi(row.otorisasi),
          synchronize: row.synchronize,
          added: row.createdAt,
          updated: row.updatedAt,

          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={() => handleEdit(row.id)}
              onDelete={() => handleDelete(row.id)}
            />
          ),
        }))
      : [];

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
        <AddPosForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
        />
        <EvoTable
          id="tableToPrint"
          tableData={tableDataPos}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
