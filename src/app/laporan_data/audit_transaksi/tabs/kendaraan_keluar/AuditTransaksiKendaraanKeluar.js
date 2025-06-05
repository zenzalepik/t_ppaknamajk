//AuditTransaksiKendaraanKeluar.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataAuditTransaksiKendaraanKeluar } from './tableDataAuditTransaksiKendaraanKeluar';
// import {tableDataKendaraan} from './tableDataAuditTransaksiKendaraanKeluar';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterLapAudTranKendaraanKeluar from './FilterLapAudTranKendaraanKeluar';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiUpload2Line } from '@remixicon/react';
import {
  getDefaultDateAwal,
  getDefaultDateAkhir,
} from '@/helpers/dateRangeHelper';

const titleSection = 'Kendaraan Keluar';

export default function AuditTransaksiKendaraanKeluar() {
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleTutup = () => setModalOpen(false);

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

  const rows = tableDataAuditTransaksiKendaraanKeluar.rows.map((row) => ({
    ...row,
    // fileSettlementName: (
    //   <a
    //     href={`/path/to/files/${row.fileSettlementName}`}
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="text-primary underline hover:text-primary/80"
    //   >
    //     {row.fileSettlementName.length > 15
    //       ? '...' + row.fileSettlementName.slice(-15)
    //       : row.fileSettlementName}
    //   </a>
    // ),

    // settlementStatus: StatusLabel.settlementStatus(row.settlementStatus), // ambil dari 'settlementStatus'
    /*aksi: (
      <EvoActionButtons
        rowId={row.aksi}
        // onAktifkan={() => console.log('Aktifkan', row.aksi)}
        // onNonAktifkan={() => console.log('NonAktifkan', row.aksi)}
        customButtons={[
          <EvoButton
            key="unggahFileSettlement"
            icon={<RiUpload2Line />}
            onClick={
              //() => handleUnggahFileSettlement(row.no)
              handleEdit
            }
            buttonText={'Unggah File'}
          />,
        ]}
      />
    ),*/
  }));

  return (
    <EvoCardSection className="!p-0 !bg-transparent !shadow-none">
      <EvoTitleSection
        title={titleSection}
        // radioItems={radioItems}
        // monthNames={monthNames}
        // years={years}
        // handleChange={handleChange}
        // buttonText={`Tambah ${titleSection}`}
        // onButtonClick={handleEdit}
        // icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
                onDateAkhir={getDefaultDateAkhir}
                onDateAwal={getDefaultDateAwal}
                onDateChange={handleDateChange}
      />
      <EvoSearchTabel
        // isFilter={true}
        // FilterComponent={FilterLapAudTranKendaraanKeluar}
        placeholder="Ketik nomor polisi..."
        onSearch={(data) => console.log('Hasil pencarian:', data)}
      />

      <EvoTable
        id="tableToPrint"
        tableData={tableDataAuditTransaksiKendaraanKeluar}
        currentPage={1}
        totalPages={3}
        onPageChange={
          (page) => console.log('Page:', page)
          // columns={tableDataAuditTransaksiKendaraanKeluar.columns} rows={rows}
        }
        rows={rows}
      />
    </EvoCardSection>
  );
}
