import React, { useEffect, useState } from 'react';
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
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';
import { StatusLabel } from '@/components/StatusLabel';
import EvoLoading from '@/components/EvoLoading';
import { intervalToDuration, parseISO, format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import EvoEmpty from '@/components/EvoEmpty';
import numbers from '@/utils/numbers';
import strings from '@/utils/strings';

const titleSection = 'Kendaraan Sudah Keluar';
// SELECT * FROM aktivitas_gerbang_kendaraans WHERE tipe_gerbang = 'Out' AND "createdAt" BETWEEN '2025-08-22 00:00:00' AND '2025-08-22 23:59:59';
export default function KendaraanContentOut() {
  const [start_date, setStartDate] = React.useState(getDefaultDateAwal());
  const [end_date, setEndDate] = React.useState(getDefaultDateAkhir());

  const urlExport = '/data_kendaraan_keluar/';
  const [modalExportPDFOpen, setModalExportPDFOpen] = useState(false);
  const [modalExportExcel, setModalExportExcel] = useState(false);
  const [modalExportPrint, setModalExportPrint] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const formattedStartDate = format(start_date, strings.formatDate);
  const formattedEndDate = format(end_date, strings.formatDate);

  const [searchKeyword, setSearchText] = useState('');

  const {
    data: laporanKendaraanContentOut,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      'laporanKendaraanContentOut',
      currentPage,
      formattedStartDate,
      formattedEndDate,
      searchKeyword,
    ],
    queryFn: () =>
      fetchApiKendaraanContentOut({
        limit: numbers.apiNumLimit,
        page: currentPage,
        // offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        search: searchKeyword,
      }),
    retry: false,
    keepPreviousData: true,
  });

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
      format(prevDates.current.end, strings.formatDate) !==
        format(end, strings.formatDate)
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

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value || 0);

  const rows =
    laporanKendaraanContentOut?.data?.length > 0
      ? laporanKendaraanContentOut.data.map((row, index) => {
          const masuk = row.tanggal_masuk ? parseISO(row.tanggal_masuk) : null;
          const keluar = row.tanggal_keluar
            ? parseISO(row.tanggal_keluar)
            : null;

          const durasiParkir =
            masuk && keluar ? (
              [
                intervalToDuration({ start: masuk, end: keluar }).days
                  ? `${
                      intervalToDuration({ start: masuk, end: keluar }).days
                    }hari`
                  : null,
                intervalToDuration({ start: masuk, end: keluar }).hours
                  ? `${
                      intervalToDuration({ start: masuk, end: keluar }).hours
                    }jam`
                  : null,
                intervalToDuration({ start: masuk, end: keluar }).minutes
                  ? `${
                      intervalToDuration({ start: masuk, end: keluar }).minutes
                    }menit`
                  : null,
                intervalToDuration({ start: masuk, end: keluar }).seconds
                  ? `${
                      intervalToDuration({ start: masuk, end: keluar }).seconds
                    }detik`
                  : null,
              ]
                .filter(Boolean)
                .join(' ')
            ) : (
              <EvoEmpty />
            );

          return {
            no: index + 1,
            noTiket: (
              <b>{row.no_tiket != null ? row.no_tiket : <EvoEmpty />}</b>
            ),

            isMember: StatusLabel.status_member(row.id_data_member),
            isManual:
              row.is_manual === true ? (
                'Iya'
              ) : row.is_manual === false ? (
                'Tidak'
              ) : (
                <EvoEmpty />
              ),

            tglMasuk: row.tanggal_masuk ? (
              format(new Date(row.tanggal_masuk), 'dd MMMM yyyy, HH:mm', {
                locale: localeId,
              })
            ) : (
              <EvoEmpty />
            ),
            tglKeluar: row.tanggal_keluar ? (
              format(new Date(row.tanggal_keluar), 'dd MMMM yyyy, HH:mm', {
                locale: localeId,
              })
            ) : (
              <EvoEmpty />
            ),
            pintuMasuk: row.nama_pintu_masuk || <EvoEmpty />,
            pintuKeluar: row.nama_pintu_keluar || <EvoEmpty />,
            nopol: row.nomor_polisi || <EvoEmpty />,
            kendaraan: row.nama_kendaraan || <EvoEmpty />,
            interval:durasiParkir,
            jenisPerhitunganPembayaran:row.jenis_perhitungan_pembayaran|| <EvoEmpty />,
            tarif:  row.id_data_member == null?
              row.biaya_parkir != null && row.biaya_parkir !== '' ? (
                formatRupiah(
                  typeof row.biaya_parkir === 'string'
                    ? parseInt(row.biaya_parkir)
                    : row.biaya_parkir
                )
              ) : (
                <EvoEmpty />
              )
                : 'Rp. 0',
            denda:
              row.id_data_member == null
                ? formatRupiah(
                    (() => {
                      const dendaStnkRaw =
                        row.data_transaksi?.jumlah_denda_stnk;
                      const dendaTiketRaw =
                        row.data_transaksi?.jumlah_denda_tiket;

                      const dendaStnk = isNaN(dendaStnkRaw)
                        ? 0
                        : typeof dendaStnkRaw === 'string'
                        ? parseInt(dendaStnkRaw)
                        : dendaStnkRaw;

                      const dendaTiket = isNaN(dendaTiketRaw)
                        ? 0
                        : typeof dendaTiketRaw === 'string'
                        ? parseInt(dendaTiketRaw)
                        : dendaTiketRaw;

                      return dendaStnk + dendaTiket;
                    })()
                  )
                : 'Rp. 0',
            // status: row.status || <EvoEmpty />,
            // tipe: row.tipe || <EvoEmpty />,
            pembayaran: row.nama_pembayaran || <EvoEmpty />,
            namaProdukMember: row.nama_produk_member ? (
              row.nama_produk_member
            ) : row.id_data_member != null ? (
              <EvoEmpty />
            ) : (
              '-'
            ),
            noPrepaidCard: row.nomor_kartu_member || <EvoEmpty />,
            petugas: row.nama_petugas || <EvoEmpty />,
            shift: row.shift || <EvoEmpty />,
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
          tableData={tableDataKendaraanOut}
          currentPage={currentPage}
          totalPages={laporanKendaraanContentOut?.totalPages}
          onPageChange={handlePageChange}
          rows={rows}
        />
      </div>
    </div>
  );
}
