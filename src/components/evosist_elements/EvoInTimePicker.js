'use client';

import React, { useEffect , useState, useRef } from 'react';
import { RiTimeLine } from '@remixicon/react';

export default function EvoInTimePicker({ name, label, value, onChange, error, placeholder }) {
  const inputRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState(value || '');

   // Sync value from parent
  useEffect(() => {
    if (value !== selectedTime) {
      setSelectedTime(value || '');
    }
  }, [value, selectedTime]);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    onChange?.(e.target.value);
  };

  const handleFocusInput = () => {
    inputRef.current?.showPicker?.();
  };

  return (
    <div className="relative flex flex-col">
      {label && <label className="text-card mb-1">{label}</label>}

      <div className="flex w-full relative">
      <div 
            onClick={handleFocusInput} className="flex justify-center items-center z-10 absolute right-3 top-0 bottom-0 m-auto h-6 text-black/50 bg-white">
          <RiTimeLine />
        </div>

        {/* Input Time */}
        <div
          className={`border rounded-[16px] bg-transparent w-full focus:outline-none focus:ring-2 ${
            error ? 'border-danger focus:ring-danger' : 'border-black/40 focus:ring-primary'
          } ${!selectedTime ? 'text-black/50' : ''}`}
        >
          <input
            name={name}
            type="time"
            value={selectedTime}
            ref={inputRef}
            onChange={handleTimeChange}
            onClick={handleFocusInput}
            className="opacity-0 border rounded-[16px] px-4 py-3 bg-transparent w-full focus:outline-none focus:ring-2"
          />
        </div>

        {/* Placeholder Dinamis */}
        <span
          className={`absolute left-4 top-3.5 text-content pointer-events-none ${
            selectedTime ? 'text-black' : 'text-placeholderIcon'
          }`}
        >
          {selectedTime || placeholder}
        </span>
      </div>

      {error && <div className="text-danger text-sm mt-0.5 w-full">{error}</div>}
    </div>
  );
}
