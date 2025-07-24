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
import AddShiftForm from './forms/AddForm';
import { tableDataShift } from './tableDataShift';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiMasterDataShift } from './api/fetchApiMasterDataShift';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataShiftDelete } from './api/fetchApiMasterDataShiftDelete';
import EvoNotifCard from '@/components/EvoNotifCard';
import EditShiftForm from './forms/EditForm';
import { useHookStatusDataShift } from './hooks/useHookStatusDataShift';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';

const titleSection = 'Data Shift';

export default function DataShiftSection() {
  const urlExport = '/master-data/shift/';
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

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleEditTutup = () => setModalEditOpen(false);
  const [selectedData, setSelectedEdit] = useState(null);

  const { toggleStatus, notif, setNotif } = useHookStatusDataShift();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesMDShift =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Shift')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDShift).some(
    (v) => v === true
  );

  const {
    data: masterDataDataShift,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataShift', currentPage],
    queryFn: () =>
      fetchApiMasterDataShift({
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

  const handleEdit = (id) => {
    // console.log('Tombol Edit diklik untuk ID:', id);
    const dataDipilih = masterDataDataShift?.data?.find(
      (item) => item.id === id
    );
    // console.log(dataDipilih);
    if (dataDipilih) {
      setSelectedEdit({
        id: dataDipilih.id,

        nama_shift: dataDipilih.nama_shift || '',
        awal_shift: dataDipilih.awal_shift || '',
        akhir_shift: dataDipilih.akhir_shift || '',
      });
      setModalEditOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataShiftDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataDataShift']);
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

  // const rows = tableDataShift.rows.map((row) => ({
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

  const dataApi = masterDataDataShift || {};

  const rows =
    masterDataDataShift?.data?.length > 0
      ? masterDataDataShift?.data?.map((row, index) => ({
          no: index + 1,
          nama: <b>{row.nama_shift || '-'}</b>,
          kontak: row.awal_shift || '-',
          row: row.akhir_shift || '-',
          status: StatusLabel.status(row.status),

          added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
          updated: row.updatedAt
            ? new Date(row.updatedAt).toLocaleString()
            : '-',
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={
                hakAksesMDShift.update == true ? () => handleEdit(row.id) : null
              }
              onDelete={
                hakAksesMDShift.delete == true
                  ? () => handleDelete(row.id)
                  : null
              }
              isActive={row.status || false}
              onAktifkan={
                hakAksesMDShift.aktif_nonaktif == true
                  ? () => toggleStatus(row.id, true)
                  : null
              }
              onNonAktifkan={
                hakAksesMDShift.aktif_nonaktif == true
                  ? () => toggleStatus(row.id, false)
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
            hakAksesMDShift.create == true ? `Tambah ${titleSection}` : ''
          }
          onButtonClick={
            hakAksesMDShift.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDShift.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDShift.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDShift.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />{' '}
        {hakAksesMDShift.read == true && (
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
        {hakAksesMDShift.create == true && (
          <AddShiftForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMDShift.update == true && (
          <EditShiftForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedData}
          />
        )}
        {hakAksesMDShift.read == true && (
          <EvoTable
            tableData={tableDataShift}
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
