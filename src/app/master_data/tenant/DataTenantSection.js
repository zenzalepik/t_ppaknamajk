//TenantSection.js
'use client';
import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine } from '@remixicon/react';
import AddDataTenantForm from './forms/AddForm';
import { tableDataTenant } from './tableDataTenant';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiMasterDataTenant } from './api/fetchApiMasterDataTenant';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataTenantDelete } from './api/fetchApiMasterDataTenantDelete';
import EditDataTenantForm from './forms/EditForm';
import { useHookStatusTenant } from './hooks/useHookStatusTenant';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import numbers from '@/utils/numbers';
import { fetchApiMasterDataUser } from './api/fetchApiMasterDataUser';

const titleSection = 'Data Tenant';

export default function TenantSection() {
  const urlExport = '/master-data/tenant/';
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

  const { toggleStatus, notif, setNotif } = useHookStatusTenant();

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
  const hakAksesMdTenant =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Tenant')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMdTenant).some(
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
    data: masterDataTenant,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataTenant', currentPage],
    queryFn: () =>
      fetchApiMasterDataTenant({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: masterDataUser,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useQuery({
    queryKey: ['masterDataUser', currentPage],
    queryFn: () =>
      fetchApiMasterDataUser({
        limit: numbers.apiNumLimit,
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

    const dataDipilih = masterDataTenant?.data?.find((item) => item.id === id);
    const dataDipilihUser = masterDataUser?.data?.find(
      (item) => item.id === id
    );

    if (dataDipilih && dataDipilihUser) {
      setSelectedEdit({
        id: dataDipilih.id,
        nama_tenant: dataDipilih.nama_tenant || '',
        username: dataDipilihUser.username || '',
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditOpen(true);
    }
  };

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataTenantDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataTenant']);

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

  // console.log('Data Perusahaan:', masterDataTenant.pageSize);
  const dataApi = masterDataTenant || {};

  const rows =
    masterDataTenant?.data?.length > 0
      ? masterDataTenant.data.map((tenant, index) => ({
          no: index + 1,
          nama_tenant: <b>{tenant.nama_tenant || <i>*empty</i>}</b>,
          added: new Date(tenant.createdAt).toLocaleString() || <i>*empty</i>,
          updated: new Date(tenant.updatedAt).toLocaleString() || <i>*empty</i>,
          aksi: (
            <EvoActionButtons
              rowId={tenant.id}
              onEdit={
                hakAksesMdTenant.update == true
                  ? () => handleEdit(tenant.id)
                  : null
              }
              onDelete={
                hakAksesMdTenant.delete == true
                  ? () => handleDelete(tenant.id)
                  : null
              }
              isActive={tenant.status}
              onAktifkan={
                hakAksesMdTenant.aktif_nonaktif == true
                  ? () => toggleStatus(tenant.id, true)
                  : null
              }
              onNonAktifkan={
                hakAksesMdTenant.aktif_nonaktif == true
                  ? () => toggleStatus(tenant.id, false)
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
            hakAksesMdTenant.create == true ? `Tambah ${titleSection}` : ''
          }
          onButtonClick={
            hakAksesMdTenant.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          // onExportPDF={() => exportPDF('tableToPrint', titleSection)}
          onExportPDF={
            hakAksesMdTenant.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMdTenant.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMdTenant.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />
        {hakAksesMdTenant.read == true && (
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

        {hakAksesMdTenant.create == true && (
          <AddDataTenantForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMdTenant.update == true && (
          <EditDataTenantForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}
        {hakAksesMdTenant.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataTenant}
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
