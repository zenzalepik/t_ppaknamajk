//EvoTooltipActionDataMember.js
'use client';

import * as Popover from '@radix-ui/react-popover';
import EvoButton from '@/components/evosist_elements/EvoButton'; // optional, bisa diganti
import { useState } from 'react';
import { RiDeleteBin2Line } from '@remixicon/react';
import EvoBtnAktifkan from '@/components/evosist_elements/EvoBtnAktifkan';
import EvoBtnPerpanjang from '@/components/evosist_elements/EvoBtnPerpanjang';
import EvoBtnGantiKartu from '@/components/evosist_elements/EvoBtnGantiKartu';
import EvoBtnGantiNomorPolisi from '@/components/evosist_elements/EvoBtnGantiNomorPolisi';
import EvoBtnRiwayatTransaksi from '@/components/evosist_elements/EvoBtnRiwayatTransaksi';

const EvoTooltipActionDataMember = ({
  onPerpanjang = () => {},
  onGantiKartu = () => {},
  onGantiNomorPolisi = () => {},
  onRiwayatTransaksi = () => {},
  isGantiKartu = false,
  isGantiNomorPolisi = false,
  onConfirm,
  onCancel,
}) => (
  <Popover.Content
    side="top"
    align="end"
    sideOffset={8}
    className="z-50 w-64 bg-white shadow-item_dropdown rounded-[24px] p-4"
    // className="z-50 w-64 bg-gradient-to-tr from-[#23364F] via-black via-black via-black via-black to-black shadow-item_dropdown rounded-tr-[24px] rounded-tl-[24px] rounded-br-[0px] rounded-bl-[24px] p-4"
  >
    {/* <div className="mb-2 text-title_small text-black/80">
      
    </div> */}
    <div className="flex flex-col justify-end gap-2">
      <Popover.Close asChild>
        {onPerpanjang && (
          <EvoBtnPerpanjang
            onClick={onPerpanjang}
            className="cursor-pointer !py-3 !border-none !bg-primaryTransparent !justify-start !px-6"
          />
        )}
      </Popover.Close>

      <Popover.Close asChild>
        {onGantiKartu && (
          <EvoBtnGantiKartu
            onClick={onGantiKartu}
            className={`cursor-pointer !py-3 !border-none ${
              isGantiKartu
                ? '!bg-primaryTransparent'
                : 'bg-black/20 !text-black'
            } !justify-start !px-6`}
          />
        )}
      </Popover.Close>

      <Popover.Close asChild>
        {onGantiNomorPolisi && (
          <EvoBtnGantiNomorPolisi
            onClick={onGantiNomorPolisi}
            className={`cursor-pointer !py-3 !border-none ${
              isGantiNomorPolisi
                ? '!bg-primaryTransparent'
                : 'bg-black/20 !text-black'
            } !justify-start !px-6`}
          />
        )}
      </Popover.Close>

      <Popover.Close asChild>
        {onRiwayatTransaksi && (
          <EvoBtnRiwayatTransaksi
            onClick={onRiwayatTransaksi}
            className="cursor-pointer !py-3 !border-none !bg-primaryTransparent !justify-start !px-6"
          />
        )}
      </Popover.Close>
    </div>
  </Popover.Content>
);

export default EvoTooltipActionDataMember;
