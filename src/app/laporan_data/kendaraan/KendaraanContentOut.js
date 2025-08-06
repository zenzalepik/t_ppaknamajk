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
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

const titleSection = 'Kendaraan Sudah Keluar';

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

  const formattedStartDate = format(start_date, 'MM-dd-yyyy');
  const formattedEndDate = format(end_date, 'MM-dd-yyyy');

  const [searchKeyword, setSearchKeyword] = useState('');

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
        limit: 13,
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
      format(prevDates.current.start, 'MM-dd-yyyy') !==
        format(start, 'MM-dd-yyyy') ||
      format(prevDates.current.end, 'MM-dd-yyyy') !== format(end, 'MM-dd-yyyy')
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
    console.log('Hasil pencarian:', query);
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
            <i className="text-danger">*empty</i>
          );

          return {
            no: index + 1,
            noTiket: (
              <b>
                {row.nomor_tiket != null ? (
                  row.nomor_tiket
                ) : (
                  <i className="text-danger">*empty</i>
                )}
              </b>
            ),

            isMember: StatusLabel.status_member(row.id_member),
            isManual:
              row.data_transaksi?.is_manual === true ? (
                'Iya'
              ) : row.data_transaksi?.is_manual === false ? (
                'Tidak'
              ) : (
                <i className="text-danger">*empty</i>
              ),

            tglMasuk: row.tanggal_masuk ? (
              format(new Date(row.tanggal_masuk), 'dd MMMM yyyy, HH:mm', {
                locale: localeId,
              })
            ) : (
              <i className="text-danger">*empty</i>
            ),
            tglKeluar: row.tanggal_keluar ? (
              format(new Date(row.tanggal_keluar), 'dd MMMM yyyy, HH:mm', {
                locale: localeId,
              })
            ) : (
              <i className="text-danger">*empty</i>
            ),
            pintuMasuk: row.lokasi_gerbang_masuk || (
              <i className="text-danger">*empty</i>
            ),
            pintuKeluar: row.lokasi_gerbang || (
              <i className="text-danger">*empty</i>
            ),
            nopol: row.nomor_polisi || <i className="text-danger">*empty</i>,
            kendaraan: row.nama_kendaraan || (
              <i className="text-danger">*empty</i>
            ),
            interval:
              // row.interval
              durasiParkir || <i className="text-danger">*empty</i>,
            tarif:
              row.biaya_parkir != null && row.biaya_parkir !== '' ? (
                formatRupiah(
                  typeof row.biaya_parkir === 'string'
                    ? parseInt(row.biaya_parkir)
                    : row.biaya_parkir
                )
              ) : (
                <i className="text-danger">*empty</i>
              ),
            denda: formatRupiah(
              (() => {
                const dendaStnkRaw = row.data_transaksi?.jumlah_denda_stnk;
                const dendaTiketRaw = row.data_transaksi?.jumlah_denda_tiket;

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
            ),
            // status: row.status || <i className="text-danger">*empty</i>,
            // tipe: row.tipe || <i className="text-danger">*empty</i>,
            pembayaran: row.nama_jenis_pembayaran || (
              <i className="text-danger">*empty</i>
            ),
            namaProdukMember:
              row.data_member?.nama_produk != null &&
              row.data_member?.nama_produk !== '' ? (
                row.data_member.nama_produk
              ) : (
                <i>-</i>
              ),
            noPrepaidCard:
              row.data_member?.no_kartu != null &&
              row.data_member?.no_kartu !== '' ? (
                row.data_member.no_kartu
              ) : (
                <i>-</i>
              ),
            petugas: row.nama_petugas || <i className="text-danger">*empty</i>,
            shift: row.shift || <i className="text-danger">*empty</i>,
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
        onSearch={(data) => console.log('Hasil pencarian:', data)}
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
