//DataMemberSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddDataMemberForm from './forms/AddForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataMember } from './tableDataMember';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukMember from './FilterMasProdukMember';
import { fetchApiMasterDataDataMember } from './api/fetchApiMasterDataDataMember';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataMemberDelete } from './api/fetchApiMasterDataDataMemberDelete';
import EvoNotifCard from '@/components/EvoNotifCard';
import EditDataMemberForm from './forms/EditForm';
import EditPerpanjangMasaAktifForm from './forms/EditPerpanjangMasaAktifForm';
import EditGantiKartuForm from './forms/EditGantiKartuForm';
import EditGantiNomorPolisiForm from './forms/EditGantiNomorPolisiForm';
import ViewRiwayatTransaksiForm from './forms/ViewRiwayatTransaksiForm';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import numbers from '@/utils/numbers';
import hideNotFinished from '@/utils/hideNotFinished';
import EvoEmpty from '@/components/EvoEmpty';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import EvoLoading from '@/components/EvoLoading';

const titleSection = 'Data Member';

export default function DataMemberSection() {
  const urlExport = '/master-data/data-member/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);
  const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [selectedEditData, setSelectedEdit] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleEditTutup = () => setModalEditOpen(false);

  const [searchText, setSearchText] = useState('');

  const [
    selectedEditPerpanjangMasaAktifData,
    setSelectedEditPerpanjangMasaAktif,
  ] = useState(null);
  const [
    modalEditPerpanjangMasaAktifOpen,
    setModalEditPerpanjangMasaAktifOpen,
  ] = useState(false);
  const handleEditPerpanjangMasaAktifTutup = () =>
    setModalEditPerpanjangMasaAktifOpen(false);

  const [selectedEditGantiKartuData, setSelectedEditGantiKartu] =
    useState(null);
  const [modalEditGantiKartuOpen, setModalEditGantiKartuOpen] = useState(false);
  const handleEditGantiKartuTutup = () => setModalEditGantiKartuOpen(false);

  const [selectedEditNomorPolisiData, setSelectedEditNomorPolisi] =
    useState(null);
  const [modalEditNomorPolisiOpen, setModalEditNomorPolisiOpen] =
    useState(false);
  const handleEditNomorPolisiTutup = () => setModalEditNomorPolisiOpen(false);

  const [selectedViewRiwayatTransaksiData, setSelectedViewRiwayatTransaksi] =
    useState(null);
  const [modalViewRiwayatTransaksiOpen, setModalViewRiwayatTransaksiOpen] =
    useState(false);
  const handleViewRiwayatTransaksiTutup = () =>
    setModalViewRiwayatTransaksiOpen(false);

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const {
    data: masterDataDataMember,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataMember', currentPage, searchText],
    queryFn: () =>
      fetchApiMasterDataDataMember({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        search: searchText,
      }),
    // retry: false,
  });

  const hakAksesMDDataMember =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Data Member')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDDataMember).some(
    (v) => v === true
  );

  const handleSubmitData = (data) => {
    console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  // Fungsi untuk edit data
  const handleEdit = (id) => {
    console.log('Tombol Edit diklik untuk ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataDataMember?.data?.find(
      (item) => item.id === id
    );


    if (dataDipilih) {
      setSelectedEdit({
        json: dataDipilih || {},
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',
        // jenis_perusahaan: dataDipilih.jenis_perusahaan || '',
        // kontak: dataDipilih.kontak || '',
        no_hp: dataDipilih.no_hp || '',
        perusahaan_id: dataDipilih.perusahaan_id || '',
        akses_tiket: dataDipilih.akses_tiket || false,
        akses_kartu: dataDipilih.akses_kartu || false,
        no_kartu: dataDipilih.no_kartu || '',
        tgl_input: dataDipilih.tgl_input || '',
        produk_id: dataDipilih.produk_id || '',
        tarif: dataDipilih.tarif || '',
        biaya_member: dataDipilih.biaya_member || '',
        biaya_kartu: dataDipilih.biaya_kartu || '',
        user_id: dataDipilih.user_id || '',
        periode: dataDipilih.periode || [],
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditOpen(true);
    }
  };

  // const [confirmMoreId, setConfirmMoreId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataDataMemberDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataDataMember']);

    // setConfirmDeleteId(null); // tutup tooltip
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handlePerpanjang = (id) => {
    console.log('Perpanjang ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataDataMember?.data?.find(
      (item) => item.id === id
    );


    if (dataDipilih) {
      setSelectedEditPerpanjangMasaAktif({
        json: dataDipilih || {},
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',
        // jenis_perusahaan: dataDipilih.jenis_perusahaan || '',
        // kontak: dataDipilih.kontak || '',
        no_hp: dataDipilih.no_hp || '',
        perusahaan_id: dataDipilih.perusahaan_id || '',
        akses_tiket: dataDipilih.akses_tiket || false,
        akses_kartu: dataDipilih.akses_kartu || false,
        no_kartu: dataDipilih.no_kartu || '',
        tgl_input: dataDipilih.tgl_input || '',
        produk_id: dataDipilih.produk_id || '',
        tarif: dataDipilih.tarif || '',
        biaya_member: dataDipilih.biaya_member || '',
        biaya_kartu: dataDipilih.biaya_kartu || '',
        user_id: dataDipilih.user_id || '',
        periode: dataDipilih.periode || [],
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditPerpanjangMasaAktifOpen(true);
    }
  };

  const handleGantiKartu = (id) => {
    console.log('Ganti Kartu ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataDataMember?.data?.find(
      (item) => item.id === id
    );

    

    if (dataDipilih) {
      setSelectedEditGantiKartu({
        json: dataDipilih || {},
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',
        // jenis_perusahaan: dataDipilih.jenis_perusahaan || '',
        // kontak: dataDipilih.kontak || '',
        no_hp: dataDipilih.no_hp || '',
        perusahaan_id: dataDipilih.perusahaan_id || '',
        akses_tiket: dataDipilih.akses_tiket || false,
        akses_kartu: dataDipilih.akses_kartu || false,
        no_kartu: dataDipilih.no_kartu || '',
        tgl_input: dataDipilih.tgl_input || '',
        produk_id: dataDipilih.produk_id || '',
        tarif: dataDipilih.tarif || '',
        biaya_member: dataDipilih.biaya_member || '',
        biaya_kartu: dataDipilih.biaya_kartu || '',
        user_id: dataDipilih.user_id || '',
        periode: dataDipilih.periode || [],
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditGantiKartuOpen(true);
    }
  };

  const handleGantiNomorPolisi = (id) => {
    console.log('Ganti Nomor Polisi ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataDataMember?.data?.find(
      (item) => item.id === id
    );

    if (dataDipilih) {
      setSelectedEditNomorPolisi({
        json: dataDipilih || {},
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',
        // jenis_perusahaan: dataDipilih.jenis_perusahaan || '',
        // kontak: dataDipilih.kontak || '',
        no_hp: dataDipilih.no_hp || '',
        perusahaan_id: dataDipilih.perusahaan_id || '',
        akses_tiket: dataDipilih.akses_tiket || false,
        akses_kartu: dataDipilih.akses_kartu || false,
        no_kartu: dataDipilih.no_kartu || '',
        tgl_input: dataDipilih.tgl_input || '',
        produk_id: dataDipilih.produk_id || '',
        tarif: dataDipilih.tarif || '',
        biaya_member: dataDipilih.biaya_member || '',
        biaya_kartu: dataDipilih.biaya_kartu || '',
        user_id: dataDipilih.user_id || '',
        periode: dataDipilih.periode || [],
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditNomorPolisiOpen(true);
    }
  };

  const handleRiwayatTransaksi = (id) => {
    console.log('Riwayat Transaksi ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataDataMember?.data?.find(
      (item) => item.id === id
    );

    if (dataDipilih) {
      setSelectedViewRiwayatTransaksi({
        json: dataDipilih || {},
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',
        // jenis_perusahaan: dataDipilih.jenis_perusahaan || '',
        // kontak: dataDipilih.kontak || '',
        no_hp: dataDipilih.no_hp || '',
        perusahaan_id: dataDipilih.perusahaan_id || '',
        akses_tiket: dataDipilih.akses_tiket || false,
        akses_kartu: dataDipilih.akses_kartu || false,
        no_kartu: dataDipilih.no_kartu || '',
        tgl_input: dataDipilih.tgl_input || '',
        produk_id: dataDipilih.produk_id || '',
        tarif: dataDipilih.tarif || '',
        biaya_member: dataDipilih.biaya_member || '',
        biaya_kartu: dataDipilih.biaya_kartu || '',
        user_id: dataDipilih.user_id || '',
        periode: dataDipilih.periode || [],
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalViewRiwayatTransaksiOpen(true);
    }
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    // setShowTabel(true);
    setSearchText(query.searchText); // simpan input pencarian
    setCurrentPage(1); // reset ke halaman pertama
  };

  // if (isLoading)
  //   return (
  //     <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
  //       <Spinner size={32} color="border-black" />
  //       Loading...
  //     </div>
  //   );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  const dataApi = masterDataDataMember || {};

  const handlePageChange = (page) => {
    setCurrentPage(page); // trigger TanStack React Query re-fetch dengan page baru
  };

  const rows =
    masterDataDataMember?.data?.map((row, index) => {
      return {
        no: index + 1,
        nama: row.nama == null ? '-' : <b>{row.nama || '-'}</b>,
        kontak: row.no_hp || '-',
        perusahaan:
          (row.perusahaan?.nama || '-') +
          ' (' +
          (row.perusahaan?.jenis_perusahaan || 'Tidak diketahui') +
          ')',
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
            onPerpanjang={
              hakAksesMDDataMember.perpanjang == true
                ? () => handlePerpanjang(row.id)
                : null
            }
            isGantiKartu={
              hakAksesMDDataMember.ganti_kartu == true
                ? row.akses_kartu || false
                : false
            }
            onGantiKartu={
              hakAksesMDDataMember.ganti_kartu == true
                ? () => handleGantiKartu(row.id)
                : null
            }
            isGantiNomorPolisi={
              hakAksesMDDataMember.ganti_nomor_polisi == true
                ? row.data_nomor_polisi.length > 0
                  ? true
                  : false
                : false
            }
            onGantiNomorPolisi={
              hakAksesMDDataMember.ganti_nomor_polisi == true
                ? () => handleGantiNomorPolisi(row.id)
                : null
            }
            onRiwayatTransaksi={
              hakAksesMDDataMember.riwayat_transaksi == true
                ? () => handleRiwayatTransaksi(row.id)
                : null
            }
            onEdit={
              hakAksesMDDataMember.update == true
                ? () => handleEdit(row.id)
                : null
            }
            onDelete={
              hakAksesMDDataMember.delete == true
                ? () => handleDelete(row.id)
                : null
            }
            isActive={true}
            moreAction={
              hakAksesMDDataMember.perpanjang != true &&
              hakAksesMDDataMember.ganti_kartu != true &&
              hakAksesMDDataMember.ganti_nomor_polisi != true &&
              hakAksesMDDataMember.riwayat_transaksi != true
                ? ''
                : titleSection
            }
          />
        ),
      };
    }) || [];

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

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
          buttonText={
            hakAksesMDDataMember.create == true ? `Tambah ${titleSection}` : ''
          }
          onButtonClick={
            hakAksesMDDataMember.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDDataMember.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDDataMember.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDDataMember.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />
        {hakAksesMDDataMember.read == true && (
          <>
            <EvoExportApiPDF
              isOpen={modalExportPDFOpen}
              onClose={() => setModalExportPDFOpen(false)}
              endpoint={urlExport + 'pdf'}
              filename={titleSection}
            />
            <EvoExportApiExcel
              isOpen={modalExportExcel}
              onClose={() => setModalExportExcel(false)}
              endpoint={urlExport + 'excel'}
              filename={titleSection}
            />
            <EvoExportApiPrint
              isOpen={modalExportPrint}
              onClose={() => setModalExportPrint(false)}
              endpoint={urlExport + 'pdf'}
            />
          </>
        )}

        {hakAksesMDDataMember.read == true && (
          <>
            {!hideNotFinished.evoSearchTabel_DataMemberSection && (
              <EvoSearchTabel
                isFilter={
                  hideNotFinished.evoSearchTabel_Filter_DataMemberSection ==
                  false
                    ? true
                    : false
                }
                FilterComponent={FilterMasProdukMember}
                placeholder="Ketik nama member atau no. handphone member atau no. kartu..."
                onSearch={handleSearch}
              />
            )}
          </>
        )}
        {hakAksesMDDataMember.create == true && (
          <AddDataMemberForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
            hakAkses={dataHakAkses?.[0]?.nama}
          />
        )}
        {hakAksesMDDataMember.update == true && (
          <EditDataMemberForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
            hakAkses={dataHakAkses?.[0]?.nama}
          />
        )}
        {hakAksesMDDataMember.perpanjang == true && (
          <EditPerpanjangMasaAktifForm
            isOpen={modalEditPerpanjangMasaAktifOpen}
            onClose={handleEditPerpanjangMasaAktifTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditPerpanjangMasaAktifData}
          />
        )}
        {hakAksesMDDataMember.ganti_kartu == true && (
          <EditGantiKartuForm
            isOpen={modalEditGantiKartuOpen}
            onClose={handleEditGantiKartuTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditGantiKartuData}
          />
        )}

        {hakAksesMDDataMember.ganti_nomor_polisi == true && (
          <EditGantiNomorPolisiForm
            isOpen={modalEditNomorPolisiOpen}
            onClose={handleEditNomorPolisiTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditNomorPolisiData}
          />
        )}

        {hakAksesMDDataMember.riwayat_transaksi == true && (
          <ViewRiwayatTransaksiForm
            isOpen={modalViewRiwayatTransaksiOpen}
            onClose={handleViewRiwayatTransaksiTutup}
            onSubmit={handleSubmitData}
            initialData={selectedViewRiwayatTransaksiData}
          />
        )}
        {hakAksesMDDataMember.read == true && (
          <div className="relative">
            {isLoading && <EvoLoading />}
            <EvoTable
              id="tableToPrint"
              tableData={tableDataMember}
              currentPage={currentPage}
              totalPages={dataApi?.totalPages}
              onPageChange={handlePageChange}
              rows={rows}
            />
          </div>
        )}
      </EvoCardSection>
    </>
  );
}
