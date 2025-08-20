import { useState } from 'react';
import {RiEyeOffLine, RiEyeLine} from '@remixicon/react';

const EvoInText = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  name,
  className = '',
  type = 'text',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label className="text-card mb-1">{label}</label>
      <div className="flex flex-col w-full relative">
        <input
          type={isPasswordField && isPasswordVisible ? 'text' : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border rounded-[16px] px-4 py-3 focus:outline-none focus:ring-2 ${
            error
              ? 'border-danger focus:ring-danger'
              : 'border-black/40 focus:ring-primary'
          }`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {isPasswordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        )}
      </div>
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EvoInText;
