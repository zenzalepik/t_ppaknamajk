//PengaduanSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTableMulti from '@/components/evosist_elements/EvoTableMulti';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditProsesPerbaikanForm from './forms/EditProsesPerbaikanForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataPengaduan } from './tableDataPengaduan';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukMember from './FilterMasProdukMember';
import EvoButton from '@/components/evosist_elements/EvoButton';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiBantuanTiketPermasalahanPerbaikan } from './api/fetchApiBantuanTiketPermasalahanPerbaikan.js';
import { fetchApiBantuanTiketDelete } from './api/fetchApiBantuanTiketDelete';
import EditPengaduanForm from './forms/EditForm';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';

const titleSection = 'Data Pengaduan';

export default function PengaduanSection({ onBack, hakAksesBTiket }) {
  const urlExport = '/transaksi/permasalahan-atau-perbaikan/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());
  // const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const [selectedData, setSelectedEditDataPengaduan] = useState(null);
  const [modalOpen, setModalEditPengaduanOpen] = useState(false);
  const handleEditPengaduanTutup = () => setModalEditPengaduanOpen(false);

  const [modalOpenPengaduan, setModalOpenPengaduan] = useState(false);
  const handleProsesData = () => setModalOpenPengaduan(true);
  const handleProsesDataTutup = () => setModalOpenPengaduan(false);

  const {
    data: bantuanTiketPermasalahanPerbaikan,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bantuanTiketPermasalahanPerbaikan', currentPage],
    queryFn: () =>
      fetchApiBantuanTiketPermasalahanPerbaikan({
        limit: 5,
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

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmitData = (data) => {
    // console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  // Fungsi untuk edit data
  const handleEdit = (id) => {
    // console.log('Tombol Edit diklik untuk ID:', id);
    const dataDipilih = bantuanTiketPermasalahanPerbaikan?.data?.find(
      (item) => item.id === id
    );
    // console.log(dataDipilih);
    if (dataDipilih) {
      setSelectedEditDataPengaduan({
        id: dataDipilih.id,
        judul_permasalahan: dataDipilih.judul_permasalahan || '',
        tanggal_permasalahan: dataDipilih.tanggal_permasalahan || '',
        kategori_permasalahan: dataDipilih.kategori_permasalahan || '',
        pos_id: dataDipilih.pos_id,
        hardware_atau_alat: dataDipilih.hardware_atau_alat || '',
        penyebab_permasalahan: dataDipilih.penyebab_permasalahan || '',
        keterangan_permasalahan: dataDipilih.keterangan_permasalahan || '',
        nama_pelapor: dataDipilih.nama_pelapor || '',
        status_permasalahan: dataDipilih.status_permasalahan,
        tanggal_perbaikan: dataDipilih.tanggal_perbaikan || '',
        status_perbaikan: dataDipilih.status_perbaikan,
        penanganan: dataDipilih.penanganan || '',
        keterangan_penanganan: dataDipilih.keterangan_penanganan || '',
        nama_yang_menangani: dataDipilih.nama_yang_menangani || '',
      });
      setModalEditPengaduanOpen(true);
    }
  };

  // const [confirmMoreId, setConfirmMoreId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiBantuanTiketDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataPerusahaan']);
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

  const formatTanggal = (tanggal) => {
    if (!tanggal) return '';
    const d = new Date(tanggal); // ← akan bekerja karena input '2025-08-27' adalah string ISO sederhana
    if (isNaN(d)) return tanggal;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleProsesPerbaikan = (id) => {
    // console.log('Riwayat Transaksi ID:', id);

    const dataDipilih = bantuanTiketPermasalahanPerbaikan?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      setSelectedEditDataPengaduan({
        id: dataDipilih.id,
        judul_permasalahan: dataDipilih.judul_permasalahan || '',
        tanggal_permasalahan: dataDipilih.tanggal_permasalahan || '',
        kategori_permasalahan: dataDipilih.kategori_permasalahan || '',
        pos_id: dataDipilih.pos_id,
        hardware_atau_alat: dataDipilih.hardware_atau_alat || '',
        penyebab_permasalahan: dataDipilih.penyebab_permasalahan || '',
        keterangan_permasalahan: dataDipilih.keterangan_permasalahan || '',
        nama_pelapor: dataDipilih.nama_pelapor || '',
        jenis_perbaikan: dataDipilih.jenis_perbaikan || '',
        status_permasalahan: dataDipilih.status_permasalahan,
        // tanggal_perbaikan: dataDipilih.tanggal_perbaikan || '',
        tanggal_perbaikan: dataDipilih.tanggal_perbaikan || '',
        status_perbaikan: dataDipilih.status_perbaikan,
        penanganan: dataDipilih.penanganan || '',
        keterangan_penanganan: dataDipilih.keterangan_penanganan || '',
        nama_yang_menangani: dataDipilih.nama_yang_menangani || '',
      });
      // setModalEditPengaduanOpen(true);
      handleProsesData();
    }
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  const dataApi = bantuanTiketPermasalahanPerbaikan || {};

  const rows =
    bantuanTiketPermasalahanPerbaikan?.data?.length > 0
      ? bantuanTiketPermasalahanPerbaikan.data.map((row, index) => ({
          no: index + 1,
          judul: (
            <b>
              {row.judul_permasalahan || <i className="text-danger">*empty</i>}
            </b>
          ),
          tanggal_masalah: row.tanggal_permasalahan || (
            <i className="text-danger">*empty</i>
          ),
          // tanggal_masalah: new Date(row.tanggal_permasalahan).toLocaleString() || (
          //   <i className="text-danger">*empty</i>
          // ),
          kategori_masalah: row.kategori_permasalahan || (
            <i className="text-danger">*empty</i>
          ),
          pos: row.pos?.keterangan ? (
            row.pos.keterangan
          ) : (
            <i className="text-danger">*empty</i>
          ),
          alat_bermasalah: row.hardware_atau_alat || (
            <i className="text-danger">*empty</i>
          ),
          penyebab: row.penyebab_permasalahan || <i>tidak diketahui</i>,
          keterangan_masalah: row.keterangan_permasalahan || (
            <i className="text-danger">*empty</i>
          ),
          pelapor: row.nama_pelapor || <i className="text-danger">*empty</i>,
          tanggal_perbaikan: formatTanggal(row.tanggal_perbaikan || '-'),
          jenis_perbaikan: row.jenis_perbaikan || '-',
          penanganan: row.penanganan || '-',
          keterangan_perbaikan: row.keterangan_penanganan || '-',
          yang_menangani: row.nama_yang_menangani || '-',
          // jenis_perbaikan: row.jenis_perbaikan || '',
          status: StatusLabel.permasalahanPerbaikan(row.status_perbaikan) || (
            <i className="text-danger">*empty</i>
          ),
          // added: new Date(row.createdAt).toLocaleString() || (
          //   <i className="text-danger">*empty</i>
          // ),
          // updated: new Date(row.updatedAt).toLocaleString() || (
          //   <i className="text-danger">*empty</i>
          // ),
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={
                hakAksesBTiket.update == true ? () => handleEdit(row.id) : null
              }
              onDelete={
                hakAksesBTiket.delete == true
                  ? () => handleDelete(row.id)
                  : null
              } // isActive={row.status}
              // onAktifkan={() => console.log('Aktifkan', row.id)}
              // onNonAktifkan={() => console.log('NonAktifkan', row.id)}
              moreAction={titleSection}
              customButtons={
                hakAksesBTiket.proses_data_perbaikan == true
                  ? [
                      <EvoButton
                        key="prosesPerbaikan"
                        onClick={() => handleProsesPerbaikan(row.id)}
                        buttonText={'Proses Data Perbaikan'}
                      />,
                    ]
                  : []
              }
            />
          ),
        }))
      : [];

  const tidakPunyaAkses = !Object.values(hakAksesBTiket).some(
    (v) => v === true
  );

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <EvoCardSection>
      <EvoTitleSection
        title={titleSection}
        onBack={onBack}
        handleChange={handleChange}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={
          hakAksesBTiket.read == true ? () => setModalExportPDFOpen(true) : null
        }
        onExportExcel={
          hakAksesBTiket.read == true ? () => setModalExportExcel(true) : null
        }
        onPrint={
          hakAksesBTiket.read == true ? () => setModalExportPrint(true) : null
        }
        onDateAkhir={getDefaultDateAkhir}
        onDateAwal={getDefaultDateAwal}
        onDateChange={handleDateChange}
      />
      {hakAksesBTiket.read == true && (
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

      {hakAksesBTiket.read == true && (
        <EvoSearchTabel
          placeholder="Ketik nama judul masalah atau jenis perbaikan..."
          onSearch={(data) => console.log('Hasil pencarian:', data)}
        />
      )}

      {hakAksesBTiket.proses_data_perbaikan == true && (
        <EditProsesPerbaikanForm
          isOpen={modalOpenPengaduan}
          onClose={handleProsesDataTutup}
          onSubmit={handleSubmitData}
          initialData={selectedData}
        />
      )}
      {hakAksesBTiket.update == true && (
        <EditPengaduanForm
          isOpen={modalOpen}
          onClose={handleEditPengaduanTutup}
          onSubmit={handleSubmitData}
          initialData={selectedData}
        />
      )}
      {hakAksesBTiket.read == true && (
        <EvoTableMulti
          id="tableToPrint"
          tableData={tableDataPengaduan}
          textRight="Perbaikan"
          textLeft="Masalah"
          orangeEndIndex={8}
          blackStartIndex={9}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      )}
    </EvoCardSection>
  );
}
