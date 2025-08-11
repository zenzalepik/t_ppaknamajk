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
import numbers from '@/utils/numbers';
import EvoEmpty from '@/components/EvoEmpty';
import hideNotFinished from '@/utils/hideNotFinished';
import EvoLoading from '@/components/EvoLoading';
import { fetchApiProfil } from './api/fetchApiProfil';

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
  const [selectedEditData, setSelectedEdit] = useState(null);

  const [searchText, setSearchText] = useState('');

  const {
    data: laporanTransaksiBatal,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanTransaksiBatal', currentPage, searchText],
    queryFn: () =>
      fetchApiTransaksiBatal({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        search: searchText, // <== ini penting
      }),
    // retry: false,
  });

  const {
    data: profil,
    errorProfil,
    isLoadingProfil,
  } = useQuery({
    queryKey: ['profil'],
    queryFn: fetchApiProfil,
    // retry: false,
  });

  const dataProfil = Array.isArray(profil) ? profil[0] : {};

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

  const handlePengajuanBatal = (id) => {
    console.log('Riwayat Transaksi ID:', id);
    const dataDipilih = laporanTransaksiBatal?.data?.find(
      (item) => item.id === id
    );

    // console.log(dataDipilih);

    if (dataDipilih) {
      setSelectedEdit({
        user_id: dataProfil.id,
        no_tiket_atau_nomor_polisi: dataDipilih.no_tiket || '',
        dataDipilih: dataDipilih ||{}
      });
      console.log("===============================================")
      console.log('dataProfil.user_id: ' + dataProfil.id);
      // console.log('dataDipilih.no_tiket: ' + dataDipilih.no_tiket);
      // setModalEditOpen(true);

      handleTambahPengaduan();
      // Logika untuk melakukan edit (misalnya membuka form modal)
    }
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    setShowTabel(true);
    setSearchText(query.searchText); // simpan input pencarian
    setCurrentPage(1); // reset ke halaman pertama
  };

  const rows =
    laporanTransaksiBatal?.data?.length > 0
      ? laporanTransaksiBatal.data.map((row, index) => ({
          no: index + 1,
          nomorTiket:
            row.no_tiket == null ? <EvoEmpty /> : <b>{row.no_tiket}</b>,
          nomorPolisi: row.nomor_polisi || <EvoEmpty />,
          jenisKendaraan: row.kendaraan?.nama_kendaraan || <EvoEmpty />,
          member: row.data_member ? 'Ya' : 'Tidak',
          manualInput: row.is_manual ? 'Ya' : 'Tidak',
          waktuMasuk: row.tanggal_masuk || <EvoEmpty />,
          waktuKeluar: row.tanggal_keluar || <EvoEmpty />,
          gerbangMasuk: row.pintu_masuk?.keterangan || <EvoEmpty />,
          gerbangKeluar: row.pintu_keluar?.keterangan || <EvoEmpty />,
          durasiParkir: row.interval ? `${row.interval} jam` : <EvoEmpty />,
          denda:
            row.jumlah_denda_stnk || row.jumlah_denda_tiket ? (
              `Rp ${(
                row.jumlah_denda_stnk + row.jumlah_denda_tiket
              ).toLocaleString()}`
            ) : (
              <i>-</i>
            ),
          totalPembayaran: row.biaya_parkir ? (
            `Rp ${Number(row.biaya_parkir).toLocaleString()}`
          ) : (
            <EvoEmpty />
          ),
          status:
            row.is_active != null ? (
              StatusLabel.status(row.is_active)
            ) : (
              <EvoEmpty />
            ),
          tipe: row.keterangan_atau_penjelasan || <EvoEmpty />,

          pembayaran:
            row.jenis_pembayaran && row.jenis_pembayaran.jenis_payment ? (
              row.jenis_pembayaran.jenis_payment
            ) : (
              <EvoEmpty />
            ),
          kartuMember: row.data_member?.akses_kartu ? 'Ya' : 'Tidak',
          namaBank: row.nama_bank || '-',
          nomorRekening: row.nomor_rekening || '-',
          namaEwallet: row.nama_ewallet || '-',
          nomorEwallet: row.nomor_ewallet || '-',
          petugas: row.petugas?.nama || <EvoEmpty />,
          shift: row.shift?.nama_shift || <EvoEmpty />,
          foto: row.foto ? (
            <EvoButton
              key={`foto-${row.id}`}
              outlined
              icon={<RiImageLine />}
              onClick={() =>
                window.open(row.foto, '_blank', 'noopener,noreferrer')
              }
              buttonText="Lihat Foto"
            />
          ) : (
            '-'
          ),

          aksi: (
            <EvoActionButtons
              rowId={row.id}
              moreAction={titleSection}
              customButtons={[
                <EvoButton
                  key={`batalkan-${row.id}`}
                  onClick={() => handlePengajuanBatal(row.id)}
                  fillColor={colors.danger}
                  buttonText="Batalkan Transaksi"
                />,
              ]}
            />
          ),
        }))
      : [];

  // if (isLoading)
  //   return (
  //     <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
  //       <Spinner size={32} color="border-black" />
  //       Loading...
  //     </div>
  //   );
 
  if (error || errorProfil) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(error || errorProfil)} />
    );
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
      {!hideNotFinished.evoSearchTabel_TransaksiBatalContentTambah && (
        <EvoSearchTabel
          isFilter={
            hideNotFinished.evoSearchTabel_Filter_TransaksiBatalContentTambah ==
            false
              ? true
              : false
          }
          FilterComponent={FilterMasProdukMember}
          placeholder="Ketik nomor tiket atau nomor polisi..."
          // onSearch={(data) => console.log('Hasil pencarian:', data)}
          onSearch={handleSearch}
        />
      )}
      <PembatalanTansaksiForm
        isOpen={modalOpenPengaduan}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
        dataForm={selectedEditData}
      />

      {/* {showTabel && ( */}
      {searchText == '' ? (
        <div className="text-2xl text-black/20 text-center bg-black/[0.025] rounded-[20px] py-32">
          Ketik Pencarian Untuk Menampilkan Data
        </div>
      ) : (
        <div className="relative">
          {isLoading && <EvoLoading />}
          <EvoTable
            id="tableToPrint"
            tableData={tableDataTransaksiBatal}
            currentPage={currentPage}
            totalPages={laporanTransaksiBatal?.totalPages}
            onPageChange={handlePageChange}
            rows={rows}
          />
        </div>
      )}
      {/* )} */}
    </div>
  );
}
