import React from 'react';
import { RiCoupon2Fill, RiCalendarEventFill } from '@remixicon/react';

const EvoTicketVoucher = ({ voucher }) => {
  if (!voucher) return null;

  return (
    <div className="relative flex flex-row items-center bg-white border-2 border-primary/40 rounded-[12px] shadow-lg overflow-hidden px-1">
      {/* Efek border putus-putus vertikal */}
      <div className="absolute inset-y-0 top-0 bottom-0 left-0 m-auto w-[20px] h-[20px] bg-primary rounded-r-full" />
      <div className="absolute inset-y-0 top-0 bottom-0 right-0 m-auto w-[20px] h-[20px] bg-primary rounded-l-full" />
      <div className="absolute inset-y-0 left-0 w-[12px] bg-primary rounded-l-full" />
      <div className="absolute inset-y-0 right-0 w-[12px] bg-primary rounded-r-full" />

      {/* Bagian kiri: Detail Voucher */}
      <div className="relative min-h-full max-w-[180px] flex flex-col items-center justify-center p-6 ">
        <div className="text-black/[0.64] uppercase text-xs">Nama Voucher</div>
        <div className="text-center text-title_area font-bold tracking-wide uppercase">
          {voucher.namaVoucher}
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
            <RiCalendarEventFill size={18} /> {voucher.periode}
          </div>
        </div>

        <div className="border-t border-dashed border-primary my-2" />

        <div className="text-black/[0.64] text-xs">Tarif:</div>
        <div className="text-title_large text-primary">Rp {voucher.tarif}</div>
        <div className="border-t border-dashed border-primary my-2" />

        <div className="flex justify-between">
          <div className="text-black/[0.64] text-xs mb-0.5">
            Jenis Kendaraan:
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {voucher.kendaraan.map((kendaraan, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-black/10 text-content_reguler rounded-[6px]"
            >
              {kendaraan}
            </span>
          ))}
        </div>

        <div className="border-t border-dashed border-primary my-2" />
        <div className="text-black/[0.64] text-xs">Model Pembayaran:</div>

        <ul className="list-disc pl-5 flex flex-col gap-0">
          {voucher.modelPembayaran.map((modelPembayaran, index) => (
            <li key={index} className="text-content_medium">
              {modelPembayaran}
            </li>
          ))}
        </ul>

        <div className="border-t border-dashed border-primary my-2 h-full" />

        <div className="flex justify-between">
          <div className="text-black/[0.64] text-xs">Verifikasi:</div>
          <div className="text-black/[0.64] text-xs">Status:</div>
        </div>
        <div className="flex justify-between p-1 rounded-[6px]">
          <div className="text-card">{voucher.metodeVerifikasi}</div>
          <div
            className={`text-card p-1 rounded-[6px] ${
              voucher.status === 'Aktif'
                ? 'text-success bg-success/10'
                : 'text-danger bg-danger/10'
            }`}
          >
            {voucher.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvoTicketVoucher;
