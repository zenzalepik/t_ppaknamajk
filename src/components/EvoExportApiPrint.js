'use client';
import React, { useState } from 'react';
import EvoModal from '@/components/EvoModal';
import EvoForm from '@/components/EvoForm';
import EvoInDatePicker from '@/components/evosist_elements/EvoInDatePicker';
import strings from '@/utils/strings';

export default function EvoExportApiPrint({ isOpen, onClose, endpoint }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = async () => {
    try {
      const url = `${strings.apiUrl}${endpoint}?start_date=${startDate}&end_date=${endDate}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/pdf' },
      });

      if (!response.ok) throw new Error(`Gagal mengambil PDF: ${response.status}`);
      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);

      // ✅ Buka jendela baru untuk menampilkan PDF lalu trigger print
      const newWindow = window.open(fileURL, '_blank');
      if (newWindow) {
        newWindow.focus();
        newWindow.onload = () => newWindow.print(); // Otomatis tampilkan dialog print
      }

      onClose(); // Tutup modal
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <EvoModal isOpen={isOpen} onClose={onClose} title="Pilih Periode Cetak">
      <EvoForm
        submitText="Cetak PDF"
        cancelText="Batal"
        onCancel={onClose}
        onSubmit={(e) => {
          e.preventDefault();
          handleExport();
        }}
      >
        <div className="flex gap-3">
          <EvoInDatePicker
            name="start_date"
            label="Tanggal Awal"
            value={startDate}
            onChange={setStartDate}
            isWidthFull={true}
            placeholder="Pilih tanggal awal"
          />
          <EvoInDatePicker
            name="end_date"
            label="Tanggal Akhir"
            value={endDate}
            onChange={setEndDate}
            isWidthFull={true}
            placeholder="Pilih tanggal akhir"
          />
        </div>
      </EvoForm>
    </EvoModal>
  );
}
