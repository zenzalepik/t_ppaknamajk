//PerusahaanSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddGerbangForm from './forms/AddForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataPerusahaan } from './tableDataPerusahaan';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiMasterDataPerusahaan } from './api/fetchApiMasterDataPerusahaan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataPerusahaanDelete } from './api/fetchApiMasterDataPerusahaanDelete';

const titleSection = 'Data Perusahaan';

export default function PerusahaanSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);
  const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      console.log('User ID yang terautentikasi:', id);
      setUserId(id);
    };

    fetchUserId();
  }, []);

  const {
    data: masterDataPerusahaan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPage],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
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

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataPerusahaanDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataPerusahaan']);

    // setConfirmDeleteId(null); // tutup tooltip
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

  // console.log('Data Perusahaan:', masterDataPerusahaan.pageSize);
  const dataApi = masterDataPerusahaan || {};

  const rows =
    masterDataPerusahaan?.data?.length > 0
      ? masterDataPerusahaan.data.map((perusahaan, index) => ({
          no: index + 1,
          nama: <b>{perusahaan.nama || <i>*empty</i>}</b>,
          jenisPerusahaan: perusahaan.jenis_perusahaan || <i>*empty</i>,
          kontak: perusahaan.kontak || <i>*empty</i>,
          status: StatusLabel.status(perusahaan.status) || <i>*empty</i>,
          added: new Date(perusahaan.createdAt).toLocaleString() || (
            <i>*empty</i>
          ),
          updated: new Date(perusahaan.updatedAt).toLocaleString() || (
            <i>*empty</i>
          ),
          aksi: (
            <EvoActionButtons
              rowId={perusahaan.id}
              onEdit={() => handleEdit(perusahaan.id)}
              onDelete={() => handleDelete(perusahaan.id)}
              isActive={perusahaan.status}
              onAktifkan={() => console.log('Aktifkan', perusahaan.id)}
              onNonAktifkan={() => console.log('NonAktifkan', perusahaan.id)}
            />
          ),
        }))
      : [];

  // const rows = tableDataPerusahaan.rows.map((row) => ({
  //   ...row,
  //   status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
  //   aksi: (
  //     <EvoActionButtons
  //       rowId={row.aksi}
  //       onEdit={() => handleEdit(row.aksi)}
  //       onDelete={() => handleDelete(row.aksi)}
  //       isActive={row.status == true} // Status perusahaan digunakan sebagai indikator aktif/non-aktif
  //       onAktifkan={() => console.log('Aktifkan', row.aksi)}
  //       onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
  //     />
  //   ),
  // }));

  // ==============================================================

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
        {/* <p>User ID: {userId}</p> ✅ Tampilkan User ID di UI untuk pengecekan */}
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
        <AddGerbangForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
        />
        <EvoTable
          id="tableToPrint"
          tableData={tableDataPerusahaan}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
