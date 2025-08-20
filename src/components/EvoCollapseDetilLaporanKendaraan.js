'use client';

import React, { useState } from 'react';

export default function EvoCollapseDetilLaporanKendaraan({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!data) return <p className="text-red-500">Data tidak tersedia</p>; // Tambahkan kondisi untuk menghindari error
  return (
    <div className="w-full p-4 border-2 border-primary rounded-[24px] shadow-cardInfo bg-white">
      {/* Kartu dengan Data Utama */}
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-title_small font-bold text-black">
            {data.noTiket || 'No Tiket Tidak Ada'}
          </h3>
          <div className="flex gap-3">
            <div className="text-black/80">
              {data.nopol || 'Nopol Tidak Ada'}
            </div>
            <span>-</span>
            <div className="text-black">
              {data.kendaraan || 'Jenis Kendaraan Tidak Ada'}
            </div>
          </div>
        </div>
        <span className="text-placeholderIcon">{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* Tampilkan Detail saat diklik */}
      {isOpen && (
        <div className="mt-6 border-t border-black/0 pt-3 space-y-2">
          <div className="my-3  text-primary"><b>Detail:</b></div>
          {/* {data.foto && (
            <img src={data.foto} alt="Foto Kendaraan" className="w-full object-cover rounded-md mb-3" />
          )} */}

          {Object.entries(data).map(([label, value], index) => (
            <div key={index} className="flex gap-3 border-t-2 py-2">
              <div className="w-[164px] text-black/[0.72]">
                {label
                  .replace(/([A-Z])/g, ' $1')
                  .trim()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                :
              </div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
