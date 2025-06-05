'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
            {data.nomorTiket}
          </h3>
          <div className="flex gap-3">
            <div className="text-black/80">{data.nomorPolisi}</div>
            <span>-</span>
            <div className="text-black">{data.jenisKendaraan}</div>
          </div>
        </div>
        <span className="text-placeholderIcon">{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* Tampilkan Detail saat diklik */}
      {isOpen && (
        <div className="mt-4 border-t pt-3 space-y-2">
          {data.foto && (
            <Image
              src={data.foto}
              alt="Foto Kendaraan"
              className="w-full object-cover rounded-md mb-3"
            />
          )}
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Waktu Masuk:</div>
            <div>{data.waktuMasuk}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Waktu Keluar:</div>
            <div>{data.waktuKeluar}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Gerbang Masuk:</div>
            <div>{data.gerbangMasuk}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Gerbang Keluar:</div>
            <div>{data.gerbangKeluar}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Durasi Parkir:</div>
            <div>{data.durasiParkir}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Denda:</div>{' '}
            <div>{data.denda}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Total Pembayaran:</div>
            <div>{data.totalPembayaran}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Status:</div>
            <div>{data.status ? 'Aktif' : 'Dibatalkan'}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Tipe:</div>{' '}
            <div>{data.tipe}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Pembayaran:</div>
            <div>{data.pembayaran}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Petugas:</div>{' '}
            <div>{data.petugas}</div>
          </div>
          <div className="flex gap-3 border-t-2 py-2">
            <div className="w-[164px] text-black/[0.72]">Shift:</div>{' '}
            <div>{data.shift}</div>
          </div>
        </div>
      )}
    </div>
  );
}
