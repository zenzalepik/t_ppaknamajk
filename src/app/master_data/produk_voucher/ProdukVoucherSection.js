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
import AddProdukVoucherForm from './forms/AddForm';
import { tableProdukVoucher } from './tableProdukVoucher';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { fetchApiMasterDataProdukVoucher } from './api/fetchApiMasterDataProdukVoucher';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataProdukVoucherDelete } from './api/fetchApiMasterDataProdukVoucherDelete';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Produk Voucher';

export default function ProdukVoucherSection() {
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
    data: masterDataProdukVoucher,
    error: errorProduk,
    isLoading: loadingProduk,
  } = useQuery({
    queryKey: ['masterDataProdukVoucher', currentPage],
    queryFn: () =>
      fetchApiMasterDataProdukVoucher({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
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
    await fetchApiMasterDataProdukVoucherDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataPerusahaan']);
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

  /*const rows = tableProdukVoucher.rows.map((row) => ({
    ...row,
    // ...row,
    kendaraan: (
      <div className="flex flex-wrap gap-2">
        {row.kendaraan.map((kendaraan, index) => (
          <span
            key={index}
            className="px-1.5 py-0.5 bg-black/10 text-black text-content_reguler rounded-md"
          >
            {kendaraan}
          </span>
        ))}
      </div>
    ),
    modelPembayaran: (
      <div className="flex flex-wrap gap-2">
        {row.modelPembayaran.map((model, index) => (
          <span
            key={index}
            className="px-1.5 py-0.5 bg-black/10 text-black text-content_reguler rounded-md"
          >
            {model}
          </span>
        ))}
      </div>
    ),
    status: StatusLabel.status(row.status), // Konversi boolean ke elemen tampilan
    aksi: (
      <EvoActionButtons
        rowId={row.aksi}
        onEdit={() => console.log('Edit', row.aksi)}
        onDelete={() => console.log('Delete', row.aksi)}
        onAktifkan={() => console.log('Aktifkan', row.aksi)}
        onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
        isActive={row.status} // Status digunakan dalam action
      />
    ),
  }));*/

  if (loadingProduk || loadingKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (errorProduk) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorProduk.message)} />
    );
  }

  if (errorKendaraan) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorKendaraan.message)} />
    );
  }

  const dataApi = masterDataProdukVoucher || {};

  const rows =
    masterDataProdukVoucher?.data?.map((row, index) => ({
      no: index + 1,
      namaVoucher: row.nama || '-',
      periode: row.periode_value + ' ' + row.periode_unit,
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
      tarif: `Rp ${row.tarif.toLocaleString()}`,
      modelPembayaran: row.model_pembayaran,
      metodeVerifikasi: row.metode_verifikasi,
      status: StatusLabel.status(row.status),
      added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
      updated: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-',
      aksi: (
        <EvoActionButtons
          rowId={row.id}
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
          isActive={true}
          onAktifkan={() => console.log('Aktifkan', perusahaan.id)}
          onNonAktifkan={() => console.log('NonAktifkan', perusahaan.id)}
        />
      ),
    })) || [];

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
        <AddProdukVoucherForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
        />
        <EvoTable
          id="tableToPrint"
          tableData={tableProdukVoucher}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
