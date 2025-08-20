import React, { forwardRef } from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiWirelessChargingLine } from '@remixicon/react';

const EvoBtnTurnOn = forwardRef( ({ onClick, className }, ref) => {
  return (
    <EvoButton
      ref={ref}
      // outlined
      buttonText="Aktifkan"
      icon={<RiWirelessChargingLine size={18} />}
      // borderColor="#2AFF58"
      fillColor="#2AFF58"
      onClick={onClick}
      title='Aktifkan'
    />
  );
});

// Tambahkan displayName untuk menghilangkan warning
EvoBtnTurnOn.displayName = "EvoBtnTurnOn";

export default EvoBtnTurnOn;
