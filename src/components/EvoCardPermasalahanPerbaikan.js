import React, { useState } from 'react';
import {
  RiWallet3Line,
  FileList3Line,
  RiMailSendLine,
  RiSmartphoneLine,
  RiFileList3Line,
  RiSignalWifiOffLine,
} from '@remixicon/react';
import * as Popover from '@radix-ui/react-popover';
import EvoBtnDetail from '@/components/evosist_elements/EvoBtnDetail';
import EvoButton from '@/components/evosist_elements/EvoButton';

const EvoCardPermasalahanPerbaikan = ({
  title,
  updatedBy,
  updatedDate,
  className,
  action=()=>{},
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleTurnOff = () => {
    console.log(`Menonaktifkan ${title}`);
    setConfirmDeleteId(null);
  };

  const handleCancel = () => {
    setConfirmDeleteId(null);
  };

  const getIcon = () => {
    switch (title) {
      case 'Data Pengaduan & Perbaikan':
        return <RiFileList3Line size={72} />;
      case 'Kirim Pengaduan Ganguan':
        return <RiMailSendLine size={72} />;
      default:
        return <RiFileList3Line size={72} />;
    }
  };

  const getText = () => {
    switch (title) {
      case 'Data Pengaduan & Perbaikan':
        return 'Lihat Data';
      case 'Kirim Pengaduan Ganguan':
        return 'Buat Pengajuan';
      default:
        return 'Detail';
    }
  };

  const getBg = () => {
    switch (title) {
      case 'Data Pengaduan & Perbaikan':
        return 'bg-gradientPrimary45';
      case 'Kirim Pengaduan Ganguan':
        return 'bg-gradientSecondary45';
      default:
        return 'bg-Primary';
    }
  };

  return (
    <div
      className={`flex flex-col p-6 rounded-[20px] ${getBg()} text-white ${className}`}
    >
      {getIcon()}
      <div className="text-title_large mb-3">{title}</div>
      {/* <div className="text-content_medium text-white/40">Updated:</div>
      <div className="text-content_reguler text-white/[0.64]"> */}
        {/* {updatedBy} {updatedDate} */}
      {/* </div> */}

      <div className="mt-3 w-[164px]">
       
            <EvoBtnDetail
            text={getText()}
                onClick={action}
              // className="!relative"
              // textColor="!text-danger"
              // bgColor="!bg-white"
            />
        
      </div>
    </div>
  );
};

export default EvoCardPermasalahanPerbaikan;
