import React from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiDeleteBin2Line } from '@remixicon/react';

const EvoBtnDelete = ({ onClick, className }) => {
  return (
    <EvoButton
      asChild // Pass asChild agar tombol ini tidak jadi <button> lagi
      icon={<RiDeleteBin2Line size={18} />}
      fillColor="#FF2A46"
      onClick={onClick}
      title='Hapus'
      className={className} // Kalau ada class tambahan
    />
  );
};

// Tambahkan displayName untuk menghilangkan warning
EvoBtnDelete.displayName = "EvoBtnDelete";

export default EvoBtnDelete;
