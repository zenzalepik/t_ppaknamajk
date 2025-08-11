'use client';

import React, { useEffect, useState } from 'react';
import { RiAccountPinBoxFill, RiCalendarEventFill } from '@remixicon/react';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';

const EvoTicketMember = ({
  produkMember,
  onSendListIdKendaraan,
  type = '',
}) => {
  const queryClient = useQueryClient();
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');

  const {
    data: masterDataKendaraan,
    error: errorKendaraan,
    isLoading: loadingKendaraan,
  } = useQuery({
    queryKey: ['masterDataKendaraan'],
    queryFn: fetchApiMasterDataDataKendaraan,
    enabled: !!produkMember, // ✅ hanya fetch kalau produkMember ada
  });

  const {
    data: dataTipeKendaraan,
    error: errorTipeKendaraan,
    isLoading: isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanTipeKendaraan'],
    queryFn: () => fetchApiPengaturanParameterTipeKendaraan(),
    enabled: !!produkMember, // ✅ hanya fetch kalau produkMember ada
  });

  if (!produkMember) return null;
  //   if (!produkMember) {
  //   return (
  //     <div className="text-center text-danger">
  //       Data produk member tidak tersedia.
  //     </div>
  //   );
  // }

  if (loadingKendaraan)
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center text-center text-primary">
        <Spinner size={32} color="border-black" />
        Loading...
      </div>
    );

  if (errorKendaraan) {
    return (
      <EvoErrorDiv errorHandlerText={getErrorMessage(errorKendaraan.message)} />
    );
  }

  const tipeKendaraanMap =
    dataTipeKendaraan?.data?.reduce((acc, tipe) => {
      acc[tipe.id] = tipe.tipe_kendaraan;
      return acc;
    }, {}) || {};

  // useEffect(() => {
  //     if (produkMember?.list_id_kendaraan && onSendListIdKendaraan) {
  //       onSendListIdKendaraan(produkMember.list_id_kendaraan);
  //     }
  //   }, [produkMember, onSendListIdKendaraan]);

  return (
    <div
      className={`${
        type == 'small' ? 'mt-2' : ''
      } items-stretch relative flex flex-row bg-white border-2 border-black rounded-[20px] shadow-lg overflow-hidden px-1`}
    >
      {notifMessage && (
        <EvoNotifCard
          message={notifMessage}
          onClose={() => setNotifMessage('')}
          type={notifType}
          autoClose={true}
        />
      )}

      {/* Efek border putus-putus vertikal */}
      <div className="absolute inset-y-0 top-0 bottom-0 left-0 m-auto w-[20px] h-[20px] bg-primary rounded-r-full" />
      <div className="absolute inset-y-0 top-0 bottom-0 right-0 m-auto w-[20px] h-[20px] bg-primary rounded-l-full" />
      <div className="absolute inset-y-0 left-0 w-[12px] bg-black rounded-l-full" />
      <div className="absolute inset-y-0 right-0 w-[12px] bg-primary rounded-r-full" />

      {/* Bagian kiri: Detail Voucher */}
      <div
        className={`bg-black relative min-h-full ${
          type == 'small'
            ? ' w-full gap-4 flex-row-reverse justify-end'
            : ' justify-center flex-col max-w-[180px]'
        } flex  items-center p-6 `}
      >
        <div className="flex flex-col justify-start">
          <div className="text-white/[0.64] uppercase text-xs">
            {type == 'small' ? 'Nama Produk Member' : 'Nama Produk'}
          </div>
          <div
            className={`text-white ${
              type == 'small' ? 'text-left' : 'text-center'
            } text-title_area font-bold tracking-wide uppercase`}
          >
            {produkMember.nama}
          </div>
        </div>
        <div className="mt-2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-title_small">
          <RiAccountPinBoxFill size={28} />
        </div>
      </div>

      {/* Bagian kanan: Detail Produk */}
      <div
        className={`flex-col flex-1 py-4 px-5 ${
          type == 'small' ? ' hidden' : ' flex'
        }`}
      >
        <div className="flex justify-between">
          <div className="text-black/[0.64] text-xs">Periode:</div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-input_checkbox_checked">
            {Array.isArray(produkMember.periode) &&
            produkMember.periode.length >= 2 ? (
              <>
                <RiCalendarEventFill size={18} />
                {produkMember.periode[0]?.value || '-'} s/d{' '}
                {produkMember.periode[1]?.value || '-'}
              </>
            ) : (
              '-'
            )}
          </div>
        </div>

        <div className="border-t border-dashed border-primary my-2" />

        <div className="text-black/[0.64] text-xs">Tarif:</div>
        <div className="text-title_large text-primary">
          Rp.{' '}
          {produkMember.tarif
            ? new Intl.NumberFormat('id-ID').format(produkMember.tarif)
            : '-'}
        </div>
        <div className="border-t border-dashed border-primary my-2" />

        <div className="flex flex-wrap gap-1">
          <div className="text-black/[0.64] text-xs mb-0.5 w-1/2">
            Kendaraan:
            {/* Jenis Kendaraan: */}
          </div>
          <div className="text-black/[0.64] text-xs mb-0.5">
            Maksimal Kendaraan:
          </div>
        </div>
        {/* <div className="flex flex-wrap gap-1">
          {produkMember.list_id_kendaraan.map((list_id_kendaraan, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-black/10 text-content_reguler rounded-[6px]"
            >
              {list_id_kendaraan}
            </span>
          ))}
        </div> */}

        <div className="flex flex-wrap gap-1">
          <div className="list-disc pl-4 w-1/2">
            {produkMember?.list_id_kendaraan?.map((id, index) => {
              const kendaraan = masterDataKendaraan?.data?.find(
                (k) => k.id.toString() === id
              );
              return (
                <li key={`${id}-${index}`}>
                  {kendaraan
                    ? // ? `${kendaraan.nama_kendaraan} (${kendaraan.tipe_kendaraan})`
                      `${kendaraan.nama_kendaraan} (${
                        kendaraan?.tipe_kendaraan?.tipe_kendaraan || '-'
                      })`
                    : 'Tidak ditemukan'}
                </li>
              );
            })}
          </div>
          <div className="list-disc">
            {produkMember.max_kendaraan || ''} kendaraan
          </div>
        </div>

        <div className="border-t border-dashed border-primary my-2" />
        <div className="flex gap-1">
          <div className="w-full text-black/[0.64] text-xs">Biaya Kartu:</div>
          <div className="w-full text-black/[0.64] text-xs">
            Biaya Ganti Nomor Polisi
          </div>
        </div>

        <div className="flex gap-1">
          <ul className="w-full flex flex-col gap-0 text-content_medium">
            Rp.
            {produkMember.biaya_kartu
              ? new Intl.NumberFormat('id-ID').format(produkMember.biaya_kartu)
              : '-'}
          </ul>
          <ul className="w-full flex flex-col gap-0 text-content_medium">
            Rp.
            {produkMember.biaya_ganti_nopol
              ? new Intl.NumberFormat('id-ID').format(
                  produkMember.biaya_ganti_nopol
                )
              : '-'}
          </ul>
        </div>
        {/* <ul className="list-disc pl-5 flex flex-col gap-0">
          {produkMember.modelPembayaran.map((modelPembayaran, index) => (
            <li key={index} className="text-content_medium">
              {modelPembayaran}
            </li>
          ))}
        </ul> */}

        <div className="border-t border-dashed border-primary my-2 h-full" />

        <div className="flex items-center">
          <div className="w-full text-black/[0.64] text-xs">Status:</div>
          <div className={`w-full`}>
            <div
              className={`max-w-fit text-card p-1 rounded-[6px] ${
                produkMember.status == true
                  ? 'text-success bg-success/10'
                  : 'text-danger bg-danger/10'
              }`}
            >
              {produkMember.status ? 'Aktif' : 'Tidak Aktif'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvoTicketMember;
