import React from 'react';
import EvoButton from '@/components/evosist_elements/EvoButton';
import { RiWirelessChargingLine, RiSignalWifiOffLine } from '@remixicon/react';
import colors from '@/utils/colors';

const EvoBtnAktifkan = ({
  onClick = () => {},
  isActive = false,
  className = '!gap-0.5 !py-1 !px-1 !rounded-[12px] !text-label_medium_semibold ',
}) => {
  const title = isActive ? 'Non Aktifkan' : 'Aktifkan';
  const icon = isActive ? <RiSignalWifiOffLine size={16} />:<RiWirelessChargingLine size={16} />;
  const borderColor = isActive ? colors.danger : colors.success;
  const textColorClass = isActive ? '' : 'text-success';

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

// Tambahkan displayName untuk menghilangkan warning
EvoBtnAktifkan.displayName = "EvoBtnAktifkan";

export default EvoBtnAktifkan;
