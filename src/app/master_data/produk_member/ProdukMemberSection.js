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
import AddProdukMemberForm from './forms/AddForm';
import { tableProdukMember } from './tableProdukMember';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { fetchApiMasterDataProdukMember } from './api/fetchApiMasterDataProdukMember';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataProdukMemberDelete } from './api/fetchApiMasterDataProdukMemberDelete';
import EvoEmpty from '@/components/EvoEmpty';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import EditProdukMemberForm from './forms/EditForm';
import { useHookStatusProdukMember } from './hooks/useHookStatusProdukMember';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';

const titleSection = 'Produk Member';

export default function ProdukMemberSection() {
  const urlExport = '/master-data/produk-member/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const [selectedEditData, setSelectedEdit] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleEditTutup = () => setModalEditOpen(false);

  const { toggleStatus, notif, setNotif } = useHookStatusProdukMember();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesMDProdukMember =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Produk Member')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDProdukMember).some(
    (v) => v === true
  );

  useEffect(() => {
    if (notif.message) {
      setNotifMessage(notif.message);
      setNotifType(notif.type);
    }
  }, [notif]);

  const {
    data: masterDataProdukMember,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataProdukMember', currentPage],
    queryFn: () =>
      fetchApiMasterDataProdukMember({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: masterDataKendaraan,
    error: errorKendaraan,
    isLoading: loadingKendaraan,
  } = useQuery({
    queryKey: ['masterDataKendaraan'],
    queryFn: fetchApiMasterDataDataKendaraan,
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
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataProdukMember?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      setSelectedEdit({
        id: dataDipilih.id,
        // nama_kendaraan: dataDipilih.nama_kendaraan || '',
        // tipe_kendaraan_id: dataDipilih.tipe_kendaraan_id || '',

        nama: dataDipilih.nama || '',
        periode: dataDipilih.periode,
        list_id_kendaraan: dataDipilih.list_id_kendaraan,
        max_kendaraan: dataDipilih.max_kendaraan || '',
        tarif: dataDipilih.tarif || '',
        biaya_kartu: dataDipilih.biaya_kartu || '',
        biaya_ganti_nopol: dataDipilih.biaya_ganti_nopol || '',
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataProdukMemberDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataProdukMember']);

    // setConfirmDeleteId(null); // tutup tooltip
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

  if (isLoading || loadingKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  if (errorKendaraan) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorKendaraan.message)} />
    );
  }

  const formatPeriode = (periode) => {
    if (!periode || periode.length === 0) {
      return 'Tidak ada periode tersedia';
    }

    return periode
      .map(({ value, inclusive }) => {
        return value ? (
          `${value} (${inclusive ? 'Inclusive' : 'Exclusive'})`
        ) : (
          <EvoEmpty />
        );
      })
      .join(' - ');
  };

  const tipeKendaraanMap =
    dataTipeKendaraan?.data?.reduce((acc, tipe) => {
      acc[tipe.id] = tipe.tipe_kendaraan;
      return acc;
    }, {}) || {};

  // console.log('Data Perusahaan:', masterDataProdukMember.pageSize);
  const dataApi = masterDataProdukMember || {};

  const rows =
    masterDataProdukMember?.data?.map((row, index) => ({
      no: index + 1,

      nama: <b>{row.nama}</b> || <EvoEmpty />,
      rentangTanggal: formatPeriode(row.periode),
      kendaraan: (
        <ul className="list-disc pl-4">
          {row.list_id_kendaraan.map((id, index) => {
            const kendaraan = masterDataKendaraan?.data?.find(
              (k) => k.id.toString() === id
            );
            return (
              <li key={`${id}-${index}`}>
                {kendaraan
                  ? // ? `${kendaraan.nama_kendaraan} (${kendaraan.tipe_kendaraan})`
                    `${kendaraan.nama_kendaraan} (${
                      kendaraan?.tipe_kendaraan?.tipe_kendaraan || '-'
                    })`
                  : 'Tidak ditemukan'}
              </li>
            );
          })}
        </ul>
      ),
      maxKendaraan: row.max_kendaraan + ' kendaraan' || <EvoEmpty />,
      tarif: `Rp ${row.tarif.toLocaleString()}` || <EvoEmpty />,
      biayaKartu: `Rp ${row.biaya_kartu.toLocaleString()}` || <EvoEmpty />,
      biayaGantiNopol: `Rp ${row.biaya_ganti_nopol.toLocaleString()}` || (
        <EvoEmpty />
      ),
      status: StatusLabel.status(row.status) || <EvoEmpty />,
      added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
      updated: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-',
      aksi: (
        <EvoActionButtons
          rowId={row.id}
          onEdit={
            hakAksesMDProdukMember.update == true
              ? () => handleEdit(row.id)
              : null
          }
          onDelete={
            hakAksesMDProdukMember.delete == true
              ? () => handleDelete(row.id)
              : null
          }
          isActive={row.status}
          onAktifkan={
            hakAksesMDProdukMember.aktif_nonaktif == true
              ? () => toggleStatus(row.id, true)
              : null
          }
          onNonAktifkan={
            hakAksesMDProdukMember.aktif_nonaktif == true
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
            hakAksesMDProdukMember.create == true
              ? `Tambah ${titleSection}`
              : ''
          }
          onButtonClick={
            hakAksesMDProdukMember.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDProdukMember.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDProdukMember.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDProdukMember.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />
        {hakAksesMDProdukMember.read == true && (
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
        {hakAksesMDProdukMember.create == true && (
          <AddProdukMemberForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMDProdukMember.update == true && (
          <EditProdukMemberForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}
        {hakAksesMDProdukMember.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableProdukMember}
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
