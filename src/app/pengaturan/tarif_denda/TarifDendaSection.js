//TarifDendaSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditTarifDendaForm from './forms/EditForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataTarifDenda } from './tableDataTarifDenda';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import { fetchApiPengaturanTarifDenda } from './api/fetchApiPengaturanTarifDenda';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { useHookStatusTarifDenda } from './hooks/useHookStatusTarifDenda';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';

const titleSection = 'Tarif Denda';

export default function TarifDendaSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);
  const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const [selectedData, setSelectedData] = useState(null);

  const { toggleStatus, notif, setNotif } = useHookStatusTarifDenda();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesPTarifDenda =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Pengaturan')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Tarif Denda')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesPTarifDenda).some(
    (v) => v === true
  );

  useEffect(() => {
    if (notif.message) {
      setNotifMessage(notif.message);
      setNotifType(notif.type);
    }
  }, [notif]);

  const {
    data: dataTipeKendaraan,
    error: errorTipeKendaraan,
    isLoading: isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanTipeKendaraan'],
    queryFn: () =>
      fetchApiPengaturanParameterTipeKendaraan({
        limit: 5,
      }),
  });

  const {
    data: pengaturanTarifDenda,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanTarifDenda', currentPage],
    queryFn: () =>
      fetchApiPengaturanTarifDenda({
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

    const dataDipilih = pengaturanTarifDenda?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      // console.log(dataDipilih);
      setSelectedData({
        id: dataDipilih.id,
        tipeKendaraan: dataDipilih.kendaraan?.nama_kendaraan || '',
        kendaraan_id: dataDipilih.kendaraan_id,
        denda_tiket: String(dataDipilih.denda_tiket) || '',
        denda_stnk: String(dataDipilih.denda_stnk) || '',
        denda_member: dataDipilih.denda_member || false,
        status: dataDipilih.status || false,
      });
      setModalOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // const handleDelete = async(id) => {
  //   console.log('Hapus ID:', id);
  //       await fetchApiMasterDataPerusahaanDelete(id, setNotifMessage, setNotifType);

  //       // ✅ Pastikan data diperbarui secara real-time
  //       queryClient.invalidateQueries(['masterDataPerusahaan']);
  //   // logic delete
  // };

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

  const getNamaTipeKendaraan = (id, tipeList = []) => {
    const found = tipeList.find((item) => item.id === id);
    return found ? found.tipe_kendaraan : '-';
  };

  const dataApi = pengaturanTarifDenda || {};

  const rows =
    pengaturanTarifDenda?.data?.length > 0
      ? pengaturanTarifDenda?.data?.map((row, index) => ({
          no: index + 1,
          kendaraan: (
            <b>
              {row.kendaraan
                ? `${row.kendaraan.nama_kendaraan} (${
                    row.kendaraan.tipe_kendaraan_id == null
                      ? '-'
                      : getNamaTipeKendaraan(
                          row.kendaraan.tipe_kendaraan_id,
                          dataTipeKendaraan?.data
                        )
                  })`
                : 'Tidak ditemukan'}
            </b>
          ),

          tarifDendaTiket:
            row.denda_tiket != null
              ? `Rp ${row.denda_tiket.toLocaleString()}`
              : '-',
          tarifDendaSTNK:
            row.denda_stnk != null
              ? `Rp ${row.denda_stnk.toLocaleString()}`
              : '-',
          dendaUntukMember: StatusLabel.isDendaMember(row.denda_member),
          status: StatusLabel.status(row.status),
          // status:  StatusLabel.status(true),
          updated: row.updatedAt
            ? new Date(row.updatedAt).toLocaleString()
            : '-',
          // added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={
                hakAksesPTarifDenda.update == true
                  ? () => handleEdit(row.id)
                  : null
              }
              isActive={row.status}
              onAktifkan={
                hakAksesPTarifDenda.aktif_nonaktif == true
                  ? () => toggleStatus(row.id, true)
                  : null
              }
              onNonAktifkan={
                hakAksesPTarifDenda.aktif_nonaktif == true
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
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesPTarifDenda.read == true
              ? () => exportPDF('tableToPrint', titleSection)
              : null
          }
          onExportExcel={
            hakAksesPTarifDenda.read == true
              ? () => exportExcel('tableToPrint', titleSection)
              : null
          }
          onPrint={
            hakAksesPTarifDenda.read == true
              ? () => exportPrint('tableToPrint', titleSection)
              : null
          }
        />

      {hakAksesPTarifDenda.update == true && (
        <EditTarifDendaForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
          initialData={selectedData}
        />)}
        
      {hakAksesPTarifDenda.read == true && (
        <EvoTable
          id="tableToPrint"
          tableData={tableDataTarifDenda}
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
