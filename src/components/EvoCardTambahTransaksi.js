import React, { useState } from 'react';
import {
  RiWallet3Line,
  FileList3Line,
  RiCashLine,
  RiSmartphoneLine,
  RiFileAddLine,
  RiSignalWifiOffLine,
} from '@remixicon/react';
import * as Popover from '@radix-ui/react-popover';
import EvoBtnDetail from '@/components/evosist_elements/EvoBtnDetail';
import EvoButton from '@/components/evosist_elements/EvoButton';

const EvoCardTambahTransaksi = ({
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
      case 'Tambah Transaksi Manual':
        return <RiFileAddLine size={72} />;
      case 'Tambah Transaksi Tunai':
        return <RiCashLine size={72} />;
      default:
        return <RiFileAddLine size={72} />;
    }
  };

  const getText = () => {
    // switch (title) {
    //   case 'Tambah Transaksi Manual':
    //     return 'Lihat Data';
    //   case 'Tambah Transaksi Tunai':
    //     return 'Buat Pengajuan';
    //   default:
        return 'Buat Transaksi';
    // }
  };

  const getBg = () => {
    switch (title) {
      case 'Tambah Transaksi Manual':
        return 'bg-gradientPrimary45';
      case 'Tambah Transaksi Tunai':
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

export default EvoCardTambahTransaksi;
