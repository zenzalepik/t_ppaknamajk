'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {StatusLabel} from '@/components/StatusLabel';
import EvoEmpty  from'@/components/EvoEmpty';

export default function CollapseDetilTransaksi({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 border-2 border-primary rounded-[24px] shadow-cardInfo bg-white ">
      {/* Kartu dengan Data Utama */}
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-2 ">
          <h3 className="text-title_small font-bold text-black">
            {data.no_tiket || '-'}
          </h3>
          <div className="flex gap-3">
            <div className="text-black/80">{data.nomor_polisi || '-'}</div>
            <span>-</span>
            <div className="text-black">
              {data.kendaraan?.nama_kendaraan || '-'}
            </div>
          </div>
        </div>
        <span className="text-placeholderIcon">{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* Tampilkan Detail saat diklik */}
      {isOpen && (
        <div className="mt-4 border-t pt-3 space-y-2">
          {data.foto && (
            <Image
              src={data.foto || '/images/png/logo.png'}
              alt="Foto Kendaraan"
              className="w-full object-cover rounded-md mb-3"
              width="640"
              height="640"
            />
          )}
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Waktu Masuk:</div>
            <div>{data.tanggal_masuk || '-'}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Waktu Keluar:</div>
            <div>{data.tanggal_keluar || '-'}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Gerbang Masuk:</div>
            <div>{data.pintu_masuk?.keterangan || ''}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Gerbang Keluar:</div>
            <div>{data.pintu_keluar?.keterangan || '-'}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Durasi Parkir:</div>
            <div>{data.interval || '-'}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Biaya Parkir:</div>
            <div>{data.biaya_parkir||'-'}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Denda:</div>{' '}
            <div>
              {data.jumlah_denda_stnk || data.jumlah_denda_tiket ? (
                `Rp ${(
                  data.jumlah_denda_stnk + data.jumlah_denda_tiket
                ).toLocaleString()}`
              ) : (
                <i>-</i>
              )}
            </div>
          </div>
          {/* <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Total Pembayaran:</div>
            <div>{data.biaya_parkir}</div>
          </div> */}
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Status:</div>
            <div>{data.is_active != null ? (
                          StatusLabel.status(data.is_active)
                        ) : (
                          <EvoEmpty />
                        )}</div>
          </div>
          {/* <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Tipe:</div>{' '}
            <div>{data.tipe}</div>
          </div> */}
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Pembayaran:</div>
            <div>{data.jenis_pembayaran && data.jenis_pembayaran.jenis_payment ? (
                          data.jenis_pembayaran.jenis_payment
                        ) : (
                          <EvoEmpty />
                        )}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Petugas:</div>{' '}
            <div>{data.petugas?.nama||'-'}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Shift:</div>{' '}
            <div>{data.shift?.nama_shift||'-'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
