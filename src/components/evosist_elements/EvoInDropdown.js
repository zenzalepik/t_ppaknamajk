import { RiArrowDownSLine } from '@remixicon/react';

const EvoInDropdown = ({
  label,
  options,
  value,
  onChange,
  error,
  name,
  placeholder,
  className=''
}) => {
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
          value={value}
          onChange={onChange}
          className={`border rounded-[16px] px-4 py-3 focus:outline-none focus:ring-2 w-full ${
            error
              ? 'border-danger focus:ring-danger'
              : 'border-black/40 focus:ring-primary'
          } ${!value ? 'text-black/50' : ''}`}
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
