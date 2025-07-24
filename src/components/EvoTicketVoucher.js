'use client';

import React, { useEffect, useState } from 'react';
import { RiCoupon2Fill, RiCalendarEventFill } from '@remixicon/react';
import { fetchApiMasterDataDataKendaraan } from '@/app/master_data/data_kendaraan/api/fetchApiMasterDataDataKendaraan';
import { fetchApiPengaturanParameterTipeKendaraan } from '@/app/pengaturan/parameter/api/items/fetchApiPengaturanParameterTipeKendaraan';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import { getErrorMessage } from '@/utils/errorHandler';
import EvoErrorDiv from '@/components/EvoErrorDiv';
import { getUserId } from '@/utils/db';
import EvoNotifCard from '@/components/EvoNotifCard';

const EvoTicketVoucher = ({ voucher, onSendListIdKendaraan }) => {
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
    enabled: !!voucher, // ✅ aman dan eksplisit
  });

  const {
    data: dataTipeKendaraan,
    error: errorTipeKendaraan,
    isLoading: isLoadingTipeKendaraan,
  } = useQuery({
    queryKey: ['pengaturanTipeKendaraan'],
    queryFn: () => fetchApiPengaturanParameterTipeKendaraan(),
    enabled: !!voucher, // ✅ aman dan eksplisit
  });

  if (!voucher) return null;

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
  //     if (voucher?.list_id_kendaraan && onSendListIdKendaraan) {
  //       onSendListIdKendaraan(voucher.list_id_kendaraan);
  //     }
  //   }, [voucher, onSendListIdKendaraan]);

  return (
    <div className="relative flex flex-row items-center bg-white border-2 border-primary/40 rounded-[12px] shadow-lg overflow-hidden px-1">
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
      <div className="absolute inset-y-0 left-0 w-[12px] bg-primary rounded-l-full" />
      <div className="absolute inset-y-0 right-0 w-[12px] bg-primary rounded-r-full" />

      {/* Bagian kiri: Detail Voucher */}
      <div className="relative min-h-full max-w-[180px] flex flex-col items-center justify-center p-6 ">
        <div className="text-black/[0.64] uppercase text-xs">Nama Voucher</div>
        <div className="text-center text-title_area font-bold tracking-wide uppercase">
          {voucher.nama}
        </div>
        <div className="mt-2 w-16 h-16 bg-black rounded-full flex items-center justify-center text-primary text-title_small">
          <RiCoupon2Fill size={28} />
        </div>
      </div>

      {/* Bagian kanan: Detail Produk */}
      <div className="flex flex-col flex-1 py-4 px-5 border-l-2 border-dashed border-primary">
        <div className="flex justify-between">
          <div className="text-black/[0.64] text-xs">Periode:</div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-input_checkbox_checked">
            {Array.isArray(voucher.periode) && voucher.periode.length >= 2 ? (
              <>
                <RiCalendarEventFill size={18} />
                {voucher.periode[0]?.value || '-'} s/d{' '}
                {voucher.periode[1]?.value || '-'}
              </>
            ) : (
              '-'
            )}
          </div>
        </div>

        <div className="border-t border-dashed border-primary my-2" />

        <div className="text-black/[0.64] text-xs">Tarif:</div>
        <div className="text-title_large text-primary">
          Rp{' '}
          {voucher.tarif
            ? new Intl.NumberFormat('id-ID').format(voucher.tarif)
            : '-'}
        </div>
        <div className="border-t border-dashed border-primary my-2" />

        <div className="flex justify-between">
          <div className="text-black/[0.64] text-xs mb-0.5">
            Kendaraan:
            {/* Jenis Kendaraan: */}
          </div>
        </div>
        {/* <div className="flex flex-wrap gap-1">
          {voucher.list_id_kendaraan.map((list_id_kendaraan, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-black/10 text-content_reguler rounded-[6px]"
            >
              {list_id_kendaraan}
            </span>
          ))}
        </div> */}

        <div className="flex flex-wrap gap-1">
          <ul className="list-disc pl-4">
            {voucher.list_id_kendaraan.map((id, index) => {
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
          </ul>
        </div>

        <div className="border-t border-dashed border-primary my-2" />
        <div className="text-black/[0.64] text-xs">Model Pembayaran:</div>

        <ul className="flex flex-col gap-0 text-content_medium">
          {voucher.model_pembayaran || '-'}
        </ul>
        {/* <ul className="list-disc pl-5 flex flex-col gap-0">
          {voucher.modelPembayaran.map((modelPembayaran, index) => (
            <li key={index} className="text-content_medium">
              {modelPembayaran}
            </li>
          ))}
        </ul> */}

        <div className="border-t border-dashed border-primary my-2 h-full" />

        <div className="flex justify-between">
          <div className="text-black/[0.64] text-xs">Verifikasi:</div>
          <div className="text-black/[0.64] text-xs">Status:</div>
        </div>
        <div className="flex justify-between p-1 rounded-[6px]">
          <div className="text-card">{voucher.metode_verifikasi || '-'}</div>
          <div
            className={`text-card p-1 rounded-[6px] ${
              voucher.status == true
                ? 'text-success bg-success/10'
                : 'text-danger bg-danger/10'
            }`}
          >
            {voucher.status ? 'Aktif' : 'Tidak Aktif'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvoTicketVoucher;
