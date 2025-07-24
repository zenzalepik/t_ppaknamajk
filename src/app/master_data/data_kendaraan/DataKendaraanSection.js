'use client';

import React, { useEffect, useState } from 'react';
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
import { tableDataKendaraan } from './tableDataKendaraan';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { fetchApiMasterDataDataKendaraan } from './api/fetchApiMasterDataDataKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataKendaraanDelete } from './api/fetchApiMasterDataDataKendaraanDelete';
import EvoNotifCard from '@/components/EvoNotifCard';
import EditKendaraanForm from './forms/EditForm';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { useHookStatusDataKendaraan } from './hooks/useHookStatusDataKendaraan';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';

const titleSection = 'Data Kendaraan';

export default function DataKendaraanSection() {
  const urlExport = '/master-data/kendaraan/';
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

  const { toggleStatus, notif, setNotif } = useHookStatusDataKendaraan();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesMDDataKendaraan =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Data Kendaraan')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDDataKendaraan).some(
    (v) => v === true
  );

  useEffect(() => {
    if (notif.message) {
      setNotifMessage(notif.message);
      setNotifType(notif.type);
    }
  }, [notif]);

  const {
    data: masterDataDataKendaraan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataKendaraan', currentPage],
    queryFn: () =>
      fetchApiMasterDataDataKendaraan({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: dataTipeKendaraan,
    error: errorTipeKendaraan,
    isLoading: isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanTipeKendaraan'],
    queryFn: () => fetchApiPengaturanParameterTipeKendaraan(),
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

    const dataDipilih = masterDataDataKendaraan?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      setSelectedEdit({
        id: dataDipilih.id,
        nama_kendaraan: dataDipilih.nama_kendaraan || '',
        tipe_kendaraan_id: dataDipilih.tipe_kendaraan_id || '',
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataDataKendaraanDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataDataKendaraan']);
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

  const tipeKendaraanMap =
    dataTipeKendaraan?.data?.reduce((acc, tipe) => {
      acc[tipe.id] = tipe.tipe_kendaraan;
      return acc;
    }, {}) || {};

  // console.log(tipeKendaraanMap);

  const dataApi = masterDataDataKendaraan || {};

  const rows =
    masterDataDataKendaraan?.data?.map((row, index) => ({
      no: index + 1,
      nama: row.nama_kendaraan != null ? <b>{row.nama_kendaraan}</b> : '-',
      tipeKendaraan:
        row.tipe_kendaraan_id != null
          ? tipeKendaraanMap[row.tipe_kendaraan_id]
          : '-',
      status: StatusLabel.status(row.status),
      added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
      updated: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-',
      aksi: (
        <EvoActionButtons
          rowId={row.id}
          onEdit={
            hakAksesMDDataKendaraan.update == true
              ? () => handleEdit(row.id)
              : null
          }
          onDelete={
            hakAksesMDDataKendaraan.delete == true
              ? () => handleDelete(row.id)
              : null
          }
          isActive={row.status}
          onAktifkan={
            hakAksesMDDataKendaraan.aktif_nonaktif == true
              ? () => toggleStatus(row.id, true)
              : null
          }
          onNonAktifkan={
            hakAksesMDDataKendaraan.aktif_nonaktif == true
              ? () => toggleStatus(row.id, false)
              : null
          }
        />
      ),
    })) || [];

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
          // radioItems={radioItems}
          // monthNames={monthNames}
          // years={years}
          handleChange={handleChange}
          buttonText={
            hakAksesMDDataKendaraan.create == true
              ? `Tambah ${titleSection}`
              : ''
          }
          onButtonClick={
            hakAksesMDDataKendaraan.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDDataKendaraan.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDDataKendaraan.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDDataKendaraan.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />
        {hakAksesMDDataKendaraan.read == true && (
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
        {/* <EvoSearchTabel
        placeholder="Temukan loker impian kamu..."
        buttonText="Pencarian"
        onSearch={handleSearch}
      /> */}
        {hakAksesMDDataKendaraan.create == true && (
          <AddKendaraanForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMDDataKendaraan.update == true && (
          <EditKendaraanForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}
        {hakAksesMDDataKendaraan.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataKendaraan}
            currentPage={currentPage}
            totalPages={dataApi?.totalPages}
            onPageChange={handlePageChange}
            rows={rows}
          />
        )}
      </EvoCardSection>
    </>
  );
}
