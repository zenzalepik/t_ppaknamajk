import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoTableMulti from '@/components/evosist_elements/EvoTableMulti';
import {
  RiImageLine,
  RiAddLargeLine,
  RiSearchLine,
  RiUser3Line,
} from '@remixicon/react';
import PembatalanTansaksiForm from './forms/PembatalanTansaksiForm';
import * as Popover from '@radix-ui/react-popover';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { monthNames } from '@/helpers/timeMonth';
import { currentYear, years } from '@/helpers/timeYear';
import { tableDataTransaksiBatal } from './data/tableDataTransaksiBatal';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import FilterMasProdukMember from './FilterMasProdukMember';
import EvoButton from '@/components/evosist_elements/EvoButton';
import EvoTable from '@/components/evosist_elements/EvoTable';
import colors from '@/utils/colors';

const titleSection = 'Kirim Pembatalan Transaksi';

export default function TransaksiBatalContentTambah() {
  const [showTabel, setShowTabel] = useState(false);
  const [modalOpenPengaduan, setModalOpenPengaduan] = useState(false);

  const handleTambahPengaduan = () => setModalOpenPengaduan(true);
  const handleTutup = () => setModalOpenPengaduan(false);

  const handleSubmitData = (data) => {
    console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  // Fungsi untuk edit data
  const handleEdit = (id) => {
    console.log('Tombol Edit diklik untuk ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  // const [confirmMoreId, setConfirmMoreId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = (id) => {
    console.log('Hapus ID:', id);
    setConfirmDeleteId(null); // tutup tooltip
    // logic delete
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handlePerpanjang = (id) => {
    console.log('Perpanjang ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleGantiKartu = (id) => {
    console.log('Ganti Kartu ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleGantiNomorPolisi = (id) => {
    console.log('Ganti Nomor Polisi ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleRiwayatTransaksi = (id) => {
    console.log('Riwayat Transaksi ID:', id);
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleProsesPerbaikan = (id) => {
    console.log('Riwayat Transaksi ID:', id);
    handleTambahPengaduan();
    // Logika untuk melakukan edit (misalnya membuka form modal)
  };

  const handleChange = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  const handleSearch = (query) => {
    setShowTabel(true);
    console.log('Hasil pencarian:', query);
  };

  const rows = tableDataTransaksiBatal.rows.map((row) => ({
    ...row,
    status: StatusLabel.status(row.status), // Konversi status menjadi elemen visual
    member: row.member ? 'Ya' : 'Tidak',
    manualInput: row.manualInput ? 'Ya' : 'Tidak',
    kartuMember: row.kartuMember ? 'Ya' : 'Tidak',
    // Menampilkan "-" untuk nilai yang null
    namaBank: row.namaBank ?? '-',
    nomorRekening: row.nomorRekening ?? '-',
    namaEwallet: row.namaEwallet ?? '-',
    nomorEwallet: row.nomorEwallet ?? '-',
    // Tampilkan link jika `row.foto` memiliki isi, jika tidak tampilkan "-"
    foto: row.foto ? (
      <EvoButton
        key={`prosesPerbaikan-${row.no}`}
        outlined={true}
        icon={<RiImageLine />}
        onClick={() => window.open(row.foto, '_blank', 'noopener,noreferrer')}
        buttonText={'Lihat Foto'}
      />
    ) : (
      '-'
    ),

    aksi: (
      <EvoActionButtons
        rowId={row.no}
        moreAction={titleSection}
        customButtons={[
          <EvoButton
            key={`prosesPerbaikan-${row.no}`}
            onClick={() => handleProsesPerbaikan(row.no)}
            fillColor={colors.danger}
            buttonText={'Batalkan Transaksi'}
          />,
        ]}
      />
    ),
  }));

  return (
    <div className="flex flex-col gap-4">
      <EvoTitleSection
        title={titleSection}
        handleChange={handleChange}
        icon={<RiAddLargeLine size={16} />}
      />

      <EvoSearchTabel
        isFilter={true}
        FilterComponent={FilterMasProdukMember}
        placeholder="Ketik nomor tiket..."
        // onSearch={(data) => console.log('Hasil pencarian:', data)}
        onSearch={handleSearch}
      />

      <PembatalanTansaksiForm
        isOpen={modalOpenPengaduan}
        onClose={handleTutup}
        onSubmit={handleSubmitData}
      />

      {showTabel && (
        <EvoTable
          id="tableToPrint"
          tableData={tableDataTransaksiBatal}
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log('Page:', page)}
          rows={rows}
        />
      )}
    </div>
  );
}
