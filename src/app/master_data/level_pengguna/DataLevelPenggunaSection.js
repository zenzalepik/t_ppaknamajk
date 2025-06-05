'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddLevelPenggunaForm from './forms/AddForm';
import { tableDataLevelPengguna } from './tableDataLevelPengguna';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoAccessLabel from '@/components/EvoAccessLabel';
import { fetchApiMasterDataLevelPengguna } from './api/fetchApiMasterDataLevelPengguna';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import {fetchApiMasterDataLevelPenggunaDelete} from './api/fetchApiMasterDataLevelPenggunaDelete';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Level Pengguna';

export default function DataLevelPenggunaSection() {
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
    data: masterDataLevelPengguna,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataLevelPengguna', currentPage],
    queryFn: () =>
      fetchApiMasterDataLevelPengguna({
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

    await fetchApiMasterDataLevelPenggunaDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataPerusahaan']);    // logic delete
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

  // const rows =
  //   masterDataLevelPengguna?.data?.length > 0
  //     ? masterDataLevelPengguna.data.map((level, index) => ({
  //         no: index + 1,
  //         namaLevel: level.nama,
  //         aksesMenu: level.akses_menu.map((menu) => ({
  //           namaMenu: menu.nama_menu,
  //           subMenu: menu.nama_sub_menu
  //             ? menu.nama_sub_menu.map((sub) => ({
  //                 nama: sub.nama,
  //                 aksi: sub.aksi ? sub.aksi[0] : {},
  //               }))
  //             : [],
  //         })),
  //         added: new Date(level.createdAt).toLocaleString(),
  //         updated: new Date(level.updatedAt).toLocaleString(),
  //         aksi: (
  //           <EvoActionButtons
  //             rowId={level.id}
  //             onEdit={() => handleEdit(level.id)}
  //             onDelete={() => handleDelete(level.id)}
  //           />
  //         ),
  //       }))
  //     : [];

  // console.log("Data API Level Pengguna:", masterDataLevelPengguna);

  // Struktur Lama => OK

  const dataApi = masterDataLevelPengguna || {};
  console.log(dataApi);

  const rows =
    masterDataLevelPengguna?.data?.length > 0
      ? masterDataLevelPengguna.data.map((row, index) => ({
          no: index + 1,
          nama: <b>{row.nama || <i>*empty</i>}</b>,
          perusahaan: <b>{row.perusahaan || <i>*empty</i>}</b>,
          hakAkses:
            row.hakAkses && row.hakAkses.length > 0 ? (
              <EvoAccessLabel akses={row.hakAkses} />
            ) : (
              'Tidak ada hak akses'
            ),
          added: new Date(row.createdAt).toLocaleString() || <i>*empty</i>,
          updated: new Date(row.updatedAt).toLocaleString() || <i>*empty</i>,
          aksi: (
            <EvoActionButtons
              rowId={row.no}
              onEdit={() => handleEdit(row.id)}
              onDelete={() => handleDelete(row.id)}
              // onAktifkan={() => console.log('Aktifkan', row.no)}
              // onNonAktifkan={() => console.log('NonAktifkan', row.no)}
              onConfigure={() => console.log('OnConfigure', row.no)}
            />
          ),
        }))
      : [];

  // const rows = tableDataLevelPengguna.rows.map((row) => ({
  //     ...row,
  //     hakAkses: row.hakAkses && row.hakAkses.length > 0 ? <EvoAccessLabel akses={row.hakAkses} /> : "Tidak ada hak akses",
  //     aksi: (
  //       <EvoActionButtons
  //         rowId={row.no} // Menggunakan nomor urut user untuk aksi
  //         onEdit={() => console.log('Edit', row.no)}
  //         onDelete={() => console.log('Delete', row.no)}
  //         // onAktifkan={() => console.log('Aktifkan', row.no)}
  //         // onNonAktifkan={() => console.log('NonAktifkan', row.no)}
  //         onConfigure={() => console.log('OnConfigure', row.no)}
  //       />
  //     ),
  //   }));

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
        />
        {/* <EvoSearchTabel
        placeholder="Temukan loker impian kamu..."
        buttonText="Pencarian"
        onSearch={handleSearch}
      /> */}
        <AddLevelPenggunaForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
        />
        <EvoTable
          id="tableToPrint"
          tableData={tableDataLevelPengguna}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
          isTallRow={true}
        />
      </EvoCardSection>
    </>
  );
}
