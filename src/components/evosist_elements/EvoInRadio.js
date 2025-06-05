'use client';

import React, { useState, useEffect } from 'react';
import { RiCircleLine, RiRadioButtonLine } from '@remixicon/react'; // Import ikon Remixicon

const EvoInRadio = ({
  name='',
  label,
  placeholder,
  className,
  value,
  items,
  defaultValue,
  onChange,
  direction = 'horizontal',
  error
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  // useEffect(() => {
  //   setSelectedValue(value); // Sinkronisasi state dengan value dari prop
  // }, [value]);
  useEffect(() => {
  if (value && value !== selectedValue) {
    setSelectedValue(value);
  }
}, [value, selectedValue]);


  const handleSelect = (value) => {
    setSelectedValue(value);
    onChange?.(value); // Memanggil callback ketika nilai berubah
  };

  // Menentukan kelas Tailwind berdasarkan arah
  const layoutClass = direction === 'vertical' ? 'flex-col' : 'flex-row';

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label &&<label className="text-card mb-1">{label}</label>}
      <div className={`evo-in-radio flex gap-3 ${layoutClass}`}>
        {items.map((item, index) => (
          <label
            key={index}
            className="radio-item flex items-center gap-1 cursor-pointer !m-0"
          >
            {/* Radio Button Input Form */}
            <input
              type="radio"
              name={name} // Nama grup radio button
              value={item.value}
              checked={selectedValue === item.value}
              onChange={() => handleSelect(item.value)} // Handle select event
              className="hidden" // Menyembunyikan elemen input asli
            />

            {/* Ikon radio button */}
            <div className="flex items-center justify-center">
              {selectedValue === item.value ? (
                <RiRadioButtonLine size={20} className="text-primary" /> // Ikon terpilih
              ) : (
                <RiCircleLine size={20} className="text-gray-500" /> // Ikon tidak terpilih
              )}
            </div>

            {/* Label */}
            <span
              onClick={() => handleSelect(item.value)} // Handle klik untuk memilih
              className="text-input_checkbox text-black/[0.64]"
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
       {/* Penanganan error */}
       {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EvoInRadio;
