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
import { usePengaturanGlobalFromLocal } from '@/app/pengaturan/global/hooks/usePengaturanGlobalFromLocal';
import { useSyncPengaturanGlobal } from '@/app/pengaturan/global/hooks/useSyncPengaturanGlobal';
import {
  simpanLevelPengguna,
  ambilLevelPengguna,
} from '@/utils/levelPenggunaStorage';
import { fetchApiMasterDataLevelPengguna } from '@/app/master_data/level_pengguna/api/fetchApiMasterDataLevelPengguna';
import { useQuery } from '@tanstack/react-query';
import { simpanDataProfil, ambilDataProfil } from '@/utils/profilStorage';
import { fetchApiProfil } from '@/app/profil/api/fetchApiProfil';

export default function Sidebar() {
  useSyncPengaturanGlobal();
  const dataGlobal = usePengaturanGlobalFromLocal()?.data?.[0];
  const [dataProfilLocal, setDataProfilLocal] = useState(null);
  const [dataLevelSidebar, setDataLevelSidebar] = useState([]);
  const [isElectron, setIsElectron] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      setIsElectron(true);
    }
  }, []);

  const { data: masterDataLevelPengguna } = useQuery({
    queryKey: ['masterDataLevelPenggunaSidebar'],
    queryFn: () =>
      fetchApiMasterDataLevelPengguna({
        limit: 100,
        page: 1,
        offset: 0,
        sortBy: 'id',
        sortOrder: 'desc',
      }),
    refetchInterval: 1000 * 60 * 30,
  });

  const {
    data: profil,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['profil'],
    queryFn: fetchApiProfil,
    refetchInterval: 1000 * 60 * 30, // ⏱️ tiap 30 menit
  });

  const dataProfil = Array.isArray(dataProfilLocal)
    ? dataProfilLocal[0]
    : dataProfilLocal || {};

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

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(window.innerHeight === screen.height);
    };

    checkFullscreen(); // check on mount
    window.addEventListener('resize', checkFullscreen);

    return () => window.removeEventListener('resize', checkFullscreen);
  }, []);

  useEffect(() => {
    const prosesDataBerantai = async () => {
      if (!profil) return;

      // Simpan profil dari API ke IndexedDB
      await simpanDataProfil(profil);

      // Ambil kembali dari IndexedDB
      const dataProfil = await ambilDataProfil();
      setDataProfilLocal(dataProfil);

      // Jika level pengguna tersedia dan master data juga sudah siap
      if (
        dataProfil[0]?.level_pengguna_id &&
        masterDataLevelPengguna?.data?.length
      ) {
        const levelSesuai = masterDataLevelPengguna.data.filter(
          (lvl) => lvl.id === dataProfil[0]?.level_pengguna_id
        );

        await simpanLevelPengguna(levelSesuai);
        setDataLevelSidebar(levelSesuai);
      }
    };

    prosesDataBerantai();
  }, [profil, masterDataLevelPengguna]);

  // console.log('dataProfil.level_pengguna_id', dataProfil[0]);

  return (
    // <div className="evo_sidebar max-h-full overflow-auto bg-gradient-to-tr from-[#23364F] via-black via-black via-black via-black to-black text-white !w-56 h-screen flex flex-col justify-between">
    // <div
    //   className={`evo_sidebar flex-shrink-0 ${
    //     isElectron ? 'max-h-[calc(100vh-38px)] ' : 'max-h-full '
    //   } overflow-auto bg-gradient-to-tr from-[#23364F] via-black via-black via-black via-black to-black text-white ${
    //     isCollapsed
    //       ? 'evo_sidebar_collapsed w-14 max-w-14 items-center'
    //       : '!w-56'
    //   } h-screen flex flex-col justify-between transition-all duration-300 ease-in-out `}
    // >
    <div
      className={`evo_sidebar flex-shrink-0 ${   isFullscreen?'max-h-screen ':
        isElectron ? 'max-h-[calc(100vh-38px)] ' : 'max-h-full '
      } overflow-auto bg-gradient-to-tr from-[#23364F] via-black via-black via-black via-black to-black text-white ${
        isCollapsed
          ? 'evo_sidebar_collapsed w-14 max-w-14 items-center'
          : '!w-56'
      } h-screen flex flex-col justify-between transition-all duration-300 ease-in-out `}
    >
      <div className="p-3">
        <div className="flex items-center mb-8">
          <div className={`${isCollapsed ? 'p-0' : 'p-2'}`}>
            <div className="overflow-hidden rounded-xl bg-white p-0.5">
              <Image
                src={strings.appLogo}
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
          </div>
          {!isCollapsed && (
            <h1 className="text-input_placeholder font-bold text-primary uppercase">
              {dataGlobal?.nama_operator || strings.appName}
            </h1>
          )}
        </div>
        {/* {dataLevelSidebar.map((item) => (
          <div key={item.id} className="text-white">
            {item.nama} – hak akses: {item.hak_akses?.length || 0}
          </div>
        ))} */}
        {/* {JSON.stringify(dataLevelSidebar)} */}
        {/* ============================ */}
        {/* <br />
        {Object.entries(dataProfil).map(([key, value]) => (
          <div key={key} className="text-white">
            <strong>{key}</strong>:{' '}
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </div>
        ))}
        <br />
        ========================================== */}
        <nav className="flex flex-col space-y-2">
          {menuItems
            .filter((item) => {
              const aksesMenu = dataLevelSidebar?.[0]?.hak_akses?.find(
                (akses) => akses.nama_menu === item.label
              );

              if (!aksesMenu) return false;

              // Jika ada aksi langsung di menu utama
              if (
                aksesMenu.aksi &&
                Object.values(aksesMenu.aksi).some((val) => val === true)
              ) {
                return true;
              }

              // Jika punya submenu dengan setidaknya satu aksi true
              if (item.dropdownItems && aksesMenu.nama_sub_menu) {
                return aksesMenu.nama_sub_menu.some(
                  (sub) =>
                    sub.aksi &&
                    Object.values(sub.aksi).some((val) => val === true)
                );
              }

              return false;
            })
            .map((item, index) => {
              const aksesMenu = dataLevelSidebar?.[0]?.hak_akses?.find(
                (akses) => akses.nama_menu === item.label
              );

              const dropdownItems =
                item.dropdownItems && aksesMenu?.nama_sub_menu
                  ? item.dropdownItems.filter((sub) =>
                      aksesMenu.nama_sub_menu.some(
                        (subHak) =>
                          subHak.nama === sub.label &&
                          subHak.aksi &&
                          Object.values(subHak.aksi).some((val) => val === true)
                      )
                    )
                  : undefined;

              return (
                <ButtonSidebar
                  label={item.label}
                  key={index + '-' + item.label}
                  icon={item.icon}
                  active={
                    item.href === pathname ||
                    dropdownItems?.some((subItem) => subItem.href === pathname)
                  }
                  dropdownItems={dropdownItems?.map((subItem) => ({
                    ...subItem,
                    onClick: () => handleItemClick(subItem),
                    active: subItem.href === pathname,
                  }))}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </ButtonSidebar>
              );
            })}
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
