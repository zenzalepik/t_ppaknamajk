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
import AddProdukVoucherForm from './forms/AddForm';
import { tableProdukVoucher } from './tableProdukVoucher';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { fetchApiMasterDataProdukVoucher } from './api/fetchApiMasterDataProdukVoucher';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataProdukVoucherDelete } from './api/fetchApiMasterDataProdukVoucherDelete';
import EvoNotifCard from '@/components/EvoNotifCard';
import EditKendaraanForm from './forms/EditForm';
import EditProdukVoucherForm from './forms/EditForm';
import { useHookStatusProdukVoucher } from './hooks/useHookStatusProdukVoucher';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';

const titleSection = 'Produk Voucher';

export default function ProdukVoucherSection() {
  const urlExport = '/master-data/produk-voucher/';
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

  const { toggleStatus, notif, setNotif } = useHookStatusProdukVoucher();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesMDProdukVoucher =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Produk Voucher')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDProdukVoucher).some(
    (v) => v === true
  );

  useEffect(() => {
    if (notif.message) {
      setNotifMessage(notif.message);
      setNotifType(notif.type);
    }
  }, [notif]);

  const {
    data: masterDataProdukVoucher,
    error: errorProduk,
    isLoading: loadingProduk,
  } = useQuery({
    queryKey: ['masterDataProdukVoucher', currentPage],
    queryFn: () =>
      fetchApiMasterDataProdukVoucher({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
  });

  const {
    data: masterDataKendaraan,
    error: errorKendaraan,
    isLoading: loadingKendaraan,
  } = useQuery({
    queryKey: ['masterDataKendaraan'],
    queryFn: fetchApiMasterDataDataKendaraan,
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
    console.log('Tombol Edit diklik untuk ID===:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataProdukVoucher?.data?.find(
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
        nama_kendaraan: dataDipilih.nama_kendaraan || '',
        tipe_kendaraan_id: dataDipilih.tipe_kendaraan_id || '',
        model_pembayaran: dataDipilih.model_pembayaran || '',
        metode_verifikasi: dataDipilih.metode_verifikasi || '',
        tarif: dataDipilih.tarif || '',
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiMasterDataProdukVoucherDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataProdukVoucher']);
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

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  if (loadingProduk || loadingKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (errorProduk) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorProduk.message)} />
    );
  }

  if (errorKendaraan) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorKendaraan.message)} />
    );
  }

  const dataApi = masterDataProdukVoucher || {};

  const rows =
    masterDataProdukVoucher?.data?.map((row, index) => ({
      no: index + 1,
      namaVoucher: <b>{row.nama || '-'}</b>,
      periode: row.periode
        ? `${row.periode[0]?.value} s.d. ${row.periode[1]?.value}`
        : '-',
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
      tarif: `Rp ${row.tarif.toLocaleString()}`,
      modelPembayaran: row.model_pembayaran,
      metodeVerifikasi: row.metode_verifikasi,
      status: StatusLabel.status(row.status),
      added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
      updated: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-',
      aksi: (
        <EvoActionButtons
          rowId={row.id}
          onEdit={
            hakAksesMDProdukVoucher.update == true
              ? () => handleEdit(row.id)
              : null
          }
          onDelete={
            hakAksesMDProdukVoucher.delete == true
              ? () => handleDelete(row.id)
              : null
          }
          isActive={row.status}
          onAktifkan={
            hakAksesMDProdukVoucher.aktif_nonaktif == true
              ? () => toggleStatus(row.id, true)
              : null
          }
          onNonAktifkan={
            hakAksesMDProdukVoucher.aktif_nonaktif == true
              ? () => toggleStatus(row.id, false)
              : null
          }
        />
      ),
    })) || [];

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
            hakAksesMDProdukVoucher.create == true
              ? `Tambah ${titleSection}`
              : ''
          }
          onButtonClick={
            hakAksesMDProdukVoucher.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDProdukVoucher.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDProdukVoucher.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDProdukVoucher.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />
        {hakAksesMDProdukVoucher.read == true && (
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
        {hakAksesMDProdukVoucher.create == true && (
          <AddProdukVoucherForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMDProdukVoucher.update == true && (
          <EditProdukVoucherForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}
        {hakAksesMDProdukVoucher.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableProdukVoucher}
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
