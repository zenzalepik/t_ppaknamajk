//TarifParkirSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditTarifParkirForm from './forms/EditForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataTarifParkir } from './tableDataTarifParkir';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import { fetchApiPengaturanTarifParkir } from './api/fetchApiPengaturanTarifParkir';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { fetchApiPengaturanParameterTipeKendaraan } from './api/fetchApiPengaturanParameterTipeKendaraan';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import numbers from '@/utils/numbers';

const titleSection = 'Tarif Parkir';

export default function TarifParkirSection() {
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

  const hakAksesPTarifParkir =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Pengaturan')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Tarif Parkir')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesPTarifParkir).some(
    (v) => v === true
  );

  const {
    data: pengaturanTarifParkir,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanTarifParkir', currentPage],
    queryFn: () =>
      fetchApiPengaturanTarifParkir({
        limit: numbers.apiNumLimit,
        page: currentPage,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const {
    data: dataTipeKendaraan,
    error: errorTipeKendaraan,
    isLoading: isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanTipeKendaraan'],
    queryFn: () =>
      fetchApiPengaturanParameterTipeKendaraan({
        limit: numbers.apiNumLimitExpanded,
      }),
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
    const dataDipilih = pengaturanTarifParkir?.data?.find(
      (item) => item.id === id
    );
    if (dataDipilih) {
      setSelectedData({
        id: dataDipilih.id,
        tipeKendaraan: dataDipilih.kendaraan?.nama_kendaraan || '',
        kendaraan_id: dataDipilih.kendaraan_id,
        grace_period: String(dataDipilih.grace_period),
        tarif_grace_period: String(dataDipilih.tarif_grace_period || '0'),
        rotasi_pertama: String(dataDipilih.rotasi_pertama || ''),
        tarif_rotasi_pertama: String(dataDipilih.tarif_rotasi_pertama || ''),
        rotasi_kedua: String(dataDipilih.rotasi_kedua || ''),
        tarif_rotasi_kedua: String(dataDipilih.tarif_rotasi_kedua || ''),
        rotasi_ketiga: String(dataDipilih.rotasi_ketiga || ''),
        tarif_rotasi_ketiga: String(dataDipilih.tarif_rotasi_ketiga || ''),
        tarif_maksimal: String(dataDipilih.tarif_maksimal || ''),
      });
      setModalOpen(true);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

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

  const dataApi = pengaturanTarifParkir || {};

  const rows =
    pengaturanTarifParkir?.data?.length > 0
      ? pengaturanTarifParkir?.data?.map((row, index) => ({
          no: index + 1,
          tipeKendaraan: (
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
          toleransiWaktu:
            row.grace_period == null ? '-' : row.grace_period + ' menit',
          tarifRotasiPertama:
            row.tarif_rotasi_pertama != null
              ? `Rp ${row.tarif_rotasi_pertama.toLocaleString()}`
              : '-',
          tarifRotasiKedua:
            row.tarif_rotasi_kedua != null
              ? `Rp ${row.tarif_rotasi_kedua.toLocaleString()}`
              : '-',
          tarifRotasiKetiga:
            row.tarif_rotasi_ketiga != null
              ? `Rp ${row.tarif_rotasi_ketiga.toLocaleString()}`
              : '-',
          tarifMaksimal:
            row.tarif_maksimal != null
              ? `Rp ${row.tarif_maksimal.toLocaleString()}`
              : '-',
          updated: row.updatedAt
            ? new Date(row.updatedAt).toLocaleString()
            : '-',
          // added: row.createdAt ? new Date(row.createdAt).toLocaleString() : '-',
          aksi: (
            <EvoActionButtons
              rowId={row.id}
              onEdit={
                hakAksesPTarifParkir.update == true
                  ? () => handleEdit(row.id)
                  : null
              }
            />
          ),
        }))
      : [];

  if (errorTipeKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (isLoadingTipeKendaraan) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(isLoadingTipeKendaraan)} />
    ); // ✅ Pastikan error ditampilkan di UI
  }

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
          hakAksesPTarifParkir.read == true
            ? () => exportPDF('tableToPrint', titleSection)
            : null
        }
        onExportExcel={
          hakAksesPTarifParkir.read == true
            ? () => exportExcel('tableToPrint', titleSection)
            : null
        }
        onPrint={
          hakAksesPTarifParkir.read == true
            ? () => exportPrint('tableToPrint', titleSection)
            : null
        }
      />
      {hakAksesPTarifParkir.update == true && (
        <EditTarifParkirForm
          isOpen={modalOpen}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
          initialData={selectedData}
        />
      )}
      {hakAksesPTarifParkir.read == true && (
        <EvoTable
          id="tableToPrint"
          tableData={tableDataTarifParkir}
          currentPage={currentPage}
          totalPages={dataApi?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      )}
    </EvoCardSection>
  );
}
