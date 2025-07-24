//DataVoucherSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddDataVoucherForm from './forms/AddForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataVoucher } from './tableDataVoucher';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukVoucher from './FilterMasProdukVoucher';
import { fetchApiMasterDataDataVoucher } from './api/fetchApiMasterDataDataVoucher';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiMasterDataDataVoucherDelete } from './api/fetchApiMasterDataDataVoucherDelete';
import EvoNotifCard from '@/components/EvoNotifCard';
import dayjs from 'dayjs';
import EvoEmpty from '@/components/EvoEmpty';
import EditDataVoucherForm from './forms/EditForm';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';

const titleSection = 'Data Voucher';

export default function DataVoucherSection() {
  const urlExport = '/master-data/data-voucher/';
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

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const {
    data: masterDataDataVoucher,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataDataVoucher', currentPage],
    queryFn: () =>
      fetchApiMasterDataDataVoucher({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const hakAksesMDDataVoucher =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Data Voucher')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDDataVoucher).some(
    (v) => v === true
  );

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

    const dataDipilih = masterDataDataVoucher?.data?.find(
      (item) => item.id === id
    );

    // console.log(dataDipilih);

    if (dataDipilih) {
      setSelectedEdit({
        json: dataDipilih,
        id: dataDipilih.id,

        no_tiket_atau_nopol: dataDipilih.no_tiket_atau_nopol || '',
        kendaraan_id: dataDipilih.kendaraan_id,
        keterangan: dataDipilih.keterangan,
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

    await fetchApiMasterDataDataVoucherDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataDataVoucher']);
    // logic delete
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
  };

  const durasiHari = (periode) => {
    if (Array.isArray(periode) && periode.length === 2) {
      const start = dayjs(periode[0].value);
      const end = dayjs(periode[1].value);
      return end.diff(start, 'day') + 1; // +1 kalau ingin termasuk hari pertama
    }
    return 0;
  };

  const dataApiTipeKendaraan = dataTipeKendaraan?.data || {};

  // const getNamaTipeKendaraan = (id, tipeList = []) => {
  //   const found = tipeList.find((item) => item.id === id);
  //   return found ? found.tipe_kendaraan : '-';
  // };
  const getNamaTipeKendaraan = (id, tipeList = []) => {
    if (!Array.isArray(tipeList)) return '-';
    const found = tipeList.find((item) => item.id === id);
    return found ? found.tipe_kendaraan : '-';
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

  const dataApi = masterDataDataVoucher || {};

  // console.log(masterDataDataVoucher);
  const rows =
    masterDataDataVoucher?.data?.length > 0
      ? masterDataDataVoucher?.data?.map((row, index) => ({
          no: index + 1,
          waktuInput: row.createdAt
            ? new Date(row.createdAt).toLocaleString()
            : '-',
          produkVoucher: row.produk_voucher.nama || <EvoEmpty />,
          noTiket:
            row.verifikasi == 'Tiket'
              ? row.no_tiket_atau_nopol || <EvoEmpty />
              : '-',
          nopol:
            row.verifikasi == 'Nopol'
              ? row.no_tiket_atau_nopol || <EvoEmpty />
              : '-',
          jenisKendaraan:
            (row.kendaraan.nama_kendaraan || '-') +
            ' (' +
            getNamaTipeKendaraan(
              row.kendaraan.tipe_kendaraan_id,
              dataApiTipeKendaraan
            ) +
            ') ',
          modelBayar: row.model_bayar || <EvoEmpty />,
          verifikasi: row.verifikasi || <EvoEmpty />,
          periode:
            row.periode == null ? (
              <EvoEmpty />
            ) : Array.isArray(row.periode) && row.periode.length === 2 ? (
              `${durasiHari(row.periode)} Hari`
            ) : (
              '-'
            ),
          // Array.isArray(row.periode) && row.periode.length === 2
          //   ? row.periode[0].value + ' s/d ' + row.periode[1].value
          //   : '',
          tarif: row.tarif ? `Rp${row.tarif.toLocaleString()}` : '-',
          masaAktif:
            row.priode == null ? (
              <EvoEmpty />
            ) : Array.isArray(row.periode) && row.periode.length === 2 ? (
              `${row.periode[0].value} s/d ${row.periode[1].value}`
            ) : (
              '-'
            ),
          keterangan: row.keterangan || <EvoEmpty />,

          nama: row.nama || '-',
          kontak: row.no_hp || '-',
          row: row.row?.nama || '-',
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
              onEdit={
                hakAksesMDDataVoucher.update == true
                  ? () => handleEdit(row.id)
                  : null
              }
              onDelete={
                hakAksesMDDataVoucher.delete == true
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
        <EvoTitleSection
          title={titleSection}
          // radioItems={radioItems}
          // monthNames={monthNames}
          // years={years}
          handleChange={handleChange}
          buttonText={
            hakAksesMDDataVoucher.create == true ? `Tambah ${titleSection}` : ''
          }
          onButtonClick={
            hakAksesMDDataVoucher.create == true ? handleTambah : () => {}
          }
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDDataVoucher.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDDataVoucher.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesMDDataVoucher.read == true
              ? () => setModalExportPrint(true)
              : null
          }
        />{' '}
        {hakAksesMDDataVoucher.read == true && (
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
        {hakAksesMDDataVoucher.read == true && (
          <EvoSearchTabel
            isFilter={true}
            // FilterComponent={FilterMasProdukVoucher}
            placeholder="Ketik nama voucher atau nomor handphone voucher..."
            onSearch={(data) => console.log('Hasil pencarian:', data)}
          />
        )}
        {hakAksesMDDataVoucher.create == true && (
          <AddDataVoucherForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMDDataVoucher.update == true && (
          <EditDataVoucherForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}{' '}
        {hakAksesMDDataVoucher.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataVoucher}
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
