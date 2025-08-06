//ParameterPrinterSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditPrinterForm from './forms/EditPrinterForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataParameterLain } from './tableDataParameterLain';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import { fetchApiPengaturanParameterPrinter } from './api/fetchApiPengaturanParameterPrinter';
import { fetchApiPengaturanParameterPrinterDelete } from './api/fetchApiPengaturanParameterPrinterDelete';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import numbers from '@/utils/numbers';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Parameter Printer';

export default function ParameterPrinterSection({ onBack }) {
  const urlExport = '/setting/parameter/parameter/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const handleTutup = () => setModalOpen(false);
  const handleUbah = () => setModalOpen(true);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const [selectedData, setSelectedData] = useState(null);

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesPParameter =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Pengaturan')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Parameter')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesPParameter).some(
    (v) => v === true
  );

  const {
    data: pengaturanParameterPrinter,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanParameterPrinter', currentPage],
    queryFn: () =>
      fetchApiPengaturanParameterPrinter({
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
    const dataDipilih = pengaturanParameterPrinter?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      setSelectedData({
        id: dataDipilih.id,
        nama: dataDipilih.nama_printer || '',
        // nilai: dataDipilih.nilai || '',
      });
      setModalOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (id) => {
    console.log('Hapus ID:', id);
    await fetchApiPengaturanParameterPrinterDelete(
      id,
      setNotifMessage,
      setNotifType
    );

    // ✅ Pastikan data diperbarui secara real-time
    queryClient.invalidateQueries(['pengaturanParameterPrinter']);
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
  const dataApi = pengaturanParameterPrinter || {};

  const rows =
    pengaturanParameterPrinter?.data?.length > 0
      ? pengaturanParameterPrinter.data.map((row, index) => ({
          no: index + 1,
          nama: <b>{row.nama_printer}</b>,
          updated: new Date(row.updatedAt).toLocaleString(),
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={
                hakAksesPParameter.update == true
                  ? () => handleEdit(row.id)
                  : null
              }
              onDelete={
                hakAksesPParameter.update == true
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
          onBack={onBack}
          // handleChange={handleChange}
          icon={<RiAddLargeLine size={16} />}
        />

        {hakAksesPParameter.update == true && (
          <EditPrinterForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
            initialData={selectedData}
          />
        )}
        {hakAksesPParameter.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataParameterLain}
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
