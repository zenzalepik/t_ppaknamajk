// exportExcel.js
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import strings from "@/utils/strings"; // Jika menggunakan alias Next.js
import { getPengaturanGlobal } from '@/utils/dbGlobals';

/**
 * Fungsi untuk mengekspor tabel ke Excel
 * @param {string} tableId - ID tabel yang ingin diekspor
 * @param {string} titleSection - Judul bagian (misalnya "Data Gerbang")
 * @returns {Promise<void>}
 */
export const exportExcel = async (tableId, titleSection) => {
  const storedGlobal = await getPengaturanGlobal();
  const dataGlobal = storedGlobal?.data?.[0];

  const element = document.getElementById(tableId);
  if (!element) {
    console.error('Elemen tabel tidak ditemukan.');
    return;
  }

  const headers = [];
  const data = [];

  // Ambil header
  const ths = element.querySelectorAll('thead th');
  ths.forEach((th) => {
    const text = th.textContent.trim();
    if (text.toLowerCase() !== 'aksi') {
      headers.push(text);
    }
  });

  // Ambil data baris tabel
  const trs = element.querySelectorAll('tbody tr');
  trs.forEach((tr) => {
    const rowData = [];
    const tds = tr.querySelectorAll('td');
    tds.forEach((td, index) => {
      const headerText = ths[index]?.textContent.trim().toLowerCase();
      if (headerText !== 'aksi') {
        rowData.push(td.textContent.trim());
      }
    });
    data.push(rowData);
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(titleSection);

  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const totalCols = headers.length;
  const lastColLetter = String.fromCharCode(65 + totalCols - 1);

  // === Header Atas ===
  const mergeAndStyle = (cell, value, font, rowIdx) => {
    worksheet.mergeCells(`A${rowIdx}:${lastColLetter}${rowIdx}`);
    const cellObj = worksheet.getCell(`A${rowIdx}`);
    cellObj.value = value;
    cellObj.alignment = { horizontal: 'center' };
    cellObj.font = font;
  };

  mergeAndStyle('A1', dataGlobal?.nama_operator , { bold: true, size: 12 }, 1);
  mergeAndStyle('A2', 'Developed by ' + strings.developerName, { italic: true, size: 10 }, 2);
  mergeAndStyle('A3', titleSection, { bold: true, size: 24 }, 3);
  mergeAndStyle('A4', dateStr, { size: 10 }, 4);

  // Spacer baris kosong
  worksheet.addRow([]);

  // === Header Tabel ===
  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF5B2A' }, // Orange
    };
    cell.font = {
      bold: true,
      color: { argb: '00000000' }, // White
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'thick', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } },
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  // === Data Tabel ===
  data.forEach((rowData) => {
    const row = worksheet.addRow(rowData);
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } },
      };
      cell.alignment = { horizontal: 'left', vertical: 'middle' };
    });
  });

  // === Auto width kolom ===
  worksheet.columns.forEach((col) => {
    let maxLength = 10;
    col.eachCell({ includeEmpty: true }, (cell) => {
      const val = cell.value;
      if (val) {
        const length = val.toString().length;
        if (length > maxLength) maxLength = length;
      }
    });
    col.width = maxLength + 2;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, 'EvoTableData.xlsx');
};
