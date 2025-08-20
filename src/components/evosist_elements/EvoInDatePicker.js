'use client';

import React, { useEffect , useState, useRef } from 'react';
import { RiCalendarEventLine } from '@remixicon/react';

export default function EvoInDatePicker({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  className = '',
  isWidthFull = false,
  size = '',
}) {
  const inputRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(value || '');

  // Sinkronisasi perubahan value dari parent
  useEffect(() => {
    setSelectedDate(value || '');
  }, [value]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onChange?.(e.target.value);
  };

  const handleFocusInput = () => {
    inputRef.current?.showPicker(); // Memastikan datepicker muncul saat input atau ikon diklik
  };

  // Format tanggal
  const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    // console.log(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className={`relative flex flex-col ${isWidthFull ? 'w-full' : ''}`}>
      {label && (
        <label className={`${size == 'small' ? 'text-label_medium_semibold' : 'text-card'} mb-1`}>
          {label}
        </label>
      )}

      <div className="flex w-full relative">
        {/* Icon Calendar */}
        <div
          onClick={handleFocusInput}
          className="flex justify-center items-center z-10 absolute right-3 top-0 bottom-0 m-auto h-6 text-black/50 bg-white"
        >
          <RiCalendarEventLine size={size == 'small' ? 18 : 24} />
        </div>

        {/* Input Date */}
        <div
          className={`border ${
            size == 'small' ? 'rounded-[12px]' : 'rounded-[16px]'
          } bg-transparent w-full focus:outline-none focus:ring-2 ${
            error
              ? 'border-danger focus:ring-danger'
              : 'border-black/40 focus:ring-primary'
          } ${!selectedDate ? 'text-black/50' : ''}`}
        >
          <input
            name={name}
            type="date"
            value={selectedDate}
            ref={inputRef} // Tambahkan ref agar bisa dipanggil
            onChange={handleDateChange}
            onClick={handleFocusInput}
            //  onFocus={handleFocusInput}
            className={`opacity-0 border rounded-[16px] 
              ${size == 'small' ? 'px-1 py-0.5' : 'px-4 py-3'}
               pr-10 bg-transparent w-full focus:outline-none focus:ring-2 ${
                 error
                   ? 'border-danger focus:ring-danger'
                   : 'border-black/40 focus:ring-primary'
               } ${!selectedDate ? 'text-black/50' : ''}`}
          />
        </div>

        {/* Manual Placeholder */}
        {/* {!selectedDate && placeholder && ( 
          <span className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none">
            {placeholder}
          </span>
         )} */}
        <span
          className={`absolute 
            ${
              size == 'small'
                ? 'top-2 left-2.5 text-content_semilarge '
                : 'top-3.5 left-4 text-content '
            }  pointer-events-none ${
            selectedDate ? 'text-black' : 'text-placeholderIcon'
          }`}
        >
          {selectedDate ? getFormattedDate(selectedDate) : placeholder}
        </span>
      </div>

      {error && (
        <div className="text-danger text-sm mt-0.5 w-full">{error}</div>
      )}
    </div>
  );
}
