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
        return <RiMoneyDollarCircleLine size={72} />;
      case 'Prepaid':
        return <RiBankCardLine size={72} />;
      case 'Transfer Bank':
        return <RiSmartphoneLine size={72} />;
      case 'E-Wallet':
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
        return 'bg-gradientPrimary45';
      case 'Prepaid':
        return 'bg-gradientSecondary45';
      case 'Transfer Bank':
        return 'bg-gradientPrimary45';
      case 'E-Wallet':
        return 'bg-gradientSecondary45';
      case 'Member':
        return 'bg-gradientPrimary45';
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
      <div className="text-content_medium text-white/40">Updated:</div>
      <div className="text-content_reguler text-white/[0.64]">
        {updatedBy} {updatedDate}
      </div>

      <div className="mt-3 w-[144px]">
        {isActive == true ? (
          onTurnOff&&(
          <Popover.Root
            open={confirmDeleteId === title}
            onOpenChange={(open) => setConfirmDeleteId(open ? title : null)}
          >
            <Popover.Trigger asChild>
              <EvoBtnTurnOff
                //   onClick={() => setConfirmDeleteId(title)}
                className="!relative"
                textColor="!text-danger"
                bgColor="!bg-white"
              />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                side="top"
                align="center"
                sideOffset={8}
                className="z-50 bg-white rounded-[24px] shadow-popover p-6 max-w-[280px]"
              >
                <div className="text-title_small text-black/[0.8] mb-4">
                  Yakin ingin menonaktifkan{' '}
                  <b className="text-black">{title}</b>?
                </div>
                <div className="flex justify-end gap-3">
                  <EvoButton
                    buttonText="Ya, non aktifkan"
                    onClick={handleTurnOff}
                    className="px-4 py-4 !bg-danger"
                  />
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
          </Popover.Root>)
        ) : (
          onTurnOff && (
            <EvoBtnTurnOn
              //   onClick={() => setConfirmDeleteId(title)}
              className="!relative"
              textColor="!text-danger"
              bgColor="!bg-white"
            />
          )
        )}
      </div>
    </div>
  );
};

export default EvoCardSettingPayment;
