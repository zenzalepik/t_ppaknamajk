/**
 * Export tabel sebagai halaman siap cetak dan langsung membuka dialog print.
 *
 * @param {string} tableId - ID elemen tabel yang ingin dicetak
 * @param {string} titleSection - Judul utama di bagian tengah halaman
 */
export const exportPrint = (tableId, titleSection = 'Data') => {
    const table = document.getElementById(tableId);
    if (!table) return;
  
    const printWindow = window.open('', '_blank');
    const clonedTable = table.cloneNode(true);
  
    // Hapus kolom "Aksi"
    const actionIndex = Array.from(clonedTable.querySelectorAll('th')).findIndex(
      (th) => th.textContent.trim().toLowerCase() === 'aksi'
    );
  
    if (actionIndex !== -1) {
      clonedTable.querySelectorAll('tr').forEach((row) => {
        if (row.children[actionIndex]) {
          row.removeChild(row.children[actionIndex]);
        }
      });
    }
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body { font-family: sans-serif; padding: 8px; }
            table, th, td { border: 1px solid #000; border-collapse: collapse; padding: 6px; }
            th { background-color: #FF5B2A; color: black; font-weight: bold; border-color:#000000 }
            td { text-align: center; }
  
            @media print {
              th {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
  
            @page {
              margin: 8px;
            }
  
            .wrap-copyright {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
  
            h3 { display: inline-block; }
            h1 { line-height: 0.8px; }
            .copyright {
              font-size: 9px;
              opacity: 0.64;
              margin-top: -40px;
            }
          </style>
        </head>
        <body>
          <div style="text-align: center;">
            <div class="wrap-copyright">
              <h3>Evosist Parking</h3>
              <span class="copyright">Developed by Evosist</span>
            </div>
            <br />
            <h1>${titleSection}</h1>
            <p>${new Date().toLocaleDateString('id-ID')}</p>
          </div>
          ${clonedTable.outerHTML}
          <script>
            window.print();
            window.close();
          </script>
        </body>
      </html>
    `);
  };
  