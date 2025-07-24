import React, { useState } from 'react';
import EvoTable from '@/components/evosist_elements/EvoTable';
import EditSettlementCashlessForm from './forms/EditForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataKendaraanOut } from './tableDataKendaraanOut';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoTitleSection from '@/components/EvoTitleSection';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiKendaraanContentOut } from './api/fetchApiKendaraanContentOut';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Kendaraan Sudah Keluar';

export default function KendaraanContentOut() {
  const urlExport = '/data_kendaraan_keluar/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: laporanKendaraanContentOut,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanKendaraanContentOut', currentPage],
    queryFn: () =>
      fetchApiKendaraanContentOut({
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

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  const rows =
    laporanKendaraanContentOut?.data?.length > 0
      ? laporanKendaraanContentOut.data.map((row, index) => ({
          no: index + 1,
          noTiket: <b>{row.noTiket != null ? row.noTiket : <i>*empty</i>}</b>,

          isMember: row.isMember || <i>*empty</i>,
          isManual: row.isManual || <i>*empty</i>,
          tglMasuk: row.tglMasuk || <i>*empty</i>,
          tglKeluar: row.tglKeluar || <i>*empty</i>,
          pintuMasuk: row.pintuMasuk || <i>*empty</i>,
          pintuKeluar: row.pintuKeluar || <i>*empty</i>,
          nopol: row.nopol || <i>*empty</i>,
          kendaraan: row.kendaraan || <i>*empty</i>,
          interval: row.interval || <i>*empty</i>,
          tarif: row.tarif || <i>*empty</i>,
          denda: row.denda || <i>*empty</i>,
          status: row.status || <i>*empty</i>,
          tipe: row.tipe || <i>*empty</i>,
          pembayaran: row.pembayaran || <i>*empty</i>,
          prepaidCard: row.prepaidCard || <i>*empty</i>,
          noPrepaidCard: row.noPrepaidCard || <i>*empty</i>,
          petugas: row.petugas || <i>*empty</i>,
          shift: row.shift || <i>*empty</i>,
        }))
      : [];

  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}
      <EvoTitleSection
        title={titleSection}
        onButtonClick={handleEdit}
        onExportPDF={
          // hakAksesMDPe.read == true
          //   ?
          () => setModalExportPDFOpen(true)
          // : null
        }
        onExportExcel={
          // hakAksesMDPe.read == true
          //   ?
          () => setModalExportExcel(true)
          // : null
        }
        onPrint={
          // hakAksesMDPe.read == true
          //   ?
          () => setModalExportPrint(true)
          // : null
        }
        onDateAkhir={getDefaultDateAkhir}
        onDateAwal={getDefaultDateAwal}
        onDateChange={handleDateChange}
      />
      {/* {hakAksesMDPe.read == true && ( */}
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
      {/* )} */}
      <EvoSearchTabel
        placeholder="Ketik nomor tiket atau nomor polisi..."
        onSearch={(data) => console.log('Hasil pencarian:', data)}
      />

      <EditSettlementCashlessForm
        isOpen={modalOpen}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />
      <EvoTable
        id="tableToPrint"
        tableData={tableDataKendaraanOut}
        currentPage={currentPage}
        totalPages={laporanKendaraanContentOut?.totalPages}
        onPageChange={handlePageChange}
        rows={rows}
      />
    </div>
  );
}
