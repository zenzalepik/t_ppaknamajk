// EvoTitleSection.jsx
'use client';

import React from 'react';
import EvoInRadio from '@/components/evosist_elements/EvoInRadio';
import EvoBtnDropdown from '@/components/evosist_elements/EvoBtnDropdown';
import { RiUser3Line, RiArrowLeftLine } from '@remixicon/react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import EvoExportData from '@/components/EvoExportData';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
// import { useCallback } from 'react';

const EvoTitleSection = ({
  title,
  radioItems,
  monthNames,
  years,
  handleChange,
  buttonText, // Tambahan props opsional
  onButtonClick, // Tambahan handler opsional
  icon,
  onExportPDF, // Handler export PDF (opsional)
  onExportExcel, // Handler export Excel (opsional)
  onPrint, // Handler print (opsional)
  onBack,
  borderTop = false,
  onDateAwal, // <-- fungsi untuk ambil tanggal awal
  onDateAkhir, // <-- fungsi untuk ambil tanggal akhir
  onDateChange, // <-- callback baru untuk mengirimkan tanggal
}) => {
  /*
  const [selectedDateFilterAwal, setSelectedDateFilterAwal] = React.useState(
    () => onDateAwal?.() || null
  );
  const [selectedDateFilterAkhir, setSelectedDateFilterAkhir] = React.useState(
    () => onDateAkhir?.() || null
  );

  // Notify parent ketika tanggal berubah
  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDateFilterAwal, selectedDateFilterAkhir);
    }
  }, [selectedDateFilterAwal, selectedDateFilterAkhir]);
  const showDatePickers = selectedDateFilterAwal || selectedDateFilterAkhir;

  // const memoizedOnDateChange = useCallback(onDateChange, []);

  // React.useEffect(() => {
  //   if (memoizedOnDateChange) {
  //     memoizedOnDateChange(selectedDateFilterAwal, selectedDateFilterAkhir);
  //   }
  // }, [selectedDateFilterAwal, selectedDateFilterAkhir, memoizedOnDateChange]);
*/

  const [selectedDateFilterAwal, setSelectedDateFilterAwal] = React.useState(
    () => onDateAwal?.() || null
  );
  const [selectedDateFilterAkhir, setSelectedDateFilterAkhir] = React.useState(
    () => onDateAkhir?.() || null
  );
  
  // Memastikan onDateChange dipanggil saat tanggal berubah
  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDateFilterAwal, selectedDateFilterAkhir);
    }
  }, [selectedDateFilterAwal, selectedDateFilterAkhir, onDateChange]); // ✅ Tambah onDateChange

  const showDatePickers = selectedDateFilterAwal || selectedDateFilterAkhir;
  return (
    <div className="flex flex-col gap-2">
      {borderTop && <hr className="border-t border-border opacity-[0.24]" />}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          {onBack && (
            <EvoButton
              outlined={true}
              size="large"
              icon={<RiArrowLeftLine />}
              onClick={onBack}
            />
          )}
          <h2 className="text-title_small">{title}</h2>
        </div>
        <div className="flex items-center gap-6 mt-2 md:mt-0">
          {/* Date Range */}
          {showDatePickers && (
            <div className="flex items-center gap-2 mb-2.5">
              <div className="flex w-[144px]">
                <EvoInDatePicker
                  name="tanggalFilterAwal"
                  label="Tanggal Awal"
                  value={selectedDateFilterAwal}
                  placeholder="Pilih tanggal awal"
                  isWidthFull={true}
                  size="small"
                  onChange={(date) => setSelectedDateFilterAwal(date)}
                />
              </div>
              <div className="flex w-[144px]">
                <EvoInDatePicker
                  name="tanggalFilterAkhir"
                  label="Tanggal Akhir"
                  value={selectedDateFilterAkhir}
                  placeholder="Pilih tanggal akhir"
                  isWidthFull={true}
                  size="small"
                  onChange={(date) => setSelectedDateFilterAkhir(date)}
                />
              </div>
            </div>
          )}

          {/* Render EvoInRadio hanya jika radioItems ada */}
          {radioItems && radioItems.length > 0 && (
            <EvoInRadio
              items={radioItems}
              defaultValue="daily"
              onChange={handleChange}
            />
          )}
          {/* Render dropdown Bulan dan Tahun hanya jika salah satu ada */}
          {(monthNames && monthNames.length > 0) ||
          (years && years.length > 0) ? (
            <div className="flex items-center gap-3">
              {/* Render dropdown Bulan hanya jika monthNames ada */}
              {monthNames && monthNames.length > 0 && (
                <EvoBtnDropdown
                  label="Bulan"
                  icon={RiUser3Line}
                  items={monthNames}
                />
              )}
              {/* Render dropdown Tahun hanya jika years ada */}
              {years && years.length > 0 && (
                <EvoBtnDropdown
                  label="Tahun"
                  icon={RiUser3Line}
                  items={years}
                />
              )}
            </div>
          ) : null}
          {/* Tombol Export dan Tambah */}
          <div className="flex items-center gap-3">
            {/* Tombol Export hanya muncul jika ada handler */}
            {(onExportPDF || onExportExcel || onPrint) && (
              <EvoExportData
                onExportPDF={onExportPDF}
                onExportExcel={onExportExcel}
                onPrint={onPrint}
              />
            )}
          </div>
          {buttonText && (
            <div className="flex items-center gap-3">
              <EvoButton
                buttonText={buttonText}
                onClick={onButtonClick}
                size="large"
                icon={icon}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <hr className="border-t border-border opacity-[0.24]" />
        <div className="bg-primary w-[276px] h-1.5" />
        <div className="bg-black w-20 h-3 rounded-br-[6px]" />
      </div>
    </div>
  );
};

export default EvoTitleSection;
