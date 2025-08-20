import React from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiSettingsLine } from '@remixicon/react';
import colors from '@/utils/colors';

const EvoBtnKonfigurasi = ({
  onClick = () => {},
  isActive = false,
  className = '!gap-0.5 !py-1 !px-1 !rounded-[12px] !text-label_medium_semibold ',
}) => {
  const title = 'Pengaturan';
  const icon = <RiSettingsLine size={16} />;
  const borderColor = colors.primary;
  const textColorClass = 'text-primary';

  return (
    <EvoButton
      asChild // Pass asChild agar tombol ini tidak jadi <button> lagi
      icon={icon}
      outlined={true}
      borderColor={borderColor}
      onClick={onClick}
      title={title}
      buttonText={title}
      className={`${className} ${textColorClass}`}
    />
  );
};

export default EvoBtnKonfigurasi;
