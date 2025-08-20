'use client';

import React from 'react';
import {
  RiFileExcel2Line,
  RiFilePdfLine,
  RiPrinterLine,
} from '@remixicon/react';
import EvoButton from '@/components/evosist_elements/EvoButton';

const EvoExportData = ({ onExportPDF, onExportExcel, onPrint }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Tombol Export ke PDF */}
      <EvoButton
        buttonText="PDF"
        onClick={onExportPDF}
        icon={<RiFilePdfLine size={18} />}
        fillColor="#ff2a46"
        className='px-2.5'
      />

      {/* Tombol Export ke Excel */}
      <EvoButton
        buttonText="Excel"
        onClick={onExportExcel}
        icon={<RiFileExcel2Line size={18} />}
        fillColor="#18c43d"
        className='px-2.5'
      />

      {/* Tombol Print */}
      <EvoButton
        buttonText="Print"
        onClick={onPrint}
        icon={<RiPrinterLine size={18} />}
        fillColor="#2a6dff"
        className='px-2.5'
      />
      
    </div>
  );
};

export default EvoExportData;
