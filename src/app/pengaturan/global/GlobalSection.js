//GlobalSection.js
'use client';

import React, { useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { RiAddLargeLine, RiSearchLine, RiUser3Line } from '@remixicon/react';
import EditGlobalForm from './forms/EditFormOperator';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import { tableDataGlobal } from './tableDataGlobal';
import EvoActionButtons from '@/components/EvoActionButtons';
import { StatusLabel } from '@/components/StatusLabel';
import EvoSearchTabel from '@/components/EvoSearchTabel';
import EvoButton from '@/components/evosist_elements/EvoButton';
import EditLokasiForm from './forms/EditFormLokasi';
import { fetchApiPengaturanGlobal } from './api/fetchApiPengaturanGlobal';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';

const titleSection = 'Global';

export default function GlobalSection() {
  const [modalOperatorOpen, setModalOperatorOpen] = useState(false);
  const [modalLokasiOpen, setModalLokasiOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

  const {
    data: pengaturanGlobal,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanGlobal'],
    queryFn: fetchApiPengaturanGlobal,
    // retry: false,
  });

  const handleModalOperatorEdit = () => setModalOperatorOpen(true);
  const handleModalOperatorTutup = () => setModalOperatorOpen(false);

  const handleModalLokasiEdit = () => setModalLokasiOpen(true);
  const handleModalLokasiTutup = () => setModalLokasiOpen(false);

  if (isLoading)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  // console.log('pengaturanGlobal', pengaturanGlobal);
  const dataGlobal = pengaturanGlobal.data[0] || {};


  const handleEditOperator = (id) => {
    // console.log('Tombol Edit diklik untuk ID:', id);
    // const dataDipilih = pengaturanGlobal.find((item) => item.id === id);
    console.log(dataGlobal);
    if (dataGlobal) {
      setSelectedData({
        id: dataGlobal.id,
        nama_operator: dataGlobal.nama_operator || '',
        email_operator: dataGlobal.email_operator || '',
        no_telp_operator: dataGlobal.no_telp_operator || '',
        no_fax_operator: dataGlobal.no_fax_operator || '',
        alamat_operator: dataGlobal.alamat_operator || '',
      });
      handleModalOperatorEdit();
      // handleModalOperatorEdit(true);
    }
  };

  const handleEditLokasi = (id) => {
    // console.log('Tombol Edit diklik untuk ID:', id);
    console.log(dataGlobal);
    if (dataGlobal) {
      setSelectedData({
        id: dataGlobal.id,
        nama_lokasi: dataGlobal.nama_lokasi || '',
        email_lokasi: dataGlobal.email_lokasi || '',
        no_telp_lokasi: dataGlobal.no_telp_lokasi || '',
        no_fax_lokasi: dataGlobal.no_fax_lokasi || '',
        alamat_lokasi: dataGlobal.alamat_lokasi || '',
      });
      handleModalLokasiEdit();
      // handleModalOperatorEdit(true);
    }
  };

  const handleSubmitDataOperator = (data) => {
    // console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  const handleSubmitDataLokasi = (data) => {
    // console.log('Data baru:', data);
    // Kirim ke API atau setState
  };

  return (
    <EvoCardSection>
      <EvoTitleSection
        title={titleSection}
        // radioItems={radioItems}
        // monthNames={monthNames}
        // years={years}
        // handleChange={handleChange}
        // buttonText={`Tambah ${titleSection}`}
        icon={<RiAddLargeLine size={16} />}
        onExportPDF={() => exportPDF('tableToPrint', titleSection)}
        onExportExcel={() => exportExcel('tableToPrint', titleSection)}
        onPrint={() => exportPrint('tableToPrint', titleSection)}
      />
      {/* <EvoSearchTabel
        placeholder="Ketik nama parameter..."
        buttonText="Pencarian"
        onSearch={handleSearch}
      /> */}
      <EditGlobalForm
        isOpen={modalOperatorOpen}
        onClose={handleModalOperatorTutup}
        onSubmit={handleSubmitDataOperator}
        initialData={selectedData}
      />
      <EditLokasiForm
        isOpen={modalLokasiOpen}
        onClose={handleModalLokasiTutup}
        onSubmit={handleSubmitDataLokasi}
        initialData={selectedData}
      />
      <div className="flex gap-6">
        <div className="flex flex-col w-full">
          <div className="text-title_large text-primary mb-8">Operator</div>
          <div className="text-label_medium_semibold text-black mb-0">
            Nama Operator
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.nama_operator || '-'}
          </div>
          <div className="text-label_medium_semibold text-black mb-0">
            Nomor Telephone (Whtapp)
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.no_telp_operator || '-'}
          </div>
          <div className="text-label_medium_semibold text-black mb-0">
            E-mail
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.email_operator || '-'}
          </div>
          <div className="text-label_medium_semibold text-black mb-0">
            Alamat Perusahaan
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.alamat_operator || '-'}
          </div>
          <EvoButton
            buttonText="Ubah Data Operator"
            className="!w-fit px-4 py-3"
            onClick={() => handleEditOperator(dataGlobal.id)}
          />
        </div>

        <div className="bg-black w-2 h-full"></div>

        <div className="flex flex-col w-full">
          <div className="text-title_large text-primary mb-8">Lokasi</div>
          <div className="text-label_medium_semibold text-black mb-0">
            Nama Lokasi Parkir
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.nama_lokasi || '-'}
          </div>
          <div className="text-label_medium_semibold text-black mb-0">
            Nomor Telephone (Whatsapp)
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.no_telp_lokasi || '-'}
          </div>
          <div className="text-label_medium_semibold text-black mb-0">
            E-mail
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.email_lokasi || '-'}
          </div>
          <div className="text-label_medium_semibold text-black mb-0">
            Alamat Lokasi Parkir
          </div>
          <div className="text-article text-black/[0.64] mb-3">
            {dataGlobal.alamat_lokasi || '-'}
          </div>
          <EvoButton
            buttonText="Ubah Data Lokasi"
            className="!w-fit px-4 py-3"
            onClick={()=>handleEditLokasi(dataGlobal.id)}
          />
        </div>
      </div>
    </EvoCardSection>
  );
}
