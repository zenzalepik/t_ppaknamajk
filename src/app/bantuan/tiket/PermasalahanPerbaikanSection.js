'use client';

import React, {useEffect , useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import { RiAddLargeLine, RiWallet3Line } from '@remixicon/react';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import EvoCardPermasalahanPerbaikan from '@/components/EvoCardPermasalahanPerbaikan';
import PengaduanSection from './PengaduanSection';
import { motion } from 'framer-motion';
import AddPengaduanForm from './forms/AddForm';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import EvoErrorDiv from '@/components/EvoErrorDiv';

const titleSection = 'Pembayaran';

export default function PembayaranSection() {
  const [TableVisible, setTableVisible] = useState(false);
  const [modalOpenPengaduan, setModalOpenPengaduan] = useState(false);
  const handleTambahPengaduan = () => setModalOpenPengaduan(true);
  const handleTutup = () => setModalOpenPengaduan(false);

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesBTiket =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Bantuan')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Tiket')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesBTiket).some(
    (v) => v === true
  );

  const toggleTableVisibility = () => {
    setTableVisible(!TableVisible);
  };

  const handleTurnOff = (paymentType) => {
    console.log(`Menonaktifkan ${paymentType}`);
  };

  const handleCancelTurnOff = () => {
    setConfirmDeleteId(null);
  };

  const handleTurnOn = () => {
    console.log('Tombol Aktifkan ditekan');
  };

  const handleSubmitData = (data) => {
    console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <>
      {hakAksesBTiket.create == true && (
        <AddPengaduanForm
          isOpen={modalOpenPengaduan}
          onClose={handleTutup}
          onSubmit={handleSubmitData}
        />
      )}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: TableVisible ? 0 : 1, y: TableVisible ? -10 : 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className={`${TableVisible ? 'hidden' : ''}`}
      >
        <EvoCardSection>
          {/* Animasi dengan Framer Motion */}
          <div className="grid grid-cols-2 gap-6 ">
            {hakAksesBTiket.read == true && (
              <EvoCardPermasalahanPerbaikan
                key="Data Pengaduan & Perbaikan"
                title="Data Pengaduan & Perbaikan"
                updatedBy="Muhtar Lubis Asyari"
                updatedDate="18-11-2021 21:39"
                action={toggleTableVisibility}
              />
            )}
            {hakAksesBTiket.create == true && (
              <EvoCardPermasalahanPerbaikan
                key="Kirim Pengaduan Ganguan"
                title="Kirim Pengaduan Ganguan"
                updatedBy="Muhtar Lubis Asyari"
                updatedDate="18-11-2021 21:39"
                action={handleTambahPengaduan}
              />
            )}
          </div>
        </EvoCardSection>
      </motion.div>

      {hakAksesBTiket.read == true && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: TableVisible ? 1 : 0, y: TableVisible ? 0 : 20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <PengaduanSection
            onBack={toggleTableVisibility}
            hakAksesBTiket={hakAksesBTiket}
          />
        </motion.div>
      )}
    </>
  );
}
