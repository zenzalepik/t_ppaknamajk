import React, { useEffect, useState } from 'react';
import EvoTable from '@/components/evosist_elements/EvoTable';
import EditSettlementCashlessForm from './forms/EditForm';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataKendaraanIn } from './tableDataKendaraanIn';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoTitleSection from '@/components/EvoTitleSection';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiKendaraanContentIn } from './api/fetchApiKendaraanContentIn';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoLoading from '@/components/EvoLoading';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import EvoEmpty from '@/components/EvoEmpty';
import numbers from '@/utils/numbers';
import strings from '@/utils/strings';

const titleSection = 'Kendaraan Masih di Dalam';

export default function KendaraanContentIn() {
  const [start_date, setStartDate] = React.useState(getDefaultDateAwal());
  const [end_date, setEndDate] = React.useState(getDefaultDateAkhir());

  const urlExport = '/laporan-data/kendaraan/kendaraan-in/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const formatDate = (date) => format(date, strings.formatDate);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const formattedStartDate = format(start_date, strings.formatDate);
  const formattedEndDate = format(end_date, strings.formatDate);

  const [searchText, setSearchText] = useState('');

  const {
    data: laporanKendaraanContentIn,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'laporanKendaraanContentIn',
      currentPage,
      formattedStartDate,
      formattedEndDate,
      searchText,
    ],
    queryFn: () =>
      fetchApiKendaraanContentIn({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        // sortBy: 'id',
        sortOrder: 'desc',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        search: searchText,
      }),
    retry: false,
    keepPreviousData: true,
  });
  // console.log(laporanKendaraanContentIn);

  const handlePageChange = (page) => {
    setCurrentPage(page); // trigger TanStack React Query re-fetch dengan page baru
  };

  const prevDates = React.useRef({ start: start_date, end: end_date });

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    // Hanya reset page kalau tanggal bener-bener berubah
    if (
      format(prevDates.current.start, strings.formatDate) !==
        format(start, strings.formatDate) ||
      format(prevDates.current.end, strings.formatDate) !== format(end, strings.formatDate)
    ) {
      prevDates.current = { start, end };
      setResetPage(true);
    }
  };

  const [resetPage, setResetPage] = useState(false);

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
      setResetPage(false);
    }
  }, [resetPage]);

  const handleSubmitData = (data) => {
    console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    // console.log('Hasil pencarian:', query);
    setSearchText(query.searchText); // Simpan kata kunci
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const rows =
    laporanKendaraanContentIn?.data?.length > 0
      ? laporanKendaraanContentIn.data.map((row, index) => {
          const durasi = row.durasi;

          // Format durasi jika valid
          const durasiParkir = durasi ? (
            [
              durasi.days ? `${durasi.days}hari` : null,
              durasi.hours ? `${durasi.hours}jam` : null,
              durasi.minutes ? `${durasi.minutes}menit` : null,
              durasi.seconds ? `${durasi.seconds}detik` : null,
            ]
              .filter(Boolean)
              .join(' ')
          ) : (
            <EvoEmpty />
          );
          return {
            no: index + 1,
            noTiket: (
              <b>{row.nomor_tiket != null ? row.nomor_tiket : <EvoEmpty />}</b>
            ),
            tanggalMasuk: row.tanggal_masuk ? (
              format(new Date(row.tanggal_masuk), 'dd MMMM yyyy, HH:mm', {
                locale: localeId,
              })
            ) : (
              <EvoEmpty />
            ),
            // tanggalKeluar: row.tanggalKeluar || <EvoEmpty />,
            nopol: row.nomor_polisi || <EvoEmpty />,
            jenisKendaraan: row.nama_kendaraan || <EvoEmpty />,
            pintuMasuk: row.lokasi_gerbang || <EvoEmpty />,
            // pintuKeluar: row.pintuKeluar || <EvoEmpty />,
            durasiParkir,
            // tarif: row.tarif || <EvoEmpty />,
            statusMember: row.data_member?.nama_produk || <i>-</i>,
            // asalPerusahaan:
            //   row.data_member?.nama_perusahaan?.trim() !== '' ? (
            //     row.data_member.nama_perusahaan
            //   ) : (
            //     <EvoEmpty />
            //   ),
            asalPerusahaan: row.data_member?.nama_perusahaan || <i>-</i>,
          };
        })
      : [];

  // if (isLoading)
  //   return (
  //     <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
  //       <Spinner size={32} color="border-black" />
  //       Loading...
  //     </div>
  //   );

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
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
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
        placeholder={`Ketik nomor tiket atau nomor polisi...`}
        onSearch={handleSearch}
      />

      <EditSettlementCashlessForm
        isOpen={modalOpen}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />
      <div className="relative">
        {isLoading && <EvoLoading />}
        <EvoTable
          id="tableToPrint"
          tableData={tableDataKendaraanIn}
          currentPage={currentPage}
          totalPages={laporanKendaraanContentIn?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </div>
    </div>
  );
}
