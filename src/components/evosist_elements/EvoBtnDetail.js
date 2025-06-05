import React, { forwardRef } from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiArrowRightLine } from '@remixicon/react';

const EvoBtnDetail = forwardRef(({ text='',onClick, textColor = '', bgColor = '', className = '' }, ref) => {
  return (
    <EvoButton
    isReverse={true}
      ref={ref}
      outlined
      buttonText={text}
      icon={<RiArrowRightLine size={18} />}
      // borderColor="#FF2A46"
      className={`${className} ${textColor ? textColor : ''} ${bgColor ? ' ' + bgColor : ''}`}
      onClick={onClick}
      title="Non Aktifkan"
    />
  );
});

// Tambahkan displayName untuk menghilangkan warning
EvoBtnDetail.displayName = "EvoBtnDetail";

export default EvoBtnDetail;
