'use client';

import React, { useEffect, useState } from 'react';
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
import { fetchApiMasterDataLevelPenggunaDelete } from './api/fetchApiMasterDataLevelPenggunaDelete';
import EvoNotifCard from '@/components/EvoNotifCard';
import EditLevelPenggunaForm from './forms/EditForm';
import PengaturanLevelPenggunaForm from './forms/PengaturanForm';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import numbers from '@/utils/numbers';
import { fetchApiMasterDataPerusahaan } from './api/fetchApiMasterDataPerusahaan';
import { fetchApiProfil } from '@/app/profil/api/fetchApiProfil';

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

  const [selectedEditData, setSelectedEdit] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleEditTutup = () => setModalEditOpen(false);

  const [selectedPengaturanData, setSelectedPengaturan] = useState(null);
  const [modalPengaturanOpen, setModalPengaturanOpen] = useState(false);
  const handlePengaturanTutup = () => setModalPengaturanOpen(false);

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);
  //

  const {
    data: profil,
    errorProfil,
    isLoadingProfil,
  } = useQuery({
    queryKey: ['profil'],
    queryFn: fetchApiProfil,
    // retry: false,
  });

  const {
    data: masterDataLevelPengguna,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'masterDataLevelPengguna',
      currentPage,
      dataHakAkses?.[0]?.nama,
      profil?.[0]?.perusahaan_id,
    ],
    queryFn: () =>
      fetchApiMasterDataLevelPengguna({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        hakAkses: dataHakAkses?.[0]?.nama,
        perusahaanId: profil?.[0]?.perusahaan_id,
      }),
    // retry: false,

    enabled: !!dataHakAkses?.[0]?.nama && !!profil?.[0]?.perusahaan_id, // ✅ pastikan 2-2nya ada
    // enabled: !!dataHakAkses?.[0]?.nama, // ✅ pastikan hanya fetch kalau sudah ada hakAkses
  });

  console.log('dataHakAkses?.[0]?.nama: ' + dataHakAkses?.[0]?.nama);

  const hakAksesMDLevelPengguna =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Level Pengguna')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDLevelPengguna).some(
    (v) => v === true
  );

  // console.log(JSON.stringify(masterDataLevelPengguna));

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

    const dataDipilih = masterDataLevelPengguna?.data?.find(
      (item) => item.id === id
    );

    console.log(dataDipilih);

    if (dataDipilih) {
      setSelectedEdit({
        id: dataDipilih?.id,
        nama: dataDipilih?.nama || '',

        nama: dataDipilih?.nama || '',
        perusahaan_id: dataDipilih?.perusahaan_id || '',

        hak_akses: dataDipilih?.hak_akses || '',
      });
      setModalEditOpen(true);
    }
  };

  const handlePengaturan = (id) => {
    console.log('Tombol Pengaturan diklik untuk ID:', id);
    // Logika untuk melakukan pengaturan (misalnya membuka form modal)

    const dataDipilih = masterDataLevelPengguna?.data?.find(
      (item) => item.id === id
    );

    console.log(dataDipilih);

    if (dataDipilih) {
      setSelectedPengaturan({
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',

        nama: dataDipilih.nama || '',
        perusahaan_id: dataDipilih.perusahaan_id || '',

        hak_akses: dataDipilih.hak_akses || '',
      });
      setModalPengaturanOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);

    await fetchApiMasterDataLevelPenggunaDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataLevelPengguna']); // logic delete
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

  const dataApi = masterDataLevelPengguna || {};
  // console.log(dataApi);

  const rows =
    masterDataLevelPengguna?.data?.length > 0
      ? masterDataLevelPengguna.data
          .filter((row) => {
            const hakAksesLogin = dataHakAkses?.[0]?.nama;

            if (hakAksesLogin === 'Super Admin') {
              // Super Admin → hide Super Admin saja
              return row.nama !== 'Super Admin';
            }
            if (hakAksesLogin === 'Administrator Tenant') {
              // Administrator Tenant → hide Super Admin & Administrator Tenant
              return (
                row.nama !== 'Super Admin' &&
                row.nama !== 'Administrator Tenant'
              );
            }
            // Selain itu → semua tampil
            return true;
          })
          .map((row, index) => ({
            no: index + 1,
            nama: <b>{row.nama || <i>*empty</i>}</b>,
            perusahaan: (
              <b>
                {row?.perusahaan != null && row.perusahaan != undefined ? (
                  row?.perusahaan?.nama
                ) : (
                  <i>*empty</i>
                )}
              </b>
            ),
            hakAkses:
              row.hak_akses && row.hak_akses.length > 0 ? (
                <EvoAccessLabel akses={row.hak_akses} />
              ) : (
                'Tidak ada hak akses'
              ),
            added: new Date(row.createdAt).toLocaleString() || <i>*empty</i>,
            updated: new Date(row.updatedAt).toLocaleString() || <i>*empty</i>,
            aksi: (
              <EvoActionButtons
                rowId={row.no}
                onConfigure={
                  hakAksesMDLevelPengguna.pengaturan == true
                    ? () => handlePengaturan(row.id)
                    : null
                }
                onEdit={
                  hakAksesMDLevelPengguna.update == true
                    ? () => handleEdit(row.id)
                    : null
                }
                onDelete={
                  hakAksesMDLevelPengguna.delete == true
                    ? () => handleDelete(row.id)
                    : null
                }
              />
            ),
          }))
      : [];

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
        {/* {dataHakAkses?.[0]?.nama} */}
        <EvoTitleSection
          title={titleSection}
          handleChange={handleChange}
          buttonText={
            hakAksesMDLevelPengguna.create == true
              ? `Tambah ${titleSection}`
              : ''
          }
          onButtonClick={
            hakAksesMDLevelPengguna.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
        />
        {dataHakAkses?.[0]?.nama == 'Super Admin' ||
        dataHakAkses?.[0]?.nama == 'Administrator Tenant' ? (
          hakAksesMDLevelPengguna.create == true && (
            <AddLevelPenggunaForm
              isOpen={modalOpen}
              onClose={handleTutup}
              onSubmit={handleSubmitData}
              hakAkses={dataHakAkses?.[0]?.nama}
              perusahaanId={profil[0]?.perusahaan_id||null}
            />
          )
        ) : (
          <></>
        )}

        {hakAksesMDLevelPengguna.pengaturan == true && (
          <PengaturanLevelPenggunaForm
            isOpen={modalPengaturanOpen}
            onClose={handlePengaturanTutup}
            onSubmit={handleSubmitData}
            initialData={selectedPengaturanData}
          />
        )}
        {hakAksesMDLevelPengguna.update == true && (
          <EditLevelPenggunaForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}
        {hakAksesMDLevelPengguna.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataLevelPengguna}
            currentPage={currentPage}
            totalPages={dataApi?.totalPages}
            onPageChange={handlePageChange}
            rows={rows}
            isTallRow={true}
          />
        )}
      </EvoCardSection>
    </>
  );
}
