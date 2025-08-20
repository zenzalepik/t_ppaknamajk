import React from 'react';
import clsx from 'clsx';

const EvoErrorDiv = ({ errorHandlerText = '' }) => {
  if (!errorHandlerText) return null; // ✅ Pastikan hanya menampilkan jika ada error

  return (
    <div className={clsx('p-4 rounded-lg border border-red-500 bg-red-100 text-red-800 mx-6')}>
      <p>{errorHandlerText}</p>
    </div>
  );
};

export default EvoErrorDiv;
