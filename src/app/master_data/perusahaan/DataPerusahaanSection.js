//PerusahaanSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddDataPerusahaanForm from './forms/AddForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataPerusahaan } from './tableDataPerusahaan';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiMasterDataPerusahaan } from './api/fetchApiMasterDataPerusahaan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataPerusahaanDelete } from './api/fetchApiMasterDataPerusahaanDelete';
import EditDataPerusahaanForm from './forms/EditForm';
import { useHookStatusPerusahaan } from './hooks/useHookStatusPerusahaan';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import numbers from '@/utils/numbers';

const titleSection = 'Data Perusahaan';

export default function PerusahaanSection() {
  const urlExport = '/master-data/perusahaan/';
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

  const { toggleStatus, notif, setNotif } = useHookStatusPerusahaan();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

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
  const hakAksesMDPerusahaan =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Perusahaan')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDPerusahaan).some(
    (v) => v === true
  );

  // console.log(JSON.stringify(dataHakAkses?.[0]));

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      console.log('User ID yang terautentikasi:', id);
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (notif.message) {
      setNotifMessage(notif.message);
      setNotifType(notif.type);
    }
  }, [notif]);

  const {
    data: masterDataPerusahaan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataPerusahaan', currentPage],
    queryFn: () =>
      fetchApiMasterDataPerusahaan({
        limit:  numbers.apiNumLimit,
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

    const dataDipilih = masterDataPerusahaan?.data?.find(
      (item) => item.id === id
    );

    console.log(dataDipilih);

    if (dataDipilih) {
      setSelectedEdit({
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',
        jenis_perusahaan: dataDipilih.jenis_perusahaan || '',
        kontak: dataDipilih.kontak || '',
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditOpen(true);
    }
  };

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataPerusahaanDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataPerusahaan']);

    // setConfirmDeleteId(null); // tutup tooltip
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

  // console.log('Data Perusahaan:', masterDataPerusahaan.pageSize);
  const dataApi = masterDataPerusahaan || {};

  const rows =
    masterDataPerusahaan?.data?.length > 0
      ? masterDataPerusahaan.data.map((perusahaan, index) => ({
          no: index + 1,
          nama: <b>{perusahaan.nama || <i>*empty</i>}</b>,
          jenisPerusahaan: perusahaan.jenis_perusahaan || <i>*empty</i>,
          kontak: perusahaan.kontak || <i>*empty</i>,
          status: StatusLabel.status(perusahaan.status) || <i>*empty</i>,
          added: new Date(perusahaan.createdAt).toLocaleString() || (
            <i>*empty</i>
          ),
          updated: new Date(perusahaan.updatedAt).toLocaleString() || (
            <i>*empty</i>
          ),
          aksi: (
            <EvoActionButtons
              rowId={perusahaan.id}
              onEdit={
                hakAksesMDPerusahaan.update == true
                  ? () => handleEdit(perusahaan.id)
                  : null
              }
              onDelete={
                hakAksesMDPerusahaan.delete == true
                  ? () => handleDelete(perusahaan.id)
                  : null
              }
              isActive={perusahaan.status}
              onAktifkan={
                hakAksesMDPerusahaan.aktif_nonaktif == true
                  ? () => toggleStatus(perusahaan.id, true)
                  : null
              }
              onNonAktifkan={
                hakAksesMDPerusahaan.aktif_nonaktif == true
                  ? () => toggleStatus(perusahaan.id, false)
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
          // onClose={() => setNotif({ message: '', type: 'success' })}
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
        {/* <p>User ID: {userId}</p> ✅ Tampilkan User ID di UI untuk pengecekan */}
        <EvoTitleSection
          title={titleSection}
          handleChange={handleChange}
          buttonText={
            hakAksesMDPerusahaan.create == true ? `Tambah ${titleSection}` : ''
          }
          onButtonClick={
            hakAksesMDPerusahaan.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          // onExportPDF={() => exportPDF('tableToPrint', titleSection)}
          onExportPDF={
            hakAksesMDPerusahaan.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDPerusahaan.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDPerusahaan.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />
        {hakAksesMDPerusahaan.read == true && (
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

        {hakAksesMDPerusahaan.create == true && (
          <AddDataPerusahaanForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMDPerusahaan.update == true && (
          <EditDataPerusahaanForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}
        {hakAksesMDPerusahaan.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataPerusahaan}
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
