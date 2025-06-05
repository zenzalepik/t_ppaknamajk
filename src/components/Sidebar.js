'use client';

import React, { useEffect, useState } from 'react';
import ButtonSidebar from '@/components/ButtonSidebar';
import {
  RiDashboard3Line,
  RiFoldersLine,
  RiFileList3Line,
  RiSettingsLine,
  RiArrowLeftSLine,
  RiMenuLine,
  RiCustomerService2Line,
} from '@remixicon/react';
import routes from '@/utils/routes';
import { useRouter, usePathname } from 'next/navigation';
import strings from '@/utils/strings';
import { useSidebar } from '@/contexts/SidebarContext';
import Image from 'next/image';

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname(); // URL aktif saat ini

  const menuItems = [
    {
      label: 'Dashboard',
      icon: RiDashboard3Line,
      active: true,
      href: routes.dashboard,
    },
    {
      label: 'Master Data',
      icon: RiFoldersLine,
      dropdownItems: [
        { label: 'Perusahaan', href: routes.masterData.perusahaan },
        { label: 'Level Pengguna', href: routes.masterData.levelPengguna },
        { label: 'Data Pengguna', href: routes.masterData.dataPengguna },
        { label: 'Pos (In/Out)', href: routes.masterData.pos },
        { label: 'Data Kendaraan', href: routes.masterData.dataKendaraan },
        { label: 'Produk Member', href: routes.masterData.produkMember },
        { label: 'Data Member', href: routes.masterData.dataMember },
        { label: 'Produk Voucher', href: routes.masterData.produkVoucher },
        { label: 'Data Voucher', href: routes.masterData.dataVoucher },
        { label: 'Shift', href: routes.masterData.shift },
      ],
    },
    {
      label: 'Laporan Data',
      icon: RiFoldersLine,
      dropdownItems: [
        { label: 'Kendaraan', href: routes.laporanData.kendaraan },
        {
          label: 'Pendapatan Parkir',
          href: routes.laporanData.pendapatanParkir,
        },
        { label: 'Over Night', href: routes.laporanData.overNight },
        {
          label: 'Transaksi Batal',
          href: routes.laporanData.transaksiBatal,
        },
        { label: 'Audit Transaksi', href: routes.laporanData.auditTransaksi },
        {
          label: 'Settlement Cashless',
          href: routes.laporanData.settlementCashless,
        },
      ],
    },
    {
      label: 'Transaksi',
      icon: RiFileList3Line,
      dropdownItems: [
        { label: 'Tambah Transaksi', href: routes.transaksi.tambahTransaksi },
        { label: 'Riwayat Transaksi', href: routes.transaksi.riwayatTransaksi },
      ],
    },
    {
      label: 'Pengaturan',
      icon: RiSettingsLine,
      dropdownItems: [
        { label: 'Tarif Parkir', href: routes.pengaturan.tarifParkir },
        { label: 'Tarif Denda', href: routes.pengaturan.tarifDenda },
        { label: 'Pembayaran', href: routes.pengaturan.pembayaran },
        { label: 'Parameter', href: routes.pengaturan.parameter },
        { label: 'Global', href: routes.pengaturan.global },
      ],
    },
    {
      label: 'Bantuan',
      icon: RiCustomerService2Line,
      dropdownItems: [{ label: 'Tiket', href: routes.bantuan.tiket }],
    },
  ];

  const handleItemClick = (item) => {
    if (item.href) {
      router.push(item.href);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    // <div className="evo_sidebar max-h-full overflow-auto bg-gradient-to-tr from-[#23364F] via-black via-black via-black via-black to-black text-white !w-56 h-screen flex flex-col justify-between">
    <div
      className={`evo_sidebar flex-shrink-0 max-h-full overflow-auto bg-gradient-to-tr from-[#23364F] via-black via-black via-black via-black to-black text-white ${
        isCollapsed
          ? 'evo_sidebar_collapsed w-14 max-w-14 items-center'
          : '!w-56'
      } h-screen flex flex-col justify-between transition-all duration-300 ease-in-out `}
    >
      <div className="p-3">
        <div className="flex items-center mb-8">
          <div className={`${isCollapsed ? 'p-0' : 'p-2'}`}>
            <div className="overflow-hidden rounded-xl bg-white p-0.5">
              <Image src={strings.appLogo} alt="Logo" width={32} height={32} className="w-8 h-8" />
            </div>
          </div>
          {!isCollapsed && (
            <h1 className="text-input_placeholder font-bold text-primary uppercase">
              {strings.appName}
            </h1>
          )}
        </div>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            // <ButtonSidebar
            //   key={index}
            //   icon={item.icon}
            //   active={item.active}
            //   dropdownItems={item.dropdownItems?.map((subItem) => ({
            //     ...subItem,
            //     onClick: () => handleItemClick(subItem),
            //   }))}
            //   onClick={() => handleItemClick(item)}
            // >
            //   {item.label}
            // </ButtonSidebar>
            <ButtonSidebar
              key={index}
              icon={item.icon}
              active={
                item.href === pathname || // menu langsung
                item.dropdownItems?.some((subItem) => subItem.href === pathname) // submenu aktif
              }
              dropdownItems={item.dropdownItems?.map((subItem) => ({
                ...subItem,
                onClick: () => handleItemClick(subItem),
                active: subItem.href === pathname, // kita tandai active untuk submenu
              }))}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </ButtonSidebar>
          ))}
        </nav>
      </div>
      <div className="evo_sidebar_menu_arrow_dropdown flex gap-3 p-4 text-label_small_reguler text-white opacity-40">
        <button
          onClick={toggleSidebar}
          className="border border-border/[0.64] rounded-[12px] p-2"
        >
          {isCollapsed ? (
            <RiMenuLine className="w-5 h-5" />
          ) : (
            <RiArrowLeftSLine className="w-5 h-5" />
          )}
        </button>

        {!isCollapsed && strings.copyRight}
      </div>
    </div>
  );
}
