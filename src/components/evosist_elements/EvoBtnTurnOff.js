import React, { forwardRef } from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiSignalWifiOffLine } from '@remixicon/react';

const EvoBtnTurnOff = forwardRef(({ onClick, textColor = '', bgColor = '', className = '' }, ref) => {
  return (
    <EvoButton
      ref={ref}
      outlined
      buttonText="Non Aktifkan"
      icon={<RiSignalWifiOffLine size={18} />}
      borderColor="#FF2A46"
      className={`${className} ${textColor ? textColor : ''} ${bgColor ? ' ' + bgColor : ''}`}
      onClick={onClick}
      title="Non Aktifkan"
    />
  );
});

// Tambahkan displayName untuk menghilangkan warning
EvoBtnTurnOff.displayName = "EvoBtnTurnOff";

export default EvoBtnTurnOff;
