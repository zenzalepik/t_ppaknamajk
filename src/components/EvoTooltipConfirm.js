//EvoTooltipConfirm.js
'use client';

import * as Popover from '@radix-ui/react-popover';
import EvoButton from '@/components/evosist_elements/EvoButton'; // optional, bisa diganti
import { useState } from 'react';
import { RiDeleteBin2Line } from '@remixicon/react';

const EvoTooltipConfirm = ({ onConfirm, onCancel }) => (
  <Popover.Content
    side="top"
    align="end"
    sideOffset={8}
    className="z-50 w-64 bg-white shadow-item_dropdown rounded-tr-[24px] rounded-tl-[24px] rounded-br-[0px] rounded-bl-[24px] p-4"
  >
    <div className="mb-2 text-title_small text-black/80">
      Anda yakin ingin menghapus data tersebut?
    </div>
    <div className="flex justify-end gap-2">
      <Popover.Close asChild>
        
          <EvoButton
            asChild
            outlined={true}
            buttonText="Tidak"
            size="large"
            // fillColor="#FF2A46"
            onClick={onCancel}
            title="Tidak"
          />
        
      </Popover.Close>

      <Popover.Close asChild>
        
          <EvoButton
            asChild
            buttonText="Ya"
            size="large"
            fillColor="#FF2A46"
            onClick={onConfirm}
            title="Ya"
            className="!px-8"
          />
        
      </Popover.Close>
    </div>
  </Popover.Content>
);

export default EvoTooltipConfirm;
