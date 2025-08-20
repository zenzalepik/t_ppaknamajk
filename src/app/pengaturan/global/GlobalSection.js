//GlobalSection.js
'use client';

import React, { useEffect, useRef, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import {
  RiAddLargeLine,
  RiSearchLine,
  RiUser3Line,
  RiUpload2Line,
} from '@remixicon/react';
import EditGlobalForm from './forms/EditFormOperator';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import EvoButton from '@/components/evosist_elements/EvoButton';
import EditLokasiForm from './forms/EditFormLokasi';
import { fetchApiPengaturanGlobal } from './api/fetchApiPengaturanGlobal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { useSyncPengaturanGlobal } from './hooks/useSyncPengaturanGlobal';
import { usePengaturanGlobalFromLocal } from './hooks/usePengaturanGlobalFromLocal';
import { fetchApiPengaturanGlobalCreate } from './api/fetchApiPengaturanGlobalCreate';
import seederDefaultGlobalsFormData from '@/utils/seederDefaultGlobalsFormData';
import EvoNotifCard from '@/components/EvoNotifCard';
import EvoTable from '@/components/evosist_elements/EvoTable';
import { tableDataGlobal } from './tableDataGlobal';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import strings from '@/utils/strings';
import Image from 'next/image';
import EditFormUploadLogo from './forms/EditFormUploadLogo';

const titleSection = 'Global';

export default function GlobalSection() {
  useSyncPengaturanGlobal();

  const [modalOperatorOpen, setModalOperatorOpen] = useState(false);
  const [modalFormUploadLogoOpen, setModalFormUploadLogoOpen] = useState(false);
  const [modalLokasiOpen, setModalLokasiOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const queryClient = useQueryClient();

  const [isSeeding, setIsSeeding] = useState(false);
  const fetchAttemptCount = useRef(0); // Hitung berapa kali sudah fetch
  const isCreating = useRef(false); // Hindari multiple create

  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success'); // bisa: 'success', 'error', 'info'

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesPTarifDenda =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Pengaturan')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Global')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesPTarifDenda).some(
    (v) => v === true
  );

  const {
    data: pengaturanGlobal,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['pengaturanGlobal'],
    queryFn: fetchApiPengaturanGlobal,
    retry: true,
    refetchInterval: (data) => {
      if (Array.isArray(data?.data) && data.data.length === 0) {
        return 3000;
      }
      return 600000;
    },
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const isDataKosong =
        !isLoading &&
        !error &&
        Array.isArray(pengaturanGlobal?.data) &&
        pengaturanGlobal.data.length === 0;

      if (isDataKosong) {
        console.log('🔄 Refetch manual karena data kosong');
        refetch();
        fetchAttemptCount.current += 1;
        console.log('🔁 Jumlah percobaan fetch:', fetchAttemptCount.current);

        if (fetchAttemptCount.current >= 5 && !isCreating.current) {
          console.log('🚀 Membuat data seeder default...');
          isCreating.current = true;
          setIsSeeding(true);

          // Sembunyikan notifikasi setelah 5 detik
          setTimeout(() => {
            setIsSeeding(false);
          }, 5000);

          fetchApiPengaturanGlobalCreate(seederDefaultGlobalsFormData)
            .then(() => {
              // 🔄 Reload halaman
              setNotifType('success');
              setNotifMessage('Data default berhasil dibuat');
              queryClient.invalidateQueries(['pengaturanGlobal']); // refresh data
              setTimeout(() => {
                window.location.reload();
              }, 1000); // kasih delay biar notif sempat tampil
            })
            .catch((err) => {
              console.error(
                '❌ Gagal membuat data global default:',
                err.message
              );
              setNotifType('error');
              setNotifMessage('Gagal membuat data default');
            })
            .finally(() => {
              isCreating.current = false;
            });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [pengaturanGlobal, isLoading, error, refetch, queryClient]);

  useEffect(() => {
    if (notifMessage) {
      const timer = setTimeout(() => setNotifMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notifMessage]);

  const handleModalOperatorEdit = () => setModalOperatorOpen(true);
  const handleModalOperatorTutup = () => setModalOperatorOpen(false);

  const handleModalLokasiEdit = () => setModalLokasiOpen(true);
  const handleModalLokasiTutup = () => setModalLokasiOpen(false);

  const handleModalFormUploadLogo = () => setModalFormUploadLogoOpen(true);
   const handleModalFormUploadLogoTutup = () => setModalFormUploadLogoOpen(false);

  // const dataGlobal = pengaturanGlobal.data[0] || {};
  const dataGlobal = usePengaturanGlobalFromLocal()?.data[0];
  // console.log('ajjjjj', dataGlobal);

  if (isLoading || !dataGlobal) {
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        {isSeeding && (
          <div className="animate-pulse text-sm text-black">
            Data tidak ditemukan, sedang membuat data default aplikasi ...
          </div>
        )}
        {!isSeeding && <div>Loading...</div>}
      </div>
    );
  }

  if (error) {
    return <EvoErrorDiv errorHandlerText={getErrorMessage(error)} />; // ✅ Pastikan error ditampilkan di UI
  }

  const handleEditOperator = (id) => {
    // console.log('Tombol Edit diklik untuk ID:', id);
    // const dataDipilih = pengaturanGlobal.find((item) => item.id === id);
    // console.log(dataGlobal);
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
    // console.log(dataGlobal);
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

  

  const handleFormUploadLogo = (id) => {
    if (dataGlobal) {
      handleModalFormUploadLogo();
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

  // console.log(JSON.stringify(pengaturanGlobal));
  const rows =
    pengaturanGlobal?.data?.length > 0
      ? pengaturanGlobal.data.map((row, index) => ({
          no: index + 1,
          nama_operator: <b>{row.nama_operator || <i>*empty</i>}</b>,
          email_operator: row.email_operator || <i>*empty</i>,
          no_telp_operator: row.no_telp_operator || <i>*empty</i>,
          no_fax_operator: row.no_fax_operator || <i>*empty</i>,
          alamat_operator: row.alamat_operator || <i>*empty</i>,

          nama_lokasi: row.nama_lokasi || <i>*empty</i>,
          email_lokasi: row.email_lokasi || <i>*empty</i>,
          no_telp_lokasi: row.no_telp_lokasi || <i>*empty</i>,
          no_fax_lokasi: row.no_fax_lokasi || <i>*empty</i>,
          alamat_lokasi: row.alamat_lokasi || <i>*empty</i>,
        }))
      : [];

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  return (
    <>
      {notifMessage && (
        <EvoNotifCard
          type={notifType}
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          autoClose={true}
        />
      )}

      <EvoCardSection>
        <EvoTitleSection
          title={titleSection}
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesPTarifDenda.read == true
              ? () => exportPDF('tableToPrint', titleSection)
              : null
          }
          onExportExcel={
            hakAksesPTarifDenda.read == true
              ? () => exportExcel('tableToPrint', titleSection)
              : null
          }
          onPrint={
            hakAksesPTarifDenda.read == true
              ? () => exportPrint('tableToPrint', titleSection)
              : null
          }
        />
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
        
        <EditFormUploadLogo
          isOpen={modalFormUploadLogoOpen}
          onClose={handleModalFormUploadLogoTutup}
          onSubmit={handleSubmitDataOperator}
          initialData={selectedData}
        />
        
        <div className="flex gap-6">
          <div className="flex flex-col w-full">
            <div className="text-title_large text-primary mb-8">Operator</div>
            {hakAksesPTarifDenda.read == true && (
              <>
                <div className="text-label_medium_semibold text-black mb-0">
                  Nama Operator
                </div>
                <div className="text-article text-black/[0.64] mb-3">
                  {dataGlobal.nama_operator || '-'}
                </div>
                <div className="text-label_medium_semibold text-black mb-0">
                  Nomor Telephone (Whatsapp)
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
              </>
            )}
            {hakAksesPTarifDenda.update == true && (
              <EvoButton
                buttonText="Ubah Data Operator"
                className="!w-fit px-4 py-3"
                onClick={() => handleEditOperator(dataGlobal.id)}
              />
            )}
          </div>

          <div className="bg-black w-2 h-full"></div>
          <div className="flex flex-col w-full">
            <div className="text-title_large text-primary mb-8">Logo</div>
            {hakAksesPTarifDenda.read == true && (
              <>
                {/* {strings.apiUrl}
                {JSON.stringify(dataGlobal?.logo)}
                {dataGlobal?.logo == null ? 'false' : 'true'} */}
                <Image
                  src={
                      dataGlobal?.logo ? `${strings.apiUrl}${dataGlobal?.logo}` : strings.appLogo
                  }
                  alt="Logo"
                  width={360}
                  height={360}
                  className="w-full max-w-52 h-full max-h-52"
                />
              </>
            )}
            {hakAksesPTarifDenda.update == true && (
              <EvoButton
                buttonText="Ganti Logo"
                className="!w-fit px-4 py-3 mt-4"
                icon=<RiUpload2Line />
                onClick={() => handleFormUploadLogo()}
              />
            )}
          </div>

          {/* <div className="flex flex-col w-full">
            <div className="text-title_large text-primary mb-8">Lokasi</div>
            {hakAksesPTarifDenda.read == true && (
              <>
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
              </>
            )}
            {hakAksesPTarifDenda.update == true && (
              <EvoButton
                buttonText="Ubah Data Lokasi"
                className="!w-fit px-4 py-3"
                onClick={() => handleEditLokasi(dataGlobal.id)}
              />
            )}
          </div> */}
        </div>
        <div className="hidden">
          {hakAksesPTarifDenda.read == true && (
            <EvoTable
              id="tableToPrint"
              tableData={tableDataGlobal}
              rows={rows}
            />
          )}
        </div>
      </EvoCardSection>
    </>
  );
}
