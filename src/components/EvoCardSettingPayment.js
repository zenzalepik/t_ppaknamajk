import React, { useState } from 'react';
import {
  RiWallet3Line,
  RiMoneyDollarCircleLine,
  RiBankCardLine,
  RiSmartphoneLine,
  RiMoneyDollarBoxLine,
  RiSignalWifiOffLine,
  RiUserStarLine,
} from '@remixicon/react';
import * as Popover from '@radix-ui/react-popover';
import EvoBtnTurnOff from '@/components/evosist_elements/EvoBtnTurnOff';
import EvoBtnTurnOn from '@/components/evosist_elements/EvoBtnTurnOn';
import EvoButton from '@/components/evosist_elements/EvoButton';

const EvoCardSettingPayment = ({
  title,
  updatedBy,
  updatedDate,
  className,
  isActive,
  onTurnOff,
  onTurnOn,
  isAvailable = false,
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
      case 'Cash':
      case 'Tunai':
        return <RiMoneyDollarCircleLine size={72} />;
      case 'Prepaid':
      case 'Prepaid Card':
        return <RiBankCardLine size={72} />;
      case 'Transfer Bank':
      case 'Bank':
        return <RiSmartphoneLine size={72} />;
      case 'E-Wallet':
      case 'QRIS':
        return <RiWallet3Line size={72} />;
      case 'Member':
        return <RiUserStarLine size={72} />;
      default:
        return <RiMoneyDollarBoxLine size={72} />;
    }
  };

  const getBg = () => {
    switch (title) {
      case 'Cash':
      case 'Tunai':
        return 'bg-gradientPrimary45';
      case 'Prepaid':
      case 'Prepaid Card':
        return 'bg-gradientSecondary45';
      case 'Transfer Bank':
      case 'Bank':
        return 'bg-gradientPrimary45';
      case 'E-Wallet':
      case 'QRIS':
        return 'bg-gradientSecondary45';
      case 'Member':
        return 'bg-gradientPrimary45';
      default:
        return 'bg-Primary';
    }
  };

  return (
    <div
      className={`flex flex-col p-6 rounded-[20px] ${getBg()} text-white ${className} `}
    >
      <div className="flex justify-between items-start mb-2">
        {getIcon()}
        {/* Status badge */}
        <div className="flex justify-between items-center gap-2 mb-2">
          <span
            className={`text-[14px]`}>
          Status:
          </span>
          <span
            className={`flex gap-1 items-center text-xs font-semibold px-1.5 py-0.5 rounded-[8px] ${
              isActive ? ' text-success bg-white/80' : 'bg-white/30 text-white'
            }`}
          >
            <div className={`${isActive?'bg-success':'bg-white'} h-[8px] w-[8px] rounded-[4px]`}></div>
            {isActive ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>
      </div>
      <div className="text-title_large mb-3">{title}</div>
      <div className="text-content_medium text-white/40">Updated:</div>
      <div className="text-content_reguler text-white/[0.64]">
        {/* {updatedBy}  */}
        {updatedDate}
      </div>

      <div className="mt-3 w-[144px]">
        {isAvailable && (
          <Popover.Root
            open={confirmDeleteId === title}
            onOpenChange={(open) => setConfirmDeleteId(open ? title : null)}
          >
            <Popover.Trigger asChild>
              {isActive && onTurnOff ? (
                <EvoBtnTurnOff
                  // onClick={() => setConfirmDeleteId(title)}
                  className="!relative"
                  textColor="!text-danger"
                  bgColor="!bg-white"
                />
              ) : !isActive && onTurnOn ? (
                <EvoBtnTurnOn
                  // onClick={onTurnOn}
                  className="!relative"
                  textColor="!text-danger"
                  bgColor="!bg-white"
                />
              ) : (
                <></>
              )}
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                side="top"
                align="center"
                sideOffset={8}
                className="z-50 bg-white rounded-[24px] shadow-popover p-6 max-w-[280px]"
              >
                <div className="text-title_small text-black/[0.8] mb-4">
                  Yakin ingin menonaktifkan jenis pembayaran{' '}
                  <b className="text-black">{title}</b>?
                </div>
                <div className="flex justify-end gap-3">
                  {isActive && onTurnOff ? (
                    <EvoButton
                      buttonText="Ya, non aktifkan"
                      onClick={() => {
                        onTurnOff(); // aksi utamamu
                        setConfirmDeleteId(null); // tutup popover
                      }}
                      className="px-4 py-4 !bg-danger"
                    />
                  ) : !isActive && onTurnOn ? (
                    <EvoButton
                      buttonText="Ya, Aktifkan"
                      onClick={() => {
                        onTurnOn(); // aksi utamamu
                        setConfirmDeleteId(null); // tutup popover
                      }}
                      className="px-4 py-4 !bg-primary"
                    />
                  ) : (
                    <></>
                  )}
                  <EvoButton
                    outlined={true}
                    buttonText="Batal"
                    onClick={handleCancel}
                    className="px-4 py-4"
                  />
                </div>
                <Popover.Arrow className="fill-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </div>
    </div>
  );
};

export default EvoCardSettingPayment;
