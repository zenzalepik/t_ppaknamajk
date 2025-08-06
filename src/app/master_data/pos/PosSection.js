//PosSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import AddPosForm from './forms/AddForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataPos } from './tableDataPos';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiMasterDataPOS } from './api/fetchApiMasterDataPOS';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';
import { fetchApiMasterDataPOSDelete } from './api/fetchApiMasterDataPOSDelete';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import EditPosForm from './forms/EditForm';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import numbers from '@/utils/numbers';

const titleSection = 'Data Pos';

export default function PosSection() {
  const urlExport = '/master-data/pos/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const handleTambah = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageTipeKendaraan, setCurrentPageTipeKendaraan] = useState(1);
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

  const hakAksesMDPos =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Master Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Pos (In/Out)')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesMDPos).some((v) => v === true);

  const {
    data: masterDataPOS,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['masterDataPOS', currentPage],
    queryFn: () =>
      fetchApiMasterDataPOS({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: pengaturanParameterTipeKendaraan,
    errorTipeKendaraan,
    isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanParameterTipeKendaraan', currentPageTipeKendaraan],
    queryFn: () =>
      fetchApiPengaturanParameterTipeKendaraan({
        limit: numbers.apiNumLimitExpanded,
        page: currentPageTipeKendaraan,
        // offset: (currentPageTipeKendaraan - 1) * 5,
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
    // console.log('Tombol Edit diklik untuk ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)

    const dataDipilih = masterDataPOS?.data?.find((item) => item.id === id);

    // console.log(dataDipilih);

    if (dataDipilih) {
      setSelectedEdit({
        id: dataDipilih.id || '',

        kode: dataDipilih.kode || '',
        keterangan: dataDipilih.keterangan || '',
        synchronize: dataDipilih.synchronize || '',
        com_port: dataDipilih.com_port || '',
        // user_id: '',

        otorisasi: dataDipilih.otorisasi || false,
        tipe_kendaraan: dataDipilih.tipe_kendaraan || '',
        tipe_pos: dataDipilih.tipe_pos || '',
        tipe_manless_id:
          dataDipilih.tipe_manless != null
            ? dataDipilih.tipe_manless.id || ''
            : '',
        nama_printer_id:
          dataDipilih.printer != null ? dataDipilih.printer.id || '' : '',
        nama_interface_id:
          dataDipilih.interface != null ? dataDipilih.interface.id || '' : '',

        kamera_1: dataDipilih.kamera_1 || false,
        kamera_2: dataDipilih.kamera_2 || false,
      });
      // setModalEditOpen(true);
      // setModalEditOpen(true);
      setModalEditOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);

    await fetchApiMasterDataPOSDelete(id, setNotifMessage, setNotifType);

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['masterDataPOS']);

    // setConfirmDeleteId(null); // tutup tooltip
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

  if (isLoading || isLoadingTipeKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error || errorTipeKendaraan) {
    return (
      <EvoErrorDiv
        errorHandlerText={getErrorMessage(error || errorTipeKendaraan)}
      />
    ); // ✅ Pastikan error ditampilkan di UI
  }

  // console.log('Data Perusahaan:', masterDataPOS.pageSize);
  const dataApi = masterDataPOS || {};

  const rows =
    masterDataPOS?.data?.length > 0
      ? masterDataPOS?.data?.map((row, index) => ({
          no: index + 1,
          kode: <b>{row.kode || '-'}</b>,
          keterangan: row.keterangan || '-',
          tipePos: row.tipe_pos || '-',
          tipeManless:
            row.tipe_manless != null
              ? row.tipe_manless.tipe_manless || '-'
              : '-',
          tipeKendaraan:
            // (() => {
            //   const tipe_kendaraan = pengaturanParameterTipeKendaraan?.data?.find(
            //     (p) => p.id === row.tipe_kendaraan_id
            //   );
            //   return tipe_kendaraan ? (
            //     `${tipe_kendaraan.nama}
            //     }`
            //   ) : (
            //     <i>*tidak ditemukan</i>
            //   );
            // })(),

            row.tipe_kendaraan || '-',
          kamera1: StatusLabel.kamera(row.kamera_1),
          kamera2: StatusLabel.kamera(row.kamera_2),
          printerName:
            row.printer != null ? row.printer.nama_printer || '-' : '-',
          interfaceName:
            row.interface != null ? row.interface.nama_interface || '-' : '-',
          comPort: row.com_port || '-',
          otorisasi: StatusLabel.otorisasi(row.otorisasi),
          synchronize:
            row.synchronize == null ? '-' : row.synchronize + ' menit',
          added: new Date(row.createdAt).toLocaleString() || '-',
          updated: new Date(row.updatedAt).toLocaleString() || '-',

          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={
                hakAksesMDPos.update == true ? () => handleEdit(row.id) : null
              }
              onDelete={
                hakAksesMDPos.delete == true ? () => handleDelete(row.id) : null
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
            hakAksesMDPos.create == true ? `Tambah ${titleSection}` : ''
          }
          onButtonClick={hakAksesMDPos.create == true ? handleTambah : () => {}}
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesMDPos.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesMDPos.read == true ? () => setModalExportExcel(true) : null
          }
          onPrint={
            hakAksesMDPos.read == true ? () => setModalExportPrint(true) : null
          }
        />

        {hakAksesMDPos.read == true && (
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
        {hakAksesMDPos.create == true && (
          <AddPosForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesMDPos.update == true && (
          <EditPosForm
            isOpen={modalEditOpen}
            onClose={handleEditTutup}
            onSubmit={handleSubmitData}
            initialData={selectedEditData}
          />
        )}
        {hakAksesMDPos.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataPos}
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
