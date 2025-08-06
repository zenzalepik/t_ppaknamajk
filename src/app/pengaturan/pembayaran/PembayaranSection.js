'use client';

import React, { useEffect, useState } from 'react';
import EvoTitleSection from '@/components/EvoTitleSection';
import EvoCardSection from '@/components/evosist_elements/EvoCardSection';
import { RiAddLargeLine, RiWallet3Line } from '@remixicon/react';
import { exportExcel } from '@/helpers/exportExcel';
import { exportPDF } from '@/helpers/exportPDF';
import { exportPrint } from '@/helpers/exportPrint';
import EvoCardSettingPayment from '@/components/EvoCardSettingPayment';
import { fetchApiPengaturanPembayaran } from './api/fetchApiPengaturanPembayaran';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import { useHookStatusPengaturanPembayaran } from './hooks/useHookStatusPengaturanPembayaran';
import EvoNotifCard from '@/components/EvoNotifCard';
import { ambilLevelPengguna } from '@/utils/levelPenggunaStorage';
import strings from '@/utils/strings';
import EvoTable from '@/components/evosist_elements/EvoTable';
import {StatusLabel} from '@/components/StatusLabel';
import {tableDataPembayaran} from './tableDataPembayaran';

const titleSection = 'Pembayaran';

const paymentTypes = strings.options.paymentTypes;

export default function PembayaranSection() {
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const { toggleStatus, notif, setNotif } = useHookStatusPengaturanPembayaran();

  const [dataHakAkses, setDataLevelSidebar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ambilLevelPengguna();
      setDataLevelSidebar(data);
    };
    fetchData();
  }, []);

  const hakAksesPPengaturan =
    dataHakAkses?.[0]?.hak_akses
      ?.find((akses) => akses.nama_menu === 'Pengaturan')
      ?.nama_sub_menu?.find((sub) => sub.nama === 'Pembayaran')?.aksi || {};

  const tidakPunyaAkses = !Object.values(hakAksesPPengaturan).some(
    (v) => v === true
  );

  useEffect(() => {
    if (notif.message) {
      setNotifMessage(notif.message);
      setNotifType(notif.type);
    }
  }, [notif]);

  const {
    data: pengaturanPembayaran,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pengaturanPembayaran'],
    queryFn: () =>
      fetchApiPengaturanPembayaran({
        limit: 905,
      }),
    // retry: false,
  });

  const handleTurnOff = (paymentType, id) => {
    console.log(`Menonaktifkan ${paymentType} ${id}`);
    toggleStatus(id, false, paymentType);
  };

  const handleCancelTurnOff = () => {
    setConfirmDeleteId(null);
  };

  const handleTurnOn = (paymentType, id) => {
    console.log(`Tombol Aktifkan ditekan ${paymentType} ${id}`);
    toggleStatus(id, true, paymentType);
  };

  const handleSubmitEWallet = (data) => {
    console.log('Data E-Wallet baru:', data);
    // Kirim ke API atau setState
  };

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

  const dataPembayaran = pengaturanPembayaran?.data ?? [];

  if (tidakPunyaAkses) {
    return (
      <EvoErrorDiv errorHandlerText="Anda tidak memiliki akses menuju halaman ini" />
    );
  }

  console.log(pengaturanPembayaran);
  
  const rows =
    pengaturanPembayaran?.data?.length > 0
      ? pengaturanPembayaran.data.map((row, index) => ({
          no: index + 1,
          jenis_payment: row.jenis_payment || <i>*empty</i>,
          status: StatusLabel.status(row.status) || <i>*empty</i>,
          createdAt: new Date(row.createdAt).toLocaleString() || <i>*empty</i>,
          updatedAt: new Date(row.createdAt).toLocaleString() || <i>*empty</i>,
        }))
      : [];

  return (
    <>
      {notif.message && (
        <EvoNotifCard
          message={notif.message}
          onClose={() => setNotif({ message: '', type: 'success' })}
          type={notif.type}
          autoClose={true}
        />
      )}
      <EvoCardSection>
        <EvoTitleSection
          title={titleSection}
          icon={<RiAddLargeLine size={16} />}
          onExportPDF={
            hakAksesPPengaturan.read == true
              ? () => exportPDF('tableToPrint', titleSection)
              : null
          }
          onExportExcel={
            hakAksesPPengaturan.read == true
              ? () => exportExcel('tableToPrint', titleSection)
              : null
          }
          onPrint={
            hakAksesPPengaturan.read == true
              ? () => exportPrint('tableToPrint', titleSection)
              : null
          }
        />

        {hakAksesPPengaturan.read == true && (
          <div className="grid grid-cols-2 gap-6">
            {paymentTypes.map((type, index) => {
              const matchedPayment = dataPembayaran.find(
                (p) => p.jenis_payment?.toLowerCase() === type.toLowerCase()
              );
              const isActive = matchedPayment?.status === true;
              const isMatched = !!matchedPayment;

              return (
                <div
                  key={type + '-' + index}
                  // className={isActive ? '' : 'opacity-20 transition-opacity'}
                  className={`${
                    isMatched ? '' : ' opacity-20 transition-opacity '
                  }`}
                >
                  <EvoCardSettingPayment
                    title={type}
                    // updatedBy={matchedPayment?.updated_by ?? '-'}
                    updatedDate={
                      matchedPayment?.updatedAt
                        ? new Date(matchedPayment.updatedAt).toLocaleString()
                        : '-'
                    }
                    isActive={isActive}
                    {...(matchedPayment && {
                      onTurnOff: () => handleTurnOff(type, matchedPayment?.id),
                      onTurnOn: () => handleTurnOn(type, matchedPayment?.id),
                    })}
                    isAvailable={
                      hakAksesPPengaturan.aktif_nonaktif == true &&
                      (isMatched ? true : false)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="hidden">
          {hakAksesPPengaturan.read == true && (
            <EvoTable
              id="tableToPrint"
              tableData={tableDataPembayaran}
              rows={rows}
            />
          )}
        </div>
      </EvoCardSection>
    </>
  );
}
