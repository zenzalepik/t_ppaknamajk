//DataPenggunaSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddDataPenggunaForm from './forms/AddForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataPengguna } from './tableDataPengguna';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasDataPengguna from './FilterMasDataPengguna';
import { fetchApiMasterDataDataPengguna } from './api/fetchApiMasterDataDataPengguna';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApiMasterDataDataPenggunaDelete } from './api/fetchApiMasterDataDataPenggunaDelete';
import EvoNotifCard from '@/components/EvoNotifCard';
import EditDataPenggunaForm from './forms/EditForm';
import { useHookStatusDataPengguna } from './hooks/useHookStatusDataPengguna';
import { fetchApiMasterDataPerusahaan } from '@/app/master_data/perusahaan/api/fetchApiMasterDataPerusahaan';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import numbers from '@/utils/numbers';
import EvoLoading from '@/components/EvoLoading';
import EvoEmpty from '@/components/EvoEmpty';

const titleSection = 'Data Pengguna';

export default function DataPenggunaSection() {
  const urlExport = '/profile/';
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

  const { toggleStatus, notif, setNotif } = useHookStatusDataPengguna();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  // const hakAksesPerusahaan =
  //   dataHakAkses?.[0]?.hak_akses?.find(
  //     (akses) => akses.nama_menu === 'Perusahaan'
  //   )?.aksi || {};
  const hakAksesMDDataPengguna =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Data Pengguna')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDDataPengguna).some(
    (v) => v === true
  );

  useEffect(() => {
    if (notif.message) {
      setNotifMessage(notif.message);
      setNotifType(notif.type);
    }
  }, [notif]);

  const {
    data: masterDataDataPengguna,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataPengguna', currentPage, searchText],
    queryFn: () =>
      fetchApiMasterDataDataPengguna({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        search: searchText,
      }),
    // retry: false,
    keepPreviousData: true,
  });

  const {
    data: masterDataPerusahaan,
    errorDataPerusahaan,
    isLoadingDataPerusahaan,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPage],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
        limit: numbers.apiNumLimitExpanded,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
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

    const dataDipilih = masterDataDataPengguna?.data?.find(
      (item) => item.id === id
    );

    console.log(dataDipilih);

    if (dataDipilih) {
      setSelectedEdit({
        id: dataDipilih.id || '',
        nama: dataDipilih.nama || '',
        no_hp: dataDipilih.no_hp || '',
        jenis_kelamin: dataDipilih.jenis_kelamin || '',
        alamat_lengkap: dataDipilih.alamat_lengkap || '',
        username: dataDipilih.username || '',
        password: dataDipilih.password || '',
        ulangiPassword: dataDipilih.password || '',
        perusahaan_id: dataDipilih.perusahaan_id || '',
        level_pengguna_id: dataDipilih.level_pengguna_id || '',
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

    await fetchApiMasterDataDataPenggunaDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataDataPengguna']); // logic delete
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
    setSearchText(query.searchText); // Simpan kata kunci
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const dataApi = masterDataDataPengguna || {};

  const rows =
    masterDataDataPengguna?.data?.length > 0
      ? masterDataDataPengguna.data
          .filter((row) => {
            // Jika bukan Super Admin → hide Super Admin
            if (
              dataHakAkses?.[0]?.level_pengguna?.nama !== 'Super Admin' &&
              row?.level_pengguna?.nama === 'Super Admin'
            ) {
              return false;
            }
            // Jika bukan Super Admin dan bukan Administrator Tenant → hide Administrator Tenant
            if (
              dataHakAkses?.[0]?.level_pengguna?.nama !== 'Super Admin' &&
              dataHakAkses?.[0]?.level_pengguna?.nama !==
                'Administrator Tenant' &&
              row?.level_pengguna?.nama === 'Administrator Tenant'
            ) {
              return false;
            }
            return true;
          })
          .map((row, index) => ({
            no: index + 1,
            nama: <b>{row.nama || <EvoEmpty />}</b>,
            jenkel: row.jenis_kelamin || <EvoEmpty />,
            noHp: row.no_hp || <EvoEmpty />,
            alamat: row.alamat_lengkap || <EvoEmpty />,
            perusahaan: (() => {
              const perusahaan = masterDataPerusahaan?.data?.find(
                (p) => p.id === row.perusahaan_id
              );
              return perusahaan ? (
                `${perusahaan.nama} ${
                  perusahaan.jenis_perusahaan
                    ? `(${perusahaan.jenis_perusahaan})`
                    : '(Tidak Diketahui)'
                }`
              ) : (
                <i>*tidak ditemukan</i>
              );
            })(),
            // row.perusahaan_id || <EvoEmpty />,
            level:
              row.level_pengguna != null ? (
                row.level_pengguna.nama || <EvoEmpty />
              ) : (
                <EvoEmpty />
              ),
            status: StatusLabel.status(row.status) || <EvoEmpty />,
            added: new Date(row.createdAt).toLocaleString() || <EvoEmpty />,
            updated: new Date(row.updatedAt).toLocaleString() || <EvoEmpty />,

            aksi: (
              <EvoActionButtons
                rowId={row.id}
                onEdit={
                  hakAksesMDDataPengguna.update == true
                    ? () => handleEdit(row.id)
                    : null
                }
                onDelete={
                  hakAksesMDDataPengguna.delete == true
                    ? () => handleDelete(row.id)
                    : null
                }
                isActive={row.status}
                onAktifkan={
                  hakAksesMDDataPengguna.aktif_nonaktif == true
                    ? () => toggleStatus(row.id, true)
                    : null
                }
                onNonAktifkan={
                  hakAksesMDDataPengguna.aktif_nonaktif == true
                    ? () => toggleStatus(row.id, false)
                    : null
                }
              />
            ),
          }))
      : [];

  // if (isLoadingDataPerusahaan || )
  //   return (
  //     <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
  //       <Spinner size={32} color="border-black" />
  //       Loading...
  //     </div>
  //   );

  if (errorDataPerusahaan || error) {
    return (
      <EvoErrorDiv
        errorHandlerText={getErrorMessage(errorDataPerusahaan || error)}
      />
    ); // ✅ Pastikan error ditampilkan di UI
  }

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
      {notif.message && (
        <EvoNotifCard
          message={notif.message}
          onClose={() => setNotif({ message: '', type: 'success' })}
          type={notif.type}
          autoClose={true}
        />
      )}
      <EvoCardSection>
        <EvoTitleSection
          title={titleSection}
          handleChange={handleChange}
          buttonText={
            hakAksesMDDataPengguna.create == true
              ? `Tambah ${titleSection}`
              : ''
          }
          onButtonClick={
            hakAksesMDDataPengguna.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDDataPengguna.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDDataPengguna.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDDataPengguna.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />{' '}
        {hakAksesMDDataPengguna.read == true && (
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
        {hakAksesMDDataPengguna.read == true && (
          <EvoSearchTabel
            // isFilter={true}
            // FilterComponent={FilterMasDataPengguna}
            placeholder="Ketik nama pengguna..."
            buttonText="Pencarian"
            onSearch={handleSearch}
            // onSearch={(data) => console.log('Hasil pencarian:', data)}
          />
        )}
        {hakAksesMDDataPengguna.create == true && (
          <AddDataPenggunaForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
            hakAkses={dataHakAkses?.[0]?.nama}
          />
        )}
        {hakAksesMDDataPengguna.update == true && (
          <EditDataPenggunaForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
            hakAkses={dataHakAkses?.[0]?.nama}
          />
        )}
        <div className="relative">
          {isLoading && <EvoLoading />}
          {hakAksesMDDataPengguna.read == true && (
            <EvoTable
              id="tableToPrint"
              tableData={tableDataPengguna}
              currentPage={currentPage}
              totalPages={dataApi?.totalPages}
              onPageChange={handlePageChange}
              rows={rows}
            />
          )}
        </div>
      </EvoCardSection>
    </>
  );
}
