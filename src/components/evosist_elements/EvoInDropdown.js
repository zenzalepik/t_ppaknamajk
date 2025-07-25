'use client';

import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine } from '@remixicon/react';

const EvoInDropdown = ({
  label,
  options,
  value,
  onChange,
  error,
  name,
  placeholder,
  className = '',
}) => {
  const [selectedValue, setSelectedValue] = useState(value || '');

  // Sinkronisasi perubahan dari parent
  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  // const handleChange = (e) => {
  //   const val = e.target.value;
  //   setSelectedValue(val);
  //   onChange?.(e); // tetap lempar ke parent untuk update state utama
  // };
  const handleChange = (e) => {
    const val = e.target.value;
    setSelectedValue(val);
    onChange?.(val); // ⬅️ Ubah dari onChange?.(e) jadi onChange?.(val)
  };

  return (
    <div className={`flex flex-col relative ${className}`}>
      <label className="text-card mb-1">{label}</label>
      <div className="flex w-full relative">
        {/* Ikon Hati */}
        <div className="flex justify-center items-center z-10 absolute right-1 top-0 bottom-0 m-auto h-6 px-1 text-black/50 bg-white">
          <RiArrowDownSLine />
        </div>
        <select
          name={name}
          // value={value}

          value={selectedValue}
          // onChange={onChange}
          onChange={handleChange}
          className={`border rounded-[16px] px-4 py-3 focus:outline-none focus:ring-2 w-full ${
            error
              ? 'border-danger focus:ring-danger'
              : 'border-black/40 focus:ring-primary'
            // } ${!value ? 'text-black/50' : ''}`}
          } ${!selectedValue ? 'text-black/50' : ''}`}
        >
          {/* Jika ada placeholder, render option pertama sebagai placeholder */}
          {placeholder && (
            <option value="" disabled className="text-black/50">
              {placeholder}
            </option>
          )}

          {/* Render Options */}
          {options.map((option, index) => (
            <option key={index} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EvoInDropdown;
