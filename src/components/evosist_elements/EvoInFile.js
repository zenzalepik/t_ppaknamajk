'use client';

import { useState } from 'react';
import { RiUploadCloudLine, RiCloseCircleLine } from '@remixicon/react';

const EvoInFile = ({ name, label, onChange, error, className = '' }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onChange?.(file);
  };

  const handleReset = () => {
    setSelectedFile(null);
    onChange?.(null);
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label className="text-card mb-1">{label}</label>

      <div className="flex items-center gap-3 border rounded-[16px] px-4 py-3 focus:outline-none focus:ring-2 bg-white relative">
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          className="opacity-0 absolute inset-0 w-full cursor-pointer"
        />

        <RiUploadCloudLine className="text-primary text-lg" />
        <span className="flex-1 text-black/80">
          {selectedFile ? selectedFile.name : 'Pilih file...'}
        </span>

        {selectedFile && (
          <button type="button" onClick={handleReset} className="text-danger">
            <RiCloseCircleLine />
          </button>
        )}
      </div>

      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EvoInFile;
