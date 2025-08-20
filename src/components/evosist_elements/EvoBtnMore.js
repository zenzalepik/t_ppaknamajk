import React from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiMore2Fill } from '@remixicon/react';
import colors from '@/utils/colors';

const EvoBtnMore = ({ onClick=() => {}, className="!gap-0 !py-1 !pr-1 !pl-0.5 !rounded-[8px] !text-label_medium_semibold " }) => {
  return (
    <EvoButton
      asChild
      icon={<RiMore2Fill size={14} />}
      outlined={true}
      borderColor={colors.primary}
      onClick={onClick}
      title='menu'
      buttonText="menu"
      className={className}
    />
  );
};

export default EvoBtnMore;
