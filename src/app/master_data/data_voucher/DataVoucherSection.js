//DataVoucherSection.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddDataVoucherForm from './forms/AddForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataVoucher } from './tableDataVoucher';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukVoucher from './FilterMasProdukVoucher';
import { fetchApiMasterDataDataVoucher } from './api/fetchApiMasterDataDataVoucher';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataVoucherDelete } from './api/fetchApiMasterDataDataVoucherDelete';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Data Voucher';

export default function DataVoucherSection() {
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
    data: masterDataDataVoucher,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataVoucher', currentPage],
    queryFn: () =>
      fetchApiMasterDataDataVoucher({
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

    await fetchApiMasterDataDataVoucherDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataDataVoucher']);
    // logic delete
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

  /*const rows = tableDataVoucher.rows.map((row) => ({
    ...row,
    aksesTiket: StatusLabel.status(row.aksesTiket), // Konversi akses tiket menjadi elemen visual
    aksesKartu: StatusLabel.status(row.aksesKartu), // Konversi akses kartu menjadi elemen visual
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
        isActive={row.status === 'Aktif'} // Status voucher digunakan sebagai indikator aktif/non-aktif
        // onAktifkan={() => console.log('Aktifkan', row.aksi)}
        // onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
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

  const dataApi = masterDataDataVoucher || {};

  // console.log(masterDataDataVoucher);
  const rows =
    masterDataDataVoucher?.data?.length > 0
      ? masterDataDataVoucher?.data?.map((row, index) => ({
          no: index + 1,
          waktuInput: row.createdAt
            ? new Date(row.createdAt).toLocaleString()
            : '-',
          produkVoucher: row.produk_voucher.nama,
          noTiket: row.no_tiket_atau_nopol,
          nopol: row.no_tiket_atau_nopol,
          jenisKendaraan:
            row.kendaraan.nama_kendaraan +
            ' (' +
            row.kendaraan.tipe_kendaraan +
            ') ',
          modelBayar: row.model_bayar,
          verifikasi: row.verifikasi,
          periode: row.periode_value + ' ' + row.periode_unit,
          tarif: row.tarif ? `Rp${row.tarif.toLocaleString()}` : '-',
          masaAktif:
            Array.isArray(row.periode) && row.periode.length === 2
              ? `${row.periode[0].value} s/d ${row.periode[1].value}`
              : '-',
          keterangan: row.keterangan,

          nama: row.nama || '-',
          kontak: row.no_hp || '-',
          perusahaan: row.perusahaan?.nama || '-',
          aksesTiket: StatusLabel.status(row.akses_tiket),
          aksesKartu: StatusLabel.status(row.akses_kartu),
          nomorKartu: row.no_kartu || '-',
          tanggalInput: row.tgl_input
            ? new Date(row.tgl_input).toLocaleDateString()
            : '-',
          produk: row.produk_member?.nama || '-',
          tarif: row.tarif ? `Rp${row.tarif.toLocaleString()}` : '-',
          masaAktif:
            Array.isArray(row.periode) && row.periode.length === 2
              ? `${row.periode[0].value} s/d ${row.periode[1].value}`
              : '-',
          added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onPerpanjang={() => handlePerpanjang(row.id)}
              onGantiKartu={() => handleGantiKartu(row.id)}
              onGantiNomorPolisi={() => handleGantiNomorPolisi(row.id)}
              onRiwayatTransaksi={() => handleRiwayatTransaksi(row.id)}
              onEdit={() => handleEdit(row.id)}
              onDelete={() => handleDelete(row.id)}
              isActive={true}
              moreAction={titleSection}
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
        <EvoSearchTabel
          isFilter={true}
          // FilterComponent={FilterMasProdukVoucher}
          placeholder="Ketik nama voucher atau nomor handphone voucher..."
          onSearch={(data) => console.log('Hasil pencarian:', data)}
        />

        <AddDataVoucherForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
        />
        <EvoTable
          id="tableToPrint"
          tableData={tableDataVoucher}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </EvoCardSection>
    </>
  );
}
