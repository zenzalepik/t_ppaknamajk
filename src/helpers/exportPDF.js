import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Fungsi untuk mengubah URL gambar ke Base64
 * @param {string} url - URL gambar
 * @returns {Promise<string|null>} - base64 string atau null jika gagal
 */
const loadImageAsBase64 = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const base64 = canvas.toDataURL('image/png');
      resolve(base64);
    };
    img.onerror = () => resolve(null);
  });
};

/**
 * Fungsi utama untuk export tabel menjadi PDF
 * @param {string} tableId - ID dari elemen tabel
 * @param {string} titleSection - Judul tabel di tengah PDF
 * @param {string} logoUrl - Path logo PNG (default: '/images/png/logo.png')
 */
export const exportPDF = async (tableId, titleSection, logoUrl = '/images/png/logo.png') => {
  const element = document.getElementById(tableId);
  if (!element) {
    console.error('Elemen tabel tidak ditemukan.');
    return;
  }

  const headers = [];
  const data = [];

  const ths = element.querySelectorAll('thead th');
  ths.forEach((th) => {
    const text = th.textContent.trim();
    if (text.toLowerCase() !== 'aksi') {
      headers.push(text);
    }
  });

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

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4',
  });

  const margin = 8;
  const pageWidth = doc.internal.pageSize.getWidth();
  const formattedDate = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const logoBase64 = await loadImageAsBase64(logoUrl);

  // === Header (Logo + teks atas) ===
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', margin, margin, 16, 16);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Evosist Parking', margin + 20, margin + 12);

    const devText = 'Developed by Evosist';
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const textWidth = doc.getTextWidth(devText);
    doc.text(devText, pageWidth - margin - textWidth, margin + 16);
  }

  // === Judul + Tanggal ===
  doc.setFontSize(25);
  doc.setFont('helvetica', 'bold');
  doc.text(titleSection, pageWidth / 2, margin + 14, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(formattedDate, pageWidth / 2, margin + 25, { align: 'center' });

  // === Tabel ===
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: margin + 56,
    margin: { left: margin, right: margin },
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [255, 91, 42], // #FF5B2A
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    didDrawCell: (data) => {
      if (data.section === 'head' && data.row.index === 0) {
        const { doc } = data;
        const { x, y, width, height } = data.cell;
        doc.setDrawColor(0);
        doc.setLineWidth(1);
        doc.line(x, y + height, x + width, y + height);
      }
    },
    didDrawPage: (data) => {
      const lineY = data.cursor.y + 4;
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(margin, lineY, pageWidth - margin, lineY);
    },
  });

  doc.save('EvoTableData.pdf');
};
