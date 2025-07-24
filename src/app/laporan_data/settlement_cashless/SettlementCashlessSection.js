//SettlementCashlessSection.js
'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditSettlementCashlessForm from './forms/EditForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataSettlement } from './tableDataSettlement';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukMember from './FilterMasProdukMember';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiUpload2Line } from '@remixicon/react';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';
import { fetchApiSettlementCashlessSection } from './api/fetchApiSettlementCashlessSection';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getErrorMessage } from '@/utils/errorHandler';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoExportApiPDF from '@/components/EvoExportApiPDF';
import EvoExportApiExcel from '@/components/EvoExportApiExcel';
import EvoExportApiPrint from '@/components/EvoExportApiPrint';
import EvoNotifCard from '@/components/EvoNotifCard';

const titleSection = 'Settlement Cashless';

export default function SettlementCashlessSection() {
  const urlExport = '/laporan_data_settlement_cashless_section/';
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

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesLDSettlementCashless =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Laporan Data')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Settlement Cashless')
      ?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesLDSettlementCashless).some(
    (v) => v === true
  );

  const {
    data: laporanSettlementCashlessSection,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['laporanSettlementCashlessSection', currentPage],
    queryFn: () =>
      fetchApiSettlementCashlessSection({
        limit: 5,
        page: currentPage,
        offset: (currentPage - 1) * 5,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    // retry: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    laporanSettlementCashlessSection?.data?.length > 0
      ? laporanSettlementCashlessSection.data.map((row, index) => ({
          no: index + 1,
          // id: row.id || <i>*empty</i>,
          // no: row.no || <i>*empty</i>,
          noTiket: row.noTiket || <i>*empty</i>,
          tanggalKeluar: row.tanggalKeluar || <i>*empty</i>,
          pintuKeluar: row.pintuKeluar || <i>*empty</i>,
          nopol: row.nopol || <i>*empty</i>,
          kendaraan: row.kendaraan || <i>*empty</i>,
          interval: row.interval || <i>*empty</i>,
          tarif: row.tarif || <i>*empty</i>,
          denda: row.denda || <i>*empty</i>,
          tipeDenda: row.tipeDenda || <i>*empty</i>,
          pembayaran: row.pembayaran || <i>*empty</i>,
          channel: row.channel || <i>*empty</i>,
          vaQr: row.vaQr || <i>*empty</i>,
          petugas: row.petugas || <i>*empty</i>,
          shift: row.shift || <i>*empty</i>,
          transactionId: row.transactionId || <i>*empty</i>,
          orderId: row.orderId || <i>*empty</i>,
          transactionTime: row.transactionTime || <i>*empty</i>,
          settlementTime: row.settlementTime || <i>*empty</i>,
          settlementStatus:
            row.settlementStatus == null ? (
              <i>*empty</i>
            ) : (
              StatusLabel.settlementStatus(row.settlementStatus)
            ),
          fileSettlementName:
            row.fileSettlementName == null ? (
              '-'
            ) : (
              <a
                href={`/path/to/files/${row.fileSettlementName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                {row.fileSettlementName.length > 15
                  ? '...' + row.fileSettlementName.slice(-15)
                  : row.fileSettlementName}
              </a>
            ),

          aksi: (
            <EvoActionButtons
              rowId={row.aksi}
              // onAktifkan={() => console.log('Aktifkan', row.aksi)}
              // onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
              customButtons={
                hakAksesLDSettlementCashless.unggah_file == true
                  ? [
                      <EvoButton
                        key="unggahFileSettlement"
                        icon={<RiUpload2Line />}
                        onClick={
                          //() => handleUnggahFileSettlement(row.no)
                          handleEdit
                        }
                        buttonText={'Unggah File'}
                      />,
                    ]
                  : []
              }
            />
          ),
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
          onExportPDF={
            hakAksesLDSettlementCashless.read == true
              ? () => setModalExportPDFOpen(true)
              : null
          }
          onExportExcel={
            hakAksesLDSettlementCashless.read == true
              ? () => setModalExportExcel(true)
              : null
          }
          onPrint={
            hakAksesLDSettlementCashless.read == true
              ? () => setModalExportPrint(true)
              : null
          }
          onDateAkhir={getDefaultDateAkhir}
          onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}
        />{' '}
        {hakAksesLDSettlementCashless.read == true && (
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
        {hakAksesLDSettlementCashless.read == true && (
          <EvoSearchTabel
            // isFilter={true}
            // FilterComponent={FilterMasProdukMember}
            placeholder="Ketik nomor tiket..."
            onSearch={(data) => console.log('Hasil pencarian:', data)}
          />
        )}
        {hakAksesLDSettlementCashless.update == true && (
          <EditSettlementCashlessForm
            isOpen={modalOpen}
            onClose={handleTutup}
            onSubmit={handleSubmitData}
          />
        )}
        {hakAksesLDSettlementCashless.read == true && (
          <EvoTable
            id="tableToPrint"
            tableData={tableDataSettlement}
            currentPage={currentPage}
            totalPages={laporanSettlementCashlessSection?.totalPages}
            onPageChange={handlePageChange}
            rows={rows}
          />
        )}
      </EvoCardSection>
    </>
  );
}
