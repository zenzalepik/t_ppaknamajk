'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // <== Tambahkan ini
import { AnimatePresence, motion } from 'framer-motion';
import { RiUser3Line, RiArrowDownSLine } from '@remixicon/react';
import strings from '@/utils/strings';
import { useSidebar } from '@/contexts/SidebarContext';
import routes from '@/utils/routes';
import EvoButton from '@/components/evosist_elements/EvoButton';
import colors from '@/utils/colors';
import { fetchApiProfil } from '@/app/profil/api/fetchApiProfil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { removeAuthData } from '@/utils/db'; // Impor fungsi hapus token dari IndexedDB

export default function Header({ isScrolled, title = '' }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isCollapsed } = useSidebar();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // MODAL STATE

  const {
    data: profil,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['profil'],
    queryFn: fetchApiProfil,
    // retry: false,
  });

  const handleProfileClick = () => {
    router.push(routes.profil);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // TAMPILKAN MODAL
    setOpen(false); // Tutup dropdown
    // router.push(routes.login);
  };

  const confirmLogout = async () => {
    // await removeToken(); // Hapus token dari IndexedDB
    // await removeUserId();
    await removeAuthData();
    setShowLogoutModal(false);
    router.push(routes.login);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div
        className={`flex justify-between items-center px-6 py-2 fixed right-0 left-12 ${
          isCollapsed ? 'md:left-14' : 'md:left-56'
        } transition-all duration-300 z-50 ${
          isScrolled ? 'bg-white shadow-header' : 'bg-transparent'
        }`}
      >
        <h1 className="text-title_large uppercase">{title}</h1>
        <div className="flex items-center space-x-4">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 border border-primary rounded-[16px] px-2 py-1.5 cursor-pointer select-none"
          >
            <div className="flex justify-center items-center w-6 h-6 border border-border rounded-[8px]">
              <RiUser3Line size={14} />
            </div>
            <span className="text-label_medium_semibold">
              {profil?.[0]?.nama||strings.userName}
            </span>
            <RiArrowDownSLine
              size={14}
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute right-6 top-14 w-40 bg-white text-black rounded-md shadow-item_dropdown overflow-hidden z-10"
              >
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  Profile
                </button>
                <div className="mx-4 h-px bg-gray-200" />
                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-[40px] shadow-lg w-[360px]">
            <h2 className="text-title_small mb-2 text-center uppercase">
              Konfirmasi Logout
            </h2>
            <p className="text-center text-article text-black/[0.64] mb-6">
              Apakah Anda yakin ingin keluar?
            </p>
            <div className="flex justify-center gap-4">
              <EvoButton
                buttonText="Ya, Logout"
                onClick={confirmLogout}
                size="large"
                outlined={true}
                borderColor="#EF4444"
              />
              <EvoButton
                buttonText="Batal"
                onClick={cancelLogout}
                fillColor={colors.black}
                size="large"
                className="!px-16"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
