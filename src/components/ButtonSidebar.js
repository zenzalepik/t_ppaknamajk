'use client';

import React, { useEffect, useState } from 'react';
import DropdownSidebar from '@/components/DropdownSidebar';

export default function ButtonSidebar({
   label='',
  icon: Icon,
  children,
  active,
  onClick,
  dropdownItems = [],
}) {
  const [open, setOpen] = useState(false);

  const hasDropdown = dropdownItems.length > 0;
  const dropdownKey = `dropdown-${children}-${label}`; // Unik per label

  // Load status dari localStorage
  useEffect(() => {
    if (hasDropdown) {
      const savedOpen = localStorage.getItem(dropdownKey);
      if (savedOpen === 'true') {
        setOpen(true);
      }
    }
  }, [dropdownKey, hasDropdown]);

  // Simpan ke localStorage saat berubah
  useEffect(() => {
    if (hasDropdown) {
      localStorage.setItem(dropdownKey, open);
    }
  }, [open, dropdownKey, hasDropdown]);

  return (
    <div className="relative">
      <button
        // className={`evo_sidebar_menu_button flex items-center justify-between gap-2 p-2 rounded-xl text-card text-left w-full transition-colors duration-300 ease-in-out border hover:text-white ${
        //   active
        //     ? 'bg-primary border-transparent text-white'
        //     : 'hover:bg-primary border-primary text-primary'
        // }`}
        className={`evo_sidebar_menu_button flex items-center justify-between gap-2 p-2 rounded-xl text-card text-left w-full transition-colors duration-300 ease-in-out border ${
          open
            ? 'bg-primary border-transparent text-white'
            : active
            ? 'bg-primary border-transparent text-white'
            : 'hover:bg-primary border-primary text-primary hover:text-white'
        }`}
        onClick={(e) => {
          if (hasDropdown) {
            e.preventDefault();
            setOpen(!open);
          }
          if (onClick && !hasDropdown) {
            onClick(e);
          }
        }}
      >
        <div className=" w-full flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          <span className="evo_sidebar_menu_text">{children}</span>
        </div>
        {hasDropdown && (
          <svg
            className={`evo_sidebar_menu_arrow_dropdown w-4 h-4 transform transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {/* Panggil DropdownSidebar dengan animasi */}
      {hasDropdown && <DropdownSidebar items={dropdownItems} isOpen={open} />}
    </div>
  );
}
