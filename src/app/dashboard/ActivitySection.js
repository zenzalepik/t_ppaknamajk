'use client';

import React from 'react';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoBtnDropdown from '@/components/evosist_elements/EvoBtnDropdown';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiSearchLine, RiUser3Line } from '@remixicon/react';
import { tabelDataAktivitasKendaraan } from './data/tabelDataAktivitasKendaraan';
import { getDefaultDateAwal, getDefaultDateAkhir } from '@/helpers/dateRangeHelper';

export default function ActivitySection() {
  
  const [startDate, setStartDate] = React.useState(getDefaultDateAwal());
  const [endDate, setEndDate] = React.useState(getDefaultDateAkhir());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    console.log('Hasil pencarian:', query);
  };

  // const rows = tabelDataAktivitasKendaraan.rows.map((row) => ({
  //   ...row,
  // }));

  const rows = tabelDataAktivitasKendaraan.rows.filter((row) => {
    if (!row.tanggal) return true; // skip jika tidak ada tanggal
    const rowDate = new Date(row.tanggal); // pastikan field 'tanggal' ada di data
    return (!startDate || !isBefore(rowDate, startDate)) &&
           (!endDate || !isAfter(rowDate, endDate));
  });

  return (
    <EvoCardSection>
      <EvoTitleSection
        title="Aktivitas Gerbang Kendaraan"
        // radioItems={radioItems}
        // monthNames={monthNames}
        // years={years}
        handleChange={handleChange}
                onExportPDF={() => exportPDF('tableToPrint', titleSection)}
                onExportExcel={() => exportExcel('tableToPrint', titleSection)}
                onPrint={() => exportPrint('tableToPrint', titleSection)}
        onDateAkhir={getDefaultDateAkhir}
        onDateAwal={getDefaultDateAwal}
          onDateChange={handleDateChange}

      />
      <EvoSearchTabel
        placeholder="Temukan loker impian kamu..."
        buttonText="Pencarian"
        onSearch={handleSearch}
      />
      <EvoTable
        id="tabelDataAktivitasKendaraan"
        tableData={tabelDataAktivitasKendaraan}
        // columns={columns}
        rows={rows}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log('Page:', page)}
      />
    </EvoCardSection>
  );
}
