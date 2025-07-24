import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import {
  RiImageLine,
  RiAddLargeLine,
  RiSearchLine,
  RiUser3Line,
} from '@remixicon/react';
import PembatalanTansaksiForm from './forms/PembatalanTansaksiForm';
import { tableDataTransaksiBatal } from './data/tableDataTransaksiBatal';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukMember from './FilterMasProdukMember';
import EvoButton from '@/components/evosist_elements/EvoButton';
import EvoTable from '@/components/evosist_elements/EvoTable';
import colors from '@/utils/colors';
import { fetchApiTransaksiBatal } from './api/fetchApiTransaksiBatal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Kirim Pembatalan Transaksi';

export default function TransaksiBatalContentTambah() {
  const [showTabel, setShowTabel] = useState(false);
  const [modalOpenPengaduan, setModalOpenPengaduan] = useState(false);

  const handleTambahPengaduan = () => setModalOpenPengaduan(true);
  const handleTutup = () => setModalOpenPengaduan(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: laporanTransaksiBatal,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanTransaksiBatal', currentPage],
    queryFn: () =>
      fetchApiTransaksiBatal({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  const handleDelete = (id) => {
    console.log('Hapus ID:', id);
    setConfirmDeleteId(null); // tutup tooltip
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

  const handleProsesPerbaikan = (id) => {
    console.log('Riwayat Transaksi ID:', id);
    handleTambahPengaduan();
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    setShowTabel(true);
    console.log('Hasil pencarian:', query);
  };

  /*const rows = tableDataTransaksiBatal.rows.map((row) => ({
    ...row,
    status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
    member: row.member ? 'Ya' : 'Tidak',
    manualInput: row.manualInput ? 'Ya' : 'Tidak',
    kartuMember: row.kartuMember ? 'Ya' : 'Tidak',
    namaBank: row.namaBank ?? '-',
    nomorRekening: row.nomorRekening ?? '-',
    namaEwallet: row.namaEwallet ?? '-',
    nomorEwallet: row.nomorEwallet ?? '-',
    foto: row.foto ? (
      <EvoButton
        key={`prosesPerbaikan-${row.no}`}
        outlined={true}
        icon={<RiImageLine />}
        onClick={() => window.open(row.foto, '_blank', 'noopener,noreferrer')}
        buttonText={'Lihat Foto'}
      />
    ) : (
      '-'
    ),

    aksi: (
      <EvoActionButtons
        rowId={row.no}
        moreAction={titleSection}
        customButtons={[
          <EvoButton
            key={`prosesPerbaikan-${row.no}`}
            onClick={() => handleProsesPerbaikan(row.no)}
            fillColor={colors.danger}
            buttonText={'Batalkan Transaksi'}
          />,
        ]}
      />
    ),
  }));*/

  const rows =
    laporanTransaksiBatal?.data?.length > 0
      ? laporanTransaksiBatal.data.map((row, index) => ({
          no: index + 1,

          // id: row.id || <i>*emtpty</i>,
          nomorTiket: row.nomorTiket == null ? <i>*emtpty</i> : <b>{row.nomorTiket}</b>,
          nomorPolisi: row.nomorPolisi || <i>*emtpty</i>,
          jenisKendaraan: row.jenisKendaraan || <i>*emtpty</i>,
          member: row.member ? 'Ya' : 'Tidak',
          manualInput: row.manualInput ? 'Ya' : 'Tidak',
          waktuMasuk: row.waktuMasuk || <i>*emtpty</i>,
          waktuKeluar: row.waktuKeluar || <i>*emtpty</i>,
          gerbangMasuk: row.gerbangMasuk || <i>*emtpty</i>,
          gerbangKeluar: row.gerbangKeluar || <i>*emtpty</i>,
          durasiParkir: row.durasiParkir || <i>*emtpty</i>,
          denda: row.denda || <i>*emtpty</i>,
          totalPembayaran: row.totalPembayaran || <i>*emtpty</i>,
          status:
            row.status != null ? (
              StatusLabel.status(row.status)
            ) : (
              <i>*emtpty</i>
            ),
          tipe: row.tipe || <i>*emtpty</i>,
          pembayaran: row.pembayaran || <i>*emtpty</i>,
          kartuMember: row.kartuMember ? 'Ya' : 'Tidak',
          namaBank: row.namaBank ?? '-',
          nomorRekening: row.nomorRekening ?? '-',
          namaEwallet: row.namaEwallet ?? '-',
          nomorEwallet: row.nomorEwallet ?? '-',
          petugas: row.petugas || <i>*emtpty</i>,
          shift: row.shift || <i>*emtpty</i>,
          foto: row.foto ? (
            <EvoButton
              key={`prosesPerbaikan-${row.no}`}
              outlined={true}
              icon={<RiImageLine />}
              onClick={() =>
                window.open(row.foto, '_blank', 'noopener,noreferrer')
              }
              buttonText={'Lihat Foto'}
            />
          ) : (
            '-'
          ),

          aksi: (
            <EvoActionButtons
              rowId={row.no}
              moreAction={titleSection}
              customButtons={[
                <EvoButton
                  key={`prosesPerbaikan-${row.no}`}
                  onClick={() => handleProsesPerbaikan(row.no)}
                  fillColor={colors.danger}
                  buttonText={'Batalkan Transaksi'}
                />,
              ]}
            />
          ),
        }))
      : [];

  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}
      <EvoTitleSection
        title={titleSection}
        handleChange={handleChange}
        icon={<RiAddLargeLine size={16} />}
      />

      <EvoSearchTabel
        isFilter={true}
        FilterComponent={FilterMasProdukMember}
        placeholder="Ketik nomor tiket..."
        // onSearch={(data) => console.log('Hasil pencarian:', data)}
        onSearch={handleSearch}
      />

      <PembatalanTansaksiForm
        isOpen={modalOpenPengaduan}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />

      {showTabel && (
        <EvoTable
          id="tableToPrint"
          tableData={tableDataTransaksiBatal}
          currentPage={currentPage}
          totalPages={laporanTransaksiBatal?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      )}
    </div>
  );
}
