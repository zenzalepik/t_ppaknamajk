//ParameterSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditParameterForm from './forms/EditForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataParameter } from './tableDataParameter';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import { fetchApiPengaturanParameter } from './api/fetchApiPengaturanParameter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';

const titleSection = 'Parameter';

export default function ParameterSection() {
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
    data: pengaturanParameter,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanParameter', currentPage],
    queryFn: () =>
      fetchApiPengaturanParameter({
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
    const dataDipilih = pengaturanParameter?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      setSelectedData({
        id: dataDipilih.id,
        nama: dataDipilih.nama || '',
        nilai: dataDipilih.nilai || '',
      });
      setModalOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = (id) => {
    console.log('Hapus ID:', id);
    setConfirmDeleteId(null); // tutup tooltip
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
  const dataApi = pengaturanParameter || {};

  const rows =
    pengaturanParameter?.data?.length > 0
      ? pengaturanParameter.data.map((row, index) => ({
          no: index + 1,
          nama: <b>{row.nama}</b>,
          nilai: row.nilai,
          keterangan: row.keterangan,
          updated: new Date(row.updatedAt).toLocaleString(),
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={
                hakAksesPParameter.update == true
                  ? () => handleEdit(row.id)
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
    <EvoCardSection>
      <EvoTitleSection
        title={titleSection}
        handleChange={handleChange}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={
          hakAksesPParameter.read == true
            ? () => setModalExportPDFOpen(true)
            : null
        }
        onExportExcel={
          hakAksesPParameter.read == true
            ? () => setModalExportExcel(true)
            : null
        }
        onPrint={
          hakAksesPParameter.read == true
            ? () => setModalExportPrint(true)
            : null
        }
      />
      {hakAksesPParameter.read == true && (
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
      {hakAksesPParameter.read == true && (
        <EvoSearchTabel
          placeholder="Ketik nama parameter..."
          buttonText="Pencarian"
          onSearch={handleSearch}
        />
      )}
      {hakAksesPParameter.update == true && (
        <EditParameterForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
          initialData={selectedData}
        />
      )}
      {hakAksesPParameter.read == true && (
        <EvoTable
          id="tableToPrint"
          tableData={tableDataParameter}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      )}
    </EvoCardSection>
  );
}
