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
import AddKendaraanForm from './forms/AddForm';
import { tableProdukMember } from './tableProdukMember';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { fetchApiMasterDataProdukMember } from './api/fetchApiMasterDataProdukMember';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataProdukMemberDelete } from './api/fetchApiMasterDataProdukMemberDelete';

const titleSection = 'Produk Member';

export default function ProdukMemberSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const {
    data: masterDataProdukMember,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataProdukMember', currentPage],
    queryFn: () =>
      fetchApiMasterDataProdukMember({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: masterDataKendaraan,
    error: errorKendaraan,
    isLoading: loadingKendaraan,
  } = useQuery({
    queryKey: ['masterDataKendaraan'],
    queryFn: fetchApiMasterDataDataKendaraan,
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
    await fetchApiMasterDataProdukMemberDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataProdukMember']);

    // setConfirmDeleteId(null); // tutup tooltip
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

  if (isLoading || loadingKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  if (errorKendaraan) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorKendaraan.message)} />
    );
  }

  const formatPeriode = (periode) => {
    if (!periode || periode.length === 0) {
      return 'Tidak ada periode tersedia';
    }

    return periode
      .map(({ value, inclusive }) => {
        return value
          ? `${value} (${inclusive ? 'Inclusive' : 'Exclusive'})`
          : 'Tanggal tidak tersedia';
      })
      .join(' - ');
  };

  // console.log('Data Perusahaan:', masterDataProdukMember.pageSize);
  const dataApi = masterDataProdukMember || {};

  const rows =
    masterDataProdukMember?.data?.map((row, index) => ({
      no: index + 1,

      nama: row.nama || '-',
      rentangTanggal: formatPeriode(row.periode),
      kendaraan: (
        <ul className="list-disc pl-4">
          {row.list_id_kendaraan.map((id, index) => {
            const kendaraan = masterDataKendaraan?.data?.find(
              (k) => k.id.toString() === id
            );
            return (
              <li key={`${id}-${index}`}>
                {kendaraan
                  ? `${kendaraan.nama_kendaraan} (${kendaraan.tipe_kendaraan})`
                  : 'Tidak ditemukan'}
              </li>
            );
          })}
        </ul>
      ),
      maxKendaraan: row.max_kendaraan + ' kendaraan',
      tarif: `Rp ${row.tarif.toLocaleString()}`,
      biayaKartu: `Rp ${row.biaya_kartu.toLocaleString()}`,
      biayaGantiNopol: `Rp ${row.biaya_ganti_nopol.toLocaleString()}`,
      status: StatusLabel.status(row.status),
      added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
      updated: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-',
      aksi: (
        <EvoActionButtons
          rowId={row.id}
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
          isActive={true}
          onAktifkan={() => console.log('Aktifkan', row.id)}
          onNonAktifkan={() => console.log('NonAktifkan', row.id)}
        />
      ),
    })) || [];

  // const rows = tableProdukMember.rows.map((row) => ({
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
        <AddKendaraanForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
        />
        <EvoTable
          id="tableToPrint"
          tableData={tableProdukMember}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
